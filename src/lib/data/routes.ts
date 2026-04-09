export interface RouteSegment {
  from: string;
  to: string;
  mode: "pipeline" | "rail" | "sea" | "road" | "port";
  color: string;
  dashArray?: string;
  waypoints: [number, number][]; // [lat, lng]
  dist: string;
  time: string;
  cost: string;
}

export interface RouteOption {
  id: string;
  name: string;
  totalDist: string;
  totalDays: string;
  totalCost: string;
  carrier: string;
  reliability: number; // 0-100
  segments: RouteSegment[];
}

export interface OriginRoutes {
  originId: string;
  originName: string;
  originCoords: [number, number];
  routes: RouteOption[];
}

// Realistic waypoints following actual geography
export const ROUTE_DATA: Record<string, OriginRoutes> = {
  mangystau: {
    originId: "mangystau",
    originName: "Mangystau (Kuryk Port)",
    originCoords: [43.19, 51.15],
    routes: [
      {
        id: "mg-middle-corridor",
        name: "Middle Corridor via Black Sea",
        totalDist: "~2,560 km",
        totalDays: "7–10 days",
        totalCost: "$180–250/t NH₃",
        carrier: "Ammonia (NH₃)",
        reliability: 85,
        segments: [
          {
            from: "Production site", to: "Kuryk Port",
            mode: "pipeline", color: "#9CA3AF", dashArray: "6 4",
            waypoints: [[43.35, 51.85], [43.19, 51.15]],
            dist: "60 km", time: "Hours", cost: "$5/t",
          },
          {
            from: "Kuryk Port", to: "Baku/Alat Port",
            mode: "sea", color: "#60A5FA", dashArray: "12 6",
            waypoints: [
              [43.19, 51.15], [42.80, 50.80], [42.30, 50.40],
              [41.80, 50.20], [41.30, 50.00], [40.80, 49.90],
              [40.50, 49.85], [40.34, 49.87],
            ],
            dist: "475 km", time: "19–23h", cost: "$30–40/t",
          },
          {
            from: "Baku/Alat", to: "Tbilisi",
            mode: "rail", color: "#FCD34D",
            waypoints: [
              [40.34, 49.87], [40.50, 49.50], [40.70, 49.00],
              [40.90, 48.50], [41.10, 47.80], [41.30, 47.00],
              [41.50, 46.30], [41.60, 45.80], [41.69, 44.83],
            ],
            dist: "~550 km", time: "1.5–2 days", cost: "$25–35/t",
          },
          {
            from: "Tbilisi", to: "Kars",
            mode: "rail", color: "#FCD34D",
            waypoints: [
              [41.69, 44.83], [41.55, 44.30], [41.40, 43.80],
              [41.20, 43.50], [40.80, 43.30], [40.60, 43.10],
            ],
            dist: "~276 km", time: "0.5–1 day", cost: "$15–20/t",
          },
          {
            from: "Kars", to: "Samsun (Black Sea)",
            mode: "rail", color: "#F9A8D4",
            waypoints: [
              [40.60, 43.10], [40.50, 42.50], [40.40, 41.50],
              [40.50, 40.80], [40.70, 40.20], [40.90, 39.50],
              [41.10, 38.50], [41.20, 37.50], [41.30, 36.50],
              [41.29, 36.33],
            ],
            dist: "~680 km", time: "1–2 days", cost: "$20–30/t",
          },
          {
            from: "Samsun", to: "Constanța (Romania)",
            mode: "sea", color: "#EC4899", dashArray: "12 6",
            waypoints: [
              [41.29, 36.33], [41.80, 35.50], [42.20, 34.50],
              [42.80, 33.50], [43.20, 32.50], [43.50, 31.50],
              [43.80, 30.50], [44.00, 29.80], [44.18, 28.65],
            ],
            dist: "~600 km", time: "1–2 days", cost: "$25–35/t",
          },
        ],
      },
      {
        id: "mg-south-corridor",
        name: "Southern Route via Turkey Med",
        totalDist: "~3,200 km",
        totalDays: "10–14 days",
        totalCost: "$220–320/t NH₃",
        carrier: "Ammonia (NH₃)",
        reliability: 70,
        segments: [
          {
            from: "Kuryk Port", to: "Baku/Alat",
            mode: "sea", color: "#60A5FA", dashArray: "12 6",
            waypoints: [
              [43.19, 51.15], [42.50, 50.50], [41.50, 50.10],
              [40.80, 49.90], [40.34, 49.87],
            ],
            dist: "475 km", time: "19–23h", cost: "$30–40/t",
          },
          {
            from: "Baku", to: "Kars (BTK)",
            mode: "rail", color: "#FCD34D",
            waypoints: [
              [40.34, 49.87], [40.70, 48.50], [41.20, 47.00],
              [41.60, 45.50], [41.69, 44.83], [41.20, 43.50],
              [40.60, 43.10],
            ],
            dist: "~826 km", time: "2–3 days", cost: "$40–50/t",
          },
          {
            from: "Kars", to: "Ceyhan",
            mode: "rail", color: "#F9A8D4",
            waypoints: [
              [40.60, 43.10], [40.20, 42.00], [39.50, 40.50],
              [39.00, 39.00], [38.50, 37.50], [37.80, 36.50],
              [37.00, 35.80],
            ],
            dist: "~900 km", time: "2–3 days", cost: "$30–40/t",
          },
          {
            from: "Ceyhan", to: "Trieste (Italy)",
            mode: "sea", color: "#EC4899", dashArray: "12 6",
            waypoints: [
              [37.00, 35.80], [36.50, 34.00], [36.00, 32.00],
              [35.50, 29.00], [36.00, 25.00], [37.50, 22.00],
              [39.00, 19.00], [41.00, 16.00], [43.00, 14.50],
              [45.60, 13.80],
            ],
            dist: "~2,500 km", time: "5–7 days", cost: "$60–80/t",
          },
        ],
      },
      {
        id: "mg-pipeline-future",
        name: "Trans-Caspian Pipeline (2035+)",
        totalDist: "~4,000 km",
        totalDays: "Continuous flow",
        totalCost: "$80–120/t H₂ (est.)",
        carrier: "H₂ Pipeline",
        reliability: 40,
        segments: [
          {
            from: "Production site", to: "Kuryk terminal",
            mode: "pipeline", color: "#F5A623",
            waypoints: [[43.35, 51.85], [43.19, 51.15]],
            dist: "60 km", time: "Continuous", cost: "$2–5M/km build",
          },
          {
            from: "Kuryk", to: "Baku (subsea)",
            mode: "pipeline", color: "#F5A623", dashArray: "8 4",
            waypoints: [
              [43.19, 51.15], [42.50, 50.50], [41.50, 50.10],
              [40.80, 49.90], [40.34, 49.87],
            ],
            dist: "~300 km subsea", time: "Continuous", cost: "~$1.5B",
          },
          {
            from: "Baku", to: "Erzurum (TANAP)",
            mode: "pipeline", color: "#F5A623",
            waypoints: [
              [40.34, 49.87], [40.70, 48.00], [41.00, 46.00],
              [41.50, 44.50], [41.00, 43.00], [40.50, 42.00],
              [39.90, 41.28],
            ],
            dist: "~1,100 km", time: "Continuous", cost: "Existing TANAP",
          },
          {
            from: "Erzurum", to: "Central Europe (TAP extension)",
            mode: "pipeline", color: "#F5A623",
            waypoints: [
              [39.90, 41.28], [39.00, 38.00], [38.50, 35.00],
              [39.00, 30.00], [40.50, 25.00], [41.00, 20.50],
              [41.30, 19.82],
            ],
            dist: "~2,500 km", time: "Continuous", cost: "TAP repurposing",
          },
        ],
      },
    ],
  },
  atyrau: {
    originId: "atyrau",
    originName: "Atyrau Region",
    originCoords: [47.10, 51.90],
    routes: [
      {
        id: "at-via-kuryk",
        name: "Via Kuryk → Middle Corridor",
        totalDist: "~2,900 km",
        totalDays: "8–12 days",
        totalCost: "$210–290/t NH₃",
        carrier: "Ammonia (NH₃)",
        reliability: 80,
        segments: [
          {
            from: "Atyrau", to: "Kuryk Port",
            mode: "rail", color: "#FCD34D",
            waypoints: [
              [47.10, 51.90], [46.50, 51.50], [45.80, 51.20],
              [45.00, 51.00], [44.20, 51.00], [43.50, 51.10],
              [43.19, 51.15],
            ],
            dist: "~440 km", time: "1 day", cost: "$20–25/t",
          },
          {
            from: "Kuryk", to: "Baku/Alat",
            mode: "sea", color: "#60A5FA", dashArray: "12 6",
            waypoints: [
              [43.19, 51.15], [42.50, 50.50], [41.80, 50.10],
              [41.00, 49.90], [40.34, 49.87],
            ],
            dist: "475 km", time: "19–23h", cost: "$30–40/t",
          },
          {
            from: "Baku", to: "Kars (BTK)",
            mode: "rail", color: "#FCD34D",
            waypoints: [
              [40.34, 49.87], [40.80, 48.50], [41.30, 47.00],
              [41.69, 44.83], [41.20, 43.50], [40.60, 43.10],
            ],
            dist: "~826 km", time: "2–3 days", cost: "$40–50/t",
          },
          {
            from: "Kars", to: "Samsun",
            mode: "rail", color: "#F9A8D4",
            waypoints: [
              [40.60, 43.10], [40.50, 41.50], [40.80, 39.50],
              [41.20, 37.50], [41.29, 36.33],
            ],
            dist: "~680 km", time: "1–2 days", cost: "$20–30/t",
          },
          {
            from: "Samsun", to: "Constanța",
            mode: "sea", color: "#EC4899", dashArray: "12 6",
            waypoints: [
              [41.29, 36.33], [42.20, 34.50], [43.20, 32.00],
              [43.80, 30.50], [44.18, 28.65],
            ],
            dist: "~600 km", time: "1–2 days", cost: "$25–35/t",
          },
        ],
      },
    ],
  },
  default: {
    originId: "default",
    originName: "Central Kazakhstan",
    originCoords: [48.0, 67.0],
    routes: [
      {
        id: "def-kuryk",
        name: "Via KZ Rail → Kuryk → Middle Corridor",
        totalDist: "~3,500–4,500 km",
        totalDays: "10–16 days",
        totalCost: "$260–380/t NH₃",
        carrier: "Ammonia (NH₃)",
        reliability: 65,
        segments: [
          {
            from: "Production site", to: "Kuryk Port",
            mode: "rail", color: "#FCD34D",
            waypoints: [
              [48.00, 67.00], [47.50, 64.00], [47.00, 61.00],
              [46.50, 58.00], [46.00, 55.00], [45.00, 53.00],
              [44.00, 51.50], [43.19, 51.15],
            ],
            dist: "1,000–2,000 km", time: "3–5 days", cost: "$50–80/t",
          },
          {
            from: "Kuryk", to: "Baku",
            mode: "sea", color: "#60A5FA", dashArray: "12 6",
            waypoints: [
              [43.19, 51.15], [42.50, 50.50], [41.50, 50.10],
              [40.34, 49.87],
            ],
            dist: "475 km", time: "19–23h", cost: "$30–40/t",
          },
          {
            from: "Baku", to: "Kars",
            mode: "rail", color: "#FCD34D",
            waypoints: [
              [40.34, 49.87], [41.00, 47.50], [41.69, 44.83],
              [40.60, 43.10],
            ],
            dist: "~826 km", time: "2–3 days", cost: "$40–50/t",
          },
          {
            from: "Kars", to: "Constanța",
            mode: "rail", color: "#F9A8D4",
            waypoints: [
              [40.60, 43.10], [40.80, 40.00], [41.20, 37.50],
              [41.29, 36.33],
            ],
            dist: "~680 km", time: "1–2 days", cost: "$20–30/t",
          },
          {
            from: "Samsun", to: "Constanța",
            mode: "sea", color: "#EC4899", dashArray: "12 6",
            waypoints: [
              [41.29, 36.33], [42.50, 33.50], [43.80, 30.50],
              [44.18, 28.65],
            ],
            dist: "~600 km", time: "1–2 days", cost: "$25–35/t",
          },
        ],
      },
    ],
  },
};
