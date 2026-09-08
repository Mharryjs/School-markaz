import { AdminInquiry } from '../types';
import { getStoredToken } from './auth';

export async function submitDemoInquiry(data: {
  schoolName: string;
  senderName: string;
  phone: string;
  email: string;
  students: string;
  teachers: string;
  message: string;
  packageName?: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return { success: res.ok && json.success, message: json.message || 'Demo request submitted' };
  } catch (err: any) {
    return { success: false, message: err.message || 'Network error' };
  }
}

export async function fetchAdminInquiries(): Promise<AdminInquiry[]> {
  try {
    const token = getStoredToken();
    const res = await fetch('/api/admin/inquiries', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (res.ok) {
      const data = await res.json();
      return data.inquiries || [];
    }
    return [];
  } catch {
    return [];
  }
}

export async function markInquiryAsRead(id: string): Promise<AdminInquiry[]> {
  try {
    const token = getStoredToken();
    const res = await fetch(`/api/admin/inquiries/${id}/read`, {
      method: 'PATCH',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (res.ok) {
      const data = await res.json();
      return data.inquiries || [];
    }
    return [];
  } catch {
    return [];
  }
}

export async function fetchAdminStats() {
  try {
    const token = getStoredToken();
    const res = await fetch('/api/admin/stats', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (res.ok) {
      const data = await res.json();
      return data.system;
    }
    return null;
  } catch {
    return null;
  }
}
