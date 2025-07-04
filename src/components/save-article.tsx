// app/blog/_components/blog-client.tsx
"use client";

import { useEffect, useState } from "react";
import { useMounted } from "@/hooks/useMounted";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

function SaveArticle() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [saved, setSaved] = useState(false);
  const mounted = useMounted();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setIsLoggedIn(!!data.user);
    };
    checkSession();
  }, []);

  const handleToggleSave = () => {
    if (!isLoggedIn) {
      router.push("/login?redirect=/blog");
      return;
    }

    // Toggle saved state
    setSaved((prev) => !prev);
  };

  if (!mounted || isLoggedIn === null) {
    return <p className="text-sm text-gray-500">Checking session...</p>;
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <button
        onClick={handleToggleSave}
        className={`px-4 py-2 rounded text-white ${
          saved ? "bg-gray-600" : "bg-black"
        } hover:opacity-80`}
      >
        {saved ? "Unsave Article" : "Save Article"}
      </button>
    </div>
  );
}

export default SaveArticle;
