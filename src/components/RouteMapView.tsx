"use client";

import { useEffect, useRef, useState } from "react";
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

const ANIMATION_DURATION_MS = 20000;

function lerp(a: [number, number], b: [number, number], t: number): [number, number] {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
  ];
}

function segLen(points: [number, number][]): number {
  let len = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i][1] - points[i - 1][1];
    const dy = points[i][0] - points[i - 1][0];
    len += Math.sqrt(dx * dx + dy * dy);
  }
  return len;
}

export default function RouteMapView({ route, originCoords }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  const animationRef = useRef<number | null>(null);
  const trailRef = useRef<L.Polyline | null>(null);
  const movingMarkerRef = useRef<L.Marker | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedProgressRef = useRef(0);

  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const stopAnimationFrame = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const resetAnimation = () => {
    stopAnimationFrame();
    startTimeRef.current = null;
    pausedProgressRef.current = 0;
    setIsPlaying(false);
    setProgress(0);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

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

    route.segments.forEach((seg, i) => {
      const latlngs = seg.waypoints.map(([lat, lng]) => L.latLng(lat, lng));
      allPoints.push(...latlngs);

      L.polyline(latlngs, {
        color: seg.color, weight: 10, opacity: 0.08,
      }).addTo(map);

      L.polyline(latlngs, {
        color: seg.color,
        weight: 3.5,
        opacity: 0.85,
        dashArray: seg.dashArray || undefined,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);

      const start = seg.waypoints[0];
      const end = seg.waypoints[seg.waypoints.length - 1];
      const isFirst = i === 0;
      const isLast = i === route.segments.length - 1;

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

    if (allPoints.length > 0) {
      const bounds = L.latLngBounds(allPoints);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 6 });
    }

    trailRef.current = L.polyline([], {
      color: "#f5a623",
      weight: 4,
      opacity: 0.95,
      lineCap: "round",
      lineJoin: "round",
    }).addTo(map);

    const movingIcon = L.divIcon({
      html: `
        <div style="position:relative;width:28px;height:28px">
          <div style="position:absolute;top:50%;left:50%;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:#f5a623;box-shadow:0 0 14px rgba(245,166,35,0.85)"></div>
          <div style="position:absolute;top:50%;left:50%;width:28px;height:28px;margin:-14px 0 0 -14px;border-radius:50%;border:2px solid rgba(245,166,35,0.35)"></div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      className: "",
    });

    movingMarkerRef.current = L.marker(route.segments[0].waypoints[0] as [number, number], {
      icon: movingIcon,
    }).addTo(map);

    movingMarkerRef.current.setOpacity(0);
    mapRef.current = map;

    resetAnimation();

    return () => {
      stopAnimationFrame();
      map.remove();
      mapRef.current = null;
    };
  }, [route, originCoords]);

  useEffect(() => {
    if (!trailRef.current || !movingMarkerRef.current) return;

    const allSegments = route.segments;
    const lengths = allSegments.map((seg) => segLen(seg.waypoints));
    const totalLength = lengths.reduce((a, b) => a + b, 0);

    if (progress <= 0) {
      trailRef.current.setLatLngs([]);
      movingMarkerRef.current.setLatLng(allSegments[0].waypoints[0] as [number, number]);
      movingMarkerRef.current.setOpacity(0);
      return;
    }

    movingMarkerRef.current.setOpacity(1);

    const target = (progress / 100) * totalLength;
    let accumulated = 0;
    const trail: [number, number][] = [];

    for (let i = 0; i < allSegments.length; i++) {
      const seg = allSegments[i];
      const points = seg.waypoints;
      const currentSegLength = lengths[i];

      if (accumulated + currentSegLength < target) {
        if (trail.length === 0) {
          trail.push(...points);
        } else {
          trail.push(...points.slice(1));
        }
        accumulated += currentSegLength;
        continue;
      }

      const remaining = target - accumulated;

      if (trail.length === 0) {
        trail.push(points[0]);
      } else if (
        trail[trail.length - 1][0] !== points[0][0] ||
        trail[trail.length - 1][1] !== points[0][1]
      ) {
        trail.push(points[0]);
      }

      let walked = 0;

      for (let j = 1; j < points.length; j++) {
        const a = points[j - 1];
        const b = points[j];
        const dx = b[1] - a[1];
        const dy = b[0] - a[0];
        const piece = Math.sqrt(dx * dx + dy * dy);

        if (walked + piece >= remaining) {
          const t = piece === 0 ? 0 : (remaining - walked) / piece;
          const currentPoint = lerp(a, b, t);
          trail.push(currentPoint);
          movingMarkerRef.current.setLatLng(currentPoint as [number, number]);
          trailRef.current.setLatLngs(trail.map(([lat, lng]) => L.latLng(lat, lng)));
          return;
        }

        trail.push(b);
        walked += piece;
      }

      accumulated += currentSegLength;
    }

    const lastPoint = allSegments[allSegments.length - 1].waypoints.slice(-1)[0];
    movingMarkerRef.current.setLatLng(lastPoint as [number, number]);
    trailRef.current.setLatLngs(trail.map(([lat, lng]) => L.latLng(lat, lng)));
  }, [progress, route]);

  useEffect(() => {
    if (!isPlaying) {
      stopAnimationFrame();
      return;
    }

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp - (pausedProgressRef.current / 100) * ANIMATION_DURATION_MS;
      }

      const elapsed = timestamp - startTimeRef.current;
      const nextProgress = Math.min((elapsed / ANIMATION_DURATION_MS) * 100, 100);
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        pausedProgressRef.current = 100;
        setIsPlaying(false);
        stopAnimationFrame();
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return stopAnimationFrame;
  }, [isPlaying]);

  useEffect(() => {
    pausedProgressRef.current = progress;
    if (!isPlaying) {
      startTimeRef.current = null;
    }
  }, [progress, isPlaying]);

  return (
    <div className="space-y-3">
      <div
        className="rounded-lg overflow-hidden relative"
        style={{ border: "1px solid var(--border)", height: "clamp(350px, 55vh, 550px)" }}
      >
        <div ref={containerRef} style={{ width: "100%", height: "100%", zIndex: 1 }} />

        <style>{`
          .route-tip{background:#0d1420!important;border:1px solid rgba(255,255,255,0.14)!important;color:#e8edf5!important;border-radius:8px!important;padding:8px 12px!important;box-shadow:0 4px 20px rgba(0,0,0,0.5)!important;font-family:'DM Sans',sans-serif!important;font-size:11px!important;line-height:1.5!important}
          .route-tip::before{border-top-color:#0d1420!important}
          .leaflet-container{background:#080c12!important}
        `}</style>

        <div
          className="absolute top-3 left-3 z-[10] rounded-lg p-3 max-w-[calc(100%-24px)]"
          style={{ background: "rgba(13,20,32,0.92)", border: "1px solid var(--border)" }}
        >
          <div className="font-head text-[9px] text-text-3 uppercase tracking-wider mb-2">
            Route Legend
          </div>

          {[
            { mode: "Pipeline/Road", color: "#9CA3AF", dash: true },
            { mode: "Rail (BTK)", color: "#FCD34D", dash: false },
            { mode: "Sea route", color: "#60A5FA", dash: true },
            { mode: "Ship", color: "#EC4899", dash: true },
          ].map((l) => (
            <div key={l.mode} className="flex items-center gap-2 mb-1">
              <div
                className="w-[20px] h-[3px] rounded shrink-0"
                style={{ background: l.color, opacity: l.dash ? 0.7 : 1 }}
              />
              <span className="text-[9px] text-text-2 break-words">{l.mode}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="rounded-lg p-3 flex flex-col md:flex-row items-start md:items-center gap-3"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <div className="flex gap-2 shrink-0 flex-wrap">
          <button
            className="btn-primary"
            onClick={() => {
              resetAnimation();
              setIsPlaying(true);
            }}
          >
            Start
          </button>

          <button
            className="btn-secondary"
            onClick={() => setIsPlaying(false)}
            disabled={!isPlaying}
          >
            Stop
          </button>

          <button
            className="btn-secondary"
            onClick={() => {
              if (progress < 100) {
                setIsPlaying(true);
              }
            }}
            disabled={isPlaying || progress >= 100}
          >
            Continue
          </button>
        </div>

        <div className="flex-1 w-full">
          <div className="flex items-center gap-3">
            <div
              className="flex-1 h-[6px] rounded-sm overflow-hidden"
              style={{ background: "var(--bg-3)" }}
            >
              <div
                className="h-[6px] rounded-sm"
                style={{
                  width: `${progress}%`,
                  background: progress >= 100 ? "#4ade80" : "#f5a623",
                }}
              />
            </div>

            <span
              className="font-head text-[11px] min-w-[38px] text-right"
              style={{ color: progress >= 100 ? "#4ade80" : "#f5a623" }}
            >
              {Math.round(progress)}%
            </span>
          </div>

          <div className="text-[10px] text-text-2 mt-1">
            {isPlaying
              ? "Route animation is running"
              : progress >= 100
                ? "Route animation completed"
                : progress > 0
                  ? "Route animation is paused"
                  : "Route animation is ready to start"}
          </div>
        </div>
      </div>
    </div>
  );
}
