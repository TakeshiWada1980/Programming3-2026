// src/pipeline/types.ts
export type Todo = {
  id: string;
  name: string;
  priority: number;
  isDone: boolean;
  deadline: Date | null;
};
