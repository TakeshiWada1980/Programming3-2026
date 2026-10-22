import { useState } from "react";
import type { ChangeEvent } from "react";
import type { Todo } from "./types";
import { initTodos } from "./initTodos";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const getTodoNameError = (name: string): string => {
  const trimmedName = name.trim();
  if (trimmedName.length < 2 || trimmedName.length > 32) {
    return "前後の空白を除いて、2文字以上、32文字以内で入力してください";
  }
  return "";
};

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initTodos);
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(3);
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);
  const [isNameTouched, setIsNameTouched] = useState(false);

  const uncompletedCount = todos.filter((todo) => !todo.isDone).length;
  const completedCount = todos.length - uncompletedCount;
  const newTodoNameError = getTodoNameError(newTodoName);
  const isNewTodoNameInvalid = newTodoNameError !== "";
  const showNewTodoNameError = isNameTouched && isNewTodoNameInvalid;

  const updateNewTodoName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoName(e.target.value);
    setIsNameTouched(true);
  };

  const updateNewTodoPriority = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoPriority(Number(e.target.value));
  };

  const updateDeadline = (e: ChangeEvent<HTMLInputElement>) => {
    const dt = e.target.value;
    setNewTodoDeadline(dt === "" ? null : new Date(dt));
  };

  const addNewTodo = () => {
    if (isNewTodoNameInvalid) {
      setIsNameTouched(true);
      return;
    }

    const newTodo: Todo = {
      id: uuid(),
      name: newTodoName.trim(),
      isDone: false,
      priority: newTodoPriority,
      deadline: newTodoDeadline,
    };
    setTodos((currentTodos) => [...currentTodos, newTodo]);
    setNewTodoName("");
    setNewTodoPriority(3);
    setNewTodoDeadline(null);
    setIsNameTouched(false);
  };

  const updateIsDone = (id: string, value: boolean) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: value };
        } else {
          return todo;
        }
      }),
    );
  };

  const removeCompletedTodos = () => {
    setTodos((currentTodos) => currentTodos.filter((todo) => !todo.isDone));
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
      <TodoList todos={todos} updateIsDone={updateIsDone} />

      <button
        type="button"
        onClick={removeCompletedTodos}
        disabled={completedCount === 0}
        className={twMerge(
          "mt-4 cursor-pointer rounded-md px-3 py-1 font-medium",
          "bg-rose-500 text-white hover:bg-rose-600",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-rose-500",
        )}
      >
        完了済みのタスクを削除
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addNewTodo();
        }}
        aria-labelledby="newTodoHeading"
        className="mt-4 space-y-2 rounded-md border border-slate-300 bg-white p-3 drop-shadow"
      >
        <h2 id="newTodoHeading" className="text-lg font-bold">
          新しいタスクの追加
        </h2>

        <div>
          <div className="flex items-center space-x-2">
            <label className="font-bold" htmlFor="newTodoName">
              名前
            </label>
            <input
              id="newTodoName"
              name="todoName"
              type="text"
              required
              value={newTodoName}
              onChange={updateNewTodoName}
              aria-invalid={showNewTodoNameError}
              aria-describedby={
                showNewTodoNameError ? "newTodoNameError" : undefined
              }
              className={twMerge(
                "min-w-0 grow rounded-md border border-gray-300 p-2",
                showNewTodoNameError && "border-red-500 outline-red-500",
              )}
              placeholder="2文字以上、32文字以内で入力してください"
            />
          </div>
          {showNewTodoNameError && (
            <div
              id="newTodoNameError"
              aria-live="polite"
              className="ml-10 flex items-center space-x-1 text-sm font-medium text-red-500"
            >
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="mr-0.5"
              />
              <div>{newTodoNameError}</div>
            </div>
          )}
        </div>

        <fieldset>
          <legend className="mb-1 font-bold">優先度</legend>
          <div className="flex gap-5">
            {[1, 2, 3].map((value) => (
              <label key={value} className="flex items-center space-x-1">
                <input
                  id={`priority-${value}`}
                  name="priorityGroup"
                  type="radio"
                  value={value}
                  checked={newTodoPriority === value}
                  onChange={updateNewTodoPriority}
                />
                <span>{value}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-wrap items-center gap-2">
          <label className="font-bold" htmlFor="deadline">
            期限
          </label>
          <input
            type="datetime-local"
            id="deadline"
            name="deadline"
            value={
              newTodoDeadline
                ? dayjs(newTodoDeadline).format("YYYY-MM-DDTHH:mm:ss")
                : ""
            }
            onChange={updateDeadline}
            className="max-w-full min-w-0 rounded-md border border-gray-300 px-2 py-0.5"
          />
        </div>

        <button
          type="submit"
          disabled={isNewTodoNameInvalid}
          className={twMerge(
            "cursor-pointer rounded-md px-3 py-1",
            "bg-indigo-500 font-bold text-white hover:bg-indigo-600",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-indigo-500",
          )}
        >
          追加
        </button>
      </form>
    </div>
  );
};

export default App;
