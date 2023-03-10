import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "../../components";
import { useAddEmployee } from "./useAddEmployee";

const AddEditEmployee = () => {
  const {
    addressFormOpen,
    onRemoveAddressClicked,
    onAddAnotherAddressClicked,
    onAddAddressClicked,
    onSubmit,
  } = useAddEmployee();

  const { handleSubmit, reset, control, setValue, register } = useForm({});

  return (
    <Stack px={5} py={3}>
      <Typography variant="h4" sx={{ my: 2 }}>
        Add Employee
      </Typography>
      <Paper sx={{ px: 5, py: 3 }}>
        <Grid container sx={{ flexDirection: "column" }} rowGap={2}>
          <FormInput name="firstName" label="First Name" control={control} />
          <FormInput name="lastName" label="Last Name" control={control} />
          <FormInput name="email" label="Email" control={control} />
          <FormInput
            name="phoneNumber"
            label="Phone Number"
            control={control}
          />
          <Grid container sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">Addresses</Typography>
            <Button variant="contained" onClick={onAddAnotherAddressClicked}>
              Add another address
            </Button>
          </Grid>
          {/* {addressesToAdd?.map((address) => (
            <Card sx={{ p: 2 }}>
              <Typography>Address</Typography>
            </Card>
          ))} */}
          {addressFormOpen && (
            <Paper sx={{ p: 2 }}>
              <Stack rowGap={2}>
                <FormInput
                  name="streetName"
                  label="Street Name"
                  control={control}
                />
                <FormInput
                  name="postalCode"
                  label="Postal Code"
                  control={control}
                />
                <FormInput
                  name="apartmentNo"
                  label="Apartment No"
                  control={control}
                />
                <FormInput name="state" label="State" control={control} />
                <FormInput name="country" label="Country" control={control} />
                <Grid container sx={{ justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mr: 2 }}
                    onClick={onRemoveAddressClicked}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => onAddAddressClicked}
                  >
                    Add
                  </Button>
                </Grid>
              </Stack>
            </Paper>
          )}

          <Button
            variant="contained"
            sx={{ alignSelf: "flex-end" }}
            // onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </Grid>
      </Paper>
    </Stack>
  );
};

export default React.memo(AddEditEmployee);
