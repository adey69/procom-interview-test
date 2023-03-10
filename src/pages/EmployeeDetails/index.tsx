import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import useAxios from "axios-hooks";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "../../components";

const EmployeeDetails = () => {
  const params = useParams();

  const [{ data, loading }] = useAxios<IEmployee>(
    `/employee/${params?.employeeId}`,
  );
  console.log({ data });
  if (loading) {
    return <Spinner loading={loading} />;
  }
  return (
    <Stack sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Employee Details
      </Typography>
      <Paper
        sx={{ my: 3, mx: 5, px: 5, py: 3, width: "40%", alignSelf: "center" }}
        elevation={5}
      >
        <Grid container rowGap={2}>
          <Grid container sx={{ justifyContent: "space-between" }}>
            <Grid item>First Name</Grid>
            <Grid item>{data?.firstName}</Grid>
          </Grid>
          <Grid container sx={{ justifyContent: "space-between" }}>
            <Grid item>Last Name</Grid>
            <Grid item> {data?.lastName}</Grid>
          </Grid>
          <Grid container sx={{ justifyContent: "space-between" }}>
            <Grid item>Email</Grid>
            <Grid item> {data?.email}</Grid>
          </Grid>
          <Grid container sx={{ justifyContent: "space-between" }}>
            <Grid item>Phone Number</Grid>
            <Grid item> {data?.phoneNumber}</Grid>
          </Grid>
          {(data?.addresses || [])?.map((address, index) => (
            <Grid
              container
              sx={{ justifyContent: "space-between" }}
              key={index}
            >
              <Grid item>Address: {index + 1}</Grid>
              <Grid item>
                {address?.apartmentNumber}, {address?.streetName},{" "}
                {address?.state},{address?.postalCode}, {address?.country}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Button
        component={Link}
        to={"/"}
        color="info"
        sx={{ alignSelf: "center" }}
      >
        Back
      </Button>
    </Stack>
  );
};

export default React.memo(EmployeeDetails);
