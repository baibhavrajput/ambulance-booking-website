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
import { ambulanceTypes, amenities, paymentModes } from './utils';

type QueryStringType = {
  location?: string;
  departureDate: string;
  returnDate: string;
};

export interface ItemProps {
  id: string;
  label: string;
  checked: boolean;
  amount: number;
}

export default function FindTripForm() {
  const router = useRouter();
  const [searchBox, setSearchBox] = useState<any>();
  const [locationInput, setLocationInput] = useState({
    searchedLocation: '',
    searchedPlaceAPIData: [],
  });
  const [mobileNumberInput, setMobileNumberInput] = useState('');
  const [selectedAmbulanceType, setSelectedAmbulanceType] = useState(
    ambulanceTypes[0]
  );
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(
    paymentModes[0]
  );
  const [selectedAmenities, setSelectedAmenities] =
    useState<ItemProps[]>(amenities);
  const [formSubmissionStatus, setFormSubmissionStatus] = useState(false);

  const [formType, setFormType] = useState('booking');

  const onLoad = (ref: any) => setSearchBox(ref);
  const onPlacesChanged = () => {
    const places = searchBox?.getPlaces();
    setLocationInput({
      searchedLocation: places && places[0] && places[0].formatted_address,
      searchedPlaceAPIData: places ? places : [],
    });
  };

  const apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY;

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day}`;
    return formattedDateTime;
  };

  const getCurrentTime = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes =
      currentDate.getMinutes() === 59
        ? '00'
        : (currentDate.getMinutes() + 1).toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    const formattedDateTime = `${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
  };

  const getFormData = () => {
    const currentDate = getCurrentDate();
    const currentTime = getCurrentTime();
    let amenitiesRequired: string = '';
    selectedAmenities.forEach((amenity: ItemProps) => {
      if (amenity.checked)
        amenitiesRequired = `${amenitiesRequired} ${amenity.label}`;
    });
    const data = {
      name: 'We Care Ambulance',
      subject: 'We Care Ambulance new form submission. ',
      sender: {
        name: 'We Care Ambulance',
        email: 'baibhavrajputt11@gmail.com',
      },
      type: 'classic',
      htmlContent: `<html>
      <head></head>
      <body>
      <p>New query submitted on ${currentDate} at ${currentTime}+05:30.</p>
      <p><br><b>Destination</b> : ${locationInput.searchedLocation}</br>
      <br><b>Mobile</b> : ${mobileNumberInput}</br>
      <br><b>Ambulance Type</b> : ${selectedAmbulanceType.label}</br>
      <br><b>Payment Mode</b> : ${selectedPaymentMode.label}</br>
      <br><b>Additional Amenities</b> : ${amenitiesRequired}</p>
      </body>
      </html>`,
      recipients: {
        listIds: [2],
      },
      scheduledAt: `${currentDate} ${currentTime}+05:30`,
    };
    return data;
  };

  const postFormData = async (formData: any) => {
    try {
      if (
        selectedAmbulanceType.label !== ambulanceTypes[0].label &&
        selectedPaymentMode.label !== paymentModes[0].label
      ) {
        await axios.post('https://api.brevo.com/v3/emailCampaigns', formData, {
          headers: {
            'api-key': apiKey,
          },
        });
        setLocationInput({
          searchedLocation: '',
          searchedPlaceAPIData: [],
        });
        setMobileNumberInput('');
        setSelectedAmbulanceType(ambulanceTypes[0]);
        setSelectedPaymentMode(paymentModes[0]);
        setSelectedAmenities(amenities);
        setFormSubmissionStatus(true);
      }
    } catch (error) {
      alert('Submission Failed.');
    }
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const formData = getFormData();
    postFormData(formData);
  };

  return (
    <>
      <form
        noValidate
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
            Call 7488155036
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
        <PricingForm
          locationInput={locationInput}
          setLocationInput={setLocationInput}
          mobileNumberInput={mobileNumberInput}
          setMobileNumberInput={setMobileNumberInput}
          selectedAmbulanceType={selectedAmbulanceType}
          setSelectedAmbulanceType={setSelectedAmbulanceType}
          ambulanceTypes={ambulanceTypes}
          selectedPaymentMode={selectedPaymentMode}
          setSelectedPaymentMode={setSelectedPaymentMode}
          paymentModes={paymentModes}
          selectedAmenities={selectedAmenities}
          setSelectedAmenities={setSelectedAmenities}
          amenities={amenities}
          setFormSubmissionStatus={setFormSubmissionStatus}
        ></PricingForm>
        {formSubmissionStatus && (
          <>
            <span className="font-primary mb-1 text-xl leading-7 text-red sm:block 4xl:text-[28px] 4xl:leading-[44px]">
              Form submitted successfully.
            </span>
          </>
        )}
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
          disabled={
            formSubmissionStatus ||
            !(
              locationInput &&
              mobileNumberInput &&
              /^[6-9]\d{9}$/.test(mobileNumberInput)
            )
          }
        >
          Submit
        </Button>
      </form>
    </>
  );
}
