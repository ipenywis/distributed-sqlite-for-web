"use client";

import { useState } from "react";

interface ParagraphFormProps {
  initialParagraph: string;
}

export default function ParagraphForm({
  initialParagraph,
}: ParagraphFormProps) {
  const [newParagraph, setNewParagraph] = useState(initialParagraph);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/paragraph", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newParagraph }),
    });
    setNewParagraph("");
    window.location.reload(); // Refresh the page to show the updated paragraph
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 flex flex-col items-center"
    >
      <textarea
        value={newParagraph}
        onChange={(e) => setNewParagraph(e.target.value)}
        rows={4}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-200 bg-gray-900 outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Save
      </button>
    </form>
  );
}
