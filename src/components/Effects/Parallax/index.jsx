'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './style.module.css'
import Image from 'next/image';
import Lenis from '@studio-freight/lenis'
import { useTransform, useScroll, motion } from 'framer-motion';

const images = [
  "https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/austrian-national-library-400m.jpg",
  "https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/chigure-che-glitch-schwarz.jpg",
  "https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/karsten.jpg",
  "https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/95Rugbyworld-cup-final.jpg",
  "https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/pexels-alarm-onion-7451177.jpg",
  "https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/horns.jpg",
  "https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/karsten.jpg",
  "https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/brett-lee-01.jpg",
  "https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/amarndo-duplantis.jpg",
  "https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/1948-olympic-games-london-england-modern-pentathlon-captain-wiliam-grut-of-sweden-is-thrown.jpg",
  "https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/a-view-of-the-panathenaic-stadium-in-athens-during-the-opening-ceremony-of-the-1906.jpg",
  "https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/DP870302.jpg",
]

export default function Parallax() {
  
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({width:0, height:0});

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  })
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

  useEffect( () => {
    const lenis = new Lenis()

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const resize = () => {
      setDimension({width: window.innerWidth, height: window.innerHeight})
    }

    window.addEventListener("resize", resize)
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    }
  }, [])

  return (
    <main className={styles.main}>
  
      <div ref={gallery} className={styles.gallery}>
        <Column images={[images[0], images[1], images[2]]} y={y}/>
        <Column images={[images[3], images[4], images[5]]} y={y2}/>
        <Column images={[images[6], images[7], images[8]]} y={y3}/>
        <Column images={[images[9], images[10], images[11]]} y={y4}/>
      </div>

    </main>
  )
}

const Column = ({images, y}) => {
  return (
    <motion.div 
      className={styles.column}
      style={{y}}
      >
      {
        images.map( (src, i) => {
          return <div key={i} className={styles.imageContainer}>
            <Image 
              src={`/images/${src}`}
              alt='image'
              fill
            />
          </div>
        })
      }
    </motion.div>
  )
}