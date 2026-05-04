type Props = { name: string; className?: string };

export default function Icon({ name, className = "h-6 w-6" }: Props) {
  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24"
  };
  switch (name) {
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.5 5.5l2.5 2.5M16 16l2.5 2.5M5.5 18.5 8 16M16 8l2.5-2.5" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case "cube":
      return (
        <svg {...common}>
          <path d="M12 3 4 7v10l8 4 8-4V7l-8-4z" />
          <path d="M4 7l8 4 8-4M12 11v10" />
        </svg>
      );
    case "wave":
      return (
        <svg {...common}>
          <path d="M3 12c2 0 2-3 4.5-3S9.5 12 12 12s2-3 4.5-3S18.5 12 21 12" />
          <path d="M3 17c2 0 2-3 4.5-3S9.5 17 12 17s2-3 4.5-3S18.5 17 21 17" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15 9-2 5-5 2 2-5z" />
        </svg>
      );
    case "frame":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="1" />
          <path d="M4 9h16M9 4v16" />
        </svg>
      );
    case "play":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M10 8.5v7l6-3.5z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
