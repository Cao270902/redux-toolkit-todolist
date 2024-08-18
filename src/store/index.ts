import { configureStore } from "@reduxjs/toolkit";

import reducerTasks from "./slides/tasks";

export const store = configureStore({
  reducer: {
    tasks: reducerTasks,
  },
});

// Khai báo kiểu của RootState và AppDispatch để sử dụng với TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
