// src/pipeline/sortTodos.ts
import type { Todo } from "./types.js";

export const compareDeadlines = (a: Todo, b: Todo): number => {
  if (a.deadline === null && b.deadline === null) {
    return 0;
  }
  if (a.deadline === null) {
    return 1;
  }
  if (b.deadline === null) {
    return -1;
  }
  return a.deadline.getTime() - b.deadline.getTime();
};

export const sortByPriority = (todos: Todo[]): Todo[] => {
  return [...todos].sort((a, b) => a.priority - b.priority);
};

export const sortByDoneAndDeadline = (todos: Todo[]): Todo[] => {
  return [...todos].sort((a, b) => {
    if (a.isDone !== b.isDone) {
      return a.isDone ? 1 : -1;
    }
    return compareDeadlines(a, b);
  });
};

export const sortByPriorityAndDeadline = (todos: Todo[]): Todo[] => {
  return [...todos].sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    return compareDeadlines(a, b);
  });
};
