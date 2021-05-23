import Link from 'next/link';

export default function FourOhFour() {
  return (
    <>
      <h1 className="h1">Oops</h1>

      <p>That image can&amp;t be found</p>

      <Link href="/">
        <a className="return">Home</a>
      </Link>
    </>
  );
}
