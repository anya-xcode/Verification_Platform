import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { useCandidateStore } from '../stores/candidateStore';
import { useToast } from '../components/ui/Toast';
import { CandidateForm } from '../components/candidates/CandidateForm';

export const NewCandidatePage = () => {
  const navigate = useNavigate();
  const createCandidate = useCandidateStore((state) => state.createCandidate);
  const loading = useCandidateStore((state) => state.loading);
  const { success, error } = useToast();

  const handleSubmit = async (values) => {
    try {
      const candidate = await createCandidate(values);
      success(`Candidate ${candidate.fullName} added successfully.`);
      navigate(`/candidates/${candidate.id}`);
    } catch (err) {
      error(err.response?.data?.error || 'Failed to add candidate. Check fields and try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header Back Button */}
      <Link
        to="/candidates"
        className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-all group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Candidates
      </Link>

      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <UserPlus className="w-8 h-8 text-indigo-400" />
          Add New Candidate
        </h1>
        <p className="text-white/50 text-sm">
          Enter candidate demographic details to submit for verification checks.
        </p>
      </div>

      <div className="glass rounded-3xl p-6 md:p-8 relative overflow-hidden">
        {/* Background glow orb */}
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <CandidateForm onSubmit={handleSubmit} isLoading={loading} />
      </div>
    </motion.div>
  );
};

export default NewCandidatePage;
