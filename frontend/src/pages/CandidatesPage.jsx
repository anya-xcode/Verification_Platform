import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCandidateStore } from '../stores/candidateStore';
import { CandidateTable } from '../components/candidates/CandidateTable';
import { Button } from '../components/ui/Button';
import { TableSkeleton } from '../components/ui/LoadingSkeleton';

export const CandidatesPage = () => {
  const navigate = useNavigate();
  const { candidates, pagination, loading, fetchCandidates } = useCandidateStore();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  const handleLoad = useCallback((page = 1) => {
    fetchCandidates({
      page,
      limit: 10,
      search: search.trim() || undefined,
      status: status !== 'ALL' ? status : undefined,
    });
  }, [search, status, fetchCandidates]);

  useEffect(() => {
    handleLoad(1);
  }, [debouncedSearch, status]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Candidates</h1>
          <p className="text-white/50 text-sm">
            Manage your candidates and monitor their background verification logs.
          </p>
        </div>
        <Button onClick={() => navigate('/candidates/new')} className="sm:self-start">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Candidate
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Search */}
        <div className="sm:col-span-2 relative">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-white/30" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            className="input-field pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <Filter className="absolute left-3.5 top-3.5 h-4 w-4 text-white/30" />
          <select
            className="input-field pl-10 appearance-none bg-darkBg"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="VERIFIED">Verified</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>
      </div>

      {/* Candidates List */}
      {loading && candidates.length === 0 ? (
        <TableSkeleton />
      ) : (
        <div className="space-y-4">
          <CandidateTable
            candidates={candidates}
            onDeleteSuccess={() => handleLoad(pagination.page)}
          />

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span className="text-xs text-white/40">
                Page {pagination.page} of {pagination.totalPages} ({pagination.total} total candidates)
              </span>
              <div className="flex gap-2">
                <button
                  disabled={pagination.page <= 1 || loading}
                  onClick={() => handleLoad(pagination.page - 1)}
                  className="p-2 glass hover:bg-white/10 rounded-xl disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  disabled={pagination.page >= pagination.totalPages || loading}
                  onClick={() => handleLoad(pagination.page + 1)}
                  className="p-2 glass hover:bg-white/10 rounded-xl disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default CandidatesPage;
