import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useLang } from '../context/LanguageContext'
import { countries, cities } from '../data/markets'
import { useInView } from '../hooks/useInView'

// ─── Zoom controller — lives inside MapContainer so useMap() works ────────────
function ZoomController({ activeCountry }) {
  const map = useMap()
  const isMount = useRef(true) // skip initial mount — FitBounds handles that

  useEffect(() => {
    if (isMount.current) { isMount.current = false; return }
    try {
      if (!activeCountry) {
        const pts = countries.map(c => L.latLng(c.lat, c.lng))
        map.flyToBounds(L.latLngBounds(pts), { padding: [52, 72], duration: 1.2 })
      } else {
        const country = countries.find(c => c.id === activeCountry)
        if (country?.bounds) {
          map.flyToBounds(L.latLngBounds(country.bounds), { padding: [40, 40], duration: 1.2 })
        }
      }
    } catch (e) {
      console.warn('ZoomController:', e)
    }
  }, [activeCountry]) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}

// ─── Zoom buttons — inside MapContainer ───────────────────────────────────────
function ZoomButtons() {
  const map = useMap()
  return (
    <div
      style={{
        position: 'absolute', top: 12, right: 12, zIndex: 400,
        display: 'flex', flexDirection: 'column', gap: 4,
      }}
    >
      {[{ s: '+', fn: () => map.zoomIn() }, { s: '−', fn: () => map.zoomOut() }].map(({ s, fn }) => (
        <button
          key={s}
          onClick={e => { e.stopPropagation(); fn() }}
          style={{
            width: 28, height: 28,
            background: 'rgba(6,13,14,0.88)',
            border: '1px solid rgba(92,242,197,0.22)',
            borderRadius: 6,
            color: 'rgba(232,237,245,0.70)',
            fontFamily: 'monospace', fontSize: 16, fontWeight: 700,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)', transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(92,242,197,0.60)'; e.currentTarget.style.color = '#5CF2C5' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(92,242,197,0.22)'; e.currentTarget.style.color = 'rgba(232,237,245,0.70)' }}
        >
          {s}
        </button>
      ))}
    </div>
  )
}

// ─── Initial fit ──────────────────────────────────────────────────────────────
function FitBounds() {
  const map = useMap()
  useEffect(() => {
    const bounds = L.latLngBounds(countries.map(c => [c.lat, c.lng]))
    map.fitBounds(bounds, { padding: [52, 72] })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}

// ─── Country pin icon ─────────────────────────────────────────────────────────
function countryPin(isActive, isDimmed, labelSide, name) {
  const size = 13, anchor = size / 2
  const offset = labelSide === 'right' ? `left:${size + 6}px;` : `right:${size + 6}px; text-align:right;`
  const borderCol = isActive ? '#5CF2C5' : isDimmed ? 'rgba(255,255,255,0.30)' : 'rgba(255,255,255,0.85)'
  const bgCol     = isActive ? 'rgba(92,242,197,0.22)' : 'rgba(6,13,14,0.82)'
  const dotCol    = isActive ? '#5CF2C5' : isDimmed ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.88)'
  const labelCol  = isActive ? '#5CF2C5' : isDimmed ? 'rgba(255,255,255,0.30)' : 'rgba(255,255,255,0.80)'
  const glow      = isActive ? ', 0 0 14px rgba(92,242,197,0.60)' : ''
  const opacity   = isDimmed ? '0.45' : '1'

  return L.divIcon({
    html: `
      <div style="opacity:${opacity}; position:relative; width:${size}px; height:${size}px; border-radius:50%;
        border:${isActive ? 2 : 1.5}px solid ${borderCol};
        background:${bgCol};
        display:flex; align-items:center; justify-content:center;
        box-shadow:0 0 0 2px rgba(0,0,0,0.50)${glow};
        cursor:pointer;">
        <div style="width:${isActive ? 6 : 5}px; height:${isActive ? 6 : 5}px; border-radius:50%; background:${dotCol};"></div>
        ${isActive ? `<div style="position:absolute; width:${size}px; height:${size}px; border-radius:50%;
          border:1px solid rgba(92,242,197,0.35); top:50%; left:50%; transform:translate(-50%,-50%);
          animation:kpPulse 2s ease-out infinite; pointer-events:none;"></div>` : ''}
        <div style="position:absolute; top:50%; ${offset} transform:translateY(-50%);
          font-family:'JetBrains Mono',monospace; font-size:7.5px; letter-spacing:0.10em;
          white-space:nowrap; color:${labelCol};
          text-shadow:0 1px 4px rgba(0,0,0,0.95),0 0 8px rgba(0,0,0,0.80);
          pointer-events:none; font-weight:500;">${name.toUpperCase()}</div>
      </div>`,
    className: '', iconSize: [size, size], iconAnchor: [anchor, anchor],
  })
}

// ─── City pin icon ────────────────────────────────────────────────────────────
function cityPin(isActive, labelSide, name) {
  const size = 10, anchor = size / 2
  const offset = labelSide === 'right' ? `left:${size + 5}px;` : `right:${size + 5}px; text-align:right;`
  const borderCol = isActive ? '#5CF2C5' : 'rgba(255,255,255,0.75)'
  const bgCol     = isActive ? 'rgba(92,242,197,0.20)' : 'rgba(6,13,14,0.82)'
  const dotCol    = isActive ? '#5CF2C5' : 'rgba(255,255,255,0.80)'
  const labelCol  = isActive ? '#5CF2C5' : 'rgba(255,255,255,0.65)'
  const glow      = isActive ? ', 0 0 10px rgba(92,242,197,0.55)' : ''

  return L.divIcon({
    html: `
      <div style="position:relative; width:${size}px; height:${size}px; border-radius:50%;
        border:${isActive ? 2 : 1}px solid ${borderCol};
        background:${bgCol};
        display:flex; align-items:center; justify-content:center;
        box-shadow:0 0 0 2px rgba(0,0,0,0.50)${glow};
        cursor:pointer;">
        <div style="width:${isActive ? 4 : 3}px; height:${isActive ? 4 : 3}px; border-radius:50%; background:${dotCol};"></div>
        ${isActive ? `<div style="position:absolute; width:${size}px; height:${size}px; border-radius:50%;
          border:1px solid rgba(92,242,197,0.30); top:50%; left:50%; transform:translate(-50%,-50%);
          animation:kpPulse 2s ease-out infinite; pointer-events:none;"></div>` : ''}
        <div style="position:absolute; top:50%; ${offset} transform:translateY(-50%);
          font-family:'JetBrains Mono',monospace; font-size:6.5px; letter-spacing:0.09em;
          white-space:nowrap; color:${labelCol};
          text-shadow:0 1px 4px rgba(0,0,0,0.95);
          pointer-events:none; font-weight:500;">${name.toUpperCase()}</div>
      </div>`,
    className: '', iconSize: [size, size], iconAnchor: [anchor, anchor],
  })
}

// ─── Facts panel ──────────────────────────────────────────────────────────────
function FactsPanel({ country, city, lang, compact = false, onCountryClick }) {
  // Determine what to show — city facts take priority (if they exist), then country facts
  const data = city?.facts
    ? { name: city.name, subtitle: country?.name ?? '', facts: city.facts[lang] }
    : country?.facts
    ? { name: country.name, subtitle: lang === 'en' ? 'Country overview' : 'Vue pays', facts: country.facts[lang] }
    : null

  if (!data) {
    const journey = [
      { flag: '🇲🇦', countryId: 'ma', label: lang === 'en' ? 'Morocco'              : 'Maroc',              sub: lang === 'en' ? 'Origin - Bachelor'             : 'Origines - bachelor' },
      { flag: '🇰🇷', countryId: 'kr', label: lang === 'en' ? 'South Korea'          : 'Corée du Sud',        sub: lang === 'en' ? 'Exchange semester'  : 'Semestre d\'échange' },
      { flag: '🇹🇷', countryId: 'tr', label: lang === 'en' ? 'Türkiye · Netherlands': 'Türkiye · Pays-Bas',  sub: lang === 'en' ? 'Permanent contract - Brand Manager (Ecommerce & Analytics)'             : 'CDI - Brand Manager (Ecommerce & Analytics)' },
      { flag: '🇫🇷', countryId: 'fr', label: lang === 'en' ? 'France · Lille'       : 'France · Lille',      sub: lang === 'en' ? 'Masters - Marketing & Data analytics'            : 'Études - Marketing & Data analytics' },
      { flag: '🇧🇪', countryId: 'be', label: lang === 'en' ? 'Belgium'              : 'Belgique',            sub: lang === 'en' ? 'Internship FMCG - Category Manager (Data & Performance)'    : 'Stage FMCG - Category Manager (Data & Performance)' },
      { flag: '🇫🇷', countryId: 'fr', label: lang === 'en' ? 'France · Paris'       : 'France · Paris',      sub: lang === 'en' ? 'Apprenticeship F&B - Brand Manager (Data & Performance)': 'Alternance F&B - Brand Manager (Data & Performance)' },
    ]

    return (
      <div className={`panel rounded-2xl flex flex-col ${compact ? 'p-4' : 'p-5 h-full min-h-[300px]'}`}>
        <p className="font-mono text-[9px] tracking-[0.2em] text-text-dim mb-4 uppercase">
          {lang === 'en' ? 'Career Journey' : 'Parcours'}
        </p>
        <div className="flex flex-col gap-0 flex-1 justify-center">
          {journey.map((step, i) => (
            <div
              key={i}
              className="flex gap-3 items-stretch group cursor-pointer"
              onClick={() => onCountryClick?.(step.countryId)}
            >
              {/* Line + dot */}
              <div className="flex flex-col items-center" style={{ minWidth: 16 }}>
                <div className="w-2 h-2 rounded-full shrink-0 mt-1 transition-all duration-200 group-hover:scale-125"
                  style={{ background: '#5CF2C5', boxShadow: '0 0 6px rgba(92,242,197,0.5)' }} />
                {i < journey.length - 1 && (
                  <div className="flex-1 w-px mt-1" style={{ background: 'linear-gradient(to bottom, rgba(92,242,197,0.4), rgba(92,242,197,0.1))' }} />
                )}
              </div>
              {/* Content */}
              <div className={`pb-${i < journey.length - 1 ? '3' : '0'}`}>
                <div className="flex items-center gap-1.5">
                  <span style={{ fontSize: 11 }}>{step.flag}</span>
                  <span className="font-mono text-[10px] font-semibold text-text-bright tracking-wide group-hover:text-kpi transition-colors duration-200">{step.label}</span>
                </div>
                <p className="font-mono text-[9px] text-text-dim/60 tracking-wider mt-0.5">{step.sub}</p>
              </div>
            </div>
          ))}

          {/* Last arrow → next */}
          <div className="flex gap-3 items-start mt-0">
            <div className="flex flex-col items-center" style={{ minWidth: 16 }}>
              <div className="w-px h-3" style={{ background: 'rgba(92,242,197,0.1)' }} />
              <span className="font-mono text-kpi/50" style={{ fontSize: 10, lineHeight: 1 }}>↓</span>
            </div>
            <div className="pb-0 pt-1">
              <span className="font-mono text-[9px] tracking-widest" style={{ color: 'rgba(92,242,197,0.45)' }}>
                {lang === 'en' ? '✦ next destination...' : '✦ prochaine destination...'}
              </span>
            </div>
          </div>
        </div>

        <p className="font-mono text-[8px] text-text-dim/30 tracking-widest mt-4">
          {lang === 'en' ? 'CLICK A COUNTRY TO GET TO KNOW ME MORE' : 'CLIQUEZ UN PAYS POUR ME CONNAÎTRE PLUS'}
        </p>
      </div>
    )
  }

  return (
    <div className={`panel rounded-2xl flex flex-col ${compact ? 'p-5' : 'p-6 h-full min-h-[300px]'}`}>
      <div className="flex items-start justify-between mb-5 pb-4 border-b border-border">
        <div>
          <p className="font-mono text-[9px] tracking-[0.2em] text-text-dim mb-0.5 uppercase">{data.subtitle}</p>
          <h3 className="font-display font-semibold text-xl text-text-bright leading-tight">{data.name}</h3>
        </div>
        <div className="flex items-center gap-1.5 mt-1 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-kpi" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
          <span className="font-mono text-[9px] tracking-widest text-kpi/70">
            {lang === 'en' ? 'FIELD NOTES' : 'NOTES DE TERRAIN'}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {data.facts.map((fact, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className="shrink-0 w-5 h-5 rounded flex items-center justify-center mt-0.5"
              style={{ background: 'rgba(92,242,197,0.09)', border: '1px solid rgba(92,242,197,0.20)' }}>
              <span className="font-mono text-[10px] font-bold text-kpi leading-none">{i + 1}</span>
            </div>
            <p className="text-text text-xs leading-relaxed flex-1">{fact}</p>
          </div>
        ))}
      </div>

      {!compact && (
        <div className="mt-5 pt-4 border-t border-border">
          <span className="font-mono text-[9px] text-text-dim/40 tracking-widest">
            {lang === 'en' ? 'CLICK ON THE COUNTRY AGAIN TO ZOOM OUT' : 'RECLIQUEZ SUR LE PAYS POUR REVENIR À LA VUE GLOBALE'}
          </span>
        </div>
      )}
    </div>
  )
}

// ─── Map markers layer (inside MapContainer) ──────────────────────────────────
function MapMarkers({ activeCountry, activeCity, onCountryClick, onCityClick, onCityHover, onCityLeave }) {
  const visibleCities = activeCountry ? cities.filter(c => c.countryId === activeCountry) : []

  return (
    <>
      {/* Country pins */}
      {countries.map(c => (
        <Marker
          key={c.id}
          position={[c.lat, c.lng]}
          icon={countryPin(
            activeCountry === c.id,
            activeCountry !== null && activeCountry !== c.id, // dimmed when another country is active
            c.labelSide,
            c.name,
          )}
          eventHandlers={{ click: () => onCountryClick(c.id) }}
        />
      ))}

      {/* City pins — only visible when a zoomable country is active */}
      {visibleCities.map(city => (
        <Marker
          key={city.id}
          position={[city.lat, city.lng]}
          icon={cityPin(activeCity === city.id, city.labelSide, city.name)}
          eventHandlers={{
            click:     () => onCityClick(city.id),
            mouseover: () => onCityHover?.(city.id),
            mouseout:  () => onCityLeave?.(),
          }}
        />
      ))}
    </>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function MarketIntelligenceMap() {
  const { lang } = useLang()
  const [activeCountry, setActiveCountry] = useState(null)
  const [activeCity,    setActiveCity]    = useState(null)
  const [hoveredCity,   setHoveredCity]   = useState(null)
  const [ref, inView] = useInView()

  const countryObj = countries.find(c => c.id === activeCountry) ?? null
  const cityObj    = cities.find(c => c.id === (activeCity ?? hoveredCity)) ?? null

  function handleCountryClick(id) {
    if (activeCountry === id) {
      // Deselect → zoom back out
      setActiveCountry(null)
      setActiveCity(null)
    } else {
      setActiveCountry(id)
      setActiveCity(null)
      // Morocco is direct — no city drill-down needed
    }
  }

  function handleCityClick(id) {
    const city = cities.find(c => c.id === id)
    if (city?.facts) setActiveCity(prev => prev === id ? null : id)
    // cities without facts are decorative — clicking them does nothing
  }

  return (
    <section id="markets" className="py-10 lg:py-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute inset-0 radial-fade-navy pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Label */}
        <div ref={ref} className={`section-label opacity-0 ${inView ? 'animate-fade-in' : ''}`}>
          <span className="sys-label">
            {lang === 'en' ? 'Journey in a Nutshell' : 'Parcous'}
          </span>
        </div>

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <h2
            className={`font-display font-semibold text-4xl md:text-5xl text-text-bright leading-tight opacity-0 ${inView ? 'reveal-up' : ''}`}
            style={{ animationDelay: '100ms' }}
          >
            {lang === 'en'
              ? <>More than places I lived in.</>
              : <>Bien plus que des endroits où j’ai vécu.</>}
          </h2>
        </div>

        {/* DESKTOP */}
        <div
          className={`hidden md:grid md:grid-cols-[2fr_1fr] gap-5 opacity-0 ${inView ? 'reveal-up' : ''}`}
          style={{ animationDelay: '250ms' }}
        >
          <div className="relative rounded-2xl overflow-hidden border border-border" style={{ height: '440px' }}>
            <MapContainer
              center={[42, 20]}
              zoom={3}
              minZoom={1}
              maxZoom={14}
              scrollWheelZoom={false}
              zoomControl={false}
              attributionControl={false}
              style={{ width: '100%', height: '100%' }}
            >
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                maxZoom={19}
              />
              <FitBounds />
              <ZoomButtons />
              <ZoomController activeCountry={activeCountry} />
              <MapMarkers
                activeCountry={activeCountry}
                activeCity={activeCity}
                onCountryClick={handleCountryClick}
                onCityClick={handleCityClick}
                onCityHover={setHoveredCity}
                onCityLeave={() => setHoveredCity(null)}
              />
            </MapContainer>

            {/* Back button — shown when zoomed into a country */}
            {activeCountry && (
              <button
                onClick={() => { setActiveCountry(null); setActiveCity(null) }}
                className="absolute bottom-3 left-3 z-[400] flex items-center gap-1.5 font-mono text-[8px] tracking-widest rounded px-2.5 py-1.5 transition-all duration-200 hover:border-amber/50 hover:text-amber"
                style={{ background: 'rgba(6,13,14,0.86)', border: '1px solid rgba(92,242,197,0.20)', color: 'rgba(232,237,245,0.60)' }}
              >
                ← {lang === 'en' ? 'ALL COUNTRIES' : 'TOUS LES PAYS'}
              </button>
            )}
            {!activeCountry && (
              <div className="absolute bottom-3 left-3 z-[400] pointer-events-none">
                <span className="font-mono text-[8px] tracking-widest rounded px-2 py-1"
                  style={{ background: 'rgba(6,13,14,0.82)', color: 'rgba(232,237,245,0.38)' }}>
                  {lang === 'en' ? '+ / − TO ZOOM · CLICK A COUNTRY' : '+ / − POUR ZOOMER · CLIQUEZ UN PAYS'}
                </span>
              </div>
            )}
          </div>

          <FactsPanel country={countryObj} city={cityObj} lang={lang} onCountryClick={handleCountryClick} />
        </div>

        {/* MOBILE */}
        <div
          className={`md:hidden opacity-0 ${inView ? 'reveal-up' : ''}`}
          style={{ animationDelay: '250ms' }}
        >
          <div className="relative rounded-2xl overflow-hidden border border-border mb-4" style={{ height: '300px' }}>
            <MapContainer
              center={[42, 20]}
              zoom={2}
              minZoom={1}
              maxZoom={14}
              scrollWheelZoom={false}
              zoomControl={false}
              attributionControl={false}
              style={{ width: '100%', height: '100%' }}
            >
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                maxZoom={19}
              />
              <FitBounds />
              <ZoomButtons />
              <ZoomController activeCountry={activeCountry} />
              <MapMarkers
                activeCountry={activeCountry}
                activeCity={activeCity}
                onCountryClick={handleCountryClick}
                onCityClick={handleCityClick}
              />
            </MapContainer>

            {activeCountry ? (
              <button
                onClick={() => { setActiveCountry(null); setActiveCity(null) }}
                className="absolute bottom-3 left-3 z-[400] font-mono text-[8px] tracking-widest rounded px-2.5 py-1.5"
                style={{ background: 'rgba(6,13,14,0.86)', border: '1px solid rgba(92,242,197,0.20)', color: 'rgba(232,237,245,0.60)' }}
              >
                ← {lang === 'en' ? 'ALL COUNTRIES' : 'TOUS LES PAYS'}
              </button>
            ) : (
              <div className="absolute bottom-3 left-3 z-[400] pointer-events-none">
                <span className="font-mono text-[8px] tracking-widest rounded px-2 py-1"
                  style={{ background: 'rgba(6,13,14,0.82)', color: 'rgba(232,237,245,0.45)' }}>
                  {lang === 'en' ? 'TAP A COUNTRY' : 'TOUCHEZ UN PAYS'}
                </span>
              </div>
            )}
          </div>
          <FactsPanel country={countryObj} city={cityObj} lang={lang} compact onCountryClick={handleCountryClick} />
        </div>

        {/* Stats */}
        <div
          className={`mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 opacity-0 ${inView ? 'reveal-up' : ''}`}
          style={{ animationDelay: '400ms' }}
        >
          {[
            { 
  value: '5',  
  label: lang === 'en'
    ? 'countries lived in'
    : 'pays où j’ai vécu'
},

{ 
  value: '21', 
  label: lang === 'en'
    ? 'countries explored'
    : 'pays découverts'
},

{ 
  value: '+100', 
  label: lang === 'en'
    ? 'stories, observations & encounters'
    : 'histoires, observations & rencontres'
},
          ].map(s => (
            <div key={s.value} className="flex items-baseline gap-2">
              <span className="font-display font-semibold text-xl text-kpi">{s.value}</span>
              <span className="font-mono text-[10px] text-text-dim">{s.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
