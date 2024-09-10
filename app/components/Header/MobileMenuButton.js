// components/MobileMenuButton.js
import React from 'react';
import { DisclosureButton } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function MobileMenuButton() {
  return (
    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
      <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-text-dark hover:bg-primary-dark hover:text-bg-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bg-light">
        <span className="sr-only">Open main menu</span>
        <Bars3Icon aria-hidden="true" className="h-6 w-6 group-data-[open]:hidden" />
        <XMarkIcon aria-hidden="true" className="h-6 w-6 group-data-[open]:block" />
      </DisclosureButton>
    </div>
  );
}