import axios from 'axios';
import type { MonitoringResponse } from '../types/monitoring';

const API_BASE_URL = 'https://examcheating-detector-backend.onrender.com/api/v1/monitoring';

export const startMonitoringApi = async () => {
  const response = await axios.get(`${API_BASE_URL}/start`);
  return response.data;
};

export const stopMonitoringApi = async () => {
  const response = await axios.get(`${API_BASE_URL}/stop`);
  return response.data;
};

export const getMonitoringStatusApi = async (): Promise<{ is_running: boolean }> => {
  const response = await axios.get(`${API_BASE_URL}/status`);
  return response.data;
};

export const getMonitoringResultsApi = async (): Promise<MonitoringResponse> => {
  const response = await axios.get(`${API_BASE_URL}/result`);
  return response.data;
};
