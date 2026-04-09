import { EvidenceEntry } from "../types";

export const EVIDENCE: EvidenceEntry[] = [
  { region: "Kazakhstan", topic: "RE", indicator: "Renewable electricity share", value: "5.9%", unit: "% of mix (13.7% incl. hydro)", year: "2025", source: "Hague Research", org: "University of Siena/ISIA", link: "#", fragment: "renewables (wind and solar) cover 5.9 percent", confidence: "HIGH" },
  { region: "Kazakhstan", topic: "Water", indicator: "Water reduction for H₂", value: "0.6–3%", unit: "% of industry water", year: "Projection", source: "Nazarbayev University", org: "Resource assessment 2022", link: "#", fragment: "producing 2–10 Mt green hydrogen would require reducing water use by 0.6–3%", confidence: "HIGH" },
  { region: "Astana", topic: "H2", indicator: "Pilot H₂ tank fill rate", value: "6 m³", unit: "per 3 hours", year: "2025", source: "Gov.kz / NazUniv", org: "Ministry of Science", link: "#", fragment: "fills a 6-cubic-meter tank in three hours", confidence: "HIGH" },
  { region: "Kazakhstan", topic: "Policy", indicator: "Electrolyzer capacity target", value: "10 GW", unit: "by 2040", year: "2040", source: "Kazakhstan 2040 H₂ Concept", org: "Gov.kz", link: "#", fragment: "National hydrogen roadmap target", confidence: "MEDIUM" },
  { region: "Central Asia", topic: "H2", indicator: "Green ammonia pilot (UZ)", value: "Active", unit: "with ACWA Power", year: "2025", source: "IRENA", org: "IRENA 2025", link: "#", fragment: "Uzbekistan — first green ammonia pilot", confidence: "MEDIUM" },
  { region: "Central Asia", topic: "Water", indicator: "Water stress barrier", value: "HIGH", unit: "risk level", year: "2025", source: "IRENA", org: "IRENA 2025", link: "#", fragment: "Barriers: fossil dependence, water stress, aging grids", confidence: "HIGH" },
];
