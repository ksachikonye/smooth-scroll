'use client'
import Lenis from '@studio-freight/lenis'
import { useEffect,  useRef, useLayoutEffect} from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';


export default function Description() {
  const content = useRef();
  const wrapper = useRef();
  const stickyTrackRef = useRef();
  const stickyElRef = useRef();
  const sectionsRef = useRef();
  const heroRef = useRef();
  const trackRef = useRef();
  const heroImageRef = useRef();
  const notePanelRef = useRef();
  const staggerPanelRef = useRef();
  const noteImageRef = useRef();
  const thanksPanelRef = useRef();
  const thanksImageRef = useRef();
  const thanksPanelWrapRef = useRef();
  const staggerPanelImageRef = useRef();
  const thanksPanelContainRef = useRef();


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
      duration: 1.2,
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

        document.body.style.overflow = 'auto';
        document.scrollingElement.scrollTo(0, 0);

        const tlMain = gsap.timeline(
        {
            scrollTrigger: {
              trigger: sectionsRef.current,
              start: "top top",
              end: "98% bottom",
              scrub: 1
            }
          }
      );
      tlMain.to(trackRef.current, {
        xPercent: -100,
        ease: "none"
      });

      const hero = gsap
      .timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          containerAnimation: tlMain,
          start: "left left",
          end: "right left",
          scrub: true
        }
      });
      hero.from(heroImageRef.current, { scale: 1.6 }, 0);

      const note = gsap
      .timeline({
        scrollTrigger: {
          trigger: notePanelRef.current,
          containerAnimation: tlMain,
          start: "left right",
          end: "left left",
          scrub: true
        }
      });
      note.from(noteImageRef.current, { rotate: 45, scale: 0.3 });

      const thanks = gsap.timeline(
        {
            scrollTrigger: {
              trigger: thanksPanelWrapRef.current,
              containerAnimation: tlMain,
              start: "left left",
              end: "right right",
              scrub: true
            }
          }
      );
      thanks.to(thanksPanelRef.current, { xPercent: 100, ease: "none" });
      thanks.to(thanksImageRef.current, { scale: 1 }, 0);
      thanks.fromTo(
        thanksPanelContainRef.current,
        {
          clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
        },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "none" },
        0
      );

      const stagger = gsap.timeline({
        scrollTrigger: {
          trigger: staggerPanelRef.current,
          containerAnimation: tlMain,
          start: "left right",
          end: "right left",
          scrub: true
        }
      });
      stagger.from(staggerPanelImageRef.current, { x: "100vw", stagger: { each: 0.05 } });
      stagger.to(staggerPanelImageRef.current, { scale: 0.5, stagger: { each: 0.05 } });


    

  
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
             <div ref={wrapper} className='box-border z-0 h-[100vh] w-screen antialiased' data-scroll-section>
                            <div ref={content} >


                             <section className="max-w-screen-lg mx-auto my-0 px-[2em] py-[8em]" >
                              
                            <div className="hero">
                              <div className="relative z-[3] flex min-h-screen flex-col justify-center items-center bg-white text-center top-0 bottom-auto inset-x-0">
                                  <div className="max-w-full">
                                    <p className="text-[2.2em] leading-none font-normal mb-[0.6em]">Aerodynamics</p>
                                    <h1>APPRECIATION</h1>
                                    <div className="w-[26rem] max-w-full mx-auto pt-6">
                                        <p>THIS IS A SAFE SPACE FOR ANALYSING HOW HUMAN INVENTIONS AND ANIMALS BEND TO THE WILL OF AERODYNAMICS.ON A PLANET FULL OF AIR, THE ONLY WAY IS TO ADAPT!</p>
                                    </div>
                                  </div>
                              </div>
                            </div>
                            <div className="relative h-[300vh]" ref={sectionRef}>
                              <div className=" sticky z-[2] flex overflow-hidden w-full h-screen justify-start items-stretch top-[0%] bottom-auto inset-x-[0%]">
                                  <div className="relative h-full flex-[0_0_auto] translate-x-[0%] translate-y-0">
                                    <div className="flex h-full mr-[-100vw] justify-start items-stretch">
                                        <div className="relative overflow-hidden w-screen h-screen flex-[0_0_auto]" ref={heroRef}>
                                          <div className="relative z-[2] flex w-[10vw] h-screen justify-start items-center" ref={heroImageRef} ></div>
                                        </div>
                                        <div className="relative z-[2] flex justify-center items-center flex-[0_0_auto] pl-[6vw]" ref={notePanelRef}>
                                          <div className="relative flex w-[25em] flex-col justify-center items-start">
                                              <div className="w-full mb-[2em]" ref={noteImageRef}>
                                                <div className="relative w-full  bg-[50%_50%] bg-cover bg-no-repeat pt-[100%]"></div>
                                              </div>
                                              <p><strong>TOTAL POSSIBLE WEIGHT OF A PREDATOR,</strong>DEPENDS ON THE MASS OF PREY WHICH IS DEPENDENT ON CORNERING VELOCITY.</p>
                                          </div>
                                        </div>
                                        <div className="relative z-[3] w-[200vw] h-screen flex-[0_0_auto]" ref={thanksPanelWrapRef}>
                                          <div className="relative z-[1] flex w-screen h-full justify-start items-start bg-white translate-x-[0%] translate-y-0" ref={thanksPanelRef}>
                                              <div className="relative z-[1] flex w-screen h-full justify-center items-center" ref={thanksPanelContainRef}>
                                                <p className="absolute text-[22em] leading-[0.9] font-normal tracking-[-0.04em] uppercase">Thanks</p>
                                                <div className="mt-[-20.3em] ml-[-46.5em] rotate-[14deg]" ref={thanksImageRef} >
                                                    <div className="relative overflow-hidden w-full pt-[120%]"><Image src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/vatican.jpg" loading="eager" alt="" className="thanks-panel_photo"/></div>
                                                </div>
                                                <div className="-rotate-1 ml-[4.5em] mt-[18.9em]" ref={thanksImageRef}>
                                                    <div className="relative overflow-hidden w-full pt-[120%]"><Image src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/shoab-akhtar.jpg" loading="eager" alt="" className="thanks-panel_photo"/></div>
                                                </div>
                                                <div className="mt-[-22.3em] rotate-[-7deg] ml-[59em]" ref={thanksImageRef}>
                                                    <div className="relative overflow-hidden w-full pt-[120%]">
                                                      <Image src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/canada-bobsleigh.jpg" loading="eager" alt="" className="absolute w-full h-full object-cover scale-[1.4] inset-[0%]"/></div>
                                                </div>
                                              </div>
                                              <div className="-rotate-1 ml-[4.5em] mt-[18.9em]" ref={thanksPanelContainRef}>
                                                <p className="absolute text-[22em] leading-[0.9] font-normal tracking-[-0.04em] uppercase">WE KNOW WHY ITS HARDER TO GO FASTER</p>
                                                <div className="mt-[-20.8em] ml-[-18em]">
                                                    <div className="relative overflow-hidden w-full pt-[120%]"><Image src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/ben-johnson.jpg" loading="eager" alt="" className="thanks-panel_photo"/></div>
                                                </div>
                                                <div className="-rotate-1 ml-[4.5em] mt-[18.9em]" ref={thanksImageRef}>
                                                    <div className="relative overflow-hidden w-full pt-[120%]"><Image src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/nike-air-zoom-victory.jpg" loading="eager" alt="" className="thanks-panel_photo"/></div>
                                                </div>
                                                <div className="mt-[-22.3em] rotate-[-7deg] ml-[59em]" ref={thanksImageRef}>
                                                    <div className="relative overflow-hidden w-full pt-[120%]"><Image src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/sport-olympic-games-princeton-university-usa-1897-the-university-track-field-team-some-of-whom.jpg" loading="eager" alt="" className="absolute w-full h-full object-cover scale-[1.4] inset-[0%]"/></div>
                                                </div>
                                              </div>
                                          </div>
                                        </div>
                                        <div className="relative flex overflow-hidden w-screen h-full justify-center items-center" ref={staggerPanelRef}>
                                          <div className="relative flex w-full h-full justify-center items-center flex-[0_0_auto]" ref={staggerPanelImageRef}>
                                              <Image src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/spectators-at-the-olympic-stadium-in-athens-for-the-1896-games-the-first-modern-olympics.jpg"  alt="" className="w-[14%] mt-[-35%] ml-[-47%]" ref={staggerPanelImageRef}/>
                                              <Image src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/photofinish.jpg"  alt="" className="w-[27%] ml-[-8%] mt-[0%]" ref={staggerPanelImageRef}/>
                                              <Image src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/safak-atalay-9Z-SgyNBlhU-unsplash.jpg"  alt="" className="w-1/5 mt-[-25%] ml-[48%]" ref={staggerPanelImageRef}/>
                                              <Image src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/lu-xiang.jpg" alt="" className="w-[19%] ml-[-49%] mt-[23%]" ref={staggerPanelImageRef}/>
                                              <Image src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/ngongoni.jpg"  alt="" className="w-[14%] mt-[-4%] ml-[22%]" ref={staggerPanelImageRef}/></div>
                                        </div>
                                        <div className="flex w-screen h-full justify-start items-stretch"><Image src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/nils-catholic.jpg"   alt="" className="w-full object-cover"/></div>
                                    </div>
                                  </div>
                              </div>
                            </div> </section>



                                    <section className="max-w-screen-lg mx-auto my-0 px-[2em] py-[8em]" >
                                        <article>
                                            <header className="z-[2] col-[1_/_4]" data-speed="1.25">
                                            <h2 >Tear Shape</h2>
                                            <p> The most aerodynamic shape in the world is fortunately not a theoratical matter but is something we encounter often. Missiles, rockets, fighterjets and any other awesome object you know, 
                                              are not in anyway shaped in a way close enough to the ideal. All the forementioned objects have higher priorities on their list that are more important than being aerodynamic, that, is, to bring destruction. 
                                              The shape of these things depends more on utility, optimising the weight, payload, range, stealth, guidance and the ability to produce them in bulk using the materials provided by the most willing seller 
                                              on an assembly line lined with individuals who either know or are prepared to learn to produce the objects all in time for elections. </p>
                                            </header>
                                            
                                            <div className="relative flex justify-center items-center col-[2_/_-1]">
                                            <div className="image-parent">
                                                            <video className="block max-w-full h-[180%] object-cover opacity-60" data-speed="auto" autoPlay={true} playsInline={true} loop muted preload="auto">
                                                                    <source src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/chigure.mp4" type="video/mp4" />
                                                            </video>
                                            </div>
                                            
                                    
                                            
                                        </div>
                                    </article>
                                </section>

                                     <section class="mb-32 text-[rgba(255,255,255,0.5)] leading-[1.7] m-0">
                                            <section className="stickyTrack" ref={stickyTrackRef}>
                                                  <div className="max-w-[900px] columns-2 gap-12">
                                                    <div className="overflow-hidden rounded-lg">
                                                      <Image alt='bastard' className="max-w-full h-auto object-cover scale-[130%]" data-speed="auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Alula.png/1920px-Alula.png"/>
                                  
                                                    </div>
                                                    <div  ref={stickyElRef}>
                                                      <h1 className='leading-[1.1] mt-0 mb-[0.4em] mx-0'>Bastard Wing</h1>
                                                      <p className='m-0'>The fundamental properties of locomotion in a system filled with air are lift and drag. Birds are able to do as they wish due to the Bastard wing, which is a small projection 
                                                      on the anterior edge of the wing. The same is true for modern fixed aircraft that have leading-edge slats, that are high lift devices used for higher angle of attack flying. Flying is an expensive 
                                                      process, from a thermodynamics perspective. If anyone used the same amount of fuel used by the Concorde during taxi in a single year, they would definately be shamed and arrested, and possibly lose 
                                                      their job and friends. The slats are used during low speed maneouvers to prevent the aircrafting from stalling (becoming stationary). Jet engines can only do one thing, go forward, really fast. If an 
                                                      aeroplane just had engines and no wings, it would definately fly off the ground at some point, and would never touch the ground, given infinite fuel, but would never be able to perform any basic maneouver. 
                                                      To be a bird means to fly, that means older birds should still be able to fly and so should not and cannot become physically weaker. If humans were birds, sport league stars would never retire. 
                                                      How could a bird age when it has to fly ? How can a bird have intracellular oxidative damage when every single electron that passes the electron transport  chain is accounted for ?  To be a bird means to fly,
                                                      and it would be an expensive lifestyle if one had to fly everywhere they want to go. Imagine having to fly to relieve yourself. Having to fly to just say hello to someone. That would suck, and so birds 
                                                      have had to develop the Bastard Wing to stop them from flying away unexpectedly, and to hover around and asses situations. </p>
                                                    </div>
                                                  </div>
                                          </section>
                                            <section className=" h-[calc(100vh_-_5px)]" ref={stickyTrackRef}>
                                                      <div className="max-w-[900px]">
                                                        <div className="stickyEl" ref={stickyElRef}>
                                                          <h1 className='leading-[1.1] mt-0 mb-[0.4em] mx-0'>GSAP Pinning</h1>
                                                          <p className='m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam voluptates quos ullam unde dicta quas, facere nobis architecto accusamus, delectus, veritatis adipisci perferendis repellat? Labore repellendus minima dolore illum obcaecati.</p>
                                                        </div>
                                                      </div>
                                            </section>
                                            <section className="stickyTrack" ref={stickyTrackRef}>
                                                        <div className="max-w-[900px] columns-2 gap-12">
                                                            <div className="stickyEl" ref={stickyElRef}>
                                                            <div className="h-[16vw] w-[16vw] bg-[rgba(255,255,255,0.2)]"></div>
                                                            </div>
                                                            <div className="overflow-hidden rounded-lg">
                                                            <Image className="max-w-full h-auto object-cover scale-[130%]" data-speed="auto" src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/ostrich.jpg" alt='' />
                                                            </div>
                                                        </div>
                                            </section>
                                            <section className="h-[calc(100vh_-_5px)]" ref={stickyTrackRef}>
                                                    <div className="max-w-[900px] margin-inline-start:auto margin-inline-end:auto padding-inline-start: 1.25rem padding-inline-end: 1.25rem">
                                                        <div  ref={stickyElRef}>
                                                        <h1 className='leading-[1.1] mt-0 mb-[0.4em] mx-0'>GSAP Pinning</h1>
                                                        <p className='m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam voluptates quos ullam unde dicta quas, facere nobis architecto accusamus, delectus, veritatis adipisci perferendis repellat? Labore repellendus minima dolore illum obcaecati. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam voluptates quos ullam unde dicta quas, facere nobis architecto accusamus, delectus, veritatis adipisci perferendis repellat? Labore repellendus minima dolore illum obcaecati.</p>
                                                        </div>
                                                    </div>
                                            </section>
                                            <section  ref={stickyTrackRef}>
                                                        <div className="max-w-[900px] margin-inline-start:auto margin-inline-end:auto padding-inline-start: 1.25rem padding-inline-end: 1.25rem columns-2 gap-12">
                                                          <div className="overflow-hidden rounded-lg">
                                                            <video className="max-w-full h-auto object-cover scale-[130%]" data-speed="auto" autoPlay={true} playsInline={true} loop muted preload="auto">
                                                                    <source src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/westindies.mp4" type="video/mp4" />
                                                            </video>

                                                          </div>
                                                          <div  ref={stickyElRef}>
                                                            <h1 className='leading-[1.1] mt-0 mb-[0.4em] mx-0'>GSAP Pinning</h1>
                                                            <p className='m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam voluptates quos ullam unde dicta quas, facere nobis architecto accusamus, delectus, veritatis adipisci perferendis repellat? Labore repellendus minima dolore illum obcaecati.</p>
                                                          </div>
                                                        </div>
                                            </section>
                                            <section className="h-[calc(100vh_-_5px)]" ref={stickyTrackRef}>
                                                <div className="max-w-[900px] margin-inline-start:auto margin-inline-end:auto padding-inline-start: 1.25rem padding-inline-end: 1.25rem  ">
                                                    <div  ref={stickyElRef}>
                                                    <h1 className='leading-[1.1] mt-0 mb-[0.4em] mx-0'>GSAP Pinning</h1>
                                                    <p className='m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam voluptates quos ullam unde dicta quas, facere nobis architecto accusamus, delectus, veritatis adipisci perferendis repellat? Labore repellendus minima dolore illum obcaecati. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam voluptates quos ullam unde dicta quas, facere nobis architecto accusamus, delectus, veritatis adipisci perferendis repellat? Labore repellendus minima dolore illum obcaecati.</p>
                                                    </div>
                                                </div>
                                        </section>
                                                

                                </section>

                            
                                        <section className="max-w-screen-lg mx-auto my-0 px-[2em] py-[8em]" >
                                                    <article>
                                                        <header className="z-[2] col-[1_/_4]" data-speed="1.25">
                                                        <h2 >Våg å lytte,  våg å skifte mening</h2>
                                                        <p>Jerky pastrami strip steak pork chuck. Biltong boudin burgdoggen shankle, short ribs short loin drumstick corned beef rump ribeye filet mignon pork chop. </p>
                                                        </header>
                                                        
                                                        <div className="relative flex justify-center items-center col-[2_/_-1]">
                                                        <div className="image-parent">
                                                        <video className="block max-w-full h-[180%] object-cover opacity-60" data-speed="auto" autoPlay={true} playsInline={true} loop muted preload="auto">
                                                                    <source src="https://raw.githubusercontent.com/ksachikonye/preface-hezvo/main/Men_4x100m.mp4" type="video/mp4" />
                                                            </video>
                                                        </div>
                                                        
                                                    </div>
                                                </article>
                                            </section>

                  


                          
                  </div>
              </div>
     

                   </>
  )
}

