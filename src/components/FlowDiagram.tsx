interface FlowNode {
  label: string;
  value: string;
  type: "source" | "process" | "output" | "loss";
}

interface FlowDiagramProps {
  nodes: FlowNode[];
}

const typeStyles: Record<string, { border: string; bg: string }> = {
  source:  { border: "rgba(245,166,35,0.4)", bg: "var(--amber-dim)" },
  process: { border: "rgba(45,212,191,0.3)", bg: "var(--teal-dim)" },
  output:  { border: "rgba(74,222,128,0.3)", bg: "var(--green-dim)" },
  loss:    { border: "rgba(248,113,113,0.3)", bg: "var(--red-dim)" },
};

export default function FlowDiagram({ nodes }: FlowDiagramProps) {
  return (
    <div className="flex items-center gap-0 overflow-x-auto py-4">
      {nodes.map((node, i) => (
        <div key={i} className="flex items-center gap-0">
          <div
            className="rounded-lg px-3.5 py-2.5 text-center min-w-[90px] shrink-0"
            style={{ background: typeStyles[node.type].bg, border: `1px solid ${typeStyles[node.type].border}` }}
          >
            <div className="text-[10px] text-text-2 mb-0.5">{node.label}</div>
            <div className="font-head text-[12px] text-text-1">{node.value}</div>
          </div>
          {i < nodes.length - 1 && (
            <span className="text-text-3 text-[18px] px-1.5 shrink-0">→</span>
          )}
        </div>
      ))}
    </div>
  );
}
