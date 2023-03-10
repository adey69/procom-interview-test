interface IAddress {
  streetName: string;
  postalCode: string;
  apartmentNumber: string;
  state: string;
  country: string;
}

interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  addresses: IAddress[];
}
