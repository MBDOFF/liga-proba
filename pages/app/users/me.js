import Section from "@/components/home/Section";
import { SessionContext } from "@/pages/_app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

export default function ProfileEditPage() {
  const router = useRouter();
  const session = useContext(SessionContext);

  const [name, setName] = useState(session?.user?.profile?.name || "");
  const [birthdate, setBirthdate] = useState(session?.user?.profile?.birthdate || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!session?.user) {
    if (typeof window !== "undefined") router.push("/auth/login");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/users/me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, birthdate }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Eroare necunoscută");

      alert("Profilul a fost actualizat cu succes!");
      router.push("/app");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Section name="app" className="mt-24" bgColor="bg-white">
        <h1 className="text-3xl font-bold text-gray-800 mt-4">Editează Profilul</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mt-1.5">{session.user.email}</h2>
        <p className="mt-4 text-gray-600">
          Modifică-ți informațiile personale mai jos.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 w-full max-w-2xl">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
              Nume
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-800"
              placeholder="Introdu numele tău"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="birthdate">
              Data Nașterii
            </label>
            <input
              type="date"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-800"
            />
          </div>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 bg-red-800 hover:scale-105 transition-all duration-200 cursor-pointer text-white font-semibold rounded-full uppercase text-sm ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Se actualizează..." : "Actualizează Profilul"}
          </button>

          <Link
            href="/app"
            className="ml-4 px-6 py-2 bg-gray-800 hover:scale-105 transition-all duration-200 cursor-pointer text-white font-semibold rounded-full uppercase text-sm"
          >
            Înapoi
          </Link>
        </form>
      </Section>

      <Link
        href="/auth/logout"
        className="fixed bottom-6 right-6 px-4 py-2 bg-red-800 hover:scale-105 transition-all duration-200 cursor-pointer text-white font-semibold rounded-full uppercase text-sm"
      >
        Deconectare
      </Link>
    </>
  );
}
