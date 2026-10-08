// src/pipeline/updateTodoName.test.ts
import { expect, test } from "vitest";
import type { Todo } from "./types.js";
import { updateTodoName } from "./updateTodoName.js";

const makeTodos = (): Todo[] => [
  { id: "a001", name: "Reactの予習", priority: 1, isDone: false,
    deadline: new Date(2026, 9, 24, 9, 0) },
  { id: "a002", name: "TypeScriptの復習", priority: 2, isDone: true,
    deadline: null },
];

test("指定したTodoの名前だけを変更し、元データを保つ", () => {
  const todos = makeTodos();
  const before = structuredClone(todos);
  const updated = updateTodoName(todos, "a001", "Reactの復習");
  expect(updated.map((todo) => todo.name))
    .toEqual(["Reactの復習", "TypeScriptの復習"]);
  expect(todos).toEqual(before);
  expect(updated).not.toBe(todos);
  expect(updated[0]).not.toBe(todos[0]);
  expect(updated[0]).toEqual({ ...before[0], name: "Reactの復習" });
  expect(updated[1]).toBe(todos[1]);
});

test("対象idがなくても元データを保ち、新しい配列を返す", () => {
  const todos = makeTodos();
  const before = structuredClone(todos);
  const updated = updateTodoName(todos, "missing", "変更後");
  expect(updated).toEqual(before);
  expect(todos).toEqual(before);
  expect(updated).not.toBe(todos);
  expect(updated[0]).toBe(todos[0]);
  expect(updated[1]).toBe(todos[1]);
});

test("空配列には変更せず、新しい空配列を返す", () => {
  const todos: Todo[] = [];
  const updated = updateTodoName(todos, "a001", "変更後");
  expect(updated).toEqual([]);
  expect(todos).toEqual([]);
  expect(updated).not.toBe(todos);
});
