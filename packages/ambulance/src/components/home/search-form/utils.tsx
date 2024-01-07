import { AmbulanceIcon } from '@/components/icons/ambulance-icon';
import { PaymentModeIcon } from '@/components/icons/payment-mode-icon';

export const ambulanceTypes = [
  {
    label: 'Choose ambulance type',
    icon: <AmbulanceIcon className="h-auto w-5" />,
    amount: 0,
    disabled: true,
  },
  {
    label: 'Eeco',
    icon: <AmbulanceIcon className="h-auto w-5" />,
    amount: 999,
  },
  {
    label: 'Winger',
    icon: <AmbulanceIcon className="h-auto w-5" />,
    amount: 1999,
  },
  {
    label: 'Force',
    icon: <AmbulanceIcon className="h-auto w-5" />,
    amount: 2999,
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

export const paymentModes = [
  {
    label: 'Choose payment mode',
    icon: <PaymentModeIcon className="h-auto w-5" />,
    disabled: true,
  },
  {
    label: 'Cash',
    icon: <PaymentModeIcon className="h-auto w-5" />,
  },
  {
    label: 'Mediclaim',
    icon: <PaymentModeIcon className="h-auto w-5" />,
  },
  {
    label: 'Referred',
    icon: <PaymentModeIcon className="h-auto w-5" />,
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

export const amenities = [
  { id: 'cat-1', label: 'AC', checked: false, amount: 99 },
  { id: 'cat-2', label: 'Oxygen', checked: false, amount: 199 },
  { id: 'cat-3', label: 'Technician', checked: false, amount: 299 },
  { id: 'cat-4', label: 'Ventilator', checked: false, amount: 399 },
  // { id: 'cat-5', label: 'Jet ski', checked: false },
  // { id: 'cat-6', label: 'Houseboat', checked: false },
];