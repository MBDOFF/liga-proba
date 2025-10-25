import Section from "@/components/home/Section";
import { SessionContext } from "@/pages/_app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";

export default function EditUserPage() {
  const router = useRouter();
  const session = useContext(SessionContext);
  const { id } = router.query;

  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!session?.user) {
    if (typeof window !== "undefined") router.push("/auth/login");
    return null;
  }

  useEffect(() => {
    if (!id) return;

    async function fetchUser() {
      try {
        setLoading(true);
        const res = await fetch(`/api/users/get?id=${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Eroare necunoscută");

        setName(data.user.profile?.name || "");
        setBirthdate(data.user.profile?.birthdate || "");
        setEmail(data.user.email || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/users/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, birthdate, email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Eroare necunoscută");

      alert("User actualizat cu succes!");
      router.push("/app/users");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Section name="app" className="mt-24" bgColor="bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mt-4">Editează User</h1>
      {loading && <p className="mt-4 text-gray-600">Se încarcă datele userului...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {!loading && (
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

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-800"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className={`px-6 py-2 bg-red-800 hover:scale-105 transition-all duration-200 cursor-pointer text-white font-semibold rounded-full uppercase text-sm ${
              saving ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {saving ? "Se salvează..." : "Salvează Modificările"}
          </button>

          <Link
            href="/app/users"
            className="ml-4 px-6 py-2 bg-gray-800 hover:scale-105 transition-all duration-200 cursor-pointer text-white font-semibold rounded-full uppercase text-sm"
          >
            Înapoi
          </Link>
        </form>
      )}
    </Section>
  );
}