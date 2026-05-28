import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * Rettesteg-ikonet: rundet firkant med hvit steg-pil-form inni.
 * Symbolet er en Z-formet sti som peker oppover — "ta det rette steget".
 */
export function LogoIcon({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Bakgrunn */}
      <rect width="40" height="40" rx="10" fill="#7c3aed" />

      {/* Steg-pil: nedre chevron */}
      <polyline
        points="9,33 20,22 31,33"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Steg-pil: øvre chevron (større + pil) */}
      <polyline
        points="9,22 20,11 31,22"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Pilhode-hale — liten strek for å forsterke oppover-bevegelse */}
      <line
        x1="20"
        y1="11"
        x2="20"
        y2="7"
        stroke="#84cc16"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface LogoProps {
  href?: string;
  light?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  hideText?: boolean;
}

export function Logo({
  href = '/',
  light = false,
  size = 'md',
  className,
  hideText = false,
}: LogoProps) {
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 44 : 36;
  const textClass = size === 'sm'
    ? 'text-lg'
    : size === 'lg'
      ? 'text-2xl'
      : 'text-xl';

  const content = (
    <span className={cn('inline-flex items-center gap-2.5 group', className)}>
      <LogoIcon size={iconSize} className="group-hover:scale-105 transition-transform flex-shrink-0" />
      {!hideText && (
        <span
          className={cn(
            'font-display font-bold tracking-tight',
            textClass,
            light ? 'text-white' : 'text-foreground'
          )}
        >
          rettesteg
          <span style={{ color: '#84cc16' }}>.no</span>
        </span>
      )}
    </span>
  );

  if (!href) return content;
  return (
    <Link href={href} aria-label="Rettesteg — tilbake til forsiden">
      {content}
    </Link>
  );
}
