type Props = { name: string; className?: string };

/**
 * Minimal brand-mark SVGs. currentColor follows text color so they
 * render correctly in both dark and light themes.
 */
export default function SocialIcon({ name, className = "h-5 w-5" }: Props) {
  switch (name) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M19.6 6.7c-1.3-.2-2.4-1-3.1-2.1-.4-.7-.6-1.4-.6-2.2h-3.3v12.4c0 1.5-1.2 2.7-2.7 2.7-.7 0-1.4-.3-1.9-.8-.5-.5-.8-1.2-.8-1.9 0-1.5 1.2-2.7 2.7-2.7.3 0 .6.1.9.2v-3.4c-.3 0-.6-.1-.9-.1-3.3 0-6 2.7-6 6 0 1.6.6 3.1 1.8 4.2 1.1 1.1 2.6 1.8 4.2 1.8 3.3 0 6-2.7 6-6V9.5c1.3.9 2.9 1.4 4.5 1.4V7.5c-.3 0-.6-.1-.8-.1z"/>
        </svg>
      );
    case "dribbble":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M8.5 3.5C12 8 13.6 12.4 14.5 20.4" />
          <path d="M3.5 10c5 0 11.6.5 16.7 4.4" />
          <path d="M20.5 8.5C16.5 11.5 11 13 3.6 13" />
        </svg>
      );
    case "behance":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 5.5h5.2c1.6 0 2.9 1 2.9 2.6 0 1-.5 1.7-1.3 2.1 1.2.3 2 1.3 2 2.6 0 1.9-1.4 3-3.4 3H2.5z" />
          <path d="M2.5 10.7h5.5" />
          <path d="M14.5 9.5h5.5" />
          <path d="M14 14h6.5c0-2-1.5-3.6-3.4-3.6S14 12 14 14s1.5 3.6 3.5 3.6c1.4 0 2.6-.8 3.1-1.9" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.5 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7v7.44h-4.55v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.5V22H7.72V8z"/>
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M23 7.2s-.2-1.6-.9-2.3c-.8-.9-1.8-.9-2.2-1C16.8 3.5 12 3.5 12 3.5s-4.8 0-7.9.4c-.4 0-1.4 0-2.2 1C1.2 5.6 1 7.2 1 7.2S.8 9.1.8 11v1.7c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.8.9 1.9.8 2.4.9 1.7.2 7.7.4 7.7.4s4.8 0 7.9-.4c.4 0 1.4 0 2.2-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.7V11c0-1.9-.2-3.8-.2-3.8zM9.7 14.7V8.4l6.2 3.2-6.2 3.1z"/>
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.91l-4.84-6.32L5.6 22H2.34l8.02-9.16L1.5 2h7.09l4.37 5.78L18.24 2zm-1.21 18h1.84L7.06 4H5.1l11.93 16z"/>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
