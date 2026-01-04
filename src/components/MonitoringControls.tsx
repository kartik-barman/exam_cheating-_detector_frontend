import { Play, Square, Activity } from 'lucide-react';

interface MonitoringControlsProps {
  isMonitoring: boolean;
  isLoading: boolean;
  onToggle: () => void;
}

export function MonitoringControls({ isMonitoring, isLoading, onToggle }: MonitoringControlsProps) {
  return (
    <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Activity className="w-32 h-32" />
      </div>
      
      <div className="relative z-10">
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight leading-tight">
          Intelligent Exam <br />
          <span className="text-blue-500">Integrity Monitoring</span>
        </h1>
        <p className="text-neutral-400 text-lg max-w-lg mb-8">
          Using advanced head-pose estimation and computer vision to ensure 
          a fair testing environment for every student.
        </p>

        <div className="flex flex-wrap gap-4">
          <button 
            onClick={onToggle}
            disabled={isLoading}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all shadow-xl active:scale-95 ${
              isMonitoring 
                ? 'bg-white text-black hover:bg-neutral-200 shadow-white/10' 
                : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/20'
            }`}
          >
            {isMonitoring ? (
              <><Square className="w-5 h-5 fill-current" /> Stop Service</>
            ) : (
              <><Play className="w-5 h-5 fill-current" /> Start Detection</>
            )}
          </button>
          
          <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
            <div className="flex flex-col">
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Detection Confidence</span>
              <span className="text-emerald-400 font-mono font-bold">98.4%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
