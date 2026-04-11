"use client";

import Script from "next/script";

/**
 * Счётчик Яндекс.Метрики: включается только если задан `NEXT_PUBLIC_YM_COUNTER_ID`
 * (число из кабинета Метрики). После загрузки задаёт `window.YM_COUNTER_ID` для `reachGoal`.
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
  for (var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return}}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
ym(${counterId},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,defer:true});
window.YM_COUNTER_ID=${counterId};
`;

  return (
    <>
      <Script id="ym-metrika" strategy="afterInteractive">
        {inline}
      </Script>
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
