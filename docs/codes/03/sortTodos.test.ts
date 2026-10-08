// src/pipeline/sortTodos.test.ts
import { expect, test } from "vitest";
import type { Todo } from "./types.js";
import {
  sortByPriority, sortByDoneAndDeadline, sortByPriorityAndDeadline,
} from "./sortTodos.js";

const makeTodos = (): Todo[] => [
  { id: "none1", name: "期限なし1", priority: 2, isDone: false,
    deadline: null },
  { id: "late", name: "遅い期限", priority: 2, isDone: false,
    deadline: new Date(2026, 9, 24) },
  { id: "early1", name: "早い期限1", priority: 2, isDone: false,
    deadline: new Date(2026, 9, 20) },
  { id: "early2", name: "早い期限2", priority: 2, isDone: false,
    deadline: new Date(2026, 9, 20) },
  { id: "none2", name: "期限なし2", priority: 2, isDone: false,
    deadline: null },
  { id: "done", name: "完了済み", priority: 1, isDone: true,
    deadline: new Date(2026, 9, 1) },
];

test("優先度だけで並べ、同じ優先度の順序と元データを保つ", () => {
  const todos = makeTodos();
  const before = structuredClone(todos);
  const sorted = sortByPriority(todos);
  expect(sorted.map((todo) => todo.id))
    .toEqual(["done", "none1", "late", "early1", "early2", "none2"]);
  expect(todos).toEqual(before);
  expect(sorted).not.toBe(todos);
  expect(sorted.every((todo) => todos.includes(todo))).toBe(true);
});

test("未完了を先にし、その中では期限なしを最後にする", () => {
  const todos = makeTodos();
  const before = structuredClone(todos);
  const sorted = sortByDoneAndDeadline(todos);
  expect(sorted.map((todo) => todo.id))
    .toEqual(["early1", "early2", "late", "none1", "none2", "done"]);
  expect(todos).toEqual(before);
  expect(sorted).not.toBe(todos);
  expect(sorted.every((todo) => todos.includes(todo))).toBe(true);
});

test("優先度を先にし、同じ優先度の中で期限順にする", () => {
  const todos = makeTodos();
  const before = structuredClone(todos);
  const sorted = sortByPriorityAndDeadline(todos);
  expect(sorted.map((todo) => todo.id))
    .toEqual(["done", "early1", "early2", "late", "none1", "none2"]);
  expect(todos).toEqual(before);
  expect(sorted).not.toBe(todos);
  expect(sorted.every((todo) => todos.includes(todo))).toBe(true);
});

test("3種類のソートを空配列にも適用できる", () => {
  const todos: Todo[] = [];
  for (const sort of [sortByPriority, sortByDoneAndDeadline,
    sortByPriorityAndDeadline]) {
    const sorted = sort(todos);
    expect(sorted).toEqual([]);
    expect(sorted).not.toBe(todos);
  }
  expect(todos).toEqual([]);
});
