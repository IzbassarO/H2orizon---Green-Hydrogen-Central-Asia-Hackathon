"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Topbar from "@/components/Topbar";
import Card from "@/components/Card";
import { KZ_REGIONS, KzRegion } from "@/components/KazakhstanMap";
import RegionModal from "@/components/RegionModal";
import { useRouter } from "next/navigation";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), { ssr: false });

export default function RegionalPage() {
  const [modalRegion, setModalRegion] = useState<KzRegion | null>(null);
  const router = useRouter();

  const sorted = [...KZ_REGIONS].sort((a, b) => {
    const s = (r: KzRegion) => r.wind * 0.3 + r.solar * 0.2 + r.water * 0.15 + r.grid * 0.15 + r.port * 0.1 + r.policy * 0.1;
    return s(b) - s(a);
  });

  return (
    <div className="p-4 md:p-7">
      <Topbar title="Regional Intelligence Module" subtitle="Interactive map — click a region to analyze" badge="13 Regions" badgeVariant="amber" />

      <LeafletMap onRegionClick={(r) => setModalRegion(r)} />

      <Card title="Region Ranking" className="mt-4">
        <div className="space-y-1">
          {sorted.map((r, i) => {
            const score = Math.round(r.wind * 0.3 + r.solar * 0.2 + r.water * 0.15 + r.grid * 0.15 + r.port * 0.1 + r.policy * 0.1);
            return (
              <div key={r.id} className="flex items-center gap-3 py-2 cursor-pointer hover:opacity-80" style={{ borderBottom: "1px solid var(--border)" }} onClick={() => setModalRegion(r)}>
                <span className="font-head text-[12px] text-text-3 w-[24px]">#{i + 1}</span>
                <div className="w-2 h-2 rounded-full" style={{ background: r.color }} />
                <span className="text-[13px] flex-1">{r.name}</span>
                <div className="w-[120px] h-[4px] rounded-sm" style={{ background: "var(--bg-3)" }}>
                  <div className="h-[4px] rounded-sm" style={{ width: `${score}%`, background: score >= 60 ? "#4ade80" : score >= 45 ? "#f5a623" : "#f87171" }} />
                </div>
                <span className="font-head text-[13px] w-[32px] text-right" style={{ color: score >= 60 ? "#4ade80" : score >= 45 ? "#f5a623" : "#f87171" }}>{score}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {modalRegion && (
        <RegionModal region={modalRegion} onClose={() => setModalRegion(null)}
          onAnalyze={(r) => { setModalRegion(null); router.push(`/plant?region=${r.id}`); }} />
      )}
    </div>
  );
}
