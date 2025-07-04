"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signInWithEmail } from "@/lib/actions/signInWithEmail";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await signInWithEmail({ email, password });

    if (error) {
      setErrorMsg(error.message);
    } else {
      const supabase = createClient();
      let sessionReady = false;

      for (let i = 0; i < 5; i++) {
        const { data: userData } = await supabase.auth.getUser();
        if (userData.user) {
          sessionReady = true;
          break;
        }
        await new Promise((res) => setTimeout(res, 250));
      }

      if (sessionReady) {
        router.push(redirectTo);
      } else {
        setErrorMsg("Login succeeded, but session is not ready. Try again.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8">
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full max-w-sm"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full max-w-sm"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-black text-white px-4 py-2 rounded w-full max-w-sm"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <Link href="/" className="text-black/70 text-sm underline hover:cursor-pointer">
        Back to home
      </Link>
      {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
    </div>
  );
}
