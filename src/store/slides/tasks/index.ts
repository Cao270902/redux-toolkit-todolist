import { createSlice } from "@reduxjs/toolkit";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type TasksState = {
  tasks: Task[];
};

const initialState: TasksState = {
  tasks: [],
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
      state.tasks.push(newTask);
    },
    toggleTask: (state, action) => {
      // console.log(action);
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
      }
    },
  },
});

const { reducer, actions } = slice;
const { addTask, toggleTask, removeTask, updateTask } = actions;

// console.log({ addTask });
export { addTask, toggleTask, removeTask, updateTask };
export default reducer;
