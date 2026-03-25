import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type Player = 'X' | 'O'
type Cell = Player | null
type AiLevel = 'easy' | 'medium' | 'hard'

const LINES: readonly (readonly [number, number, number])[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function computeWinner(board: Cell[]): Player | 'draw' | null {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]!
    }
  }
  if (board.every((c) => c !== null)) return 'draw'
  return null
}

const emptyBoard = (): Cell[] => Array<Cell>(9).fill(null)

function emptyIndices(board: Cell[]): number[] {
  return board.map((c, i) => (c === null ? i : -1)).filter((i) => i >= 0)
}

/** Winning move for `player` if one exists */
function findWinningMove(board: Cell[], player: Player): number | null {
  for (const i of emptyIndices(board)) {
    const next = [...board]
    next[i] = player
    if (computeWinner(next) === player) return i
  }
  return null
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!
}

function aiMoveEasy(board: Cell[]): number {
  const empty = emptyIndices(board)
  return randomChoice(empty)
}

function aiMoveMedium(board: Cell[]): number {
  const take = findWinningMove(board, 'O')
  if (take !== null) return take
  const block = findWinningMove(board, 'X')
  if (block !== null) return block
  const empty = emptyIndices(board)
  if (empty.includes(4)) return 4
  const corners = [0, 2, 6, 8].filter((i) => board[i] === null)
  if (corners.length > 0) return randomChoice(corners)
  return randomChoice(empty)
}

function minimaxScore(board: Cell[], isMaximizing: boolean): number {
  const w = computeWinner(board)
  if (w === 'O') return 1
  if (w === 'X') return -1
  if (w === 'draw') return 0

  if (isMaximizing) {
    let best = -2
    for (const i of emptyIndices(board)) {
      const next = [...board]
      next[i] = 'O'
      best = Math.max(best, minimaxScore(next, false))
    }
    return best
  }
  let best = 2
  for (const i of emptyIndices(board)) {
    const next = [...board]
    next[i] = 'X'
    best = Math.min(best, minimaxScore(next, true))
  }
  return best
}

function aiMoveHard(board: Cell[]): number {
  let bestScore = -2
  let bestMove = -1
  for (const i of emptyIndices(board)) {
    const next = [...board]
    next[i] = 'O'
    const score = minimaxScore(next, false)
    if (score > bestScore) {
      bestScore = score
      bestMove = i
    }
  }
  return bestMove
}

function chooseAiMove(board: Cell[], level: AiLevel): number {
  const empty = emptyIndices(board)
  if (empty.length === 0) return -1
  switch (level) {
    case 'easy':
      return aiMoveEasy(board)
    case 'medium':
      return aiMoveMedium(board)
    case 'hard':
      return aiMoveHard(board)
    default:
      return aiMoveEasy(board)
  }
}

const LEVELS: { id: AiLevel; label: string; hint: string }[] = [
  { id: 'easy', label: 'Facile', hint: 'Coups aléatoires' },
  { id: 'medium', label: 'Moyen', hint: 'Bloque et attaque' },
  { id: 'hard', label: 'Difficile', hint: 'Minimax — solide' },
]

const AI_DELAY_MS = 240

export function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(emptyBoard)
  const [level, setLevel] = useState<AiLevel>('medium')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const outcome = useMemo(() => computeWinner(board), [board])
  const finished = outcome !== null
  const moves = board.filter((c) => c !== null).length
  const isHumanTurn = moves % 2 === 0
  const isAiTurn = !finished && moves % 2 === 1

  const statusText = useMemo(() => {
    if (outcome === 'X' || outcome === 'O') {
      if (outcome === 'X') return 'Tu as gagné !'
      return "L'IA a gagné."
    }
    if (outcome === 'draw') return 'Match nul.'
    if (isAiTurn) return "L'IA joue…"
    return 'À toi (X) — clique une case.'
  }, [outcome, isAiTurn])

  const clearAiTimeout = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const humanPlay = useCallback(
    (index: number) => {
      if (finished || !isHumanTurn) return
      setBoard((prev) => {
        if (computeWinner(prev) !== null) return prev
        if (prev[index] !== null) return prev
        const m = prev.filter((c) => c !== null).length
        if (m % 2 !== 0) return prev
        const next = [...prev]
        next[index] = 'X'
        return next
      })
    },
    [finished, isHumanTurn],
  )

  useEffect(() => {
    if (finished) {
      clearAiTimeout()
      return
    }
    if (moves % 2 === 0) return

    clearAiTimeout()
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null
      setBoard((prev) => {
        if (computeWinner(prev) !== null) return prev
        const m = prev.filter((c) => c !== null).length
        if (m % 2 === 0) return prev
        const idx = chooseAiMove(prev, level)
        if (idx < 0) return prev
        const next = [...prev]
        next[idx] = 'O'
        return next
      })
    }, AI_DELAY_MS)

    return () => {
      clearAiTimeout()
    }
  }, [board, finished, moves, level, clearAiTimeout])

  useEffect(() => () => clearAiTimeout(), [clearAiTimeout])

  const reset = useCallback(() => {
    clearAiTimeout()
    setBoard(emptyBoard())
  }, [clearAiTimeout])

  const onLevelChange = (next: AiLevel) => {
    setLevel(next)
    clearAiTimeout()
    setBoard(emptyBoard())
  }

  return (
    <div className="pixel-border rounded-sm border border-neon-cyan/30 bg-ridge/50 p-5 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-pixel text-[0.6rem] text-neon-cyan md:text-[0.7rem]">
          MORPION
        </h3>
        <button
          type="button"
          onClick={reset}
          className="rounded-sm border border-coin/60 bg-coin/15 px-3 py-1.5 font-body text-lg text-coin transition hover:bg-coin/25"
        >
          Rejouer
        </button>
      </div>

      <fieldset className="mb-4 border border-white/10 p-3">
        <legend className="px-1 font-pixel text-[0.45rem] text-mist md:text-[0.5rem]">
          NIVEAU IA
        </legend>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {LEVELS.map(({ id, label, hint }) => (
            <label
              key={id}
              className={`flex cursor-pointer items-center gap-2 rounded-sm border px-3 py-2 font-body text-base transition ${
                level === id
                  ? 'border-neon-cyan bg-neon-cyan/15 text-snow'
                  : 'border-white/15 text-mist hover:border-white/30'
              }`}
            >
              <input
                type="radio"
                name="ttt-level"
                value={id}
                checked={level === id}
                onChange={() => onLevelChange(id)}
                className="sr-only"
              />
              <span className="font-bold">{label}</span>
              <span className="text-mist/80">— {hint}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <p className="mb-4 font-body text-lg text-mist" aria-live="polite">
        {statusText}
      </p>
      <div
        className="mx-auto grid max-w-[220px] grid-cols-3 gap-2 sm:max-w-[260px]"
        role="group"
        aria-label="Grille morpion trois par trois, tu joues les X"
      >
        {board.map((cell, i) => (
          <button
            key={i}
            type="button"
            disabled={finished || cell !== null || !isHumanTurn}
            onClick={() => humanPlay(i)}
            aria-label={`Case ${i + 1}${cell ? `, occupée par ${cell}` : ', vide'}`}
            className="flex aspect-square items-center justify-center rounded-sm border-2 border-neon-magenta/40 bg-void/80 font-display text-2xl font-bold text-snow shadow-[inset_0_0_20px_rgba(0,0,0,0.4)] transition hover:border-neon-cyan/70 hover:shadow-[0_0_16px_rgba(34,211,238,0.25)] focus-visible:border-neon-cyan focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cell === 'X' && (
              <span className="text-neon-cyan drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
                X
              </span>
            )}
            {cell === 'O' && (
              <span className="text-neon-magenta drop-shadow-[0_0_8px_rgba(232,121,249,0.6)]">
                O
              </span>
            )}
          </button>
        ))}
      </div>
      <p className="mt-4 font-body text-base text-mist/80">
        Tu es <span className="text-neon-cyan">X</span>, l&apos;IA est{' '}
        <span className="text-neon-magenta">O</span>. Tu commences.
      </p>
    </div>
  )
}
