function MemoryCard({ memory }) {
  const formattedDate = new Date(memory.memory_date).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700 hover:border-indigo-500 transition-colors group">
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
      <div className="text-sm text-slate-500 font-medium">{formattedDate}</div>
    </div>
  );
}

export default MemoryCard;
