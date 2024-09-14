// components/Logo.js
import React from 'react';
import Link from 'next/link';

export default function Logo({className = ''}) {
  return (
    <div className="animate__animated animate__flip">
      <div className="animate-pulse flex flex-shrink-0 items-center ">
      <Link href="/">
          <img
            alt="Nest"
            src="Nest.png"
            className={className}
          />
      </Link>
      </div>

    </div>
  );
}
