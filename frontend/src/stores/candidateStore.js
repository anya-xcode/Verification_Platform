import { create } from 'zustand';
import { candidateApi, verificationApi } from '../services/api';

export const useCandidateStore = create((set, get) => ({
  candidates: [],
  selectedCandidate: null,
  stats: null,
  loading: false,
  actionLoading: {},
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  },

  fetchCandidates: async (params) => {
    set({ loading: true });
    try {
      const data = await candidateApi.getCandidates(params);
      set({
        candidates: data.candidates,
        pagination: data.pagination,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
    }
  },

  fetchCandidateById: async (id) => {
    set({ loading: true });
    try {
      const data = await candidateApi.getCandidateById(id);
      set({
        selectedCandidate: data.candidate,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
    }
  },

  createCandidate: async (candidateData) => {
    set({ loading: true });
    try {
      const data = await candidateApi.createCandidate(candidateData);
      set({ loading: false });
      return data.candidate;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  deleteCandidate: async (id) => {
    try {
      await candidateApi.deleteCandidate(id);
      set((state) => ({
        candidates: state.candidates.filter((c) => c.id !== id),
      }));
    } catch (error) {
      throw error;
    }
  },

  fetchStats: async () => {
    set({ loading: true });
    try {
      const data = await candidateApi.getStats();
      set({ stats: data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  verifyAadhaar: async (candidateId) => {
    set((state) => ({
      actionLoading: { ...state.actionLoading, [`aadhaar-${candidateId}`]: true },
    }));
    try {
      const data = await verificationApi.verifyAadhaar(candidateId);
      // Refresh the selected candidate details with latest verificationLogs
      if (get().selectedCandidate?.id === candidateId) {
        set({ selectedCandidate: data.candidate });
      }
      set((state) => ({
        actionLoading: { ...state.actionLoading, [`aadhaar-${candidateId}`]: false },
      }));
    } catch (error) {
      set((state) => ({
        actionLoading: { ...state.actionLoading, [`aadhaar-${candidateId}`]: false },
      }));
      throw error;
    }
  },

  verifyPan: async (candidateId) => {
    set((state) => ({
      actionLoading: { ...state.actionLoading, [`pan-${candidateId}`]: true },
    }));
    try {
      const data = await verificationApi.verifyPan(candidateId);
      if (get().selectedCandidate?.id === candidateId) {
        set({ selectedCandidate: data.candidate });
      }
      set((state) => ({
        actionLoading: { ...state.actionLoading, [`pan-${candidateId}`]: false },
      }));
    } catch (error) {
      set((state) => ({
        actionLoading: { ...state.actionLoading, [`pan-${candidateId}`]: false },
      }));
      throw error;
    }
  },
}));
