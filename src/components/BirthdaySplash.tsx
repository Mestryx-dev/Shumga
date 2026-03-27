import confetti from 'canvas-confetti'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { trapTabKey } from '../lib/focusTrap'

function isMarch27(): boolean {
  const d = new Date()
  return d.getMonth() === 2 && d.getDate() === 27
}

const COLORS = ['#22d3ee', '#e879f9', '#ffd93d', '#4ade80', '#a78bfa', '#fb7185']

function runCelebrationBursts(fire: confetti.CreateTypes, reduceMotion: boolean) {
  if (reduceMotion) return () => {}

  const end = Date.now() + 4500
  const timers: number[] = []

  const burst = (opts: confetti.Options) => {
    void fire({
      ...opts,
      colors: COLORS,
      disableForReducedMotion: true,
    })
  }

  burst({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.55, x: 0.5 },
    startVelocity: 45,
    scalar: 1.1,
  })

  timers.push(
    window.setTimeout(() => {
      burst({ particleCount: 80, angle: 60, spread: 65, origin: { x: 0, y: 0.65 } })
      burst({ particleCount: 80, angle: 120, spread: 65, origin: { x: 1, y: 0.65 } })
    }, 280),
  )

  timers.push(
    window.setTimeout(() => {
      burst({
        particleCount: 100,
        spread: 160,
        origin: { x: 0.5, y: 0.35 },
        startVelocity: 35,
        ticks: 200,
        gravity: 0.9,
      })
    }, 520),
  )

  let frame: number
  const tickSides = () => {
    if (Date.now() > end) return
    burst({
      particleCount: 3,
      angle: 60,
      spread: 48,
      origin: { x: 0, y: Math.random() * 0.4 + 0.2 },
      startVelocity: 38,
      gravity: 1.05,
      scalar: 0.9,
    })
    burst({
      particleCount: 3,
      angle: 120,
      spread: 48,
      origin: { x: 1, y: Math.random() * 0.4 + 0.2 },
      startVelocity: 38,
      gravity: 1.05,
      scalar: 0.9,
    })
    frame = requestAnimationFrame(tickSides)
  }
  frame = requestAnimationFrame(tickSides)

  return () => {
    timers.forEach(clearTimeout)
    cancelAnimationFrame(frame)
    fire.reset()
  }
}

const title = 'JOYEUX ANNIVERSAIRE'
const titleWords = title.split(' ')

function AnimatedBirthdayTitle({ words }: { words: string[] }) {
  let letterIndex = 0
  return (
    <span className="flex w-full max-w-full flex-col items-center gap-y-0.5 sm:gap-y-1">
      {words.map((word, wi) => (
        <span
          key={`${word}-${wi}`}
          className="inline-flex max-w-full flex-nowrap justify-center gap-0 [letter-spacing:-0.03em]"
        >
          {word.split('').map((ch, li) => {
            const i = letterIndex++
            return (
              <motion.span
                key={`${wi}-${li}`}
                className="inline-block bg-linear-to-b from-snow via-neon-cyan to-neon-magenta bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(232,121,249,0.35)]"
                initial={{ opacity: 0, y: 28, rotate: -6 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{
                  delay: 0.06 + i * 0.035,
                  type: 'spring',
                  stiffness: 380,
                  damping: 18,
                }}
              >
                {ch}
              </motion.span>
            )
          })}
        </span>
      ))}
    </span>
  )
}

export function BirthdaySplash() {
  const reduce = useReducedMotion() ?? false
  const titleId = useId()
  const descId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const [open, setOpen] = useState(() => isMarch27())

  const dismiss = useCallback(() => {
    setOpen(false)
  }, [])

  /* Lock scroll + compensate scrollbar (APG modal). */
  useEffect(() => {
    if (!open) return
    const html = document.documentElement
    const body = document.body
    const prevHtml = html.style.overflow
    const prevBody = body.style.overflow
    const prevPr = body.style.paddingRight
    const gap = window.innerWidth - html.clientWidth
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`
    return () => {
      html.style.overflow = prevHtml
      body.style.overflow = prevBody
      body.style.paddingRight = prevPr
    }
  }, [open])

  /* Inert underlay: background not focusable / not in accessibility tree (WCAG). */
  useEffect(() => {
    if (!open) return
    const underlay = document.getElementById('shumga-underlay')
    underlay?.setAttribute('inert', '')
    return () => underlay?.removeAttribute('inert')
  }, [open])

  /* Focus: store trigger, move into dialog, restore on close. */
  useEffect(() => {
    if (!open) return
    returnFocusRef.current = document.activeElement as HTMLElement | null
    const id = window.requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      window.cancelAnimationFrame(id)
      const el = returnFocusRef.current
      returnFocusRef.current = null
      if (el?.isConnected && typeof el.focus === 'function') {
        try {
          el.focus()
        } catch {
          /* ignore */
        }
      }
    }
  }, [open])

  /* Confetti on embedded canvas (above backdrop, below card). */
  useEffect(() => {
    if (!open || reduce) return
    const canvas = confettiCanvasRef.current
    if (!canvas) return
    const fire = confetti.create(canvas, { resize: true })
    return runCelebrationBursts(fire, false)
  }, [open, reduce])

  /* Escape + Tab trap (APG dialog modal). */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        dismiss()
        return
      }
      const root = dialogRef.current
      if (root && e.key === 'Tab') trapTabKey(e, root)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, dismiss])

  if (!isMarch27()) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
          className="fixed inset-0 z-[250] flex items-center justify-center overflow-x-hidden overflow-y-auto p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.2 : 0.45 }}
        >
          <motion.div
            role="presentation"
            className="birthday-backdrop absolute inset-0 z-0 cursor-default bg-void/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            aria-hidden
          />

          <canvas
            ref={confettiCanvasRef}
            className="pointer-events-none absolute inset-0 z-[5] h-full w-full min-h-[100dvh]"
            aria-hidden
          />

          <motion.div
            className="@container/bday pointer-events-auto relative z-10 my-auto w-full min-w-0 max-w-2xl text-center"
            initial={reduce ? false : { scale: 0.85, y: 40, opacity: 0 }}
            animate={reduce ? undefined : { scale: 1, y: 0, opacity: 1 }}
            exit={reduce ? undefined : { scale: 0.95, y: 20, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 22,
            }}
          >
            <div className="pixel-border relative overflow-visible rounded-sm border-2 border-neon-magenta/50 bg-linear-to-br from-ridge/95 via-depth to-void px-4 py-10 shadow-[0_0_80px_-10px_rgba(232,121,249,0.45),0_0_120px_-20px_rgba(34,211,238,0.25)] sm:px-8 sm:py-12 md:px-12 md:py-14 lg:px-14 lg:py-16">
              <div
                className="pointer-events-none absolute -left-1/4 top-0 h-64 w-[150%] bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,217,61,0.2),transparent_55%)]"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(232,121,249,0.12),transparent_45%)]"
                aria-hidden
              />

              <p className="mb-3 font-pixel text-[0.5rem] leading-relaxed text-coin md:text-[0.6rem]">
                SHUMGA · 27 MARS · 2026 MODE
              </p>

              <h2
                id={titleId}
                className="text-balance font-display text-[clamp(1.125rem,0.42rem+5.75cqw,2.3rem)] font-extrabold leading-[1.06] tracking-tight text-snow"
              >
                {reduce ? title : <AnimatedBirthdayTitle words={titleWords} />}
              </h2>

              <motion.p
                id={descId}
                className="mt-6 max-w-prose font-body text-lg leading-snug text-mist md:mx-auto md:text-xl"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.5 }}
              >
                Une journée légendaire — profite à fond, et garde le high score de la
                joie.
              </motion.p>

              <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <motion.button
                  ref={closeRef}
                  type="button"
                  onClick={dismiss}
                  className="shumga-focus inline-flex min-h-12 min-w-[12rem] items-center justify-center rounded-sm border-2 border-coin bg-coin px-10 py-3 font-body text-xl font-bold uppercase tracking-wide text-void shadow-[0_0_40px_-6px_rgba(255,217,61,0.65)] transition hover:bg-coin-hot hover:shadow-[0_0_52px_-4px_rgba(255,217,61,0.85)]"
                  initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                  animate={reduce ? undefined : { opacity: 1, scale: 1 }}
                  transition={{ delay: 1.02, type: 'spring', stiffness: 400, damping: 22 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                >
                  C’est parti !
                </motion.button>
                <motion.button
                  type="button"
                  onClick={dismiss}
                  className="shumga-focus font-body text-lg text-neon-cyan/90 underline decoration-neon-cyan/40 underline-offset-4 transition hover:text-snow hover:decoration-neon-cyan"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={reduce ? undefined : { opacity: 1 }}
                  transition={{ delay: 1.08, duration: 0.35 }}
                >
                  Fermer
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
