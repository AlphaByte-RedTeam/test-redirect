import { getCurrentUser } from "@/lib/actions/getCurrentUser";

export const UserSession = async () => {
  const { user } = await getCurrentUser();

  return (
    <div className="text-black text-sm">
      Status: {user ? user.email ?? user.id : "You are not logged in"}
    </div>
  );
};
