---
var:
  header-title: "2026-3I プログラミング3 第05回 講義資料"
  header-date: "2026年10月23日（金）1時限"
---

# 第05回 3I-プログラミング3

## 連絡

### 初回授業から現在までの授業の流れ

1. モダンTypeScript基礎学習のための環境構築 ***済***
2. TypeScript基礎学習 ***済***
    - **<u>React / Next.js 開発に関連する文法や機能だけを集中的に学びます</u>**。
3. React を用いた「Todoアプリ」開発のための環境構築 ***済***
4. Todoアプリの設計・実装 (Reactによるフロントエンド) のチュートリアル ← <font color="deeppink"><b>前回と今回</b></font>
5. Todoアプリのカスタマイズや作り込み → 📝[課題1](#課題1)〔<u>**11/19 18:00** 〆切</u>〕
    - 参考: [2025年度の学生作品](https://omunet-my.sharepoint.com/:t:/g/personal/z21707r_omu_ac_jp/IQC1PJskZdyCSZ8tH_0DUchyAWpzGP7ILbgQAaEtJ39a7M4?e=lUsZM5) (学内のみ)
    - 参考: [2024年度の学生作品](https://omunet-my.sharepoint.com/:t:/g/personal/z21707r_omu_ac_jp/ET7-SWbLKVlBvtsv3v5guw0BvXiUlGzUqjCKk6ES6X88-w) (学内のみ)

## 今回の到達目標

- React の「状態」をイミュータブルに更新し、Todo の追加・完了切り替え・削除を実装できる。
- 入力欄と「状態」を対応付け、名前・優先度・期限などの入力とバリデーションを実装できる。
- 親子コンポーネント間で、データや関数を **Props** として受け渡す仕組みを理解し、実装できる。

::: prompts
- React における Props とは何ですか。「親子コンポーネント間でデータや関数を受け渡す仕組み」と言われたのですが、まったくイメージが掴めません。詳しいことは、あとで学ぶらしいので、まずはイメージを掴みたいです。情報系の高専3年でもわかるように簡単に解説してください。
:::

今回の学習を最後まで進めると、以下に示す基本的な機能を備えた Todo アプリについて、その仕組みを理解し、自分で実装・デプロイできるようになります。難易度は高めです (標準で 6 時間は必要とする内容です)。

![img](figs/05/app_30.png)

## 前回の「つづき」から取り組むための準備と確認

前回講義の [Todoアプリの実装](lecture04.html#todoアプリの実装) のセクションでは、**Todoオブジェクトの配列** を `useState` で管理し、`map` を使って一覧を表示するところまで取り組みました。今回の内容は、<u>**そこまでの内容を理解したうえで実装できていることを前提とします**</u>。


今回は、そこに **追加・更新・削除の操作** を実装していきます。前回準備したライブラリと、**src/types.ts** の `Todo` 型は、そのまま利用していきます。

まず、**src/App.tsx** が次の状態になっていることを確認してください。前回の動作確認で追加した `console.log` は、ここでは削除しています。**WelcomeMessage コンポーネントには、現在の `todos` から数えた未完了件数を渡す** 点も確認してください。

<!-- code-source: docs/codes/05/step00/App.tsx#L1-L26 -->

```ts{.numberLines caption="src/App.tsx"}
import { useState } from "react";
import type { Todo } from "./types";
import { initTodos } from "./initTodos";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./TodoList";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initTodos);

  const uncompletedCount = todos.filter((todo) => !todo.isDone).length;

  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-4 text-2xl font-bold">TodoApp</h1>
      <div className="mb-4">
        <WelcomeMessage
          name="寝屋川タヌキ"
          uncompletedCount={uncompletedCount}
        />
      </div>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
```

前回の宿題で一覧をカスタマイズした人は、現在のファイルをプロジェクトの外にコピーするなどして退避しておいてください。今回の操作を順番に確かめたいときは、次の確認用コードを使ってください。リンク先のコードは、リンクに付けた名前のファイルに保存します。

- [App.tsx](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/05/step00/App.tsx)、[TodoList.tsx](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/05/step00/TodoList.tsx)、[WelcomeMessage.tsx](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/05/step00/WelcomeMessage.tsx)
- [types.ts](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/05/step00/types.ts)、[initTodos.ts](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/05/step00/initTodos.ts)

確認用の初期データは、期限あり・なし、完了・未完了を試せる 4 件にしています。**src/initTodos.ts** だけを差し替えることもできます。

::: {.note .type-caution}
**一覧の並び替えについて**

前回の[並び替え演習](lecture04.html#演習-3)を実装している場合は、**src/TodoList.tsx** の `const todos = ...;` を、一旦 `const todos = props.todos;` に戻してください。ここからは「新規タスクが配列の末尾に追加されたこと」を画面でも確かめながら進めます。
:::

VSCode のターミナルで `npm run dev` を実行し、Todo の一覧が表示されることを確認してください。以下の実装例は、各段階で **変更するファイルだけ** を用意しています。ファイルの配置に迷ったときや、自分のコードと比べたいときに利用してください。

## 新規タスクの追加

現在の Todo リストに「**新しいタスクを追加する処理**」を実装します。まずは、名前・優先度・期限をコード内で決めた Todo を追加できるようにします。入力欄は、このあと順番に実装していきます。

### 追加ボタンとイベントハンドラ

**src/App.tsx** を次のように書き換えてください。`uuid` と `twMerge` は、前回インストールしたライブラリからインポートしています。

<!-- code-source: docs/codes/05/step01/App.tsx#L1-L56 -->

```ts{.numberLines caption="src/App.tsx"}
import { useState } from "react";
import type { Todo } from "./types";
import { initTodos } from "./initTodos";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";
import { twMerge } from "tailwind-merge";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initTodos);

  const uncompletedCount = todos.filter((todo) => !todo.isDone).length;

  const addNewTodo = () => {
    const newTodo: Todo = {
      id: uuid(),
      name: "新しいタスク",
      isDone: false,
      priority: 3,
      deadline: new Date(2026, 10, 13),
    };
    setTodos((currentTodos) => [...currentTodos, newTodo]);
  };

  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-4 text-2xl font-bold">TodoApp</h1>
      <div className="mb-4">
        <WelcomeMessage
          name="寝屋川タヌキ"
          uncompletedCount={uncompletedCount}
        />
      </div>
      <TodoList todos={todos} />

      <div className="mt-4 space-y-2 rounded-md border border-slate-300 bg-white p-3 drop-shadow">
        <h2 id="newTodoHeading" className="text-lg font-bold">
          新しいタスクの追加
        </h2>

        <button
          type="button"
          onClick={addNewTodo}
          className={twMerge(
            "cursor-pointer rounded-md px-3 py-1",
            "bg-indigo-500 font-bold text-white hover:bg-indigo-600",
          )}
        >
          追加
        </button>
      </div>
    </div>
  );
};

export default App;
```

「追加」ボタンの `onClick={addNewTodo}` により、ボタンが押下されたときに `addNewTodo` がコールされます。このように、**クリックなどのイベントが発生したときに実行する関数** を <span class="masked">イベントハンドラ</span> といいます。

`onClick` に渡すのは <span class="masked">関数そのもの</span> です。`onClick={addNewTodo()}` と書くと、ボタンが押下されるのを待たず、JSX をつくっているときに関数を実行してしまいます。両者の違いを説明できるようにしておいてください。

::: prompts
- TypeScript 環境の React で Todo アプリを開発しています。ボタンを押したときに、引数なしの addNewTodo 関数を実行したいです。なぜ `onClick={addNewTodo}` と書き、`onClick={addNewTodo()}` とは書かないのですか。関数を渡すことと、関数を実行することの違いを短い例で説明してください。
:::

### 前の状態から次の状態をつくる

`addNewTodo` では、最初に `newTodo` を生成しています。`id` は `uuid()` で生成し、「未完了」「優先度 3」「2026 年 11 月 13 日を期限」としています。`new Date(2026, 10, 13)` の月が `10` なのは、[Date の月は 0 から数える](lecture02.html#解説-月-month-の扱いについて)ためでした。

つづいて、次の行で状態を更新しています。

<!-- code-source: docs/codes/05/step01/App.tsx#L22-L22 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=22}
setTodos((currentTodos) => [...currentTodos, newTodo]);
```

前回は、カウントアップの際に `setCount(count + 1)` のように、**次の値そのもの** を更新用の関数に渡しました。今回は、<span class="masked">前の状態を受け取り、次の状態を返す関数</span> を渡しています。

- `currentTodos` には、React がこの更新を処理する時点の配列が渡されます。
- `[...currentTodos, newTodo]` で、末尾に `newTodo` を加えた **新しい配列** をつくって返します。
- 返した配列が、次の `todos` になります。

このような関数を **updater 関数** といいます。名前は `currentTodos` でなければならないわけではありません。この講義では、更新前の配列を表す名前として使っていきます。

::: {.note .type-tips}
`setTodos([...todos, newTodo])` という書き方でも、今回のような単独の追加操作は実装できます。ここでは、**前の状態を基に次の状態をつくる更新** を、追加・完了切り替え・削除で共通の書き方にそろえています。

なお、updater 関数のなかでは、元の配列を書き換えずに次の配列を返してください。`uuid()` による ID の生成も、ここで示したように updater 関数の外で行ないます。
:::

### 動作確認と演習

保存後、「追加」ボタンを何度か押下してください。**一覧の末尾に「新しいタスク」が追加され、未完了件数も増えること** を確認してください。

![Todo の追加](figs/05/app_02.png)

ここまでの実装例: [src/App.tsx](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/05/step01/App.tsx)

#### 演習 <i class="fa-solid fa-stopwatch"></i>3分

新規タスクを、配列の「末尾」ではなく「先頭」に追加するように変更してください。

- 答え: <span class="masked">`setTodos((currentTodos) => [newTodo, ...currentTodos]);`</span>

画面上の追加位置が変わることを確認したら、末尾に追加する実装に戻しておいてください。

### NG: Todos 配列に対するミュータブルな操作

第 03 回に学んだ[ミュータブルな配列操作](lecture03.html#参考-要素の追加と削除-ミュータブルな配列操作)を使うと、何が問題になるのか実験しておきます。**addNewTodo 関数だけ** を、一時的に次のように書き換えてください。

```ts{.numberLines caption="src/App.tsx（実験用・NG な追加処理）"}
const addNewTodo = () => {
  const newTodo: Todo = {
    id: uuid(),
    name: "新しいタスク",
    isDone: false,
    priority: 3,
    deadline: new Date(2026, 10, 13),
  };
  todos.push(newTodo);
  setTodos(todos);
  console.log(JSON.stringify(todos, null, 2));
};
```

「追加」ボタンを押下すると、デベロッパーツール (`F12`) のコンソールには、タスクが追加された配列が出力されます。しかし、<span class="masked">画面の一覧と未完了件数は更新されません</span>。

![ミュータブルな操作の確認](figs/05/app_01.png)

`push` は元の配列を変更します。その配列を `setTodos` に渡しても、**前の状態と同じ参照の配列** なので、React は状態が変わっていないと判断して画面の更新を省略します。配列の内容が変わったかどうかを、React が隅々まで調べてくれるわけではありません。

実験後は、`push` と実験用の `console.log` を削除し、スプレッド構文を使った updater 関数の実装に戻してください。**ブラウザも一度リロードして、実験で直接変更した配列を初期状態に戻しておいてください**。

#### 定着確認

- React のボタンで、クリック時に関数 `addNewTodo` を実行したい。`onClick={addNewTodo}` と `onClick={addNewTodo()}` のうち、適切なほうを答えよ。
  - 答え: <span class="masked">`onClick={addNewTodo}`。関数そのものをイベントハンドラとして渡す。</span>
- React の状態である配列 `todos` に対し、`todos.push(newTodo); setTodos(todos);` と書く問題点を説明せよ。
  - 答え: <span class="masked">元の配列を直接変更し、同じ参照を更新用の関数に渡している。新しい配列を渡す更新になっていない。</span>
- `setTodos((currentTodos) => [...currentTodos, newTodo]);` の `currentTodos` と、アロー関数の戻り値が何を表すか答えよ。
  - 答え: <span class="masked">`currentTodos` は更新を処理する時点の配列。戻り値は、末尾に `newTodo` を追加した次の状態の配列。</span>

## 新規タスクの名前設定テキストボックスの追加

つづいて、新規タスクの名前を設定する「**テキストボックス**」を追加します。前回の `useState` を使い、入力された文字列を状態として扱います。

![名前入力欄](figs/05/app_03.png)

### 入力文字列を状態にする

**src/App.tsx** の `App` 関数内で、`todos` の状態の直後に次の行を追加してください。

<!-- code-source: docs/codes/05/step02/App.tsx#L12-L12 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=12}
const [newTodoName, setNewTodoName] = useState("");
```

初期値は空文字 `""` です。ここでは初期値から `string` と型推論されるため、`useState<string>("")` のような型指定を省略しています。

また、ファイルの先頭に型のインポートを追加してください。

<!-- code-source: docs/codes/05/step02/App.tsx#L2-L2 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=2}
import type { ChangeEvent } from "react";
```

`ChangeEvent` は、入力欄の変更イベントを扱うための **型** です。型だけのインポートなので `import type` を使います。

次の `updateNewTodoName` 関数を、`App` 関数内の `addNewTodo` より前に追加してください。

<!-- code-source: docs/codes/05/step02/App.tsx#L16-L18 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=16}
const updateNewTodoName = (e: ChangeEvent<HTMLInputElement>) => {
  setNewTodoName(e.target.value);
};
```

`e` には、イベントに関する情報が渡されます。`ChangeEvent<HTMLInputElement>` の型注釈は、**HTML の input 要素に対する変更イベント** を受け取ることを表しています。`e.target.value` で、入力欄の現在の文字列を取得できます。

### 入力欄と状態を対応付ける

JSX の「新しいタスクの追加」という見出しと「追加」ボタンの間に、次のコードを挿入してください。

<!-- code-source: docs/codes/05/step02/App.tsx#L48-L61 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=48}
<div className="flex items-center space-x-2">
  <label className="font-bold" htmlFor="newTodoName">
    名前
  </label>
  <input
    id="newTodoName"
    name="todoName"
    type="text"
    value={newTodoName}
    onChange={updateNewTodoName}
    className="min-w-0 grow rounded-md border border-gray-300 p-2"
    placeholder="タスクの名前を入力してください"
  />
</div>
```

ここでは、値が反映される方向を区別して理解してください。

- `value={newTodoName}` は、**状態 → 入力欄** の反映です。
- `onChange={updateNewTodoName}` は、**入力操作 → 状態の更新** を担当します。

React の状態を値の基準にして、このように入力を扱うものを <span class="masked">制御された入力（controlled input）</span> といいます。`value` だけを指定しても、ユーザーの編集結果は状態に反映されません。必ず `onChange` と組み合わせてください。

また、`label` の `htmlFor="newTodoName"` と `input` の `id="newTodoName"` が対応しています。「名前」というラベルをクリックすると、入力欄がアクティブになることも確認してください。

![ラベルと入力欄の対応](figs/05/app_06.png)

### 入力した名前で追加する

最後に、`addNewTodo` を次のように書き換えてください。`newTodo` の `name` に状態 `newTodoName` を設定し、追加後は `setNewTodoName("")` で入力欄を空に戻します。

<!-- code-source: docs/codes/05/step02/App.tsx#L20-L30 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=20}
const addNewTodo = () => {
  const newTodo: Todo = {
    id: uuid(),
    name: newTodoName,
    isDone: false,
    priority: 3,
    deadline: new Date(2026, 10, 13),
  };
  setTodos((currentTodos) => [...currentTodos, newTodo]);
  setNewTodoName("");
};
```

名前を入力してから「追加」ボタンを押下し、**入力した名前の Todo が追加され、入力欄が空になること** を確認してください。この段階では、空欄でも追加できてしまいます。この点は、あとの[バリデーション](#バリデーション)で改善します。

ここまでの実装例: [src/App.tsx](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/05/step02/App.tsx)

::: prompts
- React + TypeScript で `const [newTodoName, setNewTodoName] = useState("");` とし、input に `value={newTodoName}` と `onChange={updateNewTodoName}` を設定しています。文字を入力してから画面に反映されるまでの流れを説明してください。また、追加後に `setNewTodoName("")` とするとなぜ入力欄も空になるのですか。
- TypeScript で、App 関数のなかに定義した addNewTodo 関数から、App 関数の変数 newTodoName を参照できました。このような関数と外側の変数の関係を、クロージャという用語と関連付けて説明してください。Python の短い例も示してください。
:::

#### 演習 <i class="fa-solid fa-stopwatch"></i>3分

名前の入力欄の `className` から `grow` を取り除き、入力欄の幅がどのように変化するか確認してください。確認後は元に戻しておいてください。

#### 定着確認

- React の input に設定する `value` と `onChange` は、それぞれ何を担当するか答えよ。
  - 答え: <span class="masked">`value` は状態を入力欄に反映し、`onChange` はユーザーによる変更を受けて状態を更新する。</span>
- React の input と label を対応付ける場合、input の `id` と同じ値を設定する label の属性を答えよ。
  - 答え: <span class="masked">`htmlFor`。</span>
- `useState("")` で生成した状態の型と、初期値を答えよ。
  - 答え: <span class="masked">型は `string`、初期値は空文字 `""`。</span>

## 優先度を設定するラジオボタンの追加

新規タスクの優先度を `1`・`2`・`3` から選ぶ「**ラジオボタン**」を追加します。名前入力と同様に、優先度も状態として扱います。

![優先度の選択](figs/05/app_04.png)

**src/App.tsx** の `newTodoName` の状態の直後に、次の行を追加してください。初期値は `3` です。

<!-- code-source: docs/codes/05/step03/App.tsx#L13-L13 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=13}
const [newTodoPriority, setNewTodoPriority] = useState(3);
```

つづいて、`App` 関数内の `addNewTodo` より前に、次の関数を追加してください。

<!-- code-source: docs/codes/05/step03/App.tsx#L21-L23 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=21}
const updateNewTodoPriority = (e: ChangeEvent<HTMLInputElement>) => {
  setNewTodoPriority(Number(e.target.value));
};
```

`e.target.value` は、`type="radio"` の入力欄でも <span class="masked">文字列</span> です。`newTodoPriority` は数値の状態なので、`Number` で変換してからセットしています。

**文字列のままセットしようとすると型のエラーになること** を、VSCode で確認してください。確認後は `Number` を使うコードに戻しておいてください。

![優先度の型チェック](figs/05/vscode_01.png)

### map でラジオボタンを構成する

JSX の名前入力欄と「追加」ボタンの間に、次のコードを挿入してください。

<!-- code-source: docs/codes/05/step03/App.tsx#L69-L86 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=69}
<fieldset>
  <legend className="mb-1 font-bold">優先度</legend>
  <div className="flex gap-5">
    {[1, 2, 3].map((value) => (
      <label key={value} className="flex items-center space-x-1">
        <input
          id={`priority-${value}`}
          name="priorityGroup"
          type="radio"
          value={value}
          checked={newTodoPriority === value}
          onChange={updateNewTodoPriority}
        />
        <span>{value}</span>
      </label>
    ))}
  </div>
</fieldset>
```

このコードでは、次の対応を確認してください。

- `[1, 2, 3].map(...)` で 3 個のラジオボタンをつくっています。`map` が返す一番外側の `label` には、前回と同じように **key 属性** を設定しています。
- `type="radio"` がラジオボタンを表します。同じ `name="priorityGroup"` のボタンを、1 つのグループとして扱います。
- `checked={newTodoPriority === value}` は、どのボタンを選択状態にするかを指定します。数値として比較している点も確認してください。
- `onChange` で呼び出される `updateNewTodoPriority` が状態を更新します。

ここでは `input` を `label` の内側に配置しているため、`htmlFor` を設定しなくても両者が対応します。「1」「2」「3」という文字をクリックしても、対応するボタンが選択されることを確認してください。

また、`fieldset` は関連する入力欄のまとまり、`legend` はそのまとまりの見出しを表します。見た目だけでなく、読み上げなどでも入力欄の意味が伝わるようにしています。

最後に、`addNewTodo` 内の `newTodo` の `priority` を `newTodoPriority` に変更し、追加後に `setNewTodoPriority(3)` を実行するようにしてください。名前と同様に、**選択した優先度で追加され、追加後は優先度 3 の選択に戻ること** を確認してください。

ここまでの実装例: [src/App.tsx](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/05/step03/App.tsx)

### 補足: onChange 属性の設定

`updateNewTodoPriority` を別の関数として定義せず、次のように `onChange` にアロー関数を直接記述することもできます。

```ts{.numberLines caption="onChange に処理を直接記述する例"}
onChange={(e) => setNewTodoPriority(Number(e.target.value))}
```

この場合は、`e` の型が推論されるため、型注釈を省略できます。短いイベント処理では、このような書き方もよく使います。このあとのチェックボックスの実装でも使っていきます。

### 演習: 表示する文字と値を分ける <i class="fa-solid fa-stopwatch"></i>5分

優先度の内部値は `1`・`2`・`3` のままにして、ラベルだけを「高」「中」「低」に変えてください。

![優先度のラベル](figs/05/app_07.png)

- ヒント: <span class="masked">`[1, 2, 3]` を `["高", "中", "低"]` に変更し、`map((label, index) => ...)` とする。内部値には `index + 1` を使う。</span>
- 変更する対応: <span class="masked">`key={label}`、``id={`priority-${index + 1}`}``、`value={index + 1}`、`checked={newTodoPriority === index + 1}`、表示は `<span>{label}</span>`。</span>

ラベルを変えても、`updateNewTodoPriority` は変更せずに使えることを確認してください。確認後は、ラベルも `1`・`2`・`3` に戻しておいてください。

#### 定着確認

- React のラジオボタンから `e.target.value` で値を取得した場合、その型を答えよ。
  - 答え: <span class="masked">文字列型。数値として扱うなら `Number` などで変換する。</span>
- ラジオボタンの選択状態を React の状態と対応付ける属性を答えよ。
  - 答え: <span class="masked">`checked`。</span>
- HTML のラジオボタンを同じグループとして扱うため、共通の値を指定する属性を答えよ。
  - 答え: <span class="masked">`name`。</span>

## 期限を設定する日時設定UIの追加

新規タスクの期限を設定する「**日時入力欄**」を追加します。ここでは、日付と時刻をまとめて選ぶ `type="datetime-local"` を使います。

![期限の設定](figs/05/app_05.png)

### 期限の状態を用意する

前回定義した `Todo` 型では、期限の型を `Date | null` としています。**期限を設定しない Todo は `null`** という扱いを、引き続き使っていきます。

**src/App.tsx** の `newTodoPriority` の状態の直後に、次の行を追加してください。

<!-- code-source: docs/codes/05/step04/App.tsx#L15-L15 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=15}
const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);
```

初期値は `null` ですが、あとで `Date` もセットするため、ここでは **型を明示** しています。`useState(null)` だけでは、`Date` を入れる状態として推論されません。`Date | null` のように、複数の型のいずれかを表す型を <span class="masked">ユニオン型（Union 型）</span> といいました。

### 日時情報の更新（UI → コード）

`App` 関数内の `addNewTodo` より前に、次の `updateDeadline` 関数を追加してください。

<!-- code-source: docs/codes/05/step04/App.tsx#L27-L30 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=27}
const updateDeadline = (e: ChangeEvent<HTMLInputElement>) => {
  const dt = e.target.value;
  setNewTodoDeadline(dt === "" ? null : new Date(dt));
};
```

日時入力欄で選択した値も、`e.target.value` からは <span class="masked">文字列</span> として得られます。日付と時刻がそろっているときは、`"2026-11-12T23:00"` のような文字列です。空欄のときは `""` になります。

そのため、条件演算子で「空文字なら `null`、そうでなければ `new Date(dt)` で Date オブジェクトに変換」としています。第 02 回の[三項演算子](lecture02.html#三項演算子)の利用例です。

値の変化を確認したいときは、一時的に `const dt = e.target.value;` の次に `console.log(dt, typeof dt);` を入れて実験してください。**表示されている日時と、コードが受け取る文字列の形式は異なること** が確認できます。確認後、ログ出力は削除しておいてください。

![日時入力を空にする操作](figs/05/app_08.png)

### 日時情報の更新（コード → UI）

ファイルの先頭に `import dayjs from "dayjs";` を追加し、JSX の優先度の選択欄と「追加」ボタンの間に、次のコードを挿入してください。

<!-- code-source: docs/codes/05/step04/App.tsx#L96-L112 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=96}
<div className="flex flex-wrap items-center gap-2">
  <label className="font-bold" htmlFor="deadline">
    期限
  </label>
  <input
    type="datetime-local"
    id="deadline"
    name="deadline"
    value={
      newTodoDeadline
        ? dayjs(newTodoDeadline).format("YYYY-MM-DDTHH:mm:ss")
        : ""
    }
    onChange={updateDeadline}
    className="max-w-full min-w-0 rounded-md border border-gray-300 px-2 py-0.5"
  />
</div>
```

入力欄の `value` には、Date オブジェクトそのものではなく、**入力欄が扱う形式の文字列** を渡します。ここでは、前回インストールした Day.js を使い、`YYYY-MM-DDTHH:mm:ss` の形式に変換しています。`T` は日付と時刻を区切る文字です。`newTodoDeadline` が `null` なら、空文字を渡します。

この入力欄で扱うのは、**利用している環境のローカルな日時** です。ここで `toISOString()` を使うと UTC の文字列になるため、そのまま入力欄の値に使わないようにしてください。

最後に、`addNewTodo` 内の `newTodo` の `deadline` を `newTodoDeadline` に変更し、追加後に `setNewTodoDeadline(null)` を実行するようにしてください。

- 期限を入力して追加すると、Todo の `deadline` が Date オブジェクトになる。
- 期限を空欄にして追加すると、`deadline` は `null` になる。
- 追加後は日時入力欄も空に戻る。

以上の 3 点を、画面と、必要に応じたコンソール出力で確認してください。**日時を設定した Todo と、期限なしの Todo の両方を追加してみてください**。

ここまでの実装例: [src/App.tsx](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/05/step04/App.tsx)

::: {.note .type-tips}
`datetime-local` は、日付と時刻をまとめて入力する欄です。今回は、日付だけの入力欄と時刻だけの入力欄には分けません。

初期データの `new Date(2026, 10, 11)` も、内部的には **2026 年 11 月 11 日 00:00:00** です。日付だけの期限のように表示したいときは、時刻を `00:00` にします。日時を一覧に表示する処理は、後半で追加していきます。
:::

#### 定着確認

- Todo の期限を表す `Date | null` の `null` は、このアプリで何を意味するか答えよ。
  - 答え: <span class="masked">期限を設定しないこと。</span>
- 初期値が `null` で、あとで Date オブジェクトもセットする React の状態を宣言する場合、`useState` に指定する型を答えよ。
  - 答え: <span class="masked">`useState<Date | null>(null)`。</span>
- 日時入力欄から受け取った文字列が `""` の場合と `"2026-11-12T23:00"` の場合、それぞれこのアプリの期限の状態に何をセットするか答えよ。
  - 答え: <span class="masked">空文字なら `null`、日時の文字列なら `new Date(dt)` で生成した Date オブジェクト。</span>

## バリデーション

ここまでは、名前が空欄でも Todo を追加できる状態でした。ここからは、**前後の空白を除いた名前が 2 文字以上、32 文字以内のときだけ追加できる** ようにします。

このように、入力されたデータが条件を満たすかチェックする処理を <span class="masked">バリデーション（Validation）</span> といいます。単に追加を拒否するだけではなく、**入力の不備を画面に表示し、追加ボタンも無効化する** ところまで実装します。

![入力エラーの表示](figs/05/app_09.png)

### 検証する関数を用意する

**src/App.tsx** のインポートと `App` 関数の間に、次の `getTodoNameError` 関数を追加してください。

<!-- code-source: docs/codes/05/step05/App.tsx#L13-L19 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=13}
const getTodoNameError = (name: string): string => {
  const trimmedName = name.trim();
  if (trimmedName.length < 2 || trimmedName.length > 32) {
    return "前後の空白を除いて、2文字以上、32文字以内で入力してください";
  }
  return "";
};
```

`trim()` は、文字列の前後の空白を取り除いた **新しい文字列** を返します。元の `name` を変更する処理ではありません。これにより、空白だけの名前も条件を満たさなくなります。名前の途中にある空白は取り除きません。

戻り値は、条件を満たさない場合は「不備を説明する文字列」、満たす場合は「空文字 `""`」です。単独の文字列を受け取って検証できるため、この関数を `App` 関数の外に定義しています。

### 検証結果は入力から計算する

`App` 関数内で、状態を宣言している箇所の最後に次の行を追加してください。

<!-- code-source: docs/codes/05/step05/App.tsx#L26-L26 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=26}
const [isNameTouched, setIsNameTouched] = useState(false);
```

`isNameTouched` は、「名前を入力・編集したことがあるか」を表す状態です。最初は `false` なので、画面を開いた直後からエラーメッセージが表示されることを避けられます。

つづいて、未完了件数を計算する行のあとに、次の 3 行を追加してください。

<!-- code-source: docs/codes/05/step05/App.tsx#L29-L31 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=29}
const newTodoNameError = getTodoNameError(newTodoName);
const isNewTodoNameInvalid = newTodoNameError !== "";
const showNewTodoNameError = isNameTouched && isNewTodoNameInvalid;
```

- `newTodoNameError` は、入力された名前を検証した結果です。
- `isNewTodoNameInvalid` は、入力が不適切なときに `true` になります。
- `showNewTodoNameError` は、**入力を編集済みで、かつ、不適切なとき** に `true` になります。

ここで、`newTodoNameError` などを `useState` で管理していない点に注目してください。**名前が分かれば計算できる値** なので、その都度計算しています。前回、未完了件数を `todos` から計算したのと同じ考え方です。入力文字列とエラー文字列をそれぞれ状態として持つと、片方だけを更新して食い違う余地ができます。

`updateNewTodoName` も、編集済みの状態を更新するように書き換えてください。

<!-- code-source: docs/codes/05/step05/App.tsx#L33-L36 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=33}
const updateNewTodoName = (e: ChangeEvent<HTMLInputElement>) => {
  setNewTodoName(e.target.value);
  setIsNameTouched(true);
};
```

### 不備があるときにメッセージを表示する

先頭のインポートに、次の 2 行を追加してください。アイコン用のライブラリは、前回インストール済みです。

```ts{.numberLines caption="src/App.tsx（インポートの追加）"}
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
```

名前の `label` と `input` を囲んでいる `div` を、次のコードに書き換えてください。

<!-- code-source: docs/codes/05/step05/App.tsx#L90-L112 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=90}
<div>
  <div className="flex items-center space-x-2">
    <label className="font-bold" htmlFor="newTodoName">
      名前
    </label>
    <input
      id="newTodoName"
      name="todoName"
      type="text"
      required
      value={newTodoName}
      onChange={updateNewTodoName}
      aria-invalid={showNewTodoNameError}
      aria-describedby={
        showNewTodoNameError ? "newTodoNameError" : undefined
      }
      className={twMerge(
        "min-w-0 grow rounded-md border border-gray-300 p-2",
        showNewTodoNameError && "border-red-500 outline-red-500",
      )}
      placeholder="2文字以上、32文字以内で入力してください"
    />
  </div>
```

`showNewTodoNameError && (...)` は、条件が `true` のときだけメッセージ部分を表示する <span class="masked">条件付きレンダリング</span> です。メッセージの表示条件を、入力欄の色にも使っています。

`twMerge` は、第 04 回に使った Tailwind CSS のクラスを結合する関数でした。ここでは、エラーがある場合に `border-red-500` を追加し、通常時の `border-gray-300` と衝突しないようにしています。

また、`aria-invalid` で不備の有無を、`aria-describedby` で入力欄とエラー説明の対応を伝えています。`aria-live="polite"` は、表示内容の変化を読み上げなどに知らせるための指定です。色の変化だけで不備を伝えないようにしています。

### 不適切な名前を追加させない

`addNewTodo` を次のように書き換えてください。先頭に検証結果によるガードを追加し、Todo の名前には前後の空白を取り除いた文字列を使います。

<!-- code-source: docs/codes/05/step05/App.tsx#L47-L65 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=47}
const addNewTodo = () => {
  if (isNewTodoNameInvalid) {
    setIsNameTouched(true);
    return;
  }

  const newTodo: Todo = {
    id: uuid(),
    name: newTodoName.trim(),
    isDone: false,
    priority: newTodoPriority,
    deadline: newTodoDeadline,
  };
  setTodos((currentTodos) => [...currentTodos, newTodo]);
  setNewTodoName("");
  setNewTodoPriority(3);
  setNewTodoDeadline(null);
  setIsNameTouched(false);
};
```

名前を入力するときから `trim()` してしまうと、文字列の末尾に空白を入力しづらくなります。ここでは、**入力欄には入力した文字列を保持し、検証時と Todo の生成時に `trim()` する** ようにしています。

追加後は、名前・優先度・期限とともに `isNameTouched` も初期状態に戻します。そのため、新しい Todo の入力を始める前からエラーメッセージが出ることもありません。

## フォームの送信と追加ボタンの無効化

入力欄がそろったので、「新しいタスクの追加」の領域を **form 要素** に変更します。これにより、追加ボタンのクリックだけでなく、**名前の入力欄で Enter キーを押しても追加できる** ようにします。

**src/App.tsx** で、追加領域を囲んでいる `<div className="mt-4 ...">` を、次の開始タグに書き換えてください。対応する終了タグも `</div>` から `</form>` に変更します。内部の見出し・入力欄はそのまま残してください。

<!-- code-source: docs/codes/05/step05/App.tsx#L78-L85 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=78}
<form
  onSubmit={(e) => {
    e.preventDefault();
    addNewTodo();
  }}
  aria-labelledby="newTodoHeading"
  className="mt-4 space-y-2 rounded-md border border-slate-300 bg-white p-3 drop-shadow"
>
```

`onSubmit` は、フォームが送信されるときのイベントハンドラです。`e.preventDefault()` は、ブラウザ標準のフォーム送信によるページ遷移・リロードを止めています。このアプリでは、React の状態更新によって Todo を追加したいので、この処理を入れています。

次に、追加ボタンを以下のように書き換えてください。以前の `onClick={addNewTodo}` は削除します。

<!-- code-source: docs/codes/05/step05/App.tsx#L165-L175 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=165}
<button
  type="submit"
  disabled={isNewTodoNameInvalid}
  className={twMerge(
    "cursor-pointer rounded-md px-3 py-1",
    "bg-indigo-500 font-bold text-white hover:bg-indigo-600",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-indigo-500",
  )}
>
  追加
</button>
```

`type="submit"` はフォームを送信するボタンです。**追加処理を呼ぶ場所を form の `onSubmit` にそろえた** ことで、クリックでも Enter でも同じ検証と追加処理が実行されます。

`disabled={isNewTodoNameInvalid}` は、不適切な入力のときにボタン自体を無効化します。**色を薄くするだけでは、ボタンの操作は無効になりません**。`disabled:...` の Tailwind クラスは、無効化されたときの見た目を設定しています。

名前の input に追加した `required` は、この入力が必須であることを示しています。前後の空白を除いた 2〜32 文字という条件は、引き続き `getTodoNameError` で検証します。

### 動作確認

名前に次の値を入力し、エラー表示と追加ボタンの状態を確認してください。

1. 画面を開いた直後の空欄：**メッセージなし、追加は無効**。
2. `a` のような 1 文字：**エラーメッセージあり、追加は無効**。
3. `ab` のような 2 文字、または 32 文字：**追加できる**。
4. 33 文字、または空白だけ：**追加は無効**。
5. 前後に空白を付けた `  買い物  `：**「買い物」という名前で追加される**。

クリックと Enter の両方で試してください。追加後に、名前は空欄、優先度は `3`、期限は空欄に戻り、エラー表示も消えることを確認してください。

ここまでの実装例: [src/App.tsx](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/05/step05/App.tsx)

### 「truthy な値」「falsy な値」と条件付きレンダリング

JavaScript / TypeScript では、条件式で `true` と解釈される値を **truthy な値**、`false` と解釈される値を **falsy な値** といいます。

今回扱う値では、`false`、空文字 `""`、`null`、`undefined`、`0`、`-0`、`0n`、`NaN` が falsy な値です。空配列 `[]`、空オブジェクト `{}`、文字列 `"0"` は <span class="masked">truthy な値</span> です。

`&&` は、常に真偽値を返す演算子ではありません。例えば、`0 && "こんにちは"` の結果は `0` です。JSX の `{0 && <div>こんにちは</div>}` では、**数値の「0」が画面に表示されます**。一方、`false`・`null`・`undefined`・空文字は、ここでは画面に何も表示しません。

今回の `showNewTodoNameError` は真偽値として計算しているため、条件部分に数値の `0` が入ることを避けられます。

#### 定着確認

- React のフォームで、エラー文字列を名前の状態から計算できる場合、そのエラー文字列も別の `useState` で持つ必要があるか答えよ。
  - 答え: <span class="masked">その必要はない。名前から計算できる値を別の状態にすると、更新漏れで内容が食い違う余地ができる。</span>
- HTML のボタンを操作できない状態にする属性を答えよ。
  - 答え: <span class="masked">`disabled`。色や透明度の変更だけでは操作を無効化できない。</span>
- React の form の `onSubmit` 内で `e.preventDefault()` を実行する目的を答えよ。
  - 答え: <span class="masked">ブラウザ標準の送信によるページ遷移・リロードを防ぎ、React 側の追加処理を行なうため。</span>
- JavaScript の `"0" ? "truthy" : "falsy"` の結果を答えよ。
  - 答え: <span class="masked">`"truthy"`。空でない文字列 `"0"` は truthy な値。</span>
- JavaScript の `[] ? "truthy" : "falsy"` の結果を答えよ。
  - 答え: <span class="masked">`"truthy"`。空配列も truthy な値。</span>
- React の JSX で `{0 && <div>こんにちは</div>}` を描画した場合、画面に何が表示されるか答えよ。
  - 答え: <span class="masked">数値の `0`。「こんにちは」は表示されない。</span>

::: prompts
- React + TypeScript の入力フォームで、入力文字列と、その文字列から計算できるエラーメッセージをそれぞれ useState に入れようとしています。この設計にはどのような注意点がありますか。入力文字列と「入力を編集済みかどうか」だけを状態にする例と比較してください。
- JavaScript の `&&` は真偽値以外も返すと聞きました。`false && "表示"`、`0 && "表示"`、`"" && "表示"` の値と、それらを React の JSX 内に書いた場合の表示の違いを説明してください。
:::

### 補足: React Hook Form と Zod

フォームの入力項目が増えると、値の管理や検証の処理も増えていきます。そのような場合には、[React Hook Form](https://react-hook-form.com/) や、検証ルールを定義する [Zod](https://zod.dev/) といったライブラリも選択肢になります。今回のチュートリアルでは、状態と入力欄の対応を理解するために、ここまでの `useState` を使った実装で進めます。

フロントエンド開発に興味がある人は、これらのライブラリを調べて[課題 1](#課題1)で試してみてください。

## 既存Todoの 完了/未完了 の切り替え

ここからは、既存の Todo を更新する機能を追加します。最初に、**チェックボックスのオン・オフによって、Todo の完了状態を切り替える** ようにしていきます。

![完了状態の切り替え](figs/05/app_10.png)

### map で対象の Todo を更新する

**src/App.tsx** の `App` 関数内で、`addNewTodo` のあとに、次の `updateIsDone` 関数を追加してください。

<!-- code-source: docs/codes/05/step06/App.tsx#L67-L77 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=67}
const updateIsDone = (id: string, value: boolean) => {
  setTodos((currentTodos) =>
    currentTodos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: value };
      } else {
        return todo;
      }
    }),
  );
};
```

`id` は更新対象の Todo の ID、`value` は更新後の完了状態です。第 03 回の[イミュータブルなオブジェクト更新](lecture03.html#その2-イミュータブルなオブジェクト更新)と同じように、次のものを新しくつくっています。

- `map` による **新しい外側の配列**。
- 対象の Todo だけ、スプレッド構文による **新しいオブジェクト**。

対象でない Todo は、元のオブジェクトをそのまま返します。`deadline` の Date オブジェクトまで複製しているわけではありません。今回は `isDone` だけを変更するため、このつくり方で問題ありません。

### 関数を Props として子に渡す

前回は、親である App から子である TodoList に、Todo の配列を渡しました。今回は、**状態を更新するための関数も Props として渡します**。

**src/TodoList.tsx** の `Props` の型を、次のように変更してください。

<!-- code-source: docs/codes/05/step06/TodoList.tsx#L7-L10 -->

```ts{.numberLines caption="src/TodoList.tsx（抜粋）" startFrom=7}
type Props = {
  todos: Todo[];
  updateIsDone: (id: string, value: boolean) => void;
};
```

`(id: string, value: boolean) => void` は、文字列と真偽値を受け取り、戻り値を使わない関数の型です。

また、**src/App.tsx** の `<TodoList ... />` を、次のように変更してください。`updateIsDone` を定義しただけでは、子のコンポーネントからは呼び出せないため、この受け渡しが必要です。

<!-- code-source: docs/codes/05/step06/App.tsx#L88-L88 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=88}
<TodoList todos={todos} updateIsDone={updateIsDone} />
```

### チェックボックスから更新を依頼する

**src/TodoList.tsx** の `todos.map(...)` 内で、各 Todo の名前を表示する部分を、次のような `label` とチェックボックスの組み合わせに変更してください。既存の名前表示は重複して残さず、`label` の内側に移します。

```ts{.numberLines caption="src/TodoList.tsx（名前とチェックボックス）"}
<label className="flex cursor-pointer items-center">
  <input
    type="checkbox"
    checked={todo.isDone}
    onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
    className="mr-3 cursor-pointer"
  />
  <span>{todo.name}</span>
</label>
```

チェックボックスで取得したいのは、文字列の `value` ではなく、<span class="masked">真偽値の `checked`</span> です。ここでは `e.target.checked` を、更新後の完了状態として渡しています。

また、`onChange` にアロー関数を渡すことで、**その Todo の ID と、チェック後の状態** を引数として `updateIsDone` をコールしています。`onChange={props.updateIsDone(todo.id, todo.isDone)}` のように、その場で実行する書き方にしないように注意してください。

この段階の全体の実装例では、名前に加えて、優先度の星・期限・完了表示も配置しています。上記の Props とチェックボックスの処理を組み込んだら、**src/TodoList.tsx** を実装例と照合し、これらの表示も同じ構成になるように書き換えてください。JSX だけでなく、先頭のインポートと、表示用の関数も含めて確認してください。

- [src/App.tsx](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/05/step06/App.tsx)
- [src/TodoList.tsx](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/05/step06/TodoList.tsx)

`num2star` は、優先度 `1`・`2`・`3` を、それぞれ `★★★`・`★★`・`★` にする関数です。`formattedDate` は、時刻が `00:00` の場合は日付だけ、それ以外は日付と時刻を表示する関数です。期限が `null` の場合は、期限表示の部分をレンダリングしません。表示部分を取り込んだら、追加した Todo の優先度と期限も画面で確認してください。

::: {.note .type-caution}
Todo の配列を状態として持っているのは、親の **App コンポーネント** です。TodoList が受け取った Todo を直接書き換えるのではなく、**Props として受け取った関数を使い、親に更新を依頼する** という流れを意識してください。
:::

### NG: 元の Todo を直接変更する

次のように実装すると、新しい配列も新しい Todo オブジェクトもつくっていません。**参考の NG 例** として、先ほどの実装と比較してください。

```ts{.numberLines caption="src/App.tsx（NG な完了状態の更新）"}
const updateIsDone = (id: string, value: boolean) => {
  for (const todo of todos) {
    if (todo.id === id) {
      todo.isDone = value;
    }
  }
  setTodos(todos);
};
```

同じ参照の配列を `setTodos` に渡しているため、一覧や未完了件数が適切に更新されません。コピーした配列をつくるだけでなく、**変更する Todo オブジェクトも新しくする** 必要があることを確認してください。

### 動作確認

未完了の Todo を完了にし、完了済みの Todo を未完了に戻してみてください。チェック状態・完了表示・未完了件数が連動し、**操作した Todo 以外の内容は変わらないこと** を確認してください。

#### 定着確認

- React で Todo 配列を状態として持つ親コンポーネントがあり、子のチェックボックス操作で Todo を更新したい。親から子に渡すものを答えよ。
  - 答え: <span class="masked">対象のデータと、親の状態を更新するための関数。子はその関数をコールして更新を依頼する。</span>
- React のチェックボックスの変更イベントで、チェック後の真偽値を取得するプロパティを答えよ。
  - 答え: <span class="masked">`e.target.checked`。</span>
- Todo 配列のうち 1 件の `isDone` をイミュータブルに更新する場合、新しくつくるものを答えよ。
  - 答え: <span class="masked">外側の配列と、更新対象の Todo オブジェクト。対象でない Todo の参照は維持できる。</span>

## 完了済みのタスクを削除するボタンの追加

完了済みのタスクを一括削除する機能を実装します。第 03 回の[オブジェクト配列に対する filter](lecture03.html#オブジェクト型の配列に対するfilterの適用)を、そのまま使える場面です。

**src/App.tsx** の `App` 関数内に、次の `removeCompletedTodos` 関数を追加してください。

<!-- code-source: docs/codes/05/step07/App.tsx#L80-L82 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=80}
const removeCompletedTodos = () => {
  setTodos((currentTodos) => currentTodos.filter((todo) => !todo.isDone));
};
```

`filter` の条件は「削除するもの」ではなく、<span class="masked">新しい配列に残すもの</span> を表します。ここでは、`!todo.isDone` が `true` になる未完了の Todo を残しています。

また、未完了件数を計算した行の直後に、次の行を追加してください。完了済みの件数は、全件数から未完了件数を引いて求められます。

<!-- code-source: docs/codes/05/step07/App.tsx#L29-L29 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=29}
const completedCount = todos.length - uncompletedCount;
```

JSX の `<TodoList ... />` と `<form ...>` の間に、次のボタンを追加してください。

<!-- code-source: docs/codes/05/step07/App.tsx#L95-L106 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=95}
<button
  type="button"
  onClick={removeCompletedTodos}
  disabled={completedCount === 0}
  className={twMerge(
    "mt-4 cursor-pointer rounded-md px-3 py-1 font-medium",
    "bg-rose-500 text-white hover:bg-rose-600",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-rose-500",
  )}
>
  完了済みのタスクを削除
</button>
```

完了済みの Todo がない場合は、ボタンを無効化しています。このボタンはフォームの送信に使わないため、`type="button"` としています。

![完了済みタスクの一括削除](figs/05/app_11.png)

完了・未完了が混在した状態で押下し、完了済みだけが消えることを確認してください。削除後、未完了件数が変わらず、完了済みが 0 件になるとボタンが無効になることも確認してください。

ここまでの実装例: [src/App.tsx](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/05/step07/App.tsx)。TodoList は、直前の完了切り替えの段階のものを使います。

## タスクの個別削除

次に、完了・未完了に関係なく、**指定した Todo を 1 件だけ削除する機能** を実装します。

![タスクの個別削除](figs/05/app_12.png)

**src/App.tsx** の `App` 関数内に、次の `remove` 関数を追加してください。

<!-- code-source: docs/codes/05/step08/App.tsx#L84-L86 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=84}
const remove = (id: string) => {
  setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
};
```

引数 `id` と一致しない Todo を `filter` で集めています。ID が一致する Todo を「残す条件」から外すことで、削除した配列を得ています。

完了切り替えの関数と同じように、この `remove` も TodoList に Props として渡してください。**src/App.tsx** の呼び出しを次のように変更します。

<!-- code-source: docs/codes/05/step08/App.tsx#L97-L97 -->

```ts{.numberLines caption="src/App.tsx（抜粋）" startFrom=97}
<TodoList todos={todos} updateIsDone={updateIsDone} remove={remove} />
```

**src/TodoList.tsx** の Props の型にも、`remove` を追加してください。

<!-- code-source: docs/codes/05/step08/TodoList.tsx#L7-L11 -->

```ts{.numberLines caption="src/TodoList.tsx（抜粋）" startFrom=7}
type Props = {
  todos: Todo[];
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
};
```

`todos.map(...)` のなかで、各 Todo の表示に、次のボタンを追加してください。ボタンと名前を左右に配置するなど、全体の JSX とスタイリングは[実装例](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/05/step08/TodoList.tsx)も参考にしてください。

<!-- code-source: docs/codes/05/step08/TodoList.tsx#L79-L89 -->

```ts{.numberLines caption="src/TodoList.tsx（抜粋）" startFrom=79}
<button
  type="button"
  onClick={() => props.remove(todo.id)}
  aria-label={`${todo.name}を削除`}
  className={twMerge(
    "shrink-0 cursor-pointer rounded-md px-2 py-1 text-sm font-bold",
    "bg-rose-300 text-white hover:bg-rose-500",
  )}
>
  削除
</button>
```

`onClick={() => props.remove(todo.id)}` によって、クリックされた Todo の ID を渡しています。`aria-label` には「どの Todo を削除するボタンか」を設定しています。画面の「削除」という文字が同じでも、読み上げなどで区別できるようにするためです。

完了・未完了の Todo をそれぞれ削除し、未完了の Todo を削除したときだけ未完了件数も減ることを確認してください。また、すべて削除したときに、前回つくった「**現在、登録されているタスクはありません。**」という表示になることも確認してください。

ここまでの実装例: [src/App.tsx](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/05/step08/App.tsx)、[src/TodoList.tsx](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/05/step08/TodoList.tsx)

### 演習 <i class="fa-solid fa-stopwatch"></i>5分

一括削除と個別削除について、次の操作で何が変わるか実際に確認し、その理由を説明してください。

1. 完了・未完了が混在する一覧で、一括削除する。
2. 未完了の Todo を 1 件だけ個別削除する。
3. すべての Todo を削除してから、新しい Todo を追加する。

- 確認するポイント: <span class="masked">一括削除では未完了件数は変わらない。未完了の個別削除では 1 件減る。空の一覧からでも追加でき、追加した 1 件が表示される。</span>

#### 定着確認

- Todo の配列 `currentTodos` から、完了済みだけを削除する `filter` の条件を答えよ。
  - 答え: <span class="masked">`currentTodos.filter((todo) => !todo.isDone)`。</span>
- Todo の配列 `currentTodos` から、変数 `id` と同じ ID の Todo だけを削除する `filter` の条件を答えよ。
  - 答え: <span class="masked">`currentTodos.filter((todo) => todo.id !== id)`。</span>
- Todo の完了状態の変更に `map`、削除に `filter` を使う理由を説明せよ。
  - 答え: <span class="masked">`map` は各要素を対応する要素に変換し、`filter` は条件を満たす要素だけを残すから。更新では件数を保ち、削除では対象を除いた配列を得たい。</span>

## リファクタリング: コンポーネントに分割

TodoList に、一覧全体の処理と、個々の Todo の表示・操作の処理が集まってきました。ここで、**1 件分の Todo を表示する役割** を、TodoItem コンポーネントに切り分けます。動作を変えず、役割ごとにコードを整理する作業です。

### TodoItem コンポーネントの作成

**src/TodoItem.tsx** を新規作成し、次のコードを記述してください。直前の TodoList から 1 件分の表示を移し、`num2star`・`formattedDate` と、それらの表示に必要なインポートも移しています。

<!-- code-source: docs/codes/05/step09/TodoItem.tsx#L1-L81 -->

```ts{.numberLines caption="src/TodoItem.tsx"}
import type { Todo } from "./types";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPersonDigging } from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";

type Props = {
  todo: Todo;
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
};

const num2star = (n: number): string => "★".repeat(4 - n);

const formattedDate = (date: Date) => {
  if (date.getHours() === 0 && date.getMinutes() === 0) {
    return dayjs(date).format("YYYY/MM/DD");
  }
  return dayjs(date).format("YYYY/MM/DD HH:mm");
};

const TodoItem = (props: Props) => {
  const todo = props.todo;

  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-slate-300 bg-white px-4 py-2 drop-shadow">
      <div
        className={twMerge(
          "flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1",
          todo.isDone && "opacity-60",
        )}
      >
        <label className="flex min-w-0 cursor-pointer items-center">
          <input
            type="checkbox"
            checked={todo.isDone}
            onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
            className="mr-3 shrink-0 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faPersonDigging}
            className="mr-2 shrink-0 text-slate-500"
          />
          <span className="min-w-0 text-lg font-medium wrap-anywhere text-slate-700">
            {todo.name}
          </span>
        </label>
        <span
          aria-label={`優先度: ${todo.priority}`}
          className="tracking-tighter text-orange-400"
        >
          {num2star(todo.priority)}
        </span>
        {todo.deadline && (
          <span className="flex items-center text-sm text-slate-500">
            <FontAwesomeIcon icon={faClock} className="mr-0.5" />
            {formattedDate(todo.deadline)}
          </span>
        )}
        {todo.isDone && (
          <span className="rounded-full bg-slate-800 px-3 py-0.5 text-xs font-medium text-white">
            完了済み
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={() => props.remove(todo.id)}
        aria-label={`${todo.name}を削除`}
        className={twMerge(
          "shrink-0 cursor-pointer rounded-md px-2 py-1 text-sm font-bold",
          "bg-rose-300 text-white hover:bg-rose-500",
        )}
      >
        削除
      </button>
    </div>
  );
};

export default TodoItem;
```

TodoItem は、`todos` という配列ではなく、**1 件の `todo`** を受け取ります。また、完了切り替えと削除は、引き続き受け取った関数で親に依頼しています。状態の持ち主が TodoItem に移ったわけではありません。

### TodoList コンポーネントの変更

**src/TodoList.tsx** を、次のように書き換えてください。個々の Todo の表示を TodoItem に任せることで、TodoList には「空の一覧の表示」と「配列を `map` して並べる処理」が残ります。

<!-- code-source: docs/codes/05/step09/TodoList.tsx#L1-L35 -->

```ts{.numberLines caption="src/TodoList.tsx"}
import type { Todo } from "./types";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
};

const TodoList = (props: Props) => {
  const todos = props.todos;

  if (todos.length === 0) {
    return (
      <div className="text-red-500">
        現在、登録されているタスクはありません。
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateIsDone={props.updateIsDone}
          remove={props.remove}
        />
      ))}
    </div>
  );
};

export default TodoList;
```

この `map` が返す一番外側の要素は `<TodoItem ... />` なので、**key 属性も TodoItem に設定します**。ID は表示の順番ではなく、Todo の `id` を使います。追加や削除によって表示位置が変わっても、同じ Todo を識別するためでした。

また、App → TodoList → TodoItem と、関数を渡していることにも注目してください。TodoList 自身が状態を更新しなくても、**受け取った関数を、そのまま次の子に渡す** ことができます。

::: prompts
- React + TypeScript の Todo アプリで、App が Todo 配列を useState で持ち、TodoList が配列を受け取り、TodoItem が 1 件を表示しています。TodoItem の削除ボタンから、Props で渡した remove 関数を呼び出すとき、データと処理がどのように流れるか説明してください。子の TodoItem が Todo を直接変更してはいけない理由も説明してください。
:::

#### 定着確認

- Todo 配列を `map` し、各要素について TodoItem を返す場合、`key` を設定する要素と、その値に適したものを答えよ。
  - 答え: <span class="masked">`map` が直接返す TodoItem に設定し、値には安定した一意の `todo.id` を使う。</span>
- App → TodoList → TodoItem という構成で、Todo の配列を状態として持つのは App である。TodoItem が削除を実行したい場合、どのようにするか説明せよ。
  - 答え: <span class="masked">App で定義して Props 経由で渡した削除関数を、対象の ID を引数にしてコールする。</span>
- TodoList から TodoItem に 1 件分の表示を移す際、JSX 以外に移す必要があるものを挙げよ。
  - 答え: <span class="masked">1 件分の表示で使う関数、型、ライブラリやアイコンのインポートなど。</span>

## ここまでの動作確認

ここまでで、**追加・完了切り替え・一括削除・個別削除と、入力検証** ができるようになりました。次の確認は、最終コードを貼り付けて終わりにするのではなく、自分が変更したコードとの対応を説明しながら行なってください。

1. 名前・優先度・期限を指定した Todo と、期限を指定しない Todo を追加する。
2. ボタンと Enter の両方で追加し、追加後に各入力が初期状態に戻ることを確認する。
3. 不適切な名前では追加できず、入力後の不備がメッセージと色で示されることを確認する。
4. 完了・未完了を切り替え、チェック状態・完了表示・未完了件数の対応を確認する。
5. 一括削除・個別削除と、空の一覧からの追加を確認する。

そのあと、VSCode のターミナルで次の 2 つを実行してください。

```
npm run build
npm run lint
```

前回確認したように、**開発モードで表示できることと、型チェック・ビルド・Lint が通ることは別** です。エラーや警告があれば、その内容と該当するコードを確認して修正してください。

この段階の完成コードは、次のリンクから確認できます。**src 内の 6 ファイル** が対象です。前回の環境設定・ライブラリ・**src/main.tsx**・**src/index.css** は、そのまま利用します。

- [App.tsx](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/05/step09/App.tsx)、[TodoList.tsx](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/05/step09/TodoList.tsx)、[TodoItem.tsx](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/05/step09/TodoItem.tsx)
- [WelcomeMessage.tsx](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/05/step09/WelcomeMessage.tsx)、[types.ts](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/05/step09/types.ts)、[initTodos.ts](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/05/step09/initTodos.ts)
- [6 ファイルをまとめてダウンロード](codes/05/todo-before-localstorage.zip)

最後にブラウザをリロードし、追加や削除が初期状態に戻ることも確認してください。ここまでは **メモリ上の状態** を変更しているため、リロード後までデータは残りません。次の節では、この点を改善するために「データの永続化」を扱います。


## LocalStorageを利用したデータの永続化

現状のTodoアプリは、Todoの追加や削除をしてもブラウザをリロード (再読み込み) すると初期状態に戻ってしまいます。このままでは、Todoアプリとして実用的に使えないため <span class="masked">データの永続化 (Data Persistence)</span> の機能が必要となります。「**データの永続化**」とは、簡単に言えば **ブラウザをリロードしたとき** や **次回アクセスしたとき** にも継続的にアプリを利用できるように <span class="masked">データや状態を不揮発性の領域に保存すること</span> です。

ウェブアプリにおいて「データの永続化」は、通常、**バックエンド側 (サーバ側) でデータベース (RDBやNoSQLなど)** を利用して実装されます。バックエンドで実装することで、ユーザは異なるデバイスからアクセスしても (ユーザ認証を経たうえで) 継続的にアプリの利用ができます。

しかし、まだ現時点ではバックエンド開発は学んでいないので、ここではブラウザの「**LocalStorage**」という機能を使って、**フロントエンドでのデータの永続化** を実装します。LocalStorage とは、ウェブブラウザに組み込まれている **キーバリュー型のストレージ機能** (Pythonの `dict` のようなシンプルな <span class="masked">「キー(key)」と「値(Value)」のペアでデータを保存する機能</span>) で、ブラウザを終了してもデータが残ることが特徴です。

### LocalStorage とは

LocalStorageは、JavaScriptの **Window.localStorage API** を通じて利用可能で、保存可能なデータは <span class="masked">文字列 (string型) のみ</span> ですが、**約5MB** までのデータが保存可能となっています。

LocalStorageは **ブラウザごとに独立した保存領域** を持ちます。例えば `https://hoge777.github.io/react-todo-app/` にホストされた TodoApp に2人のユーザ「寝屋川タヌキ」と「萱島ウサギ」がアクセスした場合、各データは <span class="masked">各ユーザーが使用するデバイスのブラウザに独立して保存</span> されます。

そのため、例えば寝屋川タヌキが「高専に侵入」というTodoを追加しても、萱島ウサギは影響を受けません。

<div class="note type-tips">
**LocalStorage の容量制限**

LocalStorage は、**1オリジンあたり約5MB** が一般的な容量制限になっています。ここでの「オリジン」とは「**プロトコル（http/https）**」「**ドメイン**」「**ポート**」の組み合わせを指します。


例えば、Todoアプリを GitHub Pages にデプロイするとすれば、次のようになります。

- https://hoge777.github.io/react-todo-app/ の LocalStorage は約5MB
- https://hoge777.github.io/portfolio/ は「同じオリジン」なので **上記とあわせて約5MB**
- https://lofoo123.github.io/ → 異なるオリジンなので上記とは、別途、約5MB

また、ローカル環境の開発サーバでホストするとすれば、次のようになります。

- http://localhost:3000/ の LocalStorage は約5MB
- http://localhost:5500/ は異なるオリジン (異なるポート番号) なので、上記とは別途約5MB
</div>

#### 定着確認

- LocalStorage における1オリジンあたりの最大保存容量は約何MBか答えよ。
    - 答え: <span class="masked">5MB</span>
- 同じデバイスで Edge と Chrome を使用しているとき、同一オリジンに対して各ブラウザは「独立したLocalStorageを持つ」か「共通のLocalStorageを持つ」か答えよ。
    - 答え: <span class="masked">独立したLocalStorageを持つ</span>
- LocalStorage に画像などのバイナリデータを保存することは「可能」か「不可能」か答えよ。
    - 答え: <span class="masked">不可能。LocalStorageは文字列（String型）のデータしか保存できない。ただし、Base64などで文字列にエンコードすれば可能である。</span>

### LocalStorage を利用した保存機能の実装

現在のTodoアプリに LocalStorage を組み込んでデータを永続化するには `src/App.tsx` に次のように実装します (<span class="masked">`useEffect` という Reactの Hook</span> の利用が実装のポイントとなります)。

まずは、実際に動かしてみてください (**リロードしてもTodoリストが初期状態に戻ってしまわないこと**を確認してください)。

```ts{.numberLines caption="src/App.tsx (データの永続化)"}
import { useState, useEffect } from "react"; // ◀◀ 追加
// ～ 省略 ～

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // ◀◀ 編集
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(3);
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);
  const [newTodoNameError, setNewTodoNameError] = useState("");

  const [initialized, setInitialized] = useState(false); // ◀◀ 追加
  const localStorageKey = "TodoApp"; // ◀◀ 追加

  // App コンポーネントの初回実行時のみLocalStorageからTodoデータを復元
  useEffect(() => {
    const todoJsonStr = localStorage.getItem(localStorageKey);
    if (todoJsonStr && todoJsonStr !== "[]") {
      const storedTodos: Todo[] = JSON.parse(todoJsonStr);
      const convertedTodos = storedTodos.map((todo) => ({
        ...todo,
        deadline: todo.deadline ? new Date(todo.deadline) : null,
      }));
      setTodos(convertedTodos);
    } else {
      // LocalStorage にデータがない場合は initTodos をセットする
      setTodos(initTodos);
    }
    setInitialized(true);
  }, []);

  // 状態 todos または initialized に変更があったときTodoデータを保存
  useEffect(() => {
    if (initialized) {
      localStorage.setItem(localStorageKey, JSON.stringify(todos));
    }
  }, [todos, initialized]);

  const uncompletedCount = todos.filter(
    (todo: Todo) => !todo.isDone
  ).length;

  // ～ 以下、省略 ～
```

ここでは `useEffect` が重要な役割を果たします。

まず、**第15行目** ～ **第29行目** の ` useEffect(() => {...}, [])` によって Appコンポーネントの <span class="masked">初回の実行時のみ (ブラウザでリロードされたときは、そのリロードの実行時のみ)</span> LocalStorage から Todoデータ をロードして `todos` にセットする仕組みをつくっています。

また、**第32行目** ～ **第36行目** の ` useEffect(() => {...}, [todos, initialized])` によって `todos` (または `initialized`) に更新があるときに、LocalStorage に `todos` をセーブする仕組みをつくっています。

じつは、ここまでの解説では、あえて触れてはいなかったのですが、「**Reactによる画面更新のための再レンダリング**」=<span class="masked">第04行目からの App関数 を再実行</span> という内部処理になっています。つまり、新規タスクの名前設定用の **テキストボックスに1文字入力するたびに** Reactにより画面の再レンダリングが実行されますが、その裏側では「**App関数の再実行**」が行なわれています (このあたりの仕組みは後述の動画を参照してください)。そのため、`useEffect` を利用しないと <span class="masked">テキストボックスに1文字打ち込むたびにTodoデータのロードやセーブが実行</span> されてしまいます。ここでは、LocalStorage を使っているため頻繁にロードとセーブをしても大きな問題はありません。しかし、一般的なウェブアプリでは **ウェブAPIを使ってデータの永続化** を行なうため、テキストボックスに１文字打ち込むたびにAPIを叩くような実装にすると、<span class="masked">短期間でAPIの利用上限に到達したり、膨大な課金が発生</span>してしまいます。注意してください。


`useEffect` の理解については [初心者向け！ReactのuseEffectが何してるのか20分で説明](https://www.youtube.com/watch?v=4INjmxXaPxU)@ Code Tips (動画) や[ウェブ検索](https://www.google.com/search?q=react+useeffect+解説)、生成AIを活用してください。

この他、永続化の処理では「LocalStorageには文字列しか保存できない」という制約に対応するために `JSON.parse()` や `JSON.stringify()` を利用しています。特に、Date型の値は `JSON.stringify()` によって文字列型に変換・保存された後、`JSON.parse()` ではDate型の値に復元されない点に注意してください (文字列型として復元されます)。そのため **第21行目** のような工夫がされています。

以上のように、この永続化の処理は様々な工夫が詰められているので、色々と実験したり読み解いたりして理解を深めてください。

### ローカルストレージの管理

ローカルストレージの管理 (確認・編集・削除) は、以下のようにウェブブラウザの**デベロッパーツール** (`F12` で起動) から行なうことができます。

![img](figs/05/chrome-01.png)

上記の❸で、右クリックして「**削除**」を選択すれば手動で当該のローカルストレージを削除することができます。

## Reactアプリを GitHub Pages にデプロイする手順

Todoアプリを GitHub Pages にデプロイ するための手順について解説します。

以前に HTML/CSS でポートフォリオサイトを作成したときとは違って、**単純に GitHub Pages の機能を有効化するだけでは「Reactアプリは機能しない」ため注意** してください。

### 準備

VSCodeのターミナルから[gh-pages](https://www.npmjs.com/package/gh-pages)というパッケージのインストールしてください。開発だけに使用するので `-D` オプションを付けてください。

```
npm i -D gh-pages
```

また、同様に `@types/node` という型定義ファイルも `-D` オプションを付けてインストールしてください。

```
npm i -D @types/node
```

プロジェクトフォルダを GitHub の **パブリックリポジトリ** として発行してください。既にリポジトリを発行済みの場合は「**コミット**」と「**同期 (Push)**」を実行しておいてください。

![img](figs/05/deploy_01.png)

![img](figs/05/deploy_02.png)

### 初回設定

これは「**初回のみ必要な処理**」となります。

<div class="note type-caution">
注意: 必ず `main` ブランチの **コミットとプッシュ (同期) を完了させた状態** で、以下の処理を実行してください。`main` ブランチのなかに「未保存のファイル」や「コミットしていないファイルが存在する状態」で以下の処理を実行すると予期せぬ問題が発生します。
</div>

VSCodeのターミナルから順番に実行してください (1行ずつ応答を確認しながら実行してください)。

```
git checkout --orphan gh-pages
git rm -rf .
git commit --allow-empty -m "Initial gh-pages commit"
git push origin gh-pages
git checkout main
```

- 途中、VSCodeで「`.gitignore` を更新しますか」という旨のダイアログが表示されることがありますが、無視してください。

以上は、**GitHub Pages でウェブサイトをホストするための準備作業** として一般的に使用される一連のコマンドです。詳細について知りたいときは、生成AIを利用してください。

なお、`git rm -rf .` によって**一時的に全ファイルが消去されますが**、 `git checkout main` で mainブランチに戻ると復活するので安心してください。

### GitHub Pages の設定

ウェブブラウザで「Todoアプリ」のリポジトリに移動して、**以下のように設定されていることを確認**してください。もし、自動的に設定されていない場合は、図のように設定してください。

![img](figs/05/deploy_03.png)

なお、この時点では、`https://xxxx.github.io/react-todo-app/` にアクセスしても <span class="masked">「404」</span> となります。実際に確認してください。

### index.html の編集と 404.html の追加

プロジェクトフォルダの直下にある `index.html` の `<head>` タグの子要素として、次のような `<script>` タグを追加してください。`index.html` の全体コードは[こちら<i class="fa-solid fa-person-chalkboard"></i>](https://github.com/TakeshiWada1980/Programming3-2025/blob/main/docs/codes/05/index.html)のようになります。

```html{.numberLines caption="index.html (抜粋)"}
<script type="text/javascript">
  (function (l) {
    if (l.search[1] === "/") {
      var decoded = l.search
        .slice(1)
        .split("&")
        .map(function (s) {
          return s.replace(/~and~/g, "&");
        })
        .join("?");
      window.history.replaceState(
        null,
        null,
        l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  })(window.location);
</script>
```

また、同様に **プロジェクトフォルダの直下** に `404.html` というファイルを新規作成して[こちら<i class="fa-solid fa-person-chalkboard"></i>](https://github.com/TakeshiWada1980/Programming3-2025/blob/main/docs/codes/05/404.html)のコードを貼付けて保存してください。

![img](figs/05/deploy_04.png)

### 各種設定ファイルの変更

`package.json` のなかに `"homepage"` を追加し、さらに `"scripts"` のなかに `"predeploy"` と `"deploy"` を追加してください。

- `"homepage"` の `xxxx` の部分は <span class="masked">自分のGitHubアカウント</span> に書き換えてください。

```json{.numberLines caption="package.json (抜粋)"}
"homepage": "https://xxxx.github.io/react-todo-app",
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
},
```

設定項目を追加する際は、**カンマ** `,` **等の付け忘れに注意**してください。また、JSONファイルに「コメント」を追加するとビルドエラーになる可能性があるので注意してください。

![img](figs/05/deploy_05.png)

`vite.config.ts` を以下のように編集してください。

```ts{.numberLines caption="vite.config.ts"}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path"; // ◀◀ 追加

const repositoryName = "react-todo-app"; // ◀◀ 追加

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // ▼▼ 追加 ここから ▼▼
  base: process.env.NODE_ENV === "production" ? `/${repositoryName}/` : "/",
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        404: path.resolve(__dirname, "404.html"),
      },
    },
  },
  // ▲▲ 追加 ここまで ▲▲
  server: {
    port: 3000,
    strictPort: false,
    open: true,
  },
});
```

一旦、ここまでの内容で「コミット」と「同期 (Push)」をしておいてください。以上で設定は終わりです。

### 発行 Publish

ここからは、Todoアプリを書き換えて、その内容を GitHub Pages に反映したいときには、<span class="masked">その都度、実行する必要がある処理</span> になります。

VSCodeのターミナルから以下のコマンドを実行してください。

```
npm run predeploy
```

このコマンドは実質的に `npm run build` と同じです。エラーがあれば修正してください。

特にエラーがなければ、以下のコマンドを実行してください。

```
npm run deploy
```

以下のように「**Published**」と出力されたらデプロイが **成功**🎉 (完了) です。以降、ソースファイルのコミットとプッシュにあわせて、適宜、上記の `npm run deploy` でデプロイを実行してください。 **デプロイ操作をしない限り、ソースコードをコミット＆プッシュしても、GitHub Pages にホストしているTodoアプリは更新されません**。

```
PS C:\Users\xxxx\Documents\react-todo-app> npm run deploy

> react-todo-app@0.0.0 predeploy
> npm run build


> react-todo-app@0.0.0 build
> tsc -b && vite build

vite v5.4.9 building for production...
✓ 69 modules transformed.
dist/index.html                  1.58 kB │ gzip:  0.77 kB
dist/404.html                    1.92 kB │ gzip:  0.82 kB
dist/assets/main-wUGgSDZ4.css    8.60 kB │ gzip:  2.30 kB
dist/assets/main-DWqE2Lov.js   232.21 kB │ gzip: 76.33 kB
✓ built in 1.64s

> react-todo-app@0.0.0 deploy
> gh-pages -d dist

Published
```

ウェブブラウザから `https://xxxx.github.io/react-todo-app/` にアクセスしてTodoアプリが実際に利用できることを確認してください。

![img](figs/05/deploy_06.png)

なお、[react-router-dom](https://www.google.com/search?q=react-router-domとは)による **ルーティング** を使ったReactアプリを GitHub Pages でホストする場合は、さらにひと工夫が求められます。これについては個別に質問してくれれば個別にレクチャします ([main.tsx](https://github.com/TakeshiWada1980/Programming3-2025/blob/main/docs/codes/05/main.tsx),[Router.tsx](https://github.com/TakeshiWada1980/Programming3-2025/blob/main/docs/codes/05/Router.tsx))。

## 課題1

以上で、(フロントエンドだけで処理が完結するような) React を使った Todoアプリ の「**チュートリアル**」は完了です。

このチュートリアルで学んだことをベースとして **オリジナルのTodoアプリ** を開発して、GitHub Pages にデプロイし、その URL を提出してください。ゼロから構築しても、チュートリアルのなかで開発したものを改良する形でも OK です。

- **_提出期限_** : **11月19日 (木) 18時**
  - 上記の期日以降に採点します。
  - 課題の採点後は、**修正版の再提出・追提出があっても原則として再評価はしません** (＝採点がフィードバックされるまでは内容を更新して問題ありません)。
- **_採点_** : GitHubリポジトリの **README** の内容を「5点満点」、アプリ本体やソースコードを「5点満点」で、**合計10点満点** で評価します。**7.6点** を標準とします。
- **_提出先_** : Teamsの「**PG3-課題1**」にリポジトリのURLを提出
  - 🚨提出するURLは「**Todo アプリをホストしている GitHub Pages の URL**」ではなく、「**GitHub リポジトリの URL**」としてください。
  - `README.md` の先頭付近に「**Todoアプリをホストしている GitHub Pages の URL**」 を記載してください。
  - `README.md` の末尾付近に「**開発期間: 2026.10.xx ~ 2026.11.xx (約XXX時間)**」のような内容を必ず記載してください。
- **_取り組み時間の目安_** : **16時間以上** ( 前回と今回の講義内容の取り組み時間を含む)。本科目は「学修単位科目」かつ「筆記試験がない科目」です。課題 (全3回) には十分な時間をかけて取り組んでください。
  - 結局、プログラミング系では、課題に取り組んでいる時間 (＝アウトプットに費やす時間) が、成長につながります。 
- **_アドバイス_** : Todoアプリとしての「**機能 (独自性)**」や「**UI/UX**」を中心とした完成度の他、リポジトリの `README.md` の内容を評価します (最低、3枚以上のスクリーンショットを添えてください)。`README.md` には、次の内容を含めるようにしてください。
    - アプリの機能やコンセプト。これを記載しておかないと「**頑張って実装した機能に気付いてもらえないこと**」があります。スクリーンショットなどがあると分かりやすいです。
      - **特に挑戦・工夫したところ、オリジナリティを持たせているところ**。それらの「着想」や「経緯」についても書かれていると (就活のポートフォリオとして) 高評価・好印象です👍また、汎用性を追求したアプリよりも、自身の体験や環境に基づく**ニッチなニーズを満たすアプリの方が圧倒的に受けが良い**です。
      - 「授業の課題だから仕方なしに作業的に作成した感」が透けて見えると低評価・悪印象です。README に「課題1」のような文言は記載しないことをお勧めします。
    - 使用技術 (技術スタック、主要ライブラリ)、開発に要した時間や期間など。

\


提出された課題 (URL) は、知能情報コースの学生 (知能情報コースを志望する1年生を含む)、本校教員に共有します。また、この課題は、**インターンシップや就職の選考にポートフォリオとして使えるもの** (=<span class="masked">自分のスキルや経験を証明するもの</span>) になるので、力を入れて取り組んで欲しいと考えています。

**(プロンプト例)**

> IT系の就活を意識したポートフォリオでは、「汎用性を追求したアプリよりも、自身の体験や環境に基づくニッチなニーズを満たすアプリの方が圧倒的に受けが良い」と言われました。どういうことですか。