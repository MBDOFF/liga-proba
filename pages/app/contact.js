import Section from "@/components/home/Section";
import { SessionContext } from "@/pages/_app";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ContactAdminPage() {
  const session = useContext(SessionContext);
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  if (!session?.user) {
    if (typeof window !== "undefined") router.push("/auth/login");
    return null;
  }

  useEffect(() => {
    async function fetchMessages() {
      try {
        setLoading(true);
        const res = await fetch("/api/contact/list");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Eroare necunoscută");

        setMessages(data.messages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, []);

  return (
    <Section name="app" className="mt-24" bgColor="bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mt-4">Mesaje Contact</h1>

      <div className="mt-6">
        <Link
          href="/app/admin"
          className="ml-4 px-6 py-2 bg-gray-800 hover:scale-105 transition-all duration-200 cursor-pointer text-white font-semibold rounded-full uppercase text-sm"
        >
          înapoi
        </Link>
      </div>

      {loading && <p className="mt-4 text-gray-600">Se încarcă mesajele...</p>}
      {error && <p className="mt-4 text-red-800">{error}</p>}

      <div className="mt-6 space-y-4 max-w-4xl w-full">
        {messages.map((msg) => (
          <div key={msg._id} className="border p-4 rounded-2xl bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-800">{msg.name}</h3>
            <p className="text-gray-600 mt-1">{msg.email}</p>
            <p className="text-gray-700 mt-2">{msg.message}</p>
            <p className="text-sm text-gray-400 mt-2">{new Date(msg.createdAt).toLocaleString("ro-RO")}</p>
          </div>
        ))}

        {!loading && messages.length === 0 && (
          <p className="text-gray-600">Nu există mesaje încă.</p>
        )}
      </div>
    </Section>
  );
}
