"use client";
import { KzRegion } from "./KazakhstanMap";

interface Props { region: KzRegion; onClose: () => void; onAnalyze: (r: KzRegion) => void; }

export default function RegionModal({ region, onClose, onAnalyze }: Props) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-end md:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative rounded-t-xl md:rounded-xl p-5 md:p-6 w-full md:max-w-[520px] md:mx-4 max-h-[90vh] overflow-y-auto"
        style={{ background: "var(--bg-1)", border: "1px solid var(--border-hi)" }}
        onClick={e => e.stopPropagation()}>

        <button onClick={onClose} className="absolute top-4 right-4 text-text-3 hover:text-text-1 text-[18px] cursor-pointer">✕</button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 rounded-full" style={{ background: region.color }} />
          <div>
            <h3 className="font-head text-[16px] md:text-[18px] font-bold">{region.name}</h3>
            <span className="text-[12px] text-text-2">{region.nameRu}</span>
          </div>
        </div>

        <p className="text-[13px] text-text-2 leading-relaxed mb-4">{region.desc}</p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Wind", value: region.wind, color: "#2DD4BF", detail: region.windSpeed },
            { label: "Solar", value: region.solar, color: "#F5A623", detail: `GHI ${region.ghi}` },
            { label: "Water", value: region.water, color: "#60A5FA", detail: region.desal ? "Desal ✓" : "Limited" },
            { label: "Grid", value: region.grid, color: "#A78BFA", detail: `${region.grid}/100` },
            { label: "Port", value: region.port, color: "#EC4899", detail: region.port > 50 ? "Access" : "Inland" },
            { label: "Policy", value: region.policy, color: "#4ADE80", detail: `${region.policy}%` },
          ].map(m => (
            <div key={m.label} className="rounded-lg p-2.5 text-center" style={{ background: "var(--bg-2)" }}>
              <div className="text-[9px] text-text-3 uppercase">{m.label}</div>
              <div className="font-head text-[20px] md:text-[24px] font-bold my-0.5"
                style={{ color: m.value >= 70 ? "#4ade80" : m.value >= 45 ? "#f5a623" : "#f87171" }}>{m.value}</div>
              <div className="h-[3px] rounded-sm my-1" style={{ background: "var(--bg-3)" }}>
                <div className="h-[3px] rounded-sm" style={{ width: `${m.value}%`, background: m.color }} />
              </div>
              <div className="text-[8px] text-text-3">{m.detail}</div>
            </div>
          ))}
        </div>

        {region.projects !== "—" && (
          <div className="rounded-lg px-3 py-2 mb-4 text-[11px]" style={{ background: "var(--amber-dim)", color: "var(--amber)", border: "1px solid rgba(245,166,35,0.15)" }}>
            📌 {region.projects}
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={() => onAnalyze(region)} className="flex-1 rounded-lg py-3 text-[13px] font-bold font-head text-black cursor-pointer" style={{ background: region.color }}>
            Run Full Analysis →
          </button>
          <button onClick={onClose} className="rounded-lg py-3 px-5 text-[13px] cursor-pointer" style={{ background: "transparent", border: "1px solid var(--border-hi)", color: "var(--text-2)" }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
