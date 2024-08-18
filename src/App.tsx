import Home from "./pages/Home";

function App() {
  // const state = useAppSelector((state) => state.tasks);
  // console.log(state);
  return (
    <div className="App h-screen bg-slate-50 font-serif">
      <div className="max-h-2/3 overflow-y-auto">
        <div className="bg-custom-bg h-[200px] w-full bg-cover bg-center bg-no-repeat"></div>
        <div className="ml-auto mr-auto mt-[-100px] w-[768px] rounded-lg border bg-white shadow-md">
          <h1 className="p-2 text-center text-3xl font-bold">To Do List</h1>
          <div>
            <Home />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
