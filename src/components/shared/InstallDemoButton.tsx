"use client"

import Heading from "./Heading";
import { Copy } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { copyToClipboard } from "@/lib/utils";

export default function InstallDemoButton() {
  
  function handleClick() {
    copyToClipboard('npx sanity dataset import demo-content.tar.gz production')
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <Heading tag="h2" size="xxl" className='max-w-[420px] relative pr-2.5 py-3 text-balance leading-normal border-y border-dashed border-t-gray-200 border-b-gray-200 bg-gray-50 pattern-bg--2'>
        <span className='relative z-20'>
          SiteEngine
        </span>
        <EdgeBlur />
      </Heading>
      <button 
        onClick={() => handleClick()} 
        className="flex flex-col items-center gap-6 text-base cursor-pointer hover:opacity-80 transition-opacity"
      >
        Run the command to install demo content <span className="flex items-center gap-2 text-lg bg-black text-white px-3 py-1 rounded-lg">npx sanity dataset import demo-content.tar.gz production <Copy size={16} /></span>
      </button>
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          className: 'text-sm font-semibold antialiased',
          style: {
            borderRadius: '300px',
            padding: '4px 8px',
            color: '#FFFFFF',
            fontWeight: '500',
            backgroundColor: '#000000'
          }
        }}
      />
    </div>
  )
};

function EdgeBlur() {
  return (
    <div className='absolute inset-0 flex items-center justify-between'>
      <div className='relative bg-gradient-to-r from-gray-50 to-transparent h-full w-[100px]'></div>
      <div className='bg-gradient-to-l from-gray-50 to-transparent h-full w-[100px]'></div>
    </div>
  )
};