import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Player } from '../types';
interface PlayingScreenProps {
  players: Player[];
  tapGoal: number;
  onTap: (playerId: string) => void;
}
export function PlayingScreen({ players, tapGoal, onTap }: PlayingScreenProps) {
  const isTwoPlayer = players.length === 2;
  return (
    <div
      className={`fixed inset-0 w-full h-full bg-slate-950 flex ${isTwoPlayer ? 'flex-col' : 'flex-wrap'}`}>
      
      {players.map((player, index) => {
        const progress = Math.min(player.taps / tapGoal * 100, 100);
        // For 2 players, rotate the top player 180deg so they can sit opposite each other
        const isRotated = isTwoPlayer && index === 0;
        // Layout sizing
        const basisClass = isTwoPlayer ? 'h-1/2 w-full' : 'w-1/2 h-1/2';
        return (
          <div
            key={player.id}
            className={`relative ${basisClass} p-2 flex items-stretch justify-stretch`}>
            
            <motion.div
              className={`tap-zone flex-1 rounded-3xl border-4 relative overflow-hidden flex flex-col items-center justify-center cursor-pointer active:scale-[0.98] transition-transform`}
              style={{
                borderColor: player.color,
                boxShadow: `0 0 20px ${player.color}40, inset 0 0 20px ${player.color}20`,
                backgroundColor: `${player.color}10`,
                transform: isRotated ? 'rotate(180deg)' : 'none'
              }}
              onPointerDown={(e) => {
                e.preventDefault(); // Prevent zoom/scroll
                onTap(player.id);
              }}>
              
              {/* Progress Background Fill */}
              <div
                className="absolute bottom-0 left-0 right-0 transition-all duration-100 ease-out opacity-20"
                style={{
                  height: `${progress}%`,
                  backgroundColor: player.color,
                  boxShadow: `0 -10px 20px ${player.color}`
                }} />
              

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center pointer-events-none">
                <span
                  className="font-arcade text-2xl md:text-4xl mb-2 opacity-80"
                  style={{
                    color: player.color
                  }}>
                  
                  {player.name}
                </span>

                <motion.span
                  key={player.taps}
                  initial={{
                    scale: 1.5
                  }}
                  animate={{
                    scale: 1
                  }}
                  className="font-arcade text-7xl md:text-9xl text-shadow-neon"
                  style={{
                    color: player.color
                  }}>
                  
                  {player.taps}
                </motion.span>

                <span className="font-arcade text-xl mt-4 text-white/50">
                  / {tapGoal}
                </span>
              </div>

              {/* Progress Bar Edge */}
              <div className="absolute top-0 left-0 bottom-0 w-2 bg-slate-900">
                <div
                  className="absolute bottom-0 left-0 right-0 transition-all duration-100 ease-out"
                  style={{
                    height: `${progress}%`,
                    backgroundColor: player.color,
                    boxShadow: `0 0 10px ${player.color}`
                  }} />
                
              </div>
            </motion.div>
          </div>);

      })}
    </div>);

}