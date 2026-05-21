import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';

const candidateSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of Birth must be in YYYY-MM-DD format'),
  aadhaarNumber: z.string().regex(/^[0-9]{12}$/, 'Aadhaar number must be exactly 12 digits'),
  panNumber: z.string().regex(/^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/, 'PAN must be in format ABCDE1234F'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
});

export const CandidateForm = ({ initialValues, onSubmit, isLoading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(candidateSchema),
    defaultValues: initialValues || {
      fullName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      aadhaarNumber: '',
      panNumber: '',
      address: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-white/70">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="input-field"
            {...register('fullName')}
          />
          {errors.fullName && (
            <span className="text-xs text-rose-400 font-medium">{errors.fullName.message}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-white/70">Email Address</label>
          <input
            type="email"
            placeholder="johndoe@example.com"
            className="input-field"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-xs text-rose-400 font-medium">{errors.email.message}</span>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-white/70">Phone Number</label>
          <input
            type="tel"
            placeholder="9876543210"
            className="input-field"
            {...register('phone')}
          />
          {errors.phone && (
            <span className="text-xs text-rose-400 font-medium">{errors.phone.message}</span>
          )}
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-white/70">Date of Birth</label>
          <input
            type="date"
            className="input-field"
            {...register('dateOfBirth')}
          />
          {errors.dateOfBirth && (
            <span className="text-xs text-rose-400 font-medium">{errors.dateOfBirth.message}</span>
          )}
        </div>

        {/* Aadhaar Number */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-white/70">Aadhaar Number (12 digits)</label>
          <input
            type="text"
            maxLength={12}
            placeholder="123456789012"
            className="input-field"
            {...register('aadhaarNumber')}
          />
          {errors.aadhaarNumber && (
            <span className="text-xs text-rose-400 font-medium">{errors.aadhaarNumber.message}</span>
          )}
        </div>

        {/* PAN Number */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-white/70">PAN Card Number</label>
          <input
            type="text"
            placeholder="ABCDE1234F"
            className="input-field uppercase"
            {...register('panNumber')}
          />
          {errors.panNumber && (
            <span className="text-xs text-rose-400 font-medium">{errors.panNumber.message}</span>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-white/70">Full Address</label>
        <textarea
          rows={3}
          placeholder="Enter detailed residential address..."
          className="input-field resize-none"
          {...register('address')}
        />
        {errors.address && (
          <span className="text-xs text-rose-400 font-medium">{errors.address.message}</span>
        )}
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t border-white/5">
        <Button type="submit" isLoading={isLoading} className="px-8">
          Save Candidate
        </Button>
      </div>
    </form>
  );
};

export default CandidateForm;
