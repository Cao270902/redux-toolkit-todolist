const BASE_URL = "";

export interface Task {
  id?: string; // id có thể là string hoặc undefined
  title: string;
  isChecked?: boolean;
}

export interface TasksResponse {
  tasks: Task[] | "Not found";
}

export const getTasks = async (query: string): Promise<TasksResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/tasks?${query}`, {
      method: "GET",
    });
    const data = await res.json();
    return { tasks: data }; // Phản hồi có thể là { tasks: Task[] } hoặc { tasks: "Not found" }
  } catch (error) {
    throw error;
  }
};

export const createTasks = async (task: Task): Promise<Task> => {
  try {
    const res = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateTasks = async (task: Task): Promise<Task> => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/${task.id}`, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteTasks = async (taskId: string): Promise<boolean> => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (taskId: string): Promise<boolean> => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (error) {
    throw error;
  }
};
