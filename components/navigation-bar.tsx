import React from 'react';
import Link from 'next/link';

export const NavigationBar = () => {
  return (
    <nav className="flex w-full items-center justify-between bg-white px-6 md:px-16 py-8 text-[#1a3a2a] uppercase text-xs font-semibold tracking-[0.2em] relative z-50">
      <div className="flex-1">
        <Link href="/" className="text-lg tracking-[0.3em]">
          CANTIKA
        </Link>
      </div>

      <ul className="hidden md:flex gap-16 flex-1 justify-center">
        <li>
          <Link href="#about" className="hover:text-[#7eb08c] transition-colors">
            About Me
          </Link>
        </li>
        <li>
          <Link href="#portfolio" className="hover:text-[#7eb08c] transition-colors">
            Projects
          </Link>
        </li>
        <li>
          <Link href="#contact" className="hover:text-[#7eb08c] transition-colors">
            Contacts
          </Link>
        </li>
      </ul>

      <div className="flex-1 text-right hidden md:block">
        <a href="mailto:contact@cantika.com" className="hover:text-[#7eb08c] transition-colors lowercase tracking-normal text-sm">
          contact@cantika.com
        </a>
      </div>
    </nav>
  );
};