"use client";

import Topbar from "@/components/Topbar";
import Card from "@/components/Card";

const FORMULAS = [
  {
    title: "Water Electrolysis",
    accent: "var(--teal)",
    desc: "Core reaction for green hydrogen production from water using renewable electricity.",
    equations: [
      "Overall: 2H2O(l) → 2H2(g) + O2(g)",
      "Cathode: 2H2O + 2e− → H2 + 2OH−",
      "Anode: 4OH− → O2 + 2H2O + 4e−",
    ],
    notes: [
      "Hydrogen is generated at the cathode.",
      "Oxygen is released at the anode.",
      "Electricity demand is the main driver of operating cost.",
    ],
  },
  {
    title: "PEM Electrolysis",
    accent: "var(--blue)",
    desc: "Proton Exchange Membrane systems operate with high-purity water and respond fast to variable wind/solar power.",
    equations: [
      "Anode: H2O → 1/2 O2 + 2H+ + 2e−",
      "Cathode: 2H+ + 2e− → H2",
      "Overall: H2O → H2 + 1/2 O2",
    ],
    notes: [
      "Fast dynamic response for renewables.",
      "High hydrogen purity.",
      "Typically higher CAPEX than alkaline electrolysis.",
    ],
  },
  {
    title: "Hydrogen Compression",
    accent: "var(--amber)",
    desc: "Hydrogen is compressed after production for storage, transport, or downstream synthesis.",
    equations: [
      "H2(g, low P) → H2(g, high P)",
      "No chemical conversion, only pressure increase",
    ],
    notes: [
      "Compression consumes extra energy.",
      "Important for pipeline injection and tank storage.",
      "Used before export or synthesis steps.",
    ],
  },
  {
    title: "Ammonia Synthesis",
    accent: "#4ade80",
    desc: "Hydrogen can be converted to ammonia for easier long-distance transport.",
    equations: [
      "N2 + 3H2 ⇌ 2NH3",
      "Haber–Bosch process",
      "High pressure + catalyst + elevated temperature",
    ],
    notes: [
      "Ammonia is easier to store and ship than pure hydrogen.",
      "Can be exported directly or cracked back to hydrogen.",
      "Useful for maritime logistics.",
    ],
  },
  {
    title: "Ammonia Cracking",
    accent: "#f87171",
    desc: "At destination, ammonia may be converted back to hydrogen.",
    equations: [
      "2NH3 → N2 + 3H2",
      "Endothermic decomposition reaction",
    ],
    notes: [
      "Adds reconversion losses.",
      "Requires heat and catalytic system.",
      "Important in export cost chain.",
    ],
  },
  {
    title: "LOHC Pathway",
    accent: "#a78bfa",
    desc: "Liquid Organic Hydrogen Carriers store hydrogen chemically in a liquid medium.",
    equations: [
      "Carrier + H2 ⇌ Hydrogenated carrier",
      "Hydrogenation / Dehydrogenation cycle",
    ],
    notes: [
      "Convenient liquid handling infrastructure.",
      "Hydrogen release needs heat.",
      "Often lower delivery efficiency than direct hydrogen routes.",
    ],
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Water Input",
    text: "Purified water is supplied to the electrolyzer system. Water quality matters, especially for PEM units.",
  },
  {
    step: "02",
    title: "Renewable Electricity",
    text: "Solar or wind electricity powers electrolysis. This is what makes the hydrogen ‘green’.",
  },
  {
    step: "03",
    title: "Electrolysis",
    text: "Water molecules split into hydrogen and oxygen. Hydrogen is collected, dried, and prepared for storage or conversion.",
  },
  {
    step: "04",
    title: "Conditioning",
    text: "Hydrogen may be compressed, liquefied, or converted into ammonia / LOHC depending on the transport pathway.",
  },
  {
    step: "05",
    title: "Export / End Use",
    text: "Hydrogen or hydrogen-derived carriers are delivered to industrial users, power systems, or export terminals.",
  },
];

const PARAMETERS = [
  { k: "Electrolyzer feed", v: "Deionized water + electricity" },
  { k: "Main product", v: "Hydrogen (H2)" },
  { k: "By-product", v: "Oxygen (O2)" },
  { k: "Conversion route", v: "Direct H2 / NH3 / LOHC / LH2" },
  { k: "Main loss sources", v: "Electrolysis inefficiency, compression, liquefaction, cracking" },
  { k: "Export relevance", v: "Strong for Central Asia → Europe corridors" },
];

export default function ChemistryPage() {
  return (
    <div className="p-4 md:p-7">
      <Topbar
        title="Chemistry"
        subtitle="Core reactions, formulas, and process chemistry for green hydrogen production and export"
        badge="H₂ Process Layer"
        badgeVariant="teal"
      />

      <div
        className="rounded-lg p-5 md:p-6 mb-6"
        style={{ background: "var(--bg-1)", border: "1px solid var(--border)" }}
      >
        <div className="max-w-[820px]">
          <div className="font-head text-[11px] uppercase tracking-wider text-text-2 mb-2">
            Green Hydrogen Chemistry Overview
          </div>
          <h2 className="font-head text-[24px] md:text-[30px] leading-tight mb-3">
            From <span className="text-teal">H₂O</span> to <span className="text-amber">H₂</span>,
            and from <span className="text-green">H₂</span> to exportable carriers
          </h2>
          <p className="text-[13px] md:text-[14px] text-text-2 leading-relaxed">
            This module explains the main chemical reactions behind hydrogen production,
            conditioning, storage, and export. It connects the plant design layer with the
            transport and strategy modules of the platform.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[7fr_5fr] gap-4 mb-6">
        <Card title="Process Chain">
          <div className="space-y-0">
            {PROCESS_STEPS.map((item, i) => (
              <div key={item.step} className="flex gap-3">
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-head text-[11px]"
                    style={{
                      background: "var(--bg-2)",
                      border: "1px solid var(--border)",
                      color: "var(--amber)",
                    }}
                  >
                    {item.step}
                  </div>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="w-px flex-1 min-h-[28px]" style={{ background: "var(--border)" }} />
                  )}
                </div>

                <div className="pb-4">
                  <div className="font-head text-[13px] mb-1">{item.title}</div>
                  <div className="text-[12px] text-text-2 leading-relaxed">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Quick Parameters">
          <div className="space-y-0">
            {PARAMETERS.map((row) => (
              <div
                key={row.k}
                className="flex items-start justify-between gap-3 py-2.5 text-[12px]"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span className="text-text-2">{row.k}</span>
                <span className="font-head text-right max-w-[58%]">{row.v}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        {FORMULAS.map((block) => (
          <div
            key={block.title}
            className="rounded-lg p-4"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <div
              className="font-head text-[12px] mb-2"
              style={{ color: block.accent }}
            >
              {block.title}
            </div>

            <div className="text-[12px] text-text-2 leading-relaxed mb-3">
              {block.desc}
            </div>

            <div className="space-y-2 mb-3">
              {block.equations.map((eq) => (
                <div
                  key={eq}
                  className="rounded-md px-3 py-2 font-head text-[12px] leading-relaxed overflow-x-auto"
                  style={{
                    background: "var(--bg-2)",
                    border: "1px solid var(--border)",
                    color: "var(--text-1)",
                  }}
                >
                  <span className="whitespace-nowrap">{eq}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              {block.notes.map((n) => (
                <div key={n} className="text-[11px] text-text-3 leading-relaxed">
                  • {n}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Suggested Visual Layout">
          <div className="space-y-3 text-[12px] text-text-2 leading-relaxed">
            <div>
              <span className="font-head text-text-1">Block 1:</span> Water → Electrolyzer → H₂ + O₂
            </div>
            <div>
              <span className="font-head text-text-1">Block 2:</span> H₂ → Compression / Storage
            </div>
            <div>
              <span className="font-head text-text-1">Block 3:</span> H₂ → NH₃ synthesis / LOHC / LH₂
            </div>
            <div>
              <span className="font-head text-text-1">Block 4:</span> Export logistics → Destination recovery
            </div>
            <div>
              Use arrows, small icons, and one highlighted formula per block. Keep the page dark,
              technical, and simple like the rest of the platform.
            </div>
          </div>
        </Card>

        <Card title="Where Chemistry Matters in the Project">
          <div className="space-y-2 text-[12px] text-text-2 leading-relaxed">
            <div>• Plant page: electrolysis chemistry and hydrogen yield</div>
            <div>• Export page: conversion losses for NH₃, LH₂, and LOHC routes</div>
            <div>• Transport matrix: storage/handling compatibility by carrier</div>
            <div>• Decision engine: chemistry-linked efficiency penalties</div>
            <div>• Evidence/data pages: process assumptions, reaction conditions, and reference values</div>
          </div>
        </Card>
      </div>
    </div>
  );
}