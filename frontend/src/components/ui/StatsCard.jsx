import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

export const StatsCard = ({ title, value, icon, description, trend, trendType = 'neutral', index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="glass-panel p-6 flex flex-col gap-4 relative overflow-hidden group"
    >
      {/* Glossy top highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
      
      {/* Background glow orb */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-500"></div>

      <div className="flex items-center justify-between relative z-10">
        <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">{title}</span>
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-indigo-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-300 transition-colors">
          {icon}
        </div>
      </div>

      <div className="flex items-baseline justify-between mt-2 relative z-10">
        <h2 className="text-4xl font-black text-white tracking-tight">{value}</h2>
        {trend && (
          <div
            className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg border backdrop-blur-md ${
              trendType === 'up'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : trendType === 'down'
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  : 'bg-white/5 text-white/50 border-white/10'
            }`}
          >
            {trendType === 'up' ? (
              <ArrowUpRight className="w-3.5 h-3.5" />
            ) : trendType === 'down' ? (
              <ArrowDownRight className="w-3.5 h-3.5" />
            ) : (
              <Minus className="w-3.5 h-3.5" />
            )}
            {trend}
          </div>
        )}
      </div>

      {description && <p className="text-xs text-white/40 mt-1 relative z-10">{description}</p>}
    </motion.div>
  );
};

export default StatsCard;
