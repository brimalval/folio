import type Lenis from 'lenis'

let lockCount = 0
let lenisInstance: Lenis | undefined

let savedStyles:
  | {
      htmlOverflow: string
      htmlOverscrollBehavior: string
      bodyOverflow: string
      bodyOverscrollBehavior: string
    }
  | undefined

function canUseDOM() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

function applyScrollLockStyles() {
  if (!canUseDOM()) return

  const html = document.documentElement
  const { body } = document

  savedStyles = {
    htmlOverflow: html.style.overflow,
    htmlOverscrollBehavior: html.style.overscrollBehavior,
    bodyOverflow: body.style.overflow,
    bodyOverscrollBehavior: body.style.overscrollBehavior,
  }

  html.style.overflow = 'hidden'
  html.style.overscrollBehavior = 'none'
  body.style.overflow = 'hidden'
  body.style.overscrollBehavior = 'none'
}

function restoreScrollLockStyles() {
  if (!canUseDOM() || !savedStyles) return

  const html = document.documentElement
  const { body } = document

  html.style.overflow = savedStyles.htmlOverflow
  html.style.overscrollBehavior = savedStyles.htmlOverscrollBehavior
  body.style.overflow = savedStyles.bodyOverflow
  body.style.overscrollBehavior = savedStyles.bodyOverscrollBehavior

  savedStyles = undefined
}

export function lockScroll(lenis?: Lenis) {
  if (lenis) {
    lenisInstance = lenis
  }

  lockCount += 1

  if (lockCount !== 1) {
    return
  }

  lenisInstance?.stop()
  applyScrollLockStyles()
}

export function unlockScroll(lenis?: Lenis) {
  if (lockCount === 0) {
    return
  }

  if (lenis) {
    lenisInstance = lenis
  }

  lockCount -= 1

  if (lockCount !== 0) {
    return
  }

  restoreScrollLockStyles()
  lenisInstance?.start()
  lenisInstance = undefined
}

export function isScrollLocked() {
  return lockCount > 0
}
