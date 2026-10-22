import type { Todo } from "./types";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPersonDigging } from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";

type Props = {
  todo: Todo;
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
};

const num2star = (n: number): string => "★".repeat(4 - n);

const formattedDate = (date: Date) => {
  if (date.getHours() === 0 && date.getMinutes() === 0) {
    return dayjs(date).format("YYYY/MM/DD");
  }
  return dayjs(date).format("YYYY/MM/DD HH:mm");
};

const TodoItem = (props: Props) => {
  const todo = props.todo;

  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-slate-300 bg-white px-4 py-2 drop-shadow">
      <div
        className={twMerge(
          "flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1",
          todo.isDone && "opacity-60",
        )}
      >
        <label className="flex min-w-0 cursor-pointer items-center">
          <input
            type="checkbox"
            checked={todo.isDone}
            onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
            className="mr-3 shrink-0 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faPersonDigging}
            className="mr-2 shrink-0 text-slate-500"
          />
          <span className="min-w-0 text-lg font-medium wrap-anywhere text-slate-700">
            {todo.name}
          </span>
        </label>
        <span
          aria-label={`優先度: ${todo.priority}`}
          className="tracking-tighter text-orange-400"
        >
          {num2star(todo.priority)}
        </span>
        {todo.deadline && (
          <span className="flex items-center text-sm text-slate-500">
            <FontAwesomeIcon icon={faClock} className="mr-0.5" />
            {formattedDate(todo.deadline)}
          </span>
        )}
        {todo.isDone && (
          <span className="rounded-full bg-slate-800 px-3 py-0.5 text-xs font-medium text-white">
            完了済み
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={() => props.remove(todo.id)}
        aria-label={`${todo.name}を削除`}
        className={twMerge(
          "shrink-0 cursor-pointer rounded-md px-2 py-1 text-sm font-bold",
          "bg-rose-300 text-white hover:bg-rose-500",
        )}
      >
        削除
      </button>
    </div>
  );
};

export default TodoItem;
