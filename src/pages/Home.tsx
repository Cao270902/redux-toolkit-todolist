import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { RootState } from "../store";
import {
  addTask,
  toggleTask,
  removeTask,
  updateTask,
} from "../store/slides/tasks";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchTasks } from "../store/thunks/task.thunk";

const Home: React.FC = () => {
  const [task, setTask] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const tasks = useAppSelector((state: RootState) => state.tasks.data);
  const status = useAppSelector((state: RootState) => state.tasks.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Failed to load tasks</div>;
  }

  const handleAddTask = () => {
    if (task) {
      dispatch(addTask(task));
      setTask("");
    }
  };
  const handleUpdateTask = (id: number) => {
    if (editingTitle) {
      dispatch(updateTask({ id, title: editingTitle }));
      setEditingTask(null);
      setEditingTitle("");
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      {/* Add task */}
      <div className="wrapper">
        <div className="form flex items-center justify-between">
          <div>
            <input
              type="text"
              id="task"
              placeholder="New Task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="ml-3 w-[490px] rounded border p-2 shadow-md"
            />
            <button
              onClick={handleAddTask}
              id="add-task"
              className="rounded border bg-green-600 p-2 text-white shadow-md hover:bg-green-700"
            >
              {/* {taskUpdateId ? "Update Task" : "Add Task"} */}
              Add Task
            </button>
          </div>
          <div>
            <button
              // onClick={handleDeleteTask}
              id="delete"
              className="mr-3 rounded border bg-black p-2 text-white shadow-md hover:bg-slate-800"
            >
              Clear Completed
            </button>
          </div>
        </div>
      </div>

      {/* Search*/}
      <div className="search-group m-3 flex gap-2">
        <input
          type="text"
          placeholder="Search..."
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded border p-2 shadow-md"
        />
        <select
          id="filter"
          //   value={filterValue}
          //   onChange={(e) => setFilterValue(e.target.value)}
          className="rounded border p-2 shadow-md hover:cursor-pointer"
        >
          <option value="0">All</option>
          <option value="1">Completed</option>
          <option value="-1">Not Done</option>
        </select>
      </div>

      {/* List task */}
      <div id="task-list" className="m-3">
        <div className="task mb-2 flex items-center rounded border-b border-l border-r bg-slate-200 p-2 font-serif shadow-md">
          <div className="flex items-center justify-center pl-4">
            <input
              type="checkbox"
              // onChange={(e) => handleToggleAllTasks(e.target.checked)}
              className="h-5 w-5 cursor-pointer"
            />
          </div>
          <div className="ml-[16px]">
            <p className="font-black">Task Name</p>
          </div>
          <div className="ml-auto mr-6">
            <p className="font-black">Action</p>
          </div>
        </div>

        {filteredTasks.map((task) => (
          <div
            key={task.id} // Đảm bảo mỗi phần tử có key duy nhất
            className="flex items-center justify-between rounded border pb-2 pl-6 pr-6 pt-2 shadow-md"
          >
            {editingTask === task.id ? (
              <div className="flex">
                <input
                  className="flex-grow rounded-lg border border-gray-300 p-2 focus:outline-none"
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <button
                  className="ml-2 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                  onClick={() => handleUpdateTask(task.id)}
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center gap-5">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => dispatch(toggleTask(task.id))}
                      className="h-4 w-4 cursor-pointer"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={task.title}
                      className={task.completed ? "line-through" : ""}
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <div>
                    <FaEdit
                      data-id={task.id}
                      className="text-2xl text-cyan-500 hover:cursor-pointer hover:text-cyan-600"
                      onClick={() => {
                        setEditingTask(task.id);
                        setEditingTitle(task.title);
                      }}
                    />
                  </div>
                  <div>
                    <MdDelete
                      id="delete-task"
                      data-id={task.id}
                      onClick={() => dispatch(removeTask(task.id))}
                      className="text-2xl text-red-500 hover:cursor-pointer hover:text-red-600"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* <ul className="space-y-2">
        {filteredTasks.map((task) => (
          <li key={task.id} className="rounded-lg border bg-gray-200 p-2">
            {editingTask === task.id ? (
              <div className="flex">
                <input
                  className="flex-grow rounded-lg border border-gray-300 p-2 focus:outline-none"
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <button
                  className="ml-2 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                  onClick={() => handleUpdateTask(task.id)}
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => dispatch(toggleTask(task.id))}
                />
                <span className={task.completed ? "ml-2 line-through" : "ml-2"}>
                  {task.title}
                </span>
                <button
                  //   className="ml-4 text-blue-500"
                  className="ml-4 text-blue-500 hover:cursor-pointer hover:text-cyan-600"
                  onClick={() => {
                    setEditingTask(task.id);
                    setEditingTitle(task.title);
                  }}
                >
                  Edit
                </button>
                <button
                  className="ml-4 text-red-500 hover:cursor-pointer hover:text-red-600"
                  onClick={() => dispatch(removeTask(task.id))}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul> */}
    </>
  );
};

export default Home;
