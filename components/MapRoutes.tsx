interface MapRoutesProps {
  hoveredNode: string | null;
}

const routes = [
  {
    id: 'intro-projects',
    from: 'home',
    to: 'projects',
    d: 'M 210 210 C 360 250, 430 270, 500 320',
  },
  {
    id: 'projects-skills',
    from: 'projects',
    to: 'skills',
    d: 'M 520 330 C 640 260, 740 210, 820 190',
  },
  {
    id: 'projects-experience',
    from: 'projects',
    to: 'experience',
    d: 'M 490 360 C 400 420, 320 460, 250 490',
  },
  {
    id: 'projects-contact',
    from: 'projects',
    to: 'contact',
    d: 'M 560 360 C 680 430, 770 470, 860 460',
  },
];

export default function MapRoutes({ hoveredNode }: MapRoutesProps) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1000 600"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="routeGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="routeGradientActive" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF6AD5" />
          <stop offset="50%" stopColor="#7DF9FF" />
          <stop offset="100%" stopColor="#B87CFF" />
        </linearGradient>
        <linearGradient id="routeGradientIdle" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
        </linearGradient>
      </defs>
      {routes.map((route) => {
        const isActive =
          hoveredNode === route.from ||
          hoveredNode === route.to ||
          (hoveredNode === 'projects' && route.from === 'projects');
        return (
          <path
            key={route.id}
            d={route.d}
            stroke={isActive ? 'url(#routeGradientActive)' : 'url(#routeGradientIdle)'}
            strokeWidth={isActive ? 3 : 2}
            filter="url(#routeGlow)"
            opacity={isActive ? 0.9 : 0.45}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}
