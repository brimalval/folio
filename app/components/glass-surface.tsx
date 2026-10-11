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

    // Per-instance values travel as CSS vars; the shared rules in globals.css
    // pick the light or dark one based on data-theme.
    const combinedStyle = {
      '--glass-bg-light': `rgba(var(--nav-bg-rgb, 250, 244, 237), ${config.lightOpacity})`,
      '--glass-bg-dark': `rgba(var(--nav-bg-rgb, 25, 23, 36), ${config.darkOpacity})`,
      // Backdrop filter with vendor prefix for Safari
      backdropFilter: `blur(${config.blur})`,
      WebkitBackdropFilter: `blur(${config.blur})`,
      // Border is theme-independent (uses CSS variable that adapts via data-theme)
      border: `1px solid rgba(var(--border-rgb, 128, 128, 128), ${config.borderOpacity})`,
      ...style,
    } as React.CSSProperties

    return (
      <div
        ref={ref}
        data-glass-surface
        data-glass-intensity={intensity}
        data-glass-frosted={frosted ? '' : undefined}
        className={className}
        style={combinedStyle}
        {...props}
      >
        {children}
      </div>
    )
  }
)

GlassSurface.displayName = 'GlassSurface'

export default GlassSurface
