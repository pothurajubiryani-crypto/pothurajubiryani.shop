import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark text-center px-4">
      <div className="font-display text-8xl text-gold mb-4">404</div>
      <h2 className="font-display text-3xl text-white mb-3">Page Not Found</h2>
      <p className="text-white/40 max-w-md mb-8">
        Looks like this page went missing — just like the last grain of biryani at a party.
      </p>
      <div className="flex gap-4">
        <Link href="/" className="btn-wa !px-6 !py-3 inline-flex items-center gap-2">
          Go Home
        </Link>
        <Link href="/#menu" className="btn-outline !px-6 !py-3 inline-flex items-center gap-2">
          View Menu
        </Link>
      </div>
    </div>
  );
}
