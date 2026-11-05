import { useEffect, useRef } from "react";

/**
 * Compliant Google AdSense Container
 *
 * AdSense Guidelines Compliance:
 * 1. Explicit "ADVERTISEMENT" label prevents accidental clicks or deceptive masking.
 * 2. Min-height and responsive container reduce Cumulative Layout Shift (CLS).
 * 3. Never renders fake/empty "placeholder" boxes when slot is unset, avoiding
 *    Google's "Site Under Construction / Placeholders" policy rejection.
 */
export default function AdBanner({
  slot,
  format = "auto",
  responsive = "true",
  className = "",
  style = {},
}) {
  const adRef = useRef(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    // Only attempt to push when a valid slot is provided and adsbygoogle exists
    if (slot && !pushedRef.current && typeof window !== "undefined") {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      } catch (err) {
        console.debug("AdSense push skipped or blocked:", err);
      }
    }
  }, [slot]);

  // If no slot ID has been configured yet, do not render an empty placeholder box
  if (!slot) return null;

  return (
    <div
      className={`my-8 flex flex-col items-center justify-center w-full px-4 ${className}`}
      data-ad-container="true"
    >
      <div className="w-full max-w-4xl rounded-2xl bg-white/[0.02] border border-white/5 p-4 flex flex-col items-center">
        {/* Policy-mandated advertisement label */}
        <span className="text-[10px] font-semibold tracking-wider uppercase text-white/30 mb-2 select-none">
          Advertisement
        </span>

        <div className="w-full overflow-hidden flex justify-center min-h-[90px]" ref={adRef}>
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%", ...style }}
            data-ad-client="ca-pub-5420398402159551"
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={responsive}
          />
        </div>
      </div>
    </div>
  );
}
