import { redirect } from "next/navigation";

// La racine / est gérée par le redirect dans next.config.ts
// Ce fallback assure la redirection si le middleware ne s'active pas
export default function RootPage() {
  redirect("/fr/quiz");
}
