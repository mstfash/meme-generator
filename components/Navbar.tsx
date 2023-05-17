import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <Image
              src="/logo.png"
              width="35"
              height="35"
              alt="ImageToMeme logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              ImageToMeme
            </span>
          </a>
          <ul className="ml-10">
            <li>
              <Link
                href="/"
                className="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent md:p-0 hover:text-blue-600"
                aria-current="page"
              >
                Home
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex">
          <a target="_blank" href="https://github.com/mstfash">
            <Image
              src="/github-icon.svg"
              width="30"
              height="30"
              alt="github icon"
            />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
