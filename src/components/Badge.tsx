type BadgeVariant = "amber" | "teal" | "green" | "red" | "blue";

const variants: Record<BadgeVariant, { bg: string; color: string; border: string }> = {
  amber: { bg: "var(--amber-dim)", color: "var(--amber)", border: "rgba(245,166,35,0.2)" },
  teal:  { bg: "var(--teal-dim)", color: "var(--teal)", border: "rgba(45,212,191,0.2)" },
  green: { bg: "var(--green-dim)", color: "var(--green)", border: "rgba(74,222,128,0.2)" },
  red:   { bg: "var(--red-dim)", color: "var(--red)", border: "rgba(248,113,113,0.2)" },
  blue:  { bg: "var(--blue-dim)", color: "var(--blue)", border: "rgba(96,165,250,0.2)" },
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

export default function Badge({ variant = "amber", children }: BadgeProps) {
  const v = variants[variant];
  return (
    <span
      className="inline-block rounded font-head text-[10px] px-2 py-0.5"
      style={{ background: v.bg, color: v.color, border: `1px solid ${v.border}` }}
    >
      {children}
    </span>
  );
}
