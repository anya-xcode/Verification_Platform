import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  User,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Download,
  Calendar,
  Phone,
  Mail,
  MapPin,
  FileText,
  BadgeAlert,
} from 'lucide-react';
import { useCandidateStore } from '../stores/candidateStore';
import { useToast } from '../components/ui/Toast';
import { reportApi } from '../services/api';
import { StatusBadge } from '../components/ui/StatusBadge';
import { VerificationTimeline } from '../components/verification/VerificationTimeline';
import { DetailSkeleton } from '../components/ui/LoadingSkeleton';

export const CandidateDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success, error } = useToast();

  const {
    selectedCandidate,
    loading,
    actionLoading,
    fetchCandidateById,
    verifyAadhaar,
    verifyPan,
  } = useCandidateStore();

  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCandidateById(id);
    }
  }, [id, fetchCandidateById]);

  // Mask Aadhaar: show only last 4
  const maskAadhaar = (val) => {
    if (!val || val.length !== 12) return 'XXXX XXXX XXXX';
    return `XXXX XXXX ${val.slice(-4)}`;
  };

  // Mask PAN: show first 2 and last 2
  const maskPan = (val) => {
    if (!val || val.length !== 10) return '**********';
    return `${val.slice(0, 2)}******${val.slice(-2)}`;
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(dateString));
  };

  const handleVerifyAadhaar = async () => {
    if (!id) return;
    try {
      await verifyAadhaar(id);
      success('Aadhaar verification request completed.');
    } catch (err) {
      error(err.message || 'Failed to verify Aadhaar.');
    }
  };

  const handleVerifyPan = async () => {
    if (!id) return;
    try {
      await verifyPan(id);
      success('PAN verification request completed.');
    } catch (err) {
      error(err.message || 'Failed to verify PAN.');
    }
  };

  const handleDownloadReport = async () => {
    if (!id || !selectedCandidate) return;
    setDownloading(true);
    try {
      const blob = await reportApi.downloadReport(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `vshield-report-${selectedCandidate.fullName.toLowerCase().replace(/\s+/g, '-')}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
      success('Verification report downloaded successfully.');
    } catch (err) {
      error('Failed to download report. Ensure verification is completed.');
    } finally {
      setDownloading(false);
    }
  };

  if (loading && !selectedCandidate) {
    return <DetailSkeleton />;
  }

  if (!selectedCandidate) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <BadgeAlert className="w-12 h-12 text-rose-400" />
        <h3 className="text-xl font-bold">Candidate Not Found</h3>
        <p className="text-white/50 max-w-sm">
          The candidate details could not be found. They may have been deleted.
        </p>
        <button onClick={() => navigate('/candidates')} className="btn-secondary">
          Back to Candidates
        </button>
      </div>
    );
  }

  // Check if verifications are successful
  const isAadhaarVerified = selectedCandidate.verificationLogs.some(
    (l) => l.type === 'AADHAAR' && l.status === 'SUCCESS'
  );
  const isPanVerified = selectedCandidate.verificationLogs.some(
    (l) => l.type === 'PAN' && l.status === 'SUCCESS'
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header Back Button */}
      <button
        onClick={() => navigate('/candidates')}
        className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-all group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Candidates
      </button>

      {/* Main Details and Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Candidate Information Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
            {/* Background Radial Glow */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl"></div>

            <div className="flex justify-between items-start flex-wrap gap-4 border-b border-white/5 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">
                  <User className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-wide">
                    {selectedCandidate.fullName}
                  </h2>
                  <p className="text-xs text-white/40 mt-1">Candidate ID: {selectedCandidate.id}</p>
                </div>
              </div>
              <StatusBadge status={selectedCandidate.status} />
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 text-sm">
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <div className="space-y-0.5">
                  <p className="text-xs text-white/40 font-semibold uppercase tracking-wider">Email Address</p>
                  <p className="text-white/80">{selectedCandidate.email}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <div className="space-y-0.5">
                  <p className="text-xs text-white/40 font-semibold uppercase tracking-wider">Phone Number</p>
                  <p className="text-white/80">{selectedCandidate.phone}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Calendar className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <div className="space-y-0.5">
                  <p className="text-xs text-white/40 font-semibold uppercase tracking-wider">Date of Birth</p>
                  <p className="text-white/80">{formatDate(selectedCandidate.dateOfBirth)}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <div className="space-y-0.5">
                  <p className="text-xs text-white/40 font-semibold uppercase tracking-wider">Address</p>
                  <p className="text-white/80 leading-relaxed">{selectedCandidate.address}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <FileText className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <div className="space-y-0.5">
                  <p className="text-xs text-white/40 font-semibold uppercase tracking-wider">Aadhaar Number</p>
                  <p className="text-white/80 font-mono tracking-wider">
                    {maskAadhaar(selectedCandidate.aadhaarNumber)}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <FileText className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <div className="space-y-0.5">
                  <p className="text-xs text-white/40 font-semibold uppercase tracking-wider">PAN Card Number</p>
                  <p className="text-white/80 font-mono tracking-wider">
                    {maskPan(selectedCandidate.panNumber)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Log Timeline */}
          <VerificationTimeline logs={selectedCandidate.verificationLogs} />
        </div>

        {/* Verification Check Actions Card */}
        <div className="space-y-6">
          <div className="glass rounded-3xl p-6 space-y-6">
            <h3 className="text-lg font-bold tracking-wide flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-400" />
              Perform Checks
            </h3>
            <p className="text-xs text-white/50 leading-relaxed">
              Verify identity details against official registries using our secure API gateways.
            </p>

            <div className="space-y-4">
              {/* Aadhaar Verification Button */}
              <button
                disabled={isAadhaarVerified || actionLoading[`aadhaar-${selectedCandidate.id}`]}
                onClick={handleVerifyAadhaar}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                  isAadhaarVerified
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 cursor-default'
                    : 'glass hover:bg-white/5 border-white/10 hover:border-indigo-500/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5" />
                  <div className="text-left">
                    <p className="text-sm font-bold">Aadhaar Registry Check</p>
                    <p className="text-[10px] text-white/40 mt-0.5">Demographic Verification</p>
                  </div>
                </div>
                {isAadhaarVerified ? (
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Verified</span>
                ) : (
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Verify</span>
                )}
              </button>

              {/* PAN Verification Button */}
              <button
                disabled={isPanVerified || actionLoading[`pan-${selectedCandidate.id}`]}
                onClick={handleVerifyPan}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                  isPanVerified
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 cursor-default'
                    : 'glass hover:bg-white/5 border-white/10 hover:border-indigo-500/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5" />
                  <div className="text-left">
                    <p className="text-sm font-bold">PAN Card Check</p>
                    <p className="text-[10px] text-white/40 mt-0.5">Income Tax Registry Check</p>
                  </div>
                </div>
                {isPanVerified ? (
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Verified</span>
                ) : (
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Verify</span>
                )}
              </button>
            </div>
          </div>

          {/* Report Download Card */}
          <div className="glass rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-bold tracking-wide flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              Download Report
            </h3>
            <p className="text-xs text-white/50 leading-relaxed">
              Export a professionally formatted PDF verification summary report including registry details.
            </p>
            <button
              disabled={selectedCandidate.status === 'PENDING' || selectedCandidate.status === 'IN_PROGRESS' || downloading}
              onClick={handleDownloadReport}
              className={`w-full btn-primary font-bold ${
                selectedCandidate.status === 'PENDING' || selectedCandidate.status === 'IN_PROGRESS'
                  ? 'opacity-40 cursor-not-allowed transform-none hover:shadow-none bg-none bg-white/5 border border-white/10 text-white/30'
                  : ''
              }`}
            >
              {downloading ? (
                'Generating PDF...'
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Get Verification Report
                </>
              )}
            </button>
            {(selectedCandidate.status === 'PENDING' || selectedCandidate.status === 'IN_PROGRESS') && (
              <p className="text-[10px] text-amber-500/80 leading-snug flex items-center gap-1.5 justify-center">
                <ShieldAlert className="w-3.5 h-3.5" />
                Complete checks above to unlock report download.
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CandidateDetailPage;
