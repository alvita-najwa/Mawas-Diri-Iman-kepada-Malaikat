import React from 'react';

export const EightPointStar: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 24,
  className = '',
  color = '#AFC4D5'
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="20" y="20" width="60" height="60" rx="4" stroke={color} strokeWidth="4" />
      <rect
        x="20"
        y="20"
        width="60"
        height="60"
        rx="4"
        transform="rotate(45 50 50)"
        stroke={color}
        strokeWidth="4"
      />
      <circle cx="50" cy="50" r="6" fill={color} />
    </svg>
  );
};

export const SubtleArch: React.FC<{ className?: string; children?: React.ReactNode }> = ({
  className = '',
  children
}) => {
  return (
    <div className={`relative overflow-hidden rounded-t-[120px] md:rounded-t-[160px] border border-[#AFC4D5]/30 bg-white/70 shadow-sm p-6 md:p-8 ${className}`}>
      {/* Decorative top crest */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 opacity-60">
        <div className="w-1.5 h-1.5 rounded-full bg-[#D9B8B8]" />
        <EightPointStar size={14} color="#AFC4D5" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#C8BDD8]" />
      </div>
      {children}
    </div>
  );
};

export const CelestialBackgroundPattern: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
      {/* Soft gradient ambient spots */}
      <div
        className="absolute -top-[10%] -right-[10%] w-[55vw] h-[55vw] rounded-full blur-[120px] opacity-35"
        style={{ background: 'radial-gradient(circle, #AFC4D5 0%, #C8BDD8 50%, transparent 75%)' }}
      />
      <div
        className="absolute top-[45%] -left-[15%] w-[50vw] h-[50vw] rounded-full blur-[130px] opacity-30"
        style={{ background: 'radial-gradient(circle, #D9B8B8 0%, #B8AAA0 50%, transparent 75%)' }}
      />
      <div
        className="absolute -bottom-[10%] right-[15%] w-[45vw] h-[45vw] rounded-full blur-[120px] opacity-25"
        style={{ background: 'radial-gradient(circle, #C8BDD8 0%, #AFC4D5 60%, transparent 75%)' }}
      />

      {/* Subtle geometric starfield */}
      <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#3F4147_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Subtle Crescent Outline */}
      <svg
        className="absolute top-12 right-8 md:right-24 w-28 h-28 md:w-44 md:h-44 opacity-20 pointer-events-none"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M 50 10 A 40 40 0 1 0 90 50 A 30 30 0 1 1 50 10 Z"
          fill="#AFC4D5"
        />
        <circle cx="78" cy="28" r="3" fill="#D9B8B8" />
        <circle cx="88" cy="42" r="2" fill="#C8BDD8" />
      </svg>
    </div>
  );
};
