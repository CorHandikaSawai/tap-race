import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Play, Trophy } from 'lucide-react';
import { Player, NEON_COLORS } from '../types';
interface LobbyScreenProps {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  tapGoal: number;
  setTapGoal: (goal: number) => void;
  onStart: () => void;
}
export function LobbyScreen({
  players,
  setPlayers,
  tapGoal,
  setTapGoal,
  onStart
}: LobbyScreenProps) {
  const [newPlayerName, setNewPlayerName] = useState('');
  const addPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayerName.trim() || players.length >= 4) return;
    const color = NEON_COLORS[players.length % NEON_COLORS.length];
    setPlayers([
    ...players,
    {
      id: Math.random().toString(36).substr(2, 9),
      name: newPlayerName.trim().toUpperCase(),
      color,
      taps: 0
    }]
    );
    setNewPlayerName('');
  };
  const removePlayer = (id: string) => {
    setPlayers(players.filter((p) => p.id !== id));
  };
  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 max-w-md mx-auto w-full">
      <motion.div
        initial={{
          y: -50,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        className="text-center mb-12">
        
        <h1 className="font-arcade text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] mb-2">
          TAP RACE
        </h1>
        <p className="text-slate-400 font-bold tracking-widest">
          MULTIPLAYER MASH
        </p>
      </motion.div>

      <div className="w-full space-y-8 flex-1">
        {/* Goal Selector */}
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-arcade text-xl text-slate-300 flex items-center gap-2">
              <Trophy className="w-5 h-5" /> GOAL
            </h2>
            <span className="font-arcade text-2xl text-white">{tapGoal}</span>
          </div>
          <div className="flex gap-2">
            {[30, 50, 100].map((goal) =>
            <button
              key={goal}
              onClick={() => setTapGoal(goal)}
              className={`flex-1 py-3 rounded-xl font-arcade text-lg transition-all ${tapGoal === goal ? 'bg-white text-slate-950 shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
              
                {goal}
              </button>
            )}
          </div>
        </div>

        {/* Players List */}
        <div className="space-y-3">
          <h2 className="font-arcade text-xl text-slate-300 mb-4">
            PLAYERS ({players.length}/4)
          </h2>

          {players.map((player, i) =>
          <motion.div
            key={player.id}
            initial={{
              x: -20,
              opacity: 0
            }}
            animate={{
              x: 0,
              opacity: 1
            }}
            className="flex items-center justify-between p-4 rounded-xl border-2 bg-slate-900/80"
            style={{
              borderColor: player.color,
              boxShadow: `0 0 10px ${player.color}40`
            }}>
            
              <div className="flex items-center gap-3">
                <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: player.color,
                  boxShadow: `0 0 10px ${player.color}`
                }} />
              
                <span
                className="font-arcade text-xl"
                style={{
                  color: player.color
                }}>
                
                  {player.name}
                </span>
              </div>
              <button
              onClick={() => removePlayer(player.id)}
              className="text-slate-500 hover:text-white transition-colors p-2">
              
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {players.length < 4 &&
          <form onSubmit={addPlayer} className="flex gap-2 mt-4">
              <input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="PLAYER NAME..."
              maxLength={10}
              className="flex-1 bg-slate-800 border-2 border-slate-700 rounded-xl px-4 py-4 font-arcade text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-500 uppercase" />
            
              <button
              type="submit"
              disabled={!newPlayerName.trim()}
              className="bg-slate-700 text-white px-6 rounded-xl disabled:opacity-50 hover:bg-slate-600 transition-colors flex items-center justify-center">
              
                <Plus className="w-6 h-6" />
              </button>
            </form>
          }
        </div>
      </div>

      <motion.button
        whileHover={{
          scale: players.length >= 2 ? 1.05 : 1
        }}
        whileTap={{
          scale: players.length >= 2 ? 0.95 : 1
        }}
        onClick={onStart}
        disabled={players.length < 2}
        className={`w-full py-6 rounded-2xl font-arcade text-3xl flex items-center justify-center gap-3 mt-8 transition-all ${players.length >= 2 ? 'bg-white text-slate-950 shadow-[0_0_30px_rgba(255,255,255,0.6)] hover:shadow-[0_0_40px_rgba(255,255,255,0.8)]' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}>
        
        <Play className="w-8 h-8" fill="currentColor" />
        START
      </motion.button>
    </div>);

}