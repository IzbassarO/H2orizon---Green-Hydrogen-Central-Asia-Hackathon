"use client";
import { useState } from "react";
import Topbar from "@/components/Topbar";
import Card from "@/components/Card";
import { DATASET } from "@/lib/data/dataset";

export default function DataExplorerPage() {
  const [country, setCountry] = useState("");
  const [search, setSearch] = useState("");

  const filtered = DATASET.filter(d => {
    if (country && d.country !== country) return false;
    if (search && !JSON.stringify(d).toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-4 md:p-7">
      <Topbar title="Data Explorer" subtitle="Browse verified data from IRENA, IEA, Nazarbayev University & Gov.kz" badge={`${filtered.length} Records`} badgeVariant="blue" />

      <Card className="mb-4">
        <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          <div className="min-w-0">
            <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5 break-words">Country</label>
            <select className="form-control w-full min-w-0" value={country} onChange={e => setCountry(e.target.value)}>
              <option value="">All Countries</option>
              <option value="Kazakhstan">Kazakhstan</option>
              <option value="Uzbekistan">Uzbekistan</option>
              <option value="Central Asia">Central Asia</option>
            </select>
          </div>

          <div className="min-w-0 lg:col-span-2">
            <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5 break-words">Search</label>
            <input
              className="form-control w-full min-w-0"
              placeholder="Search indicators, values, sources..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-[12px]" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>{["Country", "Region", "Indicator", "Value", "Unit", "Year", "Source", "Notes"].map(h => (
                <th key={h} className="text-left py-2.5 px-3 font-head text-[10px] text-text-2 uppercase tracking-wider whitespace-nowrap"
                  style={{ background: "var(--bg-2)", borderBottom: "1px solid var(--border)" }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => (
                <tr key={i} className="hover:bg-[var(--bg-2)]">
                  <td className="py-2.5 px-3 whitespace-nowrap" style={{ borderBottom: "1px solid var(--border)" }}>{d.country}</td>
                  <td className="py-2.5 px-3 text-text-2 whitespace-nowrap" style={{ borderBottom: "1px solid var(--border)" }}>{d.region}</td>
                  <td className="py-2.5 px-3 min-w-[180px]" style={{ borderBottom: "1px solid var(--border)" }}>{d.indicator}</td>
                  <td className="py-2.5 px-3 font-head text-amber whitespace-nowrap" style={{ borderBottom: "1px solid var(--border)" }}>{d.value}</td>
                  <td className="py-2.5 px-3 text-text-2 text-[11px] whitespace-nowrap" style={{ borderBottom: "1px solid var(--border)" }}>{d.unit}</td>
                  <td className="py-2.5 px-3 whitespace-nowrap" style={{ borderBottom: "1px solid var(--border)" }}>{d.year}</td>
                  <td className="py-2.5 px-3 text-[11px] min-w-[170px]" style={{ borderBottom: "1px solid var(--border)" }}>{d.source}</td>
                  <td className="py-2.5 px-3 text-[11px] text-text-2 min-w-[220px]" style={{ borderBottom: "1px solid var(--border)" }}>{d.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
