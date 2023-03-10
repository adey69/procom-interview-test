import useAxios from "axios-hooks";

export const useAddEmployee = (isEditForm: string) => {
  const [{ data: res, error, loading }, addEmployee] = useAxios(
    { url: "/Employee", method: "POST" },
    {
      manual: true,
    },
  );

  const [
    { data: editData, error: editErr, loading: editLoading },
    editEmployee,
  ] = useAxios(
    { url: `/Employee/${isEditForm}`, method: "PUT" },
    {
      manual: true,
    },
  );

  const onSubmit = (data: any) => {
    console.log(data);
    const requestData: IEmployee = {
      ...data,
      addresses: data.addresses.map((address: IAddress) => ({
        ...address,
        apartmentNumber: parseInt(address.apartmentNumber.toString()),
      })),
    };
    console.log({ isEditForm });
    isEditForm
      ? editEmployee({ data: requestData })
      : addEmployee({ data: requestData });
  };

  return {
    res,
    error,
    loading,
    onSubmit,
    addEmployee,
  };
};
