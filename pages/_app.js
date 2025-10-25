import StickyNav from "@/components/home/StickyNav";
import "@/styles/globals.css";
import { Quicksand } from "next/font/google";
import { useEffect, useState, createContext } from "react";
import { useRouter } from 'next/router';

const quicksand = Quicksand({ variable: "--font-quicksand", subsets: ["latin"] });
export const SessionContext = createContext(null);

export default function App({ Component, pageProps }) {
  const [scrolled, setScrolled] = useState(false);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const links = [
    { label: "Acasă", href: "/#" },
    { label: "Despre noi", href: "/#despre" },
    { label: "Idei", href: "/idei" },
    { label: "Postări", href: "/postari" },
    {
      label: "Proiecte", href: "/proiecte", submenu: [
        { label: "iTEC", href: "https://itec.ro" },
        { label: "UniHack", href: "https://unihack.eu" },
        { label: "RoboTEC", href: "https://robotec.engineering" },
      ]
    },
    { label: "Faqs", href: "/#faqs" },
    { label: "Contact", href: "/#contact" }
  ];

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/auth/session");
        if (!res.ok) {
          setSession(null);
          return;
        }
        const data = await res.json();
        setSession(data);
      } catch (err) {
        console.error("Session fetch error:", err);
        setSession(null);
      } finally {
        setTimeout(() => setLoading(false), 100);
      }
    };

    fetchSession();
    if (router.pathname !== "/") {
      setScrolled(true);
    } else {
      const handleScroll = () => setScrolled(window.scrollY > window.innerHeight - 80);
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [router.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-red-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <SessionContext.Provider value={session}>
      <main className={`${quicksand.className} relative w-full`}>
        <Component {...pageProps} session={session} />
        <StickyNav scrolled={scrolled} links={links} />
      </main>
    </SessionContext.Provider>
  );
}