/**
 * Заглушка рекламного блока (РСЯ / AdSense).
 * При подключении рекламной сети заменить содержимое на скрипт/компонент сети.
 * id нужен для таргетинга конкретного слота в настройках рекламной сети.
 *
 * Дизайн: невидимый placeholder с min-height, чтобы не сдвигать вёрстку после загрузки рекламы.
 * На широких экранах — 728×90 (leaderboard), на мобильных — 320×50.
 */
export function AdSlot({ id, className = "" }: { id: string; className?: string }) {
  return (
    <div
      id={id}
      className={`my-6 min-h-[50px] w-full rounded-lg sm:min-h-[90px] ${className}`}
      aria-hidden
    />
  );
}
