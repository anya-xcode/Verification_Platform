import { create } from 'zustand';
import { authApi } from '../services/api';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('vshield_token'),
  isAuthenticated: !!localStorage.getItem('vshield_token'),
  loading: false,

  login: async (credentials) => {
    set({ loading: true });
    try {
      const data = await authApi.login(credentials);
      localStorage.setItem('vshield_token', data.token);
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  register: async (userData) => {
    set({ loading: true });
    try {
      const data = await authApi.register(userData);
      localStorage.setItem('vshield_token', data.token);
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('vshield_token');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  fetchProfile: async () => {
    try {
      const data = await authApi.getProfile();
      set({ user: data.user });
    } catch (error) {
      // If token expired/invalid, clear auth state
      localStorage.removeItem('vshield_token');
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    }
  },
}));
