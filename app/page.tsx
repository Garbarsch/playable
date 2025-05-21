
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import MonitorFrame from '@/components/MonitorFrame';
import StartScreen from '@/components/StartScreen';
import TaskList from '@/components/TaskList';
import ProductivityMeter from '@/components/ProductivityMeter';
import BurnoutMeter from '@/components/BurnoutMeter';
import BodilyTollMeter from '@/components/BodilyTollMeter';
import Notifications from '@/components/Notifications';
import BackgroundMusic from '@/components/BackgroundMusic';


function ConfirmExitModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto text-center"
      >
        <p className="mb-4">Are you sure? Returning to the start screen will lose all your progress.</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
}


function WinModal({ onConfirm }: { onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg text-center"
      >
        <h2 className="text-2xl font-bold mb-4">🏆 You Did It!</h2>
        <p className="mb-6 text-gray-700">
          Congratulations—you’ve completed your hobby project and can now live off something that you love to do!
        </p>
        <button
          onClick={onConfirm}
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Celebrate!
        </button>
      </motion.div>
    </div>
  );
}


function GameOverModal({ onConfirm }: { onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg text-center"
      >
        <h2 className="text-2xl font-bold mb-4">😢 Burnout 100%</h2>
        <p className="mb-6 text-gray-700">
          You have hit 100% burnout and are now depressed. You must take some time off.
          Your boss won’t think you can handle more responsibility in the future and you
          are not on track for that promotion.
        </p>
        <button onClick={onConfirm} className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition">
          OK
        </button>
      </motion.div>
    </div>
  );
}


function FiredModal({ onConfirm }: { onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg text-center"
      >
        <h2 className="text-2xl font-bold mb-4">🚫 Fired!</h2>
        <p className="mb-6 text-gray-700">
          Your productivity hit 0%! You’ve been fired from your job.
        </p>
        <button onClick={onConfirm} className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition">
          OK
        </button>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [zoomIn, setZoomIn] = useState(false);
  const [zoomOut, setZoomOut] = useState(false);
  const [started, setStarted] = useState(false);

  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showFired, setShowFired] = useState(false);
  const [showDayNightModal, setShowDayNightModal] = useState(false);
  const [showHobbyWarning, setShowHobbyWarning] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);

  const [productivity, setProductivity] = useState(50);
  const [burnout, setBurnout] = useState(10);
  const [hobbyProgress, setHobbyProgress] = useState(0);


  const [clock, setClock] = useState(9 * 60);
  const triggeredRef = useRef(false);


  const musicRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const toggleMute = () => {
    setMuted(m => !m);
    if (musicRef.current) musicRef.current.muted = !muted;
  };
  const handlePlay = () => {setProductivity(50);
        setBurnout(10);
        setHobbyProgress(0);
        setClock(9 * 60);
        triggeredRef.current = false;
        setShowGameOver(false);
        setShowFired(false);
       setShowWinModal(false);
        setShowDayNightModal(false);
       setShowHobbyWarning(false);
       setShowExitConfirm(false);
        setZoomIn(true);
        musicRef.current?.play(); };

  useEffect(() => {
    if (hobbyProgress >= 100) setShowWinModal(true);
  }, [hobbyProgress]);

  useEffect(() => {
    if (!started || showDayNightModal || showHobbyWarning || showWinModal) return;
    const iv = setInterval(() => setClock(prev => (prev + 16) % (24 * 60)), 1000);
    return () => clearInterval(iv);
  }, [started, showDayNightModal, showHobbyWarning, showWinModal]);

  // Trigger end-of-day at 17:00
  useEffect(() => {
    if (!started) return;
    if (clock < 8 * 60) triggeredRef.current = false;
    if (clock >= 17 * 60 && !triggeredRef.current) {
      triggeredRef.current = true;
      setShowDayNightModal(true);
    }
  }, [clock, started]);

  // Decline meters over time, pause on ANY modal
  useEffect(() => {
    if (!started || showDayNightModal || showHobbyWarning || showWinModal) return;
    const iv = setInterval(() => {
      setProductivity(p => Math.max(0, p - 4));
      setBurnout(b => Math.max(0, b - 3));
    }, 4000);
    return () => clearInterval(iv);
  }, [started, showDayNightModal, showHobbyWarning, showWinModal]);

  useEffect(() => { if (burnout >= 100) setShowGameOver(true); }, [burnout]);

  useEffect(() => { if (productivity <= 0) setShowFired(true); }, [productivity]);

  const handleBack = () => setShowExitConfirm(true);
  const confirmExit = () => { setShowExitConfirm(false); setZoomOut(true); };

  const handleGameOverConfirm = () => { setShowGameOver(false); resetGame(); };
  const handleFiredConfirm   = () => { setShowFired(false); resetGame(); };
  const handleWinConfirm     = () => { setShowWinModal(false); resetGame(); };

  function resetGame() {
    setProductivity(50);
    setBurnout(10);
    setHobbyProgress(0);
    setZoomOut(true);
  }

  const handleDayChoice = (choice: 'relax' | 'hobby') => {
    setShowDayNightModal(false);
    setClock(9 * 60);
    triggeredRef.current = false;
    if (choice === 'relax') {
      setBurnout(b => Math.max(0, b - 50));
    } else {
      setBurnout(b => Math.min(100, b + 30));
      setProductivity(p => Math.max(0, p - 20));
      setHobbyProgress(hp => Math.min(100, hp + 25));
    }
  };

  const confirmHobby = () => {
    setShowHobbyWarning(false);
    handleDayChoice('hobby');
  };

  // Format time display
  const hours24 = Math.floor(clock / 60);
  const minutes = clock % 60;
  const meridiem = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = ((hours24 + 11) % 12) + 1;
  const hh = String(hours12).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');

  return (
    <AnimatePresence mode="wait">
      {!started && (
        <motion.div
          key="start"
          initial={{ scale: 1, opacity: 1 }}
          animate={zoomIn ? { scale: 2, opacity: 0 } : { scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          onAnimationComplete={() => zoomIn && (setStarted(true), setZoomIn(false))}
          className="absolute inset-0"
        >
          <StartScreen onStart={handlePlay} />
        </motion.div>
      )}

      {started && (
        <motion.div
          key="game"
          initial={zoomOut ? { scale: 1, opacity: 1 } : { opacity: 0, scale: 2 }}
          animate={zoomOut ? { scale: 0.5, opacity: 0 } : { opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          onAnimationComplete={() => zoomOut && (setStarted(false), setZoomOut(false))}
          className="absolute inset-0"
        >
          <MonitorFrame>
            {/* TIME + MUTE + BACK */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-black/60 text-white px-3 py-1 rounded">
              {hh}:{mm} {meridiem}
            </div>
            <button
              onClick={toggleMute}
              className="absolute top-4 left-4 z-50 px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
            >
              {muted ? '🔊 Unmute' : '🔇 Mute'}
            </button>
            <button
              onClick={handleBack}
              className="absolute top-4 right-4 z-50 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Back
            </button>

            {/* ALL MODALS */}
            {showExitConfirm   && <ConfirmExitModal onConfirm={confirmExit} onCancel={() => setShowExitConfirm(false)} />}
            {showDayNightModal && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center"
                >
                  <p className="mb-4 text-lg font-bold">Workday is over!</p>
                  <p className="mb-4 text-gray-600">
                    Relax (–50% Burnout) or Work on Hobby (+30% Burnout, –20% Productivity)?
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => handleDayChoice('relax')}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Relax
                    </button>
                    <button
                      onClick={() => setShowHobbyWarning(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Hobby Project
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
            {showHobbyWarning && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-60">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center"
                >
                  <p className="mb-4 text-lg font-bold">Wait—Think Twice!</p>
                  <p className="mb-4 text-red-600 italic">
                    🚨 You’re so close to that promotion—are you sure you want to waste time on a hobby now?
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={confirmHobby}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Yes, do it anyway
                    </button>
                    <button
                      onClick={() => setShowHobbyWarning(false)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Go back
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
            {showGameOver && <GameOverModal onConfirm={handleGameOverConfirm} />}
            {showFired    && <FiredModal   onConfirm={handleFiredConfirm}   />}
            {showWinModal && <WinModal     onConfirm={handleWinConfirm}     />}

            {/* AUDIO PLAYER */}
            <BackgroundMusic
              ref={musicRef}
              play={started}
              muted={muted}
              src="/Music/backgroundmusic.mp3"
            />

            {/* MAIN UI */}
            <div className="h-full p-6 flex flex-col space-y-6 overflow-auto">
              <h1 className="text-2xl font-bold"> </h1>
              <h1 className="text-2xl font-bold"> </h1>

              <div>
                <h2 className="mb-1">Productivity</h2>
                <ProductivityMeter value={productivity} />
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex-1">
                  <h2 className="mb-1">Burnout</h2>
                  <BurnoutMeter value={burnout} />
                </div>
                <div>
                  <h2 className="mb-1">Body Toll</h2>
                  <BodilyTollMeter value={burnout} />
                </div>
              </div>

              {hobbyProgress > 0 && (
                <div>
                  <h2 className="mb-1">Hobby Progress</h2>
                  <div className="relative w-full bg-gray-200 rounded-lg h-4 overflow-visible">
                    <div
                      style={{ width: `${hobbyProgress}%` }}
                      className="bg-blue-400 h-4 rounded-lg transition-all duration-500 ease-out"
                    />
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 text-xs font-bold text-black">
                      {hobbyProgress}%
                    </span>
                  </div>
                </div>
              )}

              <TaskList
                onComplete={(p, b) => {
                  setProductivity(v => Math.min(100, Math.max(0, v + p)));
                  setBurnout(v => Math.min(100, Math.max(0, v + b)));
                }}
              />

              <Notifications productivity={productivity} paused={showDayNightModal || showHobbyWarning || showWinModal} />
            </div>
          </MonitorFrame>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
