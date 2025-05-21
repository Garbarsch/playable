'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import HowToPlayModal from './HowToPlayModal';

export default function StartScreen({ onStart }: { onStart: () => void }) {
  const [showHowTo, setShowHowTo] = useState(false);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Image
        src="/images/computer.png"  
        alt="Desk Background"
        fill
        className="object-cover"
        priority
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center p-8"
      >
        <h1 className="text-5xl font-extrabold text-white mb-4 text-center">
          Hyper-Productivity Simulator
        </h1>
        <p className="mb-6 text-lg text-gray-200 max-w-md text-center">
          Experience the relentless chase of hustle culture. Will you survive the burnout?
        </p>

        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="px-8 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            Play
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHowTo(true)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            How to Play
          </motion.button>
        </div>

        {showHowTo && <HowToPlayModal onClose={() => setShowHowTo(false)} />}
      </motion.div>
    </div>
  );
}