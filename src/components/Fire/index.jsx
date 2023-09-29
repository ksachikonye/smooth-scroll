'use client'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'
import { useLayoutEffect, useRef, Suspense } from 'react'
import glsl from 'babel-plugin-glsl/macro'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { extend, useFrame, useLoader, Canvas } from '@react-three/fiber'

export default function Fire() {
  const content = useRef();
  const wrapper = useRef();
  const canvasRef= useRef();
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
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
  
     lenis.on('scroll', () => ScrollTrigger.update());
  
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
  
    }, [wrapper])
  useLayoutEffect(() => {

      ScrollSmoother.create({
          smooth: 5, // seconds it takes to "catch up" to native scroll position
          effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
          normalizeScroll: true, // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
          ignoreMobileResize: true, // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
          preventDefault: true
        
        });

      ScrollTrigger.create({
        trigger: canvasRef.current,
        start: "top top+=100",
        endTrigger: "html",
        pin: true,
        pinSpacing: false,
        markers: true,
        scrub: false,
      });
   

  }, [wrapper]);


  return (
    
<div className="box-border m-0 p-0 " ref={wrapper}>
  <div className="h-screen relative text-lg m-0 px-8 py-0" ref={content}>

  <div className="h-screen relative text-lg m-0">
    <section className="h-screen">
       <Canvas camera={{ position: [0, -4, 5], fov: 45 }} className="fixed inline-block -ml-44 w-64 h-40 bg-cover  h-screen w-[50vw] flex-[0_0_50%] z-[1] flex items-end justify-end font-serif text-xl font-medium leading-8 text-zinc-700">
    <h2 className="text-[white] font-[normal] text-[1.2em] text-right ml-[50%] mr-5 mt-0 mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem exercitationem sapiente accusamus eveniet ut deserunt minus magnam repellendus quasi natus!</h2>

      <Suspense fallback={null}>
        <Fire scale={7} />
      </Suspense>
      <OrbitControls />
    </Canvas>
      
    </section>
    <section className="h-screen">
 <div className="text-[1.5vw] font-[normal] text-[rgba(0,0,0,0.7)]">
    <h1 className='text-[7vw] text-right leading-none'>The Dream Dies Hard</h1>
    <h2 className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto officia debitis rem error hic velit, non, aliquid dignissimos harum nobis.</h2>
    <article>
      <p className="font-serif text-sm font-medium leading-7 text-zinc-700">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil praesentium, aperiam. Nemo, dolores, recusandae! Voluptas nam quisquam repudiandae eaque ea nisi sequi! Iste, ducimus dolore laudantium, quasi ex repellat fugit reiciendis nam perspiciatis. Illum cupiditate commodi possimus reiciendis odit voluptas necessitatibus ut molestias? Iste, ex, est. Voluptas facilis impedit quasi temporibus. Nostrum tempore qui consectetur dicta repellat facilis neque ullam, praesentium molestias repellendus eligendi ab quia, veniam voluptates quisquam? Consequatur cum adipisci perspiciatis molestiae a quo ipsam eligendi quas aliquam esse natus tempore, aperiam accusamus iusto velit. Rerum culpa tenetur laborum quasi similique unde iure. Quae, eum unde cum sint aliquam at porro voluptate ipsa. Incidunt necessitatibus provident, assumenda obcaecati. </p>
      <p className="font-serif text-sm font-medium leading-7 text-zinc-700">Ab corporis rerum incidunt quasi velit quod natus est perferendis maiores, eum perspiciatis error quis dolorem mollitia totam dolores officiis delectus, ut aut? Quis repudiandae iure quam maxime unde sed officiis impedit autem aut optio aspernatur nam natus odio quisquam, facere architecto? Quo animi nesciunt ex voluptatum nulla, pariatur itaque beatae, voluptates porro saepe a adipisci! Necessitatibus in quam earum, harum excepturi molestiae laboriosam mollitia deserunt quia dolorum tempore eveniet obcaecati impedit nam eius distinctio unde. Numquam nesciunt voluptas in suscipit tempore, consequatur id asperiores repellat molestias a, iste perferendis cum rerum. Eligendi dolor in nobis. Repudiandae ipsum maiores quibusdam. Temporibus a doloremque magni, eos, aliquid sed molestias fugit dignissimos voluptate asperiores suscipit distinctio ab, officiis iusto natus vitae voluptatum deleniti modi quibusdam placeat veritatis fugiat quas ea sit! Veritatis enim soluta consequatur culpa fugit quo vitae, beatae repellat fuga doloremque quae repudiandae perspiciatis deleniti expedita est quisquam assumenda alias. Ducimus saepe laudantium non deserunt, odio optio temporibus, mollitia, aut dolor recusandae quae accusantium dolore possimus quod placeat nulla beatae numquam, totam magni inventore perspiciatis veniam commodi maxime voluptates!</p>
      <p className="text-[1.8em] text-[rgba(0,0,0,0.6)] px-0 py-5 border-y-[#aaa] border-t border-solid border-b">Ducimus saepe laudantium non deserunt, odio optio temporibus, mollitia, aut dolor recusandae quae accusantium dolore possimus quod placeat nulla beatae numquam, totam magni inventore perspiciatis veniam commodi maxime voluptates!</p>
      <p>Dicta quia reprehenderit laborum, delectus, laudantium accusantium aspernatur odit atque molestias magnam ipsum! Qui dolor quas neque laborum accusamus architecto repellendus ullam, inventore incidunt. Voluptates quibusdam quod, natus autem, tempora reiciendis tenetur rerum eligendi eum officiis illum voluptate ut pariatur maxime, voluptas numquam quos accusantium blanditiis quasi asperiores. Maiores temporibus accusamus voluptatem ipsa, ipsam doloribus earum? Enim cum odio eaque a velit nobis perspiciatis nostrum voluptas ad deleniti iusto optio, aspernatur corrupti libero modi at in maxime magnam ut, aliquid ea! Aspernatur aliquam iusto non officiis ab eligendi, ipsam atque ullam ex! Placeat ratione necessitatibus, laudantium dolorem rerum, aperiam error nihil atque nostrum aut eligendi nemo, mollitia dignissimos quas, facere. Minus voluptatum consequuntur quasi, nostrum ipsam dignissimos consequatur blanditiis iste, numquam sed minima vel esse excepturi! Minus, maxime. Alias corrupti rem tempora dolorem aliquid voluptatum iure non provident dignissimos quisquam, quis veniam, molestias numquam quo vitae magnam assumenda, fugit itaque nihil cumque. Distinctio necessitatibus consectetur iusto perspiciatis, explicabo odio optio, quam, eum debitis ullam ab facilis dolorum corrupti consequatur eveniet quos quas nam. Mollitia vel facilis possimus deserunt illo, minima totam aut, in voluptas ipsum quos, dolores! Fugit nihil et quos soluta neque sed, labore eaque iure. Tempore provident eius, expedita veritatis officiis enim similique adipisci obcaecati temporibus autem atque eos quidem a ipsum, nihil voluptates deserunt illo sunt! Necessitatibus maxime deleniti cupiditate libero ut, impedit voluptas veritatis mollitia assumenda. Soluta aut obcaecati maiores, beatae commodi odit maxime mollitia, culpa quidem quos eos magni nesciunt totam qui, dolore, reiciendis reprehenderit sit quas facilis doloribus corporis non ut. Ipsa libero ducimus vel cupiditate illum possimus in unde blanditiis! Veniam recusandae fugiat ex assumenda in sint error nostrum quibusdam eius molestias! Architecto eum saepe molestias eos molestiae, delectus excepturi, accusantium fugiat, a non minus sed maxime. Omnis labore corrupti iusto, quidem maiores, ad, culpa vel voluptatibus sed fugit numquam alias pariatur excepturi laboriosam at. Et quasi beatae nisi enim architecto atque, magnam molestiae doloremque, officiis dolores at hic ut soluta veritatis vel dolorum aliquam alias quae harum autem quidem qui. </p>
      <p className="font-serif text-sm font-medium leading-7 text-zinc-700">Aliquam nam voluptatibus asperiores ipsam facilis similique, deserunt inventore dignissimos neque voluptas, autem ipsa possimus beatae officiis quas dolores non accusamus eius aut accusantium repudiandae distinctio optio, excepturi voluptatem? Sint fugiat repudiandae voluptates officia odio ex cum! Ducimus atque aspernatur iusto culpa non libero quisquam doloremque. Laboriosam ad laudantium, sunt sed vitae necessitatibus consectetur debitis cumque explicabo, quaerat aspernatur eaque delectus maiores dolore sequi amet dolorem distinctio! Sit tenetur, porro cumque, dolor placeat dolore ea voluptatibus delectus excepturi! Iure tenetur, nihil ipsum autem nesciunt earum ab delectus, iste rerum minima provident hic veniam quisquam exercitationem, a, beatae voluptatem quibusdam consequuntur quasi aperiam minus cum consectetur! Omnis magni asperiores quis et nobis ipsa at, quam voluptate porro enim, animi. Nesciunt deleniti facere iusto iste ad officiis earum? Repellendus nesciunt aut dolores tempora, sapiente quod quas cumque voluptatum quae, corporis culpa illum tempore a dolor ex laboriosam cupiditate velit officia. A dolores nisi, est voluptatibus adipisci ipsum aut nulla autem ratione quia corporis repellat facere. Quo eligendi sint in molestiae, perspiciatis assumenda reiciendis ex quis? Nihil porro, rem quas illo eius ab veniam, itaque expedita, facilis fugiat quibusdam facere et saepe. Et facere amet reiciendis ratione accusamus necessitatibus, ex voluptatem deserunt modi, repudiandae laboriosam numquam quam illum atque placeat voluptas ea ipsam temporibus dolores. </p>
      <p className="font-serif text-sm font-medium leading-7 text-zinc-700">Voluptate accusamus itaque, iure mollitia consectetur dicta fugit ipsam nemo saepe minus, est ut totam eligendi nobis corrupti pariatur praesentium quos voluptatibus. Nulla cum amet mollitia eligendi modi provident expedita enim accusantium harum cumque dolorem, officiis illum molestias voluptate. Ullam perspiciatis sapiente blanditiis assumenda facilis fugiat, voluptate similique illum facere amet quis vel distinctio voluptatibus, veritatis culpa asperiores error maiores laudantium ea enim eos explicabo! Aperiam vitae sapiente laborum soluta nostrum debitis repellat perspiciatis, minus officiis nihil molestiae, enim architecto pariatur illum earum ipsum, nemo optio delectus! Quis soluta quos alias, nemo totam, quisquam, ratione illo quod, recusandae reprehenderit amet eveniet aut quaerat sequi aperiam tempora voluptas blanditiis quo incidunt. Deserunt, incidunt inventore minima praesentium explicabo vel nostrum porro optio voluptas ut cupiditate enim vitae perspiciatis sunt aliquid, consequatur consequuntur sint dolor. Omnis voluptatem, ab quasi neque alias officiis rerum sunt ducimus voluptate voluptas possimus iure perspiciatis repellendus maxime placeat ullam cupiditate suscipit nam autem eligendi dolores! Deleniti doloremque dolore odio.</p>
    </article>
  </div>
    </section>
  </div>

</div>
</div>

  )
}

class FireMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      defines: { ITERATIONS: '10', OCTIVES: '3' },
      uniforms: {
        fireTex: { type: 't', value: null },
        color: { type: 'c', value: null },
        time: { type: 'f', value: 0.0 },
        seed: { type: 'f', value: 0.0 },
        invModelMatrix: { type: 'm4', value: null },
        scale: { type: 'v3', value: null },
        noiseScale: { type: 'v4', value: new THREE.Vector4(1, 2, 1, 0.3) },
        magnitude: { type: 'f', value: 2.5 },
        lacunarity: { type: 'f', value: 3.0 },
        gain: { type: 'f', value: 0.6 }
      },
      vertexShader: `
        varying vec3 vWorldPos;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
        }`,
      fragmentShader: glsl`
        #pragma glslify: snoise = require(glsl-noise/simplex/3d.glsl) 

        uniform vec3 color;
        uniform float time;
        uniform float seed;
        uniform mat4 invModelMatrix;
        uniform vec3 scale;
        uniform vec4 noiseScale;
        uniform float magnitude;
        uniform float lacunarity;
        uniform float gain;
        uniform sampler2D fireTex;
        varying vec3 vWorldPos;              

        float turbulence(vec3 p) {
          float sum = 0.0;
          float freq = 1.0;
          float amp = 1.0;
          for(int i = 0; i < OCTIVES; i++) {
            sum += abs(snoise(p * freq)) * amp;
            freq *= lacunarity;
            amp *= gain;
          }
          return sum;
        }

        vec4 samplerFire (vec3 p, vec4 scale) {
          vec2 st = vec2(sqrt(dot(p.xz, p.xz)), p.y);
          if(st.x <= 0.0 || st.x >= 1.0 || st.y <= 0.0 || st.y >= 1.0) return vec4(0.0);
          p.y -= (seed + time) * scale.w;
          p *= scale.xyz;
          st.y += sqrt(st.y) * magnitude * turbulence(p);
          if(st.y <= 0.0 || st.y >= 1.0) return vec4(0.0);
          return texture2D(fireTex, st);
        }

        vec3 localize(vec3 p) {
          return (invModelMatrix * vec4(p, 1.0)).xyz;
        }

        void main() {
          vec3 rayPos = vWorldPos;
          vec3 rayDir = normalize(rayPos - cameraPosition);
          float rayLen = 0.0288 * length(scale.xyz);
          vec4 col = vec4(0.0);
          for(int i = 0; i < ITERATIONS; i++) {
            rayPos += rayDir * rayLen;
            vec3 lp = localize(rayPos);
            lp.y += 0.5;
            lp.xz *= 2.0;
            col += samplerFire(lp, noiseScale);
          }
          col.a = col.r;
          gl_FragColor = col;
        }`
    })
  }
}

extend({ FireMaterial })

function Fire({ color, ...props }) {
  const ref = useRef()
  const texture = useLoader(THREE.TextureLoader, '/fire.png')
  useFrame((state) => {
    const invModelMatrix = ref.current.material.uniforms.invModelMatrix.value
    ref.current.updateMatrixWorld()
    invModelMatrix.copy(ref.current.matrixWorld).invert()
    ref.current.material.uniforms.time.value = state.clock.elapsedTime
    ref.current.material.uniforms.invModelMatrix.value = invModelMatrix
    ref.current.material.uniforms.scale.value = ref.current.scale
  })
  useLayoutEffect(() => {
    texture.magFilter = texture.minFilter = THREE.LinearFilter
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping
    ref.current.material.uniforms.fireTex.value = texture
    ref.current.material.uniforms.color.value = color || new THREE.Color(0xeeeeee)
    ref.current.material.uniforms.invModelMatrix.value = new THREE.Matrix4()
    ref.current.material.uniforms.scale.value = new THREE.Vector3(1, 1, 1)
    ref.current.material.uniforms.seed.value = Math.random() * 19.19
  }, [])
  return (
    <mesh ref={ref} {...props}>
      <boxGeometry />
      <fireMaterial transparent depthWrite={false} depthTest={false} />
    </mesh>
  )
}













