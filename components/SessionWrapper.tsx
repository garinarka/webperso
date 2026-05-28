import { auth } from "@/auth";
import SessionProviderClient from "./SessionProviderClient";
import type { ReactNode } from "react";

export default async function SessionWrapper({ children }: { children: ReactNode }) {
  const session = await auth();
  return (
    <SessionProviderClient session={session}>
      {children}
    </SessionProviderClient>
  );
}
