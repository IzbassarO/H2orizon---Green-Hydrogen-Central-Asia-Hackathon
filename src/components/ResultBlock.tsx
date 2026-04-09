interface ResultRow {
  label: string;
  value: string;
  variant?: "default" | "highlight" | "green" | "red";
}

interface ResultBlockProps {
  rows: ResultRow[];
}

const variantColors: Record<string, string> = {
  default: "var(--text-1)",
  highlight: "var(--amber)",
  green: "var(--green)",
  red: "var(--red)",
};

export default function ResultBlock({ rows }: ResultBlockProps) {
  return (
    <div className="rounded-lg p-3.5" style={{ background: "var(--bg-2)", border: "1px solid var(--border-hi)" }}>
      {rows.map((row, i) => (
        <div
          key={i}
          className="flex justify-between items-baseline py-1.5"
          style={{ borderBottom: i < rows.length - 1 ? "1px solid var(--border)" : "none" }}
        >
          <span className="text-[12px] text-text-2">{row.label}</span>
          <span className="font-head text-[13px]" style={{ color: variantColors[row.variant || "default"] }}>
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}
