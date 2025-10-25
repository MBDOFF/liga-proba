import Section from "@/components/home/Section";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function IdeiPage() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    <div className="w-full relative">
      <Section name="idei" className="mt-24" bgColor="bg-white">
        <h2 className="text-3xl font-semibold text-gray-800 text-center">Cele mai recente idei</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl text-center mx-auto">
          Explorează cele mai noi propuneri de idei din comunitatea noastră. Fiecare idee reprezintă un pas spre inovație și colaborare.
        </p>

        {loading && <p className="mt-6 text-center text-gray-600">Se încarcă ideile...</p>}
        {error && <p className="mt-6 text-center text-red-600">{error}</p>}

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
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
