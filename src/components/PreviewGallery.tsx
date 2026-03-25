import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { RETRO_GALLERY } from '../constants/media'
import { fadeUpHidden, fadeUpTransition, fadeUpVisible } from '../lib/motion'

export function PreviewGallery() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['4%', '-52%'])

  return (
    <section
      ref={sectionRef}
      id="apercu"
      className="relative bg-void px-0 py-16 md:py-24"
      aria-labelledby="preview-heading"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={reduce ? false : fadeUpHidden}
          whileInView={reduce ? undefined : fadeUpVisible}
          viewport={{ once: true, margin: '-80px' }}
          transition={fadeUpTransition}
          className="mb-4"
        >
          <p className="font-pixel text-[0.55rem] text-neon-cyan md:text-[0.65rem]">
            STAGE SELECT — SCROLL TO PAN
          </p>
          <h2
            id="preview-heading"
            className="mt-3 font-display text-3xl font-bold text-snow md:text-5xl"
          >
            Galerie screenshot
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-mist md:text-xl">
            Défile : la scène défile comme un bon beat ’em up. Images réelles
            (arcade, setup, néons) — remplace-les par tes captures quand tu veux
            flex.
          </p>
        </motion.div>
      </div>

      {reduce ? (
        <div className="mt-10 grid grid-cols-1 gap-4 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-3">
          {RETRO_GALLERY.map((item) => (
            <figure
              key={item.id}
              className="pixel-border overflow-hidden rounded-sm border border-white/10 bg-ridge/40"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                  width={900}
                  height={675}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="border-t border-white/10 bg-void/80 px-4 py-3 font-pixel text-[0.5rem] text-coin md:text-[0.55rem]">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="relative mt-12 h-[165vh] md:h-[200vh]">
          <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden py-8">
            <motion.div
              style={{ x }}
              className="flex w-max gap-5 px-5 md:gap-8 md:px-10"
            >
              {RETRO_GALLERY.map((item, i) => (
                <motion.figure
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.92, x: 40 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="pixel-border w-[min(78vw,340px)] shrink-0 overflow-hidden rounded-sm border border-white/15 bg-ridge/60 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] md:w-[min(42vw,420px)]"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <motion.img
                      src={item.src}
                      alt={item.alt}
                      className="h-full w-full object-cover"
                      width={900}
                      height={675}
                      loading="lazy"
                      decoding="async"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.35 }}
                    />
                  </div>
                  <figcaption className="flex items-center justify-between gap-2 border-t border-neon-cyan/20 bg-void/90 px-4 py-3">
                    <span className="font-pixel text-[0.5rem] text-neon-magenta md:text-[0.55rem]">
                      {item.caption}
                    </span>
                    <span className="font-pixel text-[0.45rem] text-neon-green">
                      LVL {i + 1}
                    </span>
                  </figcaption>
                </motion.figure>
              ))}
              {/* Duplicate set for wider scroll path illusion */}
              {RETRO_GALLERY.map((item) => (
                <motion.figure
                  key={`${item.id}-b`}
                  className="pixel-border hidden w-[min(78vw,340px)] shrink-0 overflow-hidden rounded-sm border border-white/15 bg-ridge/60 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] lg:block md:w-[min(42vw,420px)]"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.src}
                      alt=""
                      className="h-full w-full object-cover"
                      width={900}
                      height={675}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <figcaption className="border-t border-neon-cyan/20 bg-void/90 px-4 py-3 font-pixel text-[0.5rem] text-mist md:text-[0.55rem]">
                    {item.caption} +
                  </figcaption>
                </motion.figure>
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </section>
  )
}
