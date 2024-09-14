// components/MobileMenu.js
import React from 'react';
import { DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { classNames } from '@/utils/utils';

const MobileMenu = ({ navigation, isLoggedIn, handleLogout, router }) => {
  return (
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
            className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-2xl hover:from-primary-dark hover:to-primary transition-all duration-500 ease-in-out transform hover:scale-110 mt-4 animate-slide-in"
          >
            Sign out
          </DisclosureButton>
        ) : (
          <DisclosureButton


            onClick={() => router.push('/Dashboard')}
            className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-2xl hover:from-primary-dark hover:to-primary transition-all duration-500 ease-in-out transform hover:scale-110 mt-4 animate-slide-in"
          >
            Sign in

          </DisclosureButton>
        )}
      </div>
    </DisclosurePanel>
  );
};

export default MobileMenu;

