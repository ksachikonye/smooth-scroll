'use client'
import { useEffect, useRef } from "react";
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import dynamic from 'next/dynamic'

const Lightning = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Lightning), { ssr: false })


export default function Conflagration() {
    return (
      <>
        
      </>
    );
  }
  