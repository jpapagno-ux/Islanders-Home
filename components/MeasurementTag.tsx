import Script from "next/script";
import { consentDefaultScript } from "@/lib/measurement/consent";

/**
 * Loads consent defaults always; loads gtag ONLY when a measurement ID is
 * configured (Stage 3). With no ID, nothing contacts Google.
 * Exactly one measurement ID per page (S1_09 §3).
 */
export function MeasurementTag() {
  const id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  return (
    <>
      <Script id="ih-consent-default" strategy="beforeInteractive">
        {consentDefaultScript()}
      </Script>
      {id ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
          <Script id="ih-gtag-init" strategy="afterInteractive">
            {`gtag('js', new Date());gtag('config','${id}',{send_page_view:true});`}
          </Script>
        </>
      ) : null}
    </>
  );
}
