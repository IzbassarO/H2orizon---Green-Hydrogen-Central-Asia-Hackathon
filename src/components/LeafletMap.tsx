"use client";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { KZ_REGIONS, KzRegion } from "./KazakhstanMap";

interface Props { onRegionClick: (r: KzRegion) => void; selectedId?: string | null; }

const coords: Record<string,[number,number]> = {
  mangystau:[43.35,51.15],atyrau:[47.1,51.9],westKz:[51.2,51.4],aktobe:[50.3,57.2],kostanay:[53.2,63.6],
  akmola:[51.1,71.4],karaganda:[49.8,73.1],pavlodar:[52.3,76.9],eastKz:[49.9,82.6],kyzylorda:[44.8,65.5],
  turkestan:[42.3,69.6],zhambyl:[42.9,71.4],almaty:[43.2,76.9],
};

export default function LeafletMap({ onRegionClick, selectedId }: Props) {
  const mapRef = useRef<L.Map|null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);
  const [hovered, setHovered] = useState<KzRegion|null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, { center:[48.0,67.0], zoom:5, zoomControl:false, attributionControl:false });
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", { maxZoom:10, minZoom:4 }).addTo(map);
    L.control.zoom({ position:"bottomright" }).addTo(map);
    L.control.attribution({ position:"bottomleft", prefix:false }).addAttribution('© <a href="https://carto.com">CARTO</a> © <a href="https://osm.org">OSM</a>').addTo(map);

    KZ_REGIONS.forEach(region => {
      const ll = coords[region.id]; if (!ll) return;
      const m = L.circleMarker(ll, { radius:8, fillColor:region.color, fillOpacity:0.7, color:region.color, weight:2, opacity:0.9 }).addTo(map);
      m.bindTooltip(`<b style="font-size:11px">${region.name}</b><br><span style="font-size:10px;color:#8b95a8">${region.nameRu} · Wind:${region.wind} Solar:${region.solar}</span>`, { className:"kz-tooltip", direction:"top", offset:[0,-10] });
      m.on("mouseover", () => setHovered(region));
      m.on("mouseout", () => setHovered(null));
      m.on("click", () => onRegionClick(region));
      markersRef.current.push(m);
    });
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; markersRef.current = []; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    markersRef.current.forEach((m,i) => {
      const r = KZ_REGIONS[i];
      m.setStyle({ radius: r.id === selectedId ? 14 : 8, fillOpacity: r.id === selectedId ? 0.9 : 0.7, weight: r.id === selectedId ? 3 : 2 });
    });
  }, [selectedId]);

  const info = hovered || (selectedId ? KZ_REGIONS.find(r => r.id === selectedId) : null);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 rounded-lg overflow-hidden relative" style={{ border:"1px solid var(--border)", height: "clamp(300px, 50vh, 520px)" }}>
        <div ref={containerRef} style={{ width:"100%", height:"100%", zIndex:1 }} />
        <style>{`.kz-tooltip{background:#0d1420!important;border:1px solid rgba(255,255,255,0.14)!important;color:#e8edf5!important;border-radius:8px!important;padding:8px 12px!important;box-shadow:0 4px 20px rgba(0,0,0,0.5)!important;font-family:'DM Sans',sans-serif!important}.kz-tooltip::before{border-top-color:#0d1420!important}.leaflet-container{background:#080c12!important}`}</style>
      </div>

      <div className="w-full md:w-[300px] md:shrink-0 flex flex-col gap-2.5">
        {info ? (<>
          <div className="rounded-lg p-4" style={{ background:"var(--bg-card)", border:"1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background:info.color }} />
              <span className="font-head text-[13px] font-bold">{info.name}</span>
            </div>
            <p className="text-[11px] text-text-2 leading-relaxed">{info.desc}</p>
            {info.projects !== "—" && <div className="mt-2 rounded px-2 py-1 text-[10px]" style={{ background:"var(--amber-dim)", color:"var(--amber)" }}>📌 {info.projects}</div>}
          </div>
          <div className="rounded-lg p-3" style={{ background:"var(--bg-card)", border:"1px solid var(--border)" }}>
            {[{l:"Wind",v:info.wind,c:"#2DD4BF"},{l:"Solar",v:info.solar,c:"#F5A623"},{l:"Water",v:info.water,c:"#60A5FA"},{l:"Grid",v:info.grid,c:"#A78BFA"},{l:"Port",v:info.port,c:"#EC4899"},{l:"Policy",v:info.policy,c:"#4ADE80"}].map(m=>(
              <div key={m.l} className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] text-text-2 w-[44px]">{m.l}</span>
                <div className="flex-1 h-[3px] rounded-sm" style={{background:"var(--bg-3)"}}><div className="h-[3px] rounded-sm transition-all duration-500" style={{width:`${m.v}%`,background:m.c}}/></div>
                <span className="font-head text-[10px] w-[22px] text-right" style={{color:m.v>=70?"#4ade80":m.v>=45?"#f5a623":"#f87171"}}>{m.v}</span>
              </div>
            ))}
          </div>
          <button onClick={()=>onRegionClick(info)} className="w-full rounded-lg py-2.5 text-[12px] font-bold font-head text-black cursor-pointer" style={{background:info.color}}>Analyze {info.name} →</button>
        </>) : (
          <div className="rounded-lg p-6 md:p-8 text-center" style={{background:"var(--bg-card)",border:"1px solid var(--border)"}}>
            <div className="text-[36px] opacity-10 mb-2">🗺</div>
            <div className="text-[13px] text-text-2">Click on a point</div>
          </div>
        )}
      </div>
    </div>
  );
}
