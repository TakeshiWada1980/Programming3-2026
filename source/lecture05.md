---
var:
  header-title: "2026-3I プログラミング3 第04回 講義資料"
  header-date: "2026年10月23日（金）1時限"
---

# 第05回 3I-プログラミング3

## 連絡


### ここまでの流れ

本科目は学修単位科目です。**1回の授業あたり、皆さんが「4時間相当の授業時間外学習」をすることを前提** としたボリュームと展開速度となっています。1週間の間隔をあけての90分だけの取り組みで理解・習得できる内容ではないので注意してください。

初回授業から現在までの授業の流れ

1. モダンTypeScript基礎学習のための環境構築 ***済***
2. TypeScript基礎学習 ***済***
3. Reactを使ったTodoアプリのための環境構築 ***済***
4. Todoアプリ開発（Reactフロントエンド開発）のチュートリアル **← 前回と今回**
5. **\ Todoアプリのカスタマイズや作り込み** 👉 [課題1](#課題1)
    - 参考: [2024年度の学生作品 (Todoアプリ)](https://omunet-my.sharepoint.com/:t:/g/personal/z21707r_omu_ac_jp/ET7-SWbLKVlBvtsv3v5guw0BvXiUlGzUqjCKk6ES6X88-w) 学内のみ

## 新規タスクの追加

現在のTodoリストに「**新しいタスク (Todo) を追加する処理**」を実装します。

`src/App.tsx` が、次のようなコードになっていることを前提に解説します。もし、`src/App.tsx` をカスタマイズしている場合は、一旦、別名に変更するなど退避させて、以下のコードを使用して実験してください。

```ts{.numberLines caption="src/App.tsx"}
import { useState } from "react";
import type { Todo } from "./types";
import { initTodos } from "./initTodos";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./TodoList";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initTodos);
  const uncompletedCount = todos.filter((todo: Todo) => !todo.isDone).length; // 未完了タスクの数え上げ

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

いまから、このページの下部に「**追加**」というボタンを追加していきます。そして、**ユーザーがそのボタンを押下したとき**に...

1. 新しいTodoオブジェクト `newTodo` を生成する。
2. 現在のTodo配列 `todos` の末尾に `newTodo` を追加した**新しいTodo配列** `newTodos` を生成する。
    - ここで[イミュータブルな配列操作](lecture03.html#要素の追加-イミュータブルな変更)を使うことがポイントです。
3. 状態を変更する関数 `setTodos` に `newTodos` を与える (React的な作法に則って状態を更新)
    - `setTodos` は上記プログラムの  **第08行目** で `useState` によって生成されたものです。

以上の手順でTodoリストを更新し、<span class="masked">適切にウェブ画面が再レンダリング</span> されるように `src/App.tsx` をアップデートしていきます。具体的には、次のように実装します。

```ts{.numberLines caption="src/App.tsx (Todoの追加を実装)"}
import { useState } from "react";
import type { Todo } from "./types";
import { initTodos } from "./initTodos";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid"; // ◀◀ 追加

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initTodos);
  const uncompletedCount = todos.filter((todo: Todo) => !todo.isDone).length;

  // 追加: addNewTodo関数の実装
  const addNewTodo = () => {
    const newTodo: Todo = {
      id: uuid(),
      name: "新しいタスク",
      isDone: false,
      priority: 3,
      deadline: new Date(2024, 10, 13),
    };
    // スプレッド構文を使って、末尾に新タスクを追加した配列を作成
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos); // 作成した配列をtodosにセット
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

      {/* タスク追加関連のUI実装 ここから... */}
      <div className="mt-5 space-y-2 rounded-md border p-3">
        <h2 className="text-lg font-bold">新しいタスクの追加</h2>
        <button
          type="button"
          onClick={addNewTodo} // ボタンを押下したときの処理
          className="rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600"
        >
          追加
        </button>
      </div>
      {/* ...ここまで */}
    </div>
  );
};

export default App;
```

上記のプログラムでは、**新しいタスクを追加するための「addNewTodo」という関数**を **第12～24行目** にアロー関数形式で実装しています。

JavaScript (TypeScript) では、[クロージャ](https://www.google.com/search?q=プログラム+クロージャとは)という仕組みによって...

- 関数のなかに定義される関数の内部で、親となる関数が持つ変数にアクセスすることが可能

... となっています。ここで「**関数 addNewTodo**」は「**関数App**」の内部で定義されているため、**第22行目** のように **addNewTodo関数の外側にある変数** (＝**第09行目** で定義されている変数) `todos` の参照が可能になっています。なお、**Python** にもクロージャの仕組みがありますが、**C言語**ではクロージャは利用できません (そもそもC言語では、関数内部に関数を定義することができません)。

UIに関連するものとしては **第38行目**～**第47行目** にJSX要素を追加しています。特に **第42行目** の `onClick={addNewTodo}` によって、ボタンがクリックしたときに **第13行目～** に定義した「addNewTodo関数」が呼び出されるようになっている点に注目してください。なお、ここで <span class="masked">`onClick={addNewTodo()}`</span> と書いてしまう間違いが多いので注意してください。もし、両者の違いが分からないときは生成AIを使って解決してください。

**(プロンプト例)**

> TypeScript環境のReactで「Todoアプリ」を開発しています。ボタンを押下したとき に `addNewTodo` という関数 (引数なし) を実行したいです。このようなときは、ボタンの属性を `onClick={addNewTodo}` のように設定すると習いました。なぜ、`onClick={addNewTodo()}` のように書かないのですか？


**(プロンプト例)**

> TypeScriptに関する質問です。「クロージャ」とはなんですか？関数 `f1_outer` のなかに、関数 `f2_innter` を定義したとき、その内部処理で、外部 (`f1_outer`) の変数を参照できると聞いたのですが、意味不明です。あと、それにメリットはあるのですか。

### 動作確認

 `src/App.tsx` を更新・保存して、開発モード (`npm run dev`) でアプリを実行してください。以下の図ように「**追加**」ボタンを押下するたびに、**リスト末尾**に「新しいタスク」が追加されていくことが確認できます。

![img](figs/05/app_02.png)

※ 実際の実行画面 (＝**Todoリストの外観**) は「**TodoListコンポーネント** (`src/TodoList.tsx`)」の実装によって変化します。[前回講義の宿題](lecture04.html#演習-宿題-120分)として、TodoListコンポーネントをカスタマイズしてもらっているので、実行画面の外観は各々で異なるはずです。

※ Todoリストの初期値 (`src/initTodos.ts`) は [こちら<i class="fa-solid fa-person-chalkboard"></i>](https://github.com/TakeshiWada1980/Programming3-2025/blob/main/docs/codes/05/code03.ts)を使用しています。

<div class="note type-caution">
**注意**

前回講義の[演習](lecture04.html#演習-3)の一環で、`TodoList.tsx` の内部で次のように `todos` の **並び替え処理** を実装している場合は、、、

```ts{.numberLines caption="src/TodoList.tsx (抜粋・変更前)"}
// 優先度順に todos を並び替え
const todos = [...props.todos].sort((a, b) => a.priority - b.priority);
```

一時的に、**並び替えを無効**にしておいてください (initTodosの順番に表示されるようにしておいてください)。

```ts{.numberLines caption="src/TodoList.tsx (抜粋・変更後)"}
// const todos = [...props.todos].sort((a, b) => a.priority - b.priority);
const todos = props.todos;
```
</div>

#### 演習 <i class="fa-solid fa-stopwatch"></i>3分 

- 新規タスクをTodoリストの「**末尾**」ではなく「**先頭**」に追加するように変更してください。
    - **答え** <span class="masked">`const updatedTodos = [...todos, newTodo]` を `const updatedTodos = [newTodo, ...todos]` に変更</span>

確認後は、元に戻しておいてください (＝新規タスクが「末尾」に追加されるように戻しておいてください)。

### NG: Todos配列に対するミュータブルな操作

理解を深めるために[ミュータブルな配列操作](lecture03.html#参考-要素の追加と削除-ミュータブルな配列操作)を使って `todos` を更新するとどうなるか? について実験・確認しておきます。ミュータブルな操作を使って `addNewTodo` を実装した例を以下に示します。特に **第09行目** に着目してください。

```ts{.numberLines caption="src/App.tsx (抜粋・Todo追加のNG実装)"}
const addNewTodo = () => {
  const newTodo: Todo = {
    id: uuid(),
    name: "新しいタスク",
    isDone: false,
    priority: 3,
    deadline: new Date(2024, 10, 13),
  };
  todos.push(newTodo); // ミュータブルな配列操作 => ReactではNG
  setTodos(todos);
  console.log(JSON.stringify(todos, null, 2)); // todosの内容を表示
};
```

上記のように `addNewTodo` を実装すると、「追加」のボタンを押下しても <span class="masked">ウェブ画面上にはタスクが追加されない</span> ことが確認できます。ただし、**第11行目** のコンソール出力を **デベロッパーツール** (`[F12]` で起動) から確認すると、以下のように **内部的には `todos` の末尾に新しいタスクが正常に追加されていること**が確認できます。

![img](figs/05/app_01.png)

つまり、`push` メソッドなどの **ミュータブルな配列操作** で変更した配列を `setTodos` に与えても <span class="masked">React は画面の再レンダリングはしない</span> ということが確認できました。React は `setTodos` の引数に与えた **オブジェクトの参照** (C言語で言えばポインタ、Pythonで言えばオブジェクトID) が、前回から変化しているときに **変更が生じたと判断して** (=**変更を検知して**) ウェブ画面を再レンダリングする、という仕組みなっていることを覚えておいてください。

## 新規タスクの名前設定テキストボックスの追加

**新規タスクの名前** (=Todoオブジェクトの `name` プロパティ) を設定するための「**テキストボックス**」を追加します。参考動画 (=[1から簡単なTodoアプリを作ってReactの1歩を踏み出してみよう](https://www.youtube.com/watch?v=nRCNL9T3J98)) のなかでは、テキストボックス関連の処理を <span class="masked">「useRef」という React Hook</span> で実装していましたが、ここでは、あとから **バリデーション** などの処理を追加するために **_useState_** という仕組みを使って実装していきます。

![img](figs/05/app_03.png)

なお、アプリ開発の文脈において「バリデーション (Validation)」とは **データの書式や内容のチェック**、例えば <span class="masked">文字数が規定範囲内に収まっているか、文字列が有効なメールアドレス形式になっているかどうか</span> といったチェック処理を指します。


以下に、新規タスクの**名前** (`name`) を設定するための「**テキストボックス**」を実装した例を示します。

```ts{.numberLines caption="src/App.tsx (テキストボックスの追加)"}
import { useState } from "react";
import type { Todo } from "./types";
import { initTodos } from "./initTodos";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initTodos);
  const [newTodoName, setNewTodoName] = useState(""); // ◀◀ 追加
  const uncompletedCount = todos.filter((todo: Todo) => !todo.isDone).length;
  console.log(JSON.stringify(todos, null, 2));

  // ▼▼ 追加
  const updateNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    // あとでバリデーションなどの処理をここに追加する
    setNewTodoName(e.target.value);
  };

  const addNewTodo = () => {
    const newTodo: Todo = {
      id: uuid(),
      name: newTodoName, // ◀◀ 編集
      isDone: false,
      priority: 3,
      deadline: new Date(2024, 10, 13),
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setNewTodoName(""); // ◀◀ 追加
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

      <div className="mt-5 space-y-2 rounded-md border p-3">
        <h2 className="text-lg font-bold">新しいタスクの追加</h2>

        {/* テキストボックスの実装 ここから... */}
        <div className="flex items-center space-x-2">
          <label className="font-bold" htmlFor="newTodoName">
            名前
          </label>
          <input
            id="newTodoName"
            type="text"
            value={newTodoName}
            onChange={updateNewTodoName}
            className="grow rounded-md border p-2"
            placeholder="2文字以上、32文字以内で入力してください"
          />
        </div>
        {/* ...ここまで */}

        <button
          type="button"
          onClick={addNewTodo}
          className="rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600"
        >
          追加
        </button>
      </div>
    </div>
  );
};

export default App;
```

ウェブアプリにおいて「**テキストボックス**」や「**チェックボックス**」「**ラジオボタン**」など入力系UI (フォーム入力) には「`<input>` タグ」を利用します (参考: [フォーム入力の種類](https://developer.mozilla.org/ja/docs/Web/HTML/Element/input))。そして、React開発においては、一般に `<input>` タグは <span class="masked">`useRef` または `useState` を組み合わせて使用</span> します。

ここでは「新規タスクの名前」をテキストボックスから得たいので、**第10行目** において `useState` から<span class="masked">「変数 `newTodoName`」と「関数 `setNewTodoName`」</span> を生成しています (つまり `newTodoName` を「**状態**」として扱うように実装しています)。また **第10行目** では `newTodoName` の初期値を **空文字** `""` に設定しています。

- なお、**第10行目** は `useState<string>("");` のように**型を明示して初期化することも可能**です (型推論が可能なときに型を省略するか、明示するかは (個人開発では) 自由に決めてください)。

### ユーザによるUI操作と状態更新の対応付け

**第55行目** では、この `newTodoName` の内容がテキストボックスに反映されるように `<input>` タグの **value属性** を `value={newTodoName}` のように設定しています。

ただし、これだけでは**逆方向の値の反映がされません**。具体的には <span class="masked">ユーザによるテキストボックスの編集操作が、変数 `newTodoName` に対して</span> 反映されません。これを反映するには、まず **第56行目** のように `onChange={updateNewTodoName}` とする必要があります。これにより、**テキストボックスで文字列を編集するたびに**、**第17行目** で定義している「updateNewTodoName関数」がコールされるようになります (呼び出されるようになります)。この際、コールされる関数には「`React.ChangeEvent<HTMLInputElement>` 型の引数」が渡されます。この引数には、型の名前が表すように <span class="masked">HTML の Input要素 の変更イベントに関する各種情報</span> が格納されています。

**第15行目** の「updateNewTodoName関数」では、それを `e` という仮引数で受け取って `e.target.value` から「変更された文字列」を取得して、**第17行目** で`setNewTodoName` にセットしています。

#### 演習

**第57行目** のCSSクラスから `grow` を削除するとテキストボックスのスタイリングがどのように変化するか確認してください。

### ラベルタグの設定

ここでの実装例では、テキストボックス (インプット要素) に対して **ラベルタグ** `<label>` を組み合わせて使用しています。ラベルタグの **htmlFor属性** に対して「紐づけたいインプット要素の `id`」を設定すると (例えば、**第49行目** のように `htmlFor="newTodoName"` のように設定すると) ラベルをクリックしたときに <span class="masked">対応するインプットがアクティブ</span> になります。

```ts{.numberLines caption="src/App.tsx (抜粋・再掲)" startFrom=48}
<div className="flex items-center space-x-2">
  <label className="font-bold" htmlFor="newTodoName">
    名前
  </label>
  <input
    id="newTodoName"
    type="text"
    value={newTodoName}
    onChange={updateNewTodoName}
    className="grow rounded-md border p-2"
    placeholder="2文字以上、32文字以内で入力してください"
  />
</div>
```

些細な工夫ですが、確実に UI/UX の向上に繋がるので `<input>` と `<label>` は **セットで使用すること** を意識するようにしてください。

![img](figs/05/app_06.png)


## 優先度を設定するラジオボタンの追加

新規タスクの**優先度** (`priority`) を設定するための「**ラジオボタン**」を実装する例を以下に示します。

![img](figs/05/app_04.png)

ラジオボタンには、以下の **第74行目** のように属性を `type="radio"` のように設定した `<input>` タグを使用します。

```ts{.numberLines caption="src/App.tsx (ラジオボタンの追加)"}
import { useState } from "react";
import type { Todo } from "./types";
import { initTodos } from "./initTodos";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initTodos);
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(3); // ◀◀ 追加

  const uncompletedCount = todos.filter((todo: Todo) => !todo.isDone).length;

  const updateNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    // あとでバリデーションなどの処理をここに追加する
    setNewTodoName(e.target.value);
  };

  // ▼▼ 追加
  const updateNewTodoPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoPriority(Number(e.target.value)); // 数値型に変換
  };

  const addNewTodo = () => {
    const newTodo: Todo = {
      id: uuid(),
      name: newTodoName,
      isDone: false,
      priority: newTodoPriority, // ◀◀ 追加
      deadline: new Date(2024, 10, 13),
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setNewTodoName("");
    setNewTodoPriority(3); // ◀◀ 追加
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

      <div className="mt-5 space-y-2 rounded-md border p-3">
        <h2 className="text-lg font-bold">新しいタスクの追加</h2>
        <div className="flex items-center space-x-2">
          <label className="font-bold" htmlFor="newTodoName">
            名前
          </label>
          <input
            id="newTodoName"
            type="text"
            value={newTodoName}
            onChange={updateNewTodoName}
            className="grow rounded-md border p-2"
            placeholder="2文字以上、32文字以内で入力してください"
          />
        </div>

        {/* ラジオボタンの実装 ここから... */}
        <div className="flex gap-5">
          <div className="font-bold">優先度</div>
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
        {/* ...ここまで */}

        <button
          type="button"
          onClick={addNewTodo}
          className="rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600"
        >
          追加
        </button>
      </div>
    </div>
  );
};

export default App;
```

はじめに **第11行目** で、新規タスクの優先度を「状態」として管理するための `newTodoPriority` と `setNewTodoPriority` を用意していることを確認してください。また、その初期値として <span class="masked">「数値型」の `3`</span> を設定していることを確認してください。

そして、ラジオボタンが操作されたタイミングで **第21行目** で定義した `updateNewTodoPriority` がコールされて、そのなかで `setNewTodoPriority` で状態が更新される仕組みになっていることを確認してください。なお、`e.target.value` で取得される値は <span class="masked">`<input>`タグの種別や属性設定に関係なく常に「文字列型」になること</span> に注意してください。そのため **第22行目** では、`Number` 関数を使って「文字列型」から「数値型」に変換して `setNewTodoPriority` にセットしています。

Number関数を使用していないと、次のようにエラーとなります。

![img](figs/05/vscode_01.png)

---

JSX部分の「ラジオボタンの実装」は、「テキストボックスの実装」と比較すると**かなり複雑**になっています。次に、以下の点を意識しながら **第69行目** ～ **第84行** のコードを読解してください。

- 前回講義で[解説](lecture04.html#todolistコンポーネントのブラッシュアップ)したようにJSX構文のなかで `map` を利用するときは <span class="masked">map の戻り値となる最外殻の要素には「key属性」</span> を設定する必要がありました。そのため **第70行目** に「key属性」を設定しています。
    - key属性を設定しないとブラウザのコンソールに「**Warning: Each child in a list should have a unique "key" prop.**」のような警告が表示されます。
- テキストボックスを実装したときは `<label>` と `<input>` を並列に配置しました (いわゆる「兄弟」の関係になるように配置しました) 。一方で、ここでは <span class="masked">`<input>` が `<label>` の子要素</span> になるように配置 (いわゆる「親子」の関係になるように配置)しています。このように `<input>` を `<label>` の子要素とすると 「htmlFor属性」を設定せずに両者の紐づけが可能になります。
    - (ラジオボタンの本体ではなく)「1」「2」「3」という文字列のクリックすることでも **対応するラジオボタンを選択できること** を確認してください。
    - ラベルとインプットの対応付けという意味では **第72行目** の「id属性」は不要です。ただし、一般にインプット要素には「id属性」を与えることが作法であるため、ここでは ``id={`priority-${value}`}`` のように設定しています。
- ラジオボタンでは **「name属性が同じもの」がグループ化** されて、<span class="masked">そのグループのなかで1個のボタンだけが選択できる</span> ようになります。そのため **第73行目** では各ボタンとも共通で `name="priorityGroup"` を設定しています。ただし、この実装では `onChange` と `checked` で選択を制御しているため、「name属性」を設定していなくともラジオボタンとしての動作をします。ただし、ここでも一般的な作法として「name属性」を設定しています。

### 補足: onChange属性の設定

**第21行目** の関数 `updateNewTodoPriority` を**定義せず**に、**第77行目** の `onChange` に <span class="masked">「アロー関数形式」で「優先度を設定する処理」を直接的に記述すること</span> も可能です。

```ts{.numberLines caption="src/App.tsx (優先度を設定する処理をonChangeに直接記述)"}
<input
  id={`priority-${value}`}
  name="priorityGroup"
  type="radio"
  value={value}
  checked={newTodoPriority === value}
  onChange={(e) => setNewTodoPriority(Number(e.target.value))} // ◀◀ 注目
/>
```

上記のようなテクニックは、Reactでは頻繁に使われるので覚えておいてください。特に処理が短い場合は、こちらの記法が推奨されます。また、ここでは**型推論が有効になるので**、以下のように長々と「型」を記述しなくても良いことも嬉しいです。

```ts{.numberLines caption="型を明示する例" startFrom=7}
onChange={(e:React.ChangeEvent<HTMLInputElement>) => setNewTodoPriority(Number(e.target.value))}
```

### 補足: mapを使用せずにラジオボタンを構成する例

`map` を使用せずに **第67行目** ～ **第82行目** に相当するJSXを記述すると (ラジオボタンを実装すると) 次のようになります。

```ts{.numberLines caption="src/App.tsx (抜粋・mapを使用せずにラジオボタンを構成)" startFrom=67}
<div className="flex gap-5">
  <div className="font-bold">優先度</div>
  <label className="flex items-center space-x-1">
    <input
      id="priority-1"
      name="priorityGroup"
      type="radio"
      value="1"
      checked={newTodoPriority === 1}
      onChange={updateNewTodoPriority}
    />
    <span>1</span>
  </label>
  <label className="flex items-center space-x-1">
    <input
      id="priority-2"
      name="priorityGroup"
      type="radio"
      value="2"
      checked={newTodoPriority === 2}
      onChange={updateNewTodoPriority}
    />
    <span>2</span>
  </label>
  <label className="flex items-center space-x-1">
    <input
      id="priority-3"
      name="priorityGroup"
      type="radio"
      value="3"
      checked={newTodoPriority === 3}
      onChange={updateNewTodoPriority}
    />
    <span>3</span>
  </label>
</div>
```

重複する部分が多いので `map` を使ってJSXを構成するほうがスマートであることが分かると思います。

### ラジオボタンのラベルに任意の値を使用する方法

ラジオボタンの「ラベル」を次のように**任意の値** (例えば **高・中・低** など) を設定したいときの実装例を示します。

![img](figs/05/app_07.png)

このようにするためには、JSXを次のように変更します。`[1,2,3]` を `["高", "中", "低"]` に変えて、その他、いくつかの属性を変えています。

```ts{.numberLines caption="src/App.tsx (抜粋)"}
<div className="flex gap-5">
  <div className="font-bold">優先度</div>
  {["高", "中", "低"].map((value, index) => ( // ◀◀ 注目 index を追加
    <label key={value} className="flex items-center space-x-1">
      <input
        id={`priority-${value}`}
        name="priorityGroup"
        type="radio"
        value={value}
        checked={newTodoPriority === index + 1} // ◀◀ 注目
        onChange={updateNewTodoPriority}
      />
      <span>{value}</span>
    </label>
  ))}
</div>
```

さらに、上記の変更にあわせて関数 `updateNewTodoPriority` を次のようにします。上記の変更によって `e.target.value` の値が `高`、`中`、`低` のいずれかになるので、それを `switch` で振り分けています。

```ts{.numberLines caption="src/App.tsx (抜粋)"}
const updateNewTodoPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
  switch (e.target.value) {
    case "高":
      setNewTodoPriority(1);
      break;
    case "中":
      setNewTodoPriority(2);
      break;
    case "低":
      setNewTodoPriority(3);
      break;
  }
};
```

なお、上記の以外にも <span class="masked">`value={value}` を `value={index+1}`</span> のようにしてしまうスマートな方法もあります (この方法では、そもそも `updateNewTodoPriority` を変更する必要がありません)。

## 期限を設定する日時設定UIの追加

新規タスクの**期限** (`deadline`) を設定するための「**日時設定UI**」を実装する例を以下に示します。

![img](figs/05/app_05.png)

日時設定UIには、属性を `type="datetime-local"` に設定した `<input>` タグを使用します。なお、Chrome において「**2024/10/31 () 17:20**」のように**括弧の内部が表示されない**のは仕様 (バグ?) です。

- 新規タスクの期限設定を実装した `src/App.tsx` の全体のコードは[こちら<i class="fa-solid fa-person-chalkboard"></i>](https://github.com/TakeshiWada1980/Programming3-2025/blob/main/docs/codes/05/code01.tsx)を参照してください。

### 日時情報の更新 (UI→コード)

[前回講義](lecture04.html#準備-初期データの作成)で仕様を決めたように「**特に期限を設定しないTodo**」については <span class="masked">`deadline` を `null`</span> として扱うものとします。

```ts{.numberLines caption="src/types.ts (再掲)"}
export type Todo = {
  id: string;
  name: string;
  isDone: boolean;
  priority: number;
  deadline: Date | null; // ◀◀ 注目
};
```

そのため、**第13行目** ([全体コード<i class="fa-solid fa-person-chalkboard"></i>](https://github.com/TakeshiWada1980/Programming3-2025/blob/main/docs/codes/05/code01.tsx)参照) のように、期限を扱う「状態」については `useState<Date | null>` のように **型を明示して初期化** する必要があります。このように、値が**「Date型」または「null」のどちらかになり得るような型** を <span class="masked">Union型 (ユニオン型)</span> とよびます。Union型では
 **初期値から型推論が不可能** であるため明示的に型を示す必要があります。

```ts{.numberLines caption="src/App.tsx (抜粋・期限を扱う状態の初期化)" startFrom=13}
const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);
```

もし、ここで次のように **型を指定せずに初期化** してしまうと、`newTodoDeadline` は <span class="masked">null型の変数 (=値として `null` だけを持つことができる変数)</span> になってしまうので注意してください。

```ts{.numberLines caption="src/App.tsx (抜粋・NG実装)" startFrom=13}
const [newTodoDeadline, setNewTodoDeadline] = useState(null);
```

つづいて **第26行目** からは、以下のように **日時設定UIでユーザにより値が変更されたとき** にコールされる「updateDeadline関数」を定義しています。

```ts{.numberLines caption="src/App.tsx (抜粋)" startFrom=26}
const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
  const dt = e.target.value; // UIで日時が未設定のときは空文字列 "" が dt に格納される
  console.log(`UI操作で日時が "${dt}" (${typeof dt}型) に変更されました。`);
  setNewTodoDeadline(dt === "" ? null : new Date(dt));
};
```

日時設定UIを操作して日時を選択すると `e.target.value` からは <span class="masked">「2024-11-30T15:30」のようなISO8601形式の文字列</span> が得られます。実際に **第28行目** のコンソール出力の内容を確認してください。また、以下の図のように日時設定UIで「**削除**」を選択したときは `e.target.value` からは **空文字** (`""`) が得られます。

![img](figs/05/app_08.png)

このような「**2024-11-30T15:30形式の文字列**」もしくは「**空文字**」を、`Date | null` 型の `deadline` にセットするために、**第29行目** では `dt === "" ? null : new Date(dt)` のように **条件演算子** を使った変換をしています。条件演算子 (三項演算子) については[第02回講義](lecture02.html#三項演算子)で学習済みです。

これにより、`dt === ""` が「真」となるとき、`newTodoDeadline` には `null` がセットされます。また、そうでないときは <span class="masked">`new Date("2024-11-30T15:30")` で生成される「Data型オブジェクト」</span>が `newTodoDeadline` にセットされます。[Dateクラス](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date)は `"2024-11-30T15:30"` 形式の文字列を使った初期化にも対応しています (ただし、ブラウザ互換性などを考慮して、より安全に使用するためには `new Date(Date.parse(dt))` とすることが**推奨**されます)。

なお、空文字 `""` は、単体で `false` として評価されるため (<span class="masked">空文字は「falsyな値」であるため</span>)、**第29行目**は、次のように記述することもできます。

```ts{.numberLines caption="src/App.tsx (抜粋)" startFrom=29}
setNewTodoDeadline(dt ? new Date(Date.parse(dt)) : null);
```

### 日時情報の更新 (コード→UI)

上記とは逆に、`Date | null` 型の `deadline` から、日時設定UI (日時設定フォーム) に値を反映させるために、 **第99行目** で以下のように工夫を行なって **value属性** を設定しています。

```ts{.numberLines caption="src/App.tsx (抜粋)" startFrom=96}
<input
  type="datetime-local"
  id="deadline"
  value={
    newTodoDeadline
      ? dayjs(newTodoDeadline).format("YYYY-MM-DDTHH:mm:ss")
      : ""
  }
  onChange={updateDeadline}
  className="rounded-md border border-gray-400 px-2 py-0.5"
/>
```

`null` は単体で `false` の扱いになるため (<span class="masked">`null` は「falsyな値」であるため</span>)、`newTodoDeadline` が `null` のときは、value属性に「空文字 `""` 」がセットされます。

一方で `newTodoDeadline` が `null` 以外のときは、`dayjs` を利用してvalue属性に「ISO8601形式 `"YYYY-MM-DDTHH:mm:ss"` に変換された文字列」がセットされるようにしています (注意: ここでは**「秒」まで指定しないと Safari では意図した動作をしない可能性**があります)。

このように「日時」に関しては、<span class="masked">コードとUIの間で双方向の型変換</span> が必要となり、ブラウザによる挙動の違い (対応している日時フォーマットの違い) や**タイムゾーン**、使用するライブラリを十分に考慮しながら慎重に実装する必要があります。

### 「truthyな値」と「falsyな値」

JavaScript / TypeScript において、**条件式** (`if`文の条件部分や[条件演算子](lecture02.html#三項演算子)の条件部分など) で <span class="masked">論理値として評価されるとき</span> に、`true` と解釈される値を「**truthyな値**」、`false` と解釈される値を「falsyな値」といいます。

「**falsyな値**」は `false`、`""`（空文字）、`null`、`undefined`、`0`、`-0`、`0n`、`NaN`で、それ以外は 「**truthyな値**」となります。

特に注意すべきは、`[]` (空配列) や、`{}` (空オブジェクト)、`"0"` (文字列の0) で、これらは <span class="masked">truthyな値</span> となります。

- 参考: `0n` は[BigInt](https://www.google.com/search?q=javascript+bigintとは)という非常に大きな整数 (Number型の範囲を超えるような値) を扱うためのデータ型における「0」です。

#### 定着確認

定数 `hoge` に代入される値を答えよ。

- `const hoge = "" ? "truthyな値" : "falsyな値";`
  - 答え <span class="masked">`"falsyな値"`・偽と解釈</span>
- `const hoge = 0.000 ? "truthyな値" : "falsyな値";`
  - 答え <span class="masked">`"falsyな値"`・偽と解釈</span>
- `const hoge = "0" ? "truthyな値" : "falsyな値";`
  - 答え <span class="masked">`"truthyな値"`・真と解釈</span>
- `const hoge = null ? "truthyな値" : "falsyな値";`
  - 答え <span class="masked">`"falsyな値"`・偽と解釈</span>
- `const hoge = [] ? "truthyな値" : "falsyな値";`
  - 答え <span class="masked">`"truthyな値"`・真と解釈</span>
- `const hoge = [false] ? "truthyな値" : "falsyな値";`
  - 答え <span class="masked">`"truthyな値"`・真と解釈</span>

確認には[paiza.io](https://paiza.io/ja/projects/new)などを利用してください。

## バリデーション

現状では、新規タスクの「名前」のテキストボックスが空欄であっても、「追加」のボタンを押下すればタスクが追加できてしまいます。ここでは「**2文字以上、32文字以内でテキストボックスに名前が入力されていないとき」はタスクが追加できないように設定**していきます。

単純には「addNewTodo関数」の先頭に、次のような処理 (**第02行目～第04行目**) を追加すれば、この処理が可能になります。実際に試してみてください。

```ts{.numberLines caption="src/App.tsx (抜粋・バリデーション機能の実装)"}
const addNewTodo = () => {
  if (newTodoName.length < 2 || newTodoName.length > 32) {
    return;
  }
  const newTodo: Todo = {
    id: uuid(),
    name: newTodoName,
    isDone: false,
    priority: newTodoPriority,
    deadline: newTodoDeadline,
  };
  const updatedTodos = [...todos, newTodo];
  setTodos(updatedTodos);
  setNewTodoName("");
  setNewTodoPriority(3);
  setNewTodoDeadline(null);
};
```

上記の処理によって、「追加」のボタンを押下しても `newTodoName` が条件を満たしていなければタスクが追加できないようになりました。しかし、このままでは **UI/UX 的には大きな課題**が残ります (ユーザが「**なぜタスクが追加できないのか**」に気づきづらい不親切な UI/UX になっている)。

そこで、条件を満たしていないときは、以下のように**画面上に注意喚起のメッセージを表示**するようにアプリを改良していきます。このために `newTodoNameError` という **文字列型の変数 (状態)** を導入します。そして、テキストボックスに入力されている値が適切であれば、この `newTodoNameError` には空文字 `""` が格納し、そうでないときは <span class="masked">不備を指摘する文字列</span> を格納するようにします。また、`newTodoNameError` を参照して、不備があるときは <span class="masked">「追加」ボタンが押下できない</span> ようにします。

![img](figs/05/app_09.png)

- このバリデーションを実装した `src/App.tsx` の全体のコードは[こちら<i class="fa-solid fa-person-chalkboard"></i>](https://github.com/TakeshiWada1980/Programming3-2025/blob/main/docs/codes/05/code02.tsx)を参照してください。まずは、コピペして動作を確認することからはじめたほうが分かりやすいと思います。

特に **第79行目** から **第107行目** にかけて大幅に書き換えをしています (その他の部分についても編集や追記があるので注意してください)。

```ts{.numberLines caption="src/App.tsx (抜粋)" startFrom=79}
{/* 編集: ここから... */}
<div>
  <div className="flex items-center space-x-2">
    <label className="font-bold" htmlFor="newTodoName">
      名前
    </label>
    <input
      id="newTodoName"
      type="text"
      value={newTodoName}
      onChange={updateNewTodoName}
      className={twMerge(
        "grow rounded-md border p-2",
        newTodoNameError && "border-red-500 outline-red-500"
      )}
      placeholder="2文字以上、32文字以内で入力してください"
    />
  </div>
  {newTodoNameError && (
    <div className="ml-10 flex items-center space-x-1 text-sm font-bold text-red-500">
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        className="mr-0.5"
      />
      <div>{newTodoNameError}</div>
    </div>
  )}
</div>
{/* ...ここまで */}
```

このコードのなかで特に注意してほしいのは **第97行目** の論理演算子 `&&` を使った処理になります。この処理は、React では頻繁に使用されるテクニックで <span class="masked">条件付きレンダリング</span> と呼ばれます。

React のJSX構文のなかで、例えば `{ hoge && (<div>こんにちは</div>)}` というコードを書くと、変数 `hoge` が `false`、`null`、`undefined` のいずれかのときは、**そこに何もレンダリングされません** (つまり `{...}` の部分が存在していないのと同等の扱いとなります)。

一方で、`hoge` が **truthyな値** のときは `<div>こんにちは</div>` がレンダリングされます。ただし、**falseな値** でも `0` と `""` は例外的に、以下のようになるので注意してください。

- `hoge` が `0` のときは、<span class="masked">数値の「0」がレンダリング</span> されます。
- `hoge` が空文字 `""` のときは**空文字がレンダリング**されます（画面上には何も表示されませんが、DOM上には存在します）

同様に、**第92行目** でもこのテクニックを使用しています。`twMerge` は[前回講義](lecture04.html#準備-ライブラリのインストール)でインストールした **tailwind-merge ライブラリ** から、以下のようにインポートしている関数です。この `twMerge` は <span class="masked">Tailwind CSS のクラスを衝突を回避しながら結合する機能を持った関数</span> となります。

```ts{.numberLines caption="src/App.tsx (抜粋)" startFrom=8}
import { twMerge } from "tailwind-merge"; // ◀◀ 追加
```

**第92行目**の `twMerge("grow rounded-md border p-2", newTodoNameError && "border-red-500 outline-red-500")}` は、`newTodoNameError` が「**空文字** `""` のとき」は <span class="masked">`twMerge("grow rounded-md border p-2")`</span> と等価になります。

そうでないときは `twMerge("grow rounded-md border p-2", "border-red-500 outline-red-500")}` と等価になります。つまり、新規タスクの名前に不備があるとき (文字数が 2文字以上32文字以内になっていないとき) <span class="masked">テキストボックスの枠を赤線にするクラスを追加する仕組み</span> をつくっています。

`twMerge` の必要性については [Tailwind CSS初心者が絶対ハマる落とし穴](https://www.youtube.com/watch?v=LMixhEfxI9k)@
ムーザルちゃんねる (動画) を参考にしてください。

### 補足: React Hook Form と Zod

Reactにおいて、テキストボックスやラジオボタンなどを用いた **フォーム処理** には[ReactHookForm](https://www.react-hook-form.com/)というライブラリが活用できます。このTodoアプリのように入力項目が少ない場合は、現状のように useState を使ったシンプルな実装で十分ですが、フォームの規模が大きくなるほど **ReactHookFormの導入効果** が高まります。

また、フォームのバリデーションには[zod](https://www.google.com/search?q=react+zodとは)というライブラリが活用できます。これは、ReactHookFormと組み合わせて使用可能であり、以下ような型安全なバリデーションルールを宣言的に記述できます。TypeScriptとの相性も良く、入力値の型推論も自動的に行われるため、開発効率の向上が期待できます。

- 必須項目のチェック
- 文字数制限や数値範囲の検証
- メールアドレスや電話番号などの形式チェック
- カスタムバリデーションルールの追加

フロントエンド開発を目指す人は、これらのライブラリを積極的に利用して[課題1](lecture05.html#課題1)に取り組んでください。

- 参考: [zodを利用したバリデーションと型定義について](https://takeshiwada1980.github.io/Eii2-2025/security01b.html#zod-を利用したバリデーションと型定義について)@ 4年・知能情報実験実習2

## 既存Todoの 完了/未完了 の切り替え

既存の Todo について `isDone` の `true`/`false` を切り替える機能を実装します。ここでは、次のように **チェックボックス** と紐づけて `isDone` の値 (つまり完了/未完了) を切り替えるようにしていきます。

![img](figs/05/app_10.png)

<div class="note type-caution">
ここからは**意図的に** `App.tsx` **と** `TodoList.tsx` **の全体コードを提供しません**。ここまでの内容を十分に理解し、以降で提供されるコードの断片を「**自分のコードのどこに配置すればよいか？**」を考えながら作業を進めてください。
</div>

まずは、`src/App.tsx` のなかに、次のような `updateIsDone` 関数を追加します。

```ts{.numberLines }
const updateIsDone = (id: string, value: boolean) => {...}
```

この関数は、引数で受け取った `id` と一致する Todo について、その `isDone` プロパティの値を引数 `value` の値で上書きするものです。例えば `updateIsDone("a001",false)` のように関数をコールしたら、`id` が `a001` のTodoの `isDone` を `false` に更新する機能を持たせます。特に、`todos` が変更されたことを **React が確実に検知できるように** <span class="masked">「`map`」と「スプレッド構文」を使ってイミュータブルな操作</span> で処理するように実装する必要があります。

- [スプレッド構文によるイミュータブルなオブジェクト更新](lecture03.html#イミュータブルなオブジェクト更新)@第03回講義

次の `updateIsDone` を `src/App.tsx` のなかの **適切な位置** に追記してください。

```ts{.numberLines caption="src/App.tsx (抜粋・updateIsDone関数の追加) "}
const updateIsDone = (id: string, value: boolean) => {
  const updatedTodos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, isDone: value }; // スプレッド構文
    } else {
      return todo;
    }
  });
  setTodos(updatedTodos);
};
```  

次に `src/TodoList.tsx` において、各Todoの情報を表示している UI に **チェックボックス** を追加し、そこに `checked={todo.isDone}` の属性を設定して「**完了/未完了の状態** (`isDone`プロパティ)」と「**チェックボックスのオンオフ**」を連動させます。

以下のコードを参考に、`src/TodoList.tsx` のなかでTodoの情報を表示している UI に「チェックボックス」を追加してください。

```ts{.numberLines caption="src/TodoList.tsx (抜粋)"}
<div>
  {todos.map((todo) => (
    {/* 略 */}
    <input
      type="checkbox"
      checked={todo.isDone} // ◀◀ 注目
      className="mr-1.5 cursor-pointer"
    />
    {/* 略 */}
  )}
</div>
``` 

これを実装すると、次のように Todo の UI に **チェックボックス** がついて、`isDone` の値 (初期値) を反映した **オン/オフ** がつきます。ただし、現状では、まだ <span class="masked">チェックボックスをクリックしてもオンオフが変化</span> しません。

デベロッパーツール (`F12`で起動) を確認すると、コンソール出力には「**You provided a 'checked' prop to a form field without an 'onChange' handler. This will render a read-only field. If the field should be mutable use 'defaultChecked'. Otherwise, set either 'onChange' or 'readOnly'.**」 という警告が表示されています。

![img](figs/05/app_10.png)

**チェックボックスのクリックによって**、当該Todoの `isDone` プロパティを変更して、UI表示も更新するためには、<span class="masked">先に定義した「updateIsDone関数」をコールする</span> 必要があります。

ただし、`updateIsDone` 関数は Appコンポーネント (`src/App.tsx`) の内部に定義しているため、`src/TodoList.tsx` からは**直接的にコールすることはできません**。このようなとき、React では **Props を使って親コンポーネントから子コンポーネントに「関数」を渡す** ということで解決します。

- 「**Props (プロップス) って何?**」という人は[前回講義の内容](lecture04.html#todoアプリの実装)の復習からはじめてください。

まずは、`src/TodoList.tsx` において、Props 経由で `updateIsDone` を受け取れるように **Propsの型定義** を次のように変更します。これにより <span class="masked">文字列型と真偽値型の引数を持ち、戻り値がない関数を `updateIsDone` という名前</span> で受け取れるようになります。

```ts{.numberLines caption="src/TodoList.tsx (抜粋)"}
type Props = {
  todos: Todo[];
  updateIsDone: (id: string, value: boolean) => void; // ◀◀ 追加
};
``` 

また、ユーザによってチェックボックスが操作されたタイミングで、Props 経由で受け取った `updateIsDone` をコールするように、チェックボックスの「**onChange属性**」を次のように設定します。ここでは、先に紹介したように[onChangeにアロー関数形式で直接的に処理を記述](lecture05.html#補足-onchange属性の設定)しています。

```ts{.numberLines caption="src/TodoList.tsx (抜粋)"}
<input
  type="checkbox"
  checked={todo.isDone}
  onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
  className="mr-1.5 cursor-pointer"
/>
``` 

最後に `src/App.tsx` のなかで、TodoListコンポーネントに対して「updateIsDone関数」を渡すように変更します。

```ts{.numberLines caption="src/App.tsx (抜粋・変更前)"}
<TodoList todos={todos}/>
```

```ts{.numberLines caption="src/App.tsx (抜粋・変更後)"}
<TodoList todos={todos} updateIsDone={updateIsDone} />
```

以上で、チェックボックスを操作して「**既存のTodoの完了/未完了を切り替えること**」が可能になりました。内部的にも `todos` のなかの当該Todoの `isDone` プロパティが変更されています。

### NG実装：ミュータブルな操作でオブジェクト配列の要素を変更

上記の解説では `updateIsDone` を次のようにスプレッド構文を使用して **イミュータブルな操作** で処理するように実装しました。

```ts{.numberLines caption="(再掲) updateIsDone関数"}
const updateIsDone = (id: string, value: boolean) => {
  const updatedTodos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, isDone: value }; // スプレッド構文
    } else {
      return todo;
    }
  });
  setTodos(updatedTodos);
};
```  

これを次のように**ミュータブルな操作**で処理してしまうと意図するように機能しなくなります。実際に書き換えて確かめてください。


```ts{.numberLines caption="(NGな実装) updateIsDone関数"}
const updateIsDone = (id: string, value: boolean) => {
  for (const todo of todos) {
    if (todo.id === id) {
      todo.isDone = value; // オブジェクトを直接変更
    }
  }
  setTodos(todos);
};
```

これは繰返し説明しているように、Reactでは画面の再レンダリングが「**参照の変更を検知すること**」で実行されるためです。上記のような処理では `setTodos(todos)` をコールしても、引数の `todos` 参照が同じ配列を指したままとなるため、Reactは変更を検知せず再レンダリングは発生しません。

### 完了済みのタスクを削除するボタンの追加

完了済みのタスクを一括削除する機能を実装します。[第03回講義](lecture03.html#オブジェクト型の配列に対するfilterの適用)で学んだ「**filter**」を利用しています。

`src/App.tsx` に次の `removeCompletedTodos` 関数を追加してください。

```ts{.numberLines caption="src/App.tsx (抜粋)"}
const removeCompletedTodos = () => {
  const updatedTodos = todos.filter((todo) => !todo.isDone);
  setTodos(updatedTodos);
};
```

つづいて、`removeCompletedTodos` 関数を呼び出すためのボタンを追加してください。

```ts{.numberLines caption="src/App.tsx (抜粋)"}
<button
  type="button"
  onClick={removeCompletedTodos}
  className={
    "mt-5 rounded-md bg-red-500 px-3 py-1 font-bold text-white hover:bg-red-600"
  }
>
  完了済みのタスクを削除
</button>
```

「完了済みのタスクを削除」のボタンを押下することで、実際に完了済みタスクの一括削除ができることを確認してください。

![img](figs/05/app_11.png)

## タスクの個別削除

次のように完了/未完了に関係なく **タスクを個別に削除する機能** を実装します。

![img](figs/05/app_12.png)

まずは `src/App.tsx` のなかに、次の `remove` 関数を追加してください。これは引数で受け取った `id` に該当する Todo を削除する関数になります。

```ts{.numberLines caption="src/App.tsx (抜粋)"}
const remove = (id: string) => {
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  setTodos(updatedTodos);
};
```

そして、この `remove` 関数を Props として「TodoListコンポーネント」に渡すようにします。

```ts{.numberLines caption="src/App.tsx (抜粋)"}
<TodoList todos={todos} updateIsDone={updateIsDone} remove={remove} />
```

次に、`src/TodoList.tsx` で、**Propsの型定義** を次のように変更します。

```ts{.numberLines caption="src/TodoList.tsx (抜粋)"}
type Props = {
  todos: Todo[];
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void; // ◀◀ 追加
};
```

さらに、個々のTodoを表示するUIに「削除」のボタンを追加し、クリックされたときに、`id` を引数にして `remove` 関数をコールするようにします。

```ts{.numberLines caption="src/TodoList.tsx (抜粋)"}
<button
  onClick={() => props.remove(todo.id)}
  className="rounded-md bg-slate-200 px-2 py-1 text-sm font-bold text-white hover:bg-red-500"
>
  削除
</button>
```

## リファクタリング: コンポーネントに分割

TodoListコンポーネントが肥大化してきたので、個々のTodoを「**TodoItemコンポーネント** (`src/TodoItem.tsx`)」に切り分けます。Reactでは、コンポーネントに分割可能なものは、できるだけコンポーネントに分割するようにしてください。

実装例を以下に示します。

まずは、個々のTodo情報を表示するための `src/TodoItem.tsx` を新規作成します。ほとんどの部分は、既存の `src/TodoList.tsx` から移植して作成できると思います。

**(以下のコードは、必要最低限の情報とUIだけを記述したものです)**

```ts{.numberLines caption="src/TodoItem.tsx (新規作成)"}
import React from "react";
import type { Todo } from "./types";

type Props = {
  todo: Todo;
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
};

const TodoItem = (props: Props) => {
  const todo = props.todo;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
          className="mr-1.5 cursor-pointer"
        />
        {todo.name}
      </div>
      <div>
        <button
          onClick={() => props.remove(todo.id)}
          className="rounded-md bg-slate-200 px-2 py-1 text-sm font-bold text-white hover:bg-red-500"
        >
          削除
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
```

上記で新規作成した「TodoItemコンポーネント」を、既存の「TodoListコンポーネント」から呼び出すようにします。特に **第03行目** と、**第24行目** から **第31行目** に注目して読解してください。

```ts{.numberLines caption="src/TodoList.tsx (編集)"}
import React from "react";
import type { Todo } from "./types";
import TodoItem from "./TodoItem"; // ◀◀ 追加

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
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          remove={props.remove}
          updateIsDone={props.updateIsDone}
        />
      ))}
    </div>
  );
};

export default TodoList;
```

## LocalStorageを利用したデータの永続化

現状のTodoアプリは、Todoの追加や削除をしてもブラウザをリロード (再読み込み) すると初期状態に戻ってしまいます。このままでは、Todoアプリとして実用的に使えないため <span class="masked">データの永続化 (Data Persistence)</span> の機能が必要となります。「**データの永続化**」とは、簡単に言えば **ブラウザをリロードしたとき** や **次回アクセスしたとき** にも継続的にアプリを利用できるように <span class="masked">データや状態を不揮発性の領域に保存すること</span> です。

ウェブアプリにおいて「データの永続化」は、通常、**バックエンド側 (サーバ側) でデータベース (RDBやNoSQLなど)** を利用して実装されます。バックエンドでの実装することで、ユーザは異なるデバイスからアクセスしても (ユーザ認証を経たうえで) 継続的にアプリの利用ができます。

しかし、まだ現時点ではバックエンド開発は学んでいないので、ここではブラウザの「**LocalStorage**」という機能を使って、**フロントエンドでのデータの永続化** を実装します。LocalStorage とは、ウェブブラウザに組み込まれている **キーバリュー型のストレージ機能** (Pythonの `dict` のようなシンプルな <span class="masked">「キー(key)」と「値(Value)」のペアでデータを保存する機能</span>) で、ブラウザを終了してもデータが残ることが特徴です。

### LocalStorage とは

LocalStorageは、JavaScriptの **Window.localStorage API** を通じて利用可能で、保存可能なデータは <span class="masked">文字列 (string型) のみ</span> ですが、**約5MB** までのデータが保存可能となっています。

LocalStorageは **ブラウザごとに独立した保存領域** を持ちます。例えば `https://hoge777.github.io/react-todo-app/` にホストされた TodoApp に2人のユーザ「寝屋川タヌキ」と「萱島ウサギ」がアクセスした場合、各データは <span class="masked">各ユーザーが使用するデバイスのブラウザに独立して保存</span> されます。

そのため、例えば寝屋川タヌキが「高専に侵入」というTodoを追加しても、萱島ウサギは影響を受けません。

<div class="note type-tips">
**LocalStorage の容量制限**

LocalStorage は、**1オリジンあたり約5MB** が一般的な容量制限になっています。ここでの「オリジン」とは「**プロトコル（http/https）**」「**ドメイン**」「**ポート**」の組み合わせを指します。


例えば、Todoアプリを GitHub Pagaes にデプロイするとすれば、次のようになります。

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

まずは、実際に動かしてみてください (**リロードしてもTodoリストが初期状態に戻ってしまわないこと**確認してください)。

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

じつは、ここまでの解説では、あえて触れていはいなかったのですが、「**Reactによる画面更新のための再レンダリング**」=<span class="masked">第04回行目からの App関数 を再実行</span> という内部処理になっています。つまり、新規タスクの名前設定用の **テキストボックスに1文字入力するたびに** Reactにより画面の再レンダリングが実行されますが、その裏側では「**App関数の再実行**」が行なわれています (このあたりの仕組みは後述の動画を参照してください)。そのため、`useEffect` を利用しないと <span class="masked">テキストボックスに1文字打ち込むたびにTodoデータのロードやセーブが実行</span> されてしまいます。ここでは、LocalStorage を使っているため頻繁にロードとセーブをしても大きな問題はありません。しかし、一般的なウェブアプリでは **ウェブAPIを使ってデータの永続化** を行なうため、テキストボックスに１文字打ち込むたびにAPIを叩くような実装にすると、<span class="masked">短期間でAPIの利用上限に到達したり、膨大な課金が発生</span>してしまいます。注意してください。


`useEffect` の理解については [初心者向け！ReactのuseEffectが何してるのか20分で説明](https://www.youtube.com/watch?v=4INjmxXaPxU)@ Code Tips (動画) や[ウェブ検索](https://www.google.com/search?q=react+useeffect+解説)、生成AIを活用してください。

この他、永続化の処理では「LocalStorageには文字列しか保存できない」という制約に対応するために `JSON.parse()` や `JSON.stringify()` を利用しています。特に、Date型の値は `JSON.stringify()` によって文字型に変換・保存された後、`JSON.stringify()` にはDate型の値に復元されない点に注意してください (文字列型として復元されます)。そのため **第21行目** のような工夫がされています。

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

- **_提出期限_** : **11月19日 (水) 23時**
  - 上記の期日以降に採点します。
  - 課題の採点後は、**修正版の再提出・追提出があっても原則として再評価はしません** (＝採点がフィードバックされるまでは内容を更新して問題ありません)。
- **_採点_** : GitHubリポジトリの **README** の内容を「5点満点」、アプリ本体やソースコードを「5点満点」で、**合計10点満点** で評価します。**7.6点** を標準とします。
- **_提出先_** : Teamsの「**PG3-課題1**」にリポジトリのURLを提出
  - 🚨提出するURLは「**Todo アプリをホストしている GitHub Pages の URL**」ではなく、「**GitHub リポジトリの URL**」としてください。
  - `README.md` の先頭付近に「**Todoアプリをホストしている GitHub Pages の URL**」 を記載してください。
  - `README.md` の末尾付近に「**開発期間: 2025.10.xx ~ 2025.11.xx (約XXX時間)**」のような内容を必ず記載してください。
- **_取り組み時間の目安_** : **16時間以上** ( 前回と今回の講義内容の取り組み時間を含む)。本科目は「学修単位科目」かつ「筆記試験がない科目」です。課題 (全3回) には十分な時間をかけて取り組んでください。
  - 結局、プログラミング系では、課題に取り組んでいる時間 (＝アウトプットに費やす時間) が、成長につながります。 
- **_アドバイス_** : Todoアプリとしての「**機能 (独自性)**」や「**UI/UX**」を中心とした完成度の他、リポジトリの `README.md` の内容を評価します (最低、3枚以上のスクリーンショットを添えてください)。`README.md` には、次の内容を含めるようにしてください。
    - アプリの機能やコンセプト。これを記載しておかないと「**頑張って実装した機能に気付いてもらえないこと**」があります。スクリーンショットなどがあると分かりやすいです。
      - **特に挑戦・工夫したところ、オリジナリティを持たせているところ**。それらの「着想」や「経緯」についても書かれていると (就活のポートフォリオとして) 高評価・好印象です👍また、汎用性を追求したアプリよりも、自身の体験や環境に基づく**ニッチなニーズを満たすアプリの方が圧倒的に受けが良い**です。
      - 「授業の課題だから仕方なしに作業的に作成した感」が透けて見えると低評価・悪印象です。README に「課題1」のような文言は記載しないことをお勧めします。
    - 使用技術 (技術スタック、主要ライブラリ)、開発に要した時間や期間など。

\


提出された課題 (URL) は、知能情報コースの学生 (知能情報コースを志望する1年生を含む)、本校教員に共有します。また、この課題は、**インターンシップや就職の選考にポートフォリオとして使えるもの** (=<span class="masked">自分のスキルをや経験を証明するもの</span>) になるので、力を入れて取り組んで欲しいと考えています。

**(プロンプト例)**

> IT系の就活を意識したポートフォリオでは、「汎用性を追求したアプリよりも、自身の体験や環境に基づくニッチなニーズを満たすアプリの方が圧倒的に受けが良い」と言われました。どういうことですか。