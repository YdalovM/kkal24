import Script from "next/script";

/**
 * Яндекс.Метрика: номер счётчика в `NEXT_PUBLIC_YM_COUNTER_ID` (только цифры).
 * Скрипт — первый в `<body>` (`layout.tsx`); `afterInteractive` — рекомендуемая стратегия для App Router
 * ( `beforeInteractive` в eslint привязан к `pages/_document` ).
 * После выполнения доступны `window.ym` и `window.YM_COUNTER_ID` для `reachGoal` в `lib/analytics.ts`.
 */
export function YandexMetrika() {
  const raw = process.env.NEXT_PUBLIC_YM_COUNTER_ID;
  const counterId = raw ? Number.parseInt(String(raw).trim(), 10) : NaN;
  if (!Number.isFinite(counterId) || counterId <= 0) {
    return null;
  }

  const inline = `
(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${counterId}', 'ym');

ym(${counterId}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
window.YM_COUNTER_ID=${counterId};
`;

  return (
    <>
      <Script
        id="ym-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: inline }}
      />
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${counterId}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
