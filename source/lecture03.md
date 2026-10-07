---
var:
  header-title: "2026-3I プログラミング3 第03回 講義資料"
  header-date: "2026年10月09日（金）1時限"
---

# 第03回 3I-プログラミング3

## 今回の授業概要と連絡

本科目は学修単位科目です。**1回の授業あたり、皆さんが「4時間相当の授業時間外学習」をすることを前提** としたボリューム、展開速度となっています。いろいろと忙しいとは思いますが、授業以外の時間も確保して取り組んでください。

### 小テスト❷

「小テスト❷」を実施します。筆記用具を準備しておいてください。

- 次回は小テストはありません。

### ここまでの流れ

後期中間試験ぐらいまでの授業の流れ (予定)

1. モダンTypeScript基礎学習のための環境構築 ***済***
2. TypeScript基礎学習 **← 前回と今回の授業のメイン**
    - **React / Next.js 開発に関連する文法や機能だけを集中的に学びます**。
3. Reactを使ったTodoアプリのための環境構築 **← 次回**
4. Todoアプリ開発（Reactによるフロントエンド開発）のチュートリアル
5. Todoアプリのカスタマイズや作り込み → **後期前半の大課題**

まずは、次のような「📝**Todoアプリの開発** (Reactを採用したフロントエンド開発)」目標とします。

- [Todoアプリのサンプル](https://takeshiwada1980.github.io/react-todo-app-demo/) (ギリギリ合格水準のレベル、点数で言えば60点😨)
- [Todoアプリのサンプル](https://takeshiwada1980.github.io/react-todo-app-demo/2) (ここまで内容を理解して開発できたら90点🎉)

## VSCodeの関連のTips

次回に向けて、React開発に有用な拡張機能などをインストールしておいてください。

### VSCodeの再読み込み

`[Ctrl]+[Shift]+[P]` で **コマンドパレット** を起動するか、VSCode上部の検索欄をクリックして `>Developer: Reload Window` と入力すると「**プロジェクトファイルの再読み込み**」が行われます。

2回目以降は、履歴から `>Developer: Reload Window` を選択して実行可能です。

![img](figs/03/vscode_01.png)

特に、今後のReact開発では、`import` 文で <span class="masked">適切にファイルパスを設定しているにも関わらず「赤波線」でエラーが表示されること</span> が多々あります (やっかいなことにVSCodeを再起動してもキャッシュが残っており解決しません)。そのようなときは、この **Reload Window** で解決します。

### ファイルパス補完の拡張機能

VSCodeの拡張機能として **Path Intellisense** (識別子:`christian-kohler.path-intellisense`) をインストールしておくと、プログラムのなかで **ファイルパス** を入力するときに補完が効いて便利です。

ファイルパス補完の拡張機能は「Path Intellisense」の他にも様々なものがあるので、自分で使いやすいものを探してみてください。

![img](figs/03/vscode_05.png)

### React開発の支援機能

React関連のコードスニペットを挿入する拡張機能として **ES7+React/Redux/Reac1t-Native snippets** (識別子: `dsznajder.es7-react-js-snippets`) を VScode にインストールしておいてください (次回以降の講義では、この拡張機能がインストールされている前提で解説している部分があります)。

この拡張機能を導入すると `rafce` と入力するだけで、**Reactコンポーネントのスニペット** (=プログラムコードの定型的な断片、雛形) をエディタに挿入してくれます。

![img](figs/03/vscode_04.png)

この拡張機能の概要は[こちら](https://www.google.com/search?q=ES7%2BReact%2FRedux%2FReac1t-Native+snippets+おすすめ)を参照してください。

### コードチェックツールの拡張機能

**ESLint** (識別子: `dbaeumer.vscode-eslint`) は、ECMAScript用 (=TypeScript/JavaScript用) の **コードチェックツール** に関する拡張機能です。こちらも、次回以降の講義で利用していく予定なのであらかじめインストールしておいてください。

この拡張機能の概要は[こちら](https://www.google.com/search?q=vscode+拡張機能+eslint)を参照してください。

### Tailwind用のインテリセンス

**Tailwind CSS IntelliSense** (識別子 `bradlc.vscode-tailwindcss`) は[Tailwind CSS](https://www.google.com/search?q=Tailwind+入門)という CSSフレームワークに関連したインテリセンス (コードの自動補完ツール) です。本授業でのウェブアプリ開発でも Tailwind CSS を使用していくので、その開発体験を向上させるためにインストールしておいてください。

この拡張機能の概要は[こちら](https://www.google.com/search?q=Tailwind+CSS+IntelliSense+おすすめ)を参照してください。

**(プロンプト例)**

> CSSフレームワーク とはなんですか。普通に CSS ファイルを書くのと何が違いますか。

> Tailwind CSS とは何ですか。

## 前回の復習

第02回講義の[Reactにおける状態 (オブジェクト) の変更の検知 ～概要～](lecture02.html#reactにおける状態-オブジェクト-の変更の検知-概要)について、ある程度、理解していることを前提とします。

- スプレッド構文などの理解が怪しい場合は、再度、前回の講義資料を読み直してください。

### オブジェクトのプロパティを変更するための2つのアプローチ

前回の講義では、ユーザー定義型の **_オブジェクトを更新_** する場合 (主として**オブジェクトのプロパティ(属性)を変更**する場合) には、**似ているようで大きく異なる2つの方法 (アプローチ)** が存在することを解説しました。

#### ミュータブルなオブジェクト更新

1つめに示した**ミュータブルなオブジェクト更新** (`mutableApproach.ts`) は、次のように <span class="masked">オブジェクトの属性を直接的に変更する方法</span> でした。

```typescript{.numberLines caption="mutableApproach.ts"}
import type { Todo } from "./types.js";

const todo: Todo = {
  name: "Learn TypeScript",
  priority: 3,
  isDone: false,
  deadline: new Date(2024, 9, 11, 9, 45),
};

// ▼▼▼ ここから
const updatedTodo = todo; // ➊
updatedTodo.name = "Learn COBOL"; // ➋
updatedTodo.priority = 1; // ➌
// ▲▲▲ ここまでが着目してほしいところ

// updatedTodo と todo の「参照」は同じ (=同じオブジェクト)
console.log("todo !== updatedTodo ---> ", todo !== updatedTodo);

// todo の内容を確認
console.log("■ todo の内容");
console.log(JSON.stringify(todo, null, 2));

// updatedTodoの内容を確認
console.log("■ updatedTodoの内容");
console.log(JSON.stringify(updatedTodo, null, 2));
```

実行結果は、次のようになります。

```
todo !== updatedTodo --->  false
■ todo の内容
{
  "name": "Learn COBOL",
  "priority": 1,
  "isDone": false,
  "deadline": "2024-10-11T00:45:00.000Z"
}
■ updatedTodoの内容
{
  "name": "Learn COBOL",
  "priority": 1,
  "isDone": false,
  "deadline": "2024-10-11T00:45:00.000Z"
}
```

`mutableApproach.ts` の **第11行目 (➊)** の `updatedTodo = todo` は、いわゆる <span class="masked">浅いコピー (Shallow Copy)</span> であり、`todo` の **参照** (C言語で言えば**ポインタ**、Pythonで言えば**オブジェクトID**のようなもの) を、`updatedTodo` に複製した**だけ**に相当します。

![img](figs/03/obj_01.png)

そのため、**第12行目 (❷)** と **第13行目 (➌)** は `updatedTodo` を対象に操作しているように見えますが、実際のところ、それは `todo` の「参照先」を変更していることにもなります。そのため、実行結果を確認すると、オリジナルの `todo` の `name` も <span class="masked">Learn COBOL</span> に変更されています。

このようにオリジナルのデータ (`todo`) のプロパティを上書きすることから、このようなアプローチは「**状態直接操作**」や「**破壊的更新**」、「**ミュータブルなオブジェクト更新**」のように呼ばれます。

この授業のなかでは、このようなオブジェクトの操作を <span class="masked">「ミュータブルなオブジェクト更新」</span> のように表現してきます。**ミュータブル (Mutable)** とは「可変な」「変更可能な」という意味になります。

#### イミュータブルなオブジェクト更新

前回授業では、上記で示したミュータブルなオブジェクト更新とは**別に**、次の `immutableApproach.ts` のように「**スプレッド構文**」を使って[プロパティを更新した新たなオブジェクトを生成する方法](lecture02.html#reactが変更を検知可能なオブジェクトの生成)も解説しました。

```typescript{.numberLines caption="immutableApproach.ts"}
import type { Todo } from "./types.js";

const todo: Todo = {
  name: "Learn TypeScript",
  priority: 3,
  isDone: false,
  deadline: new Date(2024, 9, 11, 9, 45),
};

// ▼▼▼ ここから
const updatedTodo = {
  ...todo, // スプレッド構文
  name: "Learn COBOL",
  priority: 1,
}; // ➊～➌
// ▲▲▲ ここまでが着目してほしいところ

// updatedTodo と todo の「参照」は違う (=異なるオブジェクト)
console.log("todo !== updatedTodo ---> ", todo !== updatedTodo);

// todo の内容を確認
console.log("■ todo の内容");
console.log(JSON.stringify(todo, null, 2));

// updatedTodo の内容を確認
console.log("■ updatedTodoの内容");
console.log(JSON.stringify(updatedTodo, null, 2));
```

実行結果は、次のようになります。

```
todo !== updatedTodo --->  true
■ todo の内容
{
  "name": "Learn TypeScript",
  "priority": 3,
  "isDone": false,
  "deadline": "2024-10-11T00:45:00.000Z"
}
■ updatedTodoの内容
{
  "name": "Learn COBOL",
  "priority": 1,
  "isDone": false,
  "deadline": "2024-10-11T00:45:00.000Z"
}
```

この方法は、以下の図に示すように、オリジナルのデータ (`todo`) は変化させずに、別途、**プロパティを変更した新しいオブジェクト** (`updatedTodo`) を作成するアプローチであり、<span class="masked">「イミュータブルなオブジェクト更新」</span> のように呼ばれます。新しいオブジェクトが生成された証拠に、**第19行目** の出力は <span class="masked">`true`</span> となります。

先ほどの **ミュータブル (Mutable)** に対して、**イミュータブル (Immutable)** とは「変更できない」「不変」という意味になります。余談ですが、ミュータブル / イミュータブル などの考え方は「**Haskell**」や「**Scala**」などの[関数型プログラミング](https://ja.wikipedia.org/wiki/関数型プログラミング)で重要な概念となってきます。

![img](figs/03/obj_02.png)

`immutableApproach.ts` の **第11行目** から **第15行目** の処理は、以下のコードと**等価**となります。

```typescript{.numberLines caption="immutableApproach.ts (抜粋)" startFrom="11"}
const updatedTodo = {
  ...todo,
}; // ➊
updatedTodo.name = "Learn COBOL"; // ➋
updatedTodo.priority = 1; // ➌
```

なお、スプレッド構文は、Pythonにおける[アンパック](https://takeshiwada1980.github.io/Programming1-2023/lecture12.html#リストの扱いに関する補足②-アンパック)のようなものとイメージしてください。それでも、イメージがつかみづらいときは「生成AI」を利用してみてください。

**(プロンプト例)**

> JavaScriptにおける「スプレッド構文」のイメージがつかめません。特に「イミュータブルなオブジェクト更新」のために、スプレッド構文を使うという解説を聞いたのですがしっくりきません。具体的なコードを示して分かりやすく解説してください。

### React開発では「イミュータブルなオブジェクト更新」を使用

[前回授業](lecture02.html#reactにおける状態-オブジェクト-の変更の検知-概要)で解説したように、Reactを使ったフロントエンド開発において「**オブジェクトのプロパティを変更するとき**」は、原則として <span class="masked">スプレッド構文を利用したイミュータブルなオブジェクト更新</span> を使用するように意識してください。

なぜならば、**React** では「**オブジェクトの参照が (以前と) 変化しているかどうか**」に基づいて <span class="masked">画面表示を更新するかどうか (再レンダリング・再描画するかどうか) を判断・最適化</span> しているためです。適切に画面が再レンダリングされなければ「内部的にデータが書き換わっていても、利用者が見ているウェブ画面上にはそれが反映されていない」という困った状態になります。

このようなことから、Reactを使った開発では **_イミュータブルなオブジェクト更新を大原則_** とする必要があります。以下は「**Reactにおける画面更新の基本的な流れと仕組み**」になります。

1. イミュータブルな操作によって新しいオブジェクトを生成する。
2. 新しく生成されたオブジェクトは、元のオブジェクトとは **異なる参照**（C言語でいえばポインタ、Pythonで言えばオブジェクトID）を持つ。
3. 新しく生成されたオブジェクトをReactの **状態 (state)** にセットする (主に [useStateフック](https://www.google.com/search?q=useStateとは) を利用)、あるいは、子コンポーネントの[Props](https://www.google.com/search?q=React+propsとは)(プロップス) に渡す。
    - `useState` や `Props` については次回以降に詳しく学びます。
4. Reactは、Pros や state にセットされた **オブジェクトの参照の変化を検知** し、画面の再レンダリング ([DOM操作](https://www.google.com/search?q=DOM操作)) をする。


なお、今回講義では「**配列**」を学びますが、配列についても「ミュータブルな更新」と「イミュータブルな更新」が存在します。こちらも同様に「**イミュータブルな配列更新**」をする必要があります (React開発の前提で)。

#### 演習①

イミュータブルなオブジェクト更新によって、期限を `Date(2024, 9, 30)`、完了フラグを `true` に変更したオブジェクトを `updatedTodo` に得るようにプログラムを追記してください。また、実際に結果を確認してください。

- ここではスプレッド構文を利用することを期待しています。

```typescript{.numberLines caption="演習 (1) prac2-01.ts"}
import type { Todo } from "./types.js";
import { printTodo } from "./utils/printTodo.js";
import assert from "assert";

const todo: Todo = {
  name: "Learn TypeScript",
  priority: 3,
  isDone: false,
  deadline: new Date(2024, 9, 11, 9, 45),
};

// ここを編集
// const updatedTodo =

// todo と updatedTodo の参照が「異なること」を念のために確認
assert.notEqual(todo, updatedTodo);

// updatedTodo の内容を確認
printTodo(updatedTodo);
```

- **第16行目**の `assert` は、PG1の[第11回講義](https://takeshiwada1980.github.io/Programming1-2024/lecture11.html#アサート文)で学んだPythonの「アサート」と同じです。
    - `npm install` コマンドで追加しなくても標準で利用可能です。
    - `assert.notEqual(todo, updatedTodo)` は、`todo` と `updatedTodo` の参照が異なるときは何もせず、参照が同じときには例外 (Error) を発生させます。
- `utils/printTodo.ts` で定義している `printTodo` 関数について、**完了フラグ (**`isDone`**) の内容が表示されるようにアップデート** してください。

- 解答例は[こちら<i class="fa-solid fa-person-chalkboard"></i>](https://github.com/TakeshiWada1980/Programming3-2025/blob/main/docs/codes/03/prac2-01.ts)

## 配列

ここからは **配列 (Array)** と、その操作 (特に **イミュータブルな配列更新**) について学びます。

### 導入

[前回講義](lecture02.html#オブジェクトの型定義)で定義した `Todo` 型のような「**ユーザ定義型の配列**」は、Reactにおけるコアなデータとなります。また、その配列に対する操作 (`map`、`filter`、`sort` など) は、Reactによる画面描画と密接に関係してきます。

例えば、[Todoアプリ](https://takeshiwada1980.github.io/react-todo-app-demo/)に表示される次のような **コンポーネント (ウェブ画面構成の部品)** は...

![img](figs/03/app_01.png)

以下のような **Todo型の配列** (`Todo[]`) に基づいて描画されます。

```typescript{.numberLines caption="initTodos.ts (参考掲載です。現時点では動作しません。)"}
import type { Todo } from "./types.js";
import { v4 as uuid } from "uuid";

export const initTodos: Todo[] = [
  {
    id: uuid(),
    name: "Reactの勉強 (予習)",
    isDone: false,
    priority: 3,
    deadline: undefined,
  },
  {
    id: uuid(),
    name: "TypeScriptの勉強 (復習)",
    isDone: true,
    priority: 2,
    deadline: undefined,
  },
  {
    id: uuid(),
    name: "基礎物理学3の宿題",
    isDone: false,
    priority: 1,
    deadline: new Date(2024, 10, 11),
  },
  {
    id: uuid(),
    name: "解析2の宿題",
    isDone: true,
    priority: 1,
    deadline: new Date(2024, 10, 16, 17),
  },
];
```

そして、ウェブ画面上でのボタン押下などのユーザ操作を受けて、`todos` に要素の追加や削除をしたり、要素のプロパティを変更した `updatedTodos` を生成し、それをReactに渡すと、React側で再レンダリング (画面の更新) が実行されます。この際、Reactは <span class="masked">変更があった部分のみを検出して効率的に差分だけを再描画</span> をします。

ただし、ここで注意すべきは...

- 配列やその要素であるオブジェクトのプロパティの更新を、Reactが検知可能な形で `todos` から `updatedTodos` を生成する必要がある

...ということです。

### 型と宣言

まずは、シンプルに数値型や文字列型などの[プリミティブデータ](https://developer.mozilla.org/ja/docs/Glossary/Primitive)の「配列」から学んでいきます。TypeScript では、次のように C言語ライクに 配列 (Array) を宣言・初期化します。

```typescript{.numberLines caption="prac2-02.ts (配列の宣言と初期化)"}
// 配列の初期化 (型明示)
const numArr1: number[] = [4649, 3150, 0.5, -1];
const strArr1: string[] = ["M", "D", "E", "知能情報"];

// 配列の初期化 (型推論)
const numArr2 = [4649, 3150, 0.5, -1];
const strArr2 = ["M", "D", "E", "知能情報"];

// 空配列の初期化 (型明示が必ず必要)
const numArr3: number[] = [];
const strArr3: string[] = [];
```

配列を使用するときは、宣言時に <span class="masked">`number[]`</span> あるいは `Array<number>` のように「**型 (Type)**」を指示します。 どちらも同じ意味になりますが、一般には `xxx[]` の形式が使われます。

TypeScriptの配列は、**基本的に同じ型の値** を要素に持つような使い方をします。ただし、次のように型を `(number | string)[]` とすれば、<span class="masked">数値型または文字列型を要素に持つ配列</span> も可能です。

```typescript{.numberLines caption="数値型または文字列型を要素に持つ配列"}
// 「数値型」または「文字列型」を要素に持つ配列
const arr1: (number | string)[] = ["one", 2, 3];
```

### 参考: 要素の追加と削除 (ミュータブルな配列操作)

**React開発では基本的に使用することはありませんが**、ミュータブルな配列要素の「追加」と「削除」の例を示しておきます。このプログラムでは、配列が持つ `push`、`unshift`、`splice`、`pop` などのメソッドを使っていますが、<span class="masked">これらを本授業の範囲で使用する場面は (おそらく) ありません</span>。

```typescript{.numberLines caption="prac2-03.ts (Reactでは基本的に使用しないミュータブルな配列操作)"}
const numArr: number[] = [10, 11, 12, 13];
console.log("初期状態 => " + numArr);

numArr.push(14); // 末尾に要素を追加
numArr.unshift(9); // 先頭に要素を追加
console.log("先頭と末尾に要素を追加した後 => " + numArr);

// 2番目に要素(10.5)を挿入 ゼロオリジンに注意
numArr.splice(2, 0, 10.5);
console.log("2番目の位置に要素を挿入した後 => " + numArr);

numArr.pop(); // 末尾の要素を削除
console.log("末尾の要素を削除した後 => " + numArr);

// 4番目の要素を削除
numArr.splice(4, 1);
console.log("4番目の位置の要素を削除した後 => " + numArr);

```

実行結果は、次のようになります。

```
初期状態 => 10,11,12,13
先頭と末尾に要素を追加した後 => 9,10,11,12,13,14
2番目の位置に要素を挿入した後 => 9,10,10.5,11,12,13,14
末尾の要素を削除した後 => 9,10,10.5,11,12,13
4番目の位置の要素を削除した後 => 9,10,10.5,11,13
```

### 要素の追加 (イミュータブルな変更)

React開発では、`push` や `pop`、`splice` などのメソッドを**使用せず**に、**配列に対してイミュータブルな操作をすること** が要求されます。

配列に対する <span class="masked">要素の追加</span> に関しては、次のように「**スプレッド構文**」を利用してイミュータブルな操作 (=元の配列には変更を加えずに、「変更を適用した新しい配列」を生成すること) が可能です。


```typescript{.numberLines caption="prac2-04.ts"}
const numArr: number[] = [10, 11, 12, 13];
console.log("初期状態 => " + numArr);

// 末尾に要素を追加
const addedToEnd = [...numArr, 14]; // スプレッド構文
console.log("末尾に要素を追加 => " + addedToEnd);

// 先頭に要素を追加
const addedToStart = [9, ...numArr]; // スプレッド構文
console.log("先頭に要素を追加 => " + addedToStart);

// n番目の位置に要素 (10.5) を挿入
const n = 2;
const insertedAtN = [...numArr.slice(0, n), 10.5, ...numArr.slice(n)];
console.log(`${n}番目の位置に要素を挿入 => ` + insertedAtN);
```

**第14行目** では「配列の途中位置に要素を追加する例」を示していますが、実際の開発では、<span class="masked">末尾か先頭に要素を追加したうえで `sort()` メソッドを使って並び替えすること</span> が多いです。よって、特に覚えるべき処理は、**スプレッド構文を利用して「先頭」または「末尾」に要素を追加する処理** になります。

配列要素の「削除」については、後ほど解説する `filter()` メソッドを利用します。 

<div class="note type-tips">
**`splice` と `slice` の違い**

配列操作の `splice` メソッド と `slice` メソッドは機能と使用方法が異なるので注意してください。興味がある人は、生成AIを使用して調べてみてください。

**(プロンプト例)**

> JavaScriptの配列の `splice` メソッド と `slice` メソッドの違いをミュータブル、イミュータブルの観点から説明してください。
</div>

### map による要素の更新

モダンTypeScriptにおいて **イミュータブルに配列要素を更新** するためには、一般に <span class="masked">「アロー関数」と「map() メソッド」</span> を組み合わせて使用します。これは、プログラミング1 (Python) で学んだ「[ラムダ式](https://takeshiwada1980.github.io/Programming1-2024/lecture19.html#ラムダ式)と[map関数](https://takeshiwada1980.github.io/Programming1-2023/lecture19.html#mapとラムダ式の組み合わせ)の**組み合わせ**」に相当するものです。

例えば、「学年」を表す数値型の配列 `grade` から、HTML用に整形した文字列の配列 `gradeListItems` を得るためのイミュータブルな操作は、次のように記述できます。

```typescript{.numberLines caption="prac2-05.ts"}
const grades: number[] = [1, 2, 3, 4, 5]; // 学年

// ▼▼▼ ここから
const gradeListItems = grades.map((grade: number): string => {
  return `<li>${grade}年</li>`;
});
// ▲▲▲ ここまでが着目してほしいところ

console.log(grades);
console.log(gradeListItems);
```

実行結果は、次のようになります。配列の要素が `1` から `'<li>1年</li>'` のように変換されていること (mapされていること、射影されていること) が確認できると思います (特定の要素だけに変換を適用する方法については後述します)。

```
[ 1, 2, 3, 4, 5 ]
[
  '<li>1年</li>',
  '<li>2年</li>',
  '<li>3年</li>',
  '<li>4年</li>',
  '<li>5年</li>'
]
```

処理の本質は **第04行目**から**第06行目** になりますが初見で読み解くことは **かなり難しい** と思います。これを読み解き、理解するために「**レガシーな手続き型スタイルの配列操作**」から、上記のような「**モダンな宣言型スタイルの配列操作**」に書き換える例を以下に示します。

#### 第1形態 : レガシーな手続き型スタイル

まず、従来型の書き方をすれば、以下のようになります。既に皆さんは「C言語」を学んできているので、十分に読み解くことができると思います。

```typescript{.numberLines caption="prac2-06.ts (第1形態)"}
const grades: number[] = [1, 2, 3, 4, 5];
const gradeListItems: string[] = []; // 要素が空の配列
for (let i = 0; i < grades.length; i++) {
  const listItem = `<li>${grades[i]}年</li>`;
  gradeListItems.push(listItem); // 要素を追加
}
```

ここでは簡略化のために `export {};` と `console.log(...)` の部分は省略しています。実際に動作確認する際には、それらを追加して実行してください。

なお、配列は、`length` プロパティを持ち、それを通して配列の要素数を得ることができます。例えば、`const grades = [1, 2, 3, 4];` の `grades.length` は <span class="masked">4</span> となります。


#### 第2形態 : for...of に書き換え

`for` の**ループ変数**を「配列のインデックス`i`」から「配列の要素そのもの`grade`」に変えました。**第03行目** と **第04行目** を書き換えていますが、実行結果は先ほどと同じく期待する出力を得ることができます。

```typescript{.numberLines caption="prac2-06.ts (第2形態)"}
const grades: number[] = [1, 2, 3, 4, 5];
const gradeListItems: string[] = [];
for (const grade of grades) { // ■■ ここを書き換えた ■■ 
  const listItem = `<li>${grade}年</li>`; // ■■ ここを書き換えた ■■ 
  gradeListItems.push(listItem);
}
```

なお、`for (const grade of grades)` によって、ループ毎に変数 `grade` のなかには `1`、`2`、`3`… という値が格納されます。もし、**第01行目** で `const grades = [9, 1, 5]` としていれば、ループ変数である `grade`  には、ループ毎に `9`、`1`、`5` という値が格納されてfor文の内部の処理が実行されます。

Python で書けば `for grade in grades:` ですね ([参照](https://takeshiwada1980.github.io/Programming1-2023/lecture08.html#pythonicなリストとfor文の組み合わせ))。

#### 第3形態 : 変換処理の関数化

数値型の値 (例えば `3` ) を、整形された文字列型の値 (例えば `"<li>3年</li>"`) に変換するための処理を `func` として分離しました。また、**第08行目** で、それを `func(grade)` にように呼び出しています。

```typescript{.numberLines caption="prac2-06.ts (第3形態)"}
function func(grade: number): string {
  return `<li>${grade}年</li>`;
}

const grades: number[] = [1, 2, 3, 4, 5];
const gradeListItems: string[] = [];
for (const grade of grades) {
  gradeListItems.push(func(grade));
}
```

#### 第4形態 : アロー関数化

「function関数」を「アロー関数」に書き換えました。**第01行目** だけを書き換えました。

```typescript{.numberLines caption="prac2-06.ts  (第4形態)"}
const func = (grade: number): string => { // ■■ アロー関数化 ■■ 
  return `<li>${grade}年</li>`;
};

const grades: number[] = [1, 2, 3, 4, 5];
const gradeListItems: string[] = [];
for (const grade of grades) {
  gradeListItems.push(func(grade));
}
```

#### 第5形態 : mapメソッドの利用

`for` を使って実行していた処理を、`map` を使った処理に書き換えました。第4形態の **第06行目** から **第09行目** までの処理が、ここでは **第05行目** の「1文だけ」でスッキリと記述できています。


```typescript{.numberLines caption="prac2-06.ts (第5形態)"}
const func = (grade: number): string => {
  return `<li>${grade}年</li>`;
};

const grades: number[] = [1, 2, 3, 4, 5];
const gradeListItems = grades.map(func); // ■■ 注目 ■■ 
```

`map()` は **元の配列を変更せず**、配列の各要素に `func` を適用した「新しい配列」を作成して戻り値とします。これは、React開発で重要となってくる特性なので覚えておいてください。

#### 第6形態 : mapの引数に直接的にアロー関数を記述

第5形態では、<span class="masked">変数 `func`</span> を経由して、mapメソッドの引数に「整形の処理」を与えていました。それを、ここではアロー関数の形式で **直接的** に与えるように書き換えました。

```typescript{.numberLines caption="prac2-06.ts (第6形態)"}
const grades: number[] = [1, 2, 3, 4, 5];
const gradeListItems = grades.map((grade: number): string => {
  return `<li>${grade}年</li>`;
});
```

ここでは、整形処理をする関数に名前を与える必要がないこともうれしいですね（適切な名前を考えるのは面倒ですから…）。

ここまでで、最初に示したモダンスタイルな配列処理に変換が完了しました。

#### 第7形態 (省略形)

アロー関数のなかの処理が `return ...;` の1文だけで構成できる場合は、以下のように「**波括弧**」と「`retuen`」を省略して書くこともできます。

```typescript{.numberLines caption="prac2-06.ts (第7形態)"}
const grades: number[] = [1, 2, 3, 4, 5];
const gradeListItems = grades.map((grade: number): string => `<li>${grade}年</li>`
);
```

#### 第8形態 (型推論を利用)

型推論ができる場合は、型を省略することができます。

```typescript{.numberLines caption="prac2-06.ts (第8形態)"}
const grades: number[] = [1, 2, 3, 4, 5];
const gradeListItems = grades.map((grade) => `<li>${grade}年</li>`);
```

最終的には、次のように記述できます。


```typescript{.numberLines caption="prac2-06.ts (第8形態・全体)"}
const grades: number[] = [1, 2, 3, 4, 5];
const gradeListItems = grades.map((grade) => `<li>${grade}年</li>`);
console.log(grades);
console.log(gradeListItems);
```

実行結果は、次のようになります。

```
[ 1, 2, 3, 4, 5 ]
[
  '<li>1年</li>',
  '<li>2年</li>',
  '<li>3年</li>',
  '<li>4年</li>',
  '<li>5年</li>'
]
```

#### 演習②

**期待する結果**が得られるように、次のプログラムを完成させてください。ここでは優先度 (優先順位)「1」が「★★★」で、優先度 (優先順位)「3」が「★」になる点に注意してください。

- `map` を使用して実装することを意図しています。

```typescript{.numberLines caption="演習 (2) prac2-07.ts "}
const priorities = [3, 1, 2, 1]; // 1〜3の値が格納された配列

// ここの処理を完成させる
// const formattedPriorities = 

console.log(priorities);
console.log(formattedPriorities);
```

**期待する結果**

```
[ 3, 1, 2, 1 ]
[ '★', '★★★', '★★', '★★★' ]
```

- 解答例は[こちら<i class="fa-solid fa-person-chalkboard"></i>](https://github.com/TakeshiWada1980/Programming3-2025/blob/main/docs/codes/03/prac2-07.ts)

### 配列のインデックス番号の参照

次のプログラムの **第02行目** のように `map` に第2引数を設定すると、その変数には <span class="masked">ゼロオリジンのイデックス番号</span> が格納され、map内の処理で参照することができます。

```typescript{.numberLines caption="prac2-08.ts"}
const arr = ["Python", "C言語", "TypeScript", "C#"];
const arr2 = arr.map((value, index) => { // index の設定
  return `${index + 1}: ${value}`; // index の参照 (読み取り)
});
console.log(arr2);
```

実行結果は以下のようになります。

```
[ '1: Python', '2: C言語', '3: TypeScript', '4: C#' ]
```

## オブジェクト配列のmap操作

次にオブジェクトを要素とする配列の「map操作」について考えていきます。

- ここで扱う `map` や、次のセクションで扱う `filter` などの配列操作は、複数の処理をつなげて実行でき、このような書き方を <span class="masked">パイプライン処理</span> と呼びます。

### 準備 (型定義の変更)

ファイルが増えてきたので、仕切り直しします。次のように、`src` フォルダのなかに `pipeline` というサブフォルダを作成してください。

![img](figs/03/vscode_02.png)

そのなかに、以下のように数値型の `id` というプロパティを新た追加した `Todo` 型 (＝ユーザ定義のオブジェクト型) を定義した `types.ts` というファイルを作成してください。

```typescript{.numberLines caption="src/pipeline/types.ts"}
export type Todo = {
  id: number;
  name: string;
  priority: number;
  isDone: boolean;
  deadline: Date;
};
```

### オブジェクト型の配列の初期化

ユーザ定義のオブジェクト型を要素に持った **配列の初期化** は次のように行ないます。`src/pipeline` フォルダのなかに `initTodos.ts` というファイルを新規作成して以下の内容を記述してください。

```typescript{.numberLines caption="src/pipeline/initTodos.ts"}
import type { Todo } from "./types.ts";

export const initTodos: Todo[] = [
  {
    id: 1,
    name: "React予習（YouTube）",
    isDone: false,
    priority: 1,
    deadline: new Date(2024, 9, 24, 9, 0),
  },
  {
    id: 2,
    name: "TypeScriptの復習",
    isDone: true,
    priority: 2,
    deadline: new Date(2024, 9, 30),
  },
  {
    id: 3,
    name: "基礎物理学3の宿題",
    isDone: false,
    priority: 1,
    deadline: new Date(2024, 9, 20, 23, 59),
  },
  {
    id: 4,
    name: "知識科学概論の宿題",
    isDone: true,
    priority: 3,
    deadline: new Date(2024, 9, 27),
  },
];
```

`number` や `string` などのプリミティブ型の配列と同様に、オブジェクト型の配列についても型付きの変数の宣言は `Todo[]` あるいは `Array<Todo>` のようにします。また、初期化は、それに続けて `=[{...},{...},{...}]` の形式で行ないます。

**(プロンプト例)**

> TypeScriptにおける「プリミティブ型」とはなんですか。

### オブジェクト型の配列に対するmapの適用

ここでは、mapを使って「**Todo型のデータ**」を「**整形された文字列**」に変換する例を示します。`src/pipeline` のなかに `map01.ts` を新規作成して、以下のコードを貼付けてください。

ここでは、特に **第07行目** に着目して読解してください。

- **第10行目** では、前回講義で学習した[条件演算子 (三項演算子)](lecture02.html#条件演算子)を利用して、`isDone` が `true` のときだけ **【済】** の文字列が付加されるようにしています。
- **第07行目** では、定数 `const` を宣言していますが、この定数を経由せずに直接的に文字列を `return` しても問題ありません。つまり ``return `<li>...</li>`;`` のようにしても問題ありません 。さらに、先に解説したように「波括弧」と「`return`」を省略することも可能です (これらは可読性とのトレードオフになります)。

```typescript{.numberLines caption="src/pipeline/map01.ts"}
import type { Todo } from "./types.js";
import { initTodos } from "./initTodos.js";
import dayjs from "dayjs";

const dtFmt = "YYYY/MM/DD HH:mm";
const formattedTodos: string[] = initTodos.map((t: Todo) => {
  const str =
    `<li>[${t.id}] ${t.name} 優先度${t.priority} ` +
    `(期限${dayjs(t.deadline).format(dtFmt)})` +
    (t.isDone ? "【済】" : "") +
    "</li>";
  return str;
});

console.log(formattedTodos);
```

実行結果は、次のようになります。実際に実行して確認してください。

```
[
  '<li>[1] React予習（YouTube） 優先度1 (期限2024/10/24 09:00)</li>',
  '<li>[2] TypeScriptの復習 優先度2 (期限2024/10/30 00:00)【済】</li>',
  '<li>[3] 基礎物理学3の宿題 優先度1 (期限2024/10/20 23:59)</li>',
  '<li>[4] 知識科学概論の宿題 優先度3 (期限2024/10/27 00:00)【済】</li>'
]
```

この例では、Todo型の配列の要素を受け取る仮引数を `t` という名前にしていますが (**第06行目**を参照)、これは自由に名前を付けることが可能です。このケースでは `todo` のような名前にするのが一般的です。

プログラミング1の授業でも紹介しましたが、以下のようにVSCodeの機能で <span class="masked">変数名の一括変更</span> ができます。通常の一括置換では <span class="masked">コメント内の文字列</span> なども影響を受けますが、この機能では **変数のスコープ (有効範囲)** を識別して適切な置換が実行されます。

![img](figs/03/vscode_03.png)

実際に、VSCode の変数名の変更機能を使って、`t` を `todo` に変更してください。

### 任意の配列要素のプロパティの変更

オブジェクト配列のなかの「任意の配列要素」の「任意のプロパティ」を **イミュータブルに変更する方法** (＝その変更が React に適切に検知されるようにする方法) を解説します。

ここでは、`id` が `4` である Todo (知識科学概論の宿題) の `isDone` プロパティを `false` に変更するような操作を例に解説したいと思います。

#### NG: ミュータブルな操作

まずはNGな変更操作から確認していきます。次のプログラムの **第11行目** から **第16行目** までの処理は、**React開発ではNGなミュータブルな操作** となります。

コンソール出力から確認できるように内部データとしては、`id` が `4` の「知識科学概論の宿題」の `isDone` は `false` に変更されていますが、このような操作ではReactで管理・描画されるウェブ画面上の表示は変更されません (Reactでのハマりポイントです)。

```typescript{.numberLines caption="src/pipeline/map02.ts (NGな配列要素の更新操作)"}
import { initTodos } from "./initTodos.js";

console.log("プロパティ変更前");
console.log(JSON.stringify(initTodos, null, 2));
// React の useState の更新関数
// setTodos(initTodos);

// NGなプロパティ変更
const targetId = 4; // isDone を false に戻す対象
for (const todo of initTodos) {
  if (todo.id === targetId) {
    todo.isDone = false;
    break;
  }
}
console.log("プロパティ変更後");
console.log(JSON.stringify(initTodos, null, 2));
// React の useState の更新関数
// setTodos(initTodos);
```

プログラムのなかでコメントアウトしている `setTodos(initTodos)` は、実際に React で状態管理をするときに使用するものです。このような関数を通してReactにデータを渡します。現時点では理解する必要はありません。

#### OK: イミュータブルな操作

Reactで**画面の再レンダリングがトリガーされるようにするため**には、次のように `map` を使って **配列を新しく作成する** (=配列の参照を新しくすることでReactに変更を検知してもらう) と共に、**スプレッド構文で操作対象のオブジェクトも新しく作成する** (=オブジェクトの参照を新しくすることでReactに変更を検知してもらう) 必要があります。

```typescript{.numberLines caption="src/pipeline/map03.ts (推奨される配列要素の更新操作)"}
import { initTodos } from "./initTodos.js";

console.log("プロパティ変更前");
console.log(JSON.stringify(initTodos, null, 2));
// React の useState の更新関数
// setTodos(initTodos);

// 推奨されるプロパティ変更
const targetId = 4;
const updatedTodos = initTodos.map((todo) => { // mapメソッドを利用
  if (todo.id === targetId) {
    return { ...todo, isDone: false }; // スプレッド構文を利用
  } else {
    return todo;
  }
});
console.log("プロパティ変更後");
console.log(JSON.stringify(updatedTodos, null, 2));
// React の useState の更新関数
// setTodos(updatedTodos);
```

また、上記のプログラムは[条件演算子(三項演算子)](lecture02.html#三項演算子)を使用して、以下のように記述することができます。

```typescript{.numberLines caption="src/pipeline/map04.ts (推奨される配列要素の更新操作・条件演算子)"}
import { initTodos } from "./initTodos.js";

console.log("プロパティ変更前");
console.log(JSON.stringify(initTodos, null, 2));
// React の useState の更新関数
// setTodos(initTodos);

const targetId = 4;
const updatedTodos = initTodos.map((todo) => {
  return todo.id === targetId ? { ...todo, isDone: false } : todo; // 条件演算子
});
console.log("プロパティ変更後");
console.log(JSON.stringify(updatedTodos, null, 2));
// React の useState の更新関数
// setTodos(updatedTodos);
```

#### 演習③

`targetId` で指定された Todo について `name` のプロパティを **イミュータブルに変更** するように、次のプログラムを完成させてください。

```typescript{.numberLines caption="演習 (3) src/pipeline/map05.ts"}
import { Todo } from "./types";
import { initTodos } from "./initTodos";

const targetId = 3;
const newName = "電気電子回路1の課題";
const updatedTodos: Todo[] = [];

console.log(JSON.stringify(updatedTodos, null, 2));
```

- 解答例は[こちら<i class="fa-solid fa-person-chalkboard"></i>](https://github.com/TakeshiWada1980/Programming3-2025/blob/main/docs/codes/03/map05.ts)

## オブジェクト配列のfilter操作 

配列の `map` メソッドは **引数として関数を受け取り** 、配列の各要素にその関数を適用した「新しい配列」を作成して戻り値としました。これに対して `filter` メソッドは `map` と同様に**引数として関数を受け取り**ますが、こちらは<span class="masked">その関数に配列の各要素を適用した結果が `true` になる要素</span> から構成される「新しい配列」を作成して戻り値とします。

![img](figs/03/array_01.png)

### filterメソッドの基本的な使用法

filter メソッドは、配列の**各要素に対して条件**（=<span class="masked">真偽値を戻り値とする関数</span>）を適用し、その条件を満たす要素だけを含む「新しい配列」を返す機能を持っています。`map` と同様に元の配列は影響を受けません。

例えば、次のように使用します。

```typescript{.numberLines caption="src/pipeline/filter01.ts (filterの使用例)"}
const numArr: number[] = [1, 2, 3, 4, 5, 6];
const oddArr: number[] = numArr.filter((num) => {
  return num % 2 === 1; // 奇数か? ture or false
});
console.log(`numArr = ${numArr}`);
console.log(`oddArr = ${oddArr}`);
```

**第02行目**から**第04行目**は <span class="masked">`const oddArr = numArr.filter(num => num % 2 === 1);`</span> のような **省略表記** もできます。

実行結果は次のようになります。アロー関数で与えた関数による評価結果が `true` の要素だけが出力されていることが確認できます。

```
numArr = 1,2,3,4,5,6
oddArr = 1,3,5
```

なお、`numArr.filter(...)` の戻り値が <span class="masked">`[true, false, true, false, true, false]`</span> になるわけ**ではない**ので注意してください (逆に、このような配列を得たいときは <span class="masked">`map` メソッド</span> を使用してください)。

### オブジェクト型の配列に対するfilterの適用

`Todo` 型の配列である`initTodos` から「`isDone` **が** `false` **の要素だけを抽出した配列**」を得る処理は (=これは <span class="masked">`isDone` が `true` の要素を「削除」した配列を得る処理</span> と同義) は、`filter` を使って、次のように実装できます。

```typescript{.numberLines caption="src/pipeline/filter02.ts (未完了タスク (=isDobeが「false」の要素)の抽出)"}
import { initTodos } from "./initTodos.js";

const updatedTodos = initTodos.filter((todo) => !todo.isDone);
console.log("未完了Todoの一覧");
console.log(JSON.stringify(updatedTodos, null, 2));
```

推測がつくと思いますが、上記の **第03行目** の `!todo.isDone` の `!` は 真偽値の **論理否定演算子** です。つまり、`todo.isDone` が `false` のとき、`!todo.isDone` は <span>`true`</span> となりフィルタを通過します。

また「**任意の** `id` **を持った要素を配列から**「**削除**」**する処理**」も `filter` を利用して、次のように実装が可能です。

```typescript{.numberLines caption="src/pipeline/filter03.ts"}
import { initTodos } from "./initTodos.js";

const targetId = 2; // 削除対象のTodoのID
const updatedTodos = initTodos.filter((todo) => todo.id !== targetId);
console.log("削除処理後のTodoの一覧");
console.log(JSON.stringify(updatedTodos, null, 2));
```

#### 演習④

Todoオブジェクトの配列のなかで「**未完了**」かつ「**期日 (**`deadline`**) が **`today` **を過ぎている**」に一致する要素を `overdueTodos` に得るように、次のプログラムを完成させてください。

なお、適切な動作検証ができるように `initTodos` を適当に変更してください。

```typescript{.numberLines caption="演習 (4) src/pipeline/filter04.ts"}
import type { Todo } from "./types.js";
import { initTodos } from "./initTodos.js";

const today = new Date(2024, 9, 22);
const overdueTodos: Todo[] = []; // 主にここを書き換え
console.log("期日を過ぎている未完了Todoの一覧");
console.log(JSON.stringify(overdueTodos, null, 2));
```

- 解答例は[こちら<i class="fa-solid fa-person-chalkboard"></i>](https://github.com/TakeshiWada1980/Programming3-2025/blob/main/docs/codes/03/filter04.ts)

## オブジェクト配列のsort操作 

イミュータブルに配列のソート (並び替え) を行なうためには <span class="masked">スプレッド構文</span> と `sort` メソッドを組みあわせて使用します。

### ソートキーを指定したオブジェクト配列の並び替え

オブジェクト配列の並び替えるには、`sort`メソッドの引数に <span class="masked">ソートに使用するプロパティを使った「比較関数」</span> を与える必要があります。例えば、Todo を **優先度** (**優先順位**) の「昇順」にソートする処理は次のように実装できます。

```typescript{.numberLines caption="src/pipeline/sort01.ts (優先度で並び替え)"}
import { initTodos } from "./initTodos.js";

const sortedTodos = [...initTodos].sort((a, b) => {
  return a.priority - b.priority;
});

console.log(JSON.stringify(initTodos, null, 2));
console.log(JSON.stringify(sortedTodos, null, 2));
```

実際に実行して、結果を確認してください (特に `iniTodos` の並び順は影響を受けていないことを確認してください)。

また、**第03行目** の `[...initTodos].sort` を `initTodos.sort` に変更すると <span class="masked">ミュータブルな操作になってしまうこと (つまり `initTodos` が変更されてしまうこと)</span> を実際に確認してください。

`sort` の引数には、配列の要素となっている型 (ここでは `Todo` 型) の2つの引数 (通常 `a` と `b` という名前にすることが多い) を受け取り「**負数** (通常は `-1`)」、「`0`」、「**正数** (通常は `1`)」を返す関数を与えます。この関数は・・・

- 要素 `a` を、要素 `b` よりも「**前**」に並べたいときは `-1` を返すようにします。
- 要素 `a` を、要素 `b` よりも「**後**」に並べたいときは `1` を返すようにします。
- それ以外のとき (両者の順序が同じとき) は `0` を返すようにします。

一般に、この関数は「**比較関数**」や「**カスタム比較関数**」と呼ばれます。

#### 演習

Todo を **優先度** (**優先順位**) の「降順」にソートする処理を実装してください。また、動作を確認してください。

### 複数のソートキーを使ったオブジェクト配列の並び替え

第1ソートキーを `isDone` (**未完了を先に表示**)、第2ソートキーを `deadline` として並び替えたいときは、以下のように実装します。

```typescript{.numberLines caption="src/pipeline/sort02.ts (完了・未完了、期限で並び替え)"}
import type { Todo } from "./types.js";
import { initTodos } from "./initTodos.js";

const sortedTodos: Todo[] = [...initTodos].sort((a, b) => {
  if (a.isDone !== b.isDone) {
    return a.isDone ? 1 : -1;
  } else {
    return a.deadline.getTime() - b.deadline.getTime();
  }
});

console.log(JSON.stringify(initTodos, null, 2));
console.log(JSON.stringify(sortedTodos, null, 2));
```

**第05-06行目** で「`a` と `b` の `isDone` が**違う**」ならば `isDone` が `false` のほうを「前」に配置するようにしています。また、**第07-08行目** で「`a` と `b` の `isDone` が**同じ**」ならば `deadline` が過去のほう (古いほう) のほうを「前」に配置するようにしています。

#### 演習

第1ソートキーを「優先度」、第2ソートキーを「期限」として `Todos` を並び替えるように実装してください。また、動作を確認してください (必要に応じて `initTodos` に編集を加えてください)。

## メソッドチェーン (map・filter・sortの組み合わせ)

`map` と `filter` と `sort` を **連結して使用すること** も可能なので知っておいてください (実務では頻繁に利用されます)。

例えば、`filter` で**未完了のTodoだけを抽出**し、`sort` で**優先度順に並べ替え**て、`map` で**整形出力**するという処理は次のように記述できます。このようにメソッドを連結する技法を <span class="masked">メソッドチェーン や メソッドチェイニング</span> のように表現します。

なお、`sort` がメソッドチェーンの開始点でなければ、**スプレッド構文を使用せずとも** `initTodos` **に対するイミュータブルな操作**となります。もし、`sort` をメソッドチェーンの開始点にする場合は <span class="masked">`[...initTodos].sort()` のようにスプレッド構文を組み合わせて使用</span> してください。

```typescript{.numberLines caption="src/pipeline/pipe01.ts (メソッドチェーン)"}
import dayjs from "dayjs";
import { initTodos } from "./initTodos.js";
const dtFmt = "YYYY/MM/DD HH:mm";

const listItemsTodos: string[] = initTodos
  .filter((todo) => !todo.isDone)
  .sort((a, b) => a.priority - b.priority)
  .map(
    (todo) =>
      `<li>優先度[${todo.priority}] ${todo.name}` +
      `...期限${dayjs(todo.deadline).format(dtFmt)}</li>`
  );
console.log(JSON.stringify(initTodos, null, 2)); // 変更操作の影響を受けていない
console.log(JSON.stringify(listItemsTodos, null, 2));
```

実際に上記のプログラムを実行して、出力を確認してください (必要に応じて `initTodos` に編集を加えてください)。

### 関数化

`map`、`filter`、`sort` などの配列操作メソッドは、各種処理をコンパクトに記述することが可能です。ただし、同じ配列操作を2回以上行なうときは、それらの処理を**関数化すること**が推奨されます。

以下のプログラムは...

- オブジェクト配列 (`Todo[]`) から `id` をキーとして要素を削除した配列を戻り値とする `deleteTodoById` 関数
  - **第06行目** から **第11行目** 
- オブジェクト配列を受け取って、HTMLに整形した文字列配列を戻り値にする `stringifyTodos` 関数
  - **第13行目** から **第18行目** 

...の実装例となります。

```typescript{.numberLines caption="src/pipeline/pipe02.ts"}
import dayjs from "dayjs";
import type { Todo } from "./types.js";
import { initTodos } from "./initTodos.js";
const dtFmt = "YYYY/MM/DD HH:mm";

const deleteTodoById = (todos: Todo[], id: number): Todo[] => {
  if (!Number.isInteger(id) || id < 0) {
    return todos;
  }
  return todos.filter((todo) => todo.id !== id);
};

const stringifyTodos = (todos: Todo[]): string[] =>
  todos.map(
    (todo) =>
      `id=${todo.id} ${todo.name} ` +
      `期限 ${dayjs(todo.deadline).format(dtFmt)}`
  );

const todo = [...initTodos];
const updatedTodos = deleteTodoById(todo, 2);

console.log("Before:", stringifyTodos(todo));
console.log("After:", stringifyTodos(updatedTodos));
```

慣れるまでは、上記のような関数処理を読み解くことも、記述することも大変かと思います。しかし、React開発では、状態（state）の更新や、コンポーネントの再レンダリングを効率的に行うために **頻繁に配列操作メソッドが使用されます**。

はじめのうちは超難しく感じるかもしれませんが、継続的な学習と実践により、徐々に理解が深まり、効率的なコードを書けるようになります。頑張ってください (1回で理解できることは、まず、**あ・り・ま・せ・ん**。1日か2日の間隔を空けて3回ほどトライすると、ぼんやりと分かってくるようになります)。


**(プロンプト例)**

> React開発のための準備として、TypeScriptにおける配列操作メソッド (`map`、`filter`、`sort`) の読解と記述について十分に慣れておきたいと思っています。オブジェクトの配列を対象とした配列操作メソッドに関する練習問題と解答例を作成してください。まずは、初歩の初歩、超簡単なものからお願いします。

## 宿題

次回から **本格的なReact開発** に突入します🎉

予習として以下の動画 (約1時間) を視聴してきてほしいです。動画を事前視聴しておくことで (=「何が分からないか」を自覚しておくことで) 授業での理解が格段に進みます。

-  [【React入門】完全初心者OK！1から簡単なTodoアプリを作ってReactの1歩を踏み出してみよう ～Reactチュートリアル～](https://www.youtube.com/watch?v=nRCNL9T3J98)
    - 残念ながら、現在では動画のとおりに作業しても Todoアプリ を作成することができません (動画のなかで使用している `create-react-app` というフロントエンドビルドツールが既に提供されなくなっていたり、こまかな React の挙動が変わっているため)。一方で、全体的な流れや、Reactの設計思想 (考え方) は現在も変わっていませんので、それを掴んでもらえればと思います。