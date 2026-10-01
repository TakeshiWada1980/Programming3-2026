// 「演習: 状態を文字列にする」までの実装例
// src/utils/todoStatus.ts に配置して使用してください。
import type { Todo } from "../types.js";

export const isOverdue = (todo: Todo, now: Date): boolean => {
  if (todo.isDone) {
    return false;
  }

  return now.getTime() > todo.deadline.getTime();
};

export const getTodoStatus = (todo: Todo, now: Date): string => {
  if (todo.isDone) {
    return `【済】${todo.name}`;
  }

  // 日時の差をミリ秒から時間へ変換し、小数第 1 位までの文字列にする。
  const diffMs = todo.deadline.getTime() - now.getTime();
  const hours = (Math.abs(diffMs) / (60 * 60 * 1000)).toFixed(1);

  // 期限の前後は、丸めた時間数ではなく元の日時で判定する。
  if (isOverdue(todo, now)) {
    return `【未】${todo.name} (期限を${hours}時間超過)`;
  }

  return `【未】${todo.name} (期限まで残り${hours}時間)`;
};
