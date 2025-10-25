import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/assets/bg.webp" alt="Blurred Background" fill className="object-cover filter blur-[100px] scale-150 opacity-100" priority />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 text-white">
        <Image src="/assets/LigaAC_full.png" alt="LigaAC Main Logo" width={500} height={200} className="mb-6" />

        <h1 className="mt-24 text-2xl md:text-3xl font-bold max-w-2xl">
          IdeaHub
        </h1>
        <p className="mt-4 text-md md:text-lg max-w-3xl">
          Platforma unde ideile prind viață prin colaborare și inovație. Alătură-te comunității noastre și transformă-ți viziunea în realitate!
        </p>

        <Link href="/auth/register" className="mt-6 px-12 py-2 bg-white hover:scale-110 transition-all duration-200 cursor-pointer text-red-800 font-semibold rounded-full uppercase text-sm">Descoperă</Link>

      </div>

      <div className="absolute left-10 bottom-10 z-10">
        <div className="flex space-x-4">
          <a href="https://www.facebook.com/liga100ac" className="transition-all duration-200 cursor-pointer hover:scale-110" target="_blank" rel="noopener noreferrer">
            <Image src="/assets/facebook.svg" alt="Facebook" width={24} height={24} />
          </a>
          <a href="https://www.instagram.com/ligaac/" className="transition-all duration-200 cursor-pointer hover:scale-110" target="_blank" rel="noopener noreferrer">
            <Image src="/assets/instagram.svg" alt="Instagram" width={24} height={24} />
          </a>
        </div>
      </div>

      <div className="absolute right-10 bottom-10 z-10 text-white text-sm">
        © {new Date().getFullYear()} <a href="https://www.mbd.one" className="hover:underline">Daniel Hnatiuc</a>. All rights reserved.
      </div>
    </section>
  );
}
