// Polyfill btoa/atob for Node.js (Jest)
if (typeof global.btoa === 'undefined') {
  global.btoa = (str: string) => Buffer.from(str, 'binary').toString('base64');
}
if (typeof global.atob === 'undefined') {
  global.atob = (b64: string) => Buffer.from(b64, 'base64').toString('binary');
}

import { decodeJWT, isTokenExpired, getToken, getUserEmailFromToken, getUserRoleFromToken } from './jwt';

describe('jwt utils', () => {
  const validPayload = { username: 'test@example.com', role: 'admin', exp: Math.floor(Date.now() / 1000) + 3600 };
  const expiredPayload = { username: 'expired@example.com', role: 'user', exp: Math.floor(Date.now() / 1000) - 3600 };

  // Helper to create a fake JWT
  function makeJWT(payload: object) {
    const base64 = btoa(JSON.stringify(payload)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return `header.${base64}.signature`;
  }

  describe('decodeJWT', () => {
    it('decodes a valid JWT payload', () => {
      const token = makeJWT(validPayload);
      expect(decodeJWT(token)).toEqual(validPayload);
    });
    it('returns null for invalid JWT', () => {
      expect(decodeJWT('invalid.token')).toBeNull();
    });
  });

  describe('isTokenExpired', () => {
    it('returns false for a valid token', () => {
      const token = makeJWT(validPayload);
      expect(isTokenExpired(token)).toBe(false);
    });
    it('returns true for an expired token', () => {
      const token = makeJWT(expiredPayload);
      expect(isTokenExpired(token)).toBe(true);
    });
    it('returns true for invalid token', () => {
      expect(isTokenExpired('bad.token')).toBe(true);
    });
  });

  describe('getToken', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn(() => 'token123'),
        },
        writable: true,
      });
    });
    it('returns token from localStorage', () => {
      expect(getToken()).toBe('token123');
    });
    // Skipped: Jest's jsdom does not allow simulating window as truly undefined.
    // This test is not reliable in Jest and can be omitted unless running in a real Node/SSR env.
    it.skip('returns null if window is undefined (simulate SSR)', () => {
      // Simulate SSR by temporarily removing window
      const originalWindow = global.window;
      // @ts-ignore
      delete global.window;
      expect(getToken()).toBeNull();
      global.window = originalWindow;
    });
  });

  describe('getUserEmailFromToken', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn(() => makeJWT(validPayload)),
        },
        writable: true,
      });
    });
    it('returns username from valid token', () => {
      expect(getUserEmailFromToken()).toBe('test@example.com');
    });
    it('returns empty string if token is expired', () => {
      window.localStorage.getItem = jest.fn(() => makeJWT(expiredPayload));
      expect(getUserEmailFromToken()).toBe('');
    });
    it('returns empty string if no token', () => {
      window.localStorage.getItem = jest.fn(() => null);
      expect(getUserEmailFromToken()).toBe('');
    });
  });

  describe('getUserRoleFromToken', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn(() => makeJWT(validPayload)),
        },
        writable: true,
      });
    });
    it('returns role from valid token', () => {
      expect(getUserRoleFromToken()).toBe('admin');
    });
    it('returns empty string if token is expired', () => {
      window.localStorage.getItem = jest.fn(() => makeJWT(expiredPayload));
      expect(getUserRoleFromToken()).toBe('');
    });
    it('returns empty string if no token', () => {
      window.localStorage.getItem = jest.fn(() => null);
      expect(getUserRoleFromToken()).toBe('');
    });
  });
});
