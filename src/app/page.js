'use client';
import { useEffect, Suspense } from 'react';
import { motion, useMotionValue, useSpring } from "framer-motion";
import dynamic from 'next/dynamic'
import styles from './page.module.css'
import Loader from '@/components/Loader/Loader';
const Monitors = dynamic(() => import('@/components/Monitors/index').then((mod) => mod.Monitors), { ssr: false })

export default function Home() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  }, [])

  return (
      <main className={styles.main}>
        <Suspense fallback={Loader}>
          <Monitors />
        </Suspense>
        <motion.div
        className="cursor"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
      />
      </main>
  )
}
