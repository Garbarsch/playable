'use client';
import { motion } from 'framer-motion';

export default function HowToPlayModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-6 max-w-lg mx-4 shadow-lg border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-4">How to Play</h2>
        <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2">
          <li>
            Click a task to complete it: you’ll gain <strong>Productivity</strong> but incur <strong>Burnout</strong>.
          </li>
          <li>
            A full “day” is <strong>90 seconds</strong>. At 5 PM you choose:
            <ul className="list-disc pl-5 mt-1">
              <li><strong>Relax</strong> (–50% Burnout)</li>
              <li><strong>Hobby</strong> (+25% Hobby Progress, +30% Burnout, –20% Productivity)</li>
            </ul>
          </li>
          <li>
            Your <strong>Hobby Progress</strong> only fills when you pick Hobby at day’s end.
          </li>
          <li>
            Win by hitting <strong>100% Hobby Progress</strong>; lose if Productivity hits 0% (Fired) or Burnout hits 100%.
          </li>
          <li>
            Use the 🔇/🔊 button to mute/unmute music, and Back to return to start (resets progress).
          </li>
        </ul>
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}
