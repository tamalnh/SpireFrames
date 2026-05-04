import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-edge flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="eyebrow">404</p>
      <h1 className="display mt-4 text-5xl">This page wandered off.</h1>
      <p className="mt-4 max-w-md text-cream/70">
        The link you followed may be broken, or the page may have moved.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Return home
      </Link>
    </section>
  );
}
