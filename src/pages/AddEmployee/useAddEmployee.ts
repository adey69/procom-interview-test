import useAxios from "axios-hooks";
import { useCallback, useState } from "react";

export const useAddEmployee = () => {
  const [addressFormOpen, setAddressFormOpen] = useState(true);
  const onRemoveAddressClicked = useCallback(() => {
    setAddressFormOpen(false);
  }, []);

  const onAddAnotherAddressClicked = useCallback(() => {
    setAddressFormOpen(true);
  }, []);

  const onAddAddressClicked = useCallback(
    (
      streetName: string,
      postalCode: string,
      apartmentNumber: string,
      state: string,
      country: string
    ) => {
      const address: IAddress = {
        streetName,
        postalCode,
        apartmentNumber,
        state,
        country,
      };
    },
    []
  );

  const onSubmit = (data: IEmployee) => {
    console.log({ data });
  };
  const [{ data: res, error, loading }, addEmployee] = useAxios(
    { url: "/Employee", method: "POST" },
    {
      manual: true,
    }
  );

  return {
    addressFormOpen,
    res,
    error,
    loading,
    onSubmit,
    addEmployee,
    onRemoveAddressClicked,
    onAddAnotherAddressClicked,
    onAddAddressClicked,
  };
};
