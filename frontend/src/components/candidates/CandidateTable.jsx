import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye, Trash2, ShieldAlert } from 'lucide-react';
import { useCandidateStore } from '../../stores/candidateStore';
import { useToast } from '../ui/Toast';
import { StatusBadge } from '../ui/StatusBadge';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export const CandidateTable = ({ candidates, onDeleteSuccess }) => {
  const navigate = useNavigate();
  const deleteCandidate = useCandidateStore((state) => state.deleteCandidate);
  const { success, error } = useToast();

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteCandidate(deleteId);
      success('Candidate deleted successfully.');
      setDeleteId(null);
      if (onDeleteSuccess) onDeleteSuccess();
    } catch (err) {
      error('Failed to delete candidate. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(dateString));
  };

  return (
    <div className="glass rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5 text-white/50 font-semibold text-xs tracking-wider uppercase">
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Phone</th>
              <th className="py-4 px-6">Date Added</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm text-white/80">
            {candidates.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-white/40">
                  No candidates matching the criteria were found.
                </td>
              </tr>
            ) : (
              candidates.map((candidate, index) => (
                <motion.tr
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  key={candidate.id}
                  className="hover:bg-white/5 transition-all duration-200 cursor-pointer group"
                  onClick={() => navigate(`/candidates/${candidate.id}`)}
                >
                  <td className="py-4 px-6 font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {candidate.fullName}
                  </td>
                  <td className="py-4 px-6 text-white/60">{candidate.email}</td>
                  <td className="py-4 px-6 text-white/50">{candidate.phone}</td>
                  <td className="py-4 px-6 text-white/40">{formatDate(candidate.createdAt)}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={candidate.status} />
                  </td>
                  <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => navigate(`/candidates/${candidate.id}`)}
                        className="p-2 rounded-lg bg-white/5 border border-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(candidate.id)}
                        className="p-2 rounded-lg bg-rose-500/10 border border-transparent text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/25 transition-all"
                        title="Delete Candidate"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Candidate">
        <div className="space-y-4">
          <div className="flex gap-3 text-sm text-white/70 leading-relaxed">
            <ShieldAlert className="w-10 h-10 text-rose-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-white text-base">Are you absolutely sure?</p>
              <p className="mt-1 text-xs">
                This action is permanent and will delete all associated verification checks and history logs.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <button onClick={() => setDeleteId(null)} className="btn-secondary px-5 py-2">
              Cancel
            </button>
            <Button onClick={handleDeleteConfirm} isLoading={deleting} variant="danger" className="px-5 py-2">
              Confirm Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CandidateTable;
