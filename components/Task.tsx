import React from "react";

export default function Task({ text, onComplete }: { text: string; onComplete: () => void }) {
    return (
      <div className="p-4 rounded-lg border shadow-sm bg-white flex justify-between items-center">
        <span>{text}</span>
        <button
          onClick={onComplete}
          className="px-3 py-1 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition">
          Done
        </button>
      </div>
    );
  }