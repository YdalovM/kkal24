"use client";

import type { ReactNode } from "react";
import { MainFormToMiniSyncProvider } from "@/contexts/main-form-to-mini-sync";

export function HomeInteractiveShell({ children }: { children: ReactNode }) {
  return <MainFormToMiniSyncProvider>{children}</MainFormToMiniSyncProvider>;
}
