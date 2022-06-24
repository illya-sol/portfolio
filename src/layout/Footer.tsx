import Image from 'next/image';
import Link from 'next/link';

const Footer = () => (
  <footer className="text-xl">
    <div className="flex justify-center py-4">
      <Image
        src="/android-chrome-512x512.png"
        alt="logo"
        width={128}
        height={128}
      />
    </div>
    <div>
      <ul className="flex flex-wrap justify-center text-xl pb-4">
        <li className="mr-6">
          <Link href="/">
            <a className="text-dark-fourth border-none hover:text-dark-fourth">
              LinkedIn
            </a>
          </Link>
        </li>
        <li className="mr-6">
          <Link href="/about">
            <a className="text-dark-fourth border-none hover:text-dark-fourth">
              Github
            </a>
          </Link>
        </li>
        <li className="mr-6">
          <a
            className="text-dark-fourth border-none hover:text-dark-fourth"
            href="https://github.com/illya-sol"
          >
            CodePen
          </a>
        </li>
      </ul>
    </div>
    <div className="border-t border-gray-300 text-center py-4">
      © {new Date().getFullYear()} Illya Solodky -{' '}
      <Link href="/" passHref>
        <a className="text-dark-second">Contact</a>
      </Link>
    </div>
  </footer>
);

export default Footer;
