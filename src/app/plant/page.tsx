"use client";
import { useState, useCallback } from "react";
import Topbar from "@/components/Topbar";
import Card from "@/components/Card";
import ResultBlock from "@/components/ResultBlock";
import FlowDiagram from "@/components/FlowDiagram";

const REGION_CF: Record<string, { solar: number; wind: number; hybrid: number }> = {
  atyrau:    { solar: 18, wind: 32, hybrid: 28 },
  mangystau: { solar: 20, wind: 35, hybrid: 30 },
  astana:    { solar: 16, wind: 24, hybrid: 22 },
  south_kz:  { solar: 22, wind: 20, hybrid: 22 },
  almaty:    { solar: 15, wind: 18, hybrid: 18 },
  uzbekistan:{ solar: 23, wind: 18, hybrid: 22 },
};

export default function PlantDesigner() {
  const [region, setRegion] = useState("mangystau");
  const [source, setSource] = useState("hybrid");
  const [capacity, setCapacity] = useState(200);
  const [cf, setCf] = useState(35);
  const [eff, setEff] = useState(53);

  const calc = useCallback(() => {
    const annualGen = capacity * (cf / 100) * 8760;
    const rectLoss = annualGen * 0.04;
    const availableForElz = annualGen - rectLoss;
    const h2Tonnes = (availableForElz * 1000) / eff;
    const h2Daily = h2Tonnes / 365;
    const waterDaily = h2Daily * 20;
    return { annualGen, rectLoss, availableForElz, h2Tonnes, h2Daily, waterDaily, fullLoadHrs: cf / 100 * 8760 };
  }, [capacity, cf, eff]);

  const r = calc();

  return (
    <div className="p-4 md:p-7">
      <Topbar title="Plant Design Module — 100 MW" subtitle="Configure your green hydrogen production plant and simulate energy flows" badge="Engineering Calculator" badgeVariant="teal" />
      <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-4">
        {/* Inputs */}
        <Card title="Plant Configuration">
          <div className="mb-4">
            <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5">Location</label>
            <select className="form-control" value={region} onChange={e => { setRegion(e.target.value); const rc = REGION_CF[e.target.value]; if (rc) setCf(rc[source as keyof typeof rc] || 25); }}>
              <option value="mangystau">Mangystau Region</option>
              <option value="atyrau">Atyrau Region (West KZ)</option>
              <option value="astana">Astana / Akmola</option>
              <option value="south_kz">South Kazakhstan</option>
              <option value="almaty">Almaty Region</option>
              <option value="uzbekistan">Uzbekistan</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5">Renewable Source</label>
            <select className="form-control" value={source} onChange={e => setSource(e.target.value)}>
              <option value="solar">Solar PV</option>
              <option value="wind">Wind</option>
              <option value="hybrid">Hybrid (Solar + Wind)</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5">Installed Capacity</label>
            <div className="flex items-center gap-3">
              <input type="range" min={100} max={400} step={10} value={capacity} onChange={e => setCapacity(+e.target.value)} className="flex-1" />
              <span className="font-head text-[13px] text-amber min-w-[52px] text-right">{capacity} MW</span>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5">Capacity Factor</label>
            <div className="flex items-center gap-3">
              <input type="range" min={15} max={55} step={1} value={cf} onChange={e => setCf(+e.target.value)} className="flex-1" />
              <span className="font-head text-[13px] text-amber min-w-[52px] text-right">{cf}%</span>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5">Electrolyzer Efficiency (kWh/kg H₂)</label>
            <div className="flex items-center gap-3">
              <input type="range" min={50} max={60} step={0.5} value={eff} onChange={e => setEff(+e.target.value)} className="flex-1" />
              <span className="font-head text-[13px] text-amber min-w-[52px] text-right">{eff} kWh</span>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="flex flex-col gap-4">
          <Card title="Hydrogen Output KPIs">
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Annual H₂", value: `${(r.h2Tonnes / 1000).toFixed(1)}k`, unit: "tonnes/yr" },
                { label: "Daily H₂", value: Math.round(r.h2Daily).toLocaleString(), unit: "kg/day" },
                { label: "Full-Load Hours", value: Math.round(r.fullLoadHrs).toLocaleString(), unit: "hrs/yr" },
              ].map(k => (
                <div key={k.label} className="rounded-lg p-3" style={{ background: "var(--bg-2)", border: "1px solid var(--border)" }}>
                  <div className="text-[10px] text-text-2 uppercase">{k.label}</div>
                  <div className="font-head text-[20px] text-text-1">{k.value}</div>
                  <div className="text-[10px] text-text-3">{k.unit}</div>
                </div>
              ))}
            </div>
            <ResultBlock rows={[
              { label: "Annual RE Generation", value: `${(r.annualGen / 1000).toFixed(0)} GWh`, variant: "highlight" },
              { label: "Rectifier + Transformer Losses (4%)", value: `${(r.rectLoss / 1000).toFixed(0)} GWh`, variant: "red" },
              { label: "Available for Electrolysis", value: `${(r.availableForElz / 1000).toFixed(0)} GWh`, variant: "green" },
              { label: "System SEC", value: `${eff} kWh/kg H₂` },
              { label: "Water Consumption", value: `${Math.round(r.waterDaily)} m³/day` },
            ]} />
          </Card>

          <Card title="Energy Flow Diagram">
            <FlowDiagram nodes={[
              { label: "RE Input", value: `${capacity} MW`, type: "source" },
              { label: "Generation", value: `${(r.annualGen / 1000).toFixed(0)} GWh`, type: "source" },
              { label: "Rectifier", value: `−${(r.rectLoss / 1000).toFixed(0)} GWh`, type: "loss" },
              { label: "Electrolyzer", value: `100 MW PEM`, type: "process" },
              { label: "H₂ Output", value: `${(r.h2Tonnes / 1000).toFixed(1)}k t/yr`, type: "output" },
            ]} />
          </Card>
        </div>
      </div>
    </div>
  );
}
