import Link from "next/link";
import Topbar from "@/components/Topbar";
import KPICard from "@/components/KPICard";
import Card from "@/components/Card";
import Badge from "@/components/Badge";

export default function LandingPage() {
  return (
    <div className="p-4 md:p-7">
      <Topbar title="H₂orizon — Site Analysis Platform" subtitle="Kazakhstan & Central Asia · Strategic Decision Support System" badge="H₂orizon Team" badgeVariant="amber" />

      {/* Hero */}
      <div className="rounded-lg p-8 mb-6 relative overflow-hidden" style={{ background: "var(--bg-1)", border: "1px solid var(--border)" }}>
        <div className="absolute -top-[60px] -right-[60px] w-[240px] h-[240px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 70%)" }} />
        <h2 className="font-head text-[28px] font-bold text-text-1 leading-tight mb-2.5 relative">
          Turning Central Asia&apos;s <span className="text-amber">Renewable Potential</span><br />into Green Hydrogen Export Power
        </h2>
        <p className="text-[14px] text-text-2 leading-relaxed max-w-[580px] mb-5 relative">
          A comprehensive platform for evaluating green hydrogen production feasibility and export infrastructure across Kazakhstan and Central Asia. Designed for the Green Hydrogen Hackathon Central Asia 2026.
        </p>
        <div className="flex gap-2.5 flex-wrap relative">
          <Link href="/plant" className="btn-primary">Design a Plant →</Link>
          <Link href="/export" className="btn-secondary">Simulate Export Route</Link>
          <Link href="/decision" className="btn-secondary">Run Decision Engine</Link>
          <Link href="/ai-scorer" className="btn-secondary" style={{ borderColor: "rgba(45,212,191,0.4)", color: "var(--teal)" }}>🤖 AI Site Scorer</Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <KPICard label="Renewable Installed" value="2.9 GW" unit="Wind + Solar in Kazakhstan" tag="5.9% electricity mix" />
        <KPICard label="High-Wind Territory" value="50%" unit="Of Kazakhstan landmass" tag="Significant potential" />
        <KPICard label="Sunshine Hours" value="2,200–3,000" unit="Hours per year (national)" tag="Solar-viable" />
        <KPICard label="H₂ Target by 2040" value="10 GW" unit="Electrolyzer capacity" tag="2040 Roadmap" />
      </div>

      {/* Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card title="Challenge 1 — Plant Design">
          <p className="text-text-2 text-[13px] leading-relaxed mb-3.5">Design a 100 MW green hydrogen production plant. Select location, renewable source, and system configuration.</p>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="amber">PEM Electrolysis</Badge>
            <Badge variant="teal">Rectifier Losses</Badge>
            <Badge variant="green">H₂ Output KPIs</Badge>
            <Badge variant="blue">Energy Flow Diagram</Badge>
          </div>
          <Link href="/plant" className="btn-primary mt-3.5 w-full text-center block">Open Plant Designer →</Link>
        </Card>
        <Card title="Challenge 2 — Export System">
          <p className="text-text-2 text-[13px] leading-relaxed mb-3.5">Simulate hydrogen export to European markets. Compare pipeline, ammonia, LH₂, LOHC, and truck transport.</p>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="amber">Pipeline CAPEX</Badge>
            <Badge variant="teal">Ammonia Carrier</Badge>
            <Badge variant="red">25% Reconversion Loss</Badge>
            <Badge variant="green">3-Year Delivery</Badge>
          </div>
          <Link href="/export" className="btn-primary mt-3.5 w-full text-center block">Open Export Simulator →</Link>
        </Card>
      </div>

      {/* Architecture */}
      <Card title="Platform Architecture">
        <div className="flex flex-col gap-3 mt-1.5">
          {[
            { n: "01", l: "REGIONAL INTEL", c: "var(--amber)", d: "Compare 8 regions on solar, wind, water, and grid readiness" },
            { n: "02", l: "PLANT DESIGNER", c: "var(--teal)", d: "Configure 100 MW plant and calculate H₂ output with losses" },
            { n: "03", l: "EXPORT SIM", c: "var(--green)", d: "Route H₂ to EU. Model transport losses and 3-year volumes" },
            { n: "04", l: "DECISION ENGINE", c: "var(--blue)", d: "Composite feasibility scoring across all dimensions" },
          ].map((i) => (
            <div key={i.n} className="rounded-lg p-3.5" style={{ background: "var(--bg-2)" }}>
              <div className="font-head text-[11px] mb-1.5" style={{ color: i.c }}>{i.n} / {i.l}</div>
              <p className="text-[12px] text-text-2 leading-relaxed">{i.d}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-4 rounded-lg p-3 text-[11px] text-text-2 leading-relaxed" style={{ background: "var(--bg-2)", border: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span>Team <b className="text-amber">H₂orizon</b> · Atyrau University</span>
          <span>Green Hydrogen Hackathon 2026 · Yessenov University · GIZ H₂-diplo · TU Berlin</span>
        </div>
      </div>
    </div>
  );
}
