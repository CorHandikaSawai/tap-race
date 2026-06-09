import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Home, Trophy, Medal } from 'lucide-react';
import { Player } from '../types';
interface GameOverScreenProps {
  players: Player[];
  winnerId: string;
  onPlayAgain: () => void;
  onHome: () => void;
}
export function GameOverScreen({
  players,
  winnerId,
  onPlayAgain,
  onHome
}: GameOverScreenProps) {
  const sortedPlayers = [...players].sort((a, b) => b.taps - a.taps);
  const winner = players.find((p) => p.id === winnerId);
  if (!winner) return null;
  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 max-w-md mx-auto w-full relative overflow-hidden">
      {/* Winner Celebration Background Glow */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${winner.color} 0%, transparent 70%)`
        }} />
      

      <motion.div
        initial={{
          scale: 0.5,
          opacity: 0,
          y: 50
        }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0
        }}
        transition={{
          type: 'spring',
          bounce: 0.6
        }}
        className="text-center mb-12 relative z-10">
        
        <motion.div
          animate={{
            rotate: [0, -5, 5, -5, 0]
          }}
          transition={{
            duration: 0.5,
            delay: 0.2
          }}>
          
          <Trophy
            className="w-24 h-24 mx-auto mb-6"
            style={{
              color: winner.color,
              filter: `drop-shadow(0 0 20px ${winner.color})`
            }} />
          
        </motion.div>
        <h2 className="font-arcade text-3xl text-slate-300 mb-2">WINNER!</h2>
        <h1
          className="font-arcade text-6xl md:text-7xl text-shadow-neon"
          style={{
            color: winner.color
          }}>
          
          {winner.name}
        </h1>
      </motion.div>

      <div className="w-full space-y-4 flex-1 relative z-10">
        <h3 className="font-arcade text-xl text-slate-400 mb-6 text-center">
          FINAL SCORE
        </h3>

        {sortedPlayers.map((player, index) =>
        <motion.div
          key={player.id}
          initial={{
            x: 50,
            opacity: 0
          }}
          animate={{
            x: 0,
            opacity: 1
          }}
          transition={{
            delay: index * 0.1 + 0.3
          }}
          className={`flex items-center justify-between p-5 rounded-2xl border-2 ${index === 0 ? 'bg-slate-900/90' : 'bg-slate-900/50'}`}
          style={{
            borderColor: index === 0 ? player.color : '#1e293b',
            boxShadow: index === 0 ? `0 0 20px ${player.color}40` : 'none'
          }}>
          
            <div className="flex items-center gap-4">
              <span className="font-arcade text-2xl text-slate-500 w-6">
                {index === 0 ?
              <Medal
                className="w-6 h-6"
                style={{
                  color: player.color
                }} /> :


              `#${index + 1}`
              }
              </span>
              <span
              className="font-arcade text-2xl"
              style={{
                color: player.color
              }}>
              
                {player.name}
              </span>
            </div>
            <span className="font-arcade text-3xl text-white">
              {player.taps}
            </span>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{
          y: 50,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          delay: 0.8
        }}
        className="w-full grid grid-cols-2 gap-4 mt-8 relative z-10">
        
        <button
          onClick={onHome}
          className="py-5 rounded-2xl font-arcade text-xl flex flex-col items-center justify-center gap-2 bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors">
          
          <Home className="w-6 h-6" />
          LOBBY
        </button>
        <button
          onClick={onPlayAgain}
          className="py-5 rounded-2xl font-arcade text-xl flex flex-col items-center justify-center gap-2 bg-white text-slate-950 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all">
          
          <RotateCcw className="w-6 h-6" />
          REMATCH
        </button>
      </motion.div>
    </div>);

}