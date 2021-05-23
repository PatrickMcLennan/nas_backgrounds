import Link from 'next/link';

export default function Header(): JSX.Element {
  return (
    <header className="header">
      <nav>
        <Link href="/">
          <a className="link">Home</a>
        </Link>
      </nav>
    </header>
  );
}
