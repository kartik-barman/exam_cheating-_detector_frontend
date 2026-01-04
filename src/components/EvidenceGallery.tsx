import { motion, AnimatePresence } from 'framer-motion';
import { Users } from 'lucide-react';
import { EvidenceCard } from './EvidenceCard';
import type { StudentResult } from '../types/monitoring';

interface EvidenceGalleryProps {
  results: StudentResult[];
  lastUpdate: Date;
}

export function EvidenceGallery({ results, lastUpdate }: EvidenceGalleryProps) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Evidence Captured</h2>
          <p className="text-neutral-500 text-sm">Visual logs of flagged incidents</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-500 bg-white/5 px-3 py-1.5 rounded-full">
           Last update: {lastUpdate.toLocaleTimeString()}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {results.length === 0 ? (
           <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-neutral-900/30 border border-dashed border-white/10 rounded-3xl p-16 text-center"
           >
             <Users className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
             <h3 className="text-neutral-400 font-medium">System is waiting for incidents</h3>
             <p className="text-neutral-600 text-sm">Warnings will appear here after starting the service.</p>
           </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((student) => (
              <EvidenceCard key={student.student_id} student={student} />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
