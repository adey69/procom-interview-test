import {
  Button,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "../../components";
import { useAddEmployee } from "./useAddEmployee";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link, useParams } from "react-router-dom";
import useAxios from "axios-hooks";

const AddEditEmployee = () => {
  let defaultValues: IEmployee = {
    addresses: [],
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  };
  const params = useParams();
  const isEditForm = params?.employeeId || "";
  const { onSubmit } = useAddEmployee(isEditForm!);

  const [indexes, setIndexes] = React.useState<Array<number>>(
    defaultValues.addresses.map((v, i) => i)
  );

  const [openIndexes, setOpenIndexes] = React.useState<Array<boolean>>(
    defaultValues.addresses.map((v, i) => false)
  );

  const { handleSubmit, control, reset } = useForm<IEmployee>({
    defaultValues,
  });

  // refetch
  const [{ data: employeesData }, fetchEmployeeDetails] = useAxios(
    { url: `/employee/${params?.employeeId}` },
    {
      manual: true,
    }
  );

  useEffect(() => {
    if (isEditForm) {
      fetchEmployeeDetails();
    }
  }, [isEditForm]);

  useEffect(() => {
    reset({
      id: employeesData?.id,
      firstName: employeesData?.firstName,
      lastName: employeesData?.lastName,
      email: employeesData?.email,
      phoneNumber: employeesData?.phoneNumber,
      addresses: employeesData?.addresses,
    });
  }, [employeesData]);

  const addAddress = useCallback(() => {
    setIndexes((prevIndexes) => [...prevIndexes, prevIndexes.length]);
    setOpenIndexes([...openIndexes, true]);
  }, []);

  const removeAddress = useCallback(
    (index: number) => () => {
      setIndexes((prevIndexes) => [
        ...prevIndexes.filter((item) => item !== index),
      ]);
    },
    []
  );

  return (
    <Stack px={5} py={3}>
      <Typography variant="h4" sx={{ my: 2 }}>
        Add Employee
      </Typography>
      <Paper sx={{ px: 5, py: 3 }}>
        <Grid container sx={{ flexDirection: "column" }} rowGap={2}>
          <FormInput
            name="firstName"
            label="First Name"
            control={control}
            controllerProps={{ rules: { required: "First Name is required" } }}
          />
          <FormInput
            name="lastName"
            label="Last Name"
            control={control}
            controllerProps={{ rules: { required: "Last Name is required" } }}
          />
          <FormInput
            name="email"
            label="Email"
            control={control}
            controllerProps={{ rules: { required: "Email is required" } }}
          />
          <FormInput
            name="phoneNumber"
            label="Phone Number"
            control={control}
            controllerProps={{
              rules: { required: "Phone Number is required" },
            }}
          />
          <Grid container sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">Addresses</Typography>
            <Button variant="contained" onClick={addAddress}>
              Add another address
            </Button>
          </Grid>
          {indexes.map((index) => {
            const fieldName = `addresses.${index}`;
            return (
              <React.Fragment key={fieldName}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6">{`Address No: ${index}`}</Typography>
                  <div>
                    <Button
                      onClick={removeAddress(index)}
                      sx={{ alignSelf: "center" }}
                    >
                      Remove
                    </Button>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => {
                        const newOpenIndexesList = [...openIndexes];
                        newOpenIndexesList[index] = !openIndexes[index];
                        setOpenIndexes(newOpenIndexesList);
                      }}
                    >
                      {openIndexes[index] ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                      <></>
                    </IconButton>
                  </div>
                </Stack>
                <Collapse in={openIndexes[index]} timeout="auto" unmountOnExit>
                  <Stack direction={"column"} spacing={2}>
                    <FormInput
                      name={`addresses.${index}.apartmentNumber`}
                      control={control}
                      label="Apartment Number"
                      type="number"
                      controllerProps={{
                        rules: { required: "Appartment Number is required" },
                      }}
                    />
                    <FormInput
                      name={`addresses.${index}.streetName`}
                      control={control}
                      label="Street Name"
                      controllerProps={{
                        rules: { required: "Street Name is required" },
                      }}
                    />
                    <FormInput
                      name={`addresses.${index}.postalCode`}
                      control={control}
                      label="Postal Code"
                      controllerProps={{
                        rules: { required: "Postal Code is required" },
                      }}
                    />
                    <FormInput
                      name={`addresses.${index}.state`}
                      control={control}
                      label="State"
                      controllerProps={{
                        rules: { required: "State is required" },
                      }}
                    />
                    <FormInput
                      name={`addresses.${index}.country`}
                      control={control}
                      label="Country"
                      controllerProps={{
                        rules: { required: "Country is required" },
                      }}
                    />
                  </Stack>
                </Collapse>
              </React.Fragment>
            );
          })}

          <Button
            variant="contained"
            sx={{ alignSelf: "flex-end" }}
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
          <Button
            component={Link}
            to={"/"}
            color="info"
            variant="contained"
            sx={{ alignSelf: "flex-end" }}
          >
            Back
          </Button>
        </Grid>
      </Paper>
    </Stack>
  );
};

export default React.memo(AddEditEmployee);
