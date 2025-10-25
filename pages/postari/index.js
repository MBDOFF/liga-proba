import Section from "@/components/home/Section";
import { SessionContext } from "@/pages/_app";
import { useContext, useEffect, useState } from "react";

export default function PostPage() {
  const session = useContext(SessionContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const res = await fetch("/api/posts/list");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Eroare necunoscută");
        setPosts(data.posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="w-full relative">
      <Section name="postari" className="mt-24" bgColor="bg-white">
        <h2 className="text-3xl font-semibold text-gray-800 text-center">Cele mai recente postări</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl text-center mx-auto">
          Explorează cele mai noi postări din comunitatea noastră. Fiecare postare reprezintă un pas spre inovație și colaborare.
        </p>

        {loading && <p className="mt-6 text-center text-gray-600">Se încarcă postările...</p>}
        {error && <p className="mt-6 text-center text-red-600">{error}</p>}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {!loading && posts.length === 0 && (
            <p className="col-span-full text-center text-gray-600">Nu există postări încă.</p>
          )}

          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              <div className="h-40 bg-gray-200">
                {post.imageUrl ? (
                  <img
                    src={post.imageUrl}
                    alt={post.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Fără imagine
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col grow">
                <h3 className="text-red-800 text-xl font-bold mb-2">{post.name}</h3>
                <h2 className="font-semibold text-lg leading-4">
                  Autor: <span className="text-red-800">{post.userName}</span>
                </h2>
                <p className="text-gray-600 mt-4 grow">{post.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
