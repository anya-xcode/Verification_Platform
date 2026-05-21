import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export const Button = ({
  children,
  variant = 'primary',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'btn-primary text-white';
      case 'secondary':
        return 'btn-secondary text-white';
      case 'danger':
        return 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 hover:border-red-500/50 shadow-[0_4px_20px_-2px_rgba(239,68,68,0.1)] hover:shadow-[0_4px_20px_-2px_rgba(239,68,68,0.3)] rounded-xl font-medium px-4 py-2.5 flex items-center justify-center gap-2';
      default:
        return 'btn-primary text-white';
    }
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      disabled={disabled || isLoading}
      className={cn(
        getVariantClass(),
        'relative overflow-hidden transition-colors',
        disabled || isLoading ? 'opacity-50 cursor-not-allowed' : '',
        className
      )}
      {...props}
    >
      {/* Shine effect for primary buttons */}
      {variant === 'primary' && !disabled && !isLoading && (
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
      )}
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </span>
    </motion.button>
  );
};

export default Button;
