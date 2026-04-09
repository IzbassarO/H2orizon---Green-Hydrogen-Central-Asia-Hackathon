import { PageId } from "./types";

export interface NavItem {
  id: PageId;
  label: string;
  section: string;
  href: string;
  icon: string; // SVG path
}

export const NAV_ITEMS: NavItem[] = [
  { id: "landing", label: "Overview", section: "Overview", href: "/", icon: "M1 1h6v6H1zM9 1h6v6H9zM1 9h6v6H1zM9 9h6v6H9z" },
  { id: "regional", label: "Regional Intel", section: "Challenge 1 — Plant", href: "/regional", icon: "M8 2a6 6 0 100 12A6 6 0 008 2zM2 8h12M8 2c-2 2-2 8 0 12M8 2c2 2 2 8 0 12" },
  { id: "plant", label: "Plant Designer", section: "Challenge 1 — Plant", href: "/plant", icon: "M4 14V8l4-6 4 6v6M6 10h4v4H6zM1 14h14" },
  { id: "export", label: "Export Simulator", section: "Challenge 2 — Export", href: "/export", icon: "M2 8h12M10 5l4 3-4 3M4 6a2 2 0 100 4 2 2 0 000-4z" },
  { id: "transport", label: "Transport Matrix", section: "Challenge 2 — Export", href: "/transport", icon: "M1 5h14v8H1zM4 5V3a1 1 0 011-1h6a1 1 0 011 1v2" },
  { id: "route-builder" as PageId, label: "Route Builder", section: "Challenge 2 — Export", href: "/route-builder", icon: "M2 4l4 4-4 4M8 12h6M8 8h4" },
  { id: "decision", label: "Decision Engine", section: "Data & Strategy", href: "/decision", icon: "M8 2v4l3 3M8 9a6 6 0 100-0.01" },
  { id: "data", label: "Data Explorer", section: "Data & Strategy", href: "/data-explorer", icon: "M1 3h14v10H1zM1 6h14M5 3v10M10 3v10" },
  { id: "evidence", label: "Evidence Base", section: "Data & Strategy", href: "/evidence", icon: "M4 2h8a1 1 0 011 1v11l-4-2-4 2V3a1 1 0 011-1z" },
  { id: "mlscore", label: "AI Site Scorer", section: "AI Analysis", href: "/ai-scorer", icon: "M8 1v3M8 12v3M3.5 3.5l2 2M10.5 10.5l2 2M1 8h3M12 8h3" },
];
