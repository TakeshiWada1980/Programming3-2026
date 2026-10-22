import { useState } from "react";
import type { Todo } from "./types";
import { initTodos } from "./initTodos";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";
import { twMerge } from "tailwind-merge";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initTodos);

  const uncompletedCount = todos.filter((todo) => !todo.isDone).length;

  const addNewTodo = () => {
    const newTodo: Todo = {
      id: uuid(),
      name: "新しいタスク",
      isDone: false,
      priority: 3,
      deadline: new Date(2026, 10, 13),
    };
    setTodos((currentTodos) => [...currentTodos, newTodo]);
  };

  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-4 text-2xl font-bold">TodoApp</h1>
      <div className="mb-4">
        <WelcomeMessage
          name="寝屋川タヌキ"
          uncompletedCount={uncompletedCount}
        />
      </div>
      <TodoList todos={todos} />

      <div className="mt-4 space-y-2 rounded-md border border-slate-300 bg-white p-3 drop-shadow">
        <h2 id="newTodoHeading" className="text-lg font-bold">
          新しいタスクの追加
        </h2>

        <button
          type="button"
          onClick={addNewTodo}
          className={twMerge(
            "cursor-pointer rounded-md px-3 py-1",
            "bg-indigo-500 font-bold text-white hover:bg-indigo-600",
          )}
        >
          追加
        </button>
      </div>
    </div>
  );
};

export default App;
