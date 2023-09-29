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



const Lightning = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Lightning), { ssr: false })
const Spine = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Spine), { ssr: false })
const Primates = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Primates), { ssr: false })
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
  return (
    <>
      <div className='mx-auto flex w-full flex-col flex-wrap text-white items-center md:flex-row  lg:w-4/5 bg-[#2d2d2d] antialised'>
        {/* jumbo */}
        <div className='flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left'>
            <TextSlide delay={0.6}>
          <p className='w-full uppercase text-white'>Queit Standing</p>
        </TextSlide>

        <TextSlide delay={0.6}>
        <h1 className='my-4 text-5xl font-bold leading-tight text-white'>Reversed Bullet</h1>
          <p className='mb-8 text-2xl leading-normal'>Stability Estimation through Rembling Trembling.</p>
        </TextSlide>
        </div>
        <section>
                <Parallax/>
        </section>
        <div className='w-full text-center md:w-3/5'>
          <View className='flex h-96 w-full flex-col items-center justify-center'>
            <Suspense fallback={null}>
              <Spine scale={0.8} position={[0, 0, 0]} />
              <Common />
            </Suspense>
          </View>
        </div>
      </div>

      <div className='mx-auto flex w-full flex-col flex-wrap items-center p-12 md:flex-row  lg:w-4/5'>
        {/* first row */}
        <div className='relative h-48 w-full py-6 sm:w-1/2 md:my-12 md:mb-40'>
          <h2 className='mb-3 text-3xl font-bold leading-none text-gray-800'>Events are propagated</h2>
          <p className='mb-8 text-gray-600'>Drag, scroll, pinch, and rotate the canvas to explore the 3D scene.</p>
        </div>
        <div className='relative my-12 h-48 w-full py-6 sm:w-1/2 md:mb-40'>
          <View orbit className='relative h-full  sm:h-48 sm:w-full'>
            <Suspense fallback={null}>
              <Dog scale={2} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
              <Common color={'lightpink'} />
            </Suspense>
          </View>
        </div>
        {/* second row */}
        <div className='relative my-12 h-48 w-full py-6 sm:w-1/2 md:mb-40'>
          <View orbit className='relative h-full animate-bounce sm:h-48 sm:w-full'>
            <Suspense fallback={null}>
              <Duck route='/blob' scale={2} position={[0, -1.6, 0]} />
              <Common color={'lightblue'} />
            </Suspense>
          </View>
        </div>
        <div className='w-full p-6 sm:w-1/2'>
          <h2 className='mb-3 text-3xl font-bold leading-none text-gray-800'>Dom and 3D are synchronized</h2>
          <p className='mb-8 text-gray-600'>
            3D Divs are renderer through the View component. It uses gl.scissor to cut the viewport into segments. You
            tie a view to a tracking div which then controls the position and bounds of the viewport. This allows you to
            have multiple views with a single, performant canvas. These views will follow their tracking elements,
            scroll along, resize, etc.
          </p>
        </div>
      </div>
    </>
  )
}
