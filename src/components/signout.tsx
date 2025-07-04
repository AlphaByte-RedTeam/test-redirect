// ./src/components/SignOutButton.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setIsLoggedIn(!!data.user);
    };
    checkUser();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh(); // or router.push("/login");
  };

  if (isLoggedIn === null) return null; // wait for session check

  return (
    <button
      onClick={handleSignOut}
      className={`${!isLoggedIn ? 'bg-zinc-200 text-zinc-600 hover:cursor-not-allowed' : 'bg-red-600 text-white hover:opacity-80'} px-4 py-2 rounded`}
    >
      Sign Out
    </button>
  );
}
