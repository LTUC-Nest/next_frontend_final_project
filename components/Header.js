"use client";

import { useState, useEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { toggleDarkMode, applySavedTheme } from '../hooks/theme';

const initialNavigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Our Services', href: '#', current: false },
  { name: 'Properties', href: '/properties', current: false },
  { name: 'About Us', href: '/about', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [navigation, setNavigation] = useState(initialNavigation);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);

    const currentPath = window.location.pathname;

    const updatedNavigation = initialNavigation.map(item => ({
      ...item,
      current: item.href === currentPath,
    }));

    setNavigation(updatedNavigation);

    // Apply the saved theme when the component mounts
    const savedTheme = applySavedTheme();
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    router.push('/login');
  };

  const handleToggleDarkMode = () => {
    const newMode = toggleDarkMode();
    setIsDarkMode(newMode === 'dark');
  };

  return (
    <Disclosure as="nav">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-text-dark hover:bg-primary-dark hover:text-bg-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bg-light">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-primary-dark text-bg-light' : 'text-text-dark hover:bg-primary-dark hover:text-bg-light',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              onClick={handleToggleDarkMode}
              className="text-text-dark hover:bg-primary-dark hover:text-bg-light rounded-md p-2 text-sm font-medium"
            >
              {isDarkMode ? <SunIcon className="h-6 w-6" aria-hidden="true" /> : <MoonIcon className="h-6 w-6" aria-hidden="true" />}
            </button>
            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  className="relative rounded-full bg-primary-dark p-1 text-text-dark hover:text-bg-light focus:outline-none focus:ring-2 focus:ring-bg-light focus:ring-offset-2 focus:ring-offset-primary-dark"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>

                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-primary-dark text-sm focus:outline-none focus:ring-2 focus:ring-bg-light focus:ring-offset-2 focus:ring-offset-primary-dark">
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt="User"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="h-8 w-8 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <Menu.Items
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-bg-light py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                  >
                    <Menu.Item>
                      <a href="#" className="block px-4 py-2 text-sm text-text-dark hover:bg-gray-100">
                        Your Profile
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <a href="#" className="block px-4 py-2 text-sm text-text-dark hover:bg-gray-100">
                        Settings
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-text-dark hover:bg-gray-100 w-full text-left"
                      >
                        Sign out
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </>
            ) : (
              <button
                onClick={() => router.push('/login')}
                className="text-text-dark hover:bg-primary-dark hover:text-bg-light rounded-md px-3 py-2 text-sm font-medium"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-primary-dark text-bg-light' : 'text-text-dark hover:bg-primary-dark hover:text-bg-light',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
          {isLoggedIn ? (
            <DisclosureButton
              onClick={handleLogout}
              className="block w-full rounded-md px-3 py-2 text-base font-medium text-text-dark hover:bg-primary-dark hover:text-bg-light"
            >
              Sign out
            </DisclosureButton>
          ) : (
            <DisclosureButton
              onClick={() => router.push('/login')}
              className="block w-full rounded-md px-3 py-2 text-base font-medium text-text-dark hover:bg-primary-dark hover:text-bg-light"
            >
              Sign in
            </DisclosureButton>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
