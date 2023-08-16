'use client';

import Script from 'next/script';

export default function ({ GA4_ID }: { GA4_ID: string }) {
  return (
    <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}></Script>
      <Script id="google-analytics" dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA4_ID}');
        `,
      }}></Script>
    </>
  );
}
