"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const sections: Record<string, typeof NAV_ITEMS> = {};
  NAV_ITEMS.forEach((item) => {
    if (!sections[item.section]) sections[item.section] = [];
    sections[item.section].push(item);
  });

  return (
    <>
      <button onClick={() => setOpen(!open)}
        className="md:hidden fixed top-3 left-3 z-[900] w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer"
        style={{ background: "var(--bg-1)", border: "1px solid var(--border)" }} aria-label="Menu">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
          {open ? <path d="M4 4l10 10M14 4L4 14" /> : <path d="M2 4h14M2 9h14M2 14h14" />}
        </svg>
      </button>
      {open && <div className="md:hidden fixed inset-0 bg-black/50 z-[800]" onClick={() => setOpen(false)} />}
      <nav className={`fixed top-0 left-0 h-screen flex flex-col overflow-y-auto z-[850] transition-transform duration-200 md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        style={{ width: "220px", background: "var(--bg-1)", borderRight: "1px solid var(--border)" }}>

        {/* Team Logo */}
        <div className="px-4 pt-5 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="font-head text-[18px] font-bold text-text-1 leading-tight">
            H<span className="text-amber">₂</span>orizon
          </div>
          <div className="text-[10px] text-text-2 mt-1">Green Hydrogen Intelligence Platform</div>
          <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
            <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: "var(--teal-dim)", color: "var(--teal)", border: "1px solid rgba(45,212,191,0.2)" }}>Yessenov University</span>
            <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: "var(--amber-dim)", color: "var(--amber)", border: "1px solid rgba(245,166,35,0.15)" }}>Atyrau University</span>
          </div>
        </div>

        <div className="flex-1">
          {Object.entries(sections).map(([section, items]) => (
            <div key={section}>
              <div className="font-head text-[10px] text-text-3 uppercase tracking-wider px-4 pt-4 pb-1.5">{section}</div>
              {items.map((item) => {
                const isActive = pathname === item.href || (item.href === "/" && pathname === "/");
                return (
                  <Link key={item.id} href={item.href} onClick={() => setOpen(false)}
                    className="flex items-center gap-2.5 py-2 px-4 text-[13px] transition-all duration-150 no-underline"
                    style={{ color: isActive ? "var(--amber)" : "var(--text-2)", background: isActive ? "var(--amber-dim)" : "transparent", borderLeft: `2px solid ${isActive ? "var(--amber)" : "transparent"}`, fontWeight: isActive ? 500 : 400 }}>
                    <svg className="w-4 h-4 shrink-0 opacity-80" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={item.icon} /></svg>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        <div className="p-4" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="text-[9px] text-text-3 leading-relaxed text-center">
            Green Hydrogen Hackathon 2026<br/>
            <span className="text-text-2">GIZ H₂-diplo · TU Berlin</span>
          </div>
        </div>
      </nav>
    </>
  );
}
