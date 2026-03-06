'use client'

import { useEffect, useMemo, useState } from 'react'

type ActiveSectionState = {
  activeId: string | null
  ratio: number
}

const THRESHOLDS = [0, 0.25, 0.5, 0.75, 1.0]
const DEFAULT_SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'experience', 'contact']

type SectionMetrics = {
  ratio: number
  top: number
  visible: boolean
}

type Subscriber = (state: ActiveSectionState) => void

type DevGlobalThis = typeof globalThis & {
  __ACTIVE_SECTION__?: string | null
  __ACTIVE_SECTION_RATIO__?: number
  __ACTIVE_SECTION_OBSERVER_COUNT__?: number
}

const isDevBrowser =
  typeof window !== 'undefined' && process.env.NODE_ENV !== 'production'

const devGlobals: DevGlobalThis = globalThis as DevGlobalThis

let sharedObserver: IntersectionObserver | null = null
const subscribers = new Set<Subscriber>()
const sectionMetrics = new Map<string, SectionMetrics>()
const sectionRefCount = new Map<string, number>()
const observedElements = new Map<string, Element>()
let lastBroadcastState: ActiveSectionState = { activeId: null, ratio: 0 }

const updateDevGlobals = (state: ActiveSectionState) => {
  if (!isDevBrowser) return
  devGlobals.__ACTIVE_SECTION__ = state.activeId
  devGlobals.__ACTIVE_SECTION_RATIO__ = state.ratio
}

const incrementDevObserverCount = () => {
  if (!isDevBrowser) return
  const previousCount = devGlobals.__ACTIVE_SECTION_OBSERVER_COUNT__ ?? 0
  devGlobals.__ACTIVE_SECTION_OBSERVER_COUNT__ = previousCount + 1
}

const setLastBroadcastState = (state: ActiveSectionState) => {
  lastBroadcastState = state
  updateDevGlobals(state)
}

const observerInit = (): IntersectionObserver => {
  if (sharedObserver) return sharedObserver

  sharedObserver = new IntersectionObserver(handleEntries, {
    threshold: THRESHOLDS,
  })

  incrementDevObserverCount()

  return sharedObserver
}

const handleEntries = (entries: IntersectionObserverEntry[]) => {
  let hasUpdates = false

  entries.forEach((entry) => {
    const id = entry.target.id
    if (!id || !sectionRefCount.has(id)) return

    const ratio = entry.intersectionRatio
    const top = entry.boundingClientRect.top
    const visible = ratio > 0
    const prev = sectionMetrics.get(id)

    if (
      !prev ||
      prev.ratio !== ratio ||
      prev.top !== top ||
      prev.visible !== visible
    ) {
      sectionMetrics.set(id, { ratio, top, visible })
      hasUpdates = true
    }
  })

  if (hasUpdates) {
    notifySubscribers()
  }
}

const computeActiveState = (): ActiveSectionState => {
  let bestId: string | null = null
  let bestRatio = 0
  let bestTop = Number.POSITIVE_INFINITY

  sectionMetrics.forEach((metrics, id) => {
    if (!metrics.visible || metrics.ratio <= 0) return

    if (
      metrics.ratio > bestRatio ||
      (metrics.ratio === bestRatio && metrics.top < bestTop)
    ) {
      bestId = id
      bestRatio = metrics.ratio
      bestTop = metrics.top
    }
  })

  if (bestId === null) {
    return { activeId: null, ratio: 0 }
  }

  return { activeId: bestId, ratio: bestRatio }
}

const notifySubscribers = () => {
  const nextState = computeActiveState()
  if (
    nextState.activeId === lastBroadcastState.activeId &&
    nextState.ratio === lastBroadcastState.ratio
  ) {
    return
  }

  setLastBroadcastState(nextState)
  subscribers.forEach((subscriber) => subscriber(nextState))
}

const observeSection = (sectionId: string) => {
  const occurance = sectionRefCount.get(sectionId) ?? 0
  sectionRefCount.set(sectionId, occurance + 1)

  if (occurance > 0) {
    return
  }

  if (typeof document === 'undefined') {
    return
  }

  const element = document.getElementById(sectionId)
  if (!element) return

  observedElements.set(sectionId, element)
  observerInit().observe(element)
}

const unobserveSection = (sectionId: string) => {
  const occurance = sectionRefCount.get(sectionId)
  if (!occurance) return

  if (occurance > 1) {
    sectionRefCount.set(sectionId, occurance - 1)
    return
  }

  sectionRefCount.delete(sectionId)
  sectionMetrics.delete(sectionId)

  const element = observedElements.get(sectionId)
  observedElements.delete(sectionId)
  if (element && sharedObserver) {
    sharedObserver.unobserve(element)
  }
}

const cleanupObserver = () => {
  sharedObserver?.disconnect()
  sharedObserver = null
  sectionRefCount.clear()
  observedElements.clear()
  sectionMetrics.clear()
  setLastBroadcastState({ activeId: null, ratio: 0 })
}

const subscribe = (sectionIds: string[], subscriber: Subscriber) => {
  if (!sectionIds.length) {
    subscriber({ activeId: null, ratio: 0 })
    return () => undefined
  }

  observerInit()
  subscribers.add(subscriber)
  sectionIds.forEach(observeSection)
  subscriber(lastBroadcastState)

  return () => {
    subscribers.delete(subscriber)
    sectionIds.forEach(unobserveSection)

    if (!subscribers.size) {
      cleanupObserver()
      return
    }

    notifySubscribers()
  }
}

export function useActiveSection(
  sectionIds?: readonly string[]
): ActiveSectionState {
  const sectionKey = sectionIds && sectionIds.length
    ? sectionIds.join(',')
    : DEFAULT_SECTION_IDS.join(',')

  const normalizedSectionIds = useMemo(() => {
    const uniqueSectionIds: string[] = []
    sectionKey.split(',').forEach((id) => {
      if (!id || uniqueSectionIds.includes(id)) return
      uniqueSectionIds.push(id)
    })
    return uniqueSectionIds
  }, [sectionKey])

  const [state, setState] = useState<ActiveSectionState>(lastBroadcastState)

  useEffect(() => subscribe(normalizedSectionIds, setState), [normalizedSectionIds])

  useEffect(() => {
    if (typeof document === 'undefined') return
    if (!state.activeId) return

    const sectionVar = `--section-bg-${state.activeId}`
    document.body.style.setProperty('--section-bg-color', `var(${sectionVar})`)
  }, [state.activeId])

  return state
}

export type { ActiveSectionState }
