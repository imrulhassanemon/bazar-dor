// "use client";

import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";
import Buttons from "./Buttons";
import Marquee from "./Marquee";
import NavLink from "./NavLink";

const Navbar = async() => {

    // const res = await fetch('https://api.abcz.workers.dev/api/bazardor/categories')//api-2
    const res = await fetch('https://api.abcz.workers.dev/api/bazardor/categories') //api-2
    const data = await res.json()

    // const data = [
    //     {
    //         id: 'api missing ',
    //         icon:'missing',
    //         nameBn: 'missing'
    //     }
    // ]

    const date = new Date().toLocaleDateString('bn-BD', {dateStyle:'full'})

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
              {date}
            </span>
          </div>
        </Link>

        {/* Navigation Actions */}
        <Buttons/>
      </nav>
    </header>
    {/* <div className="flex gap-5 mt-5 max-w-7xl mx-auto  ">
        {data.map(n => <Link href={`${n.id}`} className=" px-2" key={n.id}>{n.icon}{n.nameBn}</Link>)}
    </div> */}
    <div>
      <NavLink data={data}/>
    </div>
    <Marquee/>
    </div>
  );
};

export default Navbar;
