import React from 'react';

export const StatsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="glass rounded-3xl p-6 h-36 flex flex-col justify-between border border-white/5">
        <div className="flex justify-between items-center">
          <div className="h-4 w-28 bg-white/5 rounded"></div>
          <div className="h-8 w-8 bg-white/5 rounded-xl"></div>
        </div>
        <div className="h-8 w-16 bg-white/5 rounded"></div>
        <div className="h-3 w-36 bg-white/5 rounded"></div>
      </div>
    ))}
  </div>
);

export const TableSkeleton = () => (
  <div className="glass rounded-3xl p-6 space-y-4 animate-pulse">
    <div className="h-8 w-48 bg-white/5 rounded"></div>
    <div className="border border-white/5 rounded-2xl overflow-hidden">
      <div className="h-12 bg-white/5 border-b border-white/5"></div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-16 border-b border-white/5 flex items-center justify-between px-6 gap-4">
          <div className="h-4 w-1/4 bg-white/5 rounded"></div>
          <div className="h-4 w-1/4 bg-white/5 rounded"></div>
          <div className="h-4 w-1/6 bg-white/5 rounded"></div>
          <div className="h-6 w-20 bg-white/5 rounded-full"></div>
        </div>
      ))}
    </div>
  </div>
);

export const DetailSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="h-4 w-32 bg-white/5 rounded"></div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="glass rounded-3xl p-8 h-80 space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/5 rounded-2xl"></div>
              <div className="space-y-2">
                <div className="h-6 w-48 bg-white/5 rounded"></div>
                <div className="h-3 w-32 bg-white/5 rounded"></div>
              </div>
            </div>
            <div className="h-6 w-20 bg-white/5 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-5 h-5 bg-white/5 rounded"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-3 w-16 bg-white/5 rounded"></div>
                  <div className="h-4 w-32 bg-white/5 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="glass rounded-3xl p-6 h-56"></div>
        <div className="glass rounded-3xl p-6 h-40"></div>
      </div>
    </div>
  </div>
);
