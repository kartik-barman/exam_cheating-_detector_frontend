import { useRef, useState, useEffect } from 'react';
import { Maximize2, Shield, Activity, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_BASE_URL } from '../config/config';


interface LiveMonitoringProps {
  isMonitoring: boolean;
  results: any[];
}

export function LiveMonitoring({ isMonitoring, results }: LiveMonitoringProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [currentYaw, setCurrentYaw] = useState<number | null>(null);

  // Initialize Webcam in Browser
  useEffect(() => {
    async function setupWebcam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720, facingMode: 'user' }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch (err) {
        console.error("Webcam access denied:", err);
        setHasPermission(false);
      }
    }
    setupWebcam();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  // Frame Processing Loop
  useEffect(() => {
    let intervalId: any;

    if (isMonitoring && hasPermission) {
      intervalId = setInterval(async () => {
        if (!videoRef.current || !canvasRef.current || !isMonitoring) return;

        const canvas = canvasRef.current;
        const video = videoRef.current;
        const context = canvas.getContext('2d');

        if (context) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          const base64Image = canvas.toDataURL('image/jpeg', 0.6);

          try {
            const response = await axios.post(`${API_BASE_URL}/process_frame`, {
              image: base64Image
            });
            if (response.data.yaw !== undefined) {
              setCurrentYaw(response.data.yaw);
            }
          } catch (err) {
            console.error("Frame processing error:", err);
          }
        }
      }, 500); // Process every 500ms to balance accuracy and performance
    }

    return () => clearInterval(intervalId);
  }, [isMonitoring, hasPermission]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const totalWarnings = results.reduce((sum, s) => sum + (s.warning_count || 0), 0);
  const riskLevel = totalWarnings > 10 ? 'High' : totalWarnings > 3 ? 'Medium' : 'Low';
  const riskColor = riskLevel === 'High' ? 'text-red-500' : riskLevel === 'Medium' ? 'text-yellow-500' : 'text-emerald-500';

  return (
    <div
      ref={containerRef}
      className={`relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl group ${isFullscreen ? 'rounded-none' : ''}`}
    >
      {isMonitoring ? (
        <img
          src="http://127.0.0.1:8000/api/v1/monitoring/video_feed"
          alt="Live Monitoring Feed"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200';
          }}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-neutral-500">
          <Shield className="w-16 h-16 opacity-20" />
          <p className="font-medium">Monitoring service is offline</p>
        </div>
      )}: (
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover transition-opacity duration-1000 ${isMonitoring ? 'opacity-100' : 'opacity-40 grayscale'}`}
      />
      )

      {/* Overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

      {/* Top Bar */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none">
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10`}>
            {isMonitoring && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">
              {isMonitoring ? 'Live Monitor' : 'System Ready'}
            </span>
          </div>
          {isMonitoring && currentYaw !== null && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`px-3 py-1.5 rounded-full backdrop-blur-md border ${Math.abs(currentYaw) > 25 ? 'bg-red-500/20 border-red-500/30 text-red-400' : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'}`}
            >
              <span className="text-[10px] font-bold">YAW: {currentYaw.toFixed(1)}°</span>
            </motion.div>
          )}
        </div>

        <button
          onClick={toggleFullscreen}
          className="p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white pointer-events-auto hover:bg-white hover:text-black transition-all"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Dashboard Overlay */}
      <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <RiskStat icon={<Activity className="w-4 h-4" />} label="Avg. Yaw" value={currentYaw !== null ? `${currentYaw.toFixed(1)}°` : '0°'} />
          <RiskStat icon={<Shield className="w-4 h-4" />} label="Risk Score" value={riskLevel} valueColor={riskColor} />
          <RiskStat icon={<AlertCircle className="w-4 h-4" />} label="Anomalies" value={totalWarnings.toString()} />
          <div className="px-4 py-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
            <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Status</p>
            <p className="text-sm font-bold text-white leading-none">
              {isMonitoring ? 'Analyzing...' : 'Standby'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RiskStat({ icon, label, value, valueColor = "text-white" }: { icon: React.ReactNode, label: string, value: string, valueColor?: string }) {
  return (
    <div className="px-4 py-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
      <div className="flex items-center gap-2 text-neutral-500 mb-1">
        {icon}
        <span className="text-[10px] font-bold uppercase">{label}</span>
      </div>
      <p className={`text-sm font-bold ${valueColor} leading-none`}>{value}</p>
    </div>
  );
}
