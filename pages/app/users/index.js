import Section from "@/components/home/Section";
import { SessionContext } from "@/pages/_app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function UsersListPage() {
  const router = useRouter();
  const session = useContext(SessionContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  if (!session?.user) {
    if (typeof window !== "undefined") router.push("/auth/login");
    return null;
  }

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const res = await fetch("/api/users/list");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Eroare necunoscută");

        setUsers(data.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Sigur vrei să ștergi acest utilizator?")) return;

    try {
      const res = await fetch(`/api/users/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Eroare necunoscută");

      setUsers(users.filter((u) => u._id !== id));
      alert("Utilizator șters cu succes!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Section name="users" className="mt-24" bgColor="bg-white">
        <h1 className="text-3xl font-bold text-gray-800 mt-4">Lista Utilizatorilor</h1>

        <div className="mt-6">
          <Link
            href="/app/users/new"
            className="px-6 py-2 bg-red-800 hover:scale-105 transition-all duration-200 cursor-pointer text-white font-semibold rounded-full uppercase text-sm"
          >
            Adaugă utilizator nou
          </Link>
          <Link
            href="/app/admin"
            className="ml-4 px-6 py-2 bg-gray-800 hover:scale-105 transition-all duration-200 cursor-pointer text-white font-semibold rounded-full uppercase text-sm"
          >
            înapoi
          </Link>
        </div>

        {loading && <p className="mt-4 text-gray-600">Se încarcă utilizatorii...</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}

        <div className="mt-6 w-full max-w-4xl space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between p-4 border rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{user.profile?.name || "Anonim"}</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <div className="flex space-x-2">
                <Link
                  href={`/app/users/edit?id=${user._id}`}
                  className="px-4 py-2 bg-green-800 hover:scale-105 transition-all duration-200 cursor-pointer text-white font-semibold rounded-full text-sm"
                >
                  Editeaza
                </Link>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="px-4 py-2 bg-red-800 hover:scale-105 transition-all duration-200 cursor-pointer text-white font-semibold rounded-full text-sm"
                >
                  Șterge
                </button>
              </div>
            </div>
          ))}

          {!loading && users.length === 0 && (
            <p className="text-gray-600">Nu există utilizatori înregistrati.</p>
          )}
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
