"use client";
import { useState } from "react";
import Topbar from "@/components/Topbar";
import Card from "@/components/Card";
import Badge from "@/components/Badge";

const ORIGINS = [
  { id: "mangystau", name: "Mangystau (Kuryk Port)", h2: 6400 },
  { id: "atyrau", name: "Atyrau Region", h2: 5500 },
  { id: "south_kz", name: "South Kazakhstan", h2: 4800 },
  { id: "astana", name: "Astana / Akmola", h2: 4200 },
];

const CARRIERS = [
  { id: "ammonia", name: "Ammonia (NH₃)", loss: 28, factor: 5.67, color: "#2dd4bf" },
  { id: "lh2", name: "Liquid H₂", loss: 35, factor: 1, color: "#60a5fa" },
  { id: "pipeline", name: "H₂ Pipeline", loss: 5, factor: 1, color: "#f5a623" },
  { id: "lohc", name: "LOHC", loss: 40, factor: 1, color: "#a78bfa" },
];

const ROUTES: Record<string, { from: string; to: string; mode: string; dist: string; time: string; color: string }[]> = {
  mangystau: [
    { from: "Production Site", to: "Kuryk Port", mode: "Pipeline/truck", dist: "60 km", time: "Hours", color: "#9CA3AF" },
    { from: "Kuryk Port", to: "Baku/Alat", mode: "Caspian tanker", dist: "475 km", time: "19–23h", color: "#60A5FA" },
    { from: "Baku", to: "Tbilisi → Kars", mode: "BTK Railway", dist: "~826 km", time: "2–3 days", color: "#FCD34D" },
    { from: "Kars", to: "Black Sea port", mode: "Turkish rail", dist: "~600–900 km", time: "1–2 days", color: "#F9A8D4" },
    { from: "Black Sea", to: "Constanța (EU)", mode: "Ship", dist: "~600 km", time: "1–2 days", color: "#EC4899" },
  ],
  atyrau: [
    { from: "Site", to: "Atyrau → Kuryk", mode: "Rail/truck", dist: "~350 km", time: "1 day", color: "#FCD34D" },
    { from: "Kuryk", to: "Baku/Alat", mode: "Caspian tanker", dist: "475 km", time: "19–23h", color: "#60A5FA" },
    { from: "Baku", to: "Kars", mode: "BTK Railway", dist: "~826 km", time: "2–3 days", color: "#FCD34D" },
    { from: "Kars", to: "Constanța", mode: "Rail + Ship", dist: "~1,200 km", time: "3–4 days", color: "#EC4899" },
  ],
};
const defaultRoute = [
  { from: "Site", to: "Rail → Kuryk", mode: "KZ rail", dist: "500–2000 km", time: "2–5 days", color: "#FCD34D" },
  { from: "Kuryk", to: "Baku", mode: "Caspian tanker", dist: "475 km", time: "19–23h", color: "#60A5FA" },
  { from: "Baku", to: "Kars", mode: "BTK Railway", dist: "~826 km", time: "2–3 days", color: "#FCD34D" },
  { from: "Kars", to: "Constanța", mode: "Rail + Ship", dist: "~1,200 km", time: "3–4 days", color: "#EC4899" },
];

export default function ExportPage() {
  const [origin, setOrigin] = useState("mangystau");
  const [carrier, setCarrier] = useState("ammonia");
  const [years, setYears] = useState(3);

  const o = ORIGINS.find(x => x.id === origin)!;
  const c = CARRIERS.find(x => x.id === carrier)!;
  const route = ROUTES[origin] || defaultRoute;

  const annualH2 = o.h2;
  const delivered = Math.round(annualH2 * (1 - c.loss / 100));
  const totalDelivered = delivered * years;
  const annualCarrier = carrier === "ammonia" ? Math.round(annualH2 * c.factor) : annualH2;
  const tankerTrips = carrier === "ammonia" ? Math.ceil(annualCarrier / 8000) : "N/A";

  return (
    <div className="p-4 md:p-7">
      <Topbar title="Export Simulator" subtitle="Model hydrogen export from Kazakhstan to European markets" badge="Challenge 2" badgeVariant="teal" />

      <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-4">
        {/* Inputs */}
        <Card title="Export Configuration">
          <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5">Origin</label>
          <select className="form-control mb-4" value={origin} onChange={e => setOrigin(e.target.value)}>
            {ORIGINS.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
          </select>

          <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5">Carrier Method</label>
          <div className="space-y-1.5 mb-4">
            {CARRIERS.map(cc => (
              <div key={cc.id} className="flex items-center justify-between rounded-lg px-3 py-2.5 cursor-pointer"
                style={{
                  background: carrier === cc.id ? `${cc.color}12` : "var(--bg-2)",
                  border: `1px solid ${carrier === cc.id ? cc.color + "40" : "var(--border)"}`,
                }}
                onClick={() => setCarrier(cc.id)}>
                <span className="text-[12px]" style={{ color: carrier === cc.id ? "#e8edf5" : "var(--text-2)", fontWeight: carrier === cc.id ? 600 : 400 }}>{cc.name}</span>
                <span className="font-head text-[10px]" style={{ color: cc.loss > 30 ? "#f87171" : cc.loss > 15 ? "#f5a623" : "#4ade80" }}>{cc.loss}% loss</span>
              </div>
            ))}
          </div>

          <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5">Projection Period</label>
          <div className="flex items-center gap-3">
            <input type="range" min={1} max={10} value={years} onChange={e => setYears(+e.target.value)} className="flex-1" />
            <span className="font-head text-[13px] text-amber min-w-[48px] text-right">{years} yrs</span>
          </div>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { l: "Annual H₂ input", v: `${(annualH2/1000).toFixed(1)}k t`, c: "var(--text-1)" },
              { l: "Delivered/yr (net)", v: `${(delivered/1000).toFixed(1)}k t`, c: "#4ade80" },
              { l: `Total (${years} yr)`, v: `${(totalDelivered/1000).toFixed(1)}k t`, c: "#f5a623" },
              { l: "Carrier vol/yr", v: carrier === "ammonia" ? `${(annualCarrier/1000).toFixed(1)}k t NH₃` : `${(annualH2/1000).toFixed(1)}k t`, c: "#2dd4bf" },
            ].map(k => (
              <div key={k.l} className="rounded-lg p-3" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="text-[9px] text-text-3 uppercase">{k.l}</div>
                <div className="font-head text-[18px] font-bold" style={{ color: k.c }}>{k.v}</div>
              </div>
            ))}
          </div>

          {/* Route */}
          <Card title={`Export Route — ${o.name} → EU`}>
            <div className="space-y-0">
              {route.map((seg, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3 py-2.5">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ border: `2px solid ${seg.color}`, background: "var(--bg-0)" }} />
                    <div className="flex-1">
                      <div className="text-[13px] font-medium">{seg.from} → {seg.to}</div>
                      <div className="text-[11px] text-text-2">{seg.mode} · <span className="font-head" style={{ color: seg.color }}>{seg.dist}</span> · {seg.time}</div>
                    </div>
                  </div>
                  {i < route.length - 1 && <div className="w-0.5 h-4 ml-[5px]" style={{ background: "var(--border-hi)" }} />}
                </div>
              ))}
            </div>
            <div className="flex gap-5 mt-3 pt-3 text-[11px]" style={{ borderTop: "1px solid var(--border)" }}>
              <span className="text-text-3">Total: <b className="text-text-1">~2,500–3,000 km</b></span>
              <span className="text-text-3">Transit: <b className="text-text-1">7–10 days</b></span>
              <span className="text-text-3">Tunker numbers: <b className="text-text-1">12-13</b></span>
              <span className="text-text-3">Tunker per volume: <b className="text-text-1"> 1 tunker per 20t</b></span>
            </div>
          </Card>

          {/* Loss breakdown */}
          <Card title="Energy Loss Breakdown">
            <div className="flex items-center gap-0 overflow-x-auto py-3">
              {[
                { l: "H₂ Produced", v: `${annualH2.toLocaleString()} t`, t: "source" },
                { l: carrier === "ammonia" ? "Haber-Bosch" : "Conversion", v: `−${c.loss}%`, t: "loss" },
                { l: "Transport", v: `−2–5%`, t: "loss" },
                { l: "Delivered", v: `${delivered.toLocaleString()} t`, t: "output" },
              ].map((n, i) => (
                <div key={i} className="flex items-center">
                  <div className="rounded-lg px-3 py-2 text-center min-w-[90px]"
                    style={{
                      background: n.t === "source" ? "var(--amber-dim)" : n.t === "loss" ? "var(--red-dim)" : "var(--green-dim)",
                      border: `1px solid ${n.t === "source" ? "rgba(245,166,35,0.3)" : n.t === "loss" ? "rgba(248,113,113,0.3)" : "rgba(74,222,128,0.3)"}`,
                    }}>
                    <div className="text-[10px] text-text-2">{n.l}</div>
                    <div className="font-head text-[12px] text-text-1">{n.v}</div>
                  </div>
                  {i < 3 && <span className="text-text-3 text-[16px] px-2">→</span>}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
