import Image from "next/image";
import NavLink from "./NavLink";
import Link from "next/link";

export default function StickyNav({ scrolled, links }) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 h-20">
      <div className={`absolute inset-0 transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}>
        <Image
          src="/assets/bg.webp"
          fill
          alt="Nav background"
          className="object-cover filter blur-lg scale-200 opacity-100 h-20"
          priority
        />
      </div>
      <div className={`${!scrolled ? "opacity-100" : "opacity-0"} absolute inset-0 bg-black/1 backdrop-blur-xs`} />
      <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between h-20 px-6">
        <Image src="/assets/LigaAC_alb.png" alt="LigaAC Logo" width={150} height={50} />
        <ul className="hidden md:flex space-x-6 text-white text-sm uppercase">
          {links.map((link) => (
            <NavLink key={link.label} label={link.label} href={link.href} submenu={link.submenu} />
          ))}
        </ul>
        <Link href="/auth/" className="cursor-pointer">
          <Image src="/assets/login.svg" alt="Login" width={32} height={32} className="transition-transform duration-200 hover:scale-110" />
        </Link>
      </div>
    </nav>
  );
}
