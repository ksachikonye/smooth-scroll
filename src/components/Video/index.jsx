'use client'
import Lenis from '@studio-freight/lenis'
import { useEffect,  useRef, useState} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import Mask from './Mask'

export function Video(){
  const content = useRef()
  const wrapper = useRef()
  const fromLeftRef = useRef()
  const loaderRef = useRef()
  const fromLeftTileRef = useRef()
  const bannerRef = useRef();
  const loadingScreenRef = useRef();

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
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
       console.log({ scroll, limit, velocity, direction, progress })
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
    return () => {
      window.removeEventListener('resize', resize)
      gsap.ticker.remove(update)
      lenis.current.destroy()
    }

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
        const tl = gsap.timeline();

        const welcomeScreen = gsap.timeline({
          paused: "true",
        });
        tl.from(loaderRef.current, {
          duration: 0.8,
          opacity: 0,
          y: 10,
        });
      
        let tl1 = gsap.timeline({ ease: "power4.inOut", paused: "true" });

        tl1.set(fromLeftRef.current, { pointerEvents: "none" });
        tl1.to(fromLeftTileRef.current, {
          duration: 1.6,
          width: "100%",
          left: "0%",
          stagger: 0.05,
        });
        tl1.to(fromLeftTileRef.current, {
          duration: 1,
          width: "100%",
          left: "100%",
          stagger: 0.1,
        });
        tl1.set(fromLeftTileRef.current, { left: "0", width: "0" });
        tl1.set(fromLeftRef.current, { pointerEvents: "all" });

        let id,
          i = 0;
        function loader() {
          id = setInterval(frame, 20);
        }
        function frame() {
          if (i >= 100) {
            clearInterval(id);
            tl1.play();
            welcomeScreen.play();
          } else {
            i++;
            loaderRef.current.innerHTML = i + "%";
          }
        }
        window.onload = function () {
          loader();
        };

        welcomeScreen.to(loadingScreenRef.current, {
          duration: 0.8,
          y: -2000,
          ease: "Power4.out",
          delay: 0.4,
        });
        welcomeScreen.from(
          model,
          {
            y: 500,
            duration: 1.3,
            stagger: {
              amount: 0.2,
            },
          },
          "-=.2"
        );
        
        welcomeScreen.from(
          bannerRef.current,
          {
            y: 500,
            duration: 0.9,
            stagger: {
              amount: 0.2,
            },
          },
          "-=.2"
        );
        
        }, main)
        return () => ctx.revert()

    },[wrapper])

    return (
        <div ref={wrapper}>
           <div ref={content} >

           <div className="absolute z-10 w-full h-screen bg-[#222222] text-[white] overflow-hidden" ref={loadingScreenRef}>
             <div className="absolute flex w-full h-screen items-center justify-center">
               <div className="text-[250px] font-bold" ref={loaderRef}></div>
             </div>
           </div>

           <div className="fixed w-full h-full flex z-[999999] pointer-events-none inset-x-0 flex-col" ref={fromLeftRef}>
             <span className="h-full w-[0%]" ref={fromLeftTileRef}></span>
             <span className="h-full w-[0%]" ref={fromLeftTileRef}></span>
             <span className="h-full w-[0%]" ref={fromLeftTileRef}></span>
           </div>
             <section className="overflow-x-hidden cursor-none m-0 bg-[#222222]">

                       <div className="welcome-screen">
                           <header className="header js-active-header">
                             <div className="relative" > 
                               <div className="container">
                                 <div className="grid grid-cols-2">
                                   <div className="col-span-2">
                                     <div className="absolute top-[20%]">
                                       <h2 className="text-white text-[110px] font-extrabold" ref={bannerRef}>Interlude
                                         <p>Kutura mafemo.</p>
                                       </h2>

                                       <button onClick={() => set(true)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                          <a href="#" className="no-underline leading-[60px] text-white font-extrabold uppercase relative px-0 py-2">Dhindindi</a>
                                      </button>
                              
                                     </div>
                                   </div>
                                   <div className="col-span-2">
                                    
                                   </div>
                                 </div>
                               </div>
                             </div>

                           </header>
                           
                         </div>
                         </section>
             
             <section>
                <Mask/>
                 </section>

         </div>
     </div>

    )

}