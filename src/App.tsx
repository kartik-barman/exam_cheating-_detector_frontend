import { AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMonitoring } from './hooks/useMonitoring';
import { Navbar } from './layout/Navbar';
import { MonitoringControls } from './components/MonitoringControls';
import { StatsGrid } from './components/StatsGrid';
import { ActivityPanel } from './components/ActivityPanel';
import { EvidenceGallery } from './components/EvidenceGallery';
import { LiveMonitoring } from './components/LiveMonitoring';
import { RiskAnalytics } from './components/RiskAnalytics';

function App() {
  const {
    isMonitoring,
    results,
    isLoading,
    error,
    lastUpdate,
    toggleMonitoring,
    fetchResults,
    setError
  } = useMonitoring();

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-neutral-100 font-sans selection:bg-blue-500/30">
      <Navbar 
        isMonitoring={isMonitoring} 
        isLoading={isLoading} 
        onRefresh={fetchResults} 
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <LiveMonitoring 
              isMonitoring={isMonitoring}
              results={results}
            />
            <MonitoringControls 
              isMonitoring={isMonitoring}
              isLoading={isLoading}
              onToggle={toggleMonitoring}
            />
            <StatsGrid results={results} />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
             <ActivityPanel results={results} />
             <RiskAnalytics results={results} />
          </div>
        </div>

        <EvidenceGallery results={results} lastUpdate={lastUpdate} />
      </main>

      {/* Error Toast Notification */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span className="font-semibold text-sm">{error}</span>
            <button onClick={() => setError(null)} className="ml-4 hover:opacity-70">✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
