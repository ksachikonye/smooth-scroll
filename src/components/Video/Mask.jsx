'use client'
import { useRef, useEffect, useLayoutEffect } from 'react';
import Lenis from '@studio-freight/lenis'
import gsap, { Elastic, Expo, Power1 } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import VideoPlane from '../Planes/VideoPlane';

function ScrollVideo(){
    const content = useRef();
    const wrapper = useRef();
    let vidRef = useRef();
    gsap.registerPlugin(ScrollTrigger,  ScrollSmoother);
    const lenis = useRef(null)
  
    const update = (time, deltaTime, frame) => {
      lenis.current.raf(time * 1000)
    }
  
    const resize = (e) => {
      ScrollTrigger.refresh()
    }
    useEffect(() => {
  
        lenis.current = new Lenis({
          wrapper: wrapper.current,
          content: content.current,
          duration: 1.9,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
          direction: 'vertical', // vertical, horizontal
          gestureDirection: 'vertical', // vertical, horizontal, both
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
          lerp: 0.01,
        })
    
        lenis.current.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
          // console.log({ scroll, limit, velocity, direction, progress })
          ScrollTrigger.update()
        })
    
        function raf(time) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
    
        requestAnimationFrame(raf)
    
        gsap.ticker.add(update)
    
        ScrollTrigger.scrollerProxy(document.body, {
          scrollTop(value) {
            if (arguments.length) {
              lenis.current.scroll = value
            }
            return lenis.current.scroll
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          }
        })
    
        ScrollTrigger.defaults({ scroller: document.body })
    
        window.addEventListener('resize', resize)
    
        // animations
        // animations
    
    
    
    
        // clean
    
        return () => {
          window.removeEventListener('resize', resize)
          gsap.ticker.remove(update)
          lenis.current.destroy()
    
    
        }
    
      }, [])

      useLayoutEffect(() => {
        let tl;
        const ctx = gsap.context(() => {

            ScrollSmoother.create({
                smooth: 5, // seconds it takes to "catch up" to native scroll position
                effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
                normalizeScroll: true, // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
                ignoreMobileResize: true, // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
                preventDefault: true
              
              });

          tl = gsap.timeline({
            scrollTrigger: {
              trigger: 'video',
              start: 'top top',
              end: 'bottom+=500% bottom',
              scrub: true,
              markers: true,
            },
          });
        });
        vidRef.onloadedmetadata = function () {
          tl.fromTo(
            vidRef,
            {
              currentTime: 0,
              ease: Expo.easeIn,
            },
            {
              currentTime: vidRef.duration,
              ease: Expo.easeOut,
            }
          );
        };
        function isTouchDevice() {
          return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        }
        if (isTouchDevice()) {
          vidRef.play();
          vidRef.pause();
        }
        return () => ctx.revert();
      }, []);
    
      return (
        <div className="vidContainer">
            <VideoPlane  ref={(el) => (vidRef = el)} url={'/videos/UsainBoltvUsainBolt.mp4'}/>
        </div>
      );

    
    
}



export default function Mask() {
const stickyMaskStyles = {
    position: 'sticky',
    top: '0',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    maskImage: 'url("/svgs/mask.svg")',
    maskPosition: '52.35% center',
    maskRepeat: 'no-repeat',
    maskSize: '80%',
  };

  const container = useRef(null);
  const stickyMask = useRef(null);

  const initialMaskSize = .8;
  const targetMaskSize = 30;
  const easing = 0.15;
  let easedScrollProgress = 0;

  useEffect( () => {
    requestAnimationFrame(animate)
  }, [])

  const animate = () => {
    const maskSizeProgress = targetMaskSize * getScrollProgress();
    stickyMask.current.style.webkitMaskSize = (initialMaskSize + maskSizeProgress) * 100 + "%";
    requestAnimationFrame(animate)
  }

  const getScrollProgress = () => {
    const scrollProgress = stickyMask.current.offsetTop / (container.current.getBoundingClientRect().height - window.innerHeight)
    const delta = scrollProgress - easedScrollProgress;
    easedScrollProgress += delta * easing;
    return easedScrollProgress
  }

  return (
    <main className={styles.main}>
      <div ref={container} className='relative h-[300vh] bg-white'>
        <div ref={stickyMask} className={stickyMaskStyles}>
            <ScrollVideo className='h-full w-full object-contain'/>
    
        </div>
      </div>
    </main>
  )
}
