import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddMemory from "../components/AddMemory";
import MemoryCard from "../components/MemoryCard";

function Dashboard() {
  const [memories, setMemories] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const fetchMemories = async () => {
    if (!userId) {
      navigate("/");
      return;
    }
    const res = await fetch(`http://localhost:5000/memories?user_id=${userId}`);
    const data = await res.json();
    setMemories(data);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10 border-b border-slate-800 pb-6">
          <h1 className="text-4xl font-bold tracking-tight">Your Timeline</h1>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-red-400 transition font-medium"
          >
            Logout
          </button>
        </div>

        <AddMemory refresh={fetchMemories} />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((m) => (
            <MemoryCard key={m.id} memory={m} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
