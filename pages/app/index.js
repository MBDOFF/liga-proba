import { useRouter } from "next/router";
import { useContext } from "react";
import Section from "@/components/home/Section";
import Link from "next/link";
import { SessionContext } from "../_app";

export default function AppPage() {
  const router = useRouter();
  const session = useContext(SessionContext);

  if (!session?.user) {
    if (typeof window !== "undefined") router.push("/auth/login");
    return null;
  }

  return <>

    <Section name="app" className="mt-32" bgColor="bg-white">
      <h1 className="text-3xl font-bold text-gray-800">Bine ai venit</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mt-1.5">{session.user.email} ({session.user.profile.name})</h2>

      <p className="mt-4 text-gray-600">Aici poți gestiona ideile și postările tale.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <Link href="/idei" className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-red-800 text-xl font-bold mb-2">Vezi Idei de Proiecte</h3>
          <p className="text-gray-600 mt-4 grow">Explorează cele mai noi propuneri de idei din comunitatea noastră.</p>
        </Link>

        <Link href="/postari" className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-red-800 text-xl font-bold mb-2">Vezi Postările Recente</h3>
          <p className="text-gray-600 mt-4 grow">Descoperă cele mai recente postări și contribuie la discuții.</p>
        </Link>

        <Link href="/app/users/me" className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-red-800 text-xl font-bold mb-2">Profilul Meu</h3>
          <p className="text-gray-600 mt-4 grow">Gestionează informațiile tale personale și setările contului.</p>
        </Link>

        <Link href="/app/idei/new" className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-red-800 text-xl font-bold mb-2">Adaugă o Idee</h3>
          <p className="text-gray-600 mt-4 grow">Contribuie cu o nouă idee pentru proiecte.</p>
        </Link>

        <Link href="/app/postari/new" className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-red-800 text-xl font-bold mb-2">Adaugă o Postare</h3>
          <p className="text-gray-600 mt-4 grow">Publică o nouă postare în comunitatea noastră.</p>
        </Link>

        <Link href="/app/admin" className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-red-800 text-xl font-bold mb-2">Panou Admin</h3>
          <p className="text-gray-600 mt-4 grow">Accesează funcționalitățile de administrare ale platformei.</p>
        </Link>

      </div>

    </Section>


    <Link href="/auth/logout" className="fixed bottom-6 right-6 px-4 py-2 bg-red-800 hover:scale-105 transition-all duration-200 cursor-pointer text-white font-semibold rounded-full uppercase text-sm">
      Deconectare
    </Link>

  </>

}