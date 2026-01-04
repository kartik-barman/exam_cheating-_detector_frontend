import { History, Camera } from 'lucide-react';
import { ActivityItem } from './ActivityItem';
import type { StudentResult } from '../types/monitoring';

interface ActivityPanelProps {
  results: StudentResult[];
}

export function ActivityPanel({ results }: ActivityPanelProps) {
  return (
    <div className="bg-neutral-900/50 rounded-3xl border border-white/5 p-6 flex-1 flex flex-col shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold flex items-center gap-2">
          <History className="w-4 h-4 text-neutral-500" />
          Recent Activity
        </h3>
        <span className="text-[10px] text-neutral-500 font-medium">Auto-refreshing</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 max-h-[500px] pr-2 custom-scrollbar">
        {results.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Camera className="w-6 h-6" />
            </div>
            <p className="text-sm">No suspicious activity <br />detected yet.</p>
          </div>
        ) : (
          results.map((student) => (
            <ActivityItem key={student.student_id} student={student} />
          ))
        )}
      </div>
    </div>
  );
}
