import Section from "@/components/home/Section";
import { SessionContext } from "@/pages/_app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

export default function NewUserPage() {
  const router = useRouter();
  const session = useContext(SessionContext);

  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const res = await fetch("/api/users/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, birthdate, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Eroare necunoscută");

      alert("User creat cu succes!");
      router.push("/app/users");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section name="app" className="mt-24" bgColor="bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mt-4">Adaugă User Nou</h1>
      {error && <p className="mt-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-2xl">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Nume</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="birthdate">Data Nașterii</label>
          <input
            type="date"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Parolă</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-800"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 bg-red-800 hover:scale-105 transition-all duration-200 cursor-pointer text-white font-semibold rounded-full uppercase text-sm ${loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {loading ? "Se adaugă..." : "Adaugă User"}
        </button>

        <Link
          href="/app/users"
          className="ml-4 px-6 py-2 bg-gray-800 hover:scale-105 transition-all duration-200 cursor-pointer text-white font-semibold rounded-full uppercase text-sm"
        >
          Înapoi
        </Link>
      </form>
    </Section>
  );
}
