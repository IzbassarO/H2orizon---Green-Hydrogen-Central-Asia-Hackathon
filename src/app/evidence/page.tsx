"use client";
import { useState } from "react";
import Topbar from "@/components/Topbar";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { EVIDENCE } from "@/lib/data/evidence";

export default function EvidencePage() {
  const [region, setRegion] = useState("");
  const [topic, setTopic] = useState("");

  const filtered = EVIDENCE.filter(e => {
    if (region && e.region !== region) return false;
    if (topic && e.topic !== topic) return false;
    return true;
  });

  return (
    <div className="p-4 md:p-7">
      <Topbar title="Evidence Base" subtitle="Source-linked research citations and verified data fragments" badge={`${filtered.length} Sources`} badgeVariant="green" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5">Region</label>
          <select className="form-control" value={region} onChange={e => setRegion(e.target.value)}>
            <option value="">All Regions</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Central Asia">Central Asia</option>
            <option value="Astana">Astana</option>
          </select>
        </div>
        <div>
          <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5">Topic</label>
          <select className="form-control" value={topic} onChange={e => setTopic(e.target.value)}>
            <option value="">All Topics</option>
            <option value="RE">Renewable Energy</option>
            <option value="H2">Hydrogen</option>
            <option value="Water">Water</option>
            <option value="Policy">Policy</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((e, i) => (
          <div key={i} className="rounded-lg p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-[13px] font-medium">{e.indicator}</div>
                <div className="text-[11px] text-text-2 mt-0.5">{e.region} · {e.topic}</div>
              </div>
              <div className="text-right">
                <div className="font-head text-[16px] text-amber">{e.value}</div>
                <Badge variant={e.confidence === "HIGH" ? "green" : "amber"}>{e.confidence}</Badge>
              </div>
            </div>
            <div className="text-[11px] text-text-2 leading-relaxed">
              <b className="text-text-1">Unit:</b> {e.unit} · <b className="text-text-1">Year:</b> {e.year} · <b className="text-text-1">Source:</b> {e.source} ({e.org})
            </div>
            <div className="mt-2 rounded p-2.5 text-[11px] text-text-3 italic leading-relaxed"
              style={{ background: "var(--bg-2)", borderLeft: "2px solid var(--border-hi)" }}>
              &ldquo;{e.fragment}&rdquo;
            </div>
            <a href={e.link} target="_blank" className="text-teal text-[11px] mt-2 inline-block hover:underline">
              → View source
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
