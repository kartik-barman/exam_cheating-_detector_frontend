import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue: string;
  variant?: 'default' | 'warning';
}

export function StatCard({ icon, label, value, subValue, variant = 'default' }: StatCardProps) {
  return (
    <div className={`p-6 rounded-2xl border bg-neutral-900/50 shadow-lg ${
      variant === 'warning' ? 'border-amber-500/20' : 'border-white/5'
    }`}>
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
        {icon}
      </div>
      <div className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</div>
      <div className="text-3xl font-black mb-1">{value}</div>
      <div className="text-[10px] text-neutral-400 font-medium">{subValue}</div>
    </div>
  );
}
