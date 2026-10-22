---
var:
  header-title: "2026-3I プログラミング3 第04回 講義資料"
  header-date: "2026年10月16日（金）1時限"
---

# 第04回 3I-プログラミング3

## 本日の授業概要と連絡

### 小テスト❸

「小テスト❸」を実施します。筆記用具を準備しておいてください。

### 情報共有

- [第37回高専プロコン（2026年 香川（高松）大会）](https://www.procon.gr.jp/)
  - YouTube配信リンクは公式ページの「放送予定」を参照
- [第36回高専プロコン（2025年 松江大会）](https://www.youtube.com/watch?v=8qzc-e9Czqc&list=PLTPqb9X7I-Lm7SDmwfmjg0oT-lvUmhRmU) YouTube配信 2025/10/11・12
- [第35回高専プロコン（2024年 奈良大会）](https://www.youtube.com/playlist?list=PLTPqb9X7I-LlS8ZbJgHDC4DtaYo_DKszV)YouTube配信 2024/10/19・20

### 今回の達成目標

- Vite を使って React・TypeScript・Tailwind CSS の開発環境を構築し、アプリの起動・ビルド・動作確認ができる。
- コンポーネントと Props の役割、`useState` による状態の更新と画面表示の関係を説明できる。
- Todo 配列を `map` で一覧表示し、Tailwind CSS を使って画面の見た目を調整できる。

## ここまでの流れ

後期中間試験ぐらいまでの授業の流れ (予定)

1. モダンTypeScript基礎学習のための環境構築 ***済***
2. TypeScript基礎学習
    - **<u>React / Next.js 開発に関連する文法や機能だけを集中的に学びます</u>**。
3. React を用いた「Todoアプリ」開発のための環境構築 <font color="deeppink"><b>← 今回の授業のメイン</b></font>
4. Todoアプリの設計・実装 (Reactによるフロントエンド) のチュートリアル ← **今回と次回**
5. Todoアプリのカスタマイズや作り込み → 📝**課題1**
    - 参考: [2025年度の学生作品](https://omunet-my.sharepoint.com/:t:/g/personal/z21707r_omu_ac_jp/IQC1PJskZdyCSZ8tH_0DUchyAWpzGP7ILbgQAaEtJ39a7M4?e=lUsZM5) (学内のみ)
    - 参考: [2024年度の学生作品](https://omunet-my.sharepoint.com/:t:/g/personal/z21707r_omu_ac_jp/ET7-SWbLKVlBvtsv3v5guw0BvXiUlGzUqjCKk6ES6X88-w) (学内のみ)


しばらく、次のような「Todoアプリ」を開発することを目標として授業が展開します。

- [Todoアプリのサンプル](https://takeshiwada1980.github.io/react-todo-app-demo/) (チュートリアルそのままに近いもの)
- [Todoアプリのサンプル](https://takeshiwada1980.github.io/react-todo-app-demo/2) (内容を理解して機能追加やカスタマイズされたもの)

## React開発環境の構築

[Vite](https://www.google.com/search?q=viteとは) という**ビルドツール**を使用して TypeScript と Tailwind CSS を組み合わせた **React アプリケーションの開発環境を構築する手順について解説** していきます。

**<i class="fa-solid fa-comment-dots fa-flip-horizontal"></i>プロンプト例**

> React を用いたウェブアプリ (Todoアプリ) 開発で、Tailwind CSS というものを使うことになりました。ノーマルな CSS は少し書いたことがあるのですが、Tailwind CSS とはどのようなものなのですか？過去に CSS を書いた経験は生きますか？

### 準備

ターミナル (PowerShell) を開いてプロジェクトフォルダを配置したいフォルダ (例えば `C:\Users\xxxx\Documents\` など) に**移動**してください。

いまから、このフォルダのなかに `react-todo-app` というプロジェクトフォルダを作成して、そこに開発環境を構築していきます。

<div class="note type-caution">
**注意**

ドキュメントフォルダを **OneDrive と同期**している学生は、同期対象外のフォルダ (`c:\work` など) で作業することを強く推奨します。OneDrive の同期対象フォルダ内で開発作業を行うと、予期せぬトラブルが発生したり、OneDrive のストレージ容量を圧迫したりする可能性があります。

また、`react-todo-app` フォルダを含む **パス全体に日本語** が含まれないようにしてください。
</div>

### Viteによるプロジェクトフォルダの作成

ここでは、[Vite](https://vite.dev/) という **ウェブアプリケーション開発用のビルドツール**を使用して開発環境を構築していきます。前回まで使用していた **Node.js と npm** を、引き続き使用します。

- Vite は「ビート」または「ヴィート」と読みます。

ターミナルを開いて、プロジェクトフォルダを作成したい位置 (`C:\Users\xxxx\Documents\` など) に移動し、以下のコマンドを実行してください。

```bash
npx create-vite@9.2.1 react-todo-app --template react-ts --eslint --no-immediate
```

このコマンドを実行すると **create-vite** というツールによって、React アプリの開発に必要なファイルや設定、つまりテンプレートが自動的に生成されます。コマンドに指定している各オプションの意味は、次のとおりです。

- `@9.2.1` は、テンプレートを生成するツール (`create-vite`) のバージョンを指定しています。Vite 本体のバージョンとは異なります。

- `react-todo-app` は、**プロジェクトの名称** (=新規作成するプロジェクトフォルダの名前) を指定しています。
- `--template react-ts` は、<span class="masked">React と TypeScript を組み合わせた開発環境のテンプレート</span>を指定しています。
- `--eslint` は、コード品質チェックツールとして **ESLint** を使用する指定です。
- `--no-immediate` は、テンプレートの作成後にパッケージのインストールや開発サーバの起動を自動では行なわない指定です。このあと、授業で使用するバージョンを指定してインストールします。


**<i class="fa-solid fa-comment-dots fa-flip-horizontal"></i>プロンプト例**

> TypeScript 開発の文脈で「ESLint」とはなんですか？コード品質チェックツールと説明されたのですがイメージが掴めません。

::: {.note .type-tips}
**create-react-app**

以前は、`npx create-react-app` というコマンドを使用して React アプリの開発環境を構築する方法が広く利用されていました。しかし、**Create React App は 2025 年 2 月に公式に非推奨となった**ため、本授業では代わりに **Vite** を使用します。
:::


::: {.balloon .char-01 .face-05 .tone-blue}
`npx create-vite` を初めて実行するときなどは、以下のように尋ねられるので、続行するために `y` を入力してください。

```bash
Need to install the following packages:
create-vite@9.2.1
Ok to proceed? (y)
```
:::

create-vite によるテンプレートの生成が正常に完了すると、以下のようなメッセージが表示されます。

```
◇  Scaffolding project in C:\Users\xxxx\Documents\react-todo-app...
│
└  Done. Now run:

  cd react-todo-app
  npm install
  npm run dev
```

通常は、表示された案内に従って `cd react-todo-app`、`npm install`、`npm run dev` を順番に実行すれば、必要なライブラリがインストールされ、React アプリが起動できます。

ただし、**本授業では、使用する主要ライブラリのバージョンをそろえるために、バージョンを指定してインストール**します。以下のコマンドを、上から順に実行してください。

```bash
cd react-todo-app
```

```bash
npm i --save-exact react@19.3.0 react-dom@19.3.0
```

```bash
npm i -D --save-exact vite@8.3.4 @vitejs/plugin-react@6.1.2 @types/react@19.3.0 @types/react-dom@19.3.0
```

```bash
npm i -D @types/node
```

```bash
npm i -D --save-prefix="~" typescript@~6.0.3
```

`npm i` でインストールされたライブラリのバージョンは、第01回講義で紹介したように `npm list --depth=0` や `npx tsc --version` で確認することができます。


::: {.balloon .char-01 .face-05 .tone-blue}
**package-lock.json** に記録された環境を復元するときは `npm ci` を使用します。
:::

以上により、プロジェクトのテンプレートが作成され (＝**スキャフォールディング**)、依存パッケージのインストールまでが完了しました。

**<i class="fa-solid fa-comment-dots fa-flip-horizontal"></i>プロンプト例**

> ウェブアプリ開発環境構築に関する文脈で「スキャフォールディング」とは、どのような意味ですか。

つづいて、次のコマンドで **開発サーバを起動** してください。

```bash
npm run dev
```

ターミナルに以下のような表示が出たら、ウェブブラウザから [http://localhost:5173/](http://localhost:5173/) にアクセスしてください。なお、5173 番ポートが既に使われている場合は、別の番号で起動することがあるので、ターミナルに表示された URLを使用してください。

```
PS C:\Users\xxxx\react-todo-app> npm run dev

> react-todo-app@0.0.0 dev
> vite


  VITE v8.3.4  ready in 888 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

ブラウザから指定の URL にアクセスすると最低限のコンテンツを含んだ React アプリが表示されます。画面内の「**Count is 0**」のボタンをクリックすると、その表示がクリックのたびに「1」「2」「3」とカウントアップしていくことを確認してください。

![img](figs/04/app_00.png)

::: {.balloon .char-01 .face-02 .tone-yellow}
このカウントアップは React の `useState` という主要な機能を利用して行なわれています。数値のカウントアップは「**Hello World**」や「(組込み開発の) **Lチカ**」のような位置づけになります。
:::

カウントアップの動作が確認できたら、ターミナルから `[Ctrl]+[C]` を入力して、開発サーバを停止してください。

### プロジェクトフォルダの構成確認

`create-vite` によって作成されたプロジェクトフォルダ (`react-todo-app`) の構成を確認していきます。次のコマンドで VSCode を立ち上げてください。

```bash
code .
```

VSCodeのエクスプローラから、フォルダ構成が次のようになっていることを確認してください。

![img](figs/04/vscode_01.png)

プロジェクトフォルダに配置される各ファイルの概要は以下のようになります。

#### tsconfig.\*\*.json

プロジェクトフォルダのルートに配置される `tsconfig.json`、`tsconfig.app.json`、`tsconfig.node.json` の3つは、いずれも **TypeScript関連の設定ファイル** となります。

::: {.balloon .char-01 .face-02 .tone-yellow}
「tsconfig.json」から、「tsconfig.**app**.json」と「tsconfig.**node**.json」を参照する構成になっています。実際に VSCode で `tsconfig.json` を開き、どのように参照されているか確認してください。
:::

- tsconfig.**app**.json は、**これから開発する React アプリのソースコード** に適用される TypeScript の設定ファイルです。
- tsconfig.**node**.json は、**Node.js 環境で実行される範囲 (例えばビルドスクリプトなど)** に適用される TypeScript 設定になります。

これらのファイルは、基本的に直接編集することはありません。

**<i class="fa-solid fa-comment-dots fa-flip-horizontal"></i>プロンプト例**

> `npx create-vite --template react-ts --eslint` で開発環境を構築しました。その際、`tsconfig.json`、`tsconfig.app.json`、`tsconfig.node.json` というファイルが自動で生成されました。これらのファイルの役割について、初心者向けに解説してください。


#### README.md

「**README.md**」は、GitHub のリポジトリのトップページに表示される「README」の内容を記述するファイルです。Markdown 形式（拡張子 `.md`）で記述します。

プロジェクトを **ポートフォリオとして公開する場合**は、単にアプリの機能を紹介するだけでなく、**開発の背景や技術的な工夫が伝わる内容**にすることが重要です。アプリの概要（機能一覧）やライセンス情報に加えて、<span class="masked">開発の経緯（なぜそのアプリを制作したのか）</span>、**技術スタック**（使用したフレームワーク・ライブラリ・ツールなど）、**工夫した点やこだわりのポイント**を記載するようにしてください。

#### .gitignore

「**.gitignore**」は、**Git によるバージョン管理の対象から除外するファイルやフォルダ**を指定するための設定ファイルです。Git の管理対象から除外されたファイルやフォルダは、基本的に <span class="masked">GitHub にもアップロードされません</span>。

実際に「**.gitignore**」の内容を確認すると、インストールしたパッケージを格納する `node_modules` フォルダのほか、データベースの接続情報や API キーなどの機密情報を記述する `.env.local` ファイルが、Git の管理対象から除外されるように設定されています。

これにより、**不要なファイルや機密情報を誤って GitHub にアップロードすることを防ぐ**ことができます。

**<i class="fa-solid fa-comment-dots fa-flip-horizontal"></i>プロンプト例**

> `.gitignore` を適切に設定することは、セキュリティ上も非常に重要だと言われました。なぜ重要なのか、具体例を挙げて説明してください。

> TypeScript でアプリを開発しています。`.gitignore` には `node_modules` を記載するように指示されました。なぜ `node_modules` を Git の管理対象から除外する必要があるのか、初心者にもわかるように説明してください。また、これはセキュリティ上の理由によるものですか？

> チームで TypeScript アプリを開発しているのですが、`.gitignore` に `node_modules` を記載しないまま、リモートリポジトリにプッシュしてしまいました。どのような問題が生じる可能性がありますか？ また、どのように対処すればよいですか？

> インターンシップでチーム開発に参加しているのですが、`.gitignore` に `.env` を記載しないまま、API キーが書かれた `.env` ファイルを、公開設定のリモートリポジトリにプッシュしてしまいました💦 僕はどうすればいいですか？ ＼(\^o\^)／

> API キーを記述した `.env` を、うっかり Git にコミットしてしまいました。でも、まだプッシュしていなかったので、ギリギリセーフでした。ヤバかった！忘れないうちに、急いで `.gitignore` に `.env` を追加して、その変更をコミットしてプッシュしました。適切に対処できた自分を褒めてあげたいです。

#### eslint.config.js

「**eslint.config.js**」は[ESLint](https://www.google.com/search?q=ESLintとは) という「**コード品質チェックツール**」に関する設定ファイルになります。例えば、ESLint を使うと <span class="masked">宣言されているが未使用の変数</span> があるときなどに「警告」や「エラー」として検出してくれます。

::: {.balloon .char-01 .face-05 .tone-blue}
**Lint (リント)** とは、プログラミング一般において「**ソースコードを解析し、バグやスタイルの問題、疑わしい構造などを検出するプロセス**」を指し、そのためのツールが **Linter (リンター)** と呼ばれています。

C言語 や Python用の Linter もあります。**ESLint** は、特に ECMAScript (JavaScript / TypeScript) 用の **標準Linter** として知られています。

:::

本科目における React アプリの開発では、フォーマッタとしては **Prettier (プリティア)**、リンターとしては **ESLint (イーエスリント)** を使用していきます。

**(プロンプト例)**

> ECMAScript とはなんですか？TypeScript や JavaScript の仲間ですか？

> React (TypeScript) アプリの開発の際に、フォーマッターには「Prettier」を、リンターには「ESLint」を使用するように勧められました。両者の役割や機能の違いについて教えてください。

#### 定着確認

- Git によるバージョン管理の対象から除外するファイルやフォルダを指定する設定ファイルの名前を答えよ。
  - **答え**: <span class="masked">`.gitignore`</span>

- `.gitignore` に `node_modules` を記載すると、PC 内の `node_modules` フォルダ自体も削除される。この説明は「正しい」か「正しくない」か答えよ。
  - **答え**: <span class="masked">正しくない。`.gitignore` は Git の管理対象から除外するための設定ファイルであり、PC 内のファイルやフォルダが削除されることはない。</span>

### インストールパッケージ (ライブラリ) の確認

プロジェクトフォルダのなかの「**package.json**」の内容を確認してください。

[第01回講義で既に解説](lecture01.html#package.json-の設定) したように、**package.json は**「アプリの開発や実行に必要なパッケージ (ライブラリ) の情報」や「開発に使用するコマンドをショートカットとして定義」するための設定ファイルとなります。

**package.json** のなかの `"dependencies"` と `"devDependencies"` の項目を確認してください。ここに記載されたパッケージ (ライブラリ) は「node_modules」フォルダのなかにインストールされます。

**(プロンプト例)**

> Node.js 環境における `package.json` と `package-lock.json` の違いについて詳しく教えてください。

> Node.js 環境における `package.json` のなかの `"dependencies"` と `"devDependencies"` の違いを教えてください。

### Reactアプリのビルドと動作確認

VSCode のターミナルで以下のコマンドを実行すると、React アプリケーションを **開発モード**で起動できます。`dev` は **Development**（開発）の略です。

```bash
npm run dev
```

- `npm run dev` で実行されるコマンドは、`package.json` の **`"scripts"` セクション**に定義されています。今回のプロジェクトでは `vite` が設定されているため、`npx vite` のようにコマンドを打って直接実行しても同様に開発サーバが起動します。

::: {.balloon .char-01 .face-02 .tone-yellow}
開発モードでは、ソースファイル ( `*.ts` や `*.tsx` ) を変更すると、**その内容が自動的にアプリケーションに反映されます**。そのため、コードを修正するたびに開発サーバーを再起動する必要はありません。
:::

**開発サーバーを停止する場合**は、VSCode のターミナルをアクティブにして、`[Ctrl]+[C]` を押してください。

---

次に **プレビューモード (本番環境に近い状態での動作確認)** で実行してみます。

まず、ターミナルで以下のコマンドを実行し、**ビルド(本番環境向けのファイルの生成)** を実行します。

```bash
npm run build
```

ビルドが正常に完了すると、プロジェクトフォルダ内に **dist** フォルダが生成され、そのなかに HTML、CSS、JavaScript などのビルド済みファイルが出力されます。

![img](figs/04/vscode_05.png)

次に、ビルドしたアプリケーションの動作を確認するため、以下のコマンドで **プレビューサーバ**を起動します ( `dist` フォルダに出力されたアプリを実行します)。

```bash
npm run preview
```

通常は **4173 番ポート**でプレビューサーバーが起動します。ウェブブラウザから [http://localhost:4173/](http://localhost:4173/) にアクセスして動作を確認してください。

なお、**開発モードでの実行**と**プレビューモードでの実行**には、いくつかの違いがあります。具体的にどのような違いがあるのかは生成AIを活用して調べてみてください。

`dist` フォルダに出力されたアプリを実行するためには `npm run preview` コマンドを入力します。

プレビューモードでの動作を確認できたら、`[Ctrl]+[C]` で **アプリを停止** しておいてください。


**<i class="fa-solid fa-comment-dots fa-flip-horizontal"></i>プロンプト例**

> Vite で React 開発をしています。`npm run dev` でアプリを実行したときと、 `npm run build` してから `npm run preview` でアプリを実行したときの違いを教えてください。


### 不要なファイルや記述を削除

React の基本的な仕組みを理解するため、Vite が生成したプロジェクトから **学習に不要なファイルやコードを削除**し、必要最小限の構成に整理していきます。

#### index.html の編集

`index.html` を以下のように編集してください。今回は、`<html>` タグと `<title>` タグの2か所を変更します。


```html{.numberLines caption="index.html"}
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TodoApp</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- **第02行目**：`<html lang="en">` を `<html lang="ja">` に変更します。これは、ページで使用する言語を英語から日本語に変更するための設定です。
- **第07行目**：`<title>react-todo-app</title>` を `<title>TodoApp</title>` に変更します。これは、ブラウザのタブなどに表示されるページタイトルの設定です。

なお、リンターやフォーマッターの設定によって、**タグの大文字・小文字や引用符の種類などが自動的に変更される場合があります**が、動作に影響しない違いであれば気にする必要はありません（以降も同様）。

最後に、**ファイルの保存を忘れないようにしてください**。

#### src/App.tsx の編集

`src/App.tsx` を次のように編集してください。

```ts{.numberLines caption="src/App.tsx"}
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const countUp = () => {
    const newCount = count + 1;
    setCount(newCount);
  };
  return (
    <div>
      <h1>TodoApp</h1>
      <button onClick={countUp}>count is {count}</button>
    </div>
  );
};

export default App;
```

拡張子 `.tsx` は、TypeScript と JSX (HTML に似た構文) を組み合わせたコードを記述するファイルに使用されます。

::: {.balloon .char-01 .face-02 .tone-yellow}
<u>このプログラムの内容については後ほど詳しく解説するので、現時点では深く理解する必要はありません</u>。まずは、開発環境の構築を優先して進めます。

**第12行目** でボタンをクリックすると `onClick={countUp}` によって、**第05行目** で定義されている `countUp` 関数が呼び出されるのかな🤔...ぐらいの簡単な理解で大丈夫です。
:::

先ほどと同様に、最後に **ファイルの保存を忘れないようにしてください**。

#### ファイルとフォルダの削除

 **Tailwind CSS** を導入するため、不要になる CSS 関連のファイルや記述を整理します。

- `src/App.css` は、**ファイルごと削除**してください。
- `src/index.css` は、**ファイルの内容をすべて削除**して空にしてください（**ファイル自体は削除せずに残してください**）。
- 各種画像（`react.svg`、`vite.svg`、`hero.png`）も使用しないため、`src/assets` **フォルダごと削除**してください。

以上の作業を終えると、プロジェクトのファイル構成は以下のようになります。

![img](figs/04/vscode_02.png)

#### README.md の編集

`README.md` を以下の内容に書き換えてください。今回は、ライセンスとして **MIT License** を採用します。

なお、**第13行目**の `Copyright (c) 2026 Kosen Taro` については、著作権者の名前を自分の名前に変更してください (ハンドルネームでも問題ありません)。

```md{.numberLines caption="README.md"}
# TodoApp

React、TypeScript、Tailwind CSS を使用し、ローカルストレージでデータを永続化した「Todoアプリ」です。

## 開発履歴

- 2026年10月16日：プロジェクト開始

## ライセンス

MIT License

Copyright (c) 2026 Kosen Taro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### 動作確認 (CSSの剝ぎ取り)

VSCodeの ターミナルから以下のコマンドを実行し、開発モードでアプリの動作を確認してください。

```bash
npm run dev
```

CSS 関連のファイルや記述を削除したため、以下のような **シンプルなアプリ画面** (＝<u>CSS による装飾がなく、HTML の標準的なスタイルだけが適用された状態</u>) になっているはずです。

ただし、<span class="masked">ボタンをクリックしたときのカウントアップ機能</span> は、**引き続き正常に動作すること**を確認してください。

![img](figs/04/app_02.png)

動作確認ができたら、VSCode のターミナルで `[Ctrl]+[C]` を押して、**開発サーバを停止**しておいてください。

### Tailwind CSS の適用

この授業では、[Tailwind CSS](https://tailwindcss.com/) という **CSS フレームワーク**を使用して解説を進めますが、すでに使い慣れた CSS フレームワークがあれば、そちらを使用しても問題ありません。

Tailwind CSS は、あらかじめ用意された <span class="masked">スタイルを指定するための小さな CSS クラス</span> を組み合わせて、UI のデザインを調整する点に特徴があります。


::: {.balloon .char-01 .face-02 .tone-yellow}

例えば、ボタン要素の背景色や余白、角の丸みなどを設定する場合、Tailwind CSS では、それぞれのスタイルに対応した **ユーティリティクラス (特定のスタイルを適用するための CSS クラス)** と呼ばれるものを組み合わせて指定します。

具体的には、次のようなユーティリティクラスが用意されています。

- `m-5`：**上下左右に 5 スケール分の外側余白 (マージン) を設定する**
- `rounded`：**四隅を丸くする**
- `bg-blue-500`：**背景色を青色 (色の濃さを表す値が 500) にする**
- `px-5`：**左右に 5 スケール分の内側余白 (パディング) を設定する**
- `py-1`：**上下に 1 スケール分の内側余白 (パディング) を設定する**
- `text-white`：**文字色を白色にする**

これらを以下のように適用すると...

```html{.numberLines caption="Tailwind CSS の使用例"}
<button className="m-5 rounded bg-blue-500 px-5 py-1 text-white">
  ボタン
</button>
```

次のようにボタンのスタイルを調整することができます。

![img](figs/04/app_11.png)
:::

Tailwind CSS を採用することで、<span class="masked">独自の CSS クラス名を考えたり、スタイルの衝突を気にしたりする場面</span> が少なくなり、非常に効率的に UI を開発できます。また、**デザインの一貫性や保守性**を保ちやすいというメリットもあります。

なお、本科目の後半で扱う **Next.js** も Tailwind CSS に対応しており、さまざまな ウェブアプリの開発で利用されています。

**<i class="fa-solid fa-comment-dots fa-flip-horizontal"></i>プロンプト例**

> CSS フレームワークとはなんですか？代表的なものを教えてください。

#### Tailwind 関連パッケージのインストール

VSCode のターミナルで以下のコマンドを実行し、**Tailwind CSS 本体**と、**Vite と連携するためのプラグイン**をインストールしてください。

```bash
npm i -D --save-exact tailwindcss@4.3.3 @tailwindcss/vite@4.3.3
```

つづいて、コード整形ツールの Prettier と、Tailwind CSS のユーティリティクラスを自動的に並び替えるためのプラグインをインストールします。[第01回の講義で導入したもの](lecture01.html#補足-フォーマッタのインストール-と-おまけ) は、VSCode の Prettier 拡張機能です。今回は、コード整形を行う Prettier 本体を、プロジェクト内にインストールします。

```bash
npm i -D --save-exact prettier@3.9.10 prettier-plugin-tailwindcss@0.8.1
```

これらのパッケージは開発やビルドの際に使用するため、`-D` オプションを付けて **開発依存関係（`devDependencies`）** として追加します。

::: {.balloon .char-01 .face-02 .tone-yellow}
Tailwind CSS 自体は開発時に使用するツールですが、**Tailwind CSS によって生成された CSS は本番用のアプリにも組み込まれ、画面のデザインに反映されます**。
:::


#### 設定ファイルの追加と変更

プロジェクトのルート (トップレベル) に **.prettierrc** というファイルを新規作成し、以下の内容を記述してください。このファイルは、プロジェクト内の Prettier の動作を設定するもので、[第01回講義でインストールを指示した VSCode の Prettier 拡張機能](lecture01.html#補足-フォーマッタのインストール-と-おまけ) も、この設定を使用します。

```json{.numberLines caption=".prettierrc"}
{
  "semi": true,
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindStylesheet": "./src/index.css"
}
```

![img](figs/04/vscode_09.png)

ここで `tailwindStylesheet` は、Tailwind CSS を読み込む CSS ファイルの場所を指定する設定です。ここでは、このあと編集する **src/index.css** を指定しています。

以上の設定によって、Prettier が **Tailwind CSS のユーティリティクラスを自動的に並び替えてくれる**ようになります。たとえば `<div className="text-center bg-blue-500 p-4">` のようなクラス指定は、ファイルの保存時に Tailwind CSS が推奨する順序 (レイアウト・余白・背景色・文字の装飾などを一定の規則に従って並べる順序) に沿って、自動整列されるようになります。

---

次に、プロジェクトのルートの `vite.config.ts` を以下のように変更してください。忘れずに保存もしてください。**第03行目** で `tailwindcss` をインポートして、**第07行目** でプラグインとして設定しています。

```ts{.numberLines caption="vite.config.ts"}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

---

つづいて、`src/index.css` (先ほど内容を空にしたファイル) に、以下の内容を記述して保存してください。

```css{.numberLines caption="src/index.css"}
@import "tailwindcss";
```

::: {.balloon .char-01 .face-05 .tone-blue}
`src/index.css` は、`src/main.tsx` の **第03行目** で読み込まれています。これにより、**Tailwind CSS によるスタイリングがアプリケーション全体で利用できる**ようになります。
:::


ここまでに編集した **すべてのファイルが保存されていることを再確認してください**。

この状態で `npm run dev` で動作確認すると、以下のような画面になります。Tailwind CSS の初期化処理 (Preflight) によって、**ブラウザが標準で適用するスタイルもリセットされるため、装飾がほとんどない状態** となります。

![img](figs/04/app_09.png)

- ボタンとしての枠線が無くなって分かりづらいですが「**count is 0**」の文字を押下すると、問題なくカウントアップは機能することを確認してください。
- `npm run build` についても、問題なく実行できることを確認してください。

#### Tailwind によるスタイリング

ここからは、**src/App.tsx** に記述されている App コンポーネントに Tailwind CSS のユーティリティクラスを指定し、画面のデザインを調整していきます。ファイルの内容を、以下のように書き換えてください。

```ts{.numberLines caption="src/App.tsx (Tailwind CSS の適用)"}
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const countUp = () => {
    const newCount = count + 1;
    setCount(newCount);
  };
  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-4 text-2xl font-bold">TodoApp</h1>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        onClick={countUp}
      >
        count is {count}
      </button>
    </div>
  );
};

export default App;
```

書き換えたのは **第10行目** から **第18行目** の範囲 ( `return` しているJSX構文の内部) になります。


具体的には、\<div\>、\<h1\>、\<button\> の各タグに `className` 属性を追加し、そこに `mx-4` や `font-bold` などの Tailwind CSS のユーティリティクラスを指定しています。

::: {.balloon .char-01 .face-03 .tone-blue}
通常の HTML では、`<div class="...">` のように **class 属性** を使って CSS クラスを指定します。

しかし、React の JSX では、`<div className="...">` のように **className 属性** を使用します。JSX は HTML によく似た構文ですが、HTML そのものではありません。そのため、属性の指定方法など、一部に違いがあります。JSX の詳しい仕組みについては、後ほど解説します。
:::

<div class="note type-tips">
**HTMLとCSS**

「**HTML**」と「**CSS**」の基礎は、前期の情報3の「第11回講義」と「第12回講義」で学習済みです。

以下のように、CSSファイル `main.css` を作成し、そこに「CSSクラス」を独自に定義して `<div class="container" >` のように `class` 属性を使ってHTML要素のスタイリングをしました。

```html{.numberLines caption="index.html"}
<!DOCTYPE html>
<html lang="ja" >
  ～～～ 略 ～～～
<body>
    <div class="container" >
      <h1>XXX's Curry Recipe</h1>
      ～～～ 略 ～～～
    </div>
</body>
</html>
```

```css{.numberLines caption="main.css"}
.container { 
  max-width: 768px;
  width: 100%;
  margin: 0 auto;
} 
```

</div>


以上で、Tailwind CSS の適用が完了しました。

`npm run dev` を実行し、アプリの動作を確認してください。

特に、**ボタンにマウスカーソルを重ねる（ホバーする）と背景色が変化すること**や、<span class="masked">ブラウザのウィンドウ幅に応じて、左右の余白やコンテンツの配置が自動的に調整されること</span> を確認してください。

また、**<u>レスポンシブデザイン</u>** が適用されていることも確認してください。ブラウザのウィンドウ幅を変更するほか、`[F12]` キーで開発者ツールを開き、モバイル端末の表示をシミュレーションしてみてください。

![img](figs/04/app_03.png)

#### 演習

開発モード (`npm run dev`) でアプリを実行している間は、<span class="masked">ホットリロード</span> が有効になります。これにより、**ソースコードを書き換えて保存すると、その変更が自動的にウェブブラウザ上の画面に反映されます**。

実際に開発モードでアプリを起動し、`src/App.tsx` に対して以下の変更を加えてください。それぞれの変更について、**<u>ファイルを保存したときに画面の表示がどのように変化するか</u>** を確認してください。

- `<h1>` タグに `text-violet-600` クラスを追加してください。
  - つまり、<span class="masked">`<h1 className="mb-4 text-2xl font-bold text-violet-600">TodoApp</h1>`</span> のように変更します。
- `<button>` タグの `rounded` を `rounded-full` に変更し、角の丸みがどのように変化するか確認してください。その後、`rounded-xs` に変更して比較してください。
- `<button>` タグの `py-2` を `py-1` に変更し、ボタンの上下の余白がどのように変化するか確認してください。その後、`py-0.5` に変更して比較してください。
- `<button>` タグに `cursor-not-allowed` クラスを追加し、**ボタンにマウスカーソルを重ねたときの変化**を確認してください。

参考: [Tailwind CSS の色指定の一覧](https://tailwindcss.com/docs/colors)

#### Tailwind CSS のスタイルの調べ方

`className` 属性に指定する各種スタイル (**ユーティリティクラス**) については、授業のなかでも随時解説していきますが、自分で調べたい場合は、[Tailwind CSS の公式ドキュメント](https://tailwindcss.com/docs) や生成 AI を活用してください。

**<i class="fa-solid fa-comment-dots fa-flip-horizontal"></i>プロンプト例**

> Tailwind CSS で、次のようにスタイルが指定されていました。それぞれのユーティリティクラスの意味と、画面の表示にどのような影響があるのかを解説してください。
>
> `<div className="mx-4 md:mx-auto mt-10 max-w-2xl">`

> Tailwind CSS を使って、次のボタンに「ドロップシャドウ（影）」を付けたいです。どのようにすればよいですか？
>
> `<button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md">ほげ</button>`

## ポート番号のカスタマイズ

Vite で構築したプロジェクトでは、デフォルトで **開発サーバ (`npm run dev`) が 5173 番ポート**で起動します。このポート番号は、`vite.config.ts` で変更することができます。

後期中間以降の授業で使用する [Next.js](https://nextjs.org/) では、開発サーバーがデフォルトで **3000 番ポート**で起動します。そこで、Next.js の開発環境に合わせて、今回の Vite プロジェクトでも 3000 番ポートを使用するように設定を変更してみます。

プロジェクトフォルダの直下にある `vite.config.ts` を、次のように変更してください (**第08行目** から **第12行目** が変更箇所です)。

```ts{.numberLines caption="vite.config.ts (ポート番号の変更)"}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    strictPort: false,
    open: true,
  },
});
```

ターミナルから `npm run dev` を実行し **3000番ポート** で開発サーバが起動することを確認してください。

```
  VITE v8.3.4  ready in 579 ms

  ➜  Local:   http://localhost:3000/
```

また、`open: true` の設定により、開発サーバーの起動時に <span class="masked">Web ブラウザが自動的に開く</span> ようになります。

さらに、`strictPort: false` の設定により、指定した **3000 番ポートが他のアプリケーションによって使用されている場合は、3001 番ポートでの起動が試みられます**。3001 番ポートも使用中であれば、3002、3003……と、利用可能なポート番号が見つかるまで順番に試行されます。


## ESLintのカスタマイズ

**ESLint** (＝<span class="masked">文法ミスやスタイルの不統一を指摘する静的解析ツール</span>) に関連するカスタマイズについて簡単に説明しておきます。

`src/App.tsx` を開いて、以下のように **第04行目** に `const hoge = "Hoge";` というコードを追加してください。

```ts{.numberLines caption="src/App.tsx (抜粋)"}
import { useState } from "react";

const App = () => {
  const hoge = "Hoge"; // ■■■ 追記 ■■■
  const [count, setCount] = useState(0);
  const countUp = () => {
    const newCount = count + 1;
    setCount(newCount);
  };
  // 以下、略
```

すると、追記した `const hoge = "Hoge"` の部分で次のように「エラー」が発生します🤮。

> 'hoge' is assigned a value but never used. eslint(@typescript-eslint/no-unused-vars)   
> 'hoge' が宣言されていますが、その値が読み取られることはありません。ts(6133)

![img](figs/04/vscode_03.png)

ここでは、**ESLint と TypeScript の両方**が、変数 `hoge` が使われていないことを指摘しています。

ただし、この状態であっても <span class="masked">開発モード (`npm run dev`) で起動した開発サーバ</span> では **問題なくページを表示することができます**。これは、Vite の開発サーバでは、**TypeScript の型チェックや ESLint のチェックが自動では実行されないため** です。

一方で、ビルド `npm run build` においては、TypeScript のチェックが実行されます。そのため、以下のようにエラーとなり、**ビルドが中断**されます。実際に試してみてください。

```
PS C:\Users\xxxx\react-todo-app> npm run build

> react-todo-app@0.0.0 build
> tsc -b && vite build

src/App.tsx:4:9 - error TS6133: 'hoge' is declared but its value is never read.

4   const hoge = "Hoge"; // ■■■ 追記 ■■■
          ~~~~

Found 1 error.
```

::: {.balloon .char-01 .face-01 .tone-pink}
このように **開発モードでの実行には問題がないものの、本番用にビルドすると失敗する** ということは多々あります。そのため、<span class="masked">VSCodeでエラー（赤色波線）になっている箇所</span> は決して放置せずに修正し、また定期的に `npm run build` を実行するようにしてください。

アプリが完成したと思っていたのに、大量のビルドエラーでデプロイに失敗すると精神的なダメージが大きいです。
:::

---

・・・とはいえ「**hogeが宣言されていますが、その値が読み取られることはありません**」のような指摘がエラー扱いになると、開発途中では非常に不便です (特に個人開発という場面では)。

ということで、「変数の未使用」を **ESLint で警告する**ように設定していきます。まず、TypeScript 側の未使用チェックを無効にし、つづいて ESLint 側の設定を変更します。

プロジェクトのルートの tsconfig.**app**.json の `noUnusedLocals` と `noUnusedParameters` の設定 (**第20行目と第21行目**) を、以下のように `true` から `false` に変更してください。

```json{.numberLines caption="tsconfig.app.json"}
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": false /* ESLint でチェックするため無効化 */,
    "noUnusedParameters": false /* ESLint でチェックするため無効化 */,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

これで、未使用の変数や仮引数があっても `npm run build` がエラーとなることなく実行できるようになります。実際に試してみてください。

**<i class="fa-solid fa-comment-dots fa-flip-horizontal"></i>プロンプト例**

> Vite で作成した React + TypeScript プロジェクトの tsconfig.app.json にある `noUnusedLocals` と `noUnusedParameters` は、どのような設定ですか。それぞれを `true` から `false` に変更すると、どのようにコンパイルの挙動が変わりますか。

---

::: {.balloon .char-01 .face-04 .tone-blue}
`npm run build` はエラーなく完了するようになりました。しかし、VSCode 上では、未使用変数 `hoge` に関するエラーが引き続き表示されています。

これは、**ビルド時のエラーチェックとは別に、ESLint が未使用変数をエラーとして検出しているため**です。

ここからは、それを解決していきます。
:::

プロジェクトルートの **eslint.config.js** に、以下のように `rules: {...}` のセクションを追加してください (**第21行目** から **第35行目**)。これにより、未使用のローカル変数や、未使用の関数パラメータ (仮引数) があっても、警告 (`warning`) の扱いになります。

```js{.numberLines caption="eslint.config.js"}
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "all",
          vars: "all",
          caughtErrors: "all",
          ignoreRestSiblings: false,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
]);
```

- **第24行目** の `"warn"` が、警告として扱う設定です。警告も出したくない場合は、ここを `"off"` にします。
- **第30行目** から **第32行目** は、`_` で始まる変数・引数を「意図的に未使用」とみなし、未使用警告の対象から除外する設定です。

`eslint.config.js` を変更して保存するときには、**少し時間がかかることがあります**（全てのコードが再チェックされるため）。

以上の設定を済ませると **src/App.tsx** の `const hoge = "Hoge";` のところが警告の扱い（**赤色の波線から黄色の波線の表示**）に変わっていることが確認できると思います。

![img](figs/04/vscode_10.png)

ターミナルでも、次のコマンドを順番に実行して、いずれも問題なく終了することを確認してください。

```bash
npm run lint
npm run build
```

::: {.balloon .char-01 .face-02 .tone-yellow}
`npm run lint` は **ESLint によるチェックを実行するコマンド** です。未使用変数 `hoge` に対する警告が 1 件表示され、エラーは 0 件になるはずです。

```
✖ 1 problem (0 errors, 1 warning)
```
:::

このように、Lint 関連のカスタマイズは **eslint.config.js** と **tsconfig.app.json** でできることを知っておくと役立つと思います。

::: {.note .type-caution}
**注意** 

ESLint についての動作が確認できたら `App.tsx` から `const hoge = "Hoge";` を削除しておいてください。
:::

#### 演習（宿題：<i class="fa-solid fa-stopwatch"></i> 20分）

現在のプロジェクトフォルダをリネームするか削除したうえで、**最初からもう一度、開発環境の構築に取り組んでください**。一連の作業を繰り返すことで、環境構築のおおまかな手順を身につけてください。

可能であれば、**3回、4回と繰り返して練習することをおすすめします**。慣れてくれば、5分もかからず、一連の環境構築を完了できるようになります。

## Reactアプリケーションの実行順序の理解

Vite で構築した React プロジェクトを **開発モード** ( `npm run dev` ) で実行したときに、各ファイル (各コンポーネント) が **<u>どのような順序で読み込まれ、実行されていくのか</u>**について解説します。

::: {.note .type-caution}
**ここでは、理解のしやすさを優先するため、一部の説明を簡略化しています。厳密な動作とは異なる部分があることに注意してください。**
:::

まず、ウェブブラウザがプロジェクトフォルダの直下にある `index.html` を読み込みます。このように、**プログラムの実行や処理の開始点（起点）となるもの**を <span class="masked">エントリーポイント</span> と呼びます。

```html{.numberLines caption="index.html"}
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TodoApp</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

次に、上記の **第11行目** に記述されている `<script type="module" src="/src/main.tsx"></script>` によって、`src/main.tsx` が読み込まれます。

そして、`src/main.tsx` の **第06行目** にある <span class="masked">`document.getElementById("root")`</span> によって、`index.html` の **第10行目** に記述された `<div id="root"></div>`（`id` が `root` の `div` 要素）が取得されます。

この要素を **React の描画先として指定することで、`<App />` コンポーネントがその領域にレンダリング（描画）されます。**

```ts{.numberLines caption="src/main.tsx"}
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

ここでレンダリングされる `<App />` コンポーネントは、`src/main.tsx` の **第04行目** で読み込まれている `src/App.tsx` で定義されています。

::: {.balloon .char-01 .face-05 .tone-blue}
`<StrictMode>...</StrictMode>` については、現時点では気にする必要はありません（興味のある人は、Web 検索や生成 AI を活用して調べてみてください）。
:::


そして、以下に示す `src/App.tsx` によって、画面に「**TodoApp**」という見出しや「**count is 0**」というボタンが表示されます。また、**第05行目**で定義されている `countUp` 関数が、ボタンをクリックしたときに呼び出され、カウントアップが行われます。


```ts{.numberLines caption="src/App.tsx"}
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const countUp = () => {
    const newCount = count + 1;
    setCount(newCount);
  };
  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-4 text-2xl font-bold">TodoApp</h1>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        onClick={countUp}
      >
        count is {count}
      </button>
    </div>
  );
};

export default App;
```

以上を整理すると、開発モードでは、**次のような順序でファイルが読み込まれ、コンポーネントが呼び出されていく**と考えてください。まずは、処理が階層的につながっている (ネスト構造になっている) とイメージすれば十分です。

1. `index.html` が読み込まれ、そこから……
2. `src/main.tsx` が読み込まれ、そこで……
3. `src/App.tsx` で定義された **App コンポーネント**が呼び出される。

さらに、このあとの演習では、**App コンポーネント**の内部に **TodoList コンポーネント**（`src/TodoList.tsx`）を配置し、その内部に **TodoItem コンポーネント**（`src/TodoItem.tsx`）を配置していきます。

この場合、コンポーネントの階層構造はさらに深くなり、次のような流れになります。

1. `index.html` が読み込まれ、そこから……
2. `src/main.tsx` が読み込まれ、そこで……
3. `src/App.tsx` の **App コンポーネント**が呼び出され、その内部で……
4. `src/TodoList.tsx` の **TodoList コンポーネント**が呼び出され、その内部で……
5. `src/TodoItem.tsx` の **TodoItem コンポーネント**が呼び出される。

このように、**React では、コンポーネントの内部に別のコンポーネントを配置することで、画面の構成を階層的に組み立てていきます。**

### ビルド (バンドル) 出力

ビルド (`npm run build`) を実行すると、最適化されたプロダクトが「**distフォルダ**」に出力されます。

このプロダクトは <span class="masked">トランスパイル (TypeScript👉JavaScript)、最適化、バンドル</span> などの処理によって **ロジックとファイルが集約されたもの**で、`index.html` をエントリポイントとして `assets/index-XXXX.js` や `assets/index-XXXX.css` が読み込まれるシンプルな構成になります。

![img](figs/04/vscode_06.png)

実際にビルドを実行して「distフォルダ」の各ファイルの内容について確認してみてください。

![img](figs/04/vscode_07.png)


## Reactアプリの開発

開発環境の準備ができたので、ここからは React の肝である「コンポーネントの作成と状態管理」の基本について学んでいきます。

### Reactにおけるコンポーネントとは

Reactアプリは、基本的に **コンポーネント** (**Component**) とよばれる <span class="masked">機能と UI を持った画面構成の部品・パーツ</span> を組み合わせてアプリを構築する点に特徴があります。

::: {.balloon .char-01 .face-02 .tone-yellow}
React における「コンポーネント」とは、具体的には **JSX を戻り値として返す関数など** を指します。今回のプロジェクトでは、主に `.tsx` という拡張子を持つファイルにコンポーネントを定義していきます。

また、JSX (JavaScript XML) とは、JavaScript (TypeScript) のコードのなかに <span class="masked">HTML に似たタグ形式の記述</span> を組み込めるようにした**拡張構文**です。
:::

**<i class="fa-solid fa-comment-dots fa-flip-horizontal"></i>プロンプト例**

> React における コンポーネント は何ですか？「JSX を戻り値として返す関数」と説明されましたが、そもそも JSX とは何ですか？初心者向けに分かりやすく解説してください。

例えば、Todo アプリに、**ユーザーの名前と現在の時刻に応じて、挨拶メッセージを表示する機能**を追加したいとします。このような機能は、App コンポーネントに直接記述することもできますが、**独立したコンポーネントとして切り出すことで、画面の構成や役割を整理しやすくなります**。

そこで、ここでは、挨拶メッセージの生成と表示を担当する **WelcomeMessage コンポーネント** を作成してみます。まずは `src/WelcomeMessage.tsx` というファイルを新規作成し、以下のコードを記述してください。

```ts{.numberLines caption="src/WelcomeMessage.tsx"}
import React from "react";

// コンポーネントに渡す引数 (Props) の型を定義する
// 型には Props という名前を付けることがよくあります。
type Props = {
  name: string;
};

// WelcomeMessage という関数コンポーネントを定義する
// コンポーネントの名前はパスカルケースで記述する
const WelcomeMessage = (props: Props) => {
  // JSX を返す前に、通常の TypeScript の処理を記述できる
  const currentTime = new Date();
  const greeting =
    currentTime.getHours() < 12 ? "おはようございます" : "こんにちは";

  // 【重要】JSX を使って UI を記述し、return で返す
  return (
    <div className="text-blue-700">
      {greeting}、{props.name}さん。
    </div>
  );
};

// 他のファイルから WelcomeMessage を import できるようにする
export default WelcomeMessage;
```
- コンポーネントを定義するファイルには、一般的に **パスカルケース（PascalCase）** を使用してください。
  - パスカルケースとは、各単語の先頭を大文字にしてつなげる命名規則です（例：`WelcomeMessage`、`TodoList`、`TodoItem`）。

つづいて、いま作成した「**WelcomeMessage コンポーネント**」を `src/App.tsx` でインポートし、「**App コンポーネント**」の内部に組み込みます。**第02行目** と **第13行目** に着目してください。

```ts{.numberLines caption="src/App.tsx"}
import { useState } from "react";
import WelcomeMessage from "./WelcomeMessage"; // 追加

const App = () => {
  const [count, setCount] = useState(0);
  const countUp = () => {
    const newCount = count + 1;
    setCount(newCount);
  };
  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-4 text-2xl font-bold">TodoApp</h1>
      <WelcomeMessage name="寝屋川タヌキ" /> {/* 追加 */}
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        onClick={countUp}
      >
        count is {count}
      </button>
    </div>
  );
};

export default App;
```

実際に試してみてください。次のような結果が得られるはずです。

![img](figs/04/app_10.png)

`src/App.tsx` では、**第02行目** で「WelcomeMessageコンポーネント」を読込み、**第13行目**で `<WelcomeMessage name="寝屋川タヌキ" />` のように組み込んでいます。

::: {.balloon .char-01 .face-01 .tone-pink}
ここでは、`name` という引数が、どのように WelcomeMessage コンポーネントに渡されているか (対応関係) をよく確認してください。

例えば、`name="寝屋川タヌキ"` ではなく `userName="寝屋川タヌキ"` のように名前をウェルカムメッセージコンポーネントに渡したいときは、`WelcomeMessage.tsx` において、どこを書き換えるべきかが説明できるでしょうか？
:::

なお、JSX要素のなかでは、コメントは `{/* コメント */}` のように記述します。

<div class="note type-caution">
**Reactの関数コンポーネントはパスカルケースで名前を設定すること**

TypeScript では、通常、関数名に **キャメルケース（小文字から開始）** を使用します。一方、React の関数コンポーネントでは、**パスカルケース（大文字から開始）** を使用するのが基本となります。また、コンポーネントを定義するファイル名も、これに合わせて **パスカルケース** にするのが一般的です。

特に注意してほしいのは、**<u>JSX ではタグ名が大文字で始まるか、小文字で始まるかによって解釈が変わるという点</u>**です。小文字で始まるタグは HTML 要素などとして扱われ、大文字で始まるタグは React のコンポーネントとして扱われます。

そのため、コンポーネント名を小文字で始めてしまうと、以下のように JSX の中で正しく認識されないことがあります。注意してください。

![img](figs/04/vscode_08.png)

</div>

#### 演習

実際に「WelcomeMessageコンポーネント」を作成して、「Appコンポーネント」のなかに組み込んでください。また、開発モードで実行結果を確認してください。

また、以下の要求を満たすようにプログラムを書き換えてください。

- ウェルカムメッセージに表示される名前を「萱島ウサギ」に変えたい。
- `<WelcomeMessage name="萱島ウサギ" uncompletedCount={6}/>` のように未完了タスクの数をコンポーネントに渡し、「**こんにちは、萱島ウサギさん。現在の未完了タスクは6個です。**」のようにウェルカムメッセージを表示したい。
    - コンポーネントに数値を渡したいときは `uncompletedCount=6` ではなく <span class="masked">`uncompletedCount={6}`</span> のようにしてください。
    - ウェルカムメッセージコンポーネントが `uncompletedCount` を受け取るためには、`WelcomeMessage.tsx` のなかの `Props` の型定義の変更が必要です。
    - 解答例は [こちら<i class="fa-solid fa-person-chalkboard"></i>](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/04/code01.tsx)

### 状態管理

React アプリでは、**アプリ画面上で変化する値**を「**状態（State）**」と呼ばれる仕組みで管理します。この「状態」が更新されると、React はその変更をトリガーとして、**関連するコンポーネントを自動的に再レンダリング（再描画）**し、画面の表示を更新します。

::: {.balloon .char-01 .face-02 .tone-yellow}
何らかの値（例えば「現在のカウント値」）を **状態（State）** として管理し、その値の変化を画面に反映させるには、**通常の変数を定義するだけでは不十分**です。

React では、**フック（Hook）** と呼ばれる特別な仕組みを利用して、状態の保持や更新などを行います。React にはさまざまなフックが用意されていますが、その中でも **状態管理の基本となるものが `useState`** です。
:::

先ほどのサンプルアプリでは、**カウント値が変更されたときに、その結果を自動的に画面へ反映させたいため**、**第04行目**で `useState` を使用しています。

具体的には、`useState(0)` によって、**現在のカウント値を保持する `count`** と、<span class="masked">その値を更新するための関数 `setCount`</span> を取得しています。

```tsx
const [count, setCount] = useState(0);
```

なお、`useState` の引数には **状態の初期値**を指定します。例えば、カウントを「7」から開始したい場合は、<span class="masked">`const [count, setCount] = useState(7);`</span> と記述します。

- `useState(0)` は、`useState<number>(0)` のように、**状態として扱う値の型を明示的に指定すること**もできます。型を省略した場合は、初期値から TypeScript が型を推論します。

そして、**現在のカウント値を取得するときは `count` を参照し、カウント値を更新するときは `setCount(newCount)` を呼び出します。**

`setCount` によって状態が更新されると、React が画面の再レンダリングを行い、画面に表示されるカウント値も更新されます。

```ts{.numberLines caption="src/App.tsx (参考) この内容に書き換える必要はありません"}
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0); // ◀◀ 初期化(初期値を設定)
  const countUp = () => { 
    const newCount = count + 1;
    setCount(newCount); // ◀◀ 更新処理
  };
  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-4 text-2xl font-bold">TodoApp</h1>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        onClick={countUp}
      >
        count is {count}
      </button>
    </div>
  );
};

export default App;
```

一方で、以下のように `useState` **を使用せずに実装**するとボタンを押下しても画面が更新されません (=カウント表示が変わらない)。実際に試してみてください。

```ts{.numberLines caption="src/App.tsx (NGな実装例)"}
const App = () => {
  let count = 0; // 通常の変数として定義
  const countUp = () => {
    count++; // 通常の処理で更新 count = count + 1; でも同じ
    console.log(`現在の count の値は ${count} です`); // 確認出力
  };
  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-4 text-2xl font-bold">TodoApp</h1>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        onClick={countUp}
      >
        count is {count}
      </button>
    </div>
  );
};

export default App;
```


::: {.balloon .char-01 .face-02 .tone-yellow}

ただし、`[F12]` でデベロッパーツールを起動して、コンソールタブからログを確認してみると、**画面上の「カウント値」が更新されないだけ**で、内部的には変数 `count` は正常に更新されていることが確認できます。

![img](figs/04/app_04.png)

これらのことから「**変更をトリガーに再レンダリングする必要がない値**」については通常の変数として扱い、逆に「**値の変更をトリガーに再レンダリングしたいもの**」は、`useState` を使って<u>「状態」として扱う必要がある</u>ことが分かると思います。

:::

### 練習

次のように、カウント値の表示部をボタンの外に移動し、ボタンを「**1Up**」と「**10Up**」の2個に増やすようにアプリを拡張してみます。

![img](figs/04/app_05.png)

まずは、以下のようにプログラムを書き替え、実行結果とプログラムを照らし合わせてプログラムについて理解してください。

```ts{.numberLines caption="src/App.tsx (カウント機能の拡張1)"}
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const countUp1 = () => {
    const newCount = count + 1;
    setCount(newCount);
  };
  const countUp10 = () => {
    const newCount = count + 10;
    setCount(newCount);
  };
  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-4 text-2xl font-bold">TodoApp</h1>
      <div className="mb-2">
        <p>
          現在のカウント値は
          <span className="text-xl font-bold text-blue-500"> {count} </span>です
        </p>
      </div>
      <div className="flex flex-row gap-2">
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          onClick={countUp1}
        >
          1 Up
        </button>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          onClick={countUp10}
        >
          10 Up
        </button>
      </div>
    </div>
  );
};

export default App;
```

- **第16行目** の div要素の className属性 の `mb-2` を `mb-6` に変更すると画面がどのようになるか確認してください。また、同様に `mt-6`、`ml-6`、`my-6` に変更するとどのようになるか確認してください。
    - `mb` は <span class="masked">margin-bottom</span> の略であることに気付いたでしょうか。
    - 参考 :[Tailwind CSS - Margin](https://tailwindcss.com/docs/margin)
- **第22行目** の div要素の className属性 の `flex-row` を `flex-col` に変更するとどのようになるか確認してください。確認後は元に戻しておいてください。
  - `row` は「行」の意味です。`flex-row` は子要素を行方向 (横方向) に並べるためのスタイル指定になります。
  - `col` は column の略で「列」の意味です。`flex-col` は子要素を列方向 (縦方向) に並べるためのスタイル指定になります。
- **第22行目** の div要素の className属性 の `gap-2` を `gap-6` に変更するとどのようになるか確認してください。確認後は元に戻しておいてください。

このプログラムには冗長な記述が多いので[リファクタリング](https://www.google.com/search?q=リファクタリングとは)していきます。関数 `countUp1` と `countUp10` は、以下のように省略形で (1行で) 書き換えが可能です。[前回講義](lecture03.html#第7形態-省略形)で学んだアロー関数形式の応用です。

```ts{.numberLines caption="src/App.tsx (Before)" startFrom=5}
const countUp1 = () => {
  const newCount = count + 1;
  setCount(newCount);
};
const countUp10 = () => {
  const newCount = count + 10;
  setCount(newCount);
};
```

```ts{.numberLines caption="src/App.tsx (After)" startFrom=5}
const countUp1 = () => setCount(count + 1);
const countUp10 = () => setCount(count + 10);
```

実際に書き換えて、問題なく動作することを確認してください。

さらに、関数が引数を受け取るように変更して、`onClick` での呼び出しを <span>`onClick={() => countUpN(1)}` や `onClick={() => countUpN(10)}`</span> とすると、さらにスマートに記述ができます (全体のコードは[こちら<i class="fa-solid fa-person-chalkboard"></i>](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/04/code02.tsx)を参照)。

```ts{.numberLines caption="src/App.tsx (After2)" startFrom=5}
const countUpN = (n: number) => setCount(count + n);
```

また、関数 `countUpN` を削除して [こちら<i class="fa-solid fa-person-chalkboard"></i>](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/04/code03.tsx) のように `onClick` に <span class="masked">直接処理を記述するような実装</span> もあります。

#### 演習

次のように、カウントをリセットするボタンを実装してください。

![img](figs/04/app_06.png)

- 実装例は [こちら<i class="fa-solid fa-person-chalkboard"></i>](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/04/code04.tsx)

## Todoアプリの実装

ここからは、前回講義までに扱ってきた Todo のデータを使い、React で Todo リストを表示するアプリを実装していきます。

### 準備: ライブラリのインストール

個々の Todo に ID を設定するため **UUID v4** (**Universally Unique Identifier Version 4**) を生成可能な [uuid](https://www.npmjs.com/package/uuid) というライブラリをインストールします。また、日時の整形には、第02回講義で使用した [Day.js](https://www.npmjs.com/package/dayjs) を使用します。

- [UUID v4 とは](https://www.google.com/search?q=UUID+v4+とは)

VSCode のターミナルから以下のコマンドを実行してください。

```bash
npm i --save-exact uuid@14.0.3 dayjs@1.11.23
```

アイコン用に [Font Awesome](https://fontawesome.com/) の React コンポーネントとアイコンをインストールします。Font Awesome $\to$ <i class="fa-solid fa-fish"></i> <i class="fa-solid fa-envelope"></i> <i class="fa-solid fa-key"></i>

```bash
npm i --save-exact @fortawesome/react-fontawesome@3.5.0 @fortawesome/fontawesome-svg-core@7.3.1 @fortawesome/free-solid-svg-icons@7.3.1
```

Tailwind 関連のユーティリティクラス (`font-bold` や `px-4` など) を動的に結合する際に、**スタイリングの衝突を解決**してくれる [tailwind-merge](https://www.npmjs.com/package/tailwind-merge) をインストールします。アプリの実行時にも使用するため、`-D` を付けずにインストールします。

```bash
npm i --save-exact tailwind-merge@3.7.0
```

**<i class="fa-solid fa-comment-dots fa-flip-horizontal"></i>プロンプト例**

> tailwind-mergeとは、どのようなライブラリですか？

### 準備: 初期データの作成

Todoリストの「初期データ」を準備します。まずは、このTodoアプリで共通使用する「**型**」を定義しておくためのファイル `src/types.ts` を新規作成してください。

- 「**src/types.ts** を新規作成してください」とは「**src** フォルダのなかに **types.ts** を新規作成してください」という意味です。

作成したファイルに、以下のように **Todo型** を定義してください。また <span class="masked">定義した型が、他のファイルで `import` できるように、先頭に `export`</span> を付けてください。なお、このファイルは、単に型定義をしているだけのファイルなので拡張子は `.tsx` ではなく、`.ts` としてください。

```ts{.numberLines caption="src/types.ts"}
export type Todo = {
  id: string;
  name: string;
  isDone: boolean;
  priority: number;
  deadline: Date | null; // 注意
};
```

ここで注意してほしいのは **第06行目** で、プロパティ `deadline` の型を「Date」もしくは「null」に設定している点です ( [前回講義の解説](lecture03.html#型と宣言) を参照)。特に「期限を設定しないTodo」については `deadline` を `null` として扱うものとします。

次に、Todoリストの初期データを格納するファイルとして `src/initTodos.ts` を作成し、以下のように初期値 `initTodos` を設定してください。この `initTodos` も <span class="masked">他のファイルから参照するので忘れずに `export` キーワードを付与してください</span>。データの内容は自由に変更して問題ありませんが、このあとの展開の関係で **3個以上を設定** してください。

なお、**第06行目** の `uuid()` は UUID v4 の文字列 (string型) を <span class="masked">ランダム</span> に生成する関数になります (**第02行目** では `v4` という関数を `uuid` という名前でインポートしています)。

```ts{.numberLines caption="src/initTodos.ts"}
import type { Todo } from "./types";
import { v4 as uuid } from "uuid"; // v4 を uuid という名前でインポート

export const initTodos: Todo[] = [
  {
    id: uuid(), // UUID v4 を生成してIDにセット
    name: "解析2の宿題",
    isDone: false,
    priority: 2,
    deadline: new Date(2026, 10, 2, 17, 30),
  },
  {
    id: uuid(),
    name: "TypeScriptの勉強 (復習)",
    isDone: true,
    priority: 3,
    deadline: null, // このTodoには期限を設定しない
  },
  {
    id: uuid(),
    name: "基礎物理学3の宿題",
    isDone: false,
    priority: 1,
    deadline: new Date(2026, 10, 11),
  },
];
```

- 現在の開発環境では `import type { Todo } from "./types.js";` のようにインポートファイルに <span class="masked">拡張子をつける必要はありません</span>。

### TodoListコンポーネントの作成

Todoリストを表示するための「**TodoListコンポーネント**」を作成します。`src/TodoList.tsx` を作成して、以下の内容を記述してください。

::: {.balloon .char-01 .face-05 .tone-blue}
ここでは、練習のために**コピペ**ではなく**コードを打ち込んで**ください。[前回講義で紹介](lecture03.html#react開発の支援機能) しているように `ES7+ React/Redux/React-Native snippets` をVSCodeの拡張機能としてインストールしていると、次の図のように `rafce` と打ち込むだけで **アロー関数形式のReactコンポーネントのテンプレート** が得られます。

![img](figs/03/vscode_04.png)

:::

```ts{.numberLines caption="src/TodoList.tsx"}
import type { Todo } from "./types";

type Props = {
  todos: Todo[];
};

const TodoList = (props: Props) => {
  const todos = props.todos;
  return (
    <div className="flex flex-col gap-y-1">
      <div>
        {todos[0].name} 優先度: {todos[0].priority}
      </div>
      <div>
        {todos[1].name} 優先度: {todos[1].priority}
      </div>
      <div>
        {todos[2].name} 優先度: {todos[2].priority}
      </div>
    </div>
  );
};

export default TodoList;
```

::: {.note .type-caution}
ここで定義する `TodoList` は、Reactの関数コンポーネントなので必ず [パスカルケース](https://www.google.com/search?q=パスカルケースとは) としてください。また、同様に、ファイルの名前もパスカルケースとしてください。
:::

このコンポーネントは、Todo型の配列 `todos` を **Props (プロップス)** として受け取り、先頭から3件分のTodoの「名前」と「優先度」を表示しています。なお、Reactの文脈において Props とは **Properties の略称**で、<span class="masked">コンポーネントが受け取る「引数」のようなもの</span> と考えてください。

なお、ここでの **第11行目** から **第19行目** のコードは酷いものですが、これは後で書き換えます。

### Appコンポーネントの編集

**src/App.tsx** を次のように編集してください。**第04行目** では、[先ほどの演習](lecture04.html#reactにおけるコンポーネントとは) で未完了タスク数も受け取れるようにした **WelcomeMessage コンポーネント** をインポートしています。同様に **第05行目** では、Todo リストのコンポーネント (**src/TodoList.tsx**) をインポートしています。

また、**第03行目**では、Todoリストの初期データとして `initTodos` をインポートしています。なお、インポートする際に <span class="masked">波括弧 `{ }` をつけてインポートしているケースと、そうでないケースがあること</span> に気づくと思います。これらの理由については生成AIで解決してください。

**<i class="fa-solid fa-comment-dots fa-flip-horizontal"></i>プロンプト例**

> Node.js 環境で TypeScript の勉強をしています。サンプルコードを見ていると、ライブラリから関数や変数をインポートする際に、波括弧 `{}` を付けているケースと、そうではないケースがあることに気づきました。違いについて教えてください。


```ts{.numberLines caption="src/App.tsx"}
import { useState } from "react";
import type { Todo } from "./types";
import { initTodos } from "./initTodos";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./TodoList";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initTodos);
  const uncompletedCount = todos.filter((todo: Todo) => !todo.isDone).length; // 未完了タスクの数え上げ
  console.log(JSON.stringify(todos, null, 2));

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

編集後、保存してから **開発モード** でアプリを実行してください (`npm run dev`)。次のような実行結果が得られると思います。さらに、ブラウザで `[F12]` を押下して **デベロッパーツール** を起動してコンソール出力 (**第10行目** で行われている `todos` の出力) も確認してください。

![img](figs/04/app_07.png)

`src/App.tsx` と `src/TodoList.tsx` について、生成AIなどを活用して読解・理解をしてください。特に、しっかりと理解してほしい箇所は次のとおりです。


- `src/App.tsx` の **第08行目** : 現時点では `todos` を変更 (追加・削除) する処理は含んでいませんが、今後、それらの機能を実装したときに `todos` の変更をトリガーに再レンダリングをしたいので `useState` を使って「状態」として扱うようにしています。
    - `useState<Todo[]>(initTodos)` ではなく `useState(initTodos)` のように型推論を利用して初期化が可能です。ただし、初期値を空配列にする場合は、明示的に型を与える必要があります。
- `src/App.tsx` の **第09行目** : ここでは、Todo型オブジェクトの配列から「未完了のタスク数」をカウントしています。前回講義で学んだ**配列**の [filter操作](lecture03.html#オブジェクト配列の-filter-操作) と [lengthプロパティ](lecture03.html#第1形態-レガシーな手続き型スタイル) を活用している例になります。
- `src/App.tsx` の **第21行目** の `<TodoList todos={todos} />` と、`src/TodoList.tsx` で定義している `TodoList` 関数の引数 (Props) が対応している点に注意してください。

### TodoListコンポーネントのブラッシュアップ

現状の `src/TodoList.tsx` は、`todos` の要素数に関わらず <span class="masked">固定で「3件」のTodoしか表示すること</span> ができません。しかも、`todos` の要素数が **2個以下のときは実行時エラー** が生じます (Todoが1個も表示されなくなります)。

そこで、前回講義で学んだ <span class="masked">mapメソッド</span> を利用して、`todos` の要素数にあわせて表示するように変えたいと思います。この mapメソッドを使うテクニックは **Reactでは定番中の定番処理** となるので確実に読解かつ記述できるようにしてください。

```ts{.numberLines caption="src/TodoList.tsx (Before) 再掲"}
import type { Todo } from "./types";

type Props = {
  todos: Todo[];
};

const TodoList = (props: Props) => {
  const todos = props.todos;
  return (
    <div className="flex flex-col gap-y-1">
      <div>
        {todos[0].name} 優先度: {todos[0].priority}
      </div>
      <div>
        {todos[1].name} 優先度: {todos[1].priority}
      </div>
      <div>
        {todos[2].name} 優先度: {todos[2].priority}
      </div>
    </div>
  );
};

export default TodoList;
```

上記のプログラムを次のように書き換えます。前回講義の [オブジェクト型の配列に対するmapの適用](lecture03.html#オブジェクト型の配列に対するmapの適用) を参考にしながら、この書き換えを理解してください。

```ts{.numberLines caption="src/TodoList.tsx (After)"}
import type { Todo } from "./types";

type Props = {
  todos: Todo[];
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
    <div className="space-y-1">
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.name} 優先度: {todo.priority}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
```

書き換え後のプログラムでは、`todos` が <span class="masked">空配列のとき (`todos.length === 0` のとき)</span> には、Todoリストの代わりに「**現在、登録されているタスクはありません。**」というメッセージを表示するようにしています。

また、map の戻り値となる**一番外側の JSX 要素** (この例では `<div>` 要素) については、**第21行目** のように <span class="masked">必ず `key` 属性を設定してください</span>。`key` の値には <span class="masked">配列内で重複せず、同じ Todo では再レンダリングしても変わらない値</span> を指定します。このアプリでは、各 Todo の `id` を使用します。

::: {.balloon .char-01 .face-01 .tone-pink}
`key` 属性を設定していないと、実行時に `Each child in a list should have a unique "key" prop` という警告が表示されます。また、再レンダリングに際して意図した動作をしなくなる可能性があります。詳しい原理は生成AIで解決してください。
:::

**<i class="fa-solid fa-comment-dots fa-flip-horizontal"></i>プロンプト例**

> Reactを使ったウェブアプリを開発しています。配列のmapメソッドを使用してJSXを構成する際、key属性が要求されるのは何故ですか。Reactは何のためにkey属性を必要としますか。

#### 演習

前回講義で学んだように、Todoの並び替えは「配列のsortメソッド」を利用して行なうことができます。例えば、優先度を昇順 (1👉2👉3の順) にしたいときは、**第08行目**の `const todos = props.todos;` を以下のように書き換えます。

```ts{.numberLines caption="優先度で整列する" startFrom="8"}
const todos = [...props.todos].sort((a, b) => a.priority - b.priority);
```

前回講義の [複数のソートキーを使ったオブジェクト配列の並び替え](lecture03.html#複数のソートキーを使ったオブジェクト配列の並び替え) を参考にして、**第1ソートキー**を `isDone` (未完了を先に表示)、**第2ソートキー**を `deadline` (期限が早いものを先に表示) として並び替えた Todo リストが表示されるようにしてください。期限がない Todo は、同じ完了状態のグループのなかで最後に表示してください。

## 演習 (宿題)

主に `src/TodoList.tsx` の **JSX (HTML)** と **Tailwind CSS** に編集を加えてTodoリストコンポーネントの表示を **自分流にカスタマイズ** してみてください。これは、UI/UXの設計練習も兼ねています。また、後期前半の大課題に関連する内容にもなってきます。

なお、現時点では「チェックボックス」や「ボタン」などの要素追加や、それに対するスタイリングは不要です (これらの内容は次回講義で扱います)。

**(Todoリストのカスタマイズの例)**

![img](figs/04/app_08.png)

- 上記のサンプルのコードは [こちら<i class="fa-solid fa-person-chalkboard"></i>](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/04/code05.tsx)