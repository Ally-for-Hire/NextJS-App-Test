"use client";

import { useState } from "react";

export default function HomePage() {
  const [count, setCount] = useState(0);
  const [rawTime, setRawTime] = useState("");
  const [formattedTime, setFormattedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Set this via .env.local as NEXT_PUBLIC_TIME_API_URL for convenience
  const TIME_API = process.env.NEXT_PUBLIC_TIME_API_URL || "https://<YOUR_SUBDOMAIN>.workers.dev";

  const handleGetTime = async () => {
    setLoading(true);
    setError("");
    setFormattedTime("");
    try {
      const res = await fetch(TIME_API, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      // Expecting { time: ISO, epoch: number }
      const iso = data.time || (data.epoch ? new Date(data.epoch).toISOString() : "");
      if (!iso) throw new Error("Unexpected response shape");
      setRawTime(iso);
    } catch (e) {
      setError(e.message || "Failed to fetch time");
    } finally {
      setLoading(false);
    }
  };

  const handleFormatTime = () => {
    if (!rawTime) return;
    const d = /^(\d+)$/.test(String(rawTime)) ? new Date(Number(rawTime)) : new Date(rawTime);
    if (isNaN(d.getTime())) {
      setError("Could not parse time");
      return;
    }
    // Example readable format: local date/time with weekday
    const readable = d.toLocaleString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZoneName: "short",
    });
    setFormattedTime(readable);
  };

  return (
    <main className="container">
      <h1>Welcome</h1>
      <button
        className="button"
        onClick={() => setCount((c) => c + 1)}
      >
        Count: {count}
      </button>
      <div style={{ marginTop: 12 }}>
        <button className="button" onClick={handleGetTime} disabled={loading}>
          {loading ? "Fetching time…" : "Get Time"}
        </button>
        <button
          className="button"
          onClick={handleFormatTime}
          disabled={!rawTime}
          style={{ marginLeft: 12 }}
        >
          Show Readable Time
        </button>
      </div>
      {error && (
        <p className="message" style={{ color: "crimson" }}>Error: {error}</p>
      )}
      {rawTime && (
        <p className="message">Raw ISO: {rawTime}</p>
      )}
      {formattedTime && (
        <p className="message">Readable: {formattedTime}</p>
      )}
    </main>
  );
}
