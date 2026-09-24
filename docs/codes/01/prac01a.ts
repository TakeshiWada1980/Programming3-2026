const name: string = "TypeScriptの勉強";
const priority: number = 3;

// 2025年10月2日11時45分
const deadline: Date = new Date(2025, 9, 2, 11, 45);

function date2str(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${year}年${month}月${day}日 ${hours}時${minutes}分`;
}

console.log(
  `Todo 1 => ${name}（優先度:${priority})`,
  `期限:${date2str(deadline)}`
);
