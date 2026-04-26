'use client'

const sports = [
  'PÁDEL',
  'TENIS',
  'FÚTBOL',
  'BALONCESTO',
  'VOLLEYBALL',
  'FUTSAL',
  'SQUASH',
]

export function TickerMarquee() {
  const content = sports.map((sport, i) => (
    <span key={i} className="flex items-center gap-4">
      <span className="font-serif italic text-sp-gold text-lg md:text-xl whitespace-nowrap">
        {sport}
      </span>
      <span className="text-sp-gold">◆</span>
    </span>
  ))

  return (
    <div className="bg-sp-dark h-[52px] overflow-hidden flex items-center">
      <div className="flex animate-marquee">
        <div className="flex items-center gap-4 px-4">
          {content}
          {content}
          {content}
          {content}
        </div>
        <div className="flex items-center gap-4 px-4" aria-hidden="true">
          {content}
          {content}
          {content}
          {content}
        </div>
      </div>
    </div>
  )
}
