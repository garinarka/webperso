"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NeonButton from "@/components/NeonButton";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/comments");
    } else {
      setError("Wrong password.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-punk-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm border-brutal border-neon-yellow p-8">
        <h1 className="font-brutal text-brutal-2xl text-neon-yellow mb-6">
          ADMIN LOGIN
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="bg-punk-black border-brutal border-punk-white/30 px-4 py-3 font-mono text-brutal-sm text-punk-white placeholder:text-punk-white/30 focus:border-neon-yellow outline-none"
            required
            autoFocus
          />

          {error && (
            <p className="font-mono text-brutal-xs text-neon-red">{error}</p>
          )}

          <NeonButton
            type="submit"
            disabled={loading}
            variant="yellow"
            size="lg"
            className="w-full sm:w-auto"
          >
            {loading ? "LOGGING IN..." : "LOGIN"}
          </NeonButton>
        </form>
      </div>
    </div>
  );
}
