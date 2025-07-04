import { createClient } from "@/utils/supabase/server"; // ✅ CORRECT

export const getCurrentUser = async () => {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return { user, error };
};
