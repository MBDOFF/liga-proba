import Section from "@/components/home/Section";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { SessionContext } from "../_app";

export default function RegisterPage() {
  const router = useRouter();
  const session = useContext(SessionContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (session?.user) {
    if (typeof window !== "undefined") router.push("/app");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, profile: { name, birthdate } }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Eroare la înregistrare.");
      } else {
        router.push("/app");
      }
    } catch (err) {
      console.error(err);
      setError("Eroare de rețea.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full relative">
      <Section name="register" className="justify-center mt-10" bgColor="bg-white">
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
              Înregistrare
            </h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nume complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
              />
              <input
                type="password"
                placeholder="Parolă"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
              />
              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
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
                {loading ? "Se înregistrează..." : "Înregistrează-te"}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Ai deja un cont?{" "}
            <Link href="/auth/login" className="text-red-800 hover:underline">
              Conectează-te
            </Link>
          </p>
        </div>
      </Section>
    </div>
  );
}
