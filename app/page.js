"use client";

import { useState } from "react";

export default function HomePage() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  // Fetch through our Next.js API route to avoid CORS/mixed-content issues.
  const API_URL = "/api/time";

  // Fetch time from your Worker and convert to a readable string
  async function handleShowTime() {
    setError("");
    setTime("");

    try {
      const res = await fetch(API_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json(); // expects { time: "..." } from /api/time
      const readable = new Date(data.time).toLocaleString();
      setTime(readable);
    } catch (e) {
      setError(`Failed to fetch from Worker: ${e.message}`);
    }
  }

  return (
    <main className="container">
      <h1>Welcome</h1>
      <button
        className="button"
        onClick={() => setCount((c) => c + 1)}
      >
        Count: {count}
      </button>
      <button className="button" onClick={handleShowTime} style={{ marginTop: 12 }}>
        Show Time
      </button>
      {time && <p className="message">Server time: {time}</p>}
      {error && (
        <p className="message" style={{ color: "#c00" }}>
          {error}
        </p>
      )}
    </main>
  );
}
