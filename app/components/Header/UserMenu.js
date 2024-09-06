import React from 'react';
import { Menu } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

// Menu items
const MenuItem = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={classNames(
      'block w-full text-left px-4 py-2 text-sm text-text-dark',
      { 'bg-gray-100': active }
    )}
  >
    {children}
  </button>
);

const UserMenu = ({ handleLogout }) => {
  return (
    <div className="relative flex items-center space-x-3">
      {/* Notification button */}
      <button
        type="button"
        aria-label="View notifications"
        className="relative rounded-full bg-red-600 p-1 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600"
      >
        <BellIcon aria-hidden="true" className="h-6 w-6" />
      </button>

      {/* User menu */}
      <Menu as="div" className="relative">
        {({ open }) => (
          <>
            <Menu.Button
              aria-expanded={open}
              className="flex rounded-full bg-primary-dark text-sm focus:outline-none focus:ring-2 focus:ring-bg-light focus:ring-offset-2 focus:ring-offset-primary-dark"
            >
              <span className="sr-only">Open user menu</span>
              <img
                alt="User"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="h-8 w-8 rounded-full"
                loading="lazy"
              />
            </Menu.Button>

            <Menu.Items
              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-bg-light py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      'block px-4 py-2 text-sm text-text-dark',
                      { 'bg-gray-100': active }
                    )}
                  >
                    Your Profile
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/Dashboard"
                    className={classNames(
                      'block px-4 py-2 text-sm text-text-dark',
                      { 'bg-gray-100': active }
                    )}
                  >
                    Dashboard
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <MenuItem
                    active={active}
                    onClick={handleLogout}
                  >
                    Sign out
                  </MenuItem>
                )}
              </Menu.Item>
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  );
};

export default UserMenu;
