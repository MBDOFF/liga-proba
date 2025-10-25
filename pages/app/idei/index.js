import Section from "@/components/home/Section";
import { SessionContext } from "@/pages/_app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function IdeasListPage() {
  const router = useRouter();
  const session = useContext(SessionContext);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  if (!session?.user) {
    if (typeof window !== "undefined") router.push("/auth/login");
    return null;
  }

  useEffect(() => {
    async function fetchIdeas() {
      try {
        setLoading(true);
        const res = await fetch("/api/ideas/list");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Eroare necunoscută");

        setIdeas(data.ideas);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchIdeas();
  }, []);

  return (
    <>
      <Section name="app" className="mt-24" bgColor="bg-white">
        <h1 className="text-3xl font-bold text-gray-800 mt-4">Lista ideilor</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mt-1.5">
          {session.user.email} ({session.user.profile.name})
        </h2>

        <div className="mt-6">
          <Link
            href="/app/idei/new"
            className="px-6 py-2 bg-red-800 hover:scale-105 transition-all duration-200 cursor-pointer text-white font-semibold rounded-full uppercase text-sm"
          >
            Adaugă o idee nouă
          </Link>
          <Link
            href="/app/admin"
            className="ml-4 px-6 py-2 bg-gray-800 hover:scale-105 transition-all duration-200 cursor-pointer text-white font-semibold rounded-full uppercase text-sm"
          >
            înapoi
          </Link>
        </div>

        {loading && <p className="mt-4 text-gray-600">Se încarcă ideile...</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {!loading && ideas.length === 0 && (
            <p className="col-span-full text-center text-gray-600">Nu există idei adăugate încă.</p>
          )}

          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-red-800 text-xl font-bold mb-2">{idea.name}</h3>
              <h2 className="font-semibold text-lg leading-4">
                Autor: <span className="text-red-800">{idea.userName}</span>
              </h2>
              <p className="text-gray-600 mt-4 grow">{idea.description}</p>

              <div className="mt-4 flex gap-2">
                <Link
                  href={`/app/idei/edit?id=${idea._id}`} className="px-4 py-2 bg-red-800 hover:scale-105 transition-all duration-200 cursor-pointer text-white font-semibold rounded-full uppercase text-sm">
                  Editeaza
                </Link>
              </div>
            </div>
          ))}
        </div>
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
