import { useState } from "react";
import { login } from "../services/auth";

export default function Login({ setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await login({ username, password });

    if (res.data === "SUCCESS") {
      setLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="p-6">
      <h2>Login</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}