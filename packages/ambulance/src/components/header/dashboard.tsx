'use client';

import { useRef } from 'react';
import { addScrollingClass } from '@/utils/add-scrolling-class';
import DashboardMenu from '@/components/ui/dashboard-menu';
import SearchIconBtn from '@/components/ui/search-icon-btn';
import ProfileMenu from '@/components/header/profile-menu';
import Logo from '@/components/ui/logo';
import ActionIcon from '../ui/action-icon';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';
import { useAtom } from 'jotai';
import { drawerStateAtom } from '../drawers/view';

export default function DashboardHeader() {
  const headerRef = useRef(null);
  const [drawerSate, setDrawerState] = useAtom(drawerStateAtom);
  addScrollingClass(headerRef);

  return (
    <header
      ref={headerRef}
      className="dashboard-header sticky top-0 z-50 flex h-16 w-full border-b border-b-gray-lighter bg-white md:flex md:items-center lg:h-[72px] 2xl:h-20 4xl:h-24"
    >
      <div className="container-fluid flex w-full items-center justify-between">
        <div className="flex items-center justify-center">
          <ActionIcon
            variant="text"
            className="inline-block hover:text-red focus:!ring-0"
            onClick={() =>
              setDrawerState({
                ...drawerSate,
                isOpen: true,
                placement: 'left',
                view: 'SIDE_MENU',
              })
            }
          >
            <Bars3CenterLeftIcon className="h-6 w-6 rotate-180" />
          </ActionIcon>
        </div>
        <Logo className="!text-gray-dark" />
        {/* <DashboardMenu /> */}
        {/* <SearchIconBtn className="md:hidden" /> */}
        {/* <ProfileMenu className="hidden md:block" /> */}
      </div>
    </header>
  );
}
