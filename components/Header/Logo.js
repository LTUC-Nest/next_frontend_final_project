// components/Logo.js
import React from 'react';
import Link from 'next/link';

export default function Logo() {
  return (
    <div className="flex flex-shrink-0 items-center">
      <Link href="/">
          <img
            alt="Nest"
            src="Nest.png"
            className="h-8 w-auto"
          />
      </Link>
    </div>
  );
}
