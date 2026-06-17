'use client';

import React, { useState, useRef } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { useLanguage } from '@/lib/i18n/context';
import { getTranslation } from '@/lib/i18n/translations';
import { prefersReducedMotion } from '@/lib/utils';
import SectionHeading from '@/components/ui/SectionHeading';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// ISO country codes for visited countries
const visitedCountries: Record<string, boolean> = {
  POL: true,  // Poland
  CZE: true,  // Czech Republic
  GBR: true,  // England/UK
  ESP: true,  // Spain
  PRT: true,  // Portugal
};

import { Location } from '@/lib/sanity/types';

const fallbackLocations: Location[] = [
  {
    _id: '1',
    country: { en: 'Poland', pl: 'Polska' },
    cityOrRegion: 'Kalisz',
    coordinates: { lat: 51.7611, lng: 18.0910 },
    description: { en: 'Hometown', pl: 'Miasto rodzinne' },
    status: 'home',
  },
  {
    _id: '2',
    country: { en: 'Czech Republic', pl: 'Czechy' },
    cityOrRegion: 'Prague',
    coordinates: { lat: 50.0755, lng: 14.4378 },
    description: { en: 'Beautiful architecture and culture', pl: 'Piękna architektura i kultura' },
    status: 'visited',
  },
  // England
  {
    _id: '3',
    country: { en: 'England', pl: 'Anglia' },
    cityOrRegion: 'London',
    coordinates: { lat: 51.5074, lng: -0.1278 },
    description: { en: 'The city that never sleeps', pl: 'Miasto, które nigdy nie śpi' },
    status: 'visited',
  },
  {
    _id: '4',
    country: { en: 'England', pl: 'Anglia' },
    cityOrRegion: 'Luton',
    coordinates: { lat: 51.8787, lng: -0.4200 },
    description: { en: 'Visited', pl: 'Odwiedzone' },
    status: 'visited',
  },
  // Spain
  {
    _id: '5',
    country: { en: 'Spain', pl: 'Hiszpania' },
    cityOrRegion: 'Barcelona',
    coordinates: { lat: 41.3851, lng: 2.1734 },
    description: { en: 'Gaudí and Mediterranean vibes', pl: 'Gaudí i śródziemnomorski klimat' },
    status: 'visited',
  },
  {
    _id: '6',
    country: { en: 'Spain', pl: 'Hiszpania' },
    cityOrRegion: 'Malaga',
    coordinates: { lat: 36.7213, lng: -4.4214 },
    description: { en: 'Sunny Costa del Sol', pl: 'Słoneczne Costa del Sol' },
    status: 'visited',
  },
  {
    _id: '7',
    country: { en: 'Spain', pl: 'Hiszpania' },
    cityOrRegion: 'Marbella',
    coordinates: { lat: 36.5101, lng: -4.8824 },
    description: { en: 'Beautiful beaches', pl: 'Piękne plaże' },
    status: 'visited',
  },
  // Portugal
  {
    _id: '8',
    country: { en: 'Portugal', pl: 'Portugalia' },
    cityOrRegion: 'Lisbon',
    coordinates: { lat: 38.7223, lng: -9.1393 },
    description: { en: 'Pastéis de nata and hills', pl: 'Pastéis de nata i wzgórza' },
    status: 'visited',
  },
  {
    _id: '9',
    country: { en: 'Portugal', pl: 'Portugalia' },
    cityOrRegion: 'Cascais',
    coordinates: { lat: 38.6979, lng: -9.4215 },
    description: { en: 'Coastal beauty', pl: 'Nadbrzeżne piękno' },
    status: 'visited',
  },
  {
    _id: '10',
    country: { en: 'Portugal', pl: 'Portugalia' },
    cityOrRegion: 'Almada',
    coordinates: { lat: 38.6803, lng: -9.1583 },
    description: { en: 'Across the Tagus river', pl: 'Po drugiej stronie rzeki Tag' },
    status: 'visited',
  },
];

interface TooltipData {
  x: number;
  y: number;
  location: Location;
}

export default function TravelMap({
  locations,
}: {
  locations?: Location[] | null;
}) {
  const { lang } = useLanguage();
  const data = locations && locations.length > 0 ? locations : fallbackLocations;
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Fade in map
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from('.travel-map-content', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    },
    { scope: containerRef }
  );

  // Group locations by country for zoom-out mode
  const renderData = React.useMemo(() => {
    if (zoomLevel >= 2.5) {
      // Zoomed IN: Show all specific dots
      return data;
    }

    // Zoomed OUT: Cluster by country
    const countryGroups: Record<string, Location[]> = {};
    data.forEach(loc => {
      const key = loc.country.en;
      if (!countryGroups[key]) countryGroups[key] = [];
      countryGroups[key].push(loc);
    });

    return Object.values(countryGroups).map(group => {
      if (group.length === 1) return group[0];
      
      // Create a representative "Country" dot by averaging coordinates
      const avgLat = group.reduce((sum, loc) => sum + loc.coordinates.lat, 0) / group.length;
      const avgLng = group.reduce((sum, loc) => sum + loc.coordinates.lng, 0) / group.length;
      
      return {
         ...group[0],
         cityOrRegion: undefined, // Hide city name when clustered
         description: { en: 'Multiple locations visited', pl: 'Wiele odwiedzonych miejsc' },
         coordinates: { lat: avgLat, lng: avgLng }
      };
    });
  }, [data, zoomLevel]);

  return (
    <section
      id="travel"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-navy-base"
    >
      <div className="section-container relative z-10 border-t border-border-default pt-12 px-4 sm:px-6 lg:px-8">
        {/* Vertical section label */}
        <div className="hidden lg:block absolute left-8 top-12 -translate-y-full -rotate-90 origin-bottom-left text-[0.6rem] uppercase tracking-[0.3em] text-text-muted font-bold whitespace-nowrap">
          05 — TRAVEL
        </div>

        <div className="ml-0 lg:ml-12">
        <SectionHeading
          title={getTranslation(lang, 'travel_title')}
        />
        
        <p className="mt-4 text-sm text-text-muted max-w-xl">
          {lang === 'pl' ? 'Przybliż mapę używając scrolla, aby zobaczyć szczegółowe lokalizacje.' : 'Scroll to zoom in and see specific cities and detailed locations.'}
        </p>

        <div className="travel-map-content relative mt-8 overflow-hidden border border-border-default bg-transparent">
          {/* Map */}
          <div className="relative h-[300px] md:h-[450px] lg:h-[500px]">
            <ComposableMap
              projectionConfig={{
                center: [15, 50],
                scale: 600,
              }}
              className="h-full w-full outline-none"
            >
              <ZoomableGroup 
                onMoveEnd={({ zoom }) => setZoomLevel(zoom)}
                maxZoom={15}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const isVisited =
                        visitedCountries[geo.properties?.ISO_A3] || false;
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={isVisited ? '#F21F3D' : '#171A33'}
                          stroke="#4B506B"
                          strokeWidth={0.5 / zoomLevel}
                          style={{
                            default: { outline: 'none' },
                            hover: {
                              fill: isVisited ? '#FF2D73' : '#1E2145',
                              outline: 'none',
                            },
                            pressed: { outline: 'none' },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>

                {/* Pin markers */}
                {renderData.map((location, index) => (
                  <Marker
                    key={`${location.country.en}-${location.cityOrRegion}-${index}`}
                    coordinates={[location.coordinates.lng, location.coordinates.lat]}
                  >
                    {/* Pulse ring - scaled down when zoomed to avoid giant rings */}
                    <circle
                      r={8 / Math.max(1, zoomLevel * 0.5)}
                      fill="none"
                      stroke={location.status === 'home' ? '#FFD83D' : '#F21F3D'}
                      strokeWidth={1.5 / zoomLevel}
                      className={prefersReducedMotion() ? '' : 'animate-pulse-pin'}
                      opacity={0.6}
                    />
                    {/* Center dot - keep relative size based on zoom */}
                    <circle
                      r={4 / Math.max(1, zoomLevel * 0.5)}
                      fill={location.status === 'home' ? '#FFD83D' : '#F21F3D'}
                      stroke="#07091C"
                      strokeWidth={1.5 / Math.max(1, zoomLevel * 0.5)}
                      className="cursor-pointer"
                      role="button"
                      aria-label={location.country[lang]}
                      tabIndex={0}
                      onMouseEnter={(e) => {
                        const rect = (e.target as SVGElement).closest('svg')?.getBoundingClientRect();
                        if (rect) {
                          setTooltip({
                            x: e.clientX - rect.left,
                            y: e.clientY - rect.top,
                            location,
                          });
                        }
                      }}
                      onMouseLeave={() => setTooltip(null)}
                      onFocus={(e) => {
                        const rect = (e.target as SVGElement).closest('svg')?.getBoundingClientRect();
                        if (rect) {
                          setTooltip({
                            x: rect.width / 2,
                            y: rect.height / 2,
                            location,
                          });
                        }
                      }}
                      onBlur={() => setTooltip(null)}
                    />
                  </Marker>
                ))}
              </ZoomableGroup>
            </ComposableMap>

            {/* Tooltip */}
            {tooltip && (
              <div
                className="pointer-events-none absolute z-20 border border-border-default bg-[#090909] px-4 py-3 shadow-2xl transition-all duration-150"
                style={{
                  left: `${Math.min(tooltip.x, 250)}px`,
                  top: `${tooltip.y - 80}px`,
                }}
              >
                <p className="text-sm font-semibold text-text-primary">
                  {tooltip.location.country[lang]}
                  {tooltip.location.cityOrRegion && (
                    <span className="text-text-muted">
                      {' '}
                      · {tooltip.location.cityOrRegion}
                    </span>
                  )}
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  {tooltip.location.description?.[lang]}
                </p>
                <span className="mt-1 inline-block text-[0.65rem] font-medium uppercase tracking-wider" style={{ color: tooltip.location.status === 'home' ? '#FFD83D' : '#FF5257' }}>
                  {tooltip.location.status === 'home'
                    ? getTranslation(lang, 'travel_home')
                    : getTranslation(lang, 'travel_visited')}
                </span>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 border-t border-border-default px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: '#FFD83D' }} />
              <span className="text-xs text-text-muted">
                {getTranslation(lang, 'travel_home')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: '#F21F3D' }} />
              <span className="text-xs text-text-muted">
                {getTranslation(lang, 'travel_visited')}
              </span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
