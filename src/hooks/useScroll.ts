"use client"

import { useState, useEffect } from 'react';

export default function useScroll() {

  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100
      setScrolled(isScrolled)
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrolled
};