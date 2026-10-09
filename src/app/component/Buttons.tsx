// 'use client'
// import Link from "next/link";
// import React from "react";

// import { authClient } from "@/lib/auth-client"

// const Buttons = () => {
//     const sessions =  authClient.useSession()
//     const user = sessions?.data?.user
//   return (
//     <div>
//       <div className="flex items-center gap-3 sm:gap-6">
//         <Link
//           href="/signin"
//           className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700 sm:px-4"
//         >
//           সাইন ইন
//         </Link>

//         <Link
//           href="/signup"
//           className="inline-flex min-h-11 items-center justify-center rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-700/25 transition-all hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-lg active:translate-y-0 sm:px-6"
//         >
//           সাইন আপ
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Buttons;


"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  UserRound,
  LogOut,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const Buttons = () => {
  const { data: session, isPending } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = session?.user;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
    setIsOpen(false);
  };

  // Session loading
  if (isPending) {
    return <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-100" />;
  }

  // Not signed in
  if (!user) {
    return (
      <div className="flex items-center gap-3 sm:gap-6">
        <Link
          href="/signin"
          className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700 sm:px-4"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-700/25 transition-all hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-lg active:translate-y-0 sm:px-6"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  // Signed in: user dropdown
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="ইউজার মেনু"
        className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-emerald-50 sm:gap-3"
      >
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "User"}
            className="h-10 w-10 rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <UserRound size={22} />
          </div>
        )}

        <span className="hidden max-w-28 truncate text-sm font-semibold text-gray-800 sm:block">
          {user.name || "ব্যবহারকারী"}
        </span>

        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-3 w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-emerald-100 bg-white p-4 shadow-xl shadow-gray-900/10">
          {/* User information */}
          <div className="border-b border-gray-100 px-2 pb-4">
            <p className="truncate font-bold text-gray-900">
              {user.name || "ব্যবহারকারী"}
            </p>
            <p className="mt-1 break-all text-sm text-gray-500">
              {user.email}
            </p>
          </div>

          {/* Profile */}
          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-700"
          >
            <UserRound size={19} />
            আমার প্রোফাইল
          </Link>

          {/* Sign out */}
          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={19} />
            সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
};

export default Buttons;

