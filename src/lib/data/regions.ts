import { Region } from "../types";

export const REGIONS: Record<string, Region> = {
  atyrau:     { name: "Atyrau (West KZ)", country: "Kazakhstan", solar: 55, wind: 80, hydro: 10, water: 35, grid: 60, h2Pilot: false, notes: "Caspian access · oil/gas industry · strong wind", missingData: true },
  mangystau:  { name: "Mangystau", country: "Kazakhstan", solar: 65, wind: 75, hydro: 5, water: 30, grid: 50, h2Pilot: false, notes: "Oil refinery potential · Kuryk port · HYRASIA ONE", missingData: true },
  astana:     { name: "Astana / Akmola", country: "Kazakhstan", solar: 50, wind: 55, hydro: 15, water: 55, grid: 80, h2Pilot: true, notes: "6 m³ H₂ pilot · Nazarbayev Univ · National grid", missingData: true },
  south_kz:   { name: "South Kazakhstan", country: "Kazakhstan", solar: 80, wind: 50, hydro: 30, water: 40, grid: 55, h2Pilot: false, notes: "Highest solar · 2,200–3,000 hrs sunshine", missingData: true },
  almaty:     { name: "Almaty Region", country: "Kazakhstan", solar: 45, wind: 40, hydro: 60, water: 65, grid: 70, h2Pilot: false, notes: "Hydro potential · seasonal profile unavailable", missingData: true },
  uzbekistan: { name: "Uzbekistan", country: "Uzbekistan", solar: 75, wind: 45, hydro: 20, water: 25, grid: 45, h2Pilot: true, notes: "First green ammonia pilot (ACWA Power)", missingData: true },
  kyrgyzstan: { name: "Kyrgyzstan", country: "Kyrgyzstan", solar: 40, wind: 35, hydro: 85, water: 70, grid: 35, h2Pilot: false, notes: "Hydro strengths · aging grid", missingData: true },
  tajikistan: { name: "Tajikistan", country: "Tajikistan", solar: 50, wind: 30, hydro: 80, water: 60, grid: 30, h2Pilot: false, notes: "Hydro potential · water constraints", missingData: true },
};
