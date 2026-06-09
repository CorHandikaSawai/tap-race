import React, { useCallback, useState } from 'react';
import { ScreenState, Player, NEON_COLORS } from './types';
import { LobbyScreen } from './components/LobbyScreen';
import { CountdownScreen } from './components/CountdownScreen';
import { PlayingScreen } from './components/PlayingScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { useScreenInit } from './useScreenInit.js';
export function App() {
  const screenInit = useScreenInit();
  const [screen, setScreen] = useState<ScreenState>(
    screenInit?.screen ?? 'lobby'
  );
  const [tapGoal, setTapGoal] = useState(50);
  const [winnerId, setWinnerId] = useState<string | null>(
    screenInit?.winnerId ?? null
  );
  // Default players for quick start
  const [players, setPlayers] = useState<Player[]>([
  {
    id: '1',
    name: 'P1',
    color: NEON_COLORS[0],
    taps: 0
  },
  {
    id: '2',
    name: 'P2',
    color: NEON_COLORS[1],
    taps: 0
  }]
  );
  const handleStartCountdown = () => {
    // Reset taps
    setPlayers((prev) =>
    prev.map((p) => ({
      ...p,
      taps: 0
    }))
    );
    setWinnerId(null);
    setScreen('countdown');
  };
  const handleCountdownComplete = () => {
    setScreen('playing');
  };
  const handleTap = useCallback(
    (playerId: string) => {
      if (screen !== 'playing') return;
      setPlayers((prev) => {
        const newPlayers = prev.map((p) => {
          if (p.id === playerId) {
            const newTaps = p.taps + 1;
            if (newTaps >= tapGoal && !winnerId) {
              // We have a winner!
              setWinnerId(playerId);
              setTimeout(() => setScreen('gameover'), 300); // Small delay to see the final tap
            }
            return {
              ...p,
              taps: newTaps
            };
          }
          return p;
        });
        return newPlayers;
      });
    },
    [screen, tapGoal, winnerId]
  );
  const handlePlayAgain = () => {
    handleStartCountdown();
  };
  const handleHome = () => {
    setScreen('lobby');
  };
  return (
    <div className="w-full min-h-screen bg-slate-950 text-white selection:bg-transparent">
      {screen === 'lobby' &&
      <LobbyScreen
        players={players}
        setPlayers={setPlayers}
        tapGoal={tapGoal}
        setTapGoal={setTapGoal}
        onStart={handleStartCountdown} />

      }

      {screen === 'countdown' &&
      <CountdownScreen onComplete={handleCountdownComplete} />
      }

      {screen === 'playing' &&
      <PlayingScreen players={players} tapGoal={tapGoal} onTap={handleTap} />
      }

      {screen === 'gameover' && winnerId &&
      <GameOverScreen
        players={players}
        winnerId={winnerId}
        onPlayAgain={handlePlayAgain}
        onHome={handleHome} />

      }
    </div>);

}