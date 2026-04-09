"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { RouteOption } from "@/lib/data/routes";

interface Props {
  route: RouteOption;
  originCoords: [number, number];
}

const MODE_ICONS: Record<string, string> = {
  pipeline: "⛽", rail: "🚂", sea: "🚢", road: "🚛", port: "⚓",
};

export default function RouteMapView({ route, originCoords }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }

    const map = L.map(containerRef.current, {
      center: [42, 45],
      zoom: 4,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 12, minZoom: 3,
    }).addTo(map);
    L.control.zoom({ position: "bottomright" }).addTo(map);

    const allPoints: L.LatLng[] = [];

    // Draw each segment
    route.segments.forEach((seg, i) => {
      const latlngs = seg.waypoints.map(([lat, lng]) => L.latLng(lat, lng));
      allPoints.push(...latlngs);

      // Glow layer
      L.polyline(latlngs, {
        color: seg.color, weight: 10, opacity: 0.08,
      }).addTo(map);

      // Main line
      const line = L.polyline(latlngs, {
        color: seg.color,
        weight: 3.5,
        opacity: 0.85,
        dashArray: seg.dashArray || undefined,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);

      // Start point marker
      const start = seg.waypoints[0];
      const end = seg.waypoints[seg.waypoints.length - 1];

      const isFirst = i === 0;
      const isLast = i === route.segments.length - 1;

      // Origin marker (first segment start)
      if (isFirst) {
        const originIcon = L.divIcon({
          html: `<div style="width:20px;height:20px;border-radius:50%;background:#10B981;border:3px solid #080c12;box-shadow:0 0 12px rgba(16,185,129,0.5)"></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
          className: "",
        });
        L.marker(start as [number, number], { icon: originIcon }).addTo(map)
          .bindTooltip(`<b>${seg.from}</b><br><span style="color:#10B981">● Origin</span>`, { className: "route-tip", direction: "top", offset: [0, -12] });
      }

      // Waypoint markers at segment transitions
      const waypointIcon = L.divIcon({
        html: `<div style="width:14px;height:14px;border-radius:50%;background:${seg.color};border:2px solid #080c12;box-shadow:0 0 8px ${seg.color}40"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
        className: "",
      });

      if (!isFirst) {
        L.marker(start as [number, number], { icon: waypointIcon }).addTo(map)
          .bindTooltip(
            `<b>${seg.from}</b><br>${MODE_ICONS[seg.mode] || "●"} ${seg.mode}<br><span style="color:${seg.color}">${seg.dist} · ${seg.time}</span>`,
            { className: "route-tip", direction: "top", offset: [0, -10] }
          );
      }

      // Destination marker (last segment end)
      if (isLast) {
        const destIcon = L.divIcon({
          html: `<div style="width:20px;height:20px;border-radius:50%;background:#EC4899;border:3px solid #080c12;box-shadow:0 0 12px rgba(236,72,153,0.5)"></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
          className: "",
        });
        L.marker(end as [number, number], { icon: destIcon }).addTo(map)
          .bindTooltip(`<b>${seg.to}</b><br><span style="color:#EC4899">● Destination (EU)</span>`, { className: "route-tip", direction: "top", offset: [0, -12] });
      }

      // Mode label on longer segments
      if (seg.waypoints.length > 3) {
        const midIdx = Math.floor(seg.waypoints.length / 2);
        const mid = seg.waypoints[midIdx];
        const labelIcon = L.divIcon({
          html: `<div style="background:#0d1420;border:1px solid ${seg.color}60;border-radius:6px;padding:3px 8px;font-size:10px;color:${seg.color};white-space:nowrap;font-family:'Space Mono',monospace;font-weight:600">${MODE_ICONS[seg.mode] || ""} ${seg.dist}</div>`,
          className: "",
          iconAnchor: [40, 10],
        });
        L.marker(mid as [number, number], { icon: labelIcon, interactive: false }).addTo(map);
      }
    });

    // Fit bounds
    if (allPoints.length > 0) {
      const bounds = L.latLngBounds(allPoints);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 6 });
    }

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [route, originCoords]);

  return (
    <div className="rounded-lg overflow-hidden relative" style={{ border: "1px solid var(--border)", height: "clamp(350px, 55vh, 550px)" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%", zIndex: 1 }} />
      <style>{`
        .route-tip{background:#0d1420!important;border:1px solid rgba(255,255,255,0.14)!important;color:#e8edf5!important;border-radius:8px!important;padding:8px 12px!important;box-shadow:0 4px 20px rgba(0,0,0,0.5)!important;font-family:'DM Sans',sans-serif!important;font-size:11px!important;line-height:1.5!important}
        .route-tip::before{border-top-color:#0d1420!important}
        .leaflet-container{background:#080c12!important}
      `}</style>

      {/* Legend overlay */}
      <div className="absolute top-3 left-3 z-[10] rounded-lg p-3" style={{ background: "rgba(13,20,32,0.92)", border: "1px solid var(--border)" }}>
        <div className="font-head text-[9px] text-text-3 uppercase tracking-wider mb-2">Route Legend</div>
        {[
          { mode: "Pipeline/Road", color: "#9CA3AF", dash: true },
          { mode: "Rail (BTK)", color: "#FCD34D", dash: false },
          { mode: "Sea route", color: "#60A5FA", dash: true },
          { mode: "Ship", color: "#EC4899", dash: true },
        ].map(l => (
          <div key={l.mode} className="flex items-center gap-2 mb-1">
            <div className="w-[20px] h-[3px] rounded" style={{ background: l.color, opacity: l.dash ? 0.7 : 1 }} />
            <span className="text-[9px] text-text-2">{l.mode}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
