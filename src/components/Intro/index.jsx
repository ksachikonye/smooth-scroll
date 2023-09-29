'use client';
import React, { useLayoutEffect, useRef } from 'react'
import Image from 'next/image';
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { SplitText } from 'gsap/dist/SplitText';
import TextSlide from '../Effects/TextSlide/TextSlide';

function Intro() {
    const content = useRef()
    const wrapper = useRef()
    const heroTitle = useRef()
    const sunCircle = useRef()
    const hero = useRef()
    const marquee = useRef()
    const marqueeA = useRef()
    const marqueeB = useRef()
    const headingRef = useRef();
    const comparisonSectionRef = useRef()
    const containerLeftRef = useRef()
    const containerRightRef = useRef()
    const sectionRef = useRef()
    const sectionImageWrapperRef = useRef()


  
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin);
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
      const ctx = gsap.context(() => {
          ScrollSmoother.create({
            smooth: 5, // seconds it takes to "catch up" to native scroll position
            effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
            normalizeScroll: true, // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
            ignoreMobileResize: true, // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
            preventDefault: true
          
          });

          gsap.set(headingRef.current, {
            yPercent: -150,
            opacity: 1
           });
           tl.current = gsap.timeline();
           let mySplitText = new SplitText( splitRef.current, { type: "words,chars" });
           let chars = mySplitText.chars;
    
           chars.forEach((char, i) => {
           smoother.effects(char, { speed: 1, lag: (i + 1) * 0.1 });
          });
  
          gsap.utils.toArray(comparisonSectionRef.current).forEach(section => {
            let tl = gsap.timeline({
                scrollTrigger: {
                  trigger: section,
                  start: "center center",
                  // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
                  end: () => "+=" + section.offsetWidth, 
                  scrub: true,
                  pin: true,
                  anticipatePin: 1
                },
                defaults: {ease: "power2.out"}
              });
            // animate the container one way...
            tl.fromTo(section.querySelector(containerRightRef.current), { xPercent: 100, x: 0, duration: 2.5}, {xPercent: 0});
              // ...and the image the opposite way (at the same time)
              tl.fromTo(section.querySelector(containerLeftRef.current), {xPercent: -100, x: 0, duration: 2.5}, {xPercent: 0}, 0);
          });
    
    
          gsap.utils.toArray(sectionRef.current).forEach((section, index) => {
            const w = section.querySelector(sectionImageWrapperRef.current);
            const [x, xEnd] = index % 2 ? ['100%', (w.scrollWidth - section.offsetWidth) * -1] : [w.scrollWidth * -1, 0];
            gsap.fromTo(w, { x }, {
              x: xEnd,
              scrollTrigger: {
                trigger: section,
                scrub: 0.5 } });
          });

          const splitTitle = new SplitText(heroTitle.current, { type: 'words,chars' })
         const char = splitTitle.char

            const tlHero = () =>
            gsap
                .timeline()
                .to(char, {
                opacity: 0,
                y: -100,
                stagger: { from: 'random', each: 0.01 }
                })
                .from(
                sunCircle.current,
                {
                    yPercent: 10,
                    scale: 0.5,
                    transformOrigin: 'bottom center'
                },
                '<'
                )

                ScrollTrigger.create({
                    trigger: hero.current,
                    start: 'top top',
                    end: 'bottom top',
                    pin: true,
                    scrub: 1,
                    animation: tlHero()
                  });

                  let tlMarquee = () =>
                    gsap
                        .timeline()
                        .from(marqueeA.current, { xPercent: 50 })
                        .from(marqueeB.current, { xPercent: -50 }, '<')

                    ScrollTrigger.create({
                    trigger: marquee.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                    animation: tlMarquee()
                    })
  
          const ts = gsap.timeline({
              scrollTrigger: {
                  trigger: heroRef.current,
                  start: "top top",
                  end: "bottom top",
                  scrub: true
              }
          });
          
          gsap.utils.toArray(parallaxRef.current).forEach(layer => {
              const depth = layer.dataset.depth;
              const movement = -(layer.offsetHeight * depth)
              ts.to(layer, {y: movement, ease: "power4.inOut"}, 0)
          });
    
  
          }, wrapper)
          return () => ctx.revert()
  
      },[])

      return (
        <>
<div ref={wrapper} className="overflow-x-hidden relative box-border antialised ">
    <div ref={content} className="text-[1.25em] leading-normal m-0">


                <div ref={headingRef} className="leading-[1.35]" aria-hidden="true">
                      <p>reversed</p>
                      <div className="relative">
                      <p>bullet</p>
                      <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.95">bullet</p>
                      <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.9">bullet</p>
                      <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.85">bullet</p>
                      <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.8">bullet</p>
                      <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.75">bullet</p>
                      <p className="absolute z-[999] text-transparent top-0 inset-x-0 first:absolute first:z-[999] first:text-[white] first:top-0 first:inset-x-0" data-speed="0.7">bullet</p>
                      </div>
                  </div>

                          <div className='h-[300vh] bg-[#111] text-[white] overflow-x-hidden' >
                                <section className="relative pb-[56.25%]" ref={comparisonSectionRef}>
                                        <div className="w-full h-full">
                                            <Image className='w-full h-full absolute top-0' src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/prehistoric-ben.jpg" alt="before"/>
                                        </div>
                                        <div className="w-full h-full absolute top-0 absolute overflow-hidden translate-x-full translate-y-0 top-0" ref={containerRightRef}>
                                            <Image className='-translate-x-full translate-y-0' src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/ben-johnson.jpg" alt="after" ref={containerLeftRef}/>
                                        </div>
                                </section>
                              </div>

                            <section className="grid grid-cols-[repeat(2,1fr)] gap-x-4 gap-y-[20vh] items-center justify-items-center mt-[10vh] px-4 py-40 max-w-[1100px] mx-auto my-0">

                                  <div className="col-[2] row-[1]">
                                  <div className="mt-[1em] px-8 py-2 border-l-[solid] border-l-[white]">
                                  <h2>Upright</h2>
                                  <p>Why is it that, out of all the postures that a primate could take, humans seem comfortable with the idea of standing upright. The pattern of 
                                    human gait violates all the fundamentals of engineering. Standing is a complex process that is still up to now, purely understood. 
                                  </p>
                                  </div>
                                  </div>

                                  <div className="image_cont">
                                  <Image data-speed="auto" src="https://assets.codepen.io/756881/neon3.jpg" alt=""/>
                                  </div>

                          </section>

                            <section ref={sectionRef} className='text-[clamp(8rem,15vw,16rem)] leading-none font-black'>
                                  <div className='flex text-[clamp(8rem,15vw,16rem)] leading-none font-black'>
                                  CHIGURECHINOZIVIKANWANEKUNZICHIGUTIRO
                                  </div>
                            </section>
                            <section ref={sectionRef} class='pb-4'>
                                  <ul ref={sectionImageWrapperRef} class='flex'>
                                  <li>
                                      <Image  className="w-full h-auto" height='874' src='https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/lu-xiang.jpg' width='1240' alt='' />
                                  </li>
                                  <li>

                                      <Image className="w-full h-auto" height='874' src='https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/imran-khan-bouncer.jpg' width='1240' alt='' />
                                  </li>
                                  <li>
                              
                                      <Image className="w-full h-auto" height='874' src='https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/javelin-training.jpg' width='1240' alt='' />
                                  </li>
                                  <li>
                                      <Image className="w-full h-auto" height='874' src='https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/canada-bobsleigh.jpg' width='1240' alt='' />
                                  </li>
                                  </ul>
                            </section>
                          <section ref={sectionRef} class='pb-4'>
                                <ul ref={sectionImageWrapperRef}  class='flex'>
                                <li>
                                    <Image className="w-full h-auto" height='874' src='https://source.unsplash.com/random/1240x874?sig=143' width='1240' alt='' />
                                </li>
                                <li>
                                    <Image className="w-full h-auto" height='874' src='https://source.unsplash.com/random/1240x874?sig=25' width='1240' alt='' />
                                </li>
                                <li>
                                    <Image className="w-full h-auto" height='874' src='https://source.unsplash.com/random/1240x874?sig=195' width='1240' alt='' />
                                </li>
                                </ul>
                          </section>
                        <section ref={sectionRef} class='pb-4'>
                              <ul ref={sectionImageWrapperRef}  class='flex'>
                              <li>
                                  <Image className="w-full h-auto" height='874' src='https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/1920s-sprint-final.jpg' width='1240' alt='' />
                              </li>
                              <li>
                                  <Image className="w-full h-auto" height='874' src='https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/Jeremy-Wariner.jpg' width='1240' alt='' />
                              </li>
                              <li>
                                  <Image className="w-full h-auto" height='874' src='https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/johan-blake.jpg' width='1240' alt='' />
                              </li>
                              <li>
                                  <Image className="w-full h-auto" height='874' src='https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/willie-devenport-110m-hurdle-record.jpg' width='1240' alt='' />
                              </li>
                              </ul>
                        </section>
                        <section ref={sectionRef} class='pb-4'>
                                  <ul ref={sectionImageWrapperRef}  class='flex'>
                                  <li>
                                      <Image className="w-full h-auto" height='874' src='https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/1912-olympic-games-stockholm-sweden-modern-pentathlon-swedens-g-lilliehook-receiving-his-prize.jpg' width='1240' alt='' />
                                  </li>
                                  <li>
                                      <Image className="w-full h-auto" height='874' src='https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/100-metres-sprint-race-at-the-olympic-games-athens-a-scene-from-the-first-olympics-of-the.jpg' width='1240' alt='' />
                                  </li>
                                  <li>
                                      <Image className="w-full h-auto" height='874' src='https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/shoab-akhtar.jpg' width='1240' alt='' />
                                  </li>
                                  <li>
                                      <Image className="w-full h-auto" height='874' src='https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/spectators-at-the-olympic-stadium-in-athens-for-the-1896-games-the-first-modern-olympics.jpg' width='1240' alt='' />
                                  </li>
                                  </ul>
                        </section>

                    <section className="hflex items-center justify-center" ref={hero}>
                        <div className="absolute bg-[color:var(--blue)] -translate-x-2/4 left-2/4 top-2/4">
                          <div className="w-[40vw] h-[40vw] mix-blend-lighten rounded-[50%]" ref={sunCircle}></div>
                        </div>
                        <h1 className="text-center leading-[8em] max-w-[976px] font-normal text-[158px] leading-[8rem] tracking-[-0.02em] mx-auto my-0">The  pitfalls of being erect include</h1>
                      </section>

                
                      <section className="bg-[color:var(--blue)] flex items-center justify-center flex-col">
                        <h1 className="not-italic font-normal text-[32px] leading-[100%] text-center tracking-widest uppercase text-[#f47731] mix-blend-lighten" data-lag="0.2">Difficult to study</h1>
                        <p>
                          <span className="mix-blend-screen w-[90px] h-[90px] inline-block relative z-10 mr-8 rounded-[50%] top-[5px]" data-lag="1.1"></span>Weight distribution,
                        </p>
                        <p className='block font-normal text-[113px] leading-[100%] text-center text-white'>
                          makes the anatomy inconcistent and physiological changes 
                          <span className="inline-block mix-blend-difference" data-lag="1.2"
                            ><span className="asterisk__inner">✳</span>
                          </span>
                          transform it into a relentless correction of muscle length and joint position. 
                        </p>
                      </section>

                  
                      <section className="overflow-hidden">
                        <a
                          href="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/ben-johnson-seoul.mp4"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          <Image
                          className='w-full h-screen object-cover'
                            src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/ben-johnson.jpg"
                            alt="Video thumbnail"
                            data-speed="0.5"
                          />
                        </a>
                      </section>


                      <section className="flex flex-col items-center justify-center bg-[color:var(--blue)] relative" ref={marquee}>
                        <div className="absolute left-[20%] top-[30%]">
                          <Image
                          className="w-[300px] h-[300px] mix-blend-screen object-cover rounded-[50%]"
                            width="350"
                            height="auto"
                            src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/canada-bobsleigh.jpg"
                            alt=""
                            data-lag="3"
                          />
                        </div>
                        <div className="absolute right-[20%] top-2/4">
                          <Image
                          className="w-[300px] h-[300px] mix-blend-screen object-cover rounded-[50%]"
                            width="350"
                            height="auto"
                            src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/badman-beamon.jpg"
                            alt=""
                            data-lag="2"
                          />
                        </div>

                        <h3 className="whitespace-nowrap font-normal text-[240px] leading-[100%] text-[#2c449a] mix-blend-exclusion" ref={marqueeA}>
                          An upright gait requires jet speed collaboration of multiple sensory inputs to achieve balance.
                        </h3>
                        <h3 className="whitespace-nowrap font-normal text-[240px] leading-[100%] text-[#2c449a] mix-blend-exclusion" ref={marqueeB}>
                          Physiological imbalances, such as electrolyte imbalance, impair the balance apparatus in reversible ways,
                        </h3>
                      </section>

              
                      <section className="bg-[color:var(--blue)] flex flex-col items-center justify-center gap-12">
                        <div className="text-[5vw] leading-none max-w-[30vw] text-center flex items-center flex-col bg-[color:var(--blue)]">
                          <h3 data-lag=".8">Aging introduces irreversible decline in balance</h3>
                          <div className="smile" data-lag=".5"></div>
                        </div>
                    
                      </section>
                    <section ref={sectionRef} className='text-[clamp(8rem,15vw,16rem)] leading-none font-black'>
                      <div className='flex text-[clamp(8rem,15vw,16rem)] leading-none font-black'>
                        CHIGURECHEMAPANGAMAOKOMUDENGA
                      </div>
                    </section>


		
</div>
</div>


</>

      )
}

export default Intro; 