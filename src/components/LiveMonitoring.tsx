import { useRef, useState } from 'react';
import { Maximize2, Shield, Activity, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface LiveMonitoringProps {
  isMonitoring: boolean;
  results: any[];
}

export function LiveMonitoring({ isMonitoring, results }: LiveMonitoringProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!videoRef.current) return;

    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const totalWarnings = results.reduce((sum, s) => sum + (s.warning_count || 0), 0);
  const riskLevel = totalWarnings > 10 ? 'High' : totalWarnings > 3 ? 'Medium' : 'Low';
  const riskColor = riskLevel === 'High' ? 'text-red-500' : riskLevel === 'Medium' ? 'text-yellow-500' : 'text-emerald-500';

  return (
    <div 
      ref={videoRef}
      className={`relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl group ${isFullscreen ? 'rounded-none' : ''}`}
    >
      {isMonitoring ? (
        <img 
          src="http://127.0.0.1:8000/api/v1/monitoring/video_feed" 
          alt="Live Monitoring Feed"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200';
          }}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-neutral-500">
          <Shield className="w-16 h-16 opacity-20" />
          <p className="font-medium">Monitoring service is offline</p>
        </div>
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

      {/* Top Bar */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none">
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10`}>
            {isMonitoring && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">
              {isMonitoring ? 'Live Monitor' : 'System Ready'}
            </span>
          </div>
          {isMonitoring && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-blue-500/20 backdrop-blur-md border border-blue-500/30 px-3 py-1.5 rounded-full"
            >
              <span className="text-[10px] font-bold text-blue-400">ENCRYPTION ACTIVE</span>
            </motion.div>
          )}
        </div>

        <button 
          onClick={toggleFullscreen}
          className="p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white pointer-events-auto hover:bg-white hover:text-black transition-all"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Dashboard Overlay */}
      <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <RiskStat icon={<Activity className="w-4 h-4" />} label="Avg. Yaw" value="12.4°" />
          <RiskStat icon={<Shield className="w-4 h-4" />} label="Risk Score" value={riskLevel} valueColor={riskColor} />
          <RiskStat icon={<AlertCircle className="w-4 h-4" />} label="Anomalies" value={totalWarnings.toString()} />
          <div className="px-4 py-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
            <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Status</p>
            <p className="text-sm font-bold text-white leading-none">Healthy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RiskStat({ icon, label, value, valueColor = "text-white" }: { icon: React.ReactNode, label: string, value: string, valueColor?: string }) {
  return (
    <div className="px-4 py-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
      <div className="flex items-center gap-2 text-neutral-500 mb-1">
        {icon}
        <span className="text-[10px] font-bold uppercase">{label}</span>
      </div>
      <p className={`text-sm font-bold ${valueColor} leading-none`}>{value}</p>
    </div>
  );
}
