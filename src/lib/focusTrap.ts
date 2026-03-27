/** Selectors for elements that participate in sequential focus navigation (simplified). */
const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  'a[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function isVisibleFocusable(el: HTMLElement): boolean {
  if (el.closest('[aria-hidden="true"]')) return false
  if (el.hasAttribute('disabled')) return false
  const style = window.getComputedStyle(el)
  if (style.visibility === 'hidden' || style.display === 'none') return false
  return true
}

export function getFocusableIn(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    isVisibleFocusable,
  )
}

/** Keeps Tab / Shift+Tab inside `container` (APG dialog pattern). */
export function trapTabKey(e: KeyboardEvent, container: HTMLElement): void {
  if (e.key !== 'Tab') return
  const nodes = getFocusableIn(container)
  if (nodes.length === 0) return
  if (nodes.length === 1) {
    e.preventDefault()
    nodes[0].focus()
    return
  }
  const first = nodes[0]
  const last = nodes[nodes.length - 1]
  const active = document.activeElement as HTMLElement | null
  if (e.shiftKey) {
    if (active === first || !container.contains(active)) {
      e.preventDefault()
      last.focus()
    }
  } else if (active === last || !container.contains(active)) {
    e.preventDefault()
    first.focus()
  }
}
