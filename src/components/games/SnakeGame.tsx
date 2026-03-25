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

function keyToDir(key: string): { dx: number; dy: number } | null {
  switch (key) {
    case 'ArrowUp':
      return { dx: 0, dy: -1 }
    case 'ArrowDown':
      return { dx: 0, dy: 1 }
    case 'ArrowLeft':
      return { dx: -1, dy: 0 }
    case 'ArrowRight':
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
  const nextHead = { x: head.x + dx, y: head.y + dy }

  if (
    nextHead.x < 0 ||
    nextHead.x >= GRID ||
    nextHead.y < 0 ||
    nextHead.y >= GRID
  ) {
    return { ...state, gameOver: true }
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

export function SnakeGame() {
  const [state, dispatch] = useReducer(gameReducer, undefined, initialState)
  const dirRef = useRef({ dx: 1, dy: 0 })
  const pendingDirRef = useRef<{ dx: number; dy: number } | null>(null)
  const [paused, setPaused] = useState(false)

  const reset = useCallback(() => {
    dirRef.current = { dx: 1, dy: 0 }
    pendingDirRef.current = null
    dispatch({ type: 'reset' })
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

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        const el = e.currentTarget as HTMLElement
        el.blur()
        return
      }
      const dir = keyToDir(e.key)
      if (!dir) return
      e.preventDefault()
      if (state.gameOver) return
      pendingDirRef.current = dir
    },
    [state.gameOver],
  )

  const snakeIndex = new Map<string, number>()
  state.snake.forEach((p, i) => snakeIndex.set(`${p.x},${p.y}`, i))

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
      <p className="mb-2 font-body text-base text-mist/90" aria-live="polite">
        {state.gameOver
          ? 'Game over — Rejouer pour recommencer.'
          : paused
            ? 'Pause (onglet en arrière-plan).'
            : 'Focus la grille, puis flèches pour diriger. Échap libère le focus.'}
      </p>
      <div
        tabIndex={0}
        role="application"
        aria-label="Snake, grille dix par dix. Utilise les flèches pour déplacer le serpent."
        onKeyDown={onKeyDown}
        className="mx-auto w-fit rounded-sm border-2 border-neon-cyan/40 p-2 outline-none focus-visible:ring-2 focus-visible:ring-coin focus-visible:ring-offset-2 focus-visible:ring-offset-void"
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
    </div>
  )
}
