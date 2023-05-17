import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 mt-4 pl-5">
      <div>
        <Link href="/terms" className="hover:text-blue-600">
          Terms
        </Link>
        <Link href="/privacy-policy" className="ml-5 hover:text-blue-600">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
