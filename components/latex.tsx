"use client";

import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface LatexProps {
  children: string;
  displayMode?: boolean;
  className?: string;
}

export function Latex({ children, displayMode = false, className = "" }: LatexProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(children, containerRef.current, {
          displayMode,
          throwOnError: false,
          trust: true,
          strict: false,
        });
      } catch (error) {
        console.error("KaTeX rendering error:", error);
        if (containerRef.current) {
          containerRef.current.textContent = children;
        }
      }
    }
  }, [children, displayMode]);

  return (
    <span 
      ref={containerRef} 
      className={`${displayMode ? "block my-4" : "inline"} ${className}`}
    />
  );
}

export function BlockLatex({ children, className = "" }: { children: string; className?: string }) {
  return <Latex displayMode={true} className={className}>{children}</Latex>;
}

export function InlineLatex({ children, className = "" }: { children: string; className?: string }) {
  return <Latex displayMode={false} className={className}>{children}</Latex>;
}
