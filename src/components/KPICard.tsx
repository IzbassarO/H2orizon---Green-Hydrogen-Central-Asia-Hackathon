interface KPICardProps {
  label: string;
  value: string;
  unit?: string;
  tag?: string;
}

export default function KPICard({ label, value, unit, tag }: KPICardProps) {
  return (
    <div className="rounded-lg p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
      <div className="text-[11px] text-text-2 uppercase tracking-wider mb-2">{label}</div>
      <div className="font-head text-[22px] text-text-1 leading-none">{value}</div>
      {unit && <div className="text-[12px] text-text-2 mt-1">{unit}</div>}
      {tag && (
        <div className="inline-block mt-1.5 rounded text-[10px] px-1.5 py-0.5"
          style={{ background: "var(--amber-dim)", color: "var(--amber)" }}>
          {tag}
        </div>
      )}
    </div>
  );
}
