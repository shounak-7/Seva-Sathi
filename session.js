/**
 * Hustle Unified Session Manager
 * Manages client-side persistent login state for Customers and Worker Partners
 */
(function () {
  const TOKEN_KEY = 'hustleToken';
  const USER_KEY = 'hustleCurrentUser';

  window.HustleSession = {
    TOKEN_KEY,
    USER_KEY,

    getUser() {
      try {
        const raw = localStorage.getItem(USER_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        return null;
      }
    },

    getToken() {
      return localStorage.getItem(TOKEN_KEY) || null;
    },

    isLoggedIn() {
      return Boolean(this.getUser() && this.getToken());
    },

    isWorker() {
      const user = this.getUser();
      return Boolean(user && user.role === 'worker');
    },

    isCustomer() {
      const user = this.getUser();
      return Boolean(user && (!user.role || user.role === 'customer'));
    },

    isBusiness() {
      const user = this.getUser();
      return Boolean(user && user.role === 'business');
    },

    setSession(user, token) {
      if (token) localStorage.setItem(TOKEN_KEY, token);
      if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        if (user.preferredLanguage && window.SevaSathiI18n && typeof window.SevaSathiI18n.setLanguage === 'function') {
          window.SevaSathiI18n.setLanguage(user.preferredLanguage, false);
        }
      }
      window.dispatchEvent(new CustomEvent('hustle:session-change', { detail: { user, token } }));
    },

    setUser(user) {
      if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        if (user.preferredLanguage && window.SevaSathiI18n && typeof window.SevaSathiI18n.setLanguage === 'function') {
          window.SevaSathiI18n.setLanguage(user.preferredLanguage, false);
        }
      }
      window.dispatchEvent(new CustomEvent('hustle:session-change', { detail: { user, token: this.getToken() } }));
    },

    logOut(redirectUrl = null) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      window.dispatchEvent(new CustomEvent('hustle:session-change', { detail: null }));
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        window.location.href = 'index.html';
      }
    },

    getInitials(name) {
      if (!name) return 'SS';
      const parts = name.trim().split(/\s+/);
      if (parts.length > 1) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return parts[0].slice(0, 2).toUpperCase();
    }
  };

  // SevaSathi Session Alias for full backward and forward compatibility
  window.SevaSathiSession = window.HustleSession;
})();
