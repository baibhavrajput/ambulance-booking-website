'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQueryParam } from '@/hooks/use-query-param';
import { JetskiBoatIcon } from '@/components/icons/boat-types/jetski-boat';
import { MotorBoatIcon } from '@/components/icons/boat-types/motor-boat';
import { HouseBoatIcon } from '@/components/icons/boat-types/house-boat';
import { RibBoatIcon } from '@/components/icons/boat-types/rib-boat';
import { SailBoatIcon } from '@/components/icons/sail-boat';
import SelectBox from '@/components/ui/select-box';

const options = [
  {
    label: 'Choose payment mode',
    icon: <SailBoatIcon className="h-auto w-5" />,
    disabled: true,
  },
  {
    label: 'Cash',
    icon: <HouseBoatIcon className="h-auto w-5" />,
  },
  {
    label: 'Mediclaim',
    icon: <MotorBoatIcon className="h-auto w-5" />,
  },
  {
    label: 'Referred',
    icon: <JetskiBoatIcon className="h-auto w-5" />,
  },
  // {
  //   label: 'Cabin cruiser',
  //   icon: <RibBoatIcon className="h-auto w-5" />,
  // },
  // {
  //   label: 'Dinghies',
  //   icon: <HouseBoatIcon className="h-auto w-5" />,
  // },
];

export default function PaymentModeTypeFilter() {
  const searchParams = useSearchParams();
  const boatType = searchParams?.get('boatType');
  const { clearFilter, updateQueryparams } = useQueryParam();
  const [selected, setSelected] = useState(options[0]);

  // sets the url when selected
  // useEffect(() => {
  //   if (selected.disabled) {
  //     clearFilter(['boatType']);
  //   } else {
  //     updateQueryparams('boatType', selected.label);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selected]);

  // sets the state if in url
  useEffect(() => {
    if (boatType) {
      const b: any = options.find((item) => item.label === boatType);
      setSelected(b);
    } else {
      setSelected(options[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boatType]);

  return (
    <SelectBox
      value={selected}
      label="Select Payment Mode"
      options={options}
      optionIcon={true}
      onChange={(data: any) => setSelected(data)}
      labelClassName="!text-sm lg:!text-base"
      buttonClassName="mb-4 h-10 lg:h-11 2xl:h-12"
      arrowIconClassName="right-3"
      clearable={selected.disabled ? false : true}
      onClearClick={(e) => {
        e.stopPropagation();
        setSelected(options[0]);
      }}
    />
  );
}
