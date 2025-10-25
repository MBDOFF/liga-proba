import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function NavLink({ label, href = "#", submenu = [] }) {
  const [open, setOpen] = useState(false);
  const hasDropdown = submenu.length > 0;

  return (
    <li
      className="relative flex flex-col cursor-pointer hover:border-white transition-all duration-200 border-b border-transparent font-semibold"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center">
        <Link href={href} className="flex items-center">
          {label}
        </Link>
        {hasDropdown && (
          <Image
            src="/assets/arrow_down.png"
            alt="Arrow"
            width={12}
            height={12}
            className={`ml-1 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
          />
        )}
      </div>

      {hasDropdown && (
        <ul
          className={`absolute top-full left-0 mt-2 w-40 bg-black/90 text-white rounded shadow-lg transition-all duration-200 ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {submenu.map((item) => (
            <li key={item.label} className="px-4 py-2 hover:bg-white/20">
              <Link href={item.href || "#"}>{item.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
