import { useRouter } from "next/router";

export default function LogoutPage() {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    fetch('/api/auth/logout').then(() => {
      router.push('/');
    });
  }
  return null;
}