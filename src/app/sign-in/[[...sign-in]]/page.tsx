import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function Page() {
  return (
    <div className="flex items-center justify-center p-3">
      <SignIn />
    </div>
  );
}
