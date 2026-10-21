import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-cream px-4 py-24 text-center">
      <h1 className="display text-[44px] text-red md:text-[80px]">Page Not Found</h1>
      <p className="mt-4 text-[18px] text-ink/80">The page you&rsquo;re looking for doesn&rsquo;t exist.</p>
      <Link
        href="/"
        className="mt-8 inline-block bg-red px-6 py-2.5 text-[15px] font-semibold uppercase tracking-wide text-white hover:bg-red-dark"
      >
        Back to Home
      </Link>
    </section>
  );
}
