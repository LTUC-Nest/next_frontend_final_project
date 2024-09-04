// components/NavMenu.js
import React from 'react';
import { classNames } from '@/utils/utils';


const NavMenu = ({ navigation }) => {
  return (
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
  );
};

export default NavMenu;
