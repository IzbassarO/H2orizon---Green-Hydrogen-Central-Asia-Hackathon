"use client";
import { useState } from "react";
import Topbar from "@/components/Topbar";
import Card from "@/components/Card";
import { KZ_REGIONS, KzRegion } from "@/components/KazakhstanMap";

const STEPS = ["Initializing model...","Loading regional data...","Analyzing wind & solar...","Evaluating water...","Assessing infrastructure...","Computing export score...","Running economic model...","Checking policy...","Aggregating scores...","Generating recommendations...","Finalizing report..."];

export default function AIScorerPage() {
  const [regionId, setRegionId] = useState("mangystau");
  const [source, setSource] = useState("hybrid");
  const [capacity, setCapacity] = useState(100);
  const [transport, setTransport] = useState("ammonia");
  const [water, setWater] = useState("desal");
  const [budget, setBudget] = useState("mid");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<{region:KzRegion;scores:Record<string,number>;overall:number;h2:number;nh3:number}|null>(null);

  const run = async () => {
    setLoading(true); setResult(null);
    for (let i = 0; i < STEPS.length; i++) { setStep(i); await new Promise(r => setTimeout(r, 250 + Math.random() * 350)); }
    const reg = KZ_REGIONS.find(r => r.id === regionId) || KZ_REGIONS[0];
    const sm = source === "hybrid" ? 1.15 : source === "wind" ? 1.05 : 0.95;
    const wm = water === "desal" ? 1.2 : 1.0;
    const sc: Record<string,number> = {
      renewable: Math.min(99, Math.round((source === "solar" ? reg.solar : source === "wind" ? reg.wind : reg.wind * 0.65 + reg.solar * 0.35) * sm)),
      water: Math.min(99, Math.round(reg.water * wm)),
      infrastructure: reg.grid,
      export: reg.port,
      economic: Math.min(99, Math.round((reg.wind * 0.3 + reg.solar * 0.2 + reg.port * 0.2 + reg.grid * 0.15 + reg.policy * 0.15) * (budget === "high" ? 1.05 : 1.0))),
      policy: reg.policy,
    };
    const ov = Math.round(sc.renewable * 0.25 + sc.water * 0.15 + sc.infrastructure * 0.15 + sc.export * 0.2 + sc.economic * 0.15 + sc.policy * 0.1);
    const cf = parseFloat(reg.cf) / 100;
    const h2 = Math.round((capacity * 2 * cf * 8760 * 1000) / 55);
    setResult({ region: reg, scores: sc, overall: ov, h2, nh3: Math.round(h2 * 5.67) });
    setLoading(false);
  };

  const demo = () => { setRegionId("mangystau"); setSource("hybrid"); setCapacity(100); setTransport("ammonia"); setWater("desal"); setBudget("mid"); };
  const verd = result ? (result.overall >= 75 ? { t: "Highly Feasible", c: "#4ade80" } : result.overall >= 55 ? { t: "Moderate", c: "#f5a623" } : { t: "Low", c: "#f87171" }) : null;

  return (
    <div className="p-4 md:p-7">
      <Topbar title="AI Site Feasibility Scorer" subtitle="Multi-factor scoring for green hydrogen sites" badge="AI-Powered" badgeVariant="teal" />
      <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-4">
        <Card title="Input Parameters">
          <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5">Location</label>
          <select className="form-control mb-3" value={regionId} onChange={e => setRegionId(e.target.value)}>
            {KZ_REGIONS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
          <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5">RE Source</label>
          <select className="form-control mb-3" value={source} onChange={e => setSource(e.target.value)}>
            <option value="hybrid">Hybrid (Wind + Solar)</option><option value="wind">Wind</option><option value="solar">Solar</option>
          </select>
          <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5">Capacity</label>
          <div className="flex items-center gap-3 mb-3">
            <input type="range" min={10} max={500} step={10} value={capacity} onChange={e => setCapacity(+e.target.value)} className="flex-1" />
            <span className="font-head text-[13px] text-amber min-w-[52px] text-right">{capacity} MW</span>
          </div>
          <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5">Transport</label>
          <select className="form-control mb-3" value={transport} onChange={e => setTransport(e.target.value)}>
            <option value="ammonia">NH₃ Ammonia</option><option value="lh2">Liquid H₂</option><option value="pipeline">Pipeline</option><option value="truck">Truck</option>
          </select>
          <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5">Water</label>
          <select className="form-control mb-3" value={water} onChange={e => setWater(e.target.value)}>
            <option value="desal">Caspian desalination</option><option value="river">River</option><option value="ground">Groundwater</option>
          </select>
          <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5">Budget</label>
          <select className="form-control mb-4" value={budget} onChange={e => setBudget(e.target.value)}>
            <option value="low">$100–300M</option><option value="mid">$300–600M</option><option value="high">$600M+</option>
          </select>
          <div className="h-px mb-4" style={{ background: "var(--border)" }} />
          <div className="flex gap-2">
            <button onClick={run} className="btn-primary flex-1 justify-center">Run AI Analysis</button>
            <button onClick={demo} className="btn-secondary text-[11px]">⚡ Demo</button>
          </div>
        </Card>

        <div>
          {loading && (
            <Card className="text-center py-12">
              <div className="w-12 h-12 rounded-full mx-auto mb-4" style={{ border: "3px solid var(--bg-3)", borderTopColor: "var(--amber)", animation: "spin 0.8s linear infinite" }} />
              <div className="font-head text-[13px] text-amber mb-4">{STEPS[step]}</div>
              <div className="h-1 rounded-sm max-w-[350px] mx-auto mb-5" style={{ background: "var(--bg-3)" }}>
                <div className="h-1 rounded-sm transition-all" style={{ width: `${(step + 1) / STEPS.length * 100}%`, background: "var(--amber)" }} />
              </div>
              <div className="text-left max-w-[350px] mx-auto">
                {STEPS.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 py-0.5 text-[11px]" style={{ color: i < step ? "#4ade80" : i === step ? "#f5a623" : "var(--text-3)" }}>
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: i < step ? "#4ade80" : i === step ? "#f5a623" : "var(--text-3)", animation: i === step ? "pulse-dot 0.6s ease infinite alternate" : "none" }} />
                    {i < step ? "✓ " : ""}{s}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {!loading && !result && (
            <Card className="text-center py-16"><div className="text-[48px] opacity-10 mb-4">◈</div><div className="text-[14px] text-text-2">Configure and run the scorer</div></Card>
          )}

          {!loading && result && verd && (
            <div className="space-y-3">
              <div className="rounded-lg p-6 text-center" style={{ background: "var(--bg-2)", border: "1px solid var(--border-hi)" }}>
                <div className="text-[10px] text-text-2 uppercase tracking-widest mb-2">Overall Score</div>
                <div className="font-head text-[64px] font-bold leading-none" style={{ color: verd.c }}>{result.overall}</div>
                <div className="inline-block rounded-full px-4 py-1 mt-3" style={{ background: verd.c + "15" }}>
                  <span className="font-head text-[12px]" style={{ color: verd.c }}>{verd.t}</span>
                </div>
                <div className="text-[12px] text-text-2 mt-3">{result.region.name} · {source} · {capacity} MW</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[{ k: "renewable", l: "RE", c: "#f5a623" },{ k: "water", l: "Water", c: "#60a5fa" },{ k: "infrastructure", l: "Infra", c: "#a78bfa" },{ k: "export", l: "Export", c: "#2dd4bf" },{ k: "economic", l: "Econ", c: "#4ade80" },{ k: "policy", l: "Policy", c: "#f472b6" }].map(d => (
                  <div key={d.k} className="rounded-lg p-3 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                    <div className="text-[9px] text-text-3 uppercase">{d.l}</div>
                    <div className="font-head text-[22px] font-bold my-1" style={{ color: result.scores[d.k] >= 70 ? "#4ade80" : result.scores[d.k] >= 45 ? "#f5a623" : "#f87171" }}>{result.scores[d.k]}</div>
                    <div className="h-[3px] rounded-sm" style={{ background: "var(--bg-3)" }}><div className="h-[3px] rounded-sm" style={{ width: `${result.scores[d.k]}%`, background: d.c }} /></div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[{ l: "RE Power", v: `${capacity * 2} MW` },{ l: "H₂/yr", v: `${(result.h2/1000).toFixed(1)}k t` },{ l: "NH₃/yr", v: `${(result.nh3/1000).toFixed(1)}k t` },{ l: "KZ target", v: `${Math.round(result.h2/25000*100)}%` }].map(k => (
                  <div key={k.l} className="rounded-lg p-2.5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                    <div className="text-[9px] text-text-3 uppercase">{k.l}</div>
                    <div className="font-head text-[16px] font-bold">{k.v}</div>
                  </div>
                ))}
              </div>
              <Card title="Recommendations">
                {[
                  result.scores.renewable >= 70 ? { i: "✓", c: "#4ade80", t: `Strong RE. ${result.region.name} CF ${result.region.cf}.` } : { i: "⚠", c: "#f5a623", t: "RE limited. Consider Mangystau." },
                  result.scores.water >= 50 ? { i: "✓", c: "#4ade80", t: "Water adequate." } : { i: "✗", c: "#f87171", t: "Water stress. Use Caspian desal." },
                  result.scores.export >= 60 ? { i: "✓", c: "#4ade80", t: "Middle Corridor route viable." } : { i: "⚠", c: "#f5a623", t: "No port. Add KZ rail to Kuryk." },
                  { i: "◈", c: "#2dd4bf", t: `Use 2:1 RE oversizing. Kuqa failed at 1.39:1.` },
                  { i: "◈", c: "#2dd4bf", t: `~${Math.round(result.h2/25000*100)}% of KZ 2030 target (25,000 t/yr).` },
                ].map((r, i) => (
                  <div key={i} className="flex gap-2.5 py-2" style={{ borderBottom: i < 4 ? "1px solid var(--border)" : "none" }}>
                    <span style={{ color: r.c }} className="shrink-0">{r.i}</span>
                    <span className="text-[12px] text-text-2 leading-relaxed">{r.t}</span>
                  </div>
                ))}
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
