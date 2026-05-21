import React from 'react';

export const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'VERIFIED':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'FAILED':
        return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
      case 'IN_PROGRESS':
        return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
      case 'PENDING':
      default:
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'VERIFIED':
        return 'Verified';
      case 'FAILED':
        return 'Failed';
      case 'IN_PROGRESS':
        return 'In Progress';
      case 'PENDING':
      default:
        return 'Pending';
    }
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${getStatusStyles()}`}>
      {getStatusText()}
    </span>
  );
};

export default StatusBadge;
