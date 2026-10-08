// src/pipeline/initTodos.ts
import type { Todo } from "./types.js";

export const initTodos: Todo[] = [
  {
    id: "a001",
    name: "React予習（YouTube）",
    isDone: false,
    priority: 1,
    deadline: new Date(2026, 9, 24, 9, 0),
  },
  {
    id: "a002",
    name: "TypeScriptの復習",
    isDone: true,
    priority: 2,
    deadline: null,
  },
  {
    id: "a003",
    name: "基礎物理学3の宿題",
    isDone: false,
    priority: 1,
    deadline: new Date(2026, 9, 20, 23, 59),
  },
  {
    id: "a004",
    name: "知識科学概論の宿題",
    isDone: true,
    priority: 3,
    deadline: new Date(2026, 9, 27),
  },
];
