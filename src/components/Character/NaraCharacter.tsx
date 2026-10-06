import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { NaraPose } from '../../types';

interface NaraCharacterProps {
  pose?: NaraPose;
  bubbleText?: string;
  bubblePosition?: 'top' | 'left' | 'right';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showNameTag?: boolean;
}

export const NaraCharacter: React.FC<NaraCharacterProps> = ({
  pose = 'greeting',
  bubbleText,
  bubblePosition = 'top',
  className = '',
  size = 'md',
  showNameTag = true
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Dimensions based on size
  const sizeMap = {
    sm: { width: 140, height: 180 },
    md: { width: 200, height: 260 },
    lg: { width: 260, height: 340 },
    hero: { width: 320, height: 420 }
  };

  const { width, height } = sizeMap[size];

  // Render pose-specific elements (arms, facial expressions, head tilt, gestures)
  const renderPoseArtwork = () => {
    switch (pose) {
      case 'thinking':
        return (
          <g id="nara-thinking">
            {/* Hijab Base */}
            <path
              d="M 60 75 C 50 35 150 35 140 75 C 155 125 150 195 135 220 C 120 235 80 235 65 220 C 50 195 45 125 60 75 Z"
              fill="#D9B8B8"
            />
            {/* Hijab Inner Frame / Fold */}
            <path
              d="M 68 85 C 65 60 135 60 132 85 C 142 120 132 170 100 178 C 68 170 58 120 68 85 Z"
              fill="#C8BDD8"
              opacity="0.4"
            />
            {/* Face */}
            <ellipse cx="100" cy="115" rx="32" ry="36" fill="#FCEEE6" />
            {/* Cheeks blush */}
            <circle cx="82" cy="122" r="6" fill="#D9B8B8" opacity="0.6" />
            <circle cx="118" cy="122" r="6" fill="#D9B8B8" opacity="0.6" />
            {/* Eyes looking up/thoughtful */}
            <ellipse cx="86" cy="110" rx="3.5" ry="4.5" fill="#3F4147" />
            <ellipse cx="114" cy="110" rx="3.5" ry="4.5" fill="#3F4147" />
            <circle cx="88" cy="108" r="1.5" fill="#FFFFFF" />
            <circle cx="116" cy="108" r="1.5" fill="#FFFFFF" />
            {/* Eyebrows curved slightly inquiring */}
            <path d="M 80 101 Q 87 97 93 100" stroke="#3F4147" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 107 100 Q 113 97 120 102" stroke="#3F4147" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {/* Small subtle thought mouth */}
            <ellipse cx="100" cy="132" rx="3" ry="2" fill="#3F4147" opacity="0.8" />
            {/* Hijab drape over neck & chest */}
            <path
              d="M 65 170 C 65 210 135 210 135 170 C 145 200 155 240 155 270 C 130 275 70 275 45 270 C 45 240 55 200 65 170 Z"
              fill="#D9B8B8"
            />
            {/* Modest Tunic / Dress in Dusty Blue */}
            <path d="M 45 250 L 155 250 L 170 340 L 30 340 Z" fill="#AFC4D5" />
            {/* Arm with finger to chin */}
            <path
              d="M 145 260 C 145 230 130 160 112 140 C 108 135 102 135 104 145 C 112 170 120 220 125 270"
              stroke="#B8AAA0"
              strokeWidth="11"
              strokeLinecap="round"
              fill="none"
            />
            {/* Left resting arm */}
            <path
              d="M 55 260 C 50 280 45 300 48 320"
              stroke="#AFC4D5"
              strokeWidth="12"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        );

      case 'explaining':
        return (
          <g id="nara-explaining">
            <path
              d="M 60 75 C 50 35 150 35 140 75 C 155 125 150 195 135 220 C 120 235 80 235 65 220 C 50 195 45 125 60 75 Z"
              fill="#D9B8B8"
            />
            <path
              d="M 68 85 C 65 60 135 60 132 85 C 142 120 132 170 100 178 C 68 170 58 120 68 85 Z"
              fill="#C8BDD8"
              opacity="0.4"
            />
            <ellipse cx="100" cy="115" rx="32" ry="36" fill="#FCEEE6" />
            <circle cx="82" cy="122" r="6" fill="#D9B8B8" opacity="0.6" />
            <circle cx="118" cy="122" r="6" fill="#D9B8B8" opacity="0.6" />
            <ellipse cx="88" cy="113" rx="3.5" ry="4.5" fill="#3F4147" />
            <ellipse cx="112" cy="113" rx="3.5" ry="4.5" fill="#3F4147" />
            <circle cx="90" cy="111" r="1.5" fill="#FFFFFF" />
            <circle cx="114" cy="111" r="1.5" fill="#FFFFFF" />
            <path d="M 81 103 Q 88 100 94 103" stroke="#3F4147" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 106 103 Q 112 100 119 103" stroke="#3F4147" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {/* Friendly explaining smile */}
            <path d="M 92 129 Q 100 137 108 129" stroke="#3F4147" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path
              d="M 65 170 C 65 210 135 210 135 170 C 145 200 155 240 155 270 C 130 275 70 275 45 270 C 45 240 55 200 65 170 Z"
              fill="#D9B8B8"
            />
            <path d="M 45 250 L 155 250 L 170 340 L 30 340 Z" fill="#AFC4D5" />
            {/* Explaining open hand on right */}
            <path
              d="M 140 255 C 160 240 175 220 185 200"
              stroke="#B8AAA0"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="187" cy="198" r="6" fill="#FCEEE6" />
            {/* Left resting arm */}
            <path
              d="M 60 255 C 50 270 45 290 48 310"
              stroke="#AFC4D5"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        );

      case 'pointing':
        return (
          <g id="nara-pointing">
            <path
              d="M 60 75 C 50 35 150 35 140 75 C 155 125 150 195 135 220 C 120 235 80 235 65 220 C 50 195 45 125 60 75 Z"
              fill="#D9B8B8"
            />
            <path
              d="M 68 85 C 65 60 135 60 132 85 C 142 120 132 170 100 178 C 68 170 58 120 68 85 Z"
              fill="#C8BDD8"
              opacity="0.4"
            />
            <ellipse cx="100" cy="115" rx="32" ry="36" fill="#FCEEE6" />
            <circle cx="82" cy="122" r="6" fill="#D9B8B8" opacity="0.6" />
            <circle cx="118" cy="122" r="6" fill="#D9B8B8" opacity="0.6" />
            <ellipse cx="90" cy="114" rx="3.5" ry="4.5" fill="#3F4147" />
            <ellipse cx="115" cy="114" rx="3.5" ry="4.5" fill="#3F4147" />
            <circle cx="92" cy="112" r="1.5" fill="#FFFFFF" />
            <circle cx="117" cy="112" r="1.5" fill="#FFFFFF" />
            <path d="M 83 104 Q 89 101 96 104" stroke="#3F4147" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 108 104 Q 115 101 122 104" stroke="#3F4147" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 94 130 Q 102 136 110 130" stroke="#3F4147" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path
              d="M 65 170 C 65 210 135 210 135 170 C 145 200 155 240 155 270 C 130 275 70 275 45 270 C 45 240 55 200 65 170 Z"
              fill="#D9B8B8"
            />
            <path d="M 45 250 L 155 250 L 170 340 L 30 340 Z" fill="#AFC4D5" />
            {/* Pointing arm extended forward/up */}
            <path
              d="M 140 250 C 165 230 185 200 195 170"
              stroke="#B8AAA0"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
            {/* Pointing finger */}
            <path d="M 195 170 L 202 155" stroke="#FCEEE6" strokeWidth="5" strokeLinecap="round" />
            {/* Left arm resting */}
            <path
              d="M 58 255 C 50 275 45 295 48 315"
              stroke="#AFC4D5"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        );

      case 'curious':
        return (
          <g id="nara-curious" transform="rotate(-3 100 150)">
            <path
              d="M 60 75 C 50 35 150 35 140 75 C 155 125 150 195 135 220 C 120 235 80 235 65 220 C 50 195 45 125 60 75 Z"
              fill="#D9B8B8"
            />
            <path
              d="M 68 85 C 65 60 135 60 132 85 C 142 120 132 170 100 178 C 68 170 58 120 68 85 Z"
              fill="#C8BDD8"
              opacity="0.4"
            />
            <ellipse cx="100" cy="115" rx="32" ry="36" fill="#FCEEE6" />
            <circle cx="82" cy="122" r="6" fill="#D9B8B8" opacity="0.6" />
            <circle cx="118" cy="122" r="6" fill="#D9B8B8" opacity="0.6" />
            {/* Big curious eyes */}
            <ellipse cx="87" cy="112" rx="4.5" ry="5.5" fill="#3F4147" />
            <ellipse cx="113" cy="112" rx="4.5" ry="5.5" fill="#3F4147" />
            <circle cx="89" cy="110" r="2" fill="#FFFFFF" />
            <circle cx="115" cy="110" r="2" fill="#FFFFFF" />
            <path d="M 80 100 Q 88 95 95 100" stroke="#3F4147" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 106 100 Q 114 96 122 101" stroke="#3F4147" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {/* Small surprised cute mouth */}
            <ellipse cx="100" cy="131" rx="3.5" ry="4" fill="#3F4147" opacity="0.8" />
            <path
              d="M 65 170 C 65 210 135 210 135 170 C 145 200 155 240 155 270 C 130 275 70 275 45 270 C 45 240 55 200 65 170 Z"
              fill="#D9B8B8"
            />
            <path d="M 45 250 L 155 250 L 170 340 L 30 340 Z" fill="#AFC4D5" />
            {/* Both hands holding gentle pose near chest */}
            <path
              d="M 65 260 C 75 245 90 235 100 240"
              stroke="#B8AAA0"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 135 260 C 125 245 110 235 100 240"
              stroke="#B8AAA0"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
            <ellipse cx="100" cy="238" rx="7" ry="5" fill="#FCEEE6" />
          </g>
        );

      case 'happy':
        return (
          <g id="nara-happy">
            <path
              d="M 60 75 C 50 35 150 35 140 75 C 155 125 150 195 135 220 C 120 235 80 235 65 220 C 50 195 45 125 60 75 Z"
              fill="#D9B8B8"
            />
            <path
              d="M 68 85 C 65 60 135 60 132 85 C 142 120 132 170 100 178 C 68 170 58 120 68 85 Z"
              fill="#C8BDD8"
              opacity="0.4"
            />
            <ellipse cx="100" cy="115" rx="32" ry="36" fill="#FCEEE6" />
            <circle cx="80" cy="123" r="7" fill="#D9B8B8" opacity="0.6" />
            <circle cx="120" cy="123" r="7" fill="#D9B8B8" opacity="0.6" />
            {/* Joyful crescent eyes */}
            <path d="M 83 115 Q 89 108 95 115" stroke="#3F4147" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <path d="M 105 115 Q 111 108 117 115" stroke="#3F4147" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <path d="M 81 101 Q 88 98 95 101" stroke="#3F4147" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 105 101 Q 112 98 119 101" stroke="#3F4147" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {/* Big warm happy smile */}
            <path d="M 91 127 Q 100 138 109 127" stroke="#3F4147" strokeWidth="2.2" fill="#E89898" strokeLinecap="round" />
            <path
              d="M 65 170 C 65 210 135 210 135 170 C 145 200 155 240 155 270 C 130 275 70 275 45 270 C 45 240 55 200 65 170 Z"
              fill="#D9B8B8"
            />
            <path d="M 45 250 L 155 250 L 170 340 L 30 340 Z" fill="#AFC4D5" />
            {/* Clapped hands together */}
            <path
              d="M 60 255 C 75 245 90 230 96 230"
              stroke="#B8AAA0"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 140 255 C 125 245 110 230 104 230"
              stroke="#B8AAA0"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="100" cy="230" r="7" fill="#FCEEE6" />
          </g>
        );

      case 'reflecting':
        return (
          <g id="nara-reflecting">
            <path
              d="M 60 75 C 50 35 150 35 140 75 C 155 125 150 195 135 220 C 120 235 80 235 65 220 C 50 195 45 125 60 75 Z"
              fill="#D9B8B8"
            />
            <path
              d="M 68 85 C 65 60 135 60 132 85 C 142 120 132 170 100 178 C 68 170 58 120 68 85 Z"
              fill="#C8BDD8"
              opacity="0.4"
            />
            <ellipse cx="100" cy="115" rx="32" ry="36" fill="#FCEEE6" />
            <circle cx="82" cy="122" r="5" fill="#D9B8B8" opacity="0.5" />
            <circle cx="118" cy="122" r="5" fill="#D9B8B8" opacity="0.5" />
            {/* Serene closed eyes reflecting */}
            <path d="M 83 114 Q 89 119 95 114" stroke="#3F4147" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <path d="M 105 114 Q 111 119 117 114" stroke="#3F4147" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <path d="M 82 104 Q 89 102 95 104" stroke="#3F4147" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <path d="M 105 104 Q 111 102 118 104" stroke="#3F4147" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            {/* Gentle calm serene smile */}
            <path d="M 94 130 Q 100 134 106 130" stroke="#3F4147" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path
              d="M 65 170 C 65 210 135 210 135 170 C 145 200 155 240 155 270 C 130 275 70 275 45 270 C 45 240 55 200 65 170 Z"
              fill="#D9B8B8"
            />
            <path d="M 45 250 L 155 250 L 170 340 L 30 340 Z" fill="#AFC4D5" />
            {/* Right hand placed reverently on the heart/chest */}
            <path
              d="M 140 255 C 130 235 115 220 98 225"
              stroke="#B8AAA0"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
            <ellipse cx="96" cy="225" rx="6" ry="5" fill="#FCEEE6" />
            {/* Left hand relaxed near waist */}
            <path
              d="M 60 255 C 55 275 52 295 54 315"
              stroke="#AFC4D5"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        );

      case 'celebrating':
        return (
          <g id="nara-celebrating">
            <path
              d="M 60 75 C 50 35 150 35 140 75 C 155 125 150 195 135 220 C 120 235 80 235 65 220 C 50 195 45 125 60 75 Z"
              fill="#D9B8B8"
            />
            <path
              d="M 68 85 C 65 60 135 60 132 85 C 142 120 132 170 100 178 C 68 170 58 120 68 85 Z"
              fill="#C8BDD8"
              opacity="0.4"
            />
            <ellipse cx="100" cy="115" rx="32" ry="36" fill="#FCEEE6" />
            <circle cx="80" cy="123" r="7" fill="#D9B8B8" opacity="0.6" />
            <circle cx="120" cy="123" r="7" fill="#D9B8B8" opacity="0.6" />
            <path d="M 83 115 Q 89 108 95 115" stroke="#3F4147" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <path d="M 105 115 Q 111 108 117 115" stroke="#3F4147" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <path d="M 81 99 Q 88 95 95 99" stroke="#3F4147" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 105 99 Q 112 95 119 99" stroke="#3F4147" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 90 126 Q 100 140 110 126" stroke="#3F4147" strokeWidth="2" fill="#E89898" strokeLinecap="round" />
            <path
              d="M 65 170 C 65 210 135 210 135 170 C 145 200 155 240 155 270 C 130 275 70 275 45 270 C 45 240 55 200 65 170 Z"
              fill="#D9B8B8"
            />
            <path d="M 45 250 L 155 250 L 170 340 L 30 340 Z" fill="#AFC4D5" />
            {/* Both arms raised with joy */}
            <path
              d="M 55 250 C 40 220 30 180 35 160"
              stroke="#B8AAA0"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="36" cy="158" r="6" fill="#FCEEE6" />
            <path
              d="M 145 250 C 160 220 170 180 165 160"
              stroke="#B8AAA0"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="164" cy="158" r="6" fill="#FCEEE6" />
          </g>
        );

      case 'greeting':
      default:
        return (
          <g id="nara-greeting">
            {/* Hijab Base - Soft Dusty Rose */}
            <path
              d="M 60 75 C 50 35 150 35 140 75 C 155 125 150 195 135 220 C 120 235 80 235 65 220 C 50 195 45 125 60 75 Z"
              fill="#D9B8B8"
            />
            {/* Hijab Inner Frame / Fold - Soft Lavender accent */}
            <path
              d="M 68 85 C 65 60 135 60 132 85 C 142 120 132 170 100 178 C 68 170 58 120 68 85 Z"
              fill="#C8BDD8"
              opacity="0.4"
            />
            {/* Face */}
            <ellipse cx="100" cy="115" rx="32" ry="36" fill="#FCEEE6" />
            {/* Cheeks blush */}
            <circle cx="82" cy="122" r="6" fill="#D9B8B8" opacity="0.6" />
            <circle cx="118" cy="122" r="6" fill="#D9B8B8" opacity="0.6" />
            {/* Eyes */}
            <ellipse cx="88" cy="112" rx="3.5" ry="4.5" fill="#3F4147" />
            <ellipse cx="112" cy="112" rx="3.5" ry="4.5" fill="#3F4147" />
            {/* Light sparkles in eyes */}
            <circle cx="90" cy="110" r="1.5" fill="#FFFFFF" />
            <circle cx="114" cy="110" r="1.5" fill="#FFFFFF" />
            {/* Eyebrows */}
            <path d="M 82 102 Q 88 99 94 102" stroke="#3F4147" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 106 102 Q 112 99 118 102" stroke="#3F4147" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {/* Sweet welcoming smile */}
            <path d="M 92 128 Q 100 136 108 128" stroke="#3F4147" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            {/* Hijab Drape over Neck & Chest */}
            <path
              d="M 65 170 C 65 210 135 210 135 170 C 145 200 155 240 155 270 C 130 275 70 275 45 270 C 45 240 55 200 65 170 Z"
              fill="#D9B8B8"
            />
            {/* Modest Tunic / Dress in Dusty Blue */}
            <path d="M 45 250 L 155 250 L 170 340 L 30 340 Z" fill="#AFC4D5" />
            {/* Right arm waving in greeting */}
            <path
              d="M 140 250 C 160 230 170 200 175 175"
              stroke="#B8AAA0"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
            {/* Waving hand */}
            <circle cx="177" cy="170" r="6" fill="#FCEEE6" />
            {/* Left resting arm */}
            <path
              d="M 60 255 C 50 275 45 295 48 315"
              stroke="#AFC4D5"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        );
    }
  };

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Speech Bubble */}
      {bubbleText && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`mb-3 max-w-[260px] md:max-w-[320px] rounded-2xl bg-white/95 px-4 py-3 shadow-md border border-[#AFC4D5]/30 text-sm md:text-base text-[#3F4147] relative z-20 ${
            bubblePosition === 'left' ? 'self-end mr-4' : bubblePosition === 'right' ? 'self-start ml-4' : ''
          }`}
        >
          <p className="font-caveat-accent text-lg md:text-xl text-[#3F4147] leading-tight">
            “{bubbleText}”
          </p>
          {/* Bubble tail */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-b border-r border-[#AFC4D5]/30" />
        </motion.div>
      )}

      {/* Character Graphic with Gentle Floating Animation */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -4, 0],
                rotate: [0, 0.5, 0, -0.5, 0]
              }
        }
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="relative"
      >
        {/* Soft background aura/glow */}
        <div
          className="absolute inset-0 -m-3 rounded-full blur-xl opacity-40 pointer-events-none -z-10"
          style={{ background: 'radial-gradient(circle, #D9B8B8 0%, #AFC4D5 60%, transparent 80%)' }}
        />

        <svg
          width={width}
          height={height}
          viewBox="0 0 200 350"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-sm transition-transform duration-300"
        >
          {renderPoseArtwork()}
        </svg>

        {/* Small subtle name badge */}
        {showNameTag && (
          <div className="text-center mt-1">
            <span className="text-[11px] font-semibold tracking-wider text-[#3F4147]/70 uppercase">
              Nara · Sahabat Belajarmu
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
};
