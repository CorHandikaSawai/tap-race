import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
interface CountdownScreenProps {
  onComplete: () => void;
}
export function CountdownScreen({ onComplete }: CountdownScreenProps) {
  const [count, setCount] = useState<number | string>(3);
  useEffect(() => {
    const sequence = [
    {
      val: 3,
      delay: 0
    },
    {
      val: 2,
      delay: 1000
    },
    {
      val: 1,
      delay: 2000
    },
    {
      val: 'GO!',
      delay: 3000
    }];

    const timeouts = sequence.map(({ val, delay }) =>
    setTimeout(() => setCount(val), delay)
    );
    const finishTimeout = setTimeout(onComplete, 4000);
    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(finishTimeout);
    };
  }, [onComplete]);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-950 z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          initial={{
            scale: 0.5,
            opacity: 0,
            rotate: -10
          }}
          animate={{
            scale: 1,
            opacity: 1,
            rotate: 0
          }}
          exit={{
            scale: 2,
            opacity: 0,
            filter: 'blur(10px)'
          }}
          transition={{
            type: 'spring',
            bounce: 0.5,
            duration: 0.5
          }}
          className="font-arcade text-9xl md:text-[12rem] text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]">
          
          {count}
        </motion.div>
      </AnimatePresence>
    </div>);

}