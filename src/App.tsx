import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddEditEmployee, EmployeeDetails, EmployeesList } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <EmployeesList />,
  },
  {
    path: "/add",
    element: <AddEditEmployee />,
  },
  {
    path: "/editEmployee/:employeeId",
    element: <AddEditEmployee />,
  },
  {
    path: "/employee/:employeeId",
    element: <EmployeeDetails />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
