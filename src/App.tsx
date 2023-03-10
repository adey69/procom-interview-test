import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddEmployee, EmployeeDetails, EmployeesList } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <EmployeesList />,
  },
  {
    path: "/add",
    element: <AddEmployee />,
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
