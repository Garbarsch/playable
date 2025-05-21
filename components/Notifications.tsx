// components/Notifications.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type NotificationsProps = {
  productivity: number;
  paused: boolean;
};

const initialBossMessages = [
  "🚀 Boss: You’re doing better than your peers! On track for that promotion!",
];
const followupBossMessages = [
  "🚀 Boss: You're still on track for that promotion! Don't lose momentum!",
  "🚀 Boss: Promotion won't wait forever! Show them your dedication!",
  "🚀 Boss: Keep pushing! That promotion is closer than ever.",
  "🚀 Boss: Remember why you started! Promotion is within reach!",
  "🚀 Boss: Your hard work is noticed! Stay focused on that promotion!"
];

const initialNegativeMessages = [
  "⚠️ Boss: Your peers are outperforming you! Step it up!",
  
];
const followupNegativeMessages = [
  "⚠️ Boss: We need to see better results, ASAP.",
  "⚠️ Boss: Your peers are outperforming you! Step it up!",
  "⚠️ Boss: Your performance is slipping! What’s going on?",
  "⚠️ Boss: This level of productivity won’t cut it.",
  "⚠️ Boss: I expect to see improvement by end of day.",
];

export default function Notifications({ productivity, paused }: NotificationsProps) {
  if (paused) return null;

  const productivityRef = useRef(productivity);
  useEffect(() => {
    productivityRef.current = productivity;
  }, [productivity]);
  const [positiveSent, setPositiveSent] = useState(false);
  const [negativeSent, setNegativeSent] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [messageText, setMessageText] = useState('');

  const showBossPopup = (messages: string[]) => {
    const text = messages[Math.floor(Math.random() * messages.length)];
    setMessageText(text);
    setShowPopup(true);
  };

  useEffect(() => {
    if (productivity > 65 && !positiveSent) {
      setPositiveSent(true);
      showBossPopup(initialBossMessages);
    }
  }, [productivity, positiveSent]);

  useEffect(() => {
    if (!positiveSent) return;
    const interval = setInterval(() => {
      if (productivityRef.current > 65) {
        showBossPopup(followupBossMessages);
      }
    }, 17000);
    return () => clearInterval(interval);
  }, [positiveSent]);

  useEffect(() => {
    if (productivity < 40 && !negativeSent) {
      setNegativeSent(true);
      showBossPopup(initialNegativeMessages);
    }
  }, [productivity, negativeSent]);

  useEffect(() => {
    if (!negativeSent) return;
    const interval = setInterval(() => {
      if (productivityRef.current < 40) {
        showBossPopup(followupNegativeMessages);
      }
    }, 17000);
    return () => clearInterval(interval);
  }, [negativeSent]);

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto text-center relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mb-4 text-lg font-medium">🚀 Message from the Boss</p>
            <p className="mb-6 text-gray-700">{messageText}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
