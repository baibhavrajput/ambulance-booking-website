'use client';

import clsx from 'clsx';
import Text from '@/components/ui/typography/text';
import Button from '@/components/ui/button';

export default function PricingHero({
  state,
  onClick,
}: {
  state: string;
  onClick: (key: string) => void;
}) {
  return (
    <div className="mt-8 text-center   lg:mt-20 2xl:mt-24">
      <Text tag="h1" className="text-[28px] font-bold leading-10">
        Select your pricing plan
      </Text>
      <Text className="mt-2 text-base 2xl:mt-4">
        Simple Transparent pricing for everyone
      </Text>
      <div className="mt-8 inline-block rounded-md bg-[#F2F4F7] p-1 2xl:mt-14">
        <Button
          size="lg"
          className={clsx(
            'focus:!ring-0 2xl:!p-[11px_26px]',
            state === 'monthly'
              ? 'bg-gray-dark text-white'
              : '!bg-transparent !text-gray-dark'
          )}
          onClick={() => onClick('monthly')}
        >
          One-way
        </Button>
        <Button
          size="lg"
          className={clsx(
            'focus:!ring-0 2xl:!p-[11px_26px]',
            state === 'annually'
              ? 'bg-gray-dark text-white'
              : '!bg-transparent !text-gray-dark'
          )}
          onClick={() => onClick('annually')}
        >
          Round-trip
        </Button>
      </div>
    </div>
  );
}

export function SwitchButtonComponent({
  state,
  onClick,
}: {
  state: string;
  onClick: (key: string) => void;
}) {
  return (
    <div className="text-center">
      <div className="inline-block rounded-md bg-[#F2F4F7] p-1">
        <Button
          size="lg"
          className={clsx(
            'focus:!ring-0 2xl:!p-[11px_26px]',
            state === 'monthly'
              ? 'bg-gray-dark text-white'
              : '!bg-transparent !text-gray-dark'
          )}
          onClick={() => onClick('monthly')}
        >
          Booking
        </Button>
        <Button
          size="lg"
          className={clsx(
            'focus:!ring-0 2xl:!p-[11px_26px]',
            state === 'annually'
              ? 'bg-gray-dark text-white'
              : '!bg-transparent !text-gray-dark'
          )}
          onClick={() => onClick('annually')}
        >
          Pricing
        </Button>
      </div>
    </div>
  );
}
