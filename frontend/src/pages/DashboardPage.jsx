import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  UserCheck,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useCandidateStore } from '../stores/candidateStore';
import { useAuthStore } from '../stores/authStore';
import { StatsCard } from '../components/ui/StatsCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { StatsSkeleton } from '../components/ui/LoadingSkeleton';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { stats, loading, fetchStats } = useCandidateStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const COLORS = ['#10b981', '#f59e0b', '#6366f1', '#ef4444']; // Verified, Pending, InProgress, Failed

  const pieData = stats
    ? [
        { name: 'Verified', value: stats.verified },
        { name: 'Pending', value: stats.pending },
        { name: 'In Progress', value: stats.inProgress },
        { name: 'Failed', value: stats.failed },
      ].filter((d) => d.value > 0)
    : [];

  const getPercentage = (count) => {
    if (!stats || stats.total === 0) return '0%';
    return `${Math.round((count / stats.total) * 100)}%`;
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(dateString));
  };

  if (loading && !stats) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-white/5 animate-pulse rounded-lg"></div>
          <div className="h-4 w-48 bg-white/5 animate-pulse rounded-lg"></div>
        </div>
        <StatsSkeleton />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Welcome Banner */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Welcome back, <span className="text-gradient">{user?.name}</span> 👋
        </h1>
        <p className="text-white/50 text-sm">
          Here is the background verification summary for your candidates.
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            index={0}
            title="Total Candidates"
            value={stats.total}
            icon={<Users className="w-5 h-5" />}
            description="Total profiles in the system"
          />
          <StatsCard
            index={1}
            title="Verified"
            value={stats.verified}
            icon={<UserCheck className="w-5 h-5 text-emerald-400" />}
            description="Successfully verified"
            trend={getPercentage(stats.verified)}
            trendType="up"
          />
          <StatsCard
            index={2}
            title="Pending"
            value={(stats.pending || 0) + (stats.inProgress || 0)}
            icon={<Clock className="w-5 h-5 text-amber-400" />}
            description="Awaiting completion"
            trendType="neutral"
          />
          <StatsCard
            index={3}
            title="Failed"
            value={stats.failed}
            icon={<AlertCircle className="w-5 h-5 text-rose-400" />}
            description="Requires attention"
            trend={getPercentage(stats.failed)}
            trendType="down"
          />
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Verification Counts */}
        <div className="lg:col-span-2 glass rounded-3xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg tracking-wide flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              Daily Verification Counts
            </h3>
            <span className="text-xs text-white/40">Last 7 Days</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.chartData || []}>
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} allowDecimals={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1625',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="count" fill="url(#colorUv)" radius={[4, 4, 0, 0]}>
                  {/* Gradient for bar */}
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="glass rounded-3xl p-6 flex flex-col gap-4">
          <h3 className="font-bold text-lg tracking-wide flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-indigo-400" />
            Verification Status
          </h3>
          <div className="h-48 w-full flex items-center justify-center relative">
            {pieData.length === 0 ? (
              <span className="text-xs text-white/40">No data available</span>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1625',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
            {stats && stats.total > 0 && (
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-white">{stats.total}</span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest">Total</span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              <span className="text-white/60">Verified ({stats?.verified || 0})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              <span className="text-white/60">Pending ({stats?.pending || 0})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
              <span className="text-white/60">In Progress ({stats?.inProgress || 0})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
              <span className="text-white/60">Failed ({stats?.failed || 0})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Candidates */}
      <div className="glass rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg tracking-wide">Recent Candidates</h3>
          <button
            onClick={() => navigate('/candidates')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-all group"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5 text-white/50 font-semibold text-xs tracking-wider uppercase">
                <th className="py-3.5 px-5">Name</th>
                <th className="py-3.5 px-5">Email</th>
                <th className="py-3.5 px-5">Date Submitted</th>
                <th className="py-3.5 px-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-white/80">
              {stats?.recent.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-white/40">
                    No candidates found. Click "Add Candidate" in the navigation panel to get started.
                  </td>
                </tr>
              ) : (
                stats?.recent.map((candidate) => (
                  <tr
                    key={candidate.id}
                    onClick={() => navigate(`/candidates/${candidate.id}`)}
                    className="hover:bg-white/5 transition-all duration-200 cursor-pointer"
                  >
                    <td className="py-3.5 px-5 font-bold text-white">{candidate.fullName}</td>
                    <td className="py-3.5 px-5 text-white/60">{candidate.email}</td>
                    <td className="py-3.5 px-5 text-white/50">{formatDate(candidate.createdAt)}</td>
                    <td className="py-3.5 px-5">
                      <StatusBadge status={candidate.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
