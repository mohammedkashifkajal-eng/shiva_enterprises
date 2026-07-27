import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Bell,
  Shield,
  Phone,
  Power,
  RefreshCw,
  Radio,
  Navigation,
  Clock,
  Users,
  Thermometer,
  Gauge,
  Activity,
  Wifi,
  Battery,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Maximize2,
  Compass,
} from "lucide-react";

import IDCardPrinter from "./IDCardPrinter";

// Main road center line: M -10 200 Q 200 180 400 220 T 810 200
// (Each T segment reflects the previous control point.)
// The bus drives along this yellow center line.
const ROAD_SEGMENTS: { p0: [number, number]; c: [number, number]; p1: [number, number] }[] = [
  { p0: [-10, 200], c: [200, 180], p1: [400, 220] },
  { p0: [400, 220], c: [600, 260], p1: [810, 200] },
];

const quadAt = (seg: { p0: [number, number]; c: [number, number]; p1: [number, number] }, t: number): [number, number] => {
  const mt = 1 - t;
  const x = mt * mt * seg.p0[0] + 2 * mt * t * seg.c[0] + t * t * seg.p1[0];
  const y = mt * mt * seg.p0[1] + 2 * mt * t * seg.c[1] + t * t * seg.p1[1];
  return [x, y];
};

// Precompute cumulative arc length so progress maps to constant-speed travel.
const PATH_SAMPLES: { dist: number; x: number; y: number }[] = (() => {
  const STEPS = 360;
  const out: { dist: number; x: number; y: number }[] = [];
  let acc = 0;
  let prev: [number, number] | null = null;
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS;
    const segIndex = Math.min(ROAD_SEGMENTS.length - 1, Math.floor(t * ROAD_SEGMENTS.length));
    const localT = t * ROAD_SEGMENTS.length - segIndex;
    const pt = quadAt(ROAD_SEGMENTS[segIndex], localT);
    if (prev) acc += Math.hypot(pt[0] - prev[0], pt[1] - prev[1]);
    out.push({ dist: acc, x: pt[0], y: pt[1] });
    prev = pt;
  }
  return out;
})();

const ROAD_LENGTH = PATH_SAMPLES[PATH_SAMPLES.length - 1].dist;

const pointAtDistance = (d: number): { x: number; y: number } => {
  const dist = Math.max(0, Math.min(ROAD_LENGTH, d));
  let lo = 0;
  let hi = PATH_SAMPLES.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (PATH_SAMPLES[mid].dist < dist) lo = mid + 1;
    else hi = mid;
  }
  const a = PATH_SAMPLES[Math.max(0, lo - 1)];
  const b = PATH_SAMPLES[lo];
  const span = b.dist - a.dist || 1;
  const f = (dist - a.dist) / span;
  return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
};

// Stops placed along the road (progress % where the bus reaches each stop).
const STATIONS = [
  { id: "A", at: 10, label: "Central Bus Stand" },
  { id: "B", at: 40, label: "CIB Colony Gate" },
  { id: "C", at: 68, label: "Shiva Temple Cross" },
  { id: "D", at: 95, label: "School Main Campus" },
];

function MetricCard({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-2 sm:p-2.5 shadow-sm">
      <div className="flex items-center gap-1 sm:gap-1.5 text-slate-500 mb-1">
        {icon}
        <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wider">{label}</span>
      </div>
      <div className={`text-xs sm:text-sm font-bold font-mono tracking-tight ${color}`}>{value}</div>
    </div>
  );
}

function StatusPill({ label, value, status }: { label: string; value: string; status: { color: string; bg: string; border: string; label: string } }) {
  return (
    <div className={`${status.bg} border ${status.border} rounded-lg p-2 sm:p-2.5`}>
      <div className="text-[9px] sm:text-[10px] text-slate-500 font-medium uppercase tracking-wider mb-0.5">{label}</div>
      <div className="flex items-center justify-between">
        <span className={`text-[10px] sm:text-[11px] font-bold font-mono ${status.color}`}>{value}</span>
        <span className={`text-[8px] sm:text-[9px] font-bold px-1 py-0.5 rounded ${status.color} ${status.bg} border ${status.border}`}>
          {status.label}
        </span>
      </div>
    </div>
  );
}

function SchoolBus() {
  return (
    <svg viewBox="0 0 140 74" className="w-[60px] sm:w-[88px] h-[30px] sm:h-[46px] drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)]" style={{ transform: "translateZ(0)" }}>
      {/* ground shadow */}
      <ellipse cx="70" cy="68" rx="58" ry="4" fill="#0f172a" opacity="0.18" />
      {/* body */}
      <path
        d="M10 16 H106 Q116 16 124 26 L132 38 V58 H10 Z"
        fill="#f59e0b"
        stroke="#b45309"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* roof trim */}
      <rect x="14" y="18" width="92" height="5" rx="2.5" fill="#fbbf24" />
      {/* destination sign */}
      <rect x="108" y="18" width="20" height="9" rx="2" fill="#fde68a" stroke="#b45309" strokeWidth="1.5" />
      <text x="118" y="25.5" fontSize="6" fontWeight="bold" fill="#7c2d12" textAnchor="middle">04</text>
      {/* windshield */}
      <path d="M112 28 L130 38 L130 50 L112 50 Z" fill="#bae6fd" stroke="#0ea5e9" strokeWidth="1.5" strokeLinejoin="round" />
      {/* headlight */}
      <circle cx="130" cy="54" r="2.6" fill="#fef08a" stroke="#b45309" strokeWidth="1" />
      {/* side windows */}
      {[18, 38, 58, 78].map((x) => (
        <rect key={x} x={x} y="27" width="15" height="16" rx="2" fill="#bae6fd" stroke="#0ea5e9" strokeWidth="1.2" />
      ))}
      {/* door */}
      <rect x="98" y="27" width="11" height="31" rx="1.5" fill="#fcd34d" stroke="#b45309" strokeWidth="1.5" />
      <line x1="103.5" y1="27" x2="103.5" y2="58" stroke="#b45309" strokeWidth="1" />
      {/* SCHOOL BUS label */}
      <text x="48" y="52" fontSize="7" fontWeight="bold" fill="#7c2d12" textAnchor="middle" letterSpacing="0.5">SCHOOL BUS</text>
      {/* wheels */}
      <circle cx="34" cy="58" r="10" fill="#1f2937" stroke="#0f172a" strokeWidth="2" />
      <circle cx="34" cy="58" r="4" fill="#94a3b8" />
      <circle cx="100" cy="58" r="10" fill="#1f2937" stroke="#0f172a" strokeWidth="2" />
      <circle cx="100" cy="58" r="4" fill="#94a3b8" />
    </svg>
  );
}

const CAMERAS: { id: "front" | "mid" | "rear"; label: string }[] = [
  { id: "front", label: "Front Cam" },
  { id: "mid", label: "Cabin Cam" },
  { id: "rear", label: "Rear Cam" },
];

export default function BusSimulator() {
  const [activeTab, setActiveTab] = useState<"map" | "cctv" | "idcard">("map");
  const [speed, setSpeed] = useState(38);
  const [routeProgress, setRouteProgress] = useState(35);
  const [currentCamera, setCurrentCamera] = useState<"front" | "mid" | "rear">("mid");
  const [lastNotification, setLastNotification] = useState<string | null>(null);
  const [isAlerting, setIsAlerting] = useState(false);
  const [isEngineOn, setIsEngineOn] = useState(true);
  const [fuel, setFuel] = useState(72);
  const [temp, setTemp] = useState(91);
  const [passengers, setPassengers] = useState(28);
  const [rpm, setRpm] = useState(2100);
  const [distance, setDistance] = useState(12.4);
  const [heading, setHeading] = useState(0);

  const MAP_W = 810;
  const MAP_H = 410;

  const getBusPosition = (p: number) => pointAtDistance((p / 100) * ROAD_LENGTH);

  const getBusAngle = (p: number) => {
    const d = (p / 100) * ROAD_LENGTH;
    const a = pointAtDistance(Math.max(0, d - 3));
    const b = pointAtDistance(Math.min(ROAD_LENGTH, d + 3));
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return (Math.atan2(dy, dx) * 180) / Math.PI;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRouteProgress((prev) => {
        const next = prev + 0.6;
        return next >= 100 ? 0 : next;
      });

      setSpeed((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3;
        const next = prev + delta;
        if (next < 18) return 22;
        if (next > 52) return 46;
        return next;
      });

      setHeading((prev) => (prev + 0.4) % 360);

      setFuel((prev) => {
        const next = prev - 0.015;
        return next < 8 ? 92 : next;
      });

      setTemp((prev) => {
        const delta = Math.random() * 2.5 - 1.2;
        const next = prev + delta;
        if (next < 88) return 90;
        if (next > 103) return 101;
        return next;
      });

      setPassengers((prev) => {
        const delta = Math.random() > 0.6 ? 1 : Math.random() > 0.3 ? -1 : 0;
        const next = prev + delta;
        if (next < 15) return 16;
        if (next > 40) return 38;
        return next;
      });

      setRpm((prev) => {
        const base = 1800 + speed * 35;
        const noise = (Math.random() - 0.5) * 200;
        return Math.max(1200, Math.min(2800, base + noise));
      });

      setDistance((prev) => {
        const next = prev + 0.02;
        return next > 50 ? 0 : next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [speed]);

  const triggerAlert = () => {
    setIsAlerting(true);
    const alerts = [
      "SmartAlert: Bus 04 approaching Station C (Central Bustand Road). ETA 3 mins.",
      "SmartAlert: Student Rohit boarded Bus 04 at Station B.",
      "SmartAlert: Route deviation detected. Notifying transport coordinator.",
      "SmartAlert: Bus 04 entered school campus zone. Speed limit 15 km/h.",
      "SmartAlert: All students safely dropped at School Main Campus.",
      "SmartAlert: Bus 04 running 2 mins behind schedule. Adjusted ETA notified.",
    ];
    setLastNotification(alerts[Math.floor(Math.random() * alerts.length)]);
    setTimeout(() => setIsAlerting(false), 4500);
  };

  const toggleEngine = () => {
    setIsEngineOn((prev) => !prev);
    setSpeed((prev) => (prev > 0 ? 0 : 25));
  };

  const getNextStop = () => {
    const stop = STATIONS.find((s) => routeProgress < s.at) ?? STATIONS[STATIONS.length - 1];
    return `${stop.label} (Station ${stop.id})`;
  };

  const currentStopId = (STATIONS.find((s) => routeProgress < s.at) ?? STATIONS[STATIONS.length - 1]).id;

  const getProgressColor = () => {
    if (routeProgress < 30) return "#10b981";
    if (routeProgress < 70) return "#f59e0b";
    return "#ef4444";
  };

  const getTempStatus = () => {
    if (temp > 100) return { color: "text-red-600", bg: "bg-red-50", border: "border-red-200", label: "HIGH" };
    if (temp > 95) return { color: "text-orange-600", bg: "bg-slate-50", border: "border-slate-200", label: "WARM" };
    return { color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", label: "NORMAL" };
  };

  const getFuelStatus = () => {
    if (fuel < 15) return { color: "text-red-600", bg: "bg-red-50", border: "border-red-200", label: "LOW" };
    if (fuel < 30) return { color: "text-orange-600", bg: "bg-slate-50", border: "border-slate-200", label: "MEDIUM" };
    return { color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", label: "GOOD" };
  };

  const tempStatus = getTempStatus();
  const fuelStatus = getFuelStatus();

  const busPos = getBusPosition(routeProgress);
  const busAngle = getBusAngle(routeProgress);

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm relative sm:rounded-3xl">
      {/* Top Bar */}
      <div className="bg-slate-900 px-3 py-3 border-b border-slate-800 flex flex-col gap-2 sm:px-4 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-900/30">
            <Radio className="h-4 w-4 text-white" />
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 rounded-lg sm:rounded-xl ring-2 ring-orange-400/60"
            />
          </div>
          <div className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-2.5">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="bg-gradient-to-r from-white to-slate-200 bg-clip-text text-[10px] sm:text-[13px] font-extrabold uppercase tracking-wide text-transparent">
                Live System Demo
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-1.5 sm:px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300 ring-1 ring-emerald-500/30">
                <motion.span
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]"
                />
                Live
              </span>
            </div>
            <span className="w-fit rounded-md bg-slate-500/15 px-1.5 sm:px-2 py-0.5 text-[10px] font-mono font-medium text-slate-300 ring-1 ring-slate-500/25">
              School Bus Tracking
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5 sm:flex">
          <button
            onClick={() => setActiveTab("idcard")}
            className={`px-3 py-2.5 sm:py-1.5 rounded-lg text-[11px] sm:text-[11px] font-semibold transition-all ${
              activeTab === "idcard"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700"
            }`}
          >
            ID Card Generator
          </button>
          <button
            onClick={() => setActiveTab("map")}
            className={`px-3 py-2.5 sm:py-1.5 rounded-lg text-[11px] sm:text-[11px] font-semibold transition-all ${
              activeTab === "map"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700"
            }`}
          >
            GPS Track Map
          </button>
          <button
            onClick={() => setActiveTab("cctv")}
            className={`px-3 py-2.5 sm:py-1.5 rounded-lg text-[11px] sm:text-[11px] font-semibold transition-all ${
              activeTab === "cctv"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700"
            }`}
          >
            Live Camera Feed
          </button>
        </div>
      </div>

      <div className={`grid grid-cols-1 ${activeTab !== "idcard" ? "lg:grid-cols-12" : ""} lg:min-h-[380px]`}>
        {/* Main Content Area */}
        <div className={`${activeTab !== "idcard" ? "lg:col-span-8" : "lg:col-span-12"} bg-slate-50 p-2 sm:p-3 md:p-4 relative flex flex-col gap-3 overflow-hidden`}>
        {activeTab === "idcard" ? (
            <div className="w-full">
              <IDCardPrinter />
            </div>
          ) : activeTab === "map" ? (
            <div className="w-full relative rounded-xl overflow-hidden border border-slate-200 shadow-inner flex flex-col aspect-[810/410]" style={{ background: "linear-gradient(135deg,#eaf3ff 0%,#e9f7ef 55%,#eef6ff 100%)" }}>
              {/* Terrain, parks, roads */}
              <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${MAP_W} ${MAP_H}`} preserveAspectRatio="xMidYMid meet">
                {/* Parks / green zones */}
                <rect x="18" y="26" width="100" height="74" rx="12" fill="#bbf7d0" opacity="0.7" />
                <rect x="350" y="250" width="130" height="96" rx="14" fill="#bbf7d0" opacity="0.6" />
                <rect x="560" y="34" width="110" height="86" rx="12" fill="#bfdbfe" opacity="0.7" />
                <rect x="120" y="270" width="80" height="70" rx="12" fill="#bbf7d0" opacity="0.55" />
                {/* City blocks */}
                <rect x="250" y="56" width="74" height="62" rx="7" fill="#e2e8f0" opacity="0.8" />
                <rect x="430" y="66" width="64" height="52" rx="7" fill="#e2e8f0" opacity="0.8" />
                <rect x="690" y="200" width="70" height="60" rx="7" fill="#e2e8f0" opacity="0.7" />
                {/* Trees */}
                {[
                  [60, 60], [300, 300], [540, 160], [640, 90], [90, 320], [430, 330],
                ].map(([tx, ty], i) => (
                  <g key={i}>
                    <rect x={tx - 1.5} y={ty} width="3" height="10" rx="1" fill="#92400e" opacity="0.7" />
                    <circle cx={tx} cy={ty} r="9" fill="#34d399" opacity="0.75" />
                    <circle cx={tx - 5} cy={ty + 4} r="6" fill="#10b981" opacity="0.6" />
                  </g>
                ))}
                {/* Cross roads */}
                <path d="M 200 -10 L 200 410" stroke="#ffffff" strokeWidth="20" />
                <path d="M 200 -10 L 200 410" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="8,7" />
                <path d="M 500 -10 L 500 410" stroke="#ffffff" strokeWidth="16" />
                <path d="M 500 -10 L 500 410" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="8,7" />
                <path d="M 700 -10 L 700 410" stroke="#ffffff" strokeWidth="13" />
                <path d="M 700 -10 L 700 410" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="8,7" />
                {/* Main road with yellow center line (the route the bus drives on) */}
                <path d="M -10 200 Q 200 180 400 220 T 810 200" stroke="#ffffff" strokeWidth="38" fill="none" strokeLinecap="round" />
                <path d="M -10 200 Q 200 180 400 220 T 810 200" stroke="#facc15" strokeWidth="3" strokeDasharray="12,10" fill="none" opacity="0.95" strokeLinecap="round" className="animate-pulse" style={{ filter: "drop-shadow(0 0 3px rgba(250,204,21,0.7))" }} />
              </svg>

              {/* Stations (positioned on the road) */}
              {STATIONS.map((station) => {
                const pos = pointAtDistance((station.at / 100) * ROAD_LENGTH);
                const active = station.id === currentStopId;
                return (
                  <motion.div
                    key={station.id}
                    className="absolute flex flex-col items-center -translate-x-1/2"
                    style={{ left: `${(pos.x / MAP_W) * 100}%`, top: `${(pos.y / MAP_H) * 100}%` }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <motion.div
                      animate={active ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center shadow-md ${
                        active
                          ? "bg-slate-500 border-orange-400 shadow-slate-500/30"
                          : "bg-white border-slate-300 shadow-slate-300/30"
                      }`}
                    >
                      <span className={`text-[8px] sm:text-[9px] font-bold ${active ? "text-white" : "text-slate-600"}`}>
                        {station.id}
                      </span>
                    </motion.div>
                    <div className={`mt-0.5 sm:mt-1 px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-medium shadow-sm whitespace-nowrap ${
                      active
                        ? "bg-slate-50 text-orange-800 border border-slate-200"
                        : "bg-white text-slate-600 border border-slate-200"
                    }`}>
                      {station.label}
                    </div>
                  </motion.div>
                );
              })}

              {/* Bus marker */}
              <motion.div
                className="absolute"
                style={{
                  left: `${(busPos.x / MAP_W) * 100}%`,
                  top: `${(busPos.y / MAP_H) * 100}%`,
                  transform: `translate(-50%, -50%) rotate(${busAngle}deg)`,
                }}
                animate={{
                  left: `${(busPos.x / MAP_W) * 100}%`,
                  top: `${(busPos.y / MAP_H) * 100}%`,
                }}
                transition={{ ease: "linear", duration: 1 }}
              >
                <div className="rounded-full bg-white/90 p-1 shadow-lg ring-2 ring-orange-400">
                  <SchoolBus />
                </div>
              </motion.div>

              {/* Progress bar overlay */}
              <div className="absolute bottom-2 left-2 right-2 sm:left-3 sm:right-3">
                <div className="flex items-center justify-between text-[9px] font-mono text-slate-600 mb-1">
                  <span>Route Progress</span>
                  <span>{routeProgress.toFixed(0)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${routeProgress}%`, background: getProgressColor() }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full relative rounded-xl overflow-hidden border border-slate-200 shadow-inner flex flex-col aspect-[810/410] bg-slate-900">
              {/* Camera feed */}
              <div className="relative flex-1 grid place-items-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.12),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(250,204,21,0.10),transparent_55%)]" />
                <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:28px_28px]" />
                <motion.div
                  animate={{ opacity: [0.85, 1, 0.85] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="relative text-center px-6"
                >
                  <SchoolBus />
                  <div className="mt-3 text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-300">
                    {CAMERAS.find((c) => c.id === currentCamera)?.label} · Recording
                  </div>
                </motion.div>
                <div className="absolute top-2 left-2 flex items-center gap-1.5 rounded-full bg-black/50 px-2 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-white/90">REC</span>
                </div>
                <div className="absolute top-2 right-2 rounded-full bg-black/50 px-2 py-1 text-[9px] font-mono text-white/90">
                  {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                </div>
                {/* Scanning line */}
                <motion.div
                  className="absolute left-0 right-0 h-px bg-emerald-400/40"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                />
              </div>
              {/* Camera selector */}
              <div className="flex items-center gap-1.5 border-t border-white/10 bg-slate-800/80 p-2">
                {CAMERAS.map((cam) => (
                  <button
                    key={cam.id}
                    onClick={() => setCurrentCamera(cam.id)}
                    className={`flex-1 rounded-md px-2 py-1.5 text-[10px] font-semibold transition-all ${
                      currentCamera === cam.id
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-700/70 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {cam.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Alert banner */}
          <AnimatePresence>
            {isAlerting && lastNotification && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="flex items-start gap-2 rounded-xl border border-slate-300 bg-slate-50 p-3 shadow-sm"
              >
                <Bell className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                <p className="text-[11px] leading-relaxed text-orange-900">{lastNotification}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Side Panel — hidden when ID Card Generator is active */}
        {activeTab !== "idcard" && (
        <div className="lg:col-span-4 bg-white border-t lg:border-t-0 lg:border-l border-slate-200 p-2 sm:p-3 md:p-4 flex flex-col gap-3">
          {/* Status row */}
          <div className="grid grid-cols-2 gap-2">
            <MetricCard label="Speed" value={`${speed.toFixed(0)} km/h`} icon={<Gauge className="h-3.5 w-3.5" />} color="text-slate-900" />
            <MetricCard label="Next Stop" value={getNextStop()} icon={<MapPin className="h-3.5 w-3.5" />} color="text-orange-700" />
            <MetricCard label="Passengers" value={`${passengers}`} icon={<Users className="h-3.5 w-3.5" />} color="text-slate-900" />
            <MetricCard label="Distance" value={`${distance.toFixed(1)} km`} icon={<Navigation className="h-3.5 w-3.5" />} color="text-slate-900" />
            <MetricCard label="RPM" value={`${rpm.toFixed(0)}`} icon={<Activity className="h-3.5 w-3.5" />} color="text-slate-900" />
            <MetricCard label="Heading" value={`${heading.toFixed(0)}°`} icon={<Compass className="h-3.5 w-3.5" />} color="text-slate-900" />
          </div>

          {/* Status pills */}
          <div className="grid grid-cols-2 gap-2">
            <StatusPill label="Engine Temp" value={`${temp.toFixed(0)}°C`} status={tempStatus} />
            <StatusPill label="Fuel" value={`${fuel.toFixed(0)}%`} status={fuelStatus} />
          </div>

          {/* Signal row */}
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-2.5">
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-600">
              <Wifi className="h-3.5 w-3.5 text-emerald-600" />
              <span>GPS · 4G · ONLINE</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-600">
              <Battery className="h-3.5 w-3.5 text-emerald-600" />
              <span>98%</span>
            </div>
          </div>

          {/* Engine + Alert controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleEngine}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-bold transition-all ${
                isEngineOn
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "bg-slate-200 text-slate-600 hover:bg-slate-300"
              }`}
            >
              <Power className="h-3.5 w-3.5" />
              {isEngineOn ? "Engine ON" : "Engine OFF"}
            </button>
            <button
              onClick={triggerAlert}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-500 px-3 py-2.5 text-[11px] font-bold text-white transition-all hover:bg-orange-600"
            >
              <Bell className="h-3.5 w-3.5" />
              Send Alert
            </button>
          </div>

          {/* Safety row */}
          <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-2.5">
            <Shield className="h-4 w-4 text-emerald-600" />
            <div className="text-[10px] leading-tight text-emerald-900">
              <div className="font-bold">Safety Systems Active</div>
              <div className="text-emerald-700">Speed limit · Geofence · CCTV · Parent alerts</div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

