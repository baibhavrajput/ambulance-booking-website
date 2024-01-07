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

type PaymentModeTypeFilterProps = {
  selectedPaymentMode: any;
  setSelectedPaymentMode: any;
  paymentModes: any;
  setFormSubmissionStatus: any;
};

export default function PaymentModeTypeFilter(
  props: PaymentModeTypeFilterProps
) {
  const searchParams = useSearchParams();
  const boatType = searchParams?.get('boatType');

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
  // useEffect(() => {
  //   if (boatType) {
  //     const b: any = props.paymentModes.find(
  //       (item: any) => item.label === boatType
  //     );
  //     props.setSelectedPaymentMode(b);
  //   } else {
  //     props.setSelectedPaymentMode(props.paymentModes[0]);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [boatType]);

  return (
    <SelectBox
      value={props.selectedPaymentMode}
      label="Select Payment Mode"
      options={props.paymentModes}
      optionIcon={true}
      onChange={(data: any) => {
        props.setSelectedPaymentMode(data);
        props.setFormSubmissionStatus(false);
      }}
      labelClassName="!text-sm lg:!text-base"
      buttonClassName="mb-4 h-10 lg:h-11 2xl:h-12"
      arrowIconClassName="right-3"
      clearable={props.selectedPaymentMode.disabled ? false : true}
      onClearClick={(e) => {
        e.stopPropagation();
        props.setSelectedPaymentMode(props.paymentModes[0]);
      }}
    />
  );
}
