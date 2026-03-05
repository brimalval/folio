'use client'

import React, { HTMLAttributes } from 'react'

type Intensity = 'subtle' | 'medium' | 'strong'

interface GlassSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  intensity?: Intensity
  frosted?: boolean
  children?: React.ReactNode
}

const intensityConfig = {
  subtle: {
    blur: '8px',
    lightOpacity: 0.4,
    darkOpacity: 0.35,
    borderOpacity: 0.15,
  },
  medium: {
    blur: '12px',
    lightOpacity: 0.6,
    darkOpacity: 0.5,
    borderOpacity: 0.2,
  },
  strong: {
    blur: '20px',
    lightOpacity: 0.8,
    darkOpacity: 0.65,
    borderOpacity: 0.3,
  },
}

export const GlassSurface = React.forwardRef<HTMLDivElement, GlassSurfaceProps>(
  (
    {
      intensity = 'medium',
      frosted = false,
      className = '',
      children,
      style,
      ...props
    },
    ref
  ) => {
    const config = intensityConfig[intensity]

    // Light mode: use higher opacity for readability
    // Dark mode: use lower opacity for subtlety
    const lightBg = `rgba(var(--nav-bg-rgb, 250, 244, 237), ${config.lightOpacity})`
    const darkBg = `rgba(var(--nav-bg-rgb, 25, 23, 36), ${config.darkOpacity})`

    // Frosted highlight: subtle top-edge inner glow
    const frostHighlight = `inset 0 1px 0 rgba(255, 255, 255, 0.1)`
    const frostHighlightLight = `inset 0 1px 0 rgba(0, 0, 0, 0.05)`

    const combinedStyle: React.CSSProperties = {
      // Backdrop filter with vendor prefix for Safari
      backdropFilter: `blur(${config.blur})`,
      WebkitBackdropFilter: `blur(${config.blur})`,
      // Border is theme-independent (uses CSS variable that adapts via data-theme)
      border: `1px solid rgba(var(--border-rgb, 128, 128, 128), ${config.borderOpacity})`,
      ...style,
    }

    return (
      <>
        <style>{`
          [data-glass-surface] {
            background: ${lightBg};
            backdrop-filter: blur(${config.blur});
            -webkit-backdrop-filter: blur(${config.blur});
            ${frosted ? `box-shadow: ${frostHighlightLight};` : ''}
          }
          
          [data-theme="dark"] [data-glass-surface] {
            background: ${darkBg};
            ${frosted ? `box-shadow: ${frostHighlight};` : ''}
          }
        `}</style>
        <div
          ref={ref}
          data-glass-surface
          className={className}
          style={combinedStyle}
          {...props}
        >
          {children}
        </div>
      </>
    )
  }
)

GlassSurface.displayName = 'GlassSurface'

export default GlassSurface
