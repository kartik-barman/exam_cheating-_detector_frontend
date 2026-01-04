export interface StudentResult {
  student_id: string;
  first_detected_angle: number;
  first_detected_time: string;
  warning_count: number;
  image_url: string;
}

export interface MonitoringResponse {
  result: {
    status: string;
    total_students: number;
    students: StudentResult[];
  };
}

export interface MonitoringState {
  isMonitoring: boolean;
  results: StudentResult[];
  isLoading: boolean;
  error: string | null;
  lastUpdate: Date;
}
