import Link from "next/link";
import DarkModeSwitch from "@/components/DarkModeSwitch";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-3 mx-auto">
      <ul className="flex gap-4">
        <li>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link href={"/sign-in"}> Sign In</Link>
          </SignedOut>
        </li>
        <li className="hidden sm:block">
          <Link href="/">Home</Link>
        </li>
        <li className="hidden sm:block">
          <Link href="/favorites">Favorites</Link>
        </li>
        <li className="hidden sm:block">
          <Link href="/about">About</Link>
        </li>
      </ul>
      <div className="flex items-center gap-4">
        <DarkModeSwitch />
        <Link href={"/"} className="flex gap-1 items-center">
          <span className="text-2xl font-bold bg-amber-500 py-1 px-2 rounded-lg">
            IMDb
          </span>
          <span className="text-xl hidden sm:inline">Clone</span>
        </Link>
      </div>
    </div>
  );
}
