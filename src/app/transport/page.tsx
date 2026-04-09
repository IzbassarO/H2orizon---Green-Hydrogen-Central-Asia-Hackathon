"use client";
import Topbar from "@/components/Topbar";
import Card from "@/components/Card";
import { TRANSPORT_METHODS } from "@/lib/data/transport";

export default function TransportPage() {
  const methods = Object.values(TRANSPORT_METHODS);
  return (
    <div className="p-4 md:p-7">
      <Topbar title="Transport Matrix" subtitle="Compare hydrogen carrier technologies for Central Asia–Europe corridors" badge="5 Methods" badgeVariant="teal" />

      {/* Cards - horizontal scroll on mobile */}
      <div className="overflow-x-auto pb-3 mb-6">
        <div className="flex gap-3" style={{ minWidth: "max-content" }}>
          {methods.map(m => (
            <div key={m.name} className="rounded-lg p-4 w-[220px] shrink-0" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="font-head text-[11px] mb-3" style={{ color: m.color }}>{m.name}</div>
              {[
                { l: "Efficiency", v: `${m.efficiency}%` },
                { l: "Energy loss", v: `${m.energyLoss}%` },
                { l: "CAPEX", v: m.capex },
                { l: "Cost range", v: m.costRange },
                { l: "Max dist.", v: `${m.distanceMax.toLocaleString()} km` },
                { l: "Lead time", v: m.leadTime },
              ].map(r => (
                <div key={r.l} className="flex justify-between py-1 text-[11px]" style={{ borderBottom: "1px solid var(--border)" }}>
                  <span className="text-text-2">{r.l}</span>
                  <span className="font-head text-text-1">{r.v}</span>
                </div>
              ))}
              <div className="mt-3 text-[10px] text-text-3">{m.infraReq}</div>
              <div className="mt-2 text-[10px] text-text-3">Storage: {m.storageReq}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Table - horizontal scroll */}
      <Card title="Suitability for Central Asia → Europe">
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]" style={{ borderCollapse: "collapse", minWidth: 700 }}>
            <thead>
              <tr>{["Method","Efficiency","Loss","CAPEX","Distance fit","Lead time","Verdict"].map(h=>(
                <th key={h} className="text-left py-2 px-3 font-head text-[10px] text-text-2 uppercase whitespace-nowrap"
                  style={{ background:"var(--bg-2)", borderBottom:"1px solid var(--border)" }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {methods.map(m => {
                const verdict = m.distanceSuitable >= 80 ? { t:"Recommended", c:"#4ade80" } : m.distanceSuitable >= 50 ? { t:"Possible", c:"#f5a623" } : { t:"Not viable", c:"#f87171" };
                return (
                  <tr key={m.name}>
                    <td className="py-2 px-3 font-medium whitespace-nowrap" style={{color:m.color,borderBottom:"1px solid var(--border)"}}>{m.name}</td>
                    <td className="py-2 px-3 font-head text-green" style={{borderBottom:"1px solid var(--border)"}}>{m.efficiency}%</td>
                    <td className="py-2 px-3 font-head" style={{color:m.energyLoss>30?"#f87171":"#f5a623",borderBottom:"1px solid var(--border)"}}>{m.energyLoss}%</td>
                    <td className="py-2 px-3 text-text-2 whitespace-nowrap" style={{borderBottom:"1px solid var(--border)"}}>{m.capex}</td>
                    <td className="py-2 px-3" style={{borderBottom:"1px solid var(--border)"}}>
                      <div className="flex items-center gap-2">
                        <div className="w-[60px] h-[4px] rounded-sm" style={{background:"var(--bg-3)"}}>
                          <div className="h-[4px] rounded-sm" style={{width:`${m.distanceSuitable}%`,background:m.color}}/>
                        </div>
                        <span className="text-text-2">{m.distanceSuitable}%</span>
                      </div>
                    </td>
                    <td className="py-2 px-3 text-text-2 whitespace-nowrap" style={{borderBottom:"1px solid var(--border)"}}>{m.leadTime}</td>
                    <td className="py-2 px-3 font-head text-[11px] whitespace-nowrap" style={{color:verdict.c,borderBottom:"1px solid var(--border)"}}>{verdict.t}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
