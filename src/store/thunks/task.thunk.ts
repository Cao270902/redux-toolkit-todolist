import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos",
  );
  return response.data;
});
