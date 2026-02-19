'use client'

import * as React from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { stateCentroids } from '@/data/stateCentroids'

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

interface USMapProps {
  /** Currently selected state name (full name, e.g., "California") */
  selectedState: string | null
  /** Currently hovered state name */
  hoveredState: string | null
  /** Callback when a state is clicked */
  onStateSelect: (stateName: string) => void
  /** Callback when hovering over a state */
  onStateHover: (stateName: string | null) => void
  /** Optional className for the container */
  className?: string
}

/**
 * Interactive US Map Component
 * 
 * Renders an interactive map of the United States using react-simple-maps.
 * Supports selection and hover states with visual feedback.
 */
export function USMap({ 
  selectedState, 
  hoveredState, 
  onStateSelect, 
  onStateHover,
  className = ''
}: USMapProps) {
  return (
    <div className={`w-full ${className}`}>
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{
          scale: 1000,
        }}
        style={{
          width: '100%',
          height: 'auto',
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.name as string
              const isSelected = stateName === selectedState
              const isHovered = stateName === hoveredState && !isSelected
              
              // Determine fill color based on state
              let fillColor = '#007AC8' // Primary blue (default)
              if (isSelected) {
                fillColor = '#004A78' // Darker blue for selected
              } else if (isHovered) {
                fillColor = '#0062A0' // Medium blue for hover
              }
              
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => onStateSelect(stateName)}
                  onMouseEnter={() => onStateHover(stateName)}
                  onMouseLeave={() => onStateHover(null)}
                  style={{
                    default: {
                      fill: fillColor,
                      stroke: '#FFFFFF',
                      strokeWidth: 0.5,
                      outline: 'none',
                    },
                    hover: {
                      fill: isSelected ? '#004A78' : '#0062A0',
                      stroke: '#FFFFFF',
                      strokeWidth: 0.5,
                      outline: 'none',
                      cursor: 'pointer',
                    },
                    pressed: {
                      fill: '#004A78',
                      outline: 'none',
                    },
                  }}
                />
              )
            })
          }
        </Geographies>
        
        {/* Pin marker for selected state */}
        {selectedState && stateCentroids[selectedState] && (
          <Marker coordinates={stateCentroids[selectedState]}>
            <g 
              className="pin-float"
              style={{ 
                transition: 'transform 0.3s ease-out',
              }}
            >
              <image
                href="/Map-Pin.svg"
                width={120}
                height={156}
                x={-60}      // Center horizontally (half of width)
                y={-156}     // Position above the point (full height)
                style={{ pointerEvents: 'none' }}
              />
            </g>
          </Marker>
        )}
      </ComposableMap>
    </div>
  )
}

export default USMap
