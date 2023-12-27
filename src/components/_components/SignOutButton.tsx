"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { publicEnv } from "@/lib/env/public";

export default function SignOutButton() {
  const { data: session } = useSession();
  const router = useRouter();

  const SignOut = () => {
    if (session) {
      signOut({ callbackUrl: publicEnv.NEXT_PUBLIC_BASE_URL });
    }
    router.push("/");
  };

  return (
    <button
      data-testid="sign-out-button"
      className="mr-6 flex items-center bg-brand_4 py-1 text-2xl text-txt_8"
      onClick={SignOut}
    >
      Sign Out
    </button>
  );
}
