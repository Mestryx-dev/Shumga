import { useCallback, useEffect, useReducer, useRef, useState } from 'react'

const GRID = 10
const TICK_MS = 140

type Pos = { x: number; y: number }

type GameState = {
  snake: Pos[]
  apple: Pos
  gameOver: boolean
  score: number
}

/** Arrow keys + WASD + ZQSD (AZERTY) */
function keyToDir(key: string): { dx: number; dy: number } | null {
  switch (key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
    case 'z':
    case 'Z':
      return { dx: 0, dy: -1 }
    case 'ArrowDown':
    case 's':
    case 'S':
      return { dx: 0, dy: 1 }
    case 'ArrowLeft':
    case 'a':
    case 'A':
    case 'q':
    case 'Q':
      return { dx: -1, dy: 0 }
    case 'ArrowRight':
    case 'd':
    case 'D':
      return { dx: 1, dy: 0 }
    default:
      return null
  }
}

function randomApple(snake: Pos[]): Pos {
  const occupied = new Set(snake.map((p) => `${p.x},${p.y}`))
  for (let n = 0; n < 400; n++) {
    const x = Math.floor(Math.random() * GRID)
    const y = Math.floor(Math.random() * GRID)
    if (!occupied.has(`${x},${y}`)) return { x, y }
  }
  return { x: 0, y: 0 }
}

function initialSnake(): Pos[] {
  const mid = Math.floor(GRID / 2)
  return [
    { x: mid + 1, y: mid },
    { x: mid, y: mid },
    { x: mid - 1, y: mid },
  ]
}

function initialState(): GameState {
  const snake = initialSnake()
  return {
    snake,
    apple: randomApple(snake),
    gameOver: false,
    score: 0,
  }
}

type Action =
  | { type: 'tick'; dir: { dx: number; dy: number } }
  | { type: 'reset' }

function gameReducer(state: GameState, action: Action): GameState {
  if (action.type === 'reset') return initialState()

  if (state.gameOver) return state

  const { dx, dy } = action.dir
  const head = state.snake[0]
  // Wrap around edges (no walls — exit one side, enter the opposite)
  const nextHead = {
    x: (head.x + dx + GRID) % GRID,
    y: (head.y + dy + GRID) % GRID,
  }

  const hitSelf = state.snake.some(
    (p) => p.x === nextHead.x && p.y === nextHead.y,
  )
  if (hitSelf) {
    return { ...state, gameOver: true }
  }

  const ate =
    nextHead.x === state.apple.x && nextHead.y === state.apple.y
  const nextSnake = ate
    ? [nextHead, ...state.snake]
    : [nextHead, ...state.snake.slice(0, -1)]

  if (ate) {
    return {
      snake: nextSnake,
      apple: randomApple(nextSnake),
      gameOver: false,
      score: state.score + 1,
    }
  }

  return {
    ...state,
    snake: nextSnake,
  }
}

function SnakeDirButton({
  symbol,
  ariaLabel,
  dx,
  dy,
  disabled,
  onDir,
  className = '',
}: {
  symbol: string
  ariaLabel: string
  dx: number
  dy: number
  disabled: boolean
  onDir: (dx: number, dy: number) => void
  className?: string
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onDir(dx, dy)}
      className={`touch-manipulation flex min-h-11 min-w-11 select-none items-center justify-center rounded-sm border-2 border-neon-cyan/50 bg-void/90 font-body text-xl leading-none text-neon-cyan shadow-[inset_0_0_12px_rgba(0,0,0,0.4)] transition hover:border-coin hover:text-coin active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 md:min-h-12 md:min-w-12 md:text-2xl ${className}`}
    >
      {symbol}
    </button>
  )
}

export function SnakeGame() {
  const [state, dispatch] = useReducer(gameReducer, undefined, initialState)
  const dirRef = useRef({ dx: 1, dy: 0 })
  const pendingDirRef = useRef<{ dx: number; dy: number } | null>(null)
  const [paused, setPaused] = useState(false)
  const controlsRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const gameOverRef = useRef(state.gameOver)
  const pausedRef = useRef(paused)

  useEffect(() => {
    gameOverRef.current = state.gameOver
    pausedRef.current = paused
  }, [state.gameOver, paused])

  const reset = useCallback(() => {
    dirRef.current = { dx: 1, dy: 0 }
    pendingDirRef.current = null
    dispatch({ type: 'reset' })
  }, [])

  const queueDirection = useCallback((dx: number, dy: number) => {
    if (gameOverRef.current || pausedRef.current) return
    pendingDirRef.current = { dx, dy }
  }, [])

  const tick = useCallback(() => {
    if (state.gameOver || paused) return

    const d = pendingDirRef.current ?? dirRef.current
    pendingDirRef.current = null
    const cur = dirRef.current
    if (!(d.dx === -cur.dx && d.dy === -cur.dy)) {
      dirRef.current = d
    }

    dispatch({
      type: 'tick',
      dir: dirRef.current,
    })
  }, [state.gameOver, paused])

  useEffect(() => {
    const id = window.setInterval(tick, TICK_MS)
    return () => window.clearInterval(id)
  }, [tick])

  useEffect(() => {
    const onVis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  // Keyboard: only when focus/event target is inside the play area (grid + D-pad)
  useEffect(() => {
    const root = controlsRef.current
    if (!root) return

    const handler = (e: KeyboardEvent) => {
      if (gameOverRef.current || pausedRef.current) return
      const t = e.target as Node | null
      if (!t || !root.contains(t)) return
      if (e.key === 'Escape') {
        e.preventDefault()
        ;(e.target as HTMLElement).blur?.()
        return
      }
      const dir = keyToDir(e.key)
      if (!dir) return
      e.preventDefault()
      pendingDirRef.current = dir
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const focusGrid = useCallback(() => {
    gridRef.current?.focus()
  }, [])

  const snakeIndex = new Map<string, number>()
  state.snake.forEach((p, i) => snakeIndex.set(`${p.x},${p.y}`, i))

  const controlsDisabled = state.gameOver || paused

  return (
    <div className="pixel-border rounded-sm border border-neon-magenta/30 bg-ridge/50 p-5 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-pixel text-[0.6rem] text-neon-magenta md:text-[0.7rem]">
          SNAKE
        </h3>
        <div className="flex flex-wrap items-center gap-3 font-body text-lg text-mist">
          <span>Score : {state.score}</span>
          <button
            type="button"
            onClick={reset}
            className="rounded-sm border border-coin/60 bg-coin/15 px-3 py-1.5 text-coin transition hover:bg-coin/25"
          >
            Rejouer
          </button>
        </div>
      </div>

      <div ref={controlsRef} className="space-y-4">
        <p className="font-body text-base text-mist/90" aria-live="polite">
          {state.gameOver
            ? 'Game over — Rejouer pour recommencer.'
            : paused
              ? 'Pause (onglet en arrière-plan).'
              : 'Sans murs : tu réapparais de l’autre côté. Flèches / WASD / ZQSD · Pavé · Échap libère le focus.'}
        </p>

        <div
          ref={gridRef}
          tabIndex={0}
          role="application"
          aria-label="Snake sans murs : les bords téléportent de l’autre côté. Flèches, WASD ou ZQSD."
          onClick={focusGrid}
          className="mx-auto w-fit cursor-pointer rounded-sm border-2 border-neon-cyan/40 p-2 outline-none focus-visible:ring-2 focus-visible:ring-coin focus-visible:ring-offset-2 focus-visible:ring-offset-void"
        >
          <div
            className="grid gap-0.5 bg-void/90 p-1"
            style={{
              gridTemplateColumns: `repeat(${GRID}, minmax(0, 1fr))`,
              width: 'min(72vw, 280px)',
            }}
          >
            {Array.from({ length: GRID * GRID }, (_, i) => {
              const x = i % GRID
              const y = Math.floor(i / GRID)
              const si = snakeIndex.get(`${x},${y}`)
              const isHead = si === 0
              const isApple = state.apple.x === x && state.apple.y === y
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-[1px] border border-white/5 ${
                    isApple
                      ? 'bg-coin shadow-[0_0_10px_rgba(255,217,61,0.5)]'
                      : si !== undefined
                        ? isHead
                          ? 'bg-neon-cyan shadow-[0_0_8px_rgba(34,211,238,0.45)]'
                          : 'bg-neon-magenta/80'
                        : 'bg-depth/80'
                  }`}
                />
              )
            })}
          </div>
        </div>

        <div
          className="mx-auto flex w-fit flex-col items-center gap-1"
          role="group"
          aria-label="Contrôles directionnels"
        >
          <SnakeDirButton
            symbol="↑"
            ariaLabel="Haut"
            dx={0}
            dy={-1}
            disabled={controlsDisabled}
            onDir={queueDirection}
            className="w-14 md:w-16"
          />
          <div className="flex gap-1">
            <SnakeDirButton
              symbol="←"
              ariaLabel="Gauche"
              dx={-1}
              dy={0}
              disabled={controlsDisabled}
              onDir={queueDirection}
            />
            <SnakeDirButton
              symbol="↓"
              ariaLabel="Bas"
              dx={0}
              dy={1}
              disabled={controlsDisabled}
              onDir={queueDirection}
            />
            <SnakeDirButton
              symbol="→"
              ariaLabel="Droite"
              dx={1}
              dy={0}
              disabled={controlsDisabled}
              onDir={queueDirection}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
