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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5">Country</label>
            <select className="form-control" value={country} onChange={e => setCountry(e.target.value)}>
              <option value="">All Countries</option>
              <option value="Kazakhstan">Kazakhstan</option>
              <option value="Uzbekistan">Uzbekistan</option>
              <option value="Central Asia">Central Asia</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-[11px] text-text-2 uppercase tracking-wider mb-1.5">Search</label>
            <input className="form-control" placeholder="Search indicators, values, sources..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>{["Country", "Region", "Indicator", "Value", "Unit", "Year", "Source", "Notes"].map(h => (
                <th key={h} className="text-left py-2.5 px-3 font-head text-[10px] text-text-2 uppercase tracking-wider"
                  style={{ background: "var(--bg-2)", borderBottom: "1px solid var(--border)" }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => (
                <tr key={i} className="hover:bg-[var(--bg-2)]">
                  <td className="py-2.5 px-3" style={{ borderBottom: "1px solid var(--border)" }}>{d.country}</td>
                  <td className="py-2.5 px-3 text-text-2" style={{ borderBottom: "1px solid var(--border)" }}>{d.region}</td>
                  <td className="py-2.5 px-3" style={{ borderBottom: "1px solid var(--border)" }}>{d.indicator}</td>
                  <td className="py-2.5 px-3 font-head text-amber" style={{ borderBottom: "1px solid var(--border)" }}>{d.value}</td>
                  <td className="py-2.5 px-3 text-text-2 text-[11px]" style={{ borderBottom: "1px solid var(--border)" }}>{d.unit}</td>
                  <td className="py-2.5 px-3" style={{ borderBottom: "1px solid var(--border)" }}>{d.year}</td>
                  <td className="py-2.5 px-3 text-[11px]" style={{ borderBottom: "1px solid var(--border)" }}>{d.source}</td>
                  <td className="py-2.5 px-3 text-[11px] text-text-2" style={{ borderBottom: "1px solid var(--border)" }}>{d.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
