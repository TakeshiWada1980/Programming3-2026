// src/pipeline/sortPriorityAndDeadline.ts
import { initTodos } from "./initTodos.js";
import { sortByPriorityAndDeadline } from "./sortTodos.js";

console.log(JSON.stringify(initTodos, null, 2));
console.log(JSON.stringify(sortByPriorityAndDeadline(initTodos), null, 2));
