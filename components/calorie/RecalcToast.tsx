"use client";

/**
 * Статус после «Рассчитать»: фиксирован к верху экрана, вне потока — без сдвига контента.
 * z-[60] выше нижней плашки TDEE (z-40). Не перехватывает касания (`pointer-events-none`).
 */
type RecalcToastProps = {
  message: string | null;
};

export function RecalcToast({ message }: RecalcToastProps) {
  if (message == null || message === "") return null;

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-[60] flex justify-center px-3 pt-[max(0.65rem,env(safe-area-inset-top,0px))] md:px-4">
      <p
        role="status"
        aria-live="polite"
        className="cal-recalc-toast w-full max-w-lg rounded-xl border border-accent/40 bg-surface/95 px-4 py-3 text-center text-sm leading-relaxed text-fg shadow-[0_12px_40px_rgba(0,0,0,0.55)] backdrop-blur-md [text-wrap:pretty] motion-reduce:animate-none"
      >
        {message}
      </p>
    </div>
  );
}
