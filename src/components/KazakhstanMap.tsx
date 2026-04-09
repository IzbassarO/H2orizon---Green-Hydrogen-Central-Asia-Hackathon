"use client";

import { useState } from "react";

export interface KzRegion {
  id: string;
  name: string;
  nameRu: string;
  path: string;
  cx: number;
  cy: number;
  wind: number;
  solar: number;
  water: number;
  grid: number;
  port: number;
  policy: number;
  ghi: number;
  windSpeed: string;
  cf: string;
  desal: boolean;
  desc: string;
  color: string;
  projects: string;
}

export const KZ_REGIONS: KzRegion[] = [
  {
    id: "mangystau", name: "Mangystau", nameRu: "Маңғыстау", color: "#10B981",
    path: "M52,340 L68,300 L85,310 L100,350 L105,390 L95,430 L75,440 L55,420 L45,380 Z",
    cx: 75, cy: 370, wind: 88, solar: 65, water: 72, grid: 50, port: 95, policy: 80,
    ghi: 1600, windSpeed: "7–9 m/s", cf: "34%", desal: true,
    desc: "World-class wind (7–9 m/s), Caspian desalination, Kuryk port. HYRASIA ONE (40 GW) project.",
    projects: "HYRASIA ONE (Svevind, 40 GW)",
  },
  {
    id: "atyrau", name: "Atyrau", nameRu: "Атырау", color: "#F59E0B",
    path: "M68,300 L100,240 L140,230 L165,260 L155,310 L130,330 L100,350 L85,310 Z",
    cx: 120, cy: 280, wind: 80, solar: 55, water: 35, grid: 60, port: 70, policy: 75,
    ghi: 1450, windSpeed: "6–8 m/s", cf: "30%", desal: true,
    desc: "Oil/gas hub with Caspian access. Strong wind. Water stress from industrial use.",
    projects: "Tengiz area",
  },
  {
    id: "westKz", name: "West Kazakhstan", nameRu: "Батыс Қазақстан", color: "#8B5CF6",
    path: "M60,130 L100,100 L140,110 L155,160 L140,230 L100,240 L68,220 L55,170 Z",
    cx: 105, cy: 170, wind: 65, solar: 45, water: 50, grid: 55, port: 30, policy: 65,
    ghi: 1350, windSpeed: "5–7 m/s", cf: "26%", desal: false,
    desc: "Northern steppes. Moderate wind. No port access. Ural river water.",
    projects: "—",
  },
  {
    id: "aktobe", name: "Aktobe", nameRu: "Ақтөбе", color: "#6366F1",
    path: "M140,110 L220,80 L280,100 L290,180 L260,260 L200,300 L165,260 L155,160 Z",
    cx: 215, cy: 185, wind: 60, solar: 55, water: 40, grid: 50, port: 20, policy: 65,
    ghi: 1400, windSpeed: "5–7 m/s", cf: "25%", desal: false,
    desc: "Central-west. Chrome mining. Moderate RE potential.",
    projects: "—",
  },
  {
    id: "kostanay", name: "Kostanay", nameRu: "Қостанай", color: "#64748B",
    path: "M220,80 L300,50 L370,40 L380,80 L360,130 L290,180 L280,100 Z",
    cx: 310, cy: 100, wind: 55, solar: 50, water: 55, grid: 60, port: 10, policy: 60,
    ghi: 1350, windSpeed: "5–6 m/s", cf: "24%", desal: false,
    desc: "Agricultural north. Moderate wind. No export infrastructure.",
    projects: "Wind farm pilots",
  },
  {
    id: "akmola", name: "Akmola / Astana", nameRu: "Ақмола / Астана", color: "#3B82F6",
    path: "M370,40 L440,35 L500,50 L510,100 L480,140 L420,150 L360,130 L380,80 Z",
    cx: 430, cy: 90, wind: 55, solar: 50, water: 55, grid: 80, port: 10, policy: 85,
    ghi: 1400, windSpeed: "5–6 m/s", cf: "24%", desal: false,
    desc: "Capital region. Best grid. Nazarbayev Univ H₂ pilot (6m³).",
    projects: "NazUniv 6m³ H₂ pilot",
  },
  {
    id: "karaganda", name: "Karaganda", nameRu: "Қарағанды", color: "#64748B",
    path: "M290,180 L360,130 L420,150 L480,140 L500,200 L480,280 L400,310 L320,290 L260,260 Z",
    cx: 390, cy: 220, wind: 50, solar: 55, water: 45, grid: 55, port: 10, policy: 60,
    ghi: 1450, windSpeed: "4–6 m/s", cf: "22%", desal: false,
    desc: "Industrial heartland. Coal-heavy grid. Ulytau wind potential.",
    projects: "Coal transition zone",
  },
  {
    id: "pavlodar", name: "Pavlodar", nameRu: "Павлодар", color: "#64748B",
    path: "M500,50 L570,55 L600,80 L590,130 L550,150 L510,100 Z",
    cx: 545, cy: 95, wind: 55, solar: 50, water: 60, grid: 65, port: 10, policy: 60,
    ghi: 1400, windSpeed: "5–6 m/s", cf: "24%", desal: false,
    desc: "Energy-intensive industry. Irtysh river. Coal transition zone.",
    projects: "Coal-to-H₂ studies",
  },
  {
    id: "eastKz", name: "East Kazakhstan", nameRu: "Шығыс Қазақстан", color: "#64748B",
    path: "M570,55 L640,70 L680,120 L670,200 L630,240 L580,220 L550,150 L590,130 L600,80 Z",
    cx: 620, cy: 150, wind: 45, solar: 45, water: 70, grid: 60, port: 10, policy: 55,
    ghi: 1350, windSpeed: "4–5 m/s", cf: "20%", desal: false,
    desc: "Mining/metallurgy. Irtysh river. China border for potential export.",
    projects: "—",
  },
  {
    id: "kyzylorda", name: "Kyzylorda", nameRu: "Қызылорда", color: "#F59E0B",
    path: "M200,300 L260,260 L320,290 L340,350 L300,400 L230,410 L170,380 L155,310 L165,260 Z",
    cx: 250, cy: 340, wind: 45, solar: 75, water: 30, grid: 45, port: 15, policy: 60,
    ghi: 1650, windSpeed: "4–5 m/s", cf: "20%", desal: false,
    desc: "High solar (1650 kWh/m²). Syr Darya river. Aral Sea water stress.",
    projects: "Solar farm proposals",
  },
  {
    id: "turkestan", name: "Turkestan", nameRu: "Түркістан", color: "#F97316",
    path: "M300,400 L340,350 L400,310 L440,360 L430,410 L380,440 L320,430 Z",
    cx: 370, cy: 390, wind: 50, solar: 80, water: 40, grid: 55, port: 15, policy: 70,
    ghi: 1700, windSpeed: "4–6 m/s", cf: "22%", desal: false,
    desc: "Highest solar in KZ. 2,200–3,000 sun hours/yr. Water constraints.",
    projects: "TotalEnergies Mirny",
  },
  {
    id: "zhambyl", name: "Zhambyl", nameRu: "Жамбыл", color: "#64748B",
    path: "M400,310 L480,280 L530,320 L520,380 L470,400 L440,360 Z",
    cx: 470, cy: 350, wind: 50, solar: 70, water: 45, grid: 50, port: 15, policy: 65,
    ghi: 1600, windSpeed: "4–6 m/s", cf: "22%", desal: false,
    desc: "South-central. Good solar. Agricultural water competition.",
    projects: "Small wind installations",
  },
  {
    id: "almaty", name: "Almaty", nameRu: "Алматы", color: "#64748B",
    path: "M480,280 L580,220 L630,240 L640,310 L600,370 L530,380 L520,320 Z",
    cx: 565, cy: 310, wind: 40, solar: 50, water: 65, grid: 70, port: 15, policy: 65,
    ghi: 1500, windSpeed: "3–5 m/s", cf: "18%", desal: false,
    desc: "Largest city. Good grid, low wind. Mountain hydro potential.",
    projects: "Kapchagai wind farm",
  },
];

interface KzMapProps {
  onRegionClick: (region: KzRegion) => void;
  selectedId?: string | null;
}

export default function KazakhstanMap({ onRegionClick, selectedId }: KzMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activeId = hoveredId || selectedId;
  const activeRegion = KZ_REGIONS.find(r => r.id === activeId);

  return (
    <div className="flex gap-4">
      {/* Map */}
      <div className="flex-1 rounded-lg p-3 relative" style={{ background: "var(--bg-1)", border: "1px solid var(--border)" }}>
        <svg viewBox="0 0 720 480" className="w-full h-auto">
          <rect width="720" height="480" fill="transparent" />

          {/* Caspian Sea */}
          <path d="M50,250 Q55,220 60,200 Q65,180 68,165 Q72,270 65,340 Q60,380 50,420 Q42,430 38,440 Q35,400 40,360 Q45,310 50,250Z"
            fill="#0E2844" stroke="#1A3A5F" strokeWidth="0.8" />
          <text x="42" y="320" fontSize="7" fill="#2A5580" fontStyle="italic" textAnchor="middle"
            transform="rotate(-15,42,320)">Каспий</text>

          {/* Aral Sea remnant */}
          <path d="M185,360 Q195,350 210,355 Q215,365 210,375 Q200,380 190,375 Z"
            fill="#0E2844" stroke="#1A3A5F" strokeWidth="0.5" opacity="0.6" />

          {/* Balkhash */}
          <path d="M500,300 Q530,290 560,295 Q575,305 565,315 Q540,320 510,315 Q495,310 500,300Z"
            fill="#0E2844" stroke="#1A3A5F" strokeWidth="0.5" opacity="0.6" />
          <text x="535" y="310" fontSize="6" fill="#2A5580" fontStyle="italic" textAnchor="middle">Балқаш</text>

          {/* Regions */}
          {KZ_REGIONS.map(region => {
            const isActive = activeId === region.id;
            return (
              <g key={region.id}
                onMouseEnter={() => setHoveredId(region.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onRegionClick(region)}
                style={{ cursor: "pointer" }}>
                {/* Region shape */}
                <path d={region.path}
                  fill={isActive ? `${region.color}20` : "rgba(255,255,255,0.02)"}
                  stroke={isActive ? region.color : "rgba(255,255,255,0.08)"}
                  strokeWidth={isActive ? 1.5 : 0.8}
                  className="transition-all duration-200" />
                {/* Glow on active */}
                {isActive && (
                  <circle cx={region.cx} cy={region.cy} r="18" fill={region.color} opacity="0.1">
                    <animate attributeName="r" values="14;20;14" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                {/* Dot */}
                <circle cx={region.cx} cy={region.cy} r={isActive ? 5 : 3.5}
                  fill={isActive ? region.color : "#4a5568"}
                  stroke={isActive ? region.color : "rgba(255,255,255,0.15)"}
                  strokeWidth={isActive ? 1.5 : 0.8}
                  className="transition-all duration-200" />
                {/* Label */}
                <text x={region.cx} y={region.cy - 10}
                  fontSize={isActive ? "9" : "7.5"}
                  fill={isActive ? "#e8edf5" : "#6b7280"}
                  fontWeight={isActive ? "600" : "400"}
                  textAnchor="middle"
                  className="transition-all duration-200 pointer-events-none"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {region.nameRu}
                </text>
              </g>
            );
          })}

          {/* Neighbor labels */}
          <text x="360" y="16" fontSize="9" fill="#2A4060" textAnchor="middle" fontWeight="600" letterSpacing="4">РОССИЯ</text>
          <text x="30" y="455" fontSize="7" fill="#2A4060">ӘЗІРБ.</text>
          <text x="130" y="465" fontSize="7" fill="#2A4060" letterSpacing="1">ТҮРКМЕНСТАН</text>
          <text x="280" y="460" fontSize="7" fill="#2A4060" letterSpacing="1">ӨЗБЕКСТАН</text>
          <text x="520" y="460" fontSize="7" fill="#2A4060">ҚЫРҒЫЗСТАН</text>
          <text x="680" y="350" fontSize="7" fill="#2A4060">ҚЫТАЙ</text>
        </svg>
      </div>

      {/* Info panel */}
      <div className="w-[300px] shrink-0 flex flex-col gap-2.5">
        {activeRegion ? (
          <>
            <div className="rounded-lg p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: activeRegion.color }} />
                <span className="font-head text-[13px] font-bold">{activeRegion.name}</span>
              </div>
              <p className="text-[11px] text-text-2 leading-relaxed">{activeRegion.desc}</p>
              {activeRegion.projects !== "—" && (
                <div className="mt-2 rounded px-2 py-1 text-[10px]"
                  style={{ background: "var(--amber-dim)", color: "var(--amber)", border: "1px solid rgba(245,166,35,0.15)" }}>
                  📌 {activeRegion.projects}
                </div>
              )}
            </div>

            {/* Scores */}
            <div className="rounded-lg p-3" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              {[
                { l: "Wind", v: activeRegion.wind, c: "#2DD4BF" },
                { l: "Solar", v: activeRegion.solar, c: "#F5A623" },
                { l: "Water", v: activeRegion.water, c: "#60A5FA" },
                { l: "Grid", v: activeRegion.grid, c: "#A78BFA" },
                { l: "Port", v: activeRegion.port, c: "#EC4899" },
                { l: "Policy", v: activeRegion.policy, c: "#4ADE80" },
              ].map(m => (
                <div key={m.l} className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] text-text-2 w-[44px]">{m.l}</span>
                  <div className="flex-1 h-[3px] rounded-sm" style={{ background: "var(--bg-3)" }}>
                    <div className="h-[3px] rounded-sm transition-all duration-500" style={{ width: `${m.v}%`, background: m.c }} />
                  </div>
                  <span className="font-head text-[10px] w-[22px] text-right"
                    style={{ color: m.v >= 70 ? "#4ade80" : m.v >= 45 ? "#f5a623" : "#f87171" }}>{m.v}</span>
                </div>
              ))}
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { l: "GHI", v: `${activeRegion.ghi}`, u: "kWh/m²" },
                { l: "Wind", v: activeRegion.windSpeed },
                { l: "CF", v: activeRegion.cf },
                { l: "Desal", v: activeRegion.desal ? "Yes ✓" : "No" },
              ].map(s => (
                <div key={s.l} className="rounded p-2" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="text-[8px] text-text-3 uppercase">{s.l}</div>
                  <div className="font-head text-[13px] font-bold">{s.v}</div>
                </div>
              ))}
            </div>

            <button onClick={() => onRegionClick(activeRegion)}
              className="w-full rounded-lg py-2.5 text-[12px] font-bold font-head text-black cursor-pointer"
              style={{ background: activeRegion.color }}>
              Analyze {activeRegion.name} →
            </button>
          </>
        ) : (
          <div className="rounded-lg p-8 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="text-[36px] opacity-10 mb-2">🗺</div>
            <div className="text-[13px] text-text-2">Наведите на регион</div>
            <div className="text-[11px] text-text-3 mt-1">Нажмите для анализа</div>
          </div>
        )}
      </div>
    </div>
  );
}
