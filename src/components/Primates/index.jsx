'use client'
import React, { useEffect, useRef, useLayoutEffect } from 'react'
import { Canvas} from '@react-three/fiber'
import { useScroll } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import dynamic from 'next/dynamic'

const Primate = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Primates), { ssr: false })

const data = [
    {
        title: "Ford",
        phrase: "Working on the Next-Generation HMI Experience without no driving experience.",
       
    },
     {
        title: "Ford",
        phrase: "Working on the Next-Generation HMI Experience without no driving experience.",
       
    },
     {
        title: "Ford",
        phrase: "Working on the Next-Generation HMI Experience without no driving experience.",
       
    },
     {
        title: "Ford",
        phrase: "Working on the Next-Generation HMI Experience without no driving experience.",
       
    }
    
]


export default function Primates() {
    const content = useRef();
    const wrapper = useRef();
    let refs = useRef([]);
    const container = useRef(null);

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const scene = useRef(null);
    const { scrollYProgress } = useScroll({
        target: scene,
        offset: ['start end', 'end start']
    })

    useEffect( () => {
        window.scrollTo(0,0);
        
        const lenis = new Lenis({
        wrapper: wrapper.current,
        content: content.current,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        direction: 'vertical', // vertical, horizontal
        gestureDirection: 'vertical', // vertical, horizontal, both
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      })
        
        function raf(time) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        
        requestAnimationFrame(raf)
    }, [])

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            ScrollSmoother.create({
              smooth: 5, // seconds it takes to "catch up" to native scroll position
              effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
              normalizeScroll: true, // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
              ignoreMobileResize: true, // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
              preventDefault: true
            
            });
  
            gsap.to(refs.current, {
                scrollTrigger: {
                    trigger: container.current,
                    scrub: true,
                    start: `top`,
                    end: `+=${window.innerHeight / 1.5}`,
                },
                opacity: 1,
                ease: "none",
                stagger: 0.1
            })

            const splitWords = (phrase) => {
                let body = [];
                phrase.split(" ").forEach( (word, i) => {
                  const letters = splitLetters(word);
                  body.push(<p key={word + "_" + i}>{letters}</p>)
                })
                return body
              }
            
              const splitLetters = (word) => {
                let letters = []
                word.split("").forEach( (letter, i) => {
                  letters.push(<span key={letter + "_" + i} ref={el => {refs.current.push(el)}}>{letter}</span>)
                })
                return letters;
              }
            
      
    
            }, main)
            return () => ctx.revert()
    
        },[wrapper])
  
  
    return (
<div ref={wrapper} className="absolute z-[1] w-full">
  <div ref={content} className="left-0 top-0">
    <div className="relative h-screen w-screen overflow-hidden">
      
      <div className="absolute z-[1] h-full w-full  bg-cover left-0 top-0">
        <Canvas ref={scene}>
            <ambientLight intensity={0.1} />
            <directionalLight intensity={3.5} position={[1, 0, -.25]} />
            <motion.mesh scale={2.5} rotation-y={scrollYProgress}>
                <Primate/>
            </motion.mesh>
        </Canvas>
      </div>
      
      <div className="w-screen flex justify-center absolute z-[1] text-[white] left-0 bottom-0">

        <div className="absolute w-full -translate-x-2/4 max-w-[600px] border border-solid border-[red] left-2/4">
        {data.map((item, index) => (
            <h1 className='text-[5vw] max-w-[80%] justify-center items-center font-normal'  key={index}>{item.title}</h1>
        ))}
        {index + 1}

        {data.map((item, index) => (
             <p className='text-[3.5vw] text-white justify-center items-center  font-bold mr-[1.5vw] m-0' key={index}> {splitWords(item.phrase)}</p>
        ))}
        {index + 1}
          </div>
      
      </div>
      
    </div>
  </div>
</div>
    )
}