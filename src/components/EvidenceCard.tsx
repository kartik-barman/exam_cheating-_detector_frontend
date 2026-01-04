import { motion } from 'framer-motion';
import { Activity, AlertTriangle } from 'lucide-react';
import type { StudentResult } from '../types/monitoring';

const BACKEND_URL = 'http://localhost:8000';

interface EvidenceCardProps {
  student: StudentResult;
}

export function EvidenceCard({ student }: EvidenceCardProps) {
  const isHighRisk = student.warning_count > 15;
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-neutral-900 rounded-3xl overflow-hidden border border-white/5 group shadow-xl"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={`${BACKEND_URL}${student.image_url}`} 
          alt="Evidence" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/400x225/111/444?text=Evidence+Missing';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
        <div className="absolute top-4 right-4 flex gap-2">
          {isHighRisk && (
            <div className="bg-red-500 text-white text-[9px] font-black px-2 py-1 rounded uppercase tracking-tighter animate-pulse shadow-lg shadow-red-500/40">
              High Risk
            </div>
          )}
          <div className="bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-2 py-1 rounded border border-white/10 uppercase tracking-tighter">
             Yaw: {student.first_detected_angle.toFixed(1)}°
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-mono text-neutral-500 font-bold truncate max-w-[140px]">
            ID: {student.student_id}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
             <Activity className="w-3.5 h-3.5" />
             {student.warning_count} Logs
          </div>
        </div>
        
        <div className="flex gap-2">
          <button className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2.5 rounded-xl text-xs font-bold transition-all border border-white/5">
            View Analysis
          </button>
          <button className="px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/20 transition-all">
            <AlertTriangle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
