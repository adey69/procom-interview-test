import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useEmployeesList } from "./useEmployeesList";

const EmployeesList = () => {
  const { data, loading, COLUMNS, openDialog, handleClose, handleDelete } =
    useEmployeesList();

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
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this record?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default React.memo(EmployeesList);
