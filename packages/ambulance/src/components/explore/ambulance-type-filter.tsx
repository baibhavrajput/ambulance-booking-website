'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQueryParam } from '@/hooks/use-query-param';
import SelectBox from '@/components/ui/select-box';

type AmbulanceTypeFilterProps = {
  onAmbulanceFilterChange: (key: number) => void;
  selectedAmbulanceType: any;
  setSelectedAmbulanceType: any;
  ambulanceTypes: any;
  setFormSubmissionStatus: any;
};
const AmbulanceTypeFilter = (props: AmbulanceTypeFilterProps) => {
  const searchParams = useSearchParams();
  const boatType = searchParams?.get('boatType');
  const { clearFilter, updateQueryparams } = useQueryParam();
  const [selected, setSelected] = useState(props.ambulanceTypes[0]);

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
      const b: any = [props.ambulanceTypes].find(
        (item) => item.label === boatType
      );
      props.setSelectedAmbulanceType(b);
    } else {
      props.setSelectedAmbulanceType(props.ambulanceTypes[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boatType]);

  return (
    <SelectBox
      value={props.selectedAmbulanceType}
      label="Select Ambulance Type"
      options={props.ambulanceTypes}
      optionIcon={true}
      onChange={(data: any) => {
        props.setSelectedAmbulanceType(data),
          props.onAmbulanceFilterChange(data.amount);
      }}
      labelClassName="!text-sm lg:!text-base"
      buttonClassName="mb-4 h-10 lg:h-11 2xl:h-12"
      arrowIconClassName="right-3"
      clearable={props.selectedAmbulanceType.disabled ? false : true}
      onClearClick={(e) => {
        e.stopPropagation();
        props.setSelectedAmbulanceType(props.selectedAmbulanceType[0]);
        props.setFormSubmissionStatus(false);
      }}
    />
  );
};

export default AmbulanceTypeFilter;
