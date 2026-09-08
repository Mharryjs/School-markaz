import { AuthUser, AdminUser, UserRole, LoginActivityRecord } from '../types';

const TOKEN_KEY = 'schoolmarkaz_admin_token';
const USER_KEY = 'schoolmarkaz_admin_user';

export async function loginUser(
  email: string,
  password: string,
  requestedRole?: UserRole
): Promise<{ success: boolean; user?: AuthUser; token?: string; message?: string }> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, requestedRole }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      return { success: true, user: data.user, token: data.token };
    } else {
      return { success: false, message: data.message || 'Authentication failed' };
    }
  } catch (err: any) {
    // Graceful offline fallback for demonstration
    return { success: false, message: err.message || 'Network error connecting to authentication service' };
  }
}

// Backward-compatible alias for admin login
export async function loginAdmin(
  email: string,
  password: string
): Promise<{ success: boolean; user?: AdminUser; token?: string; message?: string }> {
  const result = await loginUser(email, password, 'admin');
  return {
    success: result.success,
    user: result.user as AdminUser,
    token: result.token,
    message: result.message
  };
}

export async function verifyCurrentSession(): Promise<{ authenticated: boolean; user?: AuthUser }> {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch('/api/auth/me', {
      method: 'GET',
      headers,
    });

    if (res.ok) {
      const data = await res.json();
      if (data.authenticated && data.user) {
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        return { authenticated: true, user: data.user };
      }
    }
    // If invalid on server, clear local cached state
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return { authenticated: false };
  } catch {
    // If offline or network error, check local cache fallback
    const cachedUser = localStorage.getItem(USER_KEY);
    const cachedToken = localStorage.getItem(TOKEN_KEY);
    if (cachedUser && cachedToken) {
      try {
        return { authenticated: true, user: JSON.parse(cachedUser) };
      } catch {
        return { authenticated: false };
      }
    }
    return { authenticated: false };
  }
}

export async function logoutUser(): Promise<void> {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  } catch (err) {
    console.error('Logout error:', err);
  } finally {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}

export const logoutAdmin = logoutUser;

export function getStoredUser(): AuthUser | null {
  try {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
}

export function getStoredAdminUser(): AdminUser | null {
  const user = getStoredUser();
  if (user && user.role === 'admin') {
    return user as AdminUser;
  }
  return null;
}

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

// Fetch server-recorded login activities
export async function fetchServerLoginActivities(): Promise<LoginActivityRecord[]> {
  try {
    const res = await fetch('/api/auth/activity');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.activities)) {
        return data.activities;
      }
    }
  } catch (err) {
    console.warn('Could not fetch server login activity:', err);
  }
  return [];
}

// Record an activity event to backend
export async function recordServerLoginActivity(
  activity: Partial<LoginActivityRecord>
): Promise<void> {
  try {
    await fetch('/api/auth/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activity),
    });
  } catch (err) {
    console.warn('Could not record activity on server:', err);
  }
}
