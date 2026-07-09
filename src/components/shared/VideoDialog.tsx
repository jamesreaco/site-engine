"use client"

import React from 'react';
import ReactPlayer from 'react-player/lazy';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";

export default function VideoDialog({ children, videoUrl }: {
  children: React.ReactNode;
  videoUrl?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="inset-10 max-w-full max-h-[740px]">
        <ReactPlayer 
          url={videoUrl} 
          width="100%"
          height="100%"
          playing={true}
        />
      </DialogContent>
    </Dialog>
  )
};