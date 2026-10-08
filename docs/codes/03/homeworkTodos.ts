// 総合演習の実装例: src/pipeline/homeworkTodos.ts
import dayjs from "dayjs";
import type { Todo } from "./types.js";
import { sortByDoneAndDeadline } from "./sortTodos.js";

export const addTodo = (todos: Todo[], newTodo: Todo): Todo[] => {
  return [...todos, newTodo];
};

export const updateIsDone = (
  todos: Todo[], id: string, value: boolean
): Todo[] => {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, isDone: value } : todo
  );
};

export const removeCompletedTodos = (todos: Todo[]): Todo[] => {
  return todos.filter((todo) => !todo.isDone);
};

export const removeTodoById = (todos: Todo[], id: string): Todo[] => {
  return todos.filter((todo) => todo.id !== id);
};

export const countUncompletedTodos = (todos: Todo[]): number => {
  return todos.filter((todo) => !todo.isDone).length;
};

export const createListItems = (todos: Todo[]): string[] => {
  return sortByDoneAndDeadline(todos).map((todo) => {
    const deadline = todo.deadline === null
      ? "期限なし"
      : `期限${dayjs(todo.deadline).format("YYYY/MM/DD HH:mm")}`;
    const state = todo.isDone ? "【済】" : "【未】";
    return `${state}[${todo.id}] ${todo.name} 優先度${todo.priority} (${deadline})`;
  });
};
