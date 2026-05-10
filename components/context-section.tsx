"use client";

import { ChevronDown, type LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface ContextSectionProps {
  type: "reactor" | "antenna";
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  expandedByDefault?: boolean;
}

export function ContextSection({ 
  type, 
  title, 
  icon: Icon, 
  children, 
  expandedByDefault = false 
}: ContextSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (expandedByDefault) {
      setIsExpanded(true);
    }
  }, [expandedByDefault]);

  const borderColor = type === "reactor" ? "border-indigo-500/50" : "border-blue-500/50";
  const iconBg = type === "reactor" ? "bg-indigo-500/20" : "bg-blue-500/20";
  const iconColor = type === "reactor" ? "text-indigo-400" : "text-blue-400";

  return (
    <div className={`glass-card overflow-hidden border-l-2 ${borderColor}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-zinc-800/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${iconBg}`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <div>
            <h3 className="font-medium text-zinc-200 text-sm sm:text-base">{title}</h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              {type === "reactor" 
                ? "Tratamiento de aguas residuales industriales" 
                : "Estabilidad en sistemas mecatronicos"
              }
            </p>
          </div>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-zinc-500 transition-transform duration-300 flex-shrink-0 ${
            isExpanded ? "rotate-180" : ""
          }`} 
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
          {children}
        </div>
      </div>
    </div>
  );
}
