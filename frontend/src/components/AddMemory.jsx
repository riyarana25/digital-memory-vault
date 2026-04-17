import { useState } from "react";

function AddMemory({ refresh }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const addMemory = async () => {
    const user_id = localStorage.getItem("userId");
    // If user doesn't pick a date, default to today
    const finalDate = date || new Date().toISOString().split("T")[0];

    await fetch("http://localhost:5000/memories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id,
        title,
        description,
        memory_date: finalDate,
        category: "General",
      }),
    });

    setTitle("");
    setDescription("");
    setDate("");
    refresh();
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl flex flex-col gap-4 border border-slate-700">
      <h3 className="text-xl font-semibold text-indigo-300">
        Vault a New Memory
      </h3>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          className="flex-1 p-3 rounded-lg bg-slate-900 border border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none text-white placeholder-slate-400"
          placeholder="What happened?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="flex-[2] p-3 rounded-lg bg-slate-900 border border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none text-white placeholder-slate-400"
          placeholder="Add some details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* 👇 DATE PICKER (Styled for dark mode) */}
        <input
          type="date"
          className="flex-1 p-3 rounded-lg bg-slate-900 border border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none text-white [color-scheme:dark]"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-lg font-bold transition shadow-lg text-white whitespace-nowrap"
          onClick={addMemory}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default AddMemory;
