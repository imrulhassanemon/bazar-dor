"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({data}) => {
    const pathname = usePathname();
    return (
        <div>
            <div className="flex gap-5 mt-5 max-w-7xl mx-auto">
      {data.map((n) => {
        const isActive = pathname === `/${n.id}`;

        return (
          <Link
            href={`/${n.id}`}
            className={`px-2 py-1 rounded-md transition-colors ${
              isActive
                ? "bg-green-500 text-white"
                : "text-gray-700 hover:bg-green-100 hover:text-green-700"
            }`}
            key={n.id}
          >
            {n.icon}
            {n.nameBn}
          </Link>
        );
      })}
    </div>
        </div>
    );
};

export default NavLink;