export type ScreenState = 'lobby' | 'countdown' | 'playing' | 'gameover';

export interface Player {
  id: string;
  name: string;
  color: string;
  taps: number;
}

export const NEON_COLORS = [
'#00ffff', // Cyan
'#ff00ff', // Magenta
'#39ff14', // Lime
'#ffff00', // Yellow
'#ff6600' // Orange
];