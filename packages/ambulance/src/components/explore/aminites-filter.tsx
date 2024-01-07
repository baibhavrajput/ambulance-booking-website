'use client';

import { useEffect, useState } from 'react';
import { useQueryParam } from '@/hooks/use-query-param';
import { useSearchParams } from 'next/navigation';
import CheckboxGroupDual from '../ui/checkbox-group-dual';

type AmenitiesFilterProps = {
  onAmenitiesFilterChange: (key: number) => void;
  selectedAmenities: any;
  setSelectedAmenities: any;
  setFormSubmissionStatus: any;
};

export default function AmenitiesFilter(props: AmenitiesFilterProps) {
  const searchParams = useSearchParams();
  const manf = searchParams?.get('category');

  const handleInputChange = (item: any) => {
    const updatedItems = [...props.selectedAmenities];
    const foundItem = updatedItems.find((elem) => elem.id === item.id);
    if (foundItem) {
      foundItem.checked = !foundItem.checked;
    }
    props.setSelectedAmenities(updatedItems);
    props.onAmenitiesFilterChange(foundItem?.amount ?? 0);
    props.setFormSubmissionStatus(false);
  };

  // if initial query
  // useEffect(() => {
  //   let m = manf?.split(',');
  //   const updatedItems = [...props.selectedAmenities];
  //   updatedItems.map((elem) => {
  //     if (m?.includes(elem.label)) elem.checked = true;
  //   });
  //   props.setSelectedAmenities(updatedItems);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // updates query
  // useEffect(() => {
  //   const checkedItems = [];
  //   for (const item of selected) {
  //     if (item.checked) checkedItems.push(item.label);
  //   }
  //   updateQueryparams('category', checkedItems.toString());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selected]);

  // reset
  // useEffect(() => {
  //   if (!manf) {
  //     const updatedItems = [...props.selectedAmenities];
  //     updatedItems.map((elem) => (elem.checked = false));
  //     props.setSelectedAmenities(updatedItems);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [manf]);

  return (
    <CheckboxGroupDual
      label="Additional amenities"
      labelClassName="!text-sm lg:!text-base mb-4 lg:mb-2"
      data={props.selectedAmenities}
      onChange={(item) => handleInputChange(item) }
    />
  );
}
