const PASSWORD_STORAGE_KEY = 'live_track_admin_password';
const SESSION_AUTH_KEY = 'live_track_admin_auth_state';
export const DEFAULT_ADMIN_PASSWORD = 'admin';

export const adminAuthService = {
  /**
   * Retrieves the current admin password from localStorage or returns default
   */
  getPassword(): string {
    try {
      const stored = localStorage.getItem(PASSWORD_STORAGE_KEY);
      if (stored && stored.trim()) {
        return stored.trim();
      }
    } catch (e) {
      console.error('Error reading admin password', e);
    }
    return DEFAULT_ADMIN_PASSWORD;
  },

  /**
   * Updates the admin password
   */
  setPassword(newPassword: string): void {
    try {
      localStorage.setItem(PASSWORD_STORAGE_KEY, newPassword.trim());
    } catch (e) {
      console.error('Error saving admin password', e);
    }
  },

  /**
   * Verifies an entered password against the stored password
   */
  verifyPassword(input: string): boolean {
    const current = this.getPassword();
    return input.trim() === current;
  },

  /**
   * Gets initial session auth state
   */
  getInitialAuthState(): boolean {
    try {
      return sessionStorage.getItem(SESSION_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  },

  /**
   * Saves session auth state
   */
  setSessionAuthState(isAuth: boolean): void {
    try {
      if (isAuth) {
        sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
      } else {
        sessionStorage.removeItem(SESSION_AUTH_KEY);
      }
    } catch (e) {
      console.error('Error saving session auth state', e);
    }
  },
};
