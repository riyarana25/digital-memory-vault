import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("userId", data.userId);
      navigate("/dashboard");
    } else {
      alert("Login failed. Check credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-96 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center tracking-wide">
          Memory Vault
        </h2>
        <input
          className="p-3 rounded-lg bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="p-3 rounded-lg bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-indigo-600 hover:bg-indigo-500 p-3 rounded-lg font-semibold text-lg transition shadow-lg shadow-indigo-500/30"
          onClick={handleLogin}
        >
          Login
        </button>
        <p
          className="text-center text-sm text-slate-400 hover:text-indigo-400 cursor-pointer transition"
          onClick={() => navigate("/register")}
        >
          Don't have an account? Register here
        </p>
      </div>
    </div>
  );
}

export default Login;
