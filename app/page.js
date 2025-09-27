"use client";

import { useState } from "react";

export default function HomePage() {
  const [message, setMessage] = useState("");

  return (
    <main className="container">
      <h1>Welcome</h1>
      <button className="button" onClick={() => setMessage("hello")}>Show Hello</button>
      {message && <p className="message">{message}</p>}
    </main>
  );
}