// src/pipeline/homeworkTodos.test.ts
import { expect, test } from "vitest";
import type { Todo } from "./types.js";
import {
  addTodo, updateIsDone, removeCompletedTodos, removeTodoById,
  countUncompletedTodos, createListItems,
} from "./homeworkTodos.js";

const makeTodos = (): Todo[] => [
  { id: "a001", name: "復習", priority: 2, isDone: false, deadline: null },
  { id: "a002", name: "宿題", priority: 1, isDone: true,
    deadline: new Date(2026, 9, 20, 12, 0) },
  { id: "a003", name: "予習", priority: 3, isDone: false,
    deadline: new Date(2026, 9, 24, 9, 0) },
];

test("末尾に追加し、元配列と追加したTodoを変更しない", () => {
  const todos = makeTodos();
  const before = structuredClone(todos);
  const newTodo: Todo = {
    id: "a004", name: "準備", priority: 1, isDone: false, deadline: null,
  };
  const newTodoBefore = structuredClone(newTodo);
  const added = addTodo(todos, newTodo);
  expect(added.map((todo) => todo.id)).toEqual(["a001", "a002", "a003", "a004"]);
  expect(todos).toEqual(before);
  expect(newTodo).toEqual(newTodoBefore);
  expect(added).not.toBe(todos);
  expect(added[0]).toBe(todos[0]);
  expect(added[3]).toBe(newTodo);
});

test("指定idの完了状態だけを更新する", () => {
  const todos = makeTodos();
  const before = structuredClone(todos);
  const updated = updateIsDone(todos, "a001", true);
  expect(updated).toEqual([
    { ...before[0], isDone: true }, before[1], before[2],
  ]);
  expect(todos).toEqual(before);
  expect(updated).not.toBe(todos);
  expect(updated[0]).not.toBe(todos[0]);
  expect(updated[1]).toBe(todos[1]);
  expect(updated[2]).toBe(todos[2]);
  expect(updateIsDone(todos, "missing", true)).toEqual(before);
  expect(todos).toEqual(before);
});

test("完了済みを一括削除し、残す要素と元データを保つ", () => {
  const todos = makeTodos();
  const before = structuredClone(todos);
  const remaining = removeCompletedTodos(todos);
  expect(remaining.map((todo) => todo.id)).toEqual(["a001", "a003"]);
  expect(todos).toEqual(before);
  expect(remaining).not.toBe(todos);
  expect(remaining[0]).toBe(todos[0]);
  expect(remaining[1]).toBe(todos[2]);
});

test("指定idを削除し、対象がなくても値を変えない", () => {
  const todos = makeTodos();
  const before = structuredClone(todos);
  const remaining = removeTodoById(todos, "a001");
  expect(remaining.map((todo) => todo.id)).toEqual(["a002", "a003"]);
  expect(remaining[0]).toBe(todos[1]);
  expect(remaining).not.toBe(todos);
  expect(removeTodoById(todos, "missing")).toEqual(before);
  expect(todos).toEqual(before);
});

test("未完了を数え、完了状態と期限で並べて文字列化する", () => {
  const todos = makeTodos();
  const before = structuredClone(todos);
  expect(countUncompletedTodos(todos)).toBe(2);
  expect(createListItems(todos)).toEqual([
    "【未】[a003] 予習 優先度3 (期限2026/10/24 09:00)",
    "【未】[a001] 復習 優先度2 (期限なし)",
    "【済】[a002] 宿題 優先度1 (期限2026/10/20 12:00)",
  ]);
  expect(todos).toEqual(before);
});

test("空配列でも、追加・更新・削除・件数・表示を扱える", () => {
  const todos: Todo[] = [];
  const newTodo: Todo = {
    id: "a001", name: "予習", priority: 1, isDone: false, deadline: null,
  };
  expect(addTodo(todos, newTodo)).toEqual([newTodo]);
  expect(updateIsDone(todos, "a001", true)).toEqual([]);
  expect(removeCompletedTodos(todos)).toEqual([]);
  expect(removeTodoById(todos, "a001")).toEqual([]);
  expect(countUncompletedTodos(todos)).toBe(0);
  expect(createListItems(todos)).toEqual([]);
  expect(todos).toEqual([]);
});
