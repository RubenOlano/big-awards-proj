"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export function LoginButton() {
  return (
    <button
      className="rounded-2xl bg-white px-4 py-2 text-xl font-semibold md:px-20 md:py-5 md:text-5xl"
      onClick={() => signIn("twitch")}
      type="button"
    >
      Login
    </button>
  );
}

export function LogoutButton() {
  return (
    <>
      <button
        className="mb-2 rounded-2xl bg-white px-4 py-2 text-center text-xl font-semibold md:mb-5 md:px-20 md:py-5 md:text-5xl"
        onClick={() => signOut()}
      >
        LOGOUT
      </button>
      <Link
        href="/"
        className="block rounded-2xl bg-white px-4 py-2 text-center text-xl font-semibold md:px-20 md:py-5 md:text-5xl"
      >
        HOME
      </Link>
    </>
  );
}
