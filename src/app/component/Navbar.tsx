// "use client";

import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";

const Navbar = async() => {

    // const res = await fetch('https://api.abcz.workers.dev/api/bazardor/categories')
    // const data = await res.json()
    // console.log(data);

    const data = [
        {
            id: 'api missing ',
            icon:'missing',
            nameBn: 'missing'
        }

    ]

  return (
    <div>
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/25 transition-transform duration-200 hover:scale-105">
            <ShoppingCart
              size={27}
              strokeWidth={2.8}
              aria-hidden="true"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-lg font-extrabold leading-tight tracking-tight text-gray-900 sm:text-xl">
              বাজার দর
            </span>
            <span className="mt-1 text-xs font-medium text-gray-500">
              সহজলভ্য, অনলাইন বাজার
            </span>
          </div>
        </Link>

        {/* Navigation Actions */}
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
      </nav>
    </header>
    <div className="flex gap-5 mt-5 max-w-7xl mx-auto  ">
        {data.map(n => <Link href={`${n.id}`} className=" px-2" key={n.id}>{n.icon}{n.nameBn}</Link>)}
    </div>
    </div>
  );
};

export default Navbar;
