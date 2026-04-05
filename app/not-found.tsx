import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5"
      style={{ background: "var(--background)" }}
    >
      {/* Wordmark */}
      <p
        style={{
          fontFamily: "var(--font-fraunces)",
          fontStyle: "italic",
          fontSize: "18px",
          color: "var(--foreground)",
          letterSpacing: "-0.01em",
          marginBottom: "56px",
          opacity: 0.5,
        }}
      >
        CoupleCheck
      </p>

      {/* Card */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "48px 40px",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
        }}
      >
        {/* Code */}
        <p
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "72px",
            fontWeight: 300,
            color: "var(--primary)",
            lineHeight: 1,
            marginBottom: "16px",
            letterSpacing: "-0.04em",
          }}
        >
          404
        </p>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-fraunces)",
            fontStyle: "italic",
            fontSize: "22px",
            fontWeight: 400,
            color: "var(--foreground)",
            marginBottom: "12px",
            lineHeight: 1.3,
          }}
        >
          Cette page s&apos;est perdue en chemin…
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "14px",
            color: "var(--muted-foreground)",
            lineHeight: 1.6,
            marginBottom: "32px",
          }}
        >
          La page que tu cherches n&apos;existe pas ou a été déplacée.
          <br />
          Pas d&apos;inquiétude, ton espace t&apos;attend.
        </p>

        {/* Primary CTA */}
        <Link
          href="/fr/platform/chat"
          className="block bg-[var(--primary)] hover:opacity-90 text-white text-[14px] font-semibold px-6 py-3 rounded-full no-underline mb-4 transition-opacity duration-150"
        >
          Retourner à mon espace
        </Link>

        {/* Secondary link */}
        <Link
          href="/fr"
          className="text-[13px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] no-underline transition-colors duration-150"
        >
          Revenir au site →
        </Link>
      </div>
    </div>
  );
}
