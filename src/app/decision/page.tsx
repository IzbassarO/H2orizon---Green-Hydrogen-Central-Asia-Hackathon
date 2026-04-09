"use client";
import { useState } from "react";
import Topbar from "@/components/Topbar";
import Card from "@/components/Card";
import { REGIONS } from "@/lib/data/regions";

export default function DecisionPage() {
  const [region, setRegion] = useState("mangystau");
  const [renewable, setRenewable] = useState("hybrid");
  const [transport, setTransport] = useState("ammonia");

  const reg = REGIONS[region];
  const srcScore = renewable === "hybrid" ? (reg.wind * 0.65 + reg.solar * 0.35) * 1.15 : renewable === "wind" ? reg.wind * 1.05 : reg.solar * 0.95;
  const transportScore = transport === "ammonia" ? 78 : transport === "pipeline" ? 60 : transport === "lh2" ? 50 : 30;
  const infraScore = reg.grid;
  const waterScore = reg.water;
  const feasibility = Math.round(Math.min(99, srcScore) * 0.3 + waterScore * 0.2 + infraScore * 0.2 + transportScore * 0.3);

  const verdict = feasibility >= 70 ? { text: "High Feasibility", color: "#4ade80" } : feasibility >= 50 ? { text: "Moderate", color: "#f5a623" } : { text: "Low", color: "#f87171" };

  const scores = [
    { label: "Production", value: Math.round(Math.min(99, srcScore)), desc: "RE potential for H₂", color: "#f5a623" },
    { label: "Transport", value: transportScore, desc: "Export viability", color: "#2dd4bf" },
    { label: "Infrastructure", value: infraScore, desc: "Grid & port readiness", color: "#a78bfa" },
    { label: "Water", value: waterScore, desc: "Water availability", color: "#60a5fa" },
  ];

  return (
    <div className="p-4 md:p-7">
      <Topbar title="Decision Engine" subtitle="Multi-factor feasibility scoring for green hydrogen projects" badge="Strategy Tool" badgeVariant="blue" />

      <div className="grid grid-cols-1 md:grid-cols-[4fr_8fr] gap-4">
        <Card title="Parameters">
          <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5">Region</label>
          <select className="form-control mb-4" value={region} onChange={e => setRegion(e.target.value)}>
            {Object.entries(REGIONS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
          </select>
          <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5">Renewable</label>
          <select className="form-control mb-4" value={renewable} onChange={e => setRenewable(e.target.value)}>
            <option value="hybrid">Hybrid</option><option value="wind">Wind</option><option value="solar">Solar</option>
          </select>
          <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5">Transport</label>
          <select className="form-control" value={transport} onChange={e => setTransport(e.target.value)}>
            <option value="ammonia">Ammonia</option><option value="pipeline">Pipeline</option><option value="lh2">Liquid H₂</option><option value="truck">Truck</option>
          </select>
        </Card>

        <div className="space-y-4">
          {/* Overall score */}
          <div className="rounded-lg p-6 text-center" style={{ background: "var(--bg-2)", border: "1px solid var(--border-hi)" }}>
            <div className="font-head text-[56px] font-bold leading-none" style={{ color: verdict.color }}>{feasibility}</div>
            <div className="text-[13px] text-text-2 mt-1.5">Green Hydrogen Feasibility Score (0–100)</div>
            <div className="text-[15px] font-semibold mt-3" style={{ color: verdict.color }}>{verdict.text}</div>
            <div className="text-[12px] text-text-2 mt-2">{reg.name} · {renewable} · {transport}</div>
          </div>

          {/* Dimension scores */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {scores.map(s => (
              <div key={s.label} className="rounded-lg p-4 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="text-[11px] text-text-2 uppercase tracking-wider mb-3">{s.label}</div>
                <div className="font-head text-[36px] font-bold leading-none" style={{ color: s.value >= 60 ? "#4ade80" : s.value >= 40 ? "#f5a623" : "#f87171" }}>{s.value}</div>
                <div className="h-1.5 rounded mt-2.5" style={{ background: "var(--bg-3)" }}>
                  <div className="h-1.5 rounded transition-all duration-500" style={{ width: `${s.value}%`, background: s.color }} />
                </div>
                <div className="text-[11px] text-text-2 mt-2">{s.desc}</div>
              </div>
            ))}
          </div>

          {/* Risks */}
          <Card title="Risk Assessment">
            <div className="space-y-2">
              {[
                ...(reg.water < 40 ? [{ level: "high", title: "Water Stress", desc: "Regional water below threshold for large-scale electrolysis." }] : []),
                ...(reg.grid < 50 ? [{ level: "high", title: "Grid Gap", desc: "Grid readiness below 50. Aging infrastructure barrier." }] : []),
                ...(transport === "truck" ? [{ level: "high", title: "Distance Infeasibility", desc: "Compressed truck limited to <500 km. Not viable for CA→EU." }] : []),
                ...(transport === "pipeline" ? [{ level: "medium", title: "Pipeline CAPEX", desc: "No H₂ pipelines exist in region. $2–5M/km, 10–15 yr lead." }] : []),
                { level: "low", title: "Policy Alignment", desc: "Kazakhstan 2040 H₂ Concept + EU partnership provide favorable framework." },
              ].map((r, i) => (
                <div key={i} className="flex gap-2.5 items-start rounded-lg p-2.5"
                  style={{ background: "var(--bg-2)", borderLeft: `2px solid ${r.level === "high" ? "#f87171" : r.level === "medium" ? "#f5a623" : "#4ade80"}` }}>
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{ background: r.level === "high" ? "#f87171" : r.level === "medium" ? "#f5a623" : "#4ade80" }} />
                  <div>
                    <div className="text-[12px] font-medium">{r.title} <span className="font-head text-[10px] px-1.5 py-0.5 rounded ml-1"
                      style={{ background: r.level === "high" ? "var(--red-dim)" : r.level === "medium" ? "var(--amber-dim)" : "var(--green-dim)", color: r.level === "high" ? "#f87171" : r.level === "medium" ? "#f5a623" : "#4ade80" }}>{r.level.toUpperCase()}</span></div>
                    <div className="text-[11px] text-text-2 mt-0.5">{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
