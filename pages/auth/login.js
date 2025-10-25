import Section from "@/components/home/Section";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { SessionContext } from "../_app";

export default function LoginPage() {
  const router = useRouter();
  const session = useContext(SessionContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (session?.user) {
    if (typeof window !== "undefined") router.push("/app");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Autentificare eșuată");
      } else {
        router.push("/app");
      }
    } catch (err) {
      console.error(err);
      setError("Eroare la conectare");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full relative">
      <Section name="login" className="justify-center mt-10" bgColor="bg-white">
        <div className="relative w-160 p-8 rounded-2xl shadow-lg overflow-hidden">
          <Image
            src="/assets/bg.webp"
            fill
            alt="Background"
            className="absolute inset-0 object-cover blur-lg scale-105"
            priority
          />

          <div className="relative z-10 bg-gray-100 bg-opacity-80 p-6 rounded-2xl">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              Autentificare
            </h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
                required
              />
              <input
                type="password"
                placeholder="Parolă"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
                required
              />

              <div className={`${error ? "opacity-100 mt-4 py-3" : "opacity-0 h-0 w-0"} transition-all duration-500 relative overflow-hidden rounded-full`}>
                <Image
                  src="/assets/bg.webp"
                  fill
                  alt="Background"
                  className="absolute inset-0 object-cover blur-lg scale-150"
                  priority
                />
                <div className="relative z-10 text-white text-sm font-medium text-center">{error}</div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`mt-4 px-4 py-2 bg-red-800 text-white font-semibold rounded-full uppercase text-sm transition-all duration-200 ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
                  }`}
              >
                {loading ? "Se conectează..." : "Conectează-te"}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Nu ai un cont?{" "}
            <Link href="/auth/register" className="text-red-800 hover:underline">
              Înregistrează-te
            </Link>
          </p>
        </div>
      </Section>
    </div>
  );
}
