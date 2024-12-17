import { useState } from "react";
import { TrashIcon } from "./assets/icon/TrashIcon";

const setLocalStorage = (todo: any) => {
  localStorage.setItem("todo", JSON.stringify(todo));
};

function App() {
  const [todo, setTodo] = useState<any>(
    JSON.parse(localStorage.getItem("todo") || "[]")
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { value } = e.target.name;
    if (value === "") {
      alert("Please fill the input field");
      return;
    }
    setTodo((prev: any) => {
      const newState = [
        ...prev,
        {
          title: value,
          done: false,
        },
      ];
      setLocalStorage(newState);
      return newState;
    });
    e.target.name.value = "";
  };

  return (
    <div className="bg-[#bbf7d0] h-screen py-16 gap-8 flex justify-center items-center border-2 border-red-500 flex-col">
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="flex-grow flex-col p-4 rounded-md flex items-center gap-5 w-full"
      >
        <h1 className="text-6xl font-semibold">Task App</h1>
        <div className="flex gap-4 w-full border justify-center items-center">
          <input
            name="name"
            className="px-8 py-2 cursor-text rounded-md outline-none border-2 border-black"
            type="search"
            placeholder="Enter Todo"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#000] text-white rounded-md hover:bg-[#333] transition-all duration-200 ease-in"
          >
            Add
          </button>
        </div>
      </form>
      <div className="h-[30rem] w-[30rem] bg-white scrollbar-thin flex flex-col gap-6  overflow-y-scroll px-4 py-4 rounded-md cursor-pointer">
        {todo.length === 0 ? (
          <div className="flex justify-center items-center w-full h-full rounded-md">
            <h1 className="text-xl font-semibold text-center">
              No Tasks Added
            </h1>
          </div>
        ) : (
          <>
            {todo.map((t: any, index: number) => (
              <div className="flex justify-between w-full  px-16 items-center bg-[#bbf7d0]">
                <div className="flex  justify-start gap-4 py-3 border rounded-md flex-wrap">
                  <input
                    required
                    className="h-5 w-5 text"
                    onChange={() => {
                      const val = todo.map((task: any, i: any) => {
                        return i == index
                          ? { ...task, done: !task.done }
                          : task;
                      });
                      setTodo(() => {
                        const newState = [...val];
                        setLocalStorage(newState);
                        return newState;
                      });
                    }}
                    checked={t.done}
                    type="checkbox"
                  />

                  <h1
                    className={`${
                      t.done ? "line-through" : ""
                    } text-xl font-semibold`}
                  >
                    {t.title}
                  </h1>
                </div>
                <button
                  onClick={() => {
                    const cnf = confirm(
                      `Are You sure , do you want to delete TODO - ${t.title} ? `
                    );
                    if (!cnf) return;
                    const val = todo.filter((_: any, i: any) => i !== index);
                    setTodo(() => {
                      const newState = [...val];
                      setLocalStorage(newState);
                      return newState;
                    });
                  }}
                  className="px-1.5 py-1.5 bg-red-600 text-white rounded-full hover:bg-[#333] transition-all duration-200 ease-in"
                  type="button"
                >
                  <TrashIcon size={20}></TrashIcon>
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
