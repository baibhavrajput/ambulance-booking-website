'use client';

import { useRef } from 'react';
import { addScrollingClass } from '@/utils/add-scrolling-class';
import SearchIconBtn from '@/components/ui/search-icon-btn';
import Menu from '@/components/header/menu';
import Logo from '@/components/ui/logo';
import ActionIcon from '../ui/action-icon';
import { useAtom } from 'jotai';
import { drawerStateAtom } from '../drawers/view';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';

export default function TransparentHeader() {
//   const headerRef = useRef(null);
  const [drawerSate, setDrawerState] = useAtom(drawerStateAtom);
//   addScrollingClass(headerRef);

  return (
    <header
    //   ref={headerRef}
      className="transparent-header fixed top-0 left-0 z-[100] flex w-full justify-between bg-white px-4 py-3.5 sm:bg-transparent sm:px-6 lg:py-6 2xl:px-7 3xl:px-8 4xl:py-9 4xl:px-16 is-scrolling"
    >
      <div className='flex justify-center'>
        <div className="flex items-center justify-center mr-4">
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
        <Logo />
      </div>
      <div className="flex items-center">
        {/* <SearchIconBtn className="md:hidden" /> */}
        <Menu />
      </div>
    </header>
  );
}
