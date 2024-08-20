import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks } from "../../thunks/task.thunk";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type TasksState = {
  data: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: TasksState = {
  data: [],
  status: "idle",
  error: null,
};

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      // console.log(state);
      // console.log(action);
      const newTask: Task = {
        id: Date.now(),
        title: action.payload,
        completed: false,
      };
      state.data.push(newTask);
    },
    toggleTask: (state, action) => {
      // console.log(action);
      const task = state.data.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    removeTask: (state, action) => {
      state.data = state.data.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const task = state.data.find((task) => task.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch tasks";
      });
  },
});

const { reducer, actions } = slice;
const { addTask, toggleTask, removeTask, updateTask } = actions;

// console.log({ addTask });
export { addTask, toggleTask, removeTask, updateTask };
export default reducer;
