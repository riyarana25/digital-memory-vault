import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      alert("Registered successfully");
      navigate("/");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-96 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>
        <input
          className="p-3 rounded-lg bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-emerald-500 outline-none transition"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="p-3 rounded-lg bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-emerald-500 outline-none transition"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-emerald-600 hover:bg-emerald-500 p-3 rounded-lg font-semibold text-lg transition shadow-lg shadow-emerald-500/30"
          onClick={handleRegister}
        >
          Register
        </button>
        <p
          className="text-center text-sm text-slate-400 hover:text-emerald-400 cursor-pointer transition"
          onClick={() => navigate("/")}
        >
          Back to Login
        </p>
      </div>
    </div>
  );
}

export default Register;
