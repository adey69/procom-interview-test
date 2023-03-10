import useAxios from "axios-hooks";
import { useCallback, useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Typography, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

export const useEmployeesList = () => {
  const [{ data, loading, error }] = useAxios<IEmployee[]>("/employee");
  const navigate = useNavigate();
  const onRowClicked = useCallback(
    (params: any) => {
      navigate(`/employee/${params?.id}`);
    },
    [navigate]
  );

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
        valueGetter: (params) => {
          console.log(params.row);
          return (
            <Button component={Link} to={`/employee/${params?.row.id}`}>
              {params?.row.firstName}
              {params?.row.lastName}
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
    ],
    [data]
  );

  return {
    data,
    loading,
    error,
    onRowClicked,
    COLUMNS,
  };
};
