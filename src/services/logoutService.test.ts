import { logout } from './logoutService';

describe('logoutService', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'test-token');
  });

  it('elimina el token del localStorage', () => {
    expect(localStorage.getItem('token')).toBe('test-token');
    logout();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('no lanza error si window no está definido', () => {
    const originalWindow = global.window;
    // @ts-ignore
    delete global.window;
    expect(() => logout()).not.toThrow();
    // @ts-ignore
    global.window = originalWindow;
  });
});
