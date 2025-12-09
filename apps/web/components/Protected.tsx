"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

const USER_KEY = "yb-user";

export default function Protected({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const user = window.localStorage.getItem(USER_KEY);
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>;
}
