import { ShieldCheck, RefreshCw } from 'lucide-react';

interface NavbarProps {
  isMonitoring: boolean;
  isLoading: boolean;
  onRefresh: () => void;
}

export function Navbar({ isMonitoring, isLoading, onRefresh }: NavbarProps) {
  return (
    <nav className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            Sentinel <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-4">AI</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${
            isMonitoring 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-neutral-800 border-white/5 text-neutral-500'
          }`}>
            {isMonitoring && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>}
            {isMonitoring ? 'Live Monitoring' : 'System Standby'}
          </div>
          <div className="h-4 w-[1px] bg-white/10 mx-2"></div>
          <button 
            onClick={onRefresh}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-neutral-400"
            title="Refresh Stats"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
    </nav>
  );
}
