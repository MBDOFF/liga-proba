import { useRouter } from "next/router";

export default function AuthPage() {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    router.push('/auth/login');
  }
  return null;
}