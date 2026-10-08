// src/pipeline/getOverdueTodos.test.ts
import { expect, test } from "vitest";
import type { Todo } from "./types.js";
import { getOverdueTodos } from "./getOverdueTodos.js";

test("未完了かつ期限を過ぎたTodoだけを抽出する", () => {
  const now = new Date(2026, 9, 22, 12, 0);
  const todos: Todo[] = [
    { id: "past", name: "期限を過ぎた", priority: 1, isDone: false,
      deadline: new Date(2026, 9, 22, 11, 59, 59, 999) },
    { id: "equal", name: "期限ちょうど", priority: 1, isDone: false,
      deadline: new Date(2026, 9, 22, 12, 0) },
    { id: "future", name: "期限が未来", priority: 1, isDone: false,
      deadline: new Date(2026, 9, 22, 12, 0, 0, 1) },
    { id: "done", name: "完了済み", priority: 1, isDone: true,
      deadline: new Date(2026, 9, 21, 12, 0) },
    { id: "none", name: "期限なし", priority: 1, isDone: false,
      deadline: null },
  ];
  const before = structuredClone(todos);
  const beforeNow = now.getTime();
  const overdue = getOverdueTodos(todos, now);
  expect(overdue.map((todo) => todo.id)).toEqual(["past"]);
  expect(todos).toEqual(before);
  expect(now.getTime()).toBe(beforeNow);
  expect(overdue).not.toBe(todos);
  expect(overdue[0]).toBe(todos[0]);
});

test("対象がなければ新しい空配列を返す", () => {
  const todos: Todo[] = [
    { id: "none", name: "期限なし", priority: 3, isDone: false,
      deadline: null },
  ];
  const before = structuredClone(todos);
  const overdue = getOverdueTodos(todos, new Date(2026, 9, 22));
  expect(overdue).toEqual([]);
  expect(todos).toEqual(before);
  expect(overdue).not.toBe(todos);
});

test("空配列にも同じように適用できる", () => {
  const todos: Todo[] = [];
  const overdue = getOverdueTodos(todos, new Date(2026, 9, 22));
  expect(overdue).toEqual([]);
  expect(todos).toEqual([]);
  expect(overdue).not.toBe(todos);
});
