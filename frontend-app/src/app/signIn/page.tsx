"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  useEffect(() => {
    if (params.get("callbackUrl"))
      router.push(params.get("callbackUrl") || "/");
  }, []);
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    >
      Sign in with Google
    </button>
  );
}
