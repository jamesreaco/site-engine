"use client";

import Link from "next/link";
import { Ban } from "lucide-react";
import { useVisualEditingEnvironment } from "next-sanity/hooks";

export function DisableDraftMode() {
  
  const environment = useVisualEditingEnvironment();

  if (environment === "presentation-iframe" || environment === "presentation-window") {
    return null;
  };

  return (
    <Link
      href="/api/draft-mode/disable"
      aria-label="Disable Draft Mode"
      className="fixed bottom-4 right-4 flex items-center gap-1.5 bg-black text-white px-2.5 py-2 rounded-lg"
    >
      <Ban 
        size={14} 
        className="text-red-300" 
      />
      <span className="text-sm font-medium">
        Disable Draft Mode
      </span>
    </Link>
  );
};