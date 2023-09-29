'use client'
import { useEffect, useLayoutEffect, Suspense } from 'react'
import Lenis from '@studio-freight/lenis'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import dynamic from 'next/dynamic'
import Loader from '@/components/Loader/Loader';
import Intro from '@/components/Intro';
import TextSlide from "@/components/Effects/TextSlide";
import MaskTexts from '@/components/Effects/MaskTexts'
import Transition from '@/components/Effects/Transition'

const statementOne = ['Being upright made proto-humans easier targets for predators. Being imperfectly upright requires higher energy consumption and introduces stress on the time budget for food.']
const statementTwo = ['Being upright increases the likelihood of not only falling, but makes the falls more gruesome'];


const Spine = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Spine), { ssr: false })
const HomoErectus = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.HomoErectus), { ssr: false })
const HomoHabilis = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.HomoHabilis), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
        <Loader/>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })


export default function Introduction() {
    const content = useRef();
    const wrapper = useRef();
    const stickyTrackRef = useRef();
    const stickyElRef = useRef();
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
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
          duration: 1.8,
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
              smooth: 5.3, // seconds it takes to "catch up" to native scroll position
              effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
              normalizeScroll: true, // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
              ignoreMobileResize: true, // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
              preventDefault: true
            
            });
        
    
            const stickyTrack = gsap.utils.toArray(stickyTrackRef.current);
            const stickyEl = gsap.utils.toArray(stickyElRef.current);
          
            for (let i = 0; i < stickyEl.length; i++) {
              ScrollTrigger.create({
                markers: false,
                trigger: stickyEl[i],
                pin: stickyEl[i],
                start: () => `top top`,
                end: () => `bottom top`,
                pinSpacing: false
              });
            }
            }, main)
            return () => ctx.revert()
    
        },[wrapper])
  return (
    <>
      <div className='mx-auto flex w-full flex-col flex-wrap text-white items-center md:flex-row  lg:w-4/5 bg-[#2d2d2d] antialised' ref={wrapper}>
        <div ref={content}>
        {/* jumbo */}
        <section  className="max-w-screen-lg mx-auto my-0 px-[2em] py-[8em]">
            <Intro/>
        </section>
        <section className="max-w-screen-lg mx-auto my-0 px-[2em] py-[8em]">
            <Transition/>
        </section>

        <section className="max-w-screen-lg mx-auto my-0 px-[2em] py-[8em]">
                <article>
                    <header className="z-[2] col-[1_/_4]" data-speed="1.25">
                    <h2 >Våg å lytte,  våg å skifte mening</h2>
                    <p>Jerky pastrami strip steak pork chuck. Biltong boudin burgdoggen shankle, short ribs short loin drumstick corned beef rump ribeye filet mignon pork chop. </p>
                    </header>
                    <div className="relative flex justify-center items-center col-[2_/_-1]">
                    <div className="image-parent">
                        <Image className="block max-w-full h-[180%] object-cover opacity-60" data-speed="auto" src="https://images.unsplash.com/photo-1583430999185-4c19b0c9636a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80" alt="" />
                    </div> 
                    </div>
                </article>
        </section>

        <section className="max-w-screen-lg mx-auto my-0 px-[2em] py-[8em]">
            <MaskTexts phraseOne={statementOne}/>
            <MaskTexts phraseTwo={statementTwo}/>
        </section>

        <div class="pt-10 leading-7 text-white">

<div class="py-16 px-3 mx-auto max-w-screen-lg border-0 border-solid border-slate-100">
  <div class="block float-none overflow-visible relative z-auto flex-shrink order-none place-self-auto p-0 m-0 w-64 basis-auto" data-speed="auto">
    <h2 class="m-0 text-4xl font-bold text-gray-900 border-0 border-solid border-slate-100">Your title here</h2>
    <div class="mt-4 text-xl leading-7 border-0 border-solid md:px-20 border-slate-100" data-speed="auto">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
      malesuada nisi tellus, non imperdiet nisi tempor at.
    </div>
  </div>
  <div class="flex flex-wrap items-center gap-12 columns-2 max-w-[1200px]" ref={stickyElRef}>
          <div class="w-full text-center border-0 border-solid sm:w-1/2 sm:px-6 border-slate-100" data-speed="auto">
            <h3 class="m-0 text-3xl font-semibold text-gray-900 border-0 border-solid border-slate-100">Your title here</h3>
            <div class="mt-6 text-xl leading-9 border-0 border-solid border-slate-100">
                <p class="m-0">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
                voluptates quos ullam unde dicta quas, facere nobis architecto
                accusamus, delectus, veritatis adipisci perferendis repellat? Labore
                repellendus minima dolore illum obcaecati.Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Laboriosam voluptates quos ullam unde
                dicta quas, facere nobis architecto accusamus, delectus, veritatis
                adipisci perferendis repellat? Labore repellendus minima dolore
                illum obcaecati.
              </p>
            </div>
          </div>
          <div class="p-6 w-full border-0 border-solid sm:w-1/2 border-slate-100">
            <View orbit className='block relative h-full  sm:h-48 sm:w-full block max-w-full h-auto align-middle will-change-transform scale-[1.3]'>
            <Suspense fallback={Loader}>
              <Spine scale={2} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
              <Common />
            </Suspense>
          </View>
          </div>
  </div>
  <div class="block float-none overflow-visible relative z-auto flex-shrink order-none place-self-auto p-0 m-0 w-64 basis-auto">
    <div class="flex flex-wrap items-center gap-12 columns-2 max-w-[1200px]" ref={stickyElRef}>
      <h3 class="m-0 text-3xl font-semibold text-gray-900 border-0 border-solid border-slate-100">Your title here</h3>
      <div class="mt-6 text-xl leading-9 border-0 border-solid border-slate-100">
             <p class="m-0">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
                voluptates quos ullam unde dicta quas, facere nobis architecto
                accusamus, delectus, veritatis adipisci perferendis repellat? Labore
                repellendus minima dolore illum obcaecati.Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Laboriosam voluptates quos ullam unde
                dicta quas, facere nobis architecto accusamus, delectus, veritatis
                adipisci perferendis repellat? Labore repellendus minima dolore
                illum obcaecati.
              </p>
      </div>
    </div>
    <div class="p-6 w-full border-0 border-solid sm:w-1/2 border-slate-100" data-speed="auto">
                <View orbit className='block relative h-full  sm:h-48 sm:w-full block max-w-full h-auto align-middle will-change-transform scale-[1.3] '>
            <Suspense fallback={Loader}>
              <HomoErectus scale={2} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
              <Common />
            </Suspense>
          </View>
    </div>
  </div>
  <div
    class="block float-none overflow-visible relative z-auto flex-shrink order-none place-self-auto p-0 m-0 w-64 basis-auto"
  >
    <div
      class="w-full text-center border-0 border-solid flex flex-wrap items-center gap-12 columns-2 max-w-[1200px]"
    >
      <h3
        class="m-0 text-3xl font-semibold text-gray-900 border-0 border-solid border-slate-100"
 
      >
        Your title here
      </h3>
      <div
        class="mt-6 text-xl leading-9 border-0 border-solid border-slate-100" ref={stickyElRef}
      >
              <p class="m-0">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
                voluptates quos ullam unde dicta quas, facere nobis architecto
                accusamus, delectus, veritatis adipisci perferendis repellat? Labore
                repellendus minima dolore illum obcaecati.Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Laboriosam voluptates quos ullam unde
                dicta quas, facere nobis architecto accusamus, delectus, veritatis
                adipisci perferendis repellat? Labore repellendus minima dolore
                illum obcaecati.
              </p>
      </div>
    </div>
    <div class="p-6 w-full border-0 border-solid sm:w-1/2 border-slate-100">
          <View orbit className='block relative h-full  sm:h-48 sm:w-full block max-w-full h-auto align-middle will-change-transform scale-[1.3]'>
            <Suspense fallback={Loader}>
              <HomoHabilis scale={2} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
              <Common />
            </Suspense>
          </View>
    </div>
  </div>
</div>
<div class="py-16 px-3 mx-auto max-w-screen-lg border-0 border-solid border-slate-100">
  <div class="flex flex-col p-4 text-center rounded-md border-0 border-solid sm:flex-row sm:items-center sm:justify-between sm:p-12 sm:text-left border-slate-100 bg-sky-100">
    <div class="text-2xl font-semibold leading-9 text-left border-0 border-solid border-slate-100">
      <div class="text-gray-900 border-0 border-solid border-slate-100">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </div>
      <div class="border-0 border-solid border-slate-100 text-sky-500">
        Start your Free Trial.
      </div>
    </div>
    <div class="mt-3 text-left border-0 border-solid sm:mt-0 sm:ml-2 border-slate-100">
    </div>
  </div>
</div>

</div>

     

      
      </div>
      </div>
     
    </>
  )
}
