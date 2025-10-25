import Hero from "@/components/home/Hero";
import Section from "@/components/home/Section";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/contact/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Eroare necunoscută");

      setSuccess("Mesajul a fost trimis cu succes!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`relative w-full`}>
      <Hero />
      <Section className="justify-center" name="despre" bgColor="bg-white">
        <h2 className="text-3xl font-semibold text-gray-800">Welcome to ideaHub <span className="text-red-800">!</span></h2>

        <p className="mt-4 text-lg text-gray-600 max-w-3xl text-center">
          În lumea noastră dinamică, inovația și creativitatea sunt esențiale. <br /> La IdeaHub, oferim un spațiu dedicat celor care doresc să-și transforme ideile în realitate prin colaborare și învățare.
        </p>

        <div className="mt-6 flex space-x-4">
          <Link href="/auth/register" className="px-6 py-2 bg-red-800 hover:scale-110 transition-all duration-200 cursor-pointer text-white font-semibold rounded-full uppercase text-sm">
            Alătură-te comunității
          </Link>
          <Link href="/idei" className="px-6 py-2 bg-gray-200 hover:scale-110 transition-all duration-200 cursor-pointer text-gray-800 font-semibold rounded-full uppercase text-sm">
            Vezi idei de proiecte
          </Link>
        </div>

        <div className="relative mt-24 w-full h-72 bg-gray-200 rounded-2xl flex items-center justify-center">
          <Image src="/assets/banner.png" alt="Imagine Promoțională" layout="fill" className="absolute rounded-2xl object-cover" />
        </div>

      </Section>
      <Section name="faqs" className="justify-center" bgColor="bg-red-800">
        <h2 className="text-3xl font-semibold text-white">FAQs</h2>

        <div className="mt-12">
          <div className="mb-4 p-4 border border-white rounded-lg">
            <h3 className="text-lg font-semibold text-white">Cum mă pot alătura comunității IdeaHub?</h3>
            <p className="mt-2 text-white">Pentru a te alătura, pur și simplu apasă pe butonul "Alătură-te comunității" și urmează instrucțiunile de înregistrare.</p>
          </div>
          <div className="mb-4 p-4 border border-white rounded-lg">
            <h3 className="text-lg font-semibold text-white">Ce tipuri de idei pot fi împărtășite pe platformă?</h3>
            <p className="mt-2 text-white">Orice idee inovatoare, fie că este tehnologică, socială sau de afaceri, este binevenită pe IdeaHub.</p>
          </div>
          <div className="mb-4 p-4 border border-white rounded-lg">
            <h3 className="text-lg font-semibold text-white">Există costuri asociate utilizării platformei?</h3>
            <p className="mt-2 text-white">Nu, IdeaHub este complet gratuită pentru toți membrii comunității noastre.</p>
          </div>
          <div className="mb-4 p-4 border border-white rounded-lg">
            <h3 className="text-lg font-semibold text-white">Mai am întrebări. Cum pot obține ajutor?</h3>
            <p className="mt-2 text-white">Dacă ai alte întrebări, nu ezita să ne contactezi prin secțiunea de contact.</p>
          </div>
        </div>
        <Link href="/#contact" className="mt-6 px-6 py-2 bg-white hover:scale-110 transition-all duration-200 cursor-pointer text-red-800 font-semibold rounded-full uppercase text-sm">
          Contactează-ne
        </Link>
      </Section>
      <Section name="contact" className="justify-center" bgColor="bg-white">
        <h2 className="text-3xl font-semibold text-gray-800">Contact us</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl text-center">
          Ai întrebări sau dorești să afli mai multe despre IdeaHub? Suntem aici să te ajutăm! Completează formularul de mai jos și echipa noastră te va contacta în cel mai scurt timp posibil.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 w-full max-w-lg flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Numele tău"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email-ul tău"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Mesajul tău"
            rows="5"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          {error && <p className="text-red-800">{error}</p>}
          {success && <p className="text-green-800">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 bg-red-800 hover:scale-110 transition-all duration-200 cursor-pointer text-white font-semibold rounded-full uppercase text-sm ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Se trimite..." : "Trimite mesajul"}
          </button>
        </form>
      </Section>
    </main>
  );
}
