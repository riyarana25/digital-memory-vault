function MemoryCard({ memory, refresh }) {
  // Formats the date nicely (e.g., "April 15, 2026")
  const formattedDate = new Date(memory.memory_date).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  const deleteMemory = async () => {
    try {
      await fetch(`http://localhost:5000/memories/${memory.id}`, {
        method: "DELETE",
      });
      refresh(); // Tells the Dashboard to reload the memories
    } catch (error) {
      console.error("Failed to delete memory:", error);
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700 hover:border-indigo-500 transition-colors group flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-4">
          <h4 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
            {memory.title}
          </h4>
          <span className="bg-slate-900 text-indigo-400 text-xs px-3 py-1 rounded-full border border-slate-700">
            {memory.category}
          </span>
        </div>
        <p className="text-slate-300 mb-6 leading-relaxed">
          {memory.description}
        </p>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-700/50">
        <div className="text-sm text-slate-500 font-medium">
          {formattedDate}
        </div>

        {/* 👇 DELETE BUTTON */}
        <button
          onClick={deleteMemory}
          className="text-red-400 hover:text-red-300 hover:bg-red-900/30 px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default MemoryCard;
