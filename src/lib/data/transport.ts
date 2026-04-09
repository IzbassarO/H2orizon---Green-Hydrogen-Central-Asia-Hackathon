import { TransportMethod } from "../types";

export const TRANSPORT_METHODS: Record<string, TransportMethod> = {
  pipeline: { name: "H₂ Pipeline", efficiency: 95, loss: 5, capex: "Very High", distanceMax: 5000, distanceSuitable: 90, energyLoss: 5, infraReq: "New dedicated H₂ pipeline", costRange: "$2–5M/km", leadTime: "10–15 yrs", storageReq: "Line-pack + terminals", color: "#f5a623" },
  ammonia:  { name: "Ammonia Carrier", efficiency: 72, loss: 28, capex: "Medium", distanceMax: 20000, distanceSuitable: 85, energyLoss: 28, infraReq: "Port + synthesis + cracking", costRange: "$300–500/t H₂", leadTime: "3–5 yrs", storageReq: "-33°C liquefaction tanks", color: "#2dd4bf" },
  lh2:      { name: "Liquid H₂ (LH₂)", efficiency: 65, loss: 35, capex: "High", distanceMax: 15000, distanceSuitable: 75, energyLoss: 35, infraReq: "Cryogenic ships + terminals", costRange: "$400–700/t H₂", leadTime: "5–8 yrs", storageReq: "Cryogenic -253°C", color: "#60a5fa" },
  lohc:     { name: "LOHC", efficiency: 60, loss: 40, capex: "Medium-High", distanceMax: 12000, distanceSuitable: 70, energyLoss: 40, infraReq: "Hydrogenation plants", costRange: "$350–600/t H₂", leadTime: "4–7 yrs", storageReq: "Ambient temperature", color: "#a78bfa" },
  truck:    { name: "Compressed Truck", efficiency: 88, loss: 12, capex: "Low", distanceMax: 500, distanceSuitable: 20, energyLoss: 12, infraReq: "Compressors + 700 bar", costRange: "$500–1200/t H₂", leadTime: "< 1 yr", storageReq: "High-pressure vessels", color: "#f87171" },
};
