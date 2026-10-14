---
var:
  header-title: "2026-3I プログラミング3 第04回 講義資料"
  header-date: "2026年10月16日（金）1時限"
---

# 第04回 3I-プログラミング3

## 情報共有

- [第37回高専プロコン（2026年 香川（高松）大会）](https://www.procon.gr.jp/) YouTube 配信 2026/10/10・11（配信リンクは公式ページの「放送予定」を参照）
- [第36回高専プロコン（2025年 松江大会）](https://www.youtube.com/watch?v=8qzc-e9Czqc&list=PLTPqb9X7I-Lm7SDmwfmjg0oT-lvUmhRmU) YouTube配信 2025/10/11・12
- [第35回高専プロコン（2024年 奈良大会）](https://www.youtube.com/playlist?list=PLTPqb9X7I-LlS8ZbJgHDC4DtaYo_DKszV)YouTube配信 2024/10/19・20
    - [全国の高専生はどんなアプリやソフトを開発しているの?](https://www.procon.gr.jp/archive/2024/) ...リンク先の「**大会パンフレット**」も確認してください。

## ここまでの流れ

後期中間試験ぐらいまでの授業の流れ (予定)

1. モダンTypeScript基礎学習のための環境構築 ***済***
2. TypeScript基礎学習 ***済***
3. Reactを使ったTodoアプリのための環境構築 **← 今回 (前半)**
4. Todoアプリ開発（Reactフロントエンド開発）のチュートリアル **← 今回と次回**
5. Todoアプリのカスタマイズや作り込み → **_課題1_**
    - 参考: [2024年度の学生作品](https://omunet-my.sharepoint.com/:t:/g/personal/z21707r_omu_ac_jp/ET7-SWbLKVlBvtsv3v5guw0BvXiUlGzUqjCKk6ES6X88-w)(学内のみ)

まずは、次のような📝**Todoアプリの開発** (Reactを採用したフロントエンド開発) を目標とします。

- [Todoアプリのサンプル](https://takeshiwada1980.github.io/react-todo-app-demo/) (ギリギリ合格水準のレベル、点数で言えば60点😨)
- [Todoアプリのサンプル](https://takeshiwada1980.github.io/react-todo-app-demo/2) (ここまで内容を理解して開発できたら90点🎉)

今回講義の **後半の内容** は、前回講義で宿題として示した[【React入門】完全初心者OK！1から簡単なTodoアプリを作ってReactの1歩を踏み出してみよう ～Reactチュートリアル～](https://www.youtube.com/watch?v=nRCNL9T3J98)の視聴を前提とした内容です。

- この講義でも、**上記動画とほぼ同じ機能を持ったTodoアプリ**を作成します。ただし、最終的に仕上がるアプリは同じであっても、本授業での開発環境やコードスタイル (<span class="masked">そもそも動画では TypeScript ではなく JavaScript で作成している</span>) などが違う点に注意してください。
    - [Todoアプリのサンプル](https://takeshiwada1980.github.io/react-todo-app-demo/) (ギリギリ合格水準のレベル、点数で言えば60点😨)
    - [Todoアプリのサンプル](https://takeshiwada1980.github.io/react-todo-app-demo/2) (ここまでつくれたら素晴らしい！90点超🎉)
- 同じような機能を持ったアプリを開発する場合でも、**そのアプローチが無数にあること** を意識して学ぶと得られるものが多いです。

## React開発環境の構築

[Vite](https://www.google.com/search?q=viteとは)という**ビルドツール**を使用して「**Tailwind CSS**」と「**TypeScript**」を用いた **Reactアプリの開発環境を構築する手順** について解説します。

- [Tailwind CSS とは](https://www.google.com/search?q=Tailwindとは+CSS)

### 準備

ターミナル (PowerShell) を開いてプロジェクトフォルダを配置したいフォルダ (例えば ` C:\Users\xxxx\Documents\` など) に**移動**してください。いまから、このフォルダのなかに `react-todo-app` というプロジェクトフォルダを作成して、そこに「**React (TypeScript+Tailwind CSS) の開発環境**」を構築していきます。

<div class="note type-caution">
**注意**

ドキュメントフォルダを **OneDrive 同期**している学生は、その影響のないフォルダ (`c:\work` など) で作業することを強く推奨します。OneDrive 同期フォルダで作業すると予期せぬトラブルの発生や、OneDrive容量を圧迫することがあります。
</div>

### Viteによるプロジェクトフォルダの作成

ここでは[Vite](https://www.google.com/search?q=Viteとは) という「**ウェブ開発用のビルドツール**」を使って環境を構築していきます。Vite は「ビート」「ヴィート」のように読みます (稀に「バイト」や「ビーテ」のように読む人もいます)。

ターミナルから以下のコマンドを実行してください。

```
npx create-vite@latest react-todo-app --template react-swc-ts
```

コマンドオプションの `react-todo-app` は **プロジェクトの名称** (=プロジェクトフォルダの名称) を指示しています。`--template react-swc-ts` では <span class="masked">React と TypeScript と SWC を統合した開発環境テンプレート</span> を使って環境構築することを指示しています。


<div class="note type-tips">
**create-react-app**

2024年の前半ぐらいまでは `npx create-react-app` というコマンドでも同様に環境構築が可能でしたが、現在はアップデートされていないので、Vite を使うようにしてください。
</div>


なお、`npx create-vite` を初めて実行するときや、前回実行から時間が経っているときは、以下のように尋ねられるので、続行するために `y` を入力してください。

```
Need to install the following packages:
create-vite@8.0.2
Ok to proceed? (y)
```

次のように `Use rolldown-vite (Experimental)?` については **_No_** を、`Install with npm and start now?` については **_Yes_** を選択してください。


```
> npx
> create-vite react-todo-app --template react-swc-ts

│
◆  Use rolldown-vite (Experimental)?:
│  ○ Yes
│  ● No
│
◆  Install with npm and start now?
│  ● Yes / ○ No
│
◇  Scaffolding project in C:\Users\xxxx\Documents\react-todo-app...
│
◇  Installing dependencies with npm...

added 206 packages, and audited 207 packages in 25s

44 packages are looking for funding
  run `npm fund` for details
  
found 0 vulnerabilities
│
◇  Starting dev server...

> react-todo-app@0.0.0 dev
> vite


  VITE v7.1.10  ready in 1618 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

以上により、プロジェクトの雛形が作成され (＝**スキャフォールディング**)、依存パッケージのインストール、アプリのビルド、そして開発サーバの起動までが自動的に完了します。

**(プロンプト例)**

> ウェブアプリ開発環境構築に関する文脈で「スキャフォールディング」とは、どのような意味ですか。

最低限のコンテンツを含んだ「Reactアプリ」が、開発サーバで起動済みなので、ウェブブラウザから[http://localhost:5173/](http://localhost:5173/)にアクセスして確認してください。

![img](figs/04/app_00.png)

画面中央下部の「Count is 0」のボタンをクリックすると、その表示がクリックのたびに「1」「2」「3」と更新されます。

このカウントアップは React の `useState` という主要な機能を利用して行なわれています。数値のカウントアップは <span class="masked">「Hello World」や「(組込み開発の)Lチカ」のような位置づけ</span> になります。

動作が確認できたら、ターミナルから `[Ctrl]+[C]` を入力して、開発サーバを停止してください。

### プロジェクトフォルダの構成確認

作成されたフォルダ (`react-todo-app`) に `cd` コマンドで移動して VSCode を立ち上げてください。

```
cd react-todo-app
code .
```

VSCodeのエクスプローラから、フォルダ構成が次のようになっていることを確認してください。

![img](figs/04/vscode_01.png)

プロジェクトフォルダに配置される各ファイルの概要は以下のようになります。

#### tsconfig.\*\*.json

プロジェクトフォルダ内の `tsconfig.json`、`tsconfig.app.json`、`tsconfig.node.json` の3ファイルはいずれも **TypeScript関連の設定ファイル** となります。

「tsconfig.json」の内部から、「tsconfig.**app**.json」と「tsconfig.**node**.json」を参照する構成になっています。実際にVSCodeで `tsconfig.json` の内容を確認してください。

- tsconfig.**app**.json は、**これから自分で開発するアプリのソースコード** に適用されるTypeScript設定になります。
- tsconfig.**node**.json は、**Node.js 環境で実行される範囲（例えばビルドスクリプトなど）** に適用されるTypeScript設定になります。

これらのファイルは、基本的に直接編集することはありません。

#### README.md

「**README.md**」は、GitHubのリポジトリのトップページに表示される「README」を記述するファイルになります。マークダウン形式 (`.md`拡張子) で記述します。

特に、プロジェクトを「**ポートフォリオに位置づける場合**」には、アプリ概要 (機能一覧) やライセンス情報の他に <span class="masked">開発の経緯（なぜそのアプリを制作したのか）</span>、**技術スタック** (プロジェクトで使用している「フレームワーク」「ライブラリ」「ツール」など)、**こだわりのポイント** を記載するようにしてください。

#### .gitignore

「**.gitignore**」は、**Gitを使ったバージョン管理を「しない」ファイルやフォルダ**を設定するためのファイルになります。Git管理 (バージョン管理) をしない = <span class="masked">GitHub にもアップされない</span> ということになります。

「**.gitignore**」の内容を確認すると、パッケージ本体を格納している `node_modules` フォルダのほか、DB接続情報やAPIキーを格納するファイル ( `.env.local` ) などが、Git管理から除外されるようになっています (=<span class="masked">GitHubにアップされないようになっています</span>)。

#### eslint.config.js

「**eslint.config.js**」は[ESLint](https://www.google.com/search?q=ESLintとは) という「**コード品質チェックツール**」に関する設定ファイルになります。例えば、ESLint を使うと <span class="masked">宣言されているが未使用の変数</span> があるときなどに「警告」や「エラー」として検出してくれます。

なお、「**Lint**」は (TypeScriptに限らず) プログラミング一般において「**ソースコードを解析し、バグやスタイルの問題、疑わしい構造などを検出するプロセス**」を指し、そのためのツールが **Linter（リンター）** と呼ばれています。C言語 や Python用の Linter もあります。**ESLint** は、特に <span class="masked">ECMAScript (JavaScript / TypeScript)</span> 用の**標準Linter**として知られています。

この授業でのReact開発では、フォーマッターとしては「**Prettier (プリティア)**」、リンターとしては「**ESLint (イーエスリント)**」を使用していきます。両者の「役割」や「機能」の違いが気になる人は、生成AIで解決してください。

**(プロンプト例)**

> React (TypeScript) 開発の際に、フォーマッターには「Prettier」を、リンターには「ESLint」を使用するように勧められました。両者の役割や機能の違いについて教えてください。

- 参考: [ESLint入門2023 導入・設定方法・Prettierとの違い解説](https://www.youtube.com/watch?v=2h94FItnqvI)@YouTube
  - Vite による環境構築には、ESLintの導入と初期設定も含まれるので、動画内で解説されているような `npm init @eslint/config` の実行は不要です。

### インストールパッケージ (ライブラリ) の確認

プロジェクトフォルダのなかの「**package.json**」の内容を確認してください。

[第01回講義で解説](lecture01.html#package.json-の設定)したように、package.json は <span class="masked">アプリの開発や実行に必要なパッケージ (ライブラリ) の情報</span> や、**開発に使用するコマンドをショートカットとして定義** する設定ファイルとなります。

package.json のなかの `"dependencies"` と `"devDependencies"` の項目を確認してください。TypeScript を用いて React開発するために **最低限必要となるパッケージ (ライブラリ)** が記載されています。

ここに記載されたパッケージ (ライブラリ) は「node_modules」フォルダのなかにインストールされます (`vite` コマンドによって、既にインストールされています) 。「package-lock.json」については[第01回講義で解説済み](lecture01.html#npm-とローカルインストール)ですが、詳しく知りたい人は生成AIで解決してください。

**(プロンプト例)**

> Node.js環境における `package.json` と `package-lock.json` の違いについて詳しく教えてください。

### Reactアプリのビルドと動作確認

VSCode のターミナルから `npm run dev` コマンドを入力すると、**開発モード** で Reactアプリを起動することができます。`dev` は Development (開発) の意味です。

```
npm run dev
```

- `npm run dev` により実行される処理は「package.json」の `"scripts"` セクションに定義された `vite` コマンドとなります。そのため、直接 `npx vite` を実行しても同様に開発サーバが起動します。

コマンドを実行すると、ターミナルに次のように表示がされ、ローカルホストの **5173 番ポート** でアプリが立ち上がります。

```
PS C:\Users\xxxx\Documents\react-todo-app> npm run dev     

> react-todo-app@0.0.0 dev
> vite

  VITE v7.1.10  ready in 1107 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

ウェブブラウザで[http://localhost:5173/](http://localhost:5173/)にアクセスし、アプリが起動していることを確認してください。開発モードで実行中は <span class="masked">ソースファイルを変更</span> すると、その内容が自動的にアプリに反映されます。

アプリの動作が確認できたら「**停止**」してください (VSCodeのターミナルをアクティブにして `[Ctrl]+[C]` を押下してください)。

---

上記では「**開発モード**」を使ってアプリを実行しましたが、今度は <span class="masked">プレビューモード (疑似本番モード)</span> でアプリを実行してみたいと思います。

まずは、ターミナルに `npm run build` を入力して「ビルド」を実行します。

```
npm run build
```

プロジェクトフォルダのなかに <span class="masked">`dist`フォルダ</span> が新たに追加されて、そのなかにビルドされたファイルが格納されます。

![img](figs/04/vscode_05.png)


`dist` フォルダに出力されたアプリを実行するためには `npm run preview` コマンドを入力します。

```
npm run preview
```

今度はアプリが **4173番ポート** で立ち上がるので、ウェブブラウザから[http://localhost:4173/](http://localhost:4173/)にアクセスして動作を確認してください。「**開発モードでの実行**」と「**プレビューモードでの実行**」の違いについては、ウェブ検索や生成AIの解説を参照してください。

**(プロンプト例)**

> ビルドツールに Vite を使用して React 開発をしています。`npm run dev` コマンドでアプリを実行したときと、 `npm run build` してから `npm run preview` コマンドでアプリを実行したときの違いを教えてください。

プレビューモードでの動作を確認できたら、`[Ctrl]+[C]` で **アプリを停止** しておいてください。

### 不要なファイルや記述を削除

Reactについて要点を押さえて理解するために、プロジェクトフォルダから**不要なファイルを削除**し、いくつかのファイルについて**不要な記述を削除**していきます。

#### index.html の編集

`index.html` を次のように編集してください。`<html>` タグと `<title>` タグの部分を書き換えています。

```html{.numberLines caption="index.html"}
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TodoApp</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- **第02行目** の `<html lang="en">` を `<html lang="ja">` に書き換えました。

- **第07行目** の `<title>react-todo-app</title>` を `<title>TodoApp</title>` に書き換えました。

その他の箇所についても、リンターやフォーマッターによって <span class="masked">「タグの大文字小文字」や「引用符」が書き換わること</span> がありますが、そこは気にする必要はありません (以降も同様)。

最後に「保存すること」を忘れないでください。

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

拡張子 `.tsx` は、React用の **JSX**（XMLライクな拡張構文）および TypeScript に対応したプログラムが記述されていることを示しています。このプログラムの内容について後で解説するので、現時点では深く理解する必要はありません (まずは、開発環境の構築を優先して進めます)。

- **第12行目** でボタンをクリックすると `onClick={countUp}` によって、**第05行目** で定義されている `countUp` 関数が呼び出されるのかな🤔...ぐらいの簡単な理解で十分です。

さきほどと同様に、最後に「保存すること」を忘れないでください。

#### ファイルとフォルダの削除

このあと Tailwind CSS を導入することを前提に CSS 関連のファイルとフォルダを削除します。

- `src/App.css` を削除してください。
- `src/index.css` の**内容を全削除**してください (**ファイル自体は残すようにしてください**)。

Reactのロゴが描かれたファイル (`src/assets/react.svg`) も不要なので、`src/assets` **フォルダごと削除**してください。

結果的に、以下のようになるようにしてください。

![img](figs/04/vscode_02.png)

#### README.md の編集

`README.md` を次のように書き換えてください。ライセンスは **MIT License** としています。

**第13行目** の `Copyright (c) 2026 Kosen Taro` については、適当に書き換えてください (名前の部分はハンドルネームでOKです)。

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

次のコマンドを実行して、開発モードで動作確認します。

```
npm run dev
```

CSS関連の設定を削除したので、次のような **シンプルなアプリ画面** (＝CSSが適用されていない素のHTMLによる最低限のデザインとレイアウト構成) になっていることが確認できると思います。ただし、<span class="masked">ボタンを押下したときのカウントアップ</span> は引き続き機能することを確認してください。

![img](figs/04/app_02.png)

動作が確認できたら、VSCode のターミナルから `[Ctrl]+[C]` を入力して、**開発サーバを停止**しておいてください。

### Tailwind CSS の適用

この授業では[Tailwind CSS](https://www.google.com/search?q=Tailwind+CSSとは)という「**CSSフレームワーク**」を使用します (既に他のCSSフレームワークを使い慣れている人は、そちらを利用してもらっても問題ありません)。TailwindCSS は、あらかじめ用意されている <span class="masked">細かく分割されたデザインの部品</span> を組み合わせてUIをスタイリングする点に特徴があります。

例えば、**ボタン要素** に対して...

- `bg-blue-500`: **背景色を強度500の青にする** 
- `px-4`: **左右に4スケールの内部余白 (パディング) を設定する** 
- `rounded`: **四隅 (角) を丸める** 

...といったデザイン部品の組み合わせを `<button className="bg-blue-500 px-4 rounded">` のように与えてスタイリングします。

Tailwind CSS を用いることで <span class="masked">CSSクラスの名前</span> を考えたり、スタイルの衝突を心配する必要がないので開発速度が上がり、**デザインの「一貫性」や「保守性」** も保ちやすくなります。なお、本科目の後半で扱う Next.js は、**標準で Tailwind CSS をサポート**しており、その他、様々なプロダクトでも採用されています。

#### Tailwind 関連パッケージのインストール

次のコマンドを実行して「tailwindcss」「@tailwindcss/vite」「prettier」「prettier-plugin-tailwindcss」という Tailwind CSS 関連の4つのパッケージをインストールしてください。

なお、Tailwind CSS で設定されたスタイルは、ビルド時に通常のCSSに変換されるため、いずれのパッケージも「**開発時のみ**」に必要となります (本番環境での実行時には使用しません)。そのため `-D` オプションを付加して開発依存関係 (`devDependencies`) として扱います。

```
npm i -D tailwindcss @tailwindcss/vite
npm i -D prettier prettier-plugin-tailwindcss 
```

#### 設定ファイルの追加と変更

プロジェクトのルート (トップレベル) に `.prettierrc` というファイルを新規作成し、以下の内容を記述してください。これは[第01回講義でインストールするように指示](lecture01.html#補足-フォーマッタのインストール-と-おまけ)した **Prettier** というフォーマッタ (VSCode) に関する拡張機能に関連する設定になります。

![img](figs/04/vscode_09.png)

```json{.numberLines caption=".prettierrc"}
{
  "semi": true,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```


これにより、Prettier が **Tailwind CSS のユーティリティクラスを自動的に並び替えてくれる**ようになります。たとえば `<div class="text-center bg-blue-500 p-4">` のようなクラス指定は、保存時に Tailwind の推奨順序 (レイアウト → 表示 → 色 → テキスト…のような体系) に沿って自動整列されるようになります。

---

次に、プロジェクトのルートの `vite.config.ts` という設定ファイルを以下のように変更してください。忘れずに保存もしてください。**第03行目** で `tailwindcss` をインポートして、**第07行目** でプラグインとして設定しています。

```ts{.numberLines caption="vite.config.ts"}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

---

さらに、`src/index.css` (先ほど内容を空にしたファイル) に、次の内容を記述してください。忘れずに保存もしてください。

```css{.numberLines caption="src/index.css"}
@import "tailwindcss";
```

なお、上記の `src/index.css` ファイルは、`src/main.tsx` の **第03行目** で読み込まれ、<span class="masked">アプリ全体で Tailwind によるスタイリングが有効</span> になります。

各ファイルとも **保存されていることを再確認** してください。

この状態で `npm run dev` で動作確認すると、次のように標準HTMLによるデフォルトのスタイルを含めて、**全てのスタイリング設定が剝がされた状態のアプリ画面**になります。

![img](figs/04/app_09.png)

ボタンとしての枠線が無くなって分かりづらいですが「**count is 0**」の文字を押下すると、問題なくカウントアップは機能することを確認してください。

#### Tailwind によるスタイリング

ここから「Appコンポーネント」が記述されている `src/App.tsx` に **Tailwind CSS によるスタイリング** を適用していきます。ファイルの内容を、次のように書き換えてください。

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

書き換えたのは **第10行目** から **第15行目** の範囲 (`return` しているJSX構文の内部) になります。

いずれも **HTMLタグ** (厳密には**JSXタグ**) に `className` 属性を追加して、そこに **Tailwindのクラス** (`mx-4` や `font-bold` など) を記述しています。**HTMLタグ**では `class` 属性にCSSクラスを記述しましたが、**JSXタグ** (`.jsx` や `.tsx`ファイルで利用可能な構文) では `className` 属性にクラスを記述します。

<div class="note type-tips">
**HTMLとCSS**

「**HTML**」と「**CSS**」の基礎は、情報3の「第11回講義」と「第12回講義」で学習済みです。

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


以上で Tailwind CSS の適用が完了しました。

`npm run dev` で動作確認してください。

**ボタンにマウスカーソルを重ねると (ホバーすると) 色が変わること**や、<span class="masked">ウィンドウ幅を変えても左右 (X方向) の余白が適切に調整されること</span> も確認してください。また、レスポンシブデザインになっていることも確認してください (`[F12]` でデベロッパツールでモバイル表示に切り替えてみてください)。

![img](figs/04/app_03.png)

#### 演習

開発モード (`npm run dev`) でアプリを実行しているときは <span class="masked">ホットリロード</span> が有効になります。つまり、コードを書き換えて保存すると、**その結果が自動でウェブブラウザに反映されます**。

実際に開発モードでアプリを起動し、以下のように `src/App.tsx` のコードを書き替えて保存すると、それが **どのように画面に反映されるか** を確認してください。

- `<h1>` タグに `text-violet-600` クラスを追加してください。
    - つまり <span class="masked">`<h1 className="font-bold text-2xl mb-4 text-violet-600">TodoApp</h1>`</span> のようにしてください。
- `<button>` タグのクラスを `rounded` から `rounded-full` に変更してください。また、`rounded-xs` に変更してください。
- `<button>` タグのクラスを `py-2` から `py-1` に変更してください。また、`py-0.5` に変更してください。
- `<button>` タグに `cursor-not-allowed` を追加してください。

参考: [TailwindCSSの色指定の一覧](https://tailwindcss.com/docs/colors)

#### Tailwind スタイルの調べ方

`className` 属性を使って設定する各種スタイル (**ユーティリティクラス**) については、都度、解説していきますが、自分で調べたいときは[Tailwindの公式ページ](https://tailwindcss.com/)や生成AIを活用してください。

**(プロンプト例)**

> TailwindCSS で、次のようにスタイルが適用されていました。各CSSクラスの意味について解説してください。  
> `<div className="mx-4 md:mx-auto mt-10 max-w-2xl">`

**(プロンプト例)**

> TailwindCSS でボタンに「ドロップシャドウ」を適用したいです。どのようにすればよいですか。  
> `<button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md">ほげ</button>`

## ポート設定のカスタマイズ

Viteで構築したプロジェクトは、デフォルト設定では **開発モード**（`npm run dev` で実行）が **5173番ポート** で起動します。このポート番号は `vite.config.ts` から任意に設定ができます。後期中間以降に利用する[Next.js](https://www.google.com/search?q=Next.jsとは)では開発サーバが **3000番ポート** で起動するので、それにあわせて、ここでも **3000番ポート** で開発サーバが起動するように設定を変更してみます。


プロジェクトフォルダの直下にある `vite.config.ts` を、次のように変更してください。

```ts{.numberLines caption="vite.config.ts (ポート番号の変更)"}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
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
PS C:\Users\xxxx\Documents\react-todo-app> npm run dev

> react-todo-app@0.0.0 dev
> vite


  VITE v5.4.9  ready in 1004 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

また `open: true` の設定により <span class="masked">ウェブブラウザも自動起動する</span> ようになっています。さらに `strictPort: false` の設定により、3000番ポートが他のアプリで既に使われている場合、3001番ポートでの起動が試されます。同様に、3001がダメなら、3002、3003…と起動が試行されます。


## ESLintのカスタマイズ

**ESLint** (＝<span class="masked">文法ミスやスタイルの不統一を指摘する静的解析ツール</span>) に関連するカスタマイズについて簡単に説明しておきます。`src/App.tsx` を開いて、以下のように **第04行目** に `const hoge = "Hoge";` というコードを追加してください。

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

> 'hoge' is assigned a value but never used. eslint@typescript-eslint/no-unused-vars   
> 'hoge' が宣言されていますが、その値が読み取られることはありません。ts(6133)

![img](figs/04/vscode_03.png)

ただし、この状態であっても <span class="masked">開発モード (`npm run dev`) で起動した開発サーバ</span> では **問題なくページが表示** されます。これは、このエラーが「**ESLintとしてのエラー**」であって「実行時エラー (Runtime Error)」ではないためです。

一方で、ビルド（`npm run build`）を実行すると、以下のように明確なエラーとして**処理が中断**されてしまいます。当然、`dist` フォルダにもビルドしたファイルが出力されません。

```
PS C:\Users\xxxx\Documents\react-todo-app> npm run build

> react-todo-app@0.0.0 build
> tsc -b && vite build

src/App.tsx:4:9 - error TS6133: 'hoge' is declared but its value is never read.

4   const hoge = "Hoge"; // ■■■ 追記 ■■■
          ~~~~


Found 1 error.
```

このように **開発モードでの実行には問題がないものの、本番用にビルドすると失敗する** ということは多々あります。そのため、<span class="masked">VSCodeでエラー（赤色波線）になっている箇所</span> は決して放置せずに修正し、また定期的に `npm run build` を実行することをお勧めします。アプリが完成したと思っていたのに、大量のビルドエラーでデプロイに失敗すると精神的なダメージが大きいです。

---

・・・とはいえ「**hogeが宣言されていますが、その値が読み取られることはありません**」のような軽微なコード規約違反がエラー扱いになると、開発途中では非常に不便です（特に個人開発という場面では）。例えば `npx create-next-app@latest` コマンドで作成する「**Next.jsの開発環境**」では <span class="masked">変数の未使用は「エラー」ではなく「警告」という扱い</span> になっています（警告レベルなのでビルドも可能です）。このように、**Viteで構築されるデフォルト環境のESLintの設定は少し厳しいもの** になっています。

ということで、「変数の未使用」が「エラー」ではなく「警告」の扱いになるように**ESLintの設定をカスタマイズ** していきます。

プロジェクトのルートの `tsconfig.app.json` の `noUnusedLocals` と `noUnusedParameters` の設定 (**第21行目と第22行目**) を、以下のように `true` から `false` に変更してください。

```json{.numberLines caption="tsconfig.app.json"}
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": false /* ESLintでチェックするため無効化 */,
    "noUnusedParameters": false /* ESLintでチェックするため無効化 */,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
```

**(プロンプト例)**

> `tsconfig.json` の `noUnusedLocals` と `noUnusedParameters` は、どのような設定ですか。それぞれを `true` から `false` に変更すると、どのようにコンパイルの挙動が変わりますか。

--- 

次に、プロジェクトのルートの `eslint.config.js` に、以下のように `rules: {...}` のセクションを追加してください (**第22行目** から **第35行目**)。これにより、未使用のローカル変数や、未使用の関数パラメータ (仮引数) があっても、警告 (`warning`) の扱いになります。

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
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    }, 
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          vars: "all",
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

- 警告も出したくない場合は、**第25行目** を `"off"` にしてください。
- **第30行目** から **第32行目** は「`_`で始まる変数・引数を「意図的に未使用」とみなし、未使用警告の対象から除外する設定」です。

`eslint.config.js` を変更して保存するときには、**少し時間がかかることがあります**（全てのコードが再チェックされるため）。

以上の設定を済ませると `src/App.tsx` の `const hoge = "Hoge";` のところが警告の扱い（赤色の波線から黄色の波線の表示）に変わっていることが確認できると思います。また `npm run build` を実行した際も、エラーで中断されることなくビルドが完了するはずです。

このようにLint関連のカスタマイズは `eslint.config.js` と `tsconfig.app.json` でできることを知っておくと役立つと思います。

<div class="note type-caution">
**注意** ESLint の動作が確認できたら `App.tsx` から `const hoge = "Hoge";` を削除しておいてください。
</div>

#### 演習 (宿題: <i class="fa-solid fa-stopwatch"></i>20分) 

プロジェクトフォルダをリネームするか削除して、再度、環境構築に取り組み、大まかな手順を覚えてください。可能であれば、3回、4回と繰り返してください (慣れれば、5分程度で一連の環境構築が可能になります)。

## Reactアプリケーションの実行順序の理解

Viteで構築したReactプロジェクトを **開発モード** (`npm run dev`) で実行したときに、各ファイル (各コンポーネント) が読み込まれていく順番について解説します。

- ここでは「分かりやすさ」を優先するため、一部に厳密さを省いた説明が含まれていますので注意してください。

まず一番初めにプロジェクトフォルダ直下にある `index.html` が読み込まれます。このように「プログラム実行の開始点 (起点) となるもの」を <span class="masked">エントリーポイント</span> といいます。

```html{.numberLines caption="index.html"}
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>react-todo-app</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

次に、上記の **第11行目** に記述される `<script type="module" src="/src/main.tsx"></script>` によって `/src/main.tsx` が読み込まれます。


そして `src/main.tsx` の **第06行目** の <span class="masked">`document.getElementById("root")`</span> によって、`index.html` の **第10行目** の `<div id="root"></div>` の領域（idが `root` のdiv要素）に対して `<App />` というコンポーネントがレンダリング (描画) されます。

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

ここでレンダリングされる `<App />` コンポーネントの実体は `src/main.tsx` の **第04行目** で読み込んでいる `App.tsx` となります。なお、`<StrictMode>...</StrictMode>` コンポーネントについては、いまは無視してください (気になる人は検索か生成AIで解決してください)。

そして、以下のような `src/App.tsx` によって、「**TodoApp**」という見出しや「**count is 0**」というボタンが画面に表示され、また **第05行目** の `countUp` 関数によってカウントアップが機能します。

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

以上、整理すると開発モードでは、以下のような順番でファイルが読み込まれていくと考えてください (プログラムがネスト構造になっていると考えてください)。

1. `index.html` が読み込まれ、その内部で ...
2. `src/main.tsx` が読み込まれ、その内部で ...
3. `src/App.tsx` (Appコンポーネント) が読み込まれる。

また、このあと **Appコンポーネント**の内部に、**TodoListコンポーネント** (`src/TodoList.tsx`) を配置して、さらに、その内部に **TodoItemコンポーネント** (`src/TodoItem.tsx`) を配置していきます。その場合は以下のようになります。

1. `index.html` が読み込まれ、その内部で ...
2. `src/main.tsx` が読み込まれ、その内部で ...
3. `src/App.tsx` (Appコンポーネント) が読み込まれ、その内部で ...
4. `src/TodoList.tsx` (TodoListコンポーネント) が読み込まれ、その内部で ...
5. `src/TodoItem.tsx` (TodoItemコンポーネント) が読み込まれる。

### ビルド (バンドル) 出力

ビルド (`npm run build`) を実行すると、最適化されたプロダクトが「**distフォルダ**」に出力されます。

このプロダクトは <span class="masked">トランスパイル (TypeScript👉JavaScript)、最適化、バンドル</span> などの処理によって **ロジックとファイルが集約されたもの**で、`index.html` をエントリポイントとして `assets/index-XXXX.js` や `assets/index-XXXX.css` が読み込まれるシンプルな構成になります。

![img](figs/04/vscode_06.png)

実際にビルドを実行して「distフォルダ」の各ファイルの内容について確認してみてください。

![img](figs/04/vscode_07.png)


## Reactアプリの開発

### Reactにおけるコンポーネントとは

Reactアプリは、基本的に「**コンポーネント**」とよばれる <span class="masked">機能とUIを持った画面構成の部品・パーツ</span> を組み合わせてアプリを構築する点に特徴があります。コンポーネントとは、具体的には `.tsx` という拡張子を付けたファイルに記述した「**JSX要素**を戻り値とする関数」を指します。そして、JSX とは、JavaScript XML の略で、JavaScript (TypeScript) プログラムのなかに <span class="masked">HTMLのようなタグ</span> を記述できるようにした拡張構文を指します。

例えば「**ウェルカムメッセージを表示するようなコンポーネント**」をTodoアプリに組み込みたいときは、以下のように `src/WelcomeMessage.tsx` を作成します。コンポーネントを記述したファイルは、大文字からはじまる[パスカルケース](https://www.google.com/search?q=パスカルケースとは)で名前を設定します。

```ts{.numberLines caption="src/WelcomeMessage.tsx"}
import React from "react";

// 引数の型を定義
// Propsという名前で定義することが一般的です。
type Props = {
  name: string;
};

// WelcomeMessage という関数コンポーネントの定義
// 関数コンポーネントはパスカルケースで名前を設定します。
const WelcomeMessage = (props: Props) => {
  // いわゆる普通のロジックを記述する
  const currentTime = new Date();
  const greeting =
    currentTime.getHours() < 12 ? "おはようございます" : "こんにちは";

  //【重要!】JSX構文で描いた「JSX要素」を return で返す
  return (
    <div className="text-blue-700">
      {greeting}、{props.name}さん。
    </div>
  );
};

// 他のファイルで WelcomeMessage を import できるようにする
export default WelcomeMessage;
```

そして、`src/App.tsx` のなかで以下のようにインポートして組み込みます。

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

`src/App.tsx` では、**第02行目** で「WelcomeMessageコンポーネント」を読込み、**第13行目**で `<WelcomeMessage name="寝屋川タヌキ" />` のように組み込んでいます。ここでは <span class="masked">`name` という引数が、どのようにWelcomeMessageコンポーネントに渡されているか (対応関係)</span> をよく確認してください。

- 例えば「`name="寝屋川タヌキ"` ではなく `userName="寝屋川タヌキ"` のように名前をウェルカムメッセージコンポーネントに渡したいときは、`WelcomeMessage.tsx` において、どこを書き換えるべきか」が分かったでしょうか。

なお、JSX要素のなかでは、コメントは `{/* コメント */}` のように記述します。

<div class="note type-caution">
**Reactの関数コンポーネントはパスカルケースで名前を設定すること**

TypeScriptでは、通常、関数名には **キャメルケース (小文字から開始)** を使用します。ただし、Reactの関数コンポーネントは、**パスカルケース (大文字から開始)** を使用する必要があります (また、これにあわせてファイル名も **パスカルケース** (大文字から開始) にします)。この命名規則から外れていると、次のように JSX構文のなかでコンポーネントが適切に認識されません。注意してください。

![img](figs/04/vscode_08.png)

</div>

#### 演習

実際に「WelcomeMessageコンポーネント」を作成して、「Appコンポーネント」のなかに組み込んでください。また、開発モードで実行結果を確認してください。

また、以下の要求を満たすようにプログラムを書き換えてください。

- ウェルカムメッセージに表示される名前を「萱島ウサギ」に変えたい。
- `<WelcomeMessage name="萱島ウサギ" uncompletedCount={6}/>` のように未完了タスクの数をコンポーネントに渡し、「**こんにちは、萱島ウサギさん。現在の未完了タスクは6個です。**」のようにウェルカムメッセージを表示したい。
    - コンポーネントに数値を渡したいときは `uncompletedCount=6` ではなく <span class="masked">`uncompletedCount={6}`</span> のようにしてください。
    - ウェルカムメッセージコンポーネントが `uncompletedCount` を受け取るためには、`WelcomeMessage.tsx` のなかの `Props` の型定義の変更が必要です。
    - 解答例は[こちら<i class="fa-solid fa-person-chalkboard"></i>](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/04/code01.tsx)

### 状態管理

Reactアプリでは **アプリ画面上で変化する値** を <span class="masked">状態(State)</span> という「特別な仕組み」で管理します。この「状態」が更新されると、Reactが**変更を検知**し、**関連するコンポーネントだけ**を自動的に再レンダリング (つまり再描画して値の変更を反映) します。

何らかの値 (例えば「現在のカウント」) を「**状態**」として扱い、その変更に応じて画面を再レンダリングするには、**通常の変数として定義するのでは不十分**であり、<span class="masked">フックス (Hooks) という機能を利用して値を管理 (保持・更新) </span> することが求められます。Reactには、状態管理のために様々な Hooks が用意されていますが、そのなかでも特に基本的な役割を果たすものが `useState` という フック (Hook) になります。

サンプルとして示したアプリでは、**カウント値が更新されたとき**に、それを即座に画面に自動反映させたいので、**第04行目** のように `useState` を使って、カウント値を保持する変数 `count` と、<span class="masked">それを更新するための専用関数 `setCount`</span> を導入しています。なお、`useState` の引数には初期値を与えます (例えば、カウントを「7」から開始したいときは <span class="masked">`const [count, setCount] = useState(7);`</span> とします)。

- `useState(0)` は `useState<number>(0)` のように **扱う値の型を明示して初期化** することも可能です。

そして、現在のカウント値を得たいときは `count` を参照し、更新したいときは `setCount(newCount)` を呼び出すことで、意図するようなカウント動作が実現されます。

```ts{.numberLines caption="src/App.tsx"}
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

ただし、`[F12]` でデベロッパーツールを起動して、コンソールタブからログを確認してみると、**画面上の「カウント値」が更新されないだけ**で、<span class="masked">内部的には変数 `count` は正常に更新されていること</span> が確認できます。

![img](figs/04/app_04.png)

これらのことから「**変更をトリガーに再レンダリングする必要がない値**」については通常の変数として扱い、逆に「**値の変更をトリガーに再レンダリングしたいもの**」は <span class="masked">useState を使って「状態」として扱う</span> 必要があることが分かると思います。

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

また、関数 `countUpN` を削除して[こちら<i class="fa-solid fa-person-chalkboard"></i>](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/04/code03.tsx)のように `onClick` に <span class="masked">直接処理を記述するような実装</span> もあります。

#### 演習

次のように、カウントをリセットするボタンを実装してください。

![img](figs/04/app_06.png)

- 実装例は[こちら<i class="fa-solid fa-person-chalkboard"></i>](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/04/code04.tsx)

## Todoアプリの実装

### 準備: ライブラリのインストール

個々の Todo に ID を設定するため **UUID** (**Universally Unique Identifier**) v4 を生成可能な[uuid](https://www.npmjs.com/package/uuid)というライブラリをインストールします。また、日時の管理を簡単にするために[dayjs](https://www.npmjs.com/package/dayjs)と[date-fns](https://www.npmjs.com/package/date-fns)というライブラリをインストールします。

- [UUID v4 とは](https://www.google.com/search?q=UUID+v4+とは)

VSCodeのターミナルから以下のコマンドを実行してください。

```
npm i uuid dayjs date-fns
```

また、uuid ライブラリは (TypeScriptではなく) JavaScript で書かれており <span class="masked">TypeScriptに必要な型定義を含んでいない</span> ため、それを補う型定義 (`@types/uuid`) を追加でインストールします。なお、この型定義ファイルは **開発だけに必要 (実行時は不要)** なので `-D` オプションを付けてインストールします。

```
npm i -D @types/uuid
```

アイコン用に[Font Awesome](https://fontawesome.com/)を使用したいので、型定義と共にインストールします。Font Awesome $\to$ <i class="fa-solid fa-fish"></i> <i class="fa-solid fa-envelope"></i> <i class="fa-solid fa-key"></i>

```
npm i @fortawesome/react-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons
npm i -D @types/react-fontawesome
```

Tailwind 関連のユーティリティクラス (`font-bold` や `px-4` など) を動的に結合する際に、**スタイリングの衝突を解決してくれる**[tailwind-merge](https://www.npmjs.com/package/tailwind-merge)をインストールします。開発時のみ必要なので `-D` オプションを付けてインストールします。

```
npm i -D tailwind-merge
```

- 参考: [tailwind-mergeとは](https://www.google.com/search?q=tailwind-merge+とは)

### 準備: 初期データの作成

Todoリストの「初期データ」を準備します。まずは、このTodoアプリで共通使用する「**型**」を定義しておくためのファイル `src/types.ts` を作成してください。

- 「`src/types.ts` **を作成せよ**」とは「`src` **フォルダのなかに** `types.ts` **を作成せよ**」という意味です。

作成したファイルに以下のように **Todo型** を定義してください。また <span class="masked">定義した型が、他のファイルで `import` できるように `export` </span> を付けてください。なお、このファイルは、単に型定義をしているだけのファイルなので拡張子は `.tsx` ではなく、`.ts` にします。

```ts{.numberLines caption="src/types.ts"}
export type Todo = {
  id: string;
  name: string;
  isDone: boolean;
  priority: number;
  deadline: Date | null; // 注意
};
```

ここで注意してほしいのは **第06行目** で、プロパティ `deadline` の型を「Date」もしくは「null」に設定している点です ([前回講義の解説](lecture03.html#型と宣言)を参照)。特に「期限を設定しないTodo」については `deadline` を `null` として扱うものとします。

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

Todoリストを表示するための「**TodoListコンポーネント**」を作成します。`src/TodoList.tsx` を作成して、以下の内容を記述してください。ここでは、練習のために**コピペ**ではなく**コードを打ち込んで**ください。[前回講義で紹介](lecture03.html#react開発の支援機能)しているように `ES7+ React/Redux/React-Native snippets` をVSCodeの拡張機能としてインストールしていると、次の図のように `rafce` と打ち込むだけで **アロー関数形式のReactコンポーネントのテンプレート** が得られます。

![img](figs/03/vscode_04.png)

ここで定義する `TodoList` は、Reactの関数コンポーネントなので必ず[パスカルケース](https://www.google.com/search?q=パスカルケースとは)としてください。また、同様に、<span class="masked">ファイルの名前もパスカルケース</span>としてください。

```ts{.numberLines caption="src/TodoList.tsx"}
import React from "react";
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

このコンポーネントは、Todo型の配列 `todos` を **Props (プロップス)** として受け取り、先頭から3件分のTodoの「名前」と「優先度」を表示しています。なお、Reactの文脈において Props とは **Properties の略称**で、<span class="masked">コンポーネントが受け取る「引数」のようなもの</span> と考えてください。

なお、ここでの **第12行目** から **第20行目** のコードは酷いものですが、これは後で書き換えます。

### Appコンポーネントの編集

`src/App.tsx` を次のように編集してください。**第04行目** では[さきほど作成](lecture04.html#reactにおけるコンポーネントとは)したウェルカムメッセージのコンポーネント (`src/WelcomeMessage.tsx`) をインポートしています。同様に **第05行目** では、Todoリストのコンポーネント(`src/TodoList.tsx`) をインポートしています。

また、**第03行目**では、Todoリストの初期データとして `initTodos` をインポートしています。なお、インポートする際に <span class="masked">波括弧 `{ }` をつけてインポートしているケースと、そうでないケースがあること</span> に気づくと思います。これらの理由については生成AIで解決してください。

**(プロンプト例)**

> Node.js 環境で TypeScript の勉強をしています。サンプルコードを見ていると、ライブラリから関数や変数をインポートする際に、波括弧 `{}` を付けているケースと、そうではないケースがあることに気づきました。違いについて教えてください。


```ts{.numberLines caption="src/App.tsx"}
import { useState } from "react";
import type { Todo } from "./types";
import { initTodos } from "./initTodos";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./TodoList";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initTodos);
  const uncompletedCount = initTodos.filter(
    (todo: Todo) => !todo.isDone
  ).length; // 未完了タスクの数え上げ
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

編集後、保存してから **開発モード** でアプリを実行してください (`npm run dev`)。次のような実行結果が得られると思います。さらに、ブラウザで `[F12]` を押下して **デベロッパーツール** を起動してコンソール出力 (**第12行目** で行われている `todos` の出力) も確認してください。

![img](figs/04/app_07.png)

`src/App.tsx` と `src/TodoList.tsx` について、生成AIなどを活用して読解・理解をしてください。特に、しっかりと理解してほしい箇所は次のとおりです。


- `src/App.tsx` の **第08行目** : 現時点では `todos` を変更 (追加・削除) する処理は含んでいませんが、今後、それらの機能を実装したときに `todos` の変更をトリガーに再レンダリングをしたいので `useState` を使って「状態」として扱うようにしています。
    - `useState<Todo[]>(initTodos)` ではなく `useState(initTodos)` のように型推論を利用して初期化が可能です。ただし、初期値を空配列にする場合は、明示的に型を与える必要があります。
- `src/App.tsx` の **第09行目** : ここでは、Todo型オブジェクトの配列から「未完了のタスク数」をカウントしています。前回講義で学んだ**配列**の[filter操作](lecture03.html#オブジェクト配列の-filter-操作)と[lengthプロパティ](lecture03.html#第1形態-レガシーな手続き型スタイル)を活用している例になります。
- `src/App.tsx` の **第23行目** の `<TodoList todos={todos} />` と、`src/TodoList.tsx` で定義している `TodoList` 関数の引数 (Props) が対応している点に注意してください。

### TodoListコンポーネントのブラッシュアップ

現状の `src/TodoList.tsx` は、`todos` の要素数に関わらず <span class="masked">固定で「3件」のTodoしか表示すること</span> ができません。しかも、`todos` の要素数が **2個以下のときは実行時エラー** が生じます (Todoが1個も表示されなくなります)。

そこで、前回講義で学んだ <span class="masked">mapメソッド</span> を利用して、`todos` の要素数にあわせて表示するように変えたいと思います。この mapメソッドを使うテクニックは **Reactでは定番中の定番処理** となるので確実に読解かつ記述できるようにしてください。

```ts{.numberLines caption="src/TodoList.tsx (Before) 再掲"}
import React from "react";
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

上記のプログラムを次のように書き換えます。前回講義の[オブジェクト型の配列に対するmapの適用](lecture03.html#オブジェクト型の配列に対するmapの適用)を参考にしながら、この書き換えを理解してください。

```ts{.numberLines caption="src/TodoList.tsx (After)"}
import React from "react";
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

また、map の戻り値となる**一番外側のJSX要素** (この例では `<div>` 要素) については、**第22行目** のように <span class="masked">必ず `key` 属性を設定してください</span>。`key` の値は <span class="masked">ユニークな値 (配列内の他要素と重複のない一意な値)</span> であれば何であっても問題ありません。例えば、Todoの「**名前 (**`name`**)**」が絶対に重複しないのであれば `<div key={todo.name}>` としても問題ありません。

`key` 属性を設定していないと、実行時に `Each child in a list should have a unique "key" prop` という警告が表示されます。また、再レンダリングに際して意図した動作をしなくなる可能性があります。詳しい原理は生成AIで解決してください。

**(プロンプト例)**

> Reactを使ったウェブアプリを開発しています。配列のmapメソッドを使用してJSXを構成する際、key属性が要求されるのは何故ですか。Reactは何のためにkey属性を必要としますか。

#### 演習

前回講義で学んだように、Todoの並び替えは「配列のsortメソッド」を利用して行なうことができます。例えば、優先度を昇順 (1👉2👉3の順) にしたいときは、**第09行目**の `const todos = props.todos;` を以下のように書き換えます。

```ts
const todos = [...props.todos].sort((a, b) => a.priority - b.priority);
```

前回講義の[複数のソートキーを使ったオブジェクト配列の並び替え](lecture03.html#複数のソートキーを使ったオブジェクト配列の並び替え)を参考にして、**第1ソートキー**を `isDone` (未完了を先に表示)、**第2ソートキー**を `deadline` として並び替えたTodoリストが表示されるようにしてください。

## 演習 (宿題: <i class="fa-solid fa-stopwatch"></i>120分～)

主に `src/TodoList.tsx` の **JSX (HTML)** と **Tailwind CSS** に編集を加えてTodoリストコンポーネントの表示を **自分流にカスタマイズ** してみてください。これは、UI/UXの設計練習も兼ねています。また、後期前半の大課題に関連する内容にもなってきます。

なお、現時点では「チェックボックス」や「ボタン」などの要素追加や、それに対するスタイリングは不要です (これらの内容は次回講義で扱います)。

**(Todoリストのカスタマイズの例)**

![img](figs/04/app_08.png)

- 上記のサンプルのコードは[こちら<i class="fa-solid fa-person-chalkboard"></i>](https://github.com/TakeshiWada1980/Programming3-2026/blob/main/docs/codes/04/code05.tsx)


---

取組みに際しては、生成AIを賢く活用してください (コード生成ツールとして使うのではなく、内容の理解のためのツールとして使用してください)。

**(プロンプト例)**・再掲

> TailwindCSS で、次のようにスタイルが適用されていました。各CSSクラスの意味について解説してください。  
> `<div className="mx-4 md:mx-auto mt-10 max-w-2xl">`

**(プロンプト例)**・再掲

> TailwindCSS でボタンに「ドロップシャドウ」を適用したいです。どのようにすればよいですか。  
> `<button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md">ほげ</button>`






