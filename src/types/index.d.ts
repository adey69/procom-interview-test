type FieldValues = import("react-hook-form").FieldValues;
interface IAddress {
  streetName: string;
  postalCode: string;
  apartmentNumber: number;
  state: string;
  country: string;
}

interface IEmployee extends FieldValues {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  addresses: IAddress[];
}
