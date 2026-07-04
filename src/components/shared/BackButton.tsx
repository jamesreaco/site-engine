"use client"

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import AnimatedUnderline from "./AnimatedUnderline";

export default function BackButton() {

  const router = useRouter();

  return (
    <button 
      type="button"
      onClick={() => router.back()}
      aria-label="Go back to previous page or anchor."
      className='flex items-center gap-1'
    >
      <ChevronLeft size={18} aria-hidden="true" /> 
      <span className='relative group font-medium'>
        Back
        <AnimatedUnderline />
      </span>
    </button>
  )
};