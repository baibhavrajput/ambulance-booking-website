'use client';

import { useEffect, useState } from 'react';
import { useQueryParam } from '@/hooks/use-query-param';
import CheckboxGroup from '@/components/ui/checkbox-group';
import { useSearchParams } from 'next/navigation';

const categories = [
  { id: 'cat-1', label: 'AC - Rs. 99', checked: false, amount: 99 },
  { id: 'cat-2', label: 'Oxygen - Rs. 199', checked: false, amount: 199 },
  { id: 'cat-3', label: 'Technician - Rs. 299', checked: false, amount: 299 },
  { id: 'cat-4', label: 'Ventilator - Rs. 399', checked: false, amount: 399 },
  // { id: 'cat-5', label: 'Jet ski', checked: false },
  // { id: 'cat-6', label: 'Houseboat', checked: false },
];

interface ItemProps {
  id: string;
  label: string;
  checked: boolean;
  amount: number;
}

export default function AmenitiesFilter({
  onAmenitiesFilterChange,
}: {
  onAmenitiesFilterChange: (key: number) => void;
}) {
  const searchParams = useSearchParams();
  const manf = searchParams?.get('category');
  const [selected, setSelected] = useState<ItemProps[]>(categories);
  const { updateQueryparams } = useQueryParam();

  const handleInputChange = (item: any) => {
    const updatedItems = [...selected];
    const foundItem = updatedItems.find((elem) => elem.id === item.id);
    if (foundItem) {
      foundItem.checked = !foundItem.checked;
    }
    setSelected(updatedItems);
    onAmenitiesFilterChange(foundItem?.amount ?? 0);
  };

  // if initial query
  useEffect(() => {
    let m = manf?.split(',');
    const updatedItems = [...selected];
    updatedItems.map((elem) => {
      if (m?.includes(elem.label)) elem.checked = true;
    });
    setSelected(updatedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  useEffect(() => {
    if (!manf) {
      const updatedItems = [...selected];
      updatedItems.map((elem) => (elem.checked = false));
      setSelected(updatedItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manf]);

  return (
    <CheckboxGroup
      label="Additional amenities"
      labelClassName="!text-sm lg:!text-base mb-4 lg:mb-2"
      data={selected}
      onChange={(item) => handleInputChange(item)}
    />
  );
}