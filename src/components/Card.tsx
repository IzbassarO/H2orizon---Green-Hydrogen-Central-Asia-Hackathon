interface CardProps {
  title?: string;
  accent?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Card({ title, accent, className = "", children }: CardProps) {
  return (
    <div
      className={`rounded-lg p-5 ${className}`}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        ...(accent ? { borderLeft: "2px solid var(--amber)", paddingLeft: "16px" } : {}),
      }}
    >
      {title && (
        <div className="font-head text-[11px] text-text-2 uppercase tracking-wider mb-3.5">
          {title}
        </div>
      )}
      {children}
    </div>
  );
}
