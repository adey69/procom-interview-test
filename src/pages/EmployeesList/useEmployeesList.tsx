import useAxios from "axios-hooks";
import { useCallback, useMemo, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Button, Grid } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

export const useEmployeesList = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [recordId, setRecordId] = useState();
  const [{ data, loading, error }, reFetch] =
    useAxios<IEmployee[]>("/employee");

  const [, deleteEmployee] = useAxios({ method: "DELETE" }, { manual: true });

  const onDelete = useCallback(
    async (employeeId: number) => {
      await deleteEmployee({ url: `/employee/${employeeId}` });
      reFetch();
    },
    [reFetch],
  );

  const handleClickOpen = useCallback((params: any) => {
    setRecordId(params?.id);
    setOpenDialog(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleDelete = useCallback(() => {
    onDelete(recordId!);
    setOpenDialog(false);
  }, [recordId]);

  const COLUMNS: GridColDef[] = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        width: 90,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "firstName",
        headerName: "Name",
        width: 300,
        align: "center",
        headerAlign: "center",
        renderCell: params => {
          return (
            <Button component={Link} to={`/employee/${params?.row.id}`}>
              {params.row.firstName} {params?.row.lastName}
            </Button>
          );
        },
      },
      {
        field: "email",
        headerName: "Email",
        minWidth: 250,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "phoneNumber",
        headerName: "Phone Number",
        width: 150,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "actions",
        headerName: "Actions",
        minWidth: 250,
        align: "center",
        headerAlign: "center",
        renderCell: params => {
          console.log({ params });
          return (
            <Grid container sx={{ justifyContent: "space-around" }}>
              <Button
                variant="contained"
                component={Link}
                to={`/editEmployee/${params?.row.id}`}
              >
                Edit
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => handleClickOpen(params)}
              >
                Delete
              </Button>
            </Grid>
          );
        },
      },
    ],
    [data],
  );

  return {
    data,
    loading,
    error,
    COLUMNS,
    openDialog,
    handleClose,
    handleDelete,
  };
};
