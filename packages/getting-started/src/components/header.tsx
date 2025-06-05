import Link from "next/link";

export default function Header() {
  return (
    <div className="absolute w-full z-50">
      <nav className="flex text-white items-center justify-between px-6 py-2">
        <h1 className="text-3xl font-bold">
          <Link href="/" className="white-focusable">
            Cloud Corp
          </Link>
        </h1>
        <ul className="hidden sm:flex text-2xl space-x-4">
          <li>
            <Link href="/performance" className="white-focusable">
              Performance
            </Link>
          </li>
          <li>
            <Link href="/reliability" className="white-focusable">
              Reliability
            </Link>
          </li>
          <li>
            <Link href="/scale" className="white-focusable">
              Scale
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
