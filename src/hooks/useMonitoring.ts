import { useState, useEffect, useCallback } from 'react';
import type { StudentResult } from '../types/monitoring';
import { 
  startMonitoringApi, 
  stopMonitoringApi, 
  getMonitoringResultsApi,
  getMonitoringStatusApi
} from '../api/monitoring';

export function useMonitoring() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [results, setResults] = useState<StudentResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchResults = useCallback(async () => {
    try {
      const data = await getMonitoringResultsApi();
      if (data.result.status === 'ok') {
        setResults(data.result.students);
        setLastUpdate(new Date());
      }
    } catch (err) {
      console.error('Failed to fetch results:', err);
    }
  }, []);

  // Sync status and fetch results on mount
  useEffect(() => {
    const sync = async () => {
      try {
        const status = await getMonitoringStatusApi();
        setIsMonitoring(status.is_running);
        await fetchResults();
      } catch (err) {
        console.error('Initial sync failed:', err);
      }
    };
    sync();
  }, [fetchResults]);

  // Persistent polling for results
  useEffect(() => {
    const interval = setInterval(fetchResults, 2000);
    return () => clearInterval(interval);
  }, [fetchResults]);

  const toggleMonitoring = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (isMonitoring) {
        await stopMonitoringApi();
        setIsMonitoring(false);
      } else {
        await startMonitoringApi();
        setIsMonitoring(true);
      }
    } catch (err) {
      setError('Connection to backend failed. Please check if the server is running.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isMonitoring,
    results,
    isLoading,
    error,
    lastUpdate,
    toggleMonitoring,
    fetchResults,
    setError
  };
}
