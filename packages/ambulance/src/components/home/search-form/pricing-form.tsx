'use client';

import { useState } from 'react';
import { format, addDays } from 'date-fns';
import { useRouter } from 'next/navigation';
import { makeQueryString } from '@/utils/makeQueryString';
import DatePickerInput from '@/components/home/search-form/daterange-picker';
import LocationInput from '@/components/home/search-form/location-input';
import SearchAutocomplete from '@/components/ui/search-autocomplete';
import { MapMarkerIcon } from '@/components/icons/map-marker';
import { CalenderIcon } from '@/components/icons/calender';
import Text from '@/components/ui/typography/text';
import Button from '@/components/ui/button';
import { Routes } from '@/config/routes';
import { DualSwitchButton } from '@/components/ui/dual-switch-button';
import AmbulanceTypeFilter from '@/components/explore/boat-type-filter';
import PaymentModeTypeFilter from '@/components/explore/payment-mode-filter';
import AmenitiesFilter from '@/components/explore/aminites-filter';
import Input from '@/components/ui/form-fields/input';

type QueryStringType = {
  location?: string;
  departureDate: string;
  returnDate: string;
};

export default function PricingForm() {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchBox, setSearchBox] = useState<any>();
  const [mobileNumberInput, setMobileNumberInput] = useState('');
  const [ambulanceCharge, setAmbulanceCharge] = useState(0);
  const [amenitiesCharge, setAmenitiesCharge] = useState(0);
  const [locationInput, setLocationInput] = useState({
    searchedLocation: '',
    searchedPlaceAPIData: [],
  });

  const onLoad = (ref: any) => setSearchBox(ref);
  const onPlacesChanged = () => {
    const places = searchBox?.getPlaces();
    setLocationInput({
      searchedLocation: places && places[0] && places[0].formatted_address,
      searchedPlaceAPIData: places ? places : [],
    });
  };

  // removes value when reset
  //   useEffect(() => {
  //     if (!location) {
  //       setLocationInput({
  //         ...locationInput,
  //         searchedLocation: '',
  //       });
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [location]);

  function handleClearClick() {
    setLocationInput({
      ...locationInput,
      searchedLocation: '',
    });
  }

  const onAmbulanceFilterChange = (data: number) => {
    setAmbulanceCharge(data);
  };

  const onAmenitiesFilterChange = (data: number) => {
    setAmenitiesCharge(data);
  };

  return (
    <>
      {/* <SearchAutocomplete
        onLoad={onLoad}
        onPlacesChanged={onPlacesChanged}
        loader={
          <LocationInput
            label="Loading . . ."
            icon={<MapMarkerIcon className="h-6 w-6 text-gray" />}
            className="mb-3"
            disabled
          />
        }
      >
        <LocationInput
          label="Destination"
          icon={<MapMarkerIcon className="h-6 w-6 text-gray" />}
          className="mb-3"
          value={locationInput.searchedLocation || ''}
          onChange={(event) =>
            setLocationInput({
              ...locationInput,
              searchedLocation: event.target.value,
            })
          }
        />
      </SearchAutocomplete>
      <LocationInput
        label="Mobile number"
        icon={<MapMarkerIcon className="h-6 w-6 text-gray" />}
        className="mb-3"
        value={locationInput.searchedLocation || ''}
        onChange={(event) =>
          setLocationInput({
            ...locationInput,
            searchedLocation: event.target.value,
          })
        }
      /> */}
      <div className="mb-4">
        <Input
          type="text"
          inputClassName="mb-2 !text-sm !pl-12"
          labelClassName="mb-2 lg:!text-base !mb-2 text-gray-dark"
          startIcon={<MapMarkerIcon className="h-5 w-5" />}
          startIconClassName="!left-1"
          placeholder="Select destination"
          required
          clearable={locationInput.searchedLocation ? true : false}
          endIcon={true}
          onClearClick={handleClearClick}
          value={locationInput.searchedLocation || ''}
          onChange={(event: any) => {
            setLocationInput({
              ...locationInput,
              searchedLocation: event.target.value,
            });
          }}
        />
      </div>
      {/* </SearchAutocomplete> */}
      <div className="mb-4">
        <Input
          type="text"
          inputClassName="mb-2 !text-sm !pl-12"
          labelClassName="lg:!text-base !mb-2 text-gray-dark"
          startIcon={<MapMarkerIcon className="h-5 w-5" />}
          startIconClassName="!left-1"
          placeholder="Mobile number"
          required
          clearable={mobileNumberInput ? true : false}
          endIcon={true}
          onClearClick={() => setMobileNumberInput('')}
          value={mobileNumberInput || ''}
          onChange={(event: any) => {
            setMobileNumberInput(event.target.value);
          }}
        />
      </div>
      <AmbulanceTypeFilter onAmbulanceFilterChange={onAmbulanceFilterChange} />
      <PaymentModeTypeFilter />
      <AmenitiesFilter onAmenitiesFilterChange={onAmenitiesFilterChange} />
      <ul className="mt-4 mb-4 xl:mt-5">
        <li className="flex items-center justify-between py-1.5 text-base capitalize text-gray-dark first:pt-0 last:border-t last:border-gray-lighter last:pb-0">
          <span className="font-normal">{'Total'}</span>
          <span className="font-bold">
            Rs. {ambulanceCharge + amenitiesCharge}
          </span>
        </li>
      </ul>
    </>
  );
}
