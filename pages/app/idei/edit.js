import Section from "@/components/home/Section";
import { SessionContext } from "@/pages/_app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";

export default function EditIdeaPage() {
  const router = useRouter();
  const { id } = router.query;
  const session = useContext(SessionContext);

  const [ideaName, setIdeaName] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(true);

  if (!session?.user) {
    if (typeof window !== "undefined") router.push("/auth/login");
    return null;
  }

  useEffect(() => {
    if (!id) return;
    async function fetchIdea() {
      try {
        setFetching(true);
        const res = await fetch("/api/ideas/get", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Eroare necunoscută");

        setIdeaName(data.idea.name);
        setIdeaDescription(data.idea.description);
      } catch (err) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    }
    fetchIdea();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/ideas/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name: ideaName,
          description: ideaDescription,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Eroare necunoscută");

      alert("Ideea a fost actualizată cu succes!");
      router.push("/app/idei");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Section name="app" className="mt-24" bgColor="bg-white">
        <h1 className="text-3xl font-bold text-gray-800 mt-4">Editează ideea</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mt-1.5">
          {session.user.email} ({session.user.profile.name})
        </h2>
        <p className="mt-4 text-gray-600">
          Modifică detaliile ideii selectate mai jos.
        </p>

        {fetching ? (
          <p className="mt-6 text-gray-600">Se încarcă ideea...</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 w-full max-w-2xl">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="ideaName"
              >
                Numele Ideii
              </label>
              <input
                type="text"
                id="ideaName"
                value={ideaName}
                onChange={(e) => setIdeaName(e.target.value)}
                className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-800"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="ideaDescription"
              >
                Descrierea Ideii
              </label>
              <textarea
                id="ideaDescription"
                value={ideaDescription}
                onChange={(e) => setIdeaDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-800"
                rows="5"
              />
            </div>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 bg-red-800 hover:scale-105 transition-all duration-200 cursor-pointer text-white font-semibold rounded-full uppercase text-sm ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {loading ? "Se actualizează..." : "Actualizează Ideea"}
            </button>

            <Link
              href="/app/idei"
              className="ml-4 px-6 py-2 bg-gray-800 hover:scale-105 transition-all duration-200 cursor-pointer text-white font-semibold rounded-full uppercase text-sm"
            >
              Înapoi
            </Link>
          </form>
        )}
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
