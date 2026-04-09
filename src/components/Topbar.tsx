import Badge from "./Badge";

interface TopbarProps {
  title: string;
  subtitle: string;
  badge?: string;
  badgeVariant?: "amber" | "teal" | "green" | "red" | "blue";
}

export default function Topbar({ title, subtitle, badge, badgeVariant = "amber" }: TopbarProps) {
  return (
    <div className="flex items-center justify-between mb-7">
      <div>
        <h1 className="font-head text-[20px] font-bold text-text-1">{title}</h1>
        <p className="text-[12px] text-text-2 mt-0.5">{subtitle}</p>
      </div>
      {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
    </div>
  );
}
