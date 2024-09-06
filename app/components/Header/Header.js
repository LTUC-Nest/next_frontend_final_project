// components/Header.js
import React, { useState, useEffect, useContext } from 'react';
import { Disclosure } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/app/context/authContext';
import NavMenu from './NavMenu';
import MobileMenu from './MobileMenu';
import UserMenu from './UserMenu';
import DarkModeToggle from '../DarkModeToggle';
import MobileMenuButton from './MobileMenuButton';
import Logo from './Logo';

const initialNavigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Marketplace', href: '/Marketplace', current: false },
  { name: 'Properties', href: '/Properties', current: false },
  { name: 'Partners', href: '/Partners', current: false },
  { name: 'Pricing', href: '/Pricing', current: false },
  { name: 'About Us', href: '/about', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const router = useRouter();
  const { tokens, logout } = useContext(AuthContext);
  const [navigation, setNavigation] = useState(initialNavigation);

  useEffect(() => {
    const isLoggedIn = !!tokens;
    const currentPath = window.location.pathname;

    const updatedNavigation = initialNavigation.map(item => ({
      ...item,
      current: item.href === currentPath,
    }));

    setNavigation(updatedNavigation);
  }, [tokens]);

  const handleLogout = () => {
    logout();
    router.push('/Dashboard');
  };

  return (
    <Disclosure as="nav">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <MobileMenuButton />
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Logo />
            <NavMenu navigation={navigation} />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <DarkModeToggle />
            {tokens ? (
              <UserMenu handleLogout={handleLogout} />
            ) : (
              <button
                onClick={() => router.push('/Dashboard')}
                className="text-text-dark hover:bg-primary-dark hover:text-bg-light rounded-md px-3 py-2 text-sm font-medium"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
      <MobileMenu
        navigation={navigation}
        isLoggedIn={!!tokens}
        handleLogout={handleLogout}
        router={router}
      />
    </Disclosure>
  );
}
