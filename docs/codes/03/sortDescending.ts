// src/pipeline/sortDescending.ts
import { initTodos } from "./initTodos.js";

const sortedTodos = [...initTodos].sort((a, b) => b.priority - a.priority);
console.log(JSON.stringify(initTodos, null, 2));
console.log(JSON.stringify(sortedTodos, null, 2));
