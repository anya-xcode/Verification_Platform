import React from 'react';
import { CheckCircle2, XCircle, Clock, Info } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';

export const VerificationTimeline = ({ logs }) => {
  const getIcon = (status) => {
    switch (status) {
      case 'SUCCESS':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'FAILED':
        return <XCircle className="w-5 h-5 text-rose-400" />;
      case 'PENDING':
      default:
        return <Clock className="w-5 h-5 text-amber-400 animate-pulse" />;
    }
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold tracking-wide flex items-center gap-2">
        <Info className="w-5 h-5 text-indigo-400" />
        Verification Log History
      </h3>

      {logs.length === 0 ? (
        <div className="p-6 text-center text-white/40 glass rounded-2xl">
          No verification attempts made yet. Trigger Aadhaar or PAN checks above.
        </div>
      ) : (
        <div className="relative border-l border-white/10 pl-6 ml-3 space-y-6">
          {logs.map((log) => (
            <div key={log.id} className="relative group">
              {/* Chronological Indicator Bullet */}
              <div className="absolute -left-[37px] top-1 p-1 bg-darkBg rounded-full border border-white/10 group-hover:border-indigo-500/50 transition-all">
                {getIcon(log.status)}
              </div>

              {/* Log Card */}
              <div className="glass rounded-2xl p-5 space-y-3 relative overflow-hidden transition-all duration-300 hover:bg-white/5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-sm uppercase tracking-wider text-indigo-300">
                      {log.type} Verification
                    </span>
                    <span className="text-xs text-white/40">
                      {formatDate(log.createdAt)}
                    </span>
                  </div>
                  <StatusBadge status={log.status} />
                </div>

                {log.responsePayload && (
                  <div className="bg-black/20 rounded-xl p-3 border border-white/5 space-y-2 text-xs">
                    <div className="flex justify-between flex-wrap gap-1 text-white/50">
                      <span>Reference ID:</span>
                      <span className="font-semibold text-white/80">{log.responsePayload.referenceId}</span>
                    </div>
                    <div className="flex justify-between flex-wrap gap-1 text-white/50">
                      <span>Message:</span>
                      <span className="text-white/85 text-right">{log.responsePayload.message}</span>
                    </div>
                    {log.responsePayload.details && Object.keys(log.responsePayload.details).length > 0 && (
                      <div className="mt-2 pt-2 border-t border-white/5 space-y-1">
                        <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Verification Metadata</span>
                        {Object.entries(log.responsePayload.details).map(([key, val]) => (
                          <div key={key} className="flex justify-between text-[11px] text-white/45">
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                            <span className="text-white/70">{String(val)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerificationTimeline;
