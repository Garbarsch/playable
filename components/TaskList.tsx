// components/TaskList.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Task = {
  id: string;
  name: string;
  prodDelta: number;
  burnDelta: number;
};

const masterTasks: Task[] = [
  { id: 'stand-stare',   name: 'Stand and Stare',                  prodDelta: 4,  burnDelta: 5  },
  { id: 'click-button',  name: 'Click This Button 100 Times',       prodDelta: 2,  burnDelta: 6 },
  { id: 'whisper',       name: 'Whisper the Word “Proceed”',         prodDelta: 6,  burnDelta: 5  },
  { id: 'draw-circle',   name: 'Draw an Endless Circle',             prodDelta: 6,  burnDelta: 8  },
  { id: 'toggle-switch', name: 'Flip the Switch On/Off Rapidly',    prodDelta: 3,  burnDelta: 6 },
  { id: 'count-sand',    name: 'Count Grains of Sand (Imaginary)',   prodDelta: 5,  burnDelta: 6  },
  { id: 'spin-chair',    name: 'Spin in Chair for 30 Seconds',       prodDelta: 7,  burnDelta: 6  },
  { id: 'recite-code',   name: 'Recite a Random Line of Code',       prodDelta: 5,  burnDelta: 5  },
  { id: 'press-lever',   name: 'Press the Invisible Lever',           prodDelta: 3,  burnDelta: 6 },
  { id: 'hum-song',      name: 'Hum Your Favorite Tune',             prodDelta: 6,  burnDelta: 3  },
  { id: 'shake-device',  name: 'Shake Device Vigorously',             prodDelta: 5,  burnDelta: 6  },
  { id: 'blink-lights',  name: 'Blink the Screen Lights',             prodDelta: 2,  burnDelta: 6 },
  { id: 'type-random',   name: 'Type Random Characters',              prodDelta: 2,  burnDelta: 6 },
  { id: 'tap-foot',      name: 'Tap Your Foot Like Clockwork',        prodDelta: 6,  burnDelta: 6  },
  { id: 'rotate-icon',   name: 'Rotate the Logo 360°',                prodDelta: 4,  burnDelta: 4  },
  { id: 'hover-mouse',   name: 'Hover Mouse Without Clicking',         prodDelta: 2,  burnDelta: 6  },
  { id: 'bounce-icon',   name: 'Make the Icon Bounce',                prodDelta: 3,  burnDelta: 5  },
  { id: 'scroll-up',     name: 'Scroll to Top and Back Continuously', prodDelta: 2,  burnDelta: 8  },
  { id: 'poke-screen',   name: 'Poke the Screen Gently',              prodDelta: 4,  burnDelta: 4  },
  { id: 'recall-words',  name: 'Recall Last Ten Words Spoken',         prodDelta: 6,  burnDelta: 8  },
];

type TaskListProps = {
  onComplete: (prodDelta: number, burnDelta: number) => void;
};

export default function TaskList({ onComplete }: TaskListProps) {
  const [available, setAvailable] = useState<Task[]>([]);

  useEffect(() => {
    const iv = setInterval(() => {
      setAvailable(prev => {
        const remaining = masterTasks.filter(
          t => !prev.find(p => p.id === t.id)
        );
        if (remaining.length === 0) return prev;
        const pick = remaining[Math.floor(Math.random() * remaining.length)];
        return [...prev, pick];
      });
    }, 2000);
    return () => clearInterval(iv);
  }, []);

  const handleClick = (task: Task) => {
    onComplete(task.prodDelta, task.burnDelta);
    setAvailable(prev => prev.filter(t => t.id !== task.id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Tasks</h2>
      <ul className="space-y-2">
        <AnimatePresence>
          {available.map(task => (
            <motion.li
              key={task.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => handleClick(task)}
                className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded shadow-inner hover:shadow-md transform hover:-translate-y-0.5 transition"
              >
                <span className="text-left font-medium">{task.name}</span>
                <div className="mt-2 sm:mt-0 flex space-x-2">
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded">
                    Prod {task.prodDelta >= 0 ? `+${task.prodDelta}%` : `${task.prodDelta}%`}
                  </span>
                  <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-0.5 rounded">
                    Burn {task.burnDelta >= 0 ? `+${task.burnDelta}%` : `${task.burnDelta}%`}
                  </span>
                </div>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
