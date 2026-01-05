"use client";

import { useEffect } from 'react';
import { enableVisualEditing } from '@sanity/visual-editing';

export function VisualEditing() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      enableVisualEditing({
        zIndex: 1000,
      });
    }
  }, []);

  return null;
}