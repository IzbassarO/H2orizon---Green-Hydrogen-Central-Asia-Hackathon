"use client";
import Topbar from "@/components/Topbar";
import Card from "@/components/Card";
import { TRANSPORT_METHODS } from "@/lib/data/transport";

export default function TransportPage() {
  const methods = Object.values(TRANSPORT_METHODS);
  return (
    <div className="p-4 md:p-7">
      <Topbar title="Transport Matrix" subtitle="Compare hydrogen carrier technologies for Central Asia–Europe corridors" badge="5 Methods" badgeVariant="teal" />

      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-3 md:overflow-x-auto md:pb-3">
          {methods.map(m => (
            <div
              key={m.name}
              className="rounded-lg p-3.5 w-full md:w-[185px] lg:w-[195px] md:shrink-0"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <div
                className="font-head text-[10px] mb-2.5 leading-tight break-words"
                style={{ color: m.color }}
              >
                {m.name}
              </div>

              {[
                { l: "Efficiency", v: `${m.efficiency}%` },
                { l: "Energy loss", v: `${m.energyLoss}%` },
                { l: "CAPEX", v: m.capex },
                { l: "Cost range", v: m.costRange },
                { l: "Max dist.", v: `${m.distanceMax.toLocaleString()} km` },
                { l: "Lead time", v: m.leadTime },
              ].map(r => (
                <div
                  key={r.l}
                  className="py-1.5"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-0.5 md:gap-2">
                    <span className="text-text-2 text-[10px] leading-tight break-words">
                      {r.l}
                    </span>
                    <span className="font-head text-text-1 text-[10px] leading-tight md:text-right break-words">
                      {r.v}
                    </span>
                  </div>
                </div>
              ))}

              <div className="mt-2.5 text-[9px] leading-snug text-text-3 break-words">
                {m.infraReq}
              </div>
              <div className="mt-1.5 text-[9px] leading-snug text-text-3 break-words">
                Storage: {m.storageReq}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card title="Suitability for Central Asia → Europe">
        <div className="-mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto">
          <table className="w-full text-[12px] min-w-[700px]" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>{["Method", "Efficiency", "Loss", "CAPEX", "Distance fit", "Lead time", "Verdict"].map(h => (
                <th key={h} className="text-left py-2 px-3 font-head text-[10px] text-text-2 uppercase whitespace-nowrap"
                  style={{ background: "var(--bg-2)", borderBottom: "1px solid var(--border)" }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {methods.map(m => {
                const verdict = m.distanceSuitable >= 80 ? { t: "Recommended", c: "#4ade80" } : m.distanceSuitable >= 50 ? { t: "Possible", c: "#f5a623" } : { t: "Not viable", c: "#f87171" };
                return (
                  <tr key={m.name}>
                    <td className="py-2 px-3 font-medium whitespace-nowrap" style={{ color: m.color, borderBottom: "1px solid var(--border)" }}>{m.name}</td>
                    <td className="py-2 px-3 font-head text-green whitespace-nowrap" style={{ borderBottom: "1px solid var(--border)" }}>{m.efficiency}%</td>
                    <td className="py-2 px-3 font-head whitespace-nowrap" style={{ color: m.energyLoss > 30 ? "#f87171" : "#f5a623", borderBottom: "1px solid var(--border)" }}>{m.energyLoss}%</td>
                    <td className="py-2 px-3 text-text-2 whitespace-nowrap" style={{ borderBottom: "1px solid var(--border)" }}>{m.capex}</td>
                    <td className="py-2 px-3 whitespace-nowrap" style={{ borderBottom: "1px solid var(--border)" }}>
                      <div className="flex items-center gap-2">
                        <div className="w-[60px] h-[4px] rounded-sm shrink-0" style={{ background: "var(--bg-3)" }}>
                          <div className="h-[4px] rounded-sm" style={{ width: `${m.distanceSuitable}%`, background: m.color }} />
                        </div>
                        <span className="text-text-2">{m.distanceSuitable}%</span>
                      </div>
                    </td>
                    <td className="py-2 px-3 text-text-2 whitespace-nowrap" style={{ borderBottom: "1px solid var(--border)" }}>{m.leadTime}</td>
                    <td className="py-2 px-3 font-head text-[11px] whitespace-nowrap" style={{ color: verdict.c, borderBottom: "1px solid var(--border)" }}>{verdict.t}</td>
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
