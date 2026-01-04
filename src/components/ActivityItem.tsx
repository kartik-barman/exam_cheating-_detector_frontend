import { History, AlertTriangle, ChevronRight } from 'lucide-react';
import type { StudentResult } from '../types/monitoring';

const BACKEND_URL = 'http://localhost:8000';

interface ActivityItemProps {
  student: StudentResult;
}

export function ActivityItem({ student }: ActivityItemProps) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group">
      <div className="relative shrink-0">
        <img 
          src={`${BACKEND_URL}${student.image_url}`} 
          alt="Student" 
          className="w-12 h-12 rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all border border-white/10"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=User&background=333&color=fff';
          }}
        />
        {student.warning_count > 10 && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-[#0a0a0c] rounded-full"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold truncate tracking-tight">{student.student_id}</div>
        <div className="text-[10px] text-neutral-500 font-medium flex items-center gap-2">
           <span className="flex items-center gap-1"><History className="w-3 h-3" /> {student.first_detected_time.split(' ')[1]}</span>
           <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-amber-500/70" /> {student.warning_count} warnings</span>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
