// src/useMermaid.ts
import { useEffect, useRef } from "react";
import mermaid from "mermaid";

const useMermaid = (diagramCode: string) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function mermaidify() {
      if (chartRef.current && diagramCode) {
        chartRef.current.innerHTML = "";
        const output = await mermaid.mermaidAPI.render(
          "graphDiv",
          diagramCode,
          chartRef.current
        );
        chartRef.current.innerHTML = output.svg;
      }
    }
    void mermaidify();
  }, [diagramCode]);

  return chartRef;
};

export default useMermaid;
