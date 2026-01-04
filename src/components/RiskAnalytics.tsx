import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck } from 'lucide-react';

interface RiskAnalyticsProps {
  results: any[];
}

export function RiskAnalytics({ results }: RiskAnalyticsProps) {
  const totalWarnings = results.reduce((sum, s) => sum + (s.warning_count || 0), 0);
  
  // Create a mock trend data based on warning counts
  const trendData = [30, 45, 35, 50, 40, 60, 45].map(v => v + (results.length * 2));

  return (
    <div className="bg-neutral-900/50 rounded-3xl border border-white/5 p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-500" />
          Risk Vectors
        </h3>
        <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded-md font-bold">24H ANALYSIS</span>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Integrity Score</p>
            <p className="text-2xl font-bold text-emerald-400">{results.length > 0 ? (100 - (totalWarnings * 2)).toFixed(1) : '100'}%</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Alert Density</p>
            <p className="text-2xl font-bold text-white">{(totalWarnings / (results.length || 1)).toFixed(1)}</p>
          </div>
        </div>

        {/* Mock Chart */}
        <div className="h-24 flex items-end gap-1 px-2">
          {trendData.map((val, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${val}%` }}
              className={`flex-1 rounded-t-lg ${i === trendData.length - 1 ? 'bg-blue-500' : 'bg-white/10'}`}
            />
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-blue-500/5 border border-blue-500/10">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">AI Engine Status</p>
            <p className="text-[10px] text-blue-400 font-medium">Monitoring behavioral patterns...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
