'use client';

import clsx from 'clsx';
import Button from '@/components/ui/button';

export function DualSwitchButton({
  state,
  onClick,
}: {
  state: string;
  onClick: (key: string) => void;
}) {
  return (
    <div className="text-center mb-4">
      <div className="inline-block rounded-md bg-[#F2F4F7] p-1">
        <Button
          size="lg"
          className={clsx(
            'focus:!ring-0 2xl:!p-[11px_26px]',
            state === 'booking'
              ? 'bg-gray-dark text-white'
              : '!bg-transparent !text-gray-dark'
          )}
          onClick={() => onClick('booking')}
        >
          Instant booking
        </Button>
        <Button
          size="lg"
          className={clsx(
            'focus:!ring-0 2xl:!p-[11px_26px]',
            state === 'pricing'
              ? 'bg-gray-dark text-white'
              : '!bg-transparent !text-gray-dark'
          )}
          onClick={() => onClick('pricing')}
        >
          Booking with pricing
        </Button>
      </div>
    </div>
  );
}
