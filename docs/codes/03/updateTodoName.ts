// src/pipeline/updateTodoName.ts
import type { Todo } from "./types.js";

export const updateTodoName = (
  todos: Todo[],
  targetId: string,
  newName: string
): Todo[] => {
  return todos.map((todo) =>
    todo.id === targetId ? { ...todo, name: newName } : todo
  );
};
