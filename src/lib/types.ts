export interface Region {
  name: string;
  country: string;
  solar: number;
  wind: number;
  hydro: number;
  water: number;
  grid: number;
  h2Pilot: boolean;
  notes: string;
  missingData: boolean;
}

export interface TransportMethod {
  name: string;
  efficiency: number;
  loss: number;
  capex: string;
  distanceMax: number;
  distanceSuitable: number;
  energyLoss: number;
  infraReq: string;
  costRange: string;
  leadTime: string;
  storageReq: string;
  color: string;
}

export interface DatasetEntry {
  country: string;
  region: string;
  indicator: string;
  value: string;
  unit: string;
  year: string;
  source: string;
  link: string;
  notes: string;
}

export interface EvidenceEntry {
  region: string;
  topic: string;
  indicator: string;
  value: string;
  unit: string;
  year: string;
  source: string;
  org: string;
  link: string;
  fragment: string;
  confidence: "HIGH" | "MEDIUM";
}

export type PageId = "landing" | "regional" | "plant" | "export" | "transport" | "route-builder" | "decision" | "data" | "evidence" | "mlscore";
