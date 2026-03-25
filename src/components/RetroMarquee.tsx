const TAGS = [
  'RETRO',
  '16-BIT',
  'ARCADE',
  'SPEEDRUN',
  'PIXEL',
  'RPG',
  'CRT',
  'CARTRIDGE',
  'HIGH SCORE',
  'SHUMGA',
  'JOYPAD',
  'EXTRA LIFE',
  'NO LAG',
  'SAVE POINT',
  'BOSS FIGHT',
]

export function RetroMarquee() {
  const doubled = [...TAGS, ...TAGS]
  return (
    <div
      className="border-y border-neon-cyan/25 bg-depth/80 py-3 overflow-hidden"
      aria-hidden
    >
      <div className="retro-marquee-track gap-12 px-6">
        {doubled.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="font-pixel text-[0.55rem] tracking-widest text-neon-magenta/90 md:text-[0.65rem]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
