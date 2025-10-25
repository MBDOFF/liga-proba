import { useRouter } from "next/router";
import { useContext } from "react";
import Section from "@/components/home/Section";
import Link from "next/link";
import { SessionContext } from "@/pages/_app";

export default function AppPage() {
  const router = useRouter();
  const session = useContext(SessionContext);

  if (!session?.user) {
    if (typeof window !== "undefined") router.push("/auth/login");
    return null;
  }

  return <>
    <Section name="app" className="mt-24" bgColor="bg-white">
      <div className="text-white rounded-2xl w-max bg-red-800 text-lg px-4 py-2">Panou Admin</div>
      <h1 className="text-3xl font-bold text-gray-800 mt-4">Bine ai venit</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mt-1.5">{session.user.email} ({session.user.profile.name})</h2>
      <p className="mt-4 text-gray-600">Acesta este panoul de administrare al platformei.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <Link href="/app/users" className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-red-800 text-xl font-bold mb-2">Gestionează Utilizatori</h3>
          <p className="text-gray-600 mt-4 grow">Explorează lista utilizatorilor din comunitatea noastră.</p>
        </Link>

        <Link href="/app/idei" className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-red-800 text-xl font-bold mb-2">Gestionează Ideile de Proiecte</h3>
          <p className="text-gray-600 mt-4 grow">Explorează cele mai noi propuneri de idei din comunitatea noastră.</p>
        </Link>

        <Link href="/app/postari" className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-red-800 text-xl font-bold mb-2">Gestionează Postările</h3>
          <p className="text-gray-600 mt-4 grow">Explorează cele mai recente postări din comunitatea noastră.</p>
        </Link>

        <Link href="/app/contact" className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-red-800 text-xl font-bold mb-2">Gestionează Mesajele</h3>
          <p className="text-gray-600 mt-4 grow">Explorează lista mesajelor provenite din formularul de contact.</p>
        </Link>

        <Link href="/app" className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-red-800 text-xl font-bold mb-2">Panou utilizator</h3>
          <p className="text-gray-600 mt-4 grow">Accesează funcționalitățile de utilizator ale platformei.</p>
        </Link>

      </div>

    </Section>


    <Link href="/auth/logout" className="fixed bottom-6 right-6 px-4 py-2 bg-red-800 hover:scale-105 transition-all duration-200 cursor-pointer text-white font-semibold rounded-full uppercase text-sm">
      Deconectare
    </Link>

  </>

}