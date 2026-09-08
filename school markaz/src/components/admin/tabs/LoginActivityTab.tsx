import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  Download,
  Trash2,
  Clock,
  Laptop,
  Smartphone,
  Globe,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { LoginActivity } from '../../../types';
import { useSchool } from '../../../context/SchoolContext';

interface LoginActivityTabProps {
  loginActivities: LoginActivity[];
  showToast: (msg: string) => void;
}

export const LoginActivityTab: React.FC<LoginActivityTabProps> = ({
  loginActivities,
  showToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [localLogs, setLocalLogs] = useState<LoginActivity[]>(loginActivities);

  // Synchronize when parent updates
  React.useEffect(() => {
    setLocalLogs(loginActivities);
  }, [loginActivities]);

  const filteredLogs = localLogs.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole =
      roleFilter === 'all' ||
      (roleFilter === 'admin' && log.role.toLowerCase().includes('admin')) ||
      (roleFilter === 'principal' && (log.role.toLowerCase().includes('principal') || log.role.toLowerCase().includes('sir'))) ||
      (roleFilter === 'teacher' && log.role.toLowerCase().includes('teacher')) ||
      (roleFilter === 'student' && log.role.toLowerCase().includes('student'));

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'success' && log.status.toLowerCase().includes('success')) ||
      (statusFilter === 'failed' && log.status.toLowerCase().includes('fail'));

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleClearLogs = () => {
    if (window.confirm('Are you sure you want to purge login audit history?')) {
      setLocalLogs([]);
      showToast('Audit trail flushed from local memory.');
    }
  };

  const handleExportCSV = () => {
    const headers = ['User Name', 'Role', 'Date & Time', 'IP Address', 'Device', 'Status'];
    const rows = filteredLogs.map((l) => [
      `"${l.userName}"`,
      `"${l.role}"`,
      `"${l.timestamp}"`,
      `"${l.ipAddress}"`,
      `"${l.device}"`,
      `"${l.status}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SchoolMarkaz_LoginAudits_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Audit records exported to CSV file successfully.');
  };

  const successCount = localLogs.filter((l) => l.status.toLowerCase().includes('success')).length;
  const adminCount = localLogs.filter((l) => l.role.toLowerCase().includes('admin')).length;
  const facultyCount = localLogs.filter((l) => l.role.toLowerCase().includes('teacher') || l.role.toLowerCase().includes('principal') || l.role.toLowerCase().includes('sir')).length;
  const studentCount = localLogs.filter((l) => l.role.toLowerCase().includes('student')).length;

  return (
    <div className="space-y-6">
      {/* Header with Title & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#123B2A]">
              Login Activity & Security Audits
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DDF7E8] text-[#123B2A] border border-[#19A66A]/30">
              Live Audit Log
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#123B2A]/70 mt-1">
            Real-time chronological access trail tracking Administrator, Principal, Teacher, and Student logins.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#DDF7E8] border border-[#19A66A]/30 text-xs font-bold text-[#123B2A] flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#19A66A]" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={handleClearLogs}
            className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-bold text-rose-700 flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Log</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xs">
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Total Audited Events</div>
          <div className="text-2xl font-extrabold text-[#123B2A] mt-1">{localLogs.length}</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">All sessions verified</div>
        </div>

        <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xs">
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Super Admin Logins</div>
          <div className="text-2xl font-extrabold text-[#19A66A] mt-1">{adminCount}</div>
          <div className="text-[11px] text-gray-500 mt-1">Root developer (Mharryjs)</div>
        </div>

        <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xs">
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Principal & Faculty</div>
          <div className="text-2xl font-extrabold text-teal-800 mt-1">{facultyCount}</div>
          <div className="text-[11px] text-teal-700 font-semibold mt-1">Institutional staff access</div>
        </div>

        <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xs">
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Student & Parent Portal</div>
          <div className="text-2xl font-extrabold text-blue-800 mt-1">{studentCount}</div>
          <div className="text-[11px] text-blue-700 font-semibold mt-1">Academic progress views</div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by user name, IP, device..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#19A66A]/25 text-xs text-[#123B2A] placeholder:text-gray-400 focus:outline-none focus:border-[#19A66A] focus:ring-2 focus:ring-[#19A66A]/20"
          />
        </div>

        {/* Role Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <span className="text-xs font-bold text-gray-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Role:</span>
          </span>
          {[
            { id: 'all', label: 'All Roles' },
            { id: 'admin', label: 'Admins' },
            { id: 'principal', label: 'Principal (Sir)' },
            { id: 'teacher', label: 'Teachers' },
            { id: 'student', label: 'Students' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setRoleFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                roleFilter === tab.id
                  ? 'bg-[#19A66A] text-white shadow-xs'
                  : 'bg-gray-100 hover:bg-gray-200 text-[#123B2A]/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 border border-white/80 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-[#123B2A]/60">
                <th className="pb-3 font-bold">User / Account</th>
                <th className="pb-3 font-bold">Role</th>
                <th className="pb-3 font-bold">Timestamp (PKT)</th>
                <th className="pb-3 font-bold">IP Address & Network</th>
                <th className="pb-3 font-bold">Device / Browser</th>
                <th className="pb-3 font-bold text-center">Auth Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No login events match your criteria.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log, idx) => {
                  const isAdmin = log.role.toLowerCase().includes('admin');
                  const isPrincipal = log.role.toLowerCase().includes('principal') || log.role.toLowerCase().includes('sir');
                  const isTeacher = log.role.toLowerCase().includes('teacher');
                  const isStudent = log.role.toLowerCase().includes('student');

                  return (
                    <tr key={idx} className="hover:bg-[#F4FFF8]/60 transition-colors">
                      <td className="py-3 font-bold text-[#123B2A]">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-[11px] ${
                            isAdmin ? 'bg-emerald-100 text-emerald-800' :
                            isPrincipal ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                            isTeacher ? 'bg-teal-100 text-teal-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {log.userName.slice(0, 1).toUpperCase()}
                          </div>
                          <div>
                            <div className="leading-tight">{log.userName}</div>
                            <div className="text-[10px] text-gray-400 font-normal">Session ID: #SES-{1000 + idx}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                          isAdmin ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                          isPrincipal ? 'bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]' :
                          isTeacher ? 'bg-teal-100 text-teal-800 border border-teal-300' :
                          'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}>
                          {log.role}
                        </span>
                      </td>

                      <td className="py-3 font-mono text-gray-600 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{log.timestamp}</span>
                      </td>

                      <td className="py-3">
                        <div className="font-mono text-[11px] font-semibold text-gray-700 flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5 text-teal-600" />
                          <span>{log.ipAddress}</span>
                        </div>
                      </td>

                      <td className="py-3 text-gray-600">
                        <div className="flex items-center gap-1.5">
                          {log.device.toLowerCase().includes('mobile') ? (
                            <Smartphone className="w-3.5 h-3.5 text-blue-500" />
                          ) : (
                            <Laptop className="w-3.5 h-3.5 text-gray-500" />
                          )}
                          <span>{log.device}</span>
                        </div>
                      </td>

                      <td className="py-3 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Authorized</span>
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
