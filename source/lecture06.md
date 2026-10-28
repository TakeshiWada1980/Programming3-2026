---
var:
  header-title: "2026-3I プログラミング3 第06回 講義資料"
  header-date: "2026年10月30日（金）1時限"
---

# 第06回 3I-プログラミング3

## 連絡

- [課題1](lecture05.html#課題1)<font size=-1>～ ぼくのかんがえたさいきょうのTodoアプリ ～</font> の提出期限は「**11月19日 (木) 18時**」です。
    - **_提出先_** : Teams「**PG3-課題1**」
    - 課題1は、ポートフォリオ (自己紹介と作品集) として作成したページからも **リンクを貼っておくように** してください。
    - その他、ポートフォリオには **今年度の文化祭展示の概要** (スクリーンショットや会場写真があると説得力が高くなります) や、他科目で開発したソフトウエアや修得したスキルなども、(記憶が鮮明なうちに) こまめに追記することを推奨します。    
    - 特に、文化祭展示などは <span class="masked">チームプロジェクトでの開発の経験があること</span> のアピールができるので必ず記載してください。

- 次回の講義で **_小テスト5_** を実施します。主に、今回の講義内容からの出題となります。

### Node.js のセキュリティアップデート

2026年10月21日に、重大な脆弱性を修正する [Node.js のセキュリティアップデート](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases) が公開されました。各自、使用中の系列にあわせて、次のバージョン以上にアップデートしてください。

- Node.js **24 系列**を使用している場合：**24.<u>22.1</u> 以上**
- Node.js **22 系列**を使用している場合：**22.<u>23.4</u> 以上**
- Node.js **26 系列**を使用している場合：**26.<u>12.1</u> 以上**

アップデートの手順は、[第01回の「インストーラのダウンロードと実行」](lecture01.html#インストーラのダウンロードと実行) と同じです。[公式ダウンロードページ](https://nodejs.org/en/download) から、**現在使用している系列の最新版の Windows Installer (.msi)** をダウンロードし、実行してください。

インストール後は VSCode とターミナルを開きなおし、次のコマンドでバージョンを確認してください。

```bash
node -v
```

::: {.balloon .char-01 .face-05 .tone-blue}
先日の [PHP の深刻な脆弱性](https://www.php.net/archive/2026.php#2026-10-21-5) に続き、今回の Node.js の更新にも、条件によっては **攻撃者が外部から任意のプログラムを実行できる脆弱性** の修正が含まれています。

広く使われている言語や実行環境でも、このような深刻な問題が見つかることがあります。利用しているソフトウェアの脆弱性情報にも日頃から関心を持ち、必要なアップデートを適用するようにしてください。
:::

::: prompts

- 2026年10月21日に修正された Node.js の脆弱性 CVE-2026-111497 について、どのような問題で、どのような悪用が起き得るのか、情報系の高専3年生向けに分かりやすく解説してください。
- 2026年10月21日に修正された Node.js の脆弱性 CVE-2026-105483 について、どのような問題で、どのような悪用が起き得るのか、情報系の高専3年生向けに分かりやすく解説してください。

:::

## バックエンド処理を含めたブログアプリの開発

ここまでの授業では、フロントエンドのみで完結する **Todoアプリの開発** を通じて、「React」を使ったモダンウェブ開発の基礎について学んできました。ここからの授業では **_Next.js_** というフレームワークを使用し **バックエンド (サーバサイド) を含めた「本格的なモダンウェブアプリ開発」** について体験的に学んでいきます。

::: {.balloon .char-01 .face-02 .tone-yellow}
現代のウェブアプリは「❶ ウェブブラウザで実行されるフロントエンド部分」と「❷ サーバ上で実行されるバックエンド部分」を **RESTfulなウェブAPI (主にHTTP/HTTPSプロトコル上で実装) を介して「疎結合」な形で構成**することが一般的となっています。

そして、この設計によってフロントエンドとバックエンドで <span class="masked">異なる「プログラミング言語」や「フレームワーク」を使用すること</span> が可能になっています。
:::

**フロントエンドの開発言語** は実質的に <span class="masked">HTML/CSS/JavaScript (TypeScript)</span> に限定されており、**React** や **Vue.js**、**Svelte** などの[コンポーネント指向フレームワーク](https://www.google.com/search?q=コンポーネント指向フレームワーク)が主流となっています。かつて広く使用されていた <span class="masked">jQuery</span> は、これらのモダンフレームワークの登場と普及によって、**新規開発案件での採用は減少傾向** にあります。

一方、**バックエンド**においては、次のような多様な「プログラミング言語」と「フレームワーク」の組み合わせの選択肢があり、実際に幅広く活用されています。

1. \ **Ruby** (Ruby on Rails)
2. \ **PHP** (Laravel)
3. \ **Java** (Spring Boot)
4. \ **Python** (Django、FastAPI、Flask)
5. \ **C#** (.NET ASP Core)
6. \ **Rust** (Actix)
7. \ **Go** (Gin、Echo)
8. \ **JavaScript/TypeScript** (Express、Fastify)

このような状況のなか「**Next.js**」は、TypeScript (JavaScript) を用いて **フロントエンドとバックエンドを単一のプロジェクトとして統合的に開発できるという異色 ( 革新的?! ) のフレームワーク** として人気を集めています。Next.js のフロントエンドは <span class="masked">Reactをベースとしているため (ただしルーティングなどの一部機能を除く)</span>、Todoアプリ開発で学んだ React のスキルと経験をそのまま活かして開発することができます。

今回の授業からは、この **Next.js** を使用して「**ブログアプリ**」の開発に取り組んでいきます（<span class="masked">チュートリアル的に「ブログアプリ」の開発を進めていきます</span>）。最終的には[Supabase](https://supabase.com/)という Baas (Backend As A Service) を活用し、ブログ記事の **CRUD操作** ( Create/Read/Update/Delete )、**ログイン機能 (ユーザ認証機能)** までを実装していきます。

ブログアプリの完成後は、**_最終課題_** として「**オリジナルのウェブアプリを開発**」に取り組んでもらいます。

大まかな流れは、次のようになっています。

1. Next.js 開発環境の構築 **← 今回の授業**
2. ブログアプリの「**フロントエンド開発**」のチュートリアル **← 今回の授業**
    - [microCMS](https://microcms.io/) の利用
3. ブログアプリの「**バックエンド開発**」のチュートリアル
    - [supabase](https://supabase.com/) と [varcel](https://vercel.com/) の利用
4. ブログアプリのカスタマイズとつくり込み → **_課題2_**
5. オリジナルのウェブアプリ → **_課題3_** (最終課題)

![img](https://takeshiwada1980.github.io/Programming3-2024/figs/07/app_03.png)

![img](https://takeshiwada1980.github.io/Programming3-2024/figs/09/app_01.png)

![img](https://takeshiwada1980.github.io/Programming3-2024/figs/10/app_02.png)

#### 定着確認

- Next.js がフレームワークとしてカバーする範囲は「フロントエンド」、「バックエンド」、「フロントエンドとバックエンドの両方」のどれか。
    - 答え: <span class="masked">フロントエンドとバックエンドの両方</span>
- Typescript (JavaScript) 以外で、バックエンド開発に使用される (代表的な) プログラミング言語とフレームワークの組み合わせを2組答えよ。
- DBと連携するウェブアプリ開発の文脈で「CRUD操作」の各文字は何の略語か答えよ。
    - 答え: <span class="masked">Create/Read/Update/Delete</span>
- RESTful APIにおいて採用される代表的な通信プロトコルを挙げよ。
    - 答え: <span class="masked">HTTP/HTTPS。その他、CoAP や WSS などが採用されることがある。</span>
- jQuery は、フロントエンド用のライブラリか、バックエンド用のライブラリか答えよ。
    - 答え: <span class="masked">フロントエンド用のライブラリ</span>

## Next.js の 開発環境構築

本授業では **Next.js 16** を使用し、**Cache Components は無効**にして開発を進めます。

以下、プロジェクト名称を `next-blog-app` として、**Next.js 16.4.3 の開発環境**を構築していきます。

ターミナル (PowerShell) を起動し、**プロジェクトフォルダを作成したい位置** (例えば `C:\Users\xxxx\Documents\` など。ただし、OneDrive同期が適用されていないフォルダ) に移動してください。Next.js の開発環境は、次のコマンドを使って構築していきます。

```bash
npx create-next-app@16.4.3
```

ここで <span class="masked">`npm` ではなく `npx`</span> とする点に注意してください (違いが気になる人は生成AIで解決してください)。今回は、使用するバージョンをそろえるため、`@16.4.3` を指定しています。

**(プロンプト例)**

> Node.js における `npm` と `npx` の違いを初心者向けに分かりやすく解説してください。

\ 


はじめて `npx create-next-app` を実行するときや、時間を空けて実行するときは、以下のように訊かれるので `y` で回答してください。

```
PS C:\Users\xxxx\Documents> npx create-next-app@16.4.3
Need to install the following packages:
create-next-app@16.4.3
Ok to proceed? (y)
```

`create-next-app` では、開発環境に関していくつかの質問がされます。ここでは、以下のように回答 (設定) してください。ここで誤った設定をしてしまうと、**あとからの修正が大変になるため、慎重に設定してください**。

>√ What is your project named? ... **next-blog-app**  
√ Would you like to use the recommended Next.js defaults? » **No, customize settings**  
√ Would you like to use TypeScript? ... No / **Yes**  
√ Which linter would you like to use? » **ESLint**  
√ Would you like to use React Compiler? ... **No** / Yes  
√ Would you like to use Tailwind CSS? ... No / **Yes**  
√ Would you like your code inside a `src/` directory? ... No / **Yes**  
√ Would you like to use App Router? (recommended) ... No / **Yes**  
√ Would you like to use Cache Components? ... **No** / Yes  
√ Would you like to customize the import alias (`@/*` by default)? » No / **Yes** <font color="deeppink"><b>※</b></font>  
√ What import alias would you like configured? ... @/*  
√ Would you like to include AGENTS.md to guide coding agents to write up-to-date Next.js code? ... **No** / Yes  
√ Would you like to help improve Next.js by letting agents prepare anonymized feedback for your review as you code? (Disable anytime with `experimental.agentFeedback: false`.) ... **No** / Yes

<font color="deeppink"><b>※</b></font>「**What import alias would you like configured?**」では、そのまま `Enter` を押下すれば、上記のように ` @/*` が設定されます。全ての質問に答えると各種パッケージのダウンロードとインストールを含めた環境構築が開始されます (しばらく時間がかかります)。

最終的に以下のように `Success! Created next-blog-app` というログが表示されれば成功です。

```
Success! Created next-blog-app at C:\Users\xxxx\Documents\next-blog-app
```

::: {.balloon .char-01 .face-01 .tone-pink}
**設定を間違えてしまったとき**は、エクスプローラから当該フォルダ ( `next-blog-app` ) を完全削除してから、再度 `npx create-next-app@16.4.3` を実行してください。
:::

#### 定着確認

- Next.js 16.4.3 を使った開発環境 (の雛形) を構築するためのコマンドを答えよ。
    - 答え: <span class="masked">npx create-next-app@16.4.3</span>
- 本授業で採用する Next.js のメジャーバージョンを答えよ。
    - 答え: <span class="masked">16</span>
    
### VSCodeの起動

作成されたプロジェクトフォルダ (next-blog-app) に移動して VSCode を起動してください。

```bash
cd next-blog-app
code .
```

`[Ctrl]+[J]` で VSCode のターミナルを開き、第04回と同じ TypeScript 6.0 系列と Tailwind CSS のバージョンにそろえてください。

```bash
npm i -D --save-prefix="~" typescript@~6.0.3
```

```bash
npm i -D @types/node
```

```bash
npm i -D --save-exact tailwindcss@4.3.3 @tailwindcss/turbopack@4.3.3
```

以上が完了した段階で、プロジェクトフォルダは、以下のような構成になっているはずです。

![img](figs/06/vscode_01.png)

プロジェクトフォルダに作成されたファイルについて簡単に確認しておきます。詳細について、生成 AI などを利用して掘り下げてください。

### .gitignore

**Gitによるバージョン管理をしないファイルやフォルダ** (＝GitHubにプッシュしないファイルやフォルダ) を設定するファイルです。ライブラリをインストールする `/node_modules` フォルダなどが除外設定として記入されています。

このプロジェクトでは、`.env` という**環境変数の設定ファイル** (= <span class="masked">あとで「microCMSのAPIキー」や「supabseのDB接続文字列」を記述する予定のファイル</span>) もバージョン管理から除外したいので、次の記載があることを確認しておいてください。

```txt{.numberLines caption=".gitignore (抜粋)" startFrom=33}
# env files (can opt-in for committing if needed)
.env*
```

- `.env*` により **.env** や **.env.local** などのファイルがGit管理から除外されます。

### eslint.config.mjs 

`eslint.config.mjs` は、**ESLint** ( [前回講義で解説済み](lecture04.html#eslintのカスタマイズ) ) のための設定ファイルとなります。

### next-env.d.ts

TypeScript が **Next.js** の「組み込み機能」や「型」を認識するためのグローバル型宣言ファイルです。ファイルに書かれているように <span class="masked">This file should not be edited (＝このファイルは編集してはいけません)</span>。

### next.config.ts

`next.config.ts` では <span class="masked">外部ドメインからの画像読み込みの制御</span> に関する設定などを記述します。必要に応じて設定を追加したり、書き換えたりする必要があります。

ここで、以下のように **next.config.ts** の **第04行目** に `cacheComponents: false,` を記入し、**Cache Components** が **_無効_** になるように設定してください。

```ts{.numberLines caption="next.config.ts"}
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
```

- 環境構築時に Cache Components を「No」にしているため既に無効ですが、本授業の方針を明示するために記述しておきます。

::: {.balloon .char-01 .face-02 .tone-yellow}
Cache Components は、キャッシュや画面の描画処理を最適化するための機能ですが、使いこなすには追加の知識が必要です。本授業では、この機能をいったん無効にし、まずは Next.js を使った基本的・基礎的な Next.js アプリ開発に集中します。
:::


:::prompts 
- 私は React の初学者です。Next.js 16 で開発するにあたり、先生から「まずは Cache Components は無効化して、Next.js を用いた開発についての基礎固めをしたほうがいい」とアドバイスを受けました。単にバックエンドの処理結果をキャッシュして高速化するだけの話ではないのですか？なにか難しい要素があるのですか？
:::


### package-lock.json と package.json

これらのファイルについては、既に [解説済み](lecture01.html#開発を効率的に行なうためのパッケージの追加) です。`"dependencies"` の項目を確認すると、内部で <span class="masked">React 19</span> を使用していることが確認できます。

**package.json** の `"scripts"` には、以下のように `dev`、`build`、`start`、`lint` の 4 つのコマンドが適宜されています。それぞれのコマンドの役割について確認していきます。

```json{.numberLines caption="package.json (抜粋)" startFrom="5"}
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
},
```

#### 💻 npm run dev

「**ホットリロード**」や「**エラー表示**」の機能を提供する **開発サーバ** でアプリを起動します。デフォルトでは3000番ポートで起動します。実行すると `.next/dev` にビルドファイルが出力されます。

- このフォルダは `.gitignore` のなかでバージョン管理の**対象外**に設定されています。

VSCodeのターミナル (`Ctrl`+`J`で起動) から実際に以下のコマンドを実行してみてください。

```bash
npm run dev
```

起動したサーバは `http://localhost:3000/` でアクセス可能です。

![img](figs/06/app_01.png)

上記のようなトップページが表示されることを確認してください。画面上の「To get started, edit the page.tsx file.」は「<span class="masked">まずは page.tsx を編集することから始めましょう</span>」という意味です。

開発モードでの起動が確認できたら、VSCode のターミナルから `Ctrl+C` を入力して停止しておいてください。

<div class="note type-tips">
**アプリの挙動がおかしいときは...**

レアケースですが、`npm run dev` で立ち上げたアプリの挙動がおかしいときは **.next** フォルダを一旦削除することで解決することがあります。今後の開発で行き詰まったときには試してみてください。

</div>

#### 💻 npm run build

開発中に使用する `npm run dev` とは異なり、`npm run build` は、アプリを **本番環境 (プロダクション環境) で動作させるためにビルド** するコマンドです。

::: {.balloon .char-01 .face-05 .tone-blue}
ビルドでは、コードの「最適化」「バンドル」「ミニファイ化」などが行われ、その結果が `.next` フォルダに出力されます。なお、このコマンドでは、「ビルド」するだけでサーバは起動しません。
:::

実際に以下のコマンドを実行してみてください。

```bash
npm run build
```

本番環境にアプリをデプロイする際には、こうしたビルド処理が必要となります。ビルド処理の詳細 (最適化、バンドル、ミニファイ化の概要) については、生成AIを活用して概要を把握してください。

:::prompts
- Node.js + TypeScript 環境でのウェブアプリ開発において、ビルド時に行われる「最適化」「バンドル」「ミニファイ化」とは、それぞれどのような処理ですか。
:::

#### 💻 npm run start

ビルドされた **本番環境 (プロダクション環境) 向けのアプリを起動** します。開発用サーバと同様に、デフォルトではポート番号 `3000` で起動します。なお、`run` を省略して `npm start` としても実行できます。

実際に以下のコマンドを実行してみてください。

```bash
npm run start
```

アプリが起動したことを確認できたら、ターミナルで `Ctrl + C` を押してサーバを停止してください。

#### 💻 npm run lint

ESLint を使って **ソースコードの静的解析 (コード品質チェック)** を実行します。プログラムを実行することなく、コードの記述方法や潜在的な問題をチェックできます。

実際に以下のコマンドを実行してみてください (環境によっては数分かかることもあります)。

```bash
npm run lint
```

- エラーや警告が表示されなければ、設定されたルールの範囲では問題が検出されなかったことになります。

[第03回講義](lecture03.html#コードチェックツールの拡張機能) のなかで紹介した VSCode の **ESLint** 拡張機能を利用すれば、コマンドを実行しなくても、コードの編集中に「警告」や「エラー」を確認できます。

![img](figs/06/vscode_02.png)

::: {.balloon .char-01 .face-04 .tone-blue}
ただし、Next.js 16 では `npm run build` を実行しても **Lint は自動実行されません**。

ビルドが成功してもコード品質に問題がないとは限らないため、`npm run lint` でもチェックするようにしてください。
:::

以降の解説は、ESLint の拡張機能がインストールされ、有効化されていることを前提とします。

#### 定着確認

- 標準設定で Next.js 16 をセットアップした場合、内部的に利用される React のメジャーバージョンを答えよ。
  - **答え** : <span class="masked">19</span>
- ウェブアプリケーションを開発する際、実際のユーザーにサービスを提供するための本番環境を何というか。**答え** : <span class="masked">②</span>
  - ① ランタイム環境 (Runtime Environment)
  - ② プロダクション環境 (Production Environment)
  - ③ ステージング環境 (Staging Environment)
  - ④ コンテナ環境 (Container Environment)

### Tailwind CSS の設定

現在のプロジェクトでは、**next.config.ts** の `turbopack.rules` に設定された `@tailwindcss/turbopack` によって、Tailwind CSS のスタイルが処理されます。

また、**src/app/globals.css** では、Tailwind CSS の読み込みに加えて、アプリ全体に適用するスタイルを定義できます。

### README.md

就職活動やインターンシップに向けてウェブアプリをポートフォリオとして公開する場合、`README.md` は **<u>作品の概要や技術的な特徴、開発で工夫した点などを採用担当者に伝える重要な資料</u>** となります。そのため、単なる操作説明ではなく、読み手を意識して内容を整理することが大切です。

:::prompts

- 就職活動やインターンシップで技術力をアピールするために、開発したウェブアプリを GitHub で公開する予定です。採用担当者が README.md を読むことを想定して、どのような構成や内容にすると効果的でしょうか。各項目の目的も含めて解説してください。
- ポートフォリオの README.md において、採用担当者からの評価を下げる可能性がある記述や構成には、どのようなものがありますか。具体的な悪い例と、その改善方法を示してください。
:::

### tsconfig.json

**TypeScript のコンパイラや型チェックの動作を制御する設定ファイル** です。

Next.js では、TypeScript を利用するための基本的な設定が自動的に用意されます。通常は変更する必要はありませんが、型チェックの厳格さやファイルの参照方法などを調整したい場合に編集します。

### src/app フォルダ

Next.js では、基本的に `src/app` フォルダ内にファイルやフォルダを配置することで、アプリのコンテンツを構成していきます。この際、<span class="masked">ファイルの「名前」や「配置場所（階層構造）」に応じて、その役割や機能が決まる点</span> に特徴があります。このような設計思想は、**設定より規約** (Convention over Configuration：CoC) と呼ばれるアプローチに基づいています。

::: {.balloon .char-01 .face-02 .tone-yellow}
Next.js における **「設定より規約」** の代表的な例が URLルーティング です。ルーティングとは、**URLのパス**（例えば `/posts/1` や `/about` ）に応じて、<span class="masked">「どのコンテンツを表示するか」を決定する仕組み</span> を指します。
:::

#### Next.js のルーティング

Next.js ( バージョン13から導入された AppRouter ) では、`src/app` のなかに**規約に従った名前でファイルを配置** (基本的には `layout.tsx` もしくは `page.tsx`)、**フォルダ階層を構成**することで (自動的に) ルーティングが設定され、**フォルダ構成がそのままURLのパス**となります。

例えば、次のようにプロジェクトフォルダを構成すると...

```
📂 src/app/
├─ page.tsx    # / のコンテンツを定義
├─ layout.tsx  # 全てのページで共有されるレイアウトを定義
└─ 📂 foo/
    └─ page.tsx  # /foo のコンテンツを定義
```

次のようなルーティングルールが自動的に適用されます。

- http://xxxx:3000**/** をリクエストしたときは、`src/app/layout.tsx` にラップされた `src/app/page.tsx` のコンテンツが表示されます。
- http://xxxx:3000**/foo** をリクエストしたときは、`src/app/layout.tsx` にラップされた `src/app/foo/page.tsx` のコンテンツが表示されます。

また、`layout.tsx` は **入れ子構造** で適用され、親から子に順番にレイアウトが重ねられていきます。例えば、次のようにプロジェクトフォルダを構成して http://xxxx:3000**/bar/baz** をリクエストすると、、、

```
📂 src/app/
├─ page.tsx
├─ layout.tsx  # 全てのページで共有されるレイアウトを定義
└─ 📂 bar/
    ├─ page.tsx
    ├─ layout.tsx  # /bar 階層下のページで共有されるレイアウトを定義
    └─ 📂 baz/
        └─ page.tsx  # /bar/baz のコンテンツを定義
```

次のように複数の `layout.tsx` が順番に適用されます。

1. `src/app/layout.tsx` のなかに、
2. `src/app/bar/layout.tsx` が配置され、
3. そのなか `src/app/bar/baz/page.tsx` のコンテンツが表示されます。

![img](figs/06/fig_01.png)

以上のように複数の `layout.tsx` が上位から順にネストされ、最終的に `page.tsx` のコンテンツが描画されます。

<div class="note type-tips">
**Flask のURLルーティング**

前期の **知能情報実験実習1** で実装したように Python の Flask では、`@app.route()` デコレータを使って URLパスごとにコンテンツを生成してレスポンスする関数 (処理) を割りあてました。/bar と /bar/baz は別々の関数 (`@app.route('/bar')` と `@app.route('/bar/baz')`) で処理され、親子関係のような構造は自動的には構築されませんでした。つまり、URL構造と、プロジェクトフォルダの構造は必ずしも対応していませんでした。
</div>

<div class="note type-caution">
**App Router と Pages Router**

Next.js のバージョン「12」以前では「**Pages Router**」というルーティングシステムが採用されていました。現在の Next.js 16 では、2022年10月のバージョン13.0で導入され、2023年5月の13.4で安定版となった「**App Router**」という **新しいルーティングシステムの利用が推奨** されています。

ただし、ウェブ上の記事や生成AIの回答では、**まだ Pages Router を前提とした情報が多く見られます**。ウェブ検索や生成AIを利用する場合は、この点に留意してください。特に、生成AIでは <span class="masked">「Next.js 16 + TypeScript + App Router を使用し、Cache Components は無効にしています。」</span> のような文をプロンプトに含めるようにしてください。
</div>


#### 定着確認

- アプリケーションの振る舞いを細かく設定ファイルで指定するのではなく、フレームワークが想定する命名規則や配置ルールに従うことで、設定コードを書く手間を省くプログラミングパラダイムのことを何というか。「XXX よりYYY」もしくは「XXX over YYY」の形式で答えよ。
    - 答え: <span class="masked">設定より規約。Convention over Configuration。</span> 

- Next.js 16 で使用可能な2つのルーティングシステムを答えよ。また、現在、使用が推奨されているルーティングシステムはどちらか。
    - 答え: <span class="masked">「Pages Router」と「App Router」。現在推奨されているのは「App Router」</span> 

- Next.js で TypeScript および App Router を採用したプロジェクトにおいて、`/about` というURLパスにアクセスしたときに表示される画面 (UI) を作成したい。このために `src/app/about` フォルダに作成すべきファイル名を拡張子を含めて答えよ (大文字と小文字を明確に区別すること)。
    - 答え: <span class="masked">`page.tsx`</span> 

## 最小構成の Next.js アプリ

まずは、最低限必要なファイルだけで、**最もシンプルにアプリを構成**していきます。プロジェクトフォルダの `src/app` に対して、以下の作業を行なってください。

### globals.css の編集

globals.css を次のように編集してください (先頭の1行を残して以降の内容を全て削除)。ファイルの編集後は忘れずに保存操作をしてください、以下同様。

```css{.numberLines caption="globals.css"}
@import "tailwindcss";
```

### page.tsx の編集

`page.tsx` を次のように書き換えてください。

```ts{.numberLines caption="page.tsx"}
"use client";

const Page: React.FC = () => {
  return (
    <main>
      <div className="font-bold text-2xl">Main</div>
    </main>
  );
};

export default Page;
```

つづいて `npm run dev` を実行して結果を確認してください。以下のような表示になると思います。

![img](figs/06/app_1_01.png)

Next.js において、**第01行目** の `"use client";` は重要な意味を持ちます。この講義では、インタラクティヴなウェブアプリを作成するため、**原則として全てのTSXファイル**（ ただし <span class="masked">`src/app/layout.tsx`</span> を除く）**の先頭には、この宣言を入れてください**。これにより、その関数コンポーネントで **Reactの状態管理**（ useState や useEffect などの ReactHooks）が使用できるようになります。

**第03行目** の `Page` は、アロー関数形式で記述した **Reactの関数コンポーネント** です。JSX (JavaScript XML) が戻り値になっていることを確認してください。なお、型 `React.FC` の FCは <span class="masked">Function Component (関数コンポーネント)</span> の略になります。

関数コンポーネントの名前は自由に設定できますが、**先頭を大文字にしてパスカルケースで命名**する必要があります (例えば `page` のように先頭を小文字にすると予期せぬトラブルの原因となります)。また、`page.tsx` に記述する関数コンポーネントには、**第11行目**のように必ず `export default` キーワードを付けてデフォルトエクスポートに設定してください。

なお、型推論が働くので、**第03行目**の `React.FC` は省略も可能であり、さらに **function形式** にすれば `export default` を定義部に直接的に記述可能なので、次のように書くこともできます。ただし、<span class="masked">どちらの形式で書かれていても読解できるようになっておいてください</span>。

```ts{.numberLines caption="page.tsx (型省略、デフォルトエクスポートのキーワードを移動)"}
"use client";

export default function Page() {
  return (
    <main>
      <div className="font-bold text-2xl">Main</div>
    </main>
  );
}
```

次項で説明しますが、同じ階層 (フォルダ内) に `layout.tsx` と `page.tsx` が存在するときは、`layout.tsx` のなかの `{children}` に `page.tsx` が埋め込まれてレンダリングされます。

#### 定着確認

「リスト1」は、Next.js のプロジェクトに配置したファイルである。以下の問いに答えよ。

- 「リスト1」に示すプログラムにおいて、関数 `Page` のなかで useState や useEffect などの ReactHooks を使用したい。このとき、**第01行目** に記述すべき文を答えよ。
    - 答え: <span class="masked">`"use client";`</span>
- 「リスト1」に示すプログラムにおいて、関数 `Page` をデフォルトエクスポートしたい。このとき、**第09行目** に記述すべき文を答えよ。
    - 答え: <span class="masked">`export default Page;`</span>

```ts{.numberLines caption="リスト1"}

const Page: React.FC = () => {
  return (
    <main>
      <div className="font-bold text-2xl">Main</div>
    </main>
  );
};
 
```

### layout.tsx の編集

**Next.js** において `src/app/layout.tsx` は <span class="masked">アプリのレイアウトに関するエントリーポイント (最初に読み込まれてDOMツリーを構築する基点となるファイル)</span> という位置づけになります。そして、このファイルには、アプリ全体のHTML構造を定義した関数コンポーネントを記述します。

この `layout.tsx` は、先ほどの `page.tsx` と同様に任意の名前の **関数コンポーネント** Page: React.FC = () => {を記述可能ですが、次の条件を満たす必要があります。

1. `export default` を付与して**デフォルトエクスポート**に設定すること (**第27行目**)。
2. Prosp として `children` プロパティが受け取れること (**第13行目**)。
3. `"use client";` を**記述しない**こと。
    - ただし `src/app` 直下以外に配置する `layout.tsx` には `"use client";` を記述してください。

以上を満たすように `layout.tsx` を次のように書き換えてください。

```ts{.numberLines caption="layout.tsx"}
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextBlogApp",
  description: "Built to learn Next.js and modern web development.",
};

type Props = {
  children: React.ReactNode;
};

const RootLayout: React.FC<Props> = (props) => {
  const { children } = props;
  return (
    <html lang="ja">
      <body>
        <header>
          <div className="bg-slate-800 text-white font-bold py-2">Header</div>
        </header>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
```

Prosp として受け取る `children` には <span class="masked">URLのパスに応じて取得されるReact関数コンポーネント</span> が代入されます。例えば、`http://xxxx/foo` をリクエストしたときには、プロジェクトフォルダの `src/app/foo/page.tsx` のなかでデフォルトエクスポートされる関数コンポーネントが `children` に読み込まれます。

**第04行目** から **第07行目** で設定した内容は、最終的にレンダリングされるHTMLの `<head>...</head>` に反映されます。

![img](figs/06/app_03.png)


### 動作確認

`src/app` は、次のようなファイル構成となるはずです。

![img](figs/06/vscode_03.png)


`npm run dev` で開発モードでアプリを起動して `http://localhost:3000/` にアクセスしてください。次のような画面が表示されるはずです。

![img](figs/06/app_02.png)

### Tailwind CSS 関連のLint設定

Tailwind の**ユーティリティクラスの自動並べ替えを行なうための設定**を行ないます。基本的には [React開発環境で設定した内容](lecture04.html#tailwind-css-の適用) と同じです。

VSCodeの拡張機能としての Prettier (識別子:`esbenp.prettier-vscode`) とESLint (識別子:`dbaeumer.vscode-eslint`) はあらかじめインストールされているものとします。

VSCode でターミナルを起動し、次のように「prettier」と「prettier-plugin-tailwindcss」を開発用のパッケージとしてインストールします。

```bash
npm i -D --save-exact prettier@3.9.10 prettier-plugin-tailwindcss@0.8.1
```

つづいて `eslint.config.mjs` を次のように変更し (**第08行目** から **第13行目** の内容を追記し)、未使用変数についてのルールを追加設定してください。

```ts{.numberLines caption="eslint.config.mjs"}
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

さらに、**プロジェクトフォルダの「直下」**に `.vscode` フォルダを作成して、そのなかに `settings.json` を作成して次の内容を記述してください。

```json{.numberLines caption=".vscode/settings.json"}
{
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.formatOnType": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "css.lint.unknownAtRules": "ignore"
}
```

設定ファイル名は `setting.json` ではなく `settings.json` なので注意してください。

![img](figs/06/vscode_08.png)


さらに、ルートフォルダの直下に `.prettierrc` を新規作成して、以下の内容を貼り付けて保存してください。

```json{.numberLines caption=".prettierrc"}
{
  "semi": true,
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindStylesheet": "./src/app/globals.css",
  "tailwindFunctions": ["twMerge"]
}
```

![img](figs/06/vscode_09.png)

以上で設定は完了します。`src/app/page.tsx` を開き、その状態で保存操作をすると Tailwind 関連のCSSクラス (ユーティリティクラス) の自動並び替え (`font-bold text-2xl` 👉 `text-2xl font-bold`) が実行されます。

`src/app/layout.tsx` についても、ファイルを開いて再保存すると並べ替えが実行されます。

## ヘッダのコンポーネント化

Next.jsでは **再利用性** や **保守性** を高めるために、コードの「**コンポーネント化**」が推奨されています。コンポーネント化とは <span class="masked">UIやロジックの共通部分を再利用可能な小さなパーツとして切り出すこと</span> を意味します。

ここでは例として、`src/app/layout.ts` の **第18行目** から **第20行目** に記述している **ヘッダ部** を、「Header」というコンポーネントに切り出して別ファイルで管理</span> する手順を説明します。

```ts{.numberLines caption="src/app/layout.tsx (抜粋)" startFrom="13"}
const RootLayout: React.FC<Props> = (props) => {
  const { children } = props;
  return (
    <html lang="ja">
      <body>
        <header> {/* ここから */}
          <div className="bg-slate-800 py-2 font-bold text-white">Header</div>
        </header> {/* ここまでをHeaderコンポーネント化する */}
        <div>{children}</div>
      </body>
    </html>
  );
};
```

まずは `src/app` に `_components` というフォルダを作成して、そこに `Header.tsx` を新規作成してください。

ここでは、フォルダ名の先頭に必ず **アンダーバー** `_` をつけるようにしてください。もし、`components` とすると、それは `http://localhost:3000/components` のようなルーティングの対象として機能してしまいます。一方で、**先頭にアンダーバーをつけるとルーティングの対象外**となり、純粋にコンポーネント用のフォルダとして扱われるようになります。

![img](figs/06/vscode_04.png)

つづいて `Header.tsx` に以下のように `Header` という関数コンポーネントを記述して保存してください。なお、慣例的に <span class="masked">Reactの関数コンポーネントを記述するファイル名は、先頭を大文字にしたパスカルケース</span> (例えば `Header.tsx` や `Button.tsx` など) で名前を付けます。ただし、Next.js の特別なファイルである `page.tsx` と `layout.tsx` は例外的に先頭を小文字にします。

```ts{.numberLines caption="src/app/_components/Header.tsx"}
"use client";

const Header: React.FC = () => {
  return (
    <header>
      <div className="bg-slate-800 py-2 font-bold text-white">Header</div>
    </header>
  );
};

export default Header;
```

次に  `src/app/layout.tsx` を次のように書き換えてください。**第03行目** と **第19行目** が書き換えられた部分になります。

```ts{.numberLines caption="src/app/layout.tsx"}
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/_components/Header";

export const metadata: Metadata = {
  title: "NextBlogApp",
  description: "Built to learn Next.js and modern web development.",
};

type Props = {
  children: React.ReactNode;
};

const RootLayout: React.FC<Props> = (props) => {
  const { children } = props;
  return (
    <html lang="ja">
      <body>
        <Header />
        <div>{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
```

**第03行目** では `src/app/_components/Header.tsx` で定義している Header コンポーネントをインポートしています。パスの先頭を `@` にすると `src` を起点とした <span class="masked">絶対パス</span> でファイル位置の指定が可能になります。これは、Next.js の環境構築で以下のように設定しているためです。

>√ Would you like to customize the default import alias (@/*)? ... No / **Yes**  
√ What import alias would you like configured? ... ** @/* **

なお、`import Header from "./_components/Header"` のように**相対パス**でも指定が可能です。プロジェクトフォルダが複雑になってくるほど、絶対パスで指定できることのメリットが大きくなります。

以上のようにインポートしたHeaderコンポーネントを、**第19行目** において `<Header />` のような自己完結タグで配置しています。これは `<Header></Header>` のように記述することもできます。

開発モードでブログアプリを実行して (`npm run dev`を実行して)、ヘッダ部をコンポーネント化する前と同様にアプリが表示されること確認してください。

![img](figs/06/app_02.png)

### FontAwesome の利用

Next.js で[FontAwesome](https://fontawesome.com/icons/categories)の各種アイコンを使用する場合は少し注意が必要になってきます。

まずは、同様にパッケージをインストールしてください。

```
npm i --save-exact @fortawesome/react-fontawesome@3.5.0 @fortawesome/fontawesome-svg-core@7.3.1
npm i --save-exact @fortawesome/free-solid-svg-icons@7.3.1
```

また、`src/app/layout.tsx` を以下のように編集します (**第04行目**から**第06行目**の内容を記述してください。この部分が Next.js 固有の注意点になります。

```ts{.numberLines caption="src/app/layout.tsx (抜粋)"}
import type { Metadata } from "next";
import "./globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import Header from "@/app/_components/Header";

export const metadata: Metadata = { ...
// 以下、略
```

つづいて、実際にアイコンを使いたいコンポーネントでの処理になります。ここでは、Headerコンポーネントに[サカナのアイコン](https://fontawesome.com/icons/fish?f=classic&s=solid)(<i class="fa-solid fa-fish"></i>) を追加していきたいと思います。

`src/app/_components/Header.tsx` を次のように書き換えてください。**第03行目** と **第09行目** が編集部分になります。

```ts{.numberLines caption="src/app/_components/Header.tsx"}
"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFish } from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  return (
    <header>
      <div className="bg-slate-800 py-2 font-bold text-white">
        <FontAwesomeIcon icon={faFish} className="mr-1" />
        Header
      </div>
    </header>
  );
};

export default Header;
```

各ファイルが保存されていることを確認して、アプリを実行して表示を確認してください。次のようにヘッダに**<i class="fa-solid fa-fish"></i>なアイコン**がついているはずです。

![img](figs/06/app_04.png)

なお、`layout.tsx` に追加した3行をコメントアウトすると (リロードしたときに) 表示が乱れることも確認してください。

#### 演習

- `Header.tsx` の **第09行目** の `faFish` を、`faSkull` に変更してください。その他、FontAwesome の任意のフリーアイコン (CLASSIC) に変更してみてください。
    - 使用するアイコンは `import` 文にも追加してください。

### インジゲータの表示/非表示の切り替え

現在、開発サーバで起動すると画面左下に、デバッグ支援のインジゲータが表示されるようになっています。クリックすると、そこから各種情報が確認できます。

![img](figs/06/app_11.png)

このインジゲータを開発サーバでも「非表示」にしたいときは、`next.config.ts` を以下のように設定してください (**第05行目**に設定を追加しています)。

```ts{.numberLines caption="next.config.ts"}
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: false,
  devIndicators: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
```

### レイアウトの調整

現状では、左端に余白がなくレスポンシブデザインにもなっていないので、ここでレイアウトについての大まかな調整していきます。次の図のようなレイアウトになるように設定していきます。

![img](figs/06/app_05.png)

まずは、ReactによるTodoアプリ開発でも使用した「tailwind-merge」をインストールしてください。

```
npm i --save-exact tailwind-merge@3.7.0
```

次に `src/app/_components/Header.tsx` を次のように編集してください。**第19行目** の「Header」の文字列は「**XXX's Tech Notes**」や「**XXXのブログ**」のように適当に書き換えてください。

```ts{.numberLines caption="src/app/_components/Header.tsx"}
"use client";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFish } from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  return (
    <header>
      <div className="bg-slate-800 py-2">
        <div
          className={twMerge(
            "mx-4 max-w-2xl md:mx-auto",
            "flex items-center justify-between",
            "text-lg font-bold text-white"
          )}
        >
          <div>
            <FontAwesomeIcon icon={faFish} className="mr-1" />
            Header
          </div>
          <div>About</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
```

上記は、主に **第09行目** から **第16行目** に編集を加えています。ここでは解説と可読性・保守性の都合で `twMerge` を使ってクラスを3分割して記述していますが、実際には `twMerge` を使わずに `className="..."` として全てのクラスを列挙可能です。

まず、**第12行目** は、`max-w-2x` によって <span class="masked">div要素の最大幅</span> を 2xl (=672px) に設定しています。また、`mx-4` によって **X方向 (左右) のマージン** を 16px に設定しています。また、`md:mx-auto` によって画面幅が md (=768px) を超えるときに左右のマージンを自動に設定して、要素を水平方向に中央揃えにするようにしています。

**第13行目** は「<i class="fa-solid fa-fish"></i> Header」と「About」を **左右の両端揃え** かつ **上下中央揃え** にするための設定になります。

**第14行目** は「<i class="fa-solid fa-fish"></i> Header」と「About」の **フォントスタイルに関する設定** になります。

Tailwind CSS のクラスの詳細については、生成AIを利用して学んでください。

**(プロンプト例)**

> Tailwind CSS を使用している環境で、div要素に "flex items-center justify-between" というクラスが設定されていました。これらのクラスはどのようなレイアウト設定か解説してください。 

---

次に `src/app/layout.tsx` を次のように編集してください。

```ts{.numberLines caption="src/app/layout.tsx (抜粋)" startFrom=19}
const RootLayout: React.FC<Props> = (props) => {
  const { children } = props;
  return (
    <html lang="ja">
      <body>
        <Header />
        <div className="mx-4 mt-2 max-w-2xl md:mx-auto">{children}</div>
      </body>
    </html>
  );
};
```

開発モードでブログアプリを実行して、次のようなレイアウトになっていることを確認してください。

![img](figs/06/app_05.png)

また、Chrome のウィンドウ幅を変えたり、デベロッパーツールから、モバイル表示に切り替えてレイアウトのレスポンシブ対応を確認してください。

![img](figs/06/app_06.png)

#### 演習 (<i class="fa-solid fa-stopwatch"></i> 10分) 

`Header.tsx` を次のように変更すると、どのようにレンダリングされるか確認してください。

**(変更前)**

```ts{.numberLines caption="src/app/_components/Header.tsx (抜粋・変更前)" startFrom="17"}
<div>
  <FontAwesomeIcon icon={faFish} className="mr-1" />
  Header
</div>
<div>About</div>
```

**(変更後)**

```ts{.numberLines caption="src/app/_components/Header.tsx (抜粋・変更後)" startFrom="17"}
<div>
  <FontAwesomeIcon icon={faFish} className="mr-1" />
  Header
</div>
<div>検索</div>  {/* 追加 */}
<div>About</div>
```

さらに、次のようなレイアウトのヘッダとするためには、どのようにすればよいか考えて実装してみてください。

![img](figs/06/app_07.png)

[<i class="fa-solid fa-person-chalkboard"></i> 上記レイアウトの実装例](codes/06/code01.tsx)

変更後は、一旦、元の状態に戻しておいてください。以降の解説は、元の状態を前提としたものになります。

## ページの追加

ここでは、アプリに以下のような「**About (自己紹介)**」のページを追加し、<span class="masked">サイト内外へのハイパーリンク</span>を作成する方法、<span class="masked">画像を表示</span> する方法などについて学びます。

![img](figs/06/app_08.png)

### アバター画像の準備と配置

プロジェクトフォルダの **直下** に `public` という名前のフォルダがあることを確認してください。

Next.js において、プロジェクトフォルダの直下に作成した `public` という名前のフォルダは特別な意味を持ち、**静的アセット** (= <span class="masked">画像、PDF、Zipファイル、ファビコン、静的なHTML/CSS、robots.txt など</span>) を配置するために使用します。

例えば、`public` に `test.png` という画像を配置しておけば <span class="masked">`http://localhost:3000/test.png`</span> のようにリクエストすることで**直接的に画像が取得できる**ようになります。

ここでは、`public` のなかに `images` というサブフォルダを作成して「About」のページで表示する**アバター画像** `avatar.png` を配置してください。画像は **アスペクト比が「1:1」** のものを用意してください。あるいは[こちらの画像](figs/06/avatar.png)を利用してください (AIで生成した画像なので自由に利用可能です)。

![img](figs/06/vscode_05.png)

**(プロンプト例)**

> 次のキーワードに基づき、JRPGスタイルのドット絵でアバター画像を作成してください。  
【キャラクタ】  
・（キーワードを列挙）  
【背景】  
・（キーワードを列挙）  
【雰囲気】  
・（キーワードを列挙）

#### 定着確認

- Next.js において静的アセットを配置するためのフォルダは、どのような名前で、プロジェクトフォルダのどの位置に作成すべきか答えよ。
    - 答え: <span class="masked">プロジェクトフォルダの直下に `public` という名前で配置</span>

### Aboutコンポーネントの作成

`/about` というURL (パス) でアクセス可能なコンテンツを作成するために、`src/app` フォルダのなかに`about` というサブフォルダを作成して `page.tsx` というファイルを新規作成してください。

![img](figs/06/vscode_06.png)

`page.tsx` を次のような内容で保存してください。そして、開発モードでアプリを起動して `http://localhost:3000/about` のURLで「About」のコンテンツにアクセスできることを確認してください。

```ts{.numberLines caption="src/app/about/page.tsx"}
"use client";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

const Page: React.FC = () => {
  return (
    <main>
      <div className="mb-5 text-2xl font-bold">About</div>

      <div
        className={twMerge(
          "mx-auto mb-5 w-full md:w-2/3",
          "flex justify-center"
        )}
      >
        <Image
          src="/images/avatar.png"
          alt="Example Image"
          width={350}
          height={350}
          preload
          className="rounded-full border-4 border-slate-500 p-1.5"
        />
      </div>
    </main>
  );
};

export default Page;
```

まず、上記の **第08行目** では「About」という文字列を出力しています。

また **第16行目** から **第23行目** にかけて `Image` というコンポーネントを使って「**アバター画像**」を出力しています (<span class="masked">Imageコンポーネントは「第02行目」でインポートしています</span>)。ここでは Image の `src` に `"/images/avatar.png"`というパスを与えていることに注目してください。このパスは、プロジェクトフォルダの `/public/images/avatar.png` に対応しています。

Image要素 をラップしている div要素 では、**レスポンシブデザインになるようにCSSを設定** しています。実際にブラウザの画面幅を変化させ <span class="masked">アバター画像が適切に拡大縮小・レイアウトされること</span> を確認してください。**CSSクラスの詳細** (特に `w-full md:w-2/3` や `flex justify-center` など) については、生成AIを利用して解決してください。このあたりを理解しておくと、標準的なレイアウトはそこそこ組むことができます。

なお、このファイルでは **第05行目** のように `Page` という名前で関数コンポーネントを作成していますが、`AboutPage` や `About` のような任意の名前にすることもできます。ただし、パスカルケースとするように注意してください。

#### 定着確認

- Next.js で画像を表示するための標準コンポーネント名を答えよ。
  - **答え** : <span class="masked">Image</span>
- Next.js でリンクを作成するための標準コンポーネント名を答えよ。
  - **答え** : <span class="masked">Link</span>

#### 演習 (<i class="fa-solid fa-stopwatch"></i>10分) 

Image コンポーネントの `width` と `height` を属性を次のように変更した場合、レスポンシブ対応を含めてレンダリング出力がどのように変化するか確認してください。確認の際には、デベロッパーツールのコンソールも同時に確認してください (エラー出力の有無など)。

- `width={1000} height={1000}`
- `width={100} height={100}`
- `width={350} height={200}`
- `width={350} height={0}`
- `width={350}` (heightを設定しない)
- width も height も設定しない

確認後は `width={350}` と `height={350}` に戻してください。

### ヘッダにAboutへのリンクを設定

ヘッダ右端に配置した「**About**」の文字列に `/about` に対する **ハイパーリンク** を設定していきます。つまり、ヘッダの「About」をクリックしたときに `/about` に画面遷移するように設定していきます。

`src/app/_components/Header.tsx` を開いて、まずは、関数コンポーネントの定義前に <span class="masked">`import Link from "next/link";`</span> を追加し、その **Linkコンポーネント** を使って以下のようにJSXを編集してください。

```ts{.numberLines caption="src/app/_components/Header.tsx (抜粋)"}
<div>
  <Link href="/">
    <FontAwesomeIcon icon={faFish} className="mr-1" />
    Header
  </Link>
</div>
<div>
  <Link href="/about">About</Link>
</div>
```

上記では「About」という文字列に `/about` のハイパーリンクを設定すると共に、「<i class="fa-solid fa-fish"></i>Header」に `/` へのハイパーリンクも設定しています。通常のHTMLでは <span class="masked">`<a href="...">...</a>`</span> を使ってハイパーリンクを設定しますが、Next.js では、**遷移先がアプリ内となるハイパーリンクには** `next/link` からインポートする **Linkコンポーネント** を使用します。

両差の違いについては、生成AIを利用して解決してください。

**(プロンプト例)**

> Next.jsにおいて、「"next/link" からインポートしたLinkコンポーネントを使ってハイパーリンクを作成した場合」と「通常のaタグを使ってハイパーリンクを作成した場合」の違いについて教えてください。また、どのように使い分ければよいですか。

開発モードでアプリを起動し、意図したようにハイパーリンクが機能することを確認してください。

### Next.jsにおける画像の表示

Next.js では、通常のHTMLの `<img>` タグではなく、`next/image` からインポートした <span class="masked">Imageという組み込みのコンポーネント</span> を使って画像を表示することが「**推奨**」されています。

```ts{.numberLines caption="src/app/about/page.tsx (抜粋・Imageコンポーネントによる画像表示)" startFrom="16"}
<Image
  src="/images/avatar.png"
  alt="Example Image"
  width={350}
  height={350}
  preload
  className="rounded-full border-4 border-slate-500 p-1.5"
/>
```

Next.js における「画像の取り扱い」は、大きく「**ローカル画像**」と「**リモート画像**」の2種類に分類されます。

ここでの「**ローカル画像**」とは、プロジェクトフォルダ内に配置した画像のことで、これはさらに <span class="masked">publicフォルダに配置した静的画像</span> と <span class="masked">srcフォルダに配置した画像</span> に分けることができます。

publicフォルダの画像を Imageコンポーネントで表示するときは (面倒ですが) `width` と `height` の**指定が必須**となります。一方で、srcフォルダに配置した画像は **ビルド時に最適化** され、<span class="masked">サイズ圧縮、フォーマット変換、複数解像度への対応など、パフォーマンスとレスポンシブ性を考慮した処理</span> が自動的に適用されます (Imageコンポーネントでは `width` と `height` の省略が可能です)。

<div class="note type-tips">
**publicフォルダの配置した画像へのアクセス**

publicフォルダに配置した「画像」などのコンテンツは、URLを使ってダイレクトにアクセスができます。例えば、`/images/avatar.png` のように配置した画像は `https://localhost:3000/images/avatar.png` で取得することができます。

一方で、srcフォルダに配置した画像については、上記のようにURLを使ってダイレクトにアクセスすることはできません。
</div>

また「**リモート画像**」とは「クラウドストレージ」や「外部のウェブサービス」など、**アプリの実行時にプロジェクト外から取得する画像** を指します。リモート画像を使用する場合は、画像を提供しているサービスの「ドメイン」を `next.config.ts` に登録しておく必要があります。

以下は、ダミー画像生成サービス [placehold.jp](https://placehold.jp/) や、[avataaars generator](https://getavataaars.com/) で動的生成した画像を参照するための設定を追加した例です。

```ts{.numberLines caption="next.config.ts (設定例)"}
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: false,
  devIndicators: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.jp" },
      {
        protocol: "https",
        hostname: "avataaars.io",
      },
    ],
  },
};

export default nextConfig;
```

Imageコンポーネントに関連して詳しいことが知りたい学生は[公式ドキュメント](https://nextjs.org/docs/app/building-your-application/optimizing/images)を確認するか、生成AIを利用して解決してください。

- 参考 https://getavataaars.com/


**(プロンプト例)**

> Next.js において、`next/image` からインポートした「Imageコンポーネント」を使用する際の注意点について教えてください。特に初心者がよくハマるポイントなどを教えてください。

> Next.js において、`<img>` タグではなく、`next/image` からインポートした「Imageコンポーネント」を使って画像を表示するメリットを教えてください。

> Next.js において、`src` フォルダに配置した画像については、ビルド時に最適化されると聞きました。具体的には、何のために、どのような処理が行われてるのか教えてください。

#### 演習 (宿題: <i class="fa-solid fa-stopwatch"></i> 30分) 

Aboutページについて、「コンテンツ」と「デザイン」を各自で自由に設計して実装してください。

[<i class="fa-solid fa-person-chalkboard"></i> 実装例](codes/06/code02.tsx)(レスポンシブデザイン対応)

#### 定着確認

- Next.js において `<a>` タグの代わりに使用される組み込みコンポーネントをインポートするための文を答えよ。このコンポーネントは、プリフェッチやクライアントサイドルーティングなどの最適化機能を提供する。
    - 答え: <span class="masked">`import Link from "next/link";`</span>
 - Next.js において `<img>` タグの代わりに使用される組み込みコンポーネントをインポートするための文を答えよ。このコンポーネントは、自動画像最適化、遅延読み込み、サイズ最適化などの機能を提供する。
    - 答え: <span class="masked">`import Image from "next/image";`</span>


## 投稿記事の一覧

アプリのトップページ (`/`) にアクセスしたとき、次のように「**投稿記事の一覧**」が表示されるような機能を実装していきます。記事の「**タイトル**」と「改行タグが反映された**本文**」に加えて、<span class="masked">「投稿日」と「記事のカテゴリ (複数)」</span> についても表示されるように実装していきます。

![img](figs/06/app_09.png)

### 実装の方針

ブログの投稿記事は、(最終的には) **ウェブAPIを叩いて「JSON形式」でバックエンドから取得するように実装**します。具体的には、次のような **JSONリテラル (文字列化されたJSONデータ)** をバックエンド経由でデータベースから取得することを想定します。DBは、リレーショナルデータベースを想定します。

```json{.numberLines caption="投稿記事一覧のデータサンプル (JSON文字列形式)"}
[
  {
    "id": "24f932b8-231b-429b-b9dc-569f07ba16a7",
    "createdAt": "2024-10-24T22:37:17.367Z",
    "title": "投稿2",
    "content": "夏は夜。<br/>月のころは...(略)",
    "coverImage": {
      "url": "https://w1980.blob.core.windows.net/pg3/cover-img-green.jpg",
      "height": 768,
      "width": 1365
    },
    "categories": [
      {
        "id": "587ac4ab-92de-450c-9423-5e091d16ecb5",
        "name": "TypeScript"
      }
    ]
  },
  {
    "id": "36b7c693-4cce-4d73-afa3-acb54a404290",
    "createdAt": "2024-10-22T11:22:34.684Z",
    "title": "投稿1",
    "content": "春はあけぼの。<br/>やうやう白くなりゆく...(略)",
    "coverImage": {
      "url": "https://w1980.blob.core.windows.net/pg3/cover-img-purple.jpg",
      "height": 768,
      "width": 1365
    },
    "categories": [
      {
        "id": "587ac4ab-92de-450c-9423-5e091d16ecb5",
        "name": "TypeScript"
      },
      {
        "id": "5cf22131-bac8-4bd0-be8e-757cec2bcc9a",
        "name": "React"
      }
    ]
  }
]
```

ただし、ウェブAPIからの取得の前に、まずはローカルに配置した `_mocks/dummyPosts.ts` から上記の取得することからはじめていきます。

ここで、以下の2点に注意してください。

1. `"createdAt"` は記事が作成され日時を「**ISO8601形式**」で表したものですが、末尾に `Z` が付いている点です。この末尾の Z は、その日時が <span class="masked">UTC（協定世界時）であること</span> を示しています。そのため、「投稿1」の `"2024-10-22T11:22:34.684Z"` は、日本時間 (JST、UTC+9) でいえば<span class="masked">2024年10月22日 20時22分34.684秒</span> を意味します。

2. `"content":` には **HTMLタグを含んだ文字列** が格納されていま1す。ブログ記事中の「改行」を画面に反映させるためには **HTMLタグを有効化する必要**がありますが、許可するタグを制限し適切なサニタイズ処理を実装しないと <span class="masked">XSS（クロスサイトスクリプティング）攻撃のリスク</span> が生じます。

#### 定着確認

- ISO8601 形式の `"2025-11-10T18:45:15.000Z"` というデータがある。これは、日本時間 (JST) でいえば、何月何日、何時何分何秒を意味するか答えよ。
  - **答え** : <span class="masked">2025年11月11日 03時45分15秒</span>

### 投稿記事のモックを生成

ソフトウェア開発において、**実際のデータやシステムの振る舞いを模倣した仮のオブジェクトやデータ** のことを <span class="masked">モック (Mock)</span> といいます。このブログアプリにおいても、最終的にはウェブAPIを使用してバックエンドから投稿記事のデータを取得しますが、ここではまずは「モック」を作成し、それを利用してデータを取得します。

モックを作成するにあたり、TypeScript環境では先に「**型**」を定義する必要があります。`src/app` フォルダのなかに `_types` フォルダを作成して、各型を定義した「Category.ts」「CoverImage.ts」「Post.ts」という3つのファイルを作成してしてください。

なお、型ファイルの名前は、慣例に従って **パスカルケース** で命名してください。また、これらは (JSXを含まない) 純粋なTypeScriptファイルなので <span class="masked">拡張子は「`.tsx`」ではなく「`.ts`」</span> としてください (React関数コンポーネントのように **JSX構文を使うファイル** だけを拡張子 `.tsx` としてください)。

```ts{.numberLines caption="src/app/_types/Category.ts (カテゴリ情報の型定義)"}
export type Category = {
  id: string;
  name: string;
};
```

```ts{.numberLines caption="src/app/_types/CoverImage.ts (カバーイメージ情報の型定義)"}
export type CoverImage = {
  url: string;
  width: number;
  height: number;
};
```

```ts{.numberLines caption="src/app/_types/Post.ts (投稿記事の型定義)"}
import type { Category } from "./Category";
import type { CoverImage } from "./CoverImage";

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  categories: Category[];
  coverImage: CoverImage;
};
```

次に `src/app` フォルダのなかに `_mocks` フォルダを作成し、そこに `dummyPosts.ts` というファイルを作成してください。そして、投稿記事の一覧を格納した `dummyPosts` というオブジェクトを作成してください。

- `dummyPosts.ts` のコードは[こちら<i class="fa-solid fa-person-chalkboard"></i>](codes/06/dummyPosts.ts)を参照してください。

最終的に、次のようなフォルダ構成になっていることを確認してください。

![img](figs/06/vscode_07.png)


### 記事一覧の表示

アプリのトップページ (`/`) にアクセスしたとき、次のように「**投稿記事の一覧**」が表示されるようにコンポーネントを追加・実装していきます。

![img](figs/06/app_09.png)

まずは、`src/app/_components` のなかに、次のような `PostSummary.tsx` を作成してください。PostSummaryコンポーネントは <span class="masked">投稿記事の「概要」を表示するためのコンポーネント</span> になります。

```ts{.numberLines caption="src/app/_components/PostSummary.tsx (投稿記事の概要を表示するコンポーネント)"}
"use client";
import type { Post } from "@/app/_types/Post";

type Props = {
  post: Post;
};

const PostSummary: React.FC<Props> = (props) => {
  const { post } = props;
  return (
    <div className="border border-slate-400 p-3">
      <div className="font-bold">{post.title}</div>
      <div>{post.content}</div>
    </div>
  );
};

export default PostSummary;
```

この PostSummaryコンポーネント は Props (**第04行目** から **第06行目**) として、**(単一の) 投稿記事** を受け取り、その `title` と `content` を表示するコンポーネントとなっています。

次に、上記で作成した PostSummaryコンポーネント を呼び出すように `src/app/page.tsx` (= `/` にアクセスしたとき (トップページにアクセスしたとき) に読み込まれるファイル) を以下のように編集してください。**第04行目** で「PostSummaryコンポーネント」をインポートして、**第41行目**から**第43行目** で <span class="masked">mapメソッド</span> のなかで、呼び出しています。この処理の理解が怪しいときは[Todoアプリの解説](lecture04.html#todolistコンポーネントのブラッシュアップ)に戻って復習してください。

```ts{.numberLines caption="src/app/page.tsx"}
"use client";
import { useState, useEffect } from "react";
import type { Post } from "@/app/_types/Post";
import PostSummary from "@/app/_components/PostSummary";
import dummyPosts from "@/app/_mocks/dummyPosts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Page: React.FC = () => {
  // 投稿データを「状態」として管理 (初期値はnull)
  const [posts, setPosts] = useState<Post[] | null>(null);

  // コンポーネントが読み込まれたときに「1回だけ」実行する処理
  useEffect(() => {
    // 本来はウェブAPIを叩いてデータを取得するが、まずはモックデータを使用
    // (ネットからのデータ取得をシミュレートして１秒後にデータをセットする)
    const timer = setTimeout(() => {
      console.log("ウェブAPIからデータを取得しました (虚言)");
      setPosts(dummyPosts);
    }, 1000); // 1000ミリ秒 = 1秒

    // データ取得の途中でページ遷移したときにタイマーを解除する処理
    return () => clearTimeout(timer);
  }, []);

  // 投稿データが取得できるまでは「Loading...」を表示
  if (!posts) {
    return (
      <div className="text-gray-500">
        <FontAwesomeIcon icon={faSpinner} className="mr-1 animate-spin" />
        Loading...
      </div>
    );
  }

  // 投稿データが取得できたら「投稿記事の一覧」を出力
  return (
    <main>
      <div className="mb-2 text-2xl font-bold">Main</div>
      <div className="space-y-3">
        {posts.map((post) => (
          <PostSummary key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default Page;
```

または、ここでは **第14行目** からの `useEffect` が処理において極めて重要な意味を持ちます。`useEffect` を使用することで、コンポーネントが読み込まれたときに **1回だけ** <span class="masked">ウェブAPIをコールして (現時点はモックから) データが取得される仕組み</span> をつくっています。

もし、`useEffect` を **使用せずに処理を実装**をすると、次のように <span class="masked">無限ループ</span> が発生します。

1. ウェブAPIをコールしてデータを取得 
2. 取得したデータを `setPosts` に与えて状態を更新 (state更新)
3. 状態が更新されたので再レンダリング (=**Page関数が再実行される❗**)
4. ウェブAPIをコールしてデータを取得 
5. 取得したデータを `setPosts` に与えて状態を更新 (state更新)
6. 状態が更新されたので再レンダリング (=**Page関数が再実行される❗**)
7. **😱😱無限ループ😱😱**

このような無限ループは、**API使用制限（Rate Limit）への抵触**、<span class="masked">従量課金制のAPIを使用している場合は予期せぬ高額請求 (いわゆるAPI破産やクラウド破産)</span>、**サーバへの過剰な負荷** につながるため、十分に注意してください。

- [api破産/クラウド破産💀](https://www.google.com/search?q=クラウド破産)

なお、[前回講義の](lecture05.html#localstorage-を利用した保存機能の実装) でも紹介しましたが
`useEffect` については「[初心者向け！ReactのuseEffectが何してるのか20分で説明](https://www.youtube.com/watch?v=4INjmxXaPxU)」の動画、ウェブ検索、生成AIを活用して理解を深めてください。


### 動作確認

ここまでの実装について、開発モードで実行確認する次のような出力が得られることが分かります。つまり、HTMLタグが <span class="masked">サニタイズ (無害化)</span> され出力されていることが確認できます。

![img](figs/06/app_10.png)

Next.js (React) では、JSXで `<div>{post.content}</div>` のように記述すると、**悪意あるスクリプトの実行を防ぐために** コンテンツが自動的にサニタイズ (無害化・エスケープ処理) されます。

ただし、**信頼できるコンテンツを HTML として意図的に描画したい場合**は、次のように `dangerouslySetInnerHTML` 属性を使用します。

```ts{.numberLines caption="HTMLをサニタイズせずに出力する例"}
{/* <div>{post.content}</div> */}
<div dangerouslySetInnerHTML={{ __html: post.content }} />
```

実際に、`src/app/_components/PostSummary.tsx` を書き換えて、`post.content` の `<br/>` が「**改行**」に置き換わって表示されることを確認してください。

なお、改行や太字/斜線/下線などの **特定のタグだけを許可** し、それ以外のタグ (例えば `<script>` などの危険なタグ) は削除したいときには `dompurify` (Next.jsでバックエンドでも使用する可能性があるのであれば `isomorphic-dompurify`) などの**ライブラリを使用**します。今回は、次のコマンドで `isomorphic-dompurify` を追加してください。詳しい使い方は生成AIなどで調べてください。

```
npm i --save-exact isomorphic-dompurify@4.6.0
```

このバージョンには Node.js 22.22.2 以降の 22 系列、24.15.0 以降の 24 系列、または 26 以降が必要です。連絡欄で案内したセキュリティアップデートを適用して進めてください。

- XSS脆弱性については、来年前期の「知能情報実験実習2」の[前期テーマ](https://takeshiwada1980.github.io/Eii2-2025/)で扱います。

**(プロンプト例)**

> TypeScript を採用した Next.js 環境において、`isomorphic-dompurify` を利用し、HTMLコンテンツから「改行」と「太字・斜線・下線」以外のタグを削除したいです。どのようにすればよいですか。

#### 定着確認

- ウェブアプリにおいて、HTMLコンテンツに含まれる可能性のある「悪意のあるスクリプト」や「HTMLタグ」を無害化し、XSS攻撃を防ぐための処理のことを何というか答えよ。英語またはカタカナで答えること。
    - 答え: <span class="masked">「サニタイズ (サニタイゼーション)」「sanitize (sanitization)」</span>
- 「XSS攻撃」とは何の略か答えよ。英語またはカタカナで答えること。
    - 答え: <span class="masked">「クロスサイト・スクリプティング攻撃」「Cross-Site Scripting攻撃」</span> 

#### 演習 (宿題: <i class="fa-solid fa-stopwatch"></i> 80分) 

次のように「投稿日」と「カテゴリ」が表示されるように `src/app/_components/PostSummary.tsx` をアップデートしてください。**「レイアウト」や「デザイン (装飾)」は各自で自由に設計してください**。必要に応じて `dummyPosts.ts` にデータを追加してください。

![img](figs/06/app_09.png)


- 日付の表示には、次のコマンドで `dayjs` を追加してください。`isomorphic-dompurify` は前の節で追加したものを使います。

    ```
    npm i --save-exact dayjs@1.11.23
    ```

- 本文は **最大で「3行」まで表示** されるようにしてください (4行以上になる場合は `...` で省略する)。
    - ヒント: <span class="masked">Tailwind CSS の `line-clamp-3` を利用すると便利です</span> 
- **EX (任意)**: `src/app/page.tsx` にボタンなどのUIを追加し、「日付の新しい順」「日付の古い順」に記事概要を並び替える処理を実装してください。
- **EX (任意)**: 同様に、カテゴリによるフィルタ機能 (絞り込み機能) を実装してください。例えば `TypeScript` のカテゴリタグがついている記事だけを一覧で表示するなど。


- 実装例は[こちら<i class="fa-solid fa-person-chalkboard"></i>](codes/06/code03.tsx)を参照してください。

### 最後の動作確認

開発サーバを停止し、次のコマンドを順に実行してください。

```
npm run lint
npm run build
npm run start
```

Lint とビルドでエラーが出ないことを確認し、本番モードで `http://localhost:3000/` と `http://localhost:3000/about` にアクセスしてください。記事一覧・投稿日・カテゴリ・改行、アバター画像、ヘッダのリンクを確認してください。ブラウザのコンソールにもエラーが出ていないことを確認し、最後に `Ctrl+C` でサーバを停止してください。
