import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEmployeesList } from "./useEmployeesList";

const EmployeesList = () => {
  const { onRowClicked, data, loading, error, COLUMNS } = useEmployeesList();

  return (
    <>
      <Stack sx={{ px: 10, py: 5 }}>
        <Grid
          container
          sx={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Typography variant="h4">Employees</Typography>
          <Button title="Add Employee" component={Link} to={"/add"}>
            Add Employee
          </Button>
        </Grid>
      </Stack>
      <DataGrid
        autoHeight
        slots={{ loadingOverlay: LinearProgress }}
        loading={loading}
        rows={data || []}
        columns={COLUMNS}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </>
  );
};
export default React.memo(EmployeesList);
