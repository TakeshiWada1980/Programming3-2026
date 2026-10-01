// 「演習: 期限切れを判定する」の実装例
// src/utils/todoStatus.ts に配置して使用してください。
import type { Todo } from "../types.js";

export const isOverdue = (todo: Todo, now: Date): boolean => {
  // 完了済みなら、期限を過ぎていても期限切れにはしない。
  if (todo.isDone) {
    return false;
  }

  // 期限ちょうどは含めず、期限より後の場合だけ true とする。
  return now.getTime() > todo.deadline.getTime();
};
