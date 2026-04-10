"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Topbar from "@/components/Topbar";
import Card from "@/components/Card";
import { ROUTE_DATA, RouteOption } from "@/lib/data/routes";
import { KZ_REGIONS } from "@/components/KazakhstanMap";

const RouteMapView = dynamic(() => import("@/components/RouteMapView"), { ssr: false });

const ORIGINS = [
  { id: "mangystau", label: "Mangystau (Kuryk Port)" },
  { id: "atyrau", label: "Atyrau Region" },
  { id: "aktobe", label: "Aktobe" },
  { id: "akmola", label: "Astana / Akmola" },
  { id: "turkestan", label: "Turkestan / South KZ" },
  { id: "karaganda", label: "Karaganda" },
];

export default function RouteBuilderPage() {
  const [originId, setOriginId] = useState("mangystau");
  const [selectedRoute, setSelectedRoute] = useState<RouteOption | null>(null);
  const [phase, setPhase] = useState<"select" | "map">("select");

  const data = ROUTE_DATA[originId] || ROUTE_DATA.default;
  const routes = data.routes;
  const originCoords = data.originCoords;

  const selectRoute = (r: RouteOption) => {
    setSelectedRoute(r);
    setPhase("map");
  };

  return (
    <div className="p-4 md:p-7">
      <Topbar title="Route Builder" subtitle="Build and visualize optimal export routes from any region" badge="Transport Planning" badgeVariant="teal" />

      {/* Origin selector */}
      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <div className="flex-1">
          <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5">Origin Region</label>
          <select className="form-control" value={originId} onChange={e => { setOriginId(e.target.value); setSelectedRoute(null); setPhase("select"); }}>
            {ORIGINS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
        </div>
        {selectedRoute && (
          <button onClick={() => { setSelectedRoute(null); setPhase("select"); }}
            className="btn-secondary self-end whitespace-nowrap">
            ← Change route
          </button>
        )}
      </div>

      {phase === "select" && (
        <>
          <div className="font-head text-[11px] text-text-2 uppercase tracking-wider mb-3">
            Available routes from {data.originName}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
            {routes.map(r => (
              <div key={r.id} className="rounded-lg p-4 cursor-pointer transition-all duration-200 hover:scale-[1.01]"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                onClick={() => selectRoute(r)}>

                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-head text-[13px] font-bold leading-tight pr-2">{r.name}</h3>
                  <div className="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-head"
                    style={{
                      background: r.reliability >= 75 ? "var(--green-dim)" : r.reliability >= 50 ? "var(--amber-dim)" : "var(--red-dim)",
                      color: r.reliability >= 75 ? "#4ade80" : r.reliability >= 50 ? "#f5a623" : "#f87171",
                    }}>
                    {r.reliability}% reliable
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[
                    { l: "Distance", v: r.totalDist },
                    { l: "Transit", v: r.totalDays },
                    { l: "Est. cost", v: r.totalCost },
                    { l: "Carrier", v: r.carrier },
                  ].map(k => (
                    <div key={k.l}>
                      <div className="text-[9px] text-text-3 uppercase">{k.l}</div>
                      <div className="font-head text-[12px] text-text-1">{k.v}</div>
                    </div>
                  ))}
                </div>

                {/* Segment preview */}
                <div className="flex items-center gap-0 overflow-x-auto pb-1">
                  {r.segments.map((s, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                      {i < r.segments.length - 1 && (
                        <div className="h-[2px] w-[20px] shrink-0" style={{ background: s.color, opacity: 0.5 }} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-[9px] text-text-3 mt-1">
                  {r.segments.length} segments · {r.segments.map(s => s.mode).filter((v, i, a) => a.indexOf(v) === i).join(" → ")}
                </div>

                <button className="w-full mt-3 rounded-lg py-2 text-[12px] font-head font-bold cursor-pointer text-black"
                  style={{ background: "var(--amber)" }}
                  onClick={(e) => { e.stopPropagation(); selectRoute(r); }}>
                  Build this route →
                </button>
              </div>
            ))}
          </div>

          {/* Quick info */}
          <div className="rounded-lg p-3 text-[11px] text-text-2 leading-relaxed"
            style={{ background: "var(--bg-2)", border: "1px solid var(--border)" }}>
            Routes follow real transport corridors: BTK Railway (Baku–Tbilisi–Kars), Caspian Sea shipping lanes, Turkish rail network, and Black Sea / Mediterranean shipping. All distances and transit times based on operational data.
          </div>
        </>
      )}

      {phase === "map" && selectedRoute && (
        <div className="space-y-4">
          {/* Map */}
          <RouteMapView route={selectedRoute} originCoords={originCoords} />

          {/* Route detail */}
          <div className="grid grid-cols-1 md:grid-cols-[7fr_5fr] gap-4">
            {/* Segments */}
            <Card title={`Route: ${selectedRoute.name}`}>
              <div className="space-y-0">
                {selectedRoute.segments.map((seg, i) => (
                  <div key={i}>
                    <div className="flex items-start gap-3 py-3">
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-3 h-3 rounded-full" style={{ border: `2px solid ${seg.color}`, background: "var(--bg-0)" }} />
                        {i < selectedRoute.segments.length - 1 && <div className="w-0.5 flex-1 min-h-[30px]" style={{ background: seg.color + "30" }} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-medium">{seg.from} → {seg.to}</span>
                          <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: seg.color + "18", color: seg.color }}>
                            {seg.mode}
                          </span>
                        </div>
                        <div className="flex gap-4 mt-1 text-[11px] text-text-2">
                          <span>📏 {seg.dist}</span>
                          <span>⏱ {seg.time}</span>
                          <span>💰 {seg.cost}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Summary */}
            <div className="space-y-3">
              <Card>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { l: "Total distance", v: selectedRoute.totalDist, c: "var(--text-1)" },
                    { l: "Transit time", v: selectedRoute.totalDays, c: "var(--text-1)" },
                    { l: "Est. cost", v: selectedRoute.totalCost, c: "var(--amber)" },
                    { l: "Carrier", v: selectedRoute.carrier, c: "#2dd4bf" },
                  ].map(k => (
                    <div key={k.l} className="rounded-lg p-3" style={{ background: "var(--bg-2)" }}>
                      <div className="text-[9px] text-text-3 uppercase">{k.l}</div>
                      <div className="font-head text-[15px] font-bold" style={{ color: k.c }}>{k.v}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="Reliability Assessment">
                <div className="flex items-center gap-3 mb-3">
                  <div className="font-head text-[32px] font-bold"
                    style={{ color: selectedRoute.reliability >= 75 ? "#4ade80" : selectedRoute.reliability >= 50 ? "#f5a623" : "#f87171" }}>
                    {selectedRoute.reliability}%
                  </div>
                  <div className="text-[11px] text-text-2">
                    {selectedRoute.reliability >= 75 ? "High reliability — operational infrastructure" :
                     selectedRoute.reliability >= 50 ? "Moderate — some segments under development" :
                     "Low — future/planned infrastructure"}
                  </div>
                </div>
                <div className="h-2 rounded-sm" style={{ background: "var(--bg-3)" }}>
                  <div className="h-2 rounded-sm transition-all" style={{
                    width: `${selectedRoute.reliability}%`,
                    background: selectedRoute.reliability >= 75 ? "#4ade80" : selectedRoute.reliability >= 50 ? "#f5a623" : "#f87171",
                  }} />
                </div>
              </Card>

              <Card title="Transport Modes">
                <div className="space-y-1.5">
                  {selectedRoute.segments.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px]">
                      <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                      <span className="text-text-2">{s.mode}</span>
                      <span className="flex-1 h-px" style={{ background: "var(--border)" }} />
                      <span className="font-head" style={{ color: s.color }}>{s.dist}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
