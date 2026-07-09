"use client";

import { Ban } from "lucide-react";
import { useRouter } from "next/navigation";
import { useVisualEditingEnvironment } from "next-sanity/hooks";

export function DisableDraftMode() {

  const router = useRouter();
  const environment = useVisualEditingEnvironment();

  if (environment === "presentation-iframe" || environment === "presentation-window") {
    return null;
  };

  async function disableDraftMode() {
    await fetch("/api/draft-mode/disable");
    router.refresh();
  };

  return (
    <button
      onClick={disableDraftMode}
      aria-label="Disable Draft Mode"
      className="fixed bottom-4 right-4 flex items-center gap-1.5 bg-black text-white px-2.5 py-2 rounded-lg cursor-pointer"
    >
      <Ban
        size={14}
        className="text-red-300"
      />
      <span className="text-sm font-medium">
        Disable Draft Mode
      </span>
    </button>
  );
};
