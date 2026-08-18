'use client';

import { useState, useEffect } from 'react';
import { Minus, Plus, Type, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSidebarStore } from '@/app/(afterLogin)/_state/useSidebarStore';

export interface KeyColorOption {
  id: string;
  name: string;
  hex: string;
  vars: Record<string, string>;
}

export const KEY_COLORS: KeyColorOption[] = [
  {
    id: 'indigo',
    name: '인디고',
    hex: '#6366f1',
    vars: {
      '--custom-indigo': 'oklch(51.1% 0.262 276.966)',
      '--custom-indigo-side': 'oklch(67.3% 0.182 276.935)',
      '--custom-indigo-bg': 'oklch(97.2% 0.018 272.314)',
      '--custom-indigo-hover': 'oklch(45.7% 0.24 277.023)',
      '--custom-indigo-border': 'oklch(87% 0.065 274.039)',
      '--custom-indigo-border-hover': 'oklch(87% 0.065 274.039)',
      '--primary': 'oklch(54% 0.22 264)',
      '--primary-bg': 'oklch(95.2% 0.016 264)',
    },
  },
  {
    id: 'blue',
    name: '블루',
    hex: '#3b82f6',
    vars: {
      '--custom-indigo': 'oklch(54% 0.22 255)',
      '--custom-indigo-side': 'oklch(60% 0.2 255)',
      '--custom-indigo-bg': 'oklch(97% 0.015 255)',
      '--custom-indigo-hover': 'oklch(45% 0.24 255)',
      '--custom-indigo-border': 'oklch(85% 0.05 255)',
      '--custom-indigo-border-hover': 'oklch(85% 0.05 255)',
      '--primary': 'oklch(54% 0.22 255)',
      '--primary-bg': 'oklch(97% 0.015 255)',
    },
  },
  {
    id: 'emerald',
    name: '에메랄드',
    hex: '#10b981',
    vars: {
      '--custom-indigo': 'oklch(54% 0.18 162)',
      '--custom-indigo-side': 'oklch(60% 0.18 162)',
      '--custom-indigo-bg': 'oklch(97% 0.02 162)',
      '--custom-indigo-hover': 'oklch(45% 0.2 162)',
      '--custom-indigo-border': 'oklch(87% 0.06 162)',
      '--custom-indigo-border-hover': 'oklch(87% 0.06 162)',
      '--primary': 'oklch(54% 0.18 162)',
      '--primary-bg': 'oklch(97% 0.02 162)',
    },
  },
  {
    id: 'rose',
    name: '로즈',
    hex: '#f43f5e',
    vars: {
      '--custom-indigo': 'oklch(54% 0.22 15)',
      '--custom-indigo-side': 'oklch(60% 0.2 15)',
      '--custom-indigo-bg': 'oklch(97% 0.02 15)',
      '--custom-indigo-hover': 'oklch(45% 0.24 15)',
      '--custom-indigo-border': 'oklch(87% 0.06 15)',
      '--custom-indigo-border-hover': 'oklch(87% 0.06 15)',
      '--primary': 'oklch(54% 0.22 15)',
      '--primary-bg': 'oklch(97% 0.02 15)',
    },
  },
  {
    id: 'purple',
    name: '퍼플',
    hex: '#a855f7',
    vars: {
      '--custom-indigo': 'oklch(52% 0.25 300)',
      '--custom-indigo-side': 'oklch(60% 0.22 300)',
      '--custom-indigo-bg': 'oklch(97% 0.02 300)',
      '--custom-indigo-hover': 'oklch(44% 0.26 300)',
      '--custom-indigo-border': 'oklch(87% 0.06 300)',
      '--custom-indigo-border-hover': 'oklch(87% 0.06 300)',
      '--primary': 'oklch(52% 0.25 300)',
      '--primary-bg': 'oklch(97% 0.02 300)',
    },
  },
  {
    id: 'orange',
    name: '오렌지',
    hex: '#f97316',
    vars: {
      '--custom-indigo': 'oklch(58% 0.22 45)',
      '--custom-indigo-side': 'oklch(64% 0.21 45)',
      '--custom-indigo-bg': 'oklch(97% 0.02 45)',
      '--custom-indigo-hover': 'oklch(48% 0.24 45)',
      '--custom-indigo-border': 'oklch(87% 0.07 45)',
      '--custom-indigo-border-hover': 'oklch(87% 0.07 45)',
      '--primary': 'oklch(58% 0.22 45)',
      '--primary-bg': 'oklch(97% 0.02 45)',
    },
  },
];

export default function ClickFontScaleAction() {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);
  const [fontSize, setFontSize] = useState(18);
  const [activeColor, setActiveColor] = useState('indigo');
  const [hoverPalette, setHoverPalette] = useState(false);
  const [hoverFont, setHoverFont] = useState(false);

  const applyKeyColor = (colorId: string) => {
    const selected = KEY_COLORS.find((c) => c.id === colorId) || KEY_COLORS[0];
    Object.entries(selected.vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  };

  useEffect(() => {
    const savedFont = localStorage.getItem('font-size');
    if (savedFont) {
      const parsed = parseInt(savedFont, 10);
      if (!isNaN(parsed) && parsed >= 12 && parsed <= 24) {
        setFontSize(parsed);
        document.documentElement.style.setProperty('--font-size', `${parsed}px`);
      }
    } else {
      document.documentElement.style.setProperty('--font-size', '18px');
    }

    const savedColor = localStorage.getItem('key-color');
    if (savedColor) {
      setActiveColor(savedColor);
      applyKeyColor(savedColor);
    }
  }, []);

  const changeFontSize = (delta: number) => {
    setFontSize((prev) => {
      const next = Math.max(12, Math.min(24, prev + delta));
      localStorage.setItem('font-size', next.toString());
      document.documentElement.style.setProperty('--font-size', `${next}px`);
      return next;
    });
  };

  const handleSelectColor = (colorId: string) => {
    setActiveColor(colorId);
    localStorage.setItem('key-color', colorId);
    applyKeyColor(colorId);
  };

  const percentage = Math.round((fontSize / 16) * 100);
  const showPaletteDetails = !isCollapsed || hoverPalette;
  const showFontDetails = !isCollapsed || hoverFont;

  return (
    <motion.div
      animate={{
        left: isCollapsed ? 12 : 20,
      }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed bottom-6 z-50 flex flex-col items-start gap-2"
    >
      {/* Palette Pill */}
      <div
        onMouseEnter={() => setHoverPalette(true)}
        onMouseLeave={() => setHoverPalette(false)}
        className="flex items-center rounded-full border border-slate-200 bg-white/90 p-1.5 shadow-lg backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90"
      >
        <button
          type="button"
          onClick={() => setHoverPalette((prev) => !prev)}
          className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400"
          title="키컬러 변경"
        >
          <Palette size={12} />
        </button>

        <motion.div
          animate={{
            width: showPaletteDetails ? 'auto' : 0,
            opacity: showPaletteDetails ? 1 : 0,
            marginLeft: showPaletteDetails ? 6 : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="flex items-center gap-1.5 overflow-hidden"
        >
          {KEY_COLORS.map((c) => (
            <button
              key={c.id}
              type="button"
              title={`${c.name} 키컬러 변경`}
              onClick={() => handleSelectColor(c.id)}
              style={{ backgroundColor: c.hex }}
              className={`h-4 w-4 shrink-0 cursor-pointer rounded-full transition-transform hover:scale-115 ${ activeColor === c.id ? 'ring-2 ring-slate-700 ring-offset-1 dark:ring-slate-300' : 'opacity-80 hover:opacity-100' }`}
            />
          ))}
        </motion.div>
      </div>

      {/* Font Scale Pill */}
      <div
        onMouseEnter={() => setHoverFont(true)}
        onMouseLeave={() => setHoverFont(false)}
        className="flex items-center rounded-full border border-slate-200 bg-white/90 p-1 shadow-lg backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90"
      >
        <button
          type="button"
          onClick={() => setHoverFont((prev) => !prev)}
          className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400"
          title="글자 크기 조절"
        >
          <Type size={14} />
        </button>

        <motion.div
          animate={{
            width: showFontDetails ? 'auto' : 0,
            opacity: showFontDetails ? 1 : 0,
            marginLeft: showFontDetails ? 4 : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="flex items-center overflow-hidden"
        >
          <button
            onClick={() => changeFontSize(-1)}
            className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
            title="글자 크기 축소"
          >
            <Minus size={14} />
          </button>

          <span className="w-9 shrink-0 text-center text-11 font-black text-slate-700 dark:text-slate-300">
            {percentage}%
          </span>

          <button
            onClick={() => changeFontSize(1)}
            className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
            title="글자 크기 확대"
          >
            <Plus size={14} />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}


