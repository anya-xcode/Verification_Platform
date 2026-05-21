import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Key, Mail } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { Button } from '../components/ui/Button';
import { useToast } from '../components/ui/Toast';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const { success, error } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      success('Welcome back to VShield!');
      navigate('/');
    } catch (err) {
      error(err.response?.data?.error || 'Login failed. Please check credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-darkBg relative overflow-hidden">
      {/* Background radial gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>

      <div className="w-full max-w-md space-y-8 glass rounded-3xl p-8 relative border border-white/10 shadow-2xl backdrop-blur-2xl animate-fade-in z-10">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.4)] mb-2">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold tracking-wider text-white">VShield</h2>
          <p className="text-sm text-white/50">Secure Background Verification Platform</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-white/30" />
              <input
                type="email"
                placeholder="admin@vshield.com"
                className="input-field pl-10"
                {...register('email')}
              />
            </div>
            {errors.email && (
              <span className="text-xs text-rose-400 font-medium">{errors.email.message}</span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Key className="absolute left-3.5 top-3.5 h-4 w-4 text-white/30" />
              <input
                type="password"
                placeholder="••••••••"
                className="input-field pl-10"
                {...register('password')}
              />
            </div>
            {errors.password && (
              <span className="text-xs text-rose-400 font-medium">{errors.password.message}</span>
            )}
          </div>

          <Button type="submit" isLoading={loading} className="w-full mt-2">
            Sign In
          </Button>
        </form>

        <div className="text-center text-xs text-white/40 pt-4 border-t border-white/5">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-all">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
