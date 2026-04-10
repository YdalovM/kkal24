"use client";

import { useEffect, useState } from "react";

/**
 * Актуальное `window.location.hash` + подписка на `hashchange`.
 * Используется в `SiteSidebar` для подсветки активного якоря на главной.
 *
 * @param routeKey — обычно `pathname` из `usePathname()`: при смене маршрута
 *   перечитываем hash (например после перехода с `/#mini-bmi` на статью).
 */
export function useLocationHash(routeKey: string): string {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const read = () => setHash(window.location.hash);
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, [routeKey]);

  return hash;
}
