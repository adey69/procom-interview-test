import Axios from "axios";
import { configure } from "axios-hooks";

const axios = Axios.create({
  baseURL: `https://procom-interview-employee-test.azurewebsites.net`
});

configure({ axios });
