import { Users, AlertTriangle, Activity } from 'lucide-react';
import { StatCard } from '../shared/StatCard';
import type { StudentResult } from '../types/monitoring';

interface StatsGridProps {
  results: StudentResult[];
}

export function StatsGrid({ results }: StatsGridProps) {
  const alertCount = results.filter(r => r.warning_count > 5).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        icon={<Users className="text-blue-400" />} 
        label="Total Sessions" 
        value={results.length.toString()} 
        subValue="+2 from last hour"
      />
      <StatCard 
        icon={<AlertTriangle className="text-amber-400" />} 
        label="Active Alerts" 
        value={alertCount.toString()} 
        subValue="Immediate attention req."
        variant="warning"
      />
      <StatCard 
        icon={<Activity className="text-emerald-400" />} 
        label="Avg. Response" 
        value="12ms" 
        subValue="Real-time performance"
      />
    </div>
  );
}
