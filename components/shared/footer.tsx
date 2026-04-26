'use client'

import Link from 'next/link'
import { FOOTER_LINKS, SOCIAL_LINKS } from '@/lib/constants'
import { PoweredByBadge } from './powered-by-badge'

export function Footer() {
  return (
    <footer className="bg-sp-dark text-white">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-sans text-xl font-medium text-white">
                SportsPrime
              </span>
            </Link>
            <PoweredByBadge size="md" className="block mt-1 font-serif" />
            
            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              El Sistema Operativo del Deporte Colombiano
            </p>
            
            <p className="mt-4 font-mono text-xs text-sp-muted">
              Construido en Cúcuta. Para toda Colombia.
            </p>
          </div>

          {/* Plataforma */}
          <div>
            <h4 className="font-sans text-sm font-medium text-white/40 uppercase tracking-wider mb-4">
              Plataforma
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.plataforma.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-sp-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tecnología */}
          <div>
            <h4 className="font-sans text-sm font-medium text-white/40 uppercase tracking-wider mb-4">
              Tecnología
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.tecnologia.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-sp-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-sans text-sm font-medium text-white/40 uppercase tracking-wider mb-4">
              Empresa
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-sp-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-sp-gold transition-colors"
                  aria-label={social.name}
                >
                  <SocialIcon name={social.name} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-[11px] text-sp-muted text-center md:text-left">
              © 2026 SportsPrime SAS · NIT Colombia · Todos los derechos reservados
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/terminos"
                className="font-mono text-[11px] text-sp-muted hover:text-white transition-colors"
              >
                Términos
              </Link>
              <Link
                href="/privacidad"
                className="font-mono text-[11px] text-sp-muted hover:text-white transition-colors"
              >
                Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ name }: { name: string }) {
  const iconProps = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (name) {
    case 'Instagram':
      return (
        <svg {...iconProps}>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="18" cy="6" r="1" fill="currentColor" />
        </svg>
      )
    case 'LinkedIn':
      return (
        <svg {...iconProps}>
          <rect x="2" y="2" width="20" height="20" rx="2" />
          <line x1="8" y1="11" x2="8" y2="16" />
          <line x1="8" y1="8" x2="8" y2="8.01" />
          <path d="M12 16v-5c0-1 1-2 2-2s2 1 2 2v5" />
        </svg>
      )
    case 'YouTube':
      return (
        <svg {...iconProps}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <polygon points="10 9 15 12 10 15" fill="currentColor" />
        </svg>
      )
    case 'WhatsApp':
      return (
        <svg {...iconProps}>
          <path d="M21 11.5a8.5 8.5 0 0 1-11.3 8l-5.7 1.5 1.5-5.7A8.5 8.5 0 1 1 21 11.5z" />
          <path d="M9 10.5c0 .5.2 1.5 1 2.5s2 2 2.5 2c.7 0 1-.5 1-.5s.3-.2.5-.5c.2-.3.3-.3.5-.3.3 0 1 .5 1.5.8.5.3.8.5 1 .7.2.2.3.5.2.8-.1.4-.5 1-1 1.5s-1 .5-1.5.5c-1 0-3-1-4.5-2.5S7.5 12 7.5 11c0-.5 0-1 .5-1.5s1.1-.9 1.5-1c.3-.1.6 0 .8.2.2.2.4.5.7 1 .3.5.8 1.2.8 1.5 0 .2-.1.5-.3.5-.2.2-.5.5-.5.5s0 .1 0 .3z" />
        </svg>
      )
    default:
      return null
  }
}
