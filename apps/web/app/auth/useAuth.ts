"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@yellow-book/config";

type User = {
  email: string;
};

type AuthResponse = {
  token: string;
};

const USER_KEY = "yb-user";
const TOKEN_KEY = "yb-token";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  // localStorage-с session унших
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(USER_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored) as User);
      } catch {
        window.localStorage.removeItem(USER_KEY);
        window.localStorage.removeItem(TOKEN_KEY);
      }
    }
  }, []);

  async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error((data && data.error) || "Failed to login");
    }
    await login(email, password);
    const auth = data as AuthResponse;

    if (typeof window !== "undefined") {
      window.localStorage.setItem(TOKEN_KEY, auth.token);
      window.localStorage.setItem(USER_KEY, JSON.stringify({ email }));
    }

    setUser({ email });
  }

  async function register(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error((data && data.error) || "Failed to register");
    }

    // Амжилттай бүртгэгдсэн бол автоматаар login
    await login(email, password);
    return data;
  }

  function logout() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(USER_KEY);
      window.localStorage.removeItem(TOKEN_KEY);
    }
    setUser(null);
  }

  return { user, login, register, logout };
}
