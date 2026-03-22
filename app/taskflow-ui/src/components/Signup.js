import { useState } from "react";
import { signup } from "../services/auth";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    await signup({ username, password });
    alert("User created!");
  };

  return (
    <div className="p-6">
      <h2>Signup</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}