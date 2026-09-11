// in-memory-runner.js
const http = require('http');
const net = require('net');
const app = require('./server');

let initPromise = null;
async function ensureInit() {
  if (!initPromise) {
    initPromise = (async () => {
      const db = require('./services/db');
      await db.connectDB();
      if (typeof app.seedInitialUsers === 'function') {
        await app.seedInitialUsers();
      }
    })();
  }
  return initPromise;
}

function createMockReqRes({ method = 'GET', url = '/', headers = {}, body = null }) {
  const socket = new net.Socket();
  const req = new http.IncomingMessage(socket);
  req.method = method.toUpperCase();
  req.url = url;
  req.headers = {};
  for (const k in headers) {
    req.headers[k.toLowerCase()] = headers[k];
  }

  let bodyStr = null;
  if (body) {
    bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
    if (!req.headers['content-type']) {
      req.headers['content-type'] = 'application/json';
    }
    req.headers['content-length'] = String(Buffer.byteLength(bodyStr));
  }

  const res = new http.ServerResponse(req);
  res.assignSocket(socket);
  res._body = '';
  res._headersMap = {};

  res.write = function (chunk, encoding, callback) {
    if (chunk) res._body += chunk.toString();
    if (typeof encoding === 'function') callback = encoding;
    if (callback) callback();
    return true;
  };

  res.end = function (chunk, encoding, callback) {
    if (chunk) res._body += chunk.toString();
    res.emit('finish');
    if (typeof encoding === 'function') callback = encoding;
    if (callback) callback();
    return res;
  };

  return { req, res, bodyStr };
}

async function dispatch(options) {
  await ensureInit();
  return new Promise((resolve) => {
    const { req, res, bodyStr } = createMockReqRes(options);

    res.on('finish', () => {
      let json = null;
      try {
        json = JSON.parse(res._body);
      } catch (e) {
        json = null;
      }
      resolve({
        status: res.statusCode,
        headers: res.getHeaders ? res.getHeaders() : {},
        data: json,
        raw: res._body
      });
    });

    app.handle(req, res);

    if (bodyStr) {
      req.push(bodyStr);
    }
    req.push(null);
  });
}

module.exports = { dispatch, ensureInit };
