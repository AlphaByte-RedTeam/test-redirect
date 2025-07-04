import Link from "next/link"
import {UserSession} from "@/components/user-session";
import SignOutButton from "@/components/signout";

export default async function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      This is a home page
      <div className="flex flex-col gap-8">
        <div className="flex flex-row gap-8">
          <Link href="/blog" className="hover:underline hover:cursor-pointer">
              Click this button to visit blog page
          </Link>
          <Link href="/login" className="hover:underline hover:cursor-pointer">
            Or click this to Log In
          </Link>
        </div>
        <SignOutButton />
      </div>
      <UserSession />
    </div>
  );
}
