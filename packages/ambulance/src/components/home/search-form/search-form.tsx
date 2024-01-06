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
import BookingForm from './booking-form';
import PricingForm from './pricing-form';
import axios from 'axios';

type QueryStringType = {
  location?: string;
  departureDate: string;
  returnDate: string;
};

export default function FindTripForm() {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchBox, setSearchBox] = useState<any>();
  const [locationInput, setLocationInput] = useState({
    searchedLocation: '',
    searchedPlaceAPIData: [],
  });
  const [formType, setFormType] = useState('booking');

  const onLoad = (ref: any) => setSearchBox(ref);
  const onPlacesChanged = () => {
    const places = searchBox?.getPlaces();
    setLocationInput({
      searchedLocation: places && places[0] && places[0].formatted_address,
      searchedPlaceAPIData: places ? places : [],
    });
  };

  const apiKey = process.env.API_KEY;
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes =
    currentDate.getMinutes() === 59
      ? '00'
      : (currentDate.getMinutes() + 1).toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}+05:30`;

  const data = {
    name: 'Test Email from We Care Ambulance',
    subject: 'Test Email from We Care',
    sender: {
      name: 'Baibhav',
      email: 'baibhavrajputt11@gmail.com',
    },
    type: 'classic',
    htmlContent: 'Email check',
    recipients: {
      listIds: [2],
    },
    scheduledAt: formattedDateTime,
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    let queryString = '';
    const queryObj: QueryStringType = {
      location: locationInput.searchedLocation,
      departureDate: format(startDate, 'yyyy-MM-dd'),
      returnDate: format(endDate, 'yyyy-MM-dd'),
    };
    queryString = makeQueryString(queryObj);
    axios.post('https://api.brevo.com/v3/emailCampaigns', data, {
      headers: {
        'api-key': apiKey,
      },
    });
    console.log(formattedDateTime);
    // router.push(`${Routes.public.explore}?${queryString}`);
  };

  return (
    <form
      noValidate
      action="https://formsubmit.co/el/locone"
      method="POST"
      onSubmit={handleFormSubmit}
      className="relative z-[2] w-full max-w-[450px] rounded-lg bg-white p-6 shadow-2xl sm:m-0 sm:max-w-[380px] sm:p-5 sm:pt-5 md:max-w-[400px] md:shadow-none lg:rounded-xl xl:max-w-[460px] xl:p-9 4xl:max-w-[516px] 4xl:p-12"
    >
      <div className="mb-3 sm:mb-0">
        <span className="font-primary mb-1 text-xl leading-7 text-red sm:block 4xl:text-[28px] 4xl:leading-[44px]">
          For emergency booking:
        </span>
        <Text
          tag="h1"
          className="leading-12 mb-4 !text-xl !font-black uppercase text-red sm:!text-[28px] sm:!leading-9  4xl:!text-4xl 4xl:!leading-[52px]"
        >
          Call 8102030413
        </Text>
        <Text className="mb-2 hidden leading-6 !text-secondary sm:block 3xl:leading-8 4xl:mb-6 4xl:text-lg">
          For future bookings and queries, fill the below form:
        </Text>
      </div>
      {/* <DualSwitchButton
        state={formType}
        onClick={(value) => setFormType(value)}
      /> */}
      {/* {formType === 'booking' && <BookingForm />}
      {formType === 'pricing' && <PricingForm />} */}
      <PricingForm />
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
          label="Location"
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
      />
      <DatePickerInput
        label="Departure"
        selected={startDate}
        dateFormat="eee dd / LL / yy"
        icon={<CalenderIcon className="h-6 w-6 text-gray" />}
        onChange={(date: Date) => {
          setStartDate(date);
          setEndDate(addDays(date, 1));
        }}
        minDate={new Date()}
        containerClass="mb-3"
        popperClassName="homepage-datepicker"
      /> */}
      {/* <DatePickerInput
        label="Return"
        selected={endDate}
        dateFormat="eee dd / LL / yy"
        icon={<CalenderIcon className="h-6 w-6 text-gray" />}
        onChange={(date: Date) => setEndDate(date)}
        minDate={endDate}
        containerClass="mb-3"
        popperClassName="homepage-datepicker"
      /> */}
      <Button
        type="submit"
        className="w-full !py-[14px] text-sm !font-bold uppercase leading-6 md:!py-[17px] md:text-base lg:!rounded-xl 3xl:!py-[22px]"
        rounded="lg"
        size="xl"
      >
        Submit
      </Button>
    </form>
  );
}
