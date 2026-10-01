// 「オブジェクトの比較を Vitest で確認する」の演習の実装例
// src/utils/deepEqual.test.ts に配置して使用してください。
// 講義に掲載した 3 件と、演習で追加する 3 件をまとめています。
import { expect, test } from "vitest";
import type { Todo } from "../types.js";
import { deepEqual } from "./deepEqual.js";

const todo1: Todo = {
  name: "TypeScriptの勉強",
  priority: 1,
  isDone: false,
  deadline: new Date(2026, 9, 11, 9, 45),
};
const todo2: Todo = {
  name: "TypeScriptの勉強",
  priority: 1,
  isDone: false,
  deadline: new Date(2026, 9, 11, 9, 45),
};

test("同じ内容でも別のオブジェクトである", () => {
  expect(todo1).not.toBe(todo2);
  expect(todo1).toEqual(todo2);
  expect(deepEqual(todo1, todo2)).toBe(true);
});

test("参照を代入すると同じオブジェクトを指す", () => {
  const other = todo1;
  expect(other).toBe(todo1);
  expect(deepEqual(todo1, other)).toBe(true);
});

test("期限だけが違えば同じ内容とは判定しない", () => {
  const changed: Todo = {
    name: "TypeScriptの勉強",
    priority: 1,
    isDone: false,
    deadline: new Date(2026, 9, 11, 9, 46),
  };
  expect(deepEqual(todo1, changed)).toBe(false);
});

// ここから、演習で追加する 3 件です。
// 1 項目だけ変え、残りの 3 項目は todo1 と同じ値にします。
test("名前だけが違えば同じ内容とは判定しない", () => {
  const changed: Todo = {
    name: "React の予習",
    priority: 1,
    isDone: false,
    deadline: new Date(2026, 9, 11, 9, 45),
  };
  expect(deepEqual(todo1, changed)).toBe(false);
});

test("優先度だけが違えば同じ内容とは判定しない", () => {
  const changed: Todo = {
    name: "TypeScriptの勉強",
    priority: 2,
    isDone: false,
    deadline: new Date(2026, 9, 11, 9, 45),
  };
  expect(deepEqual(todo1, changed)).toBe(false);
});

test("完了状態だけが違えば同じ内容とは判定しない", () => {
  const changed: Todo = {
    name: "TypeScriptの勉強",
    priority: 1,
    isDone: true,
    deadline: new Date(2026, 9, 11, 9, 45),
  };
  expect(deepEqual(todo1, changed)).toBe(false);
});
