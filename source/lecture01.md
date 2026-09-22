---
var:
  header-title: "2026-3I プログラミング3 第01回 講義資料"
  header-date: "2026年09月25日（金）1時限"
---


# 第01回 3I-プログラミング3 (2026)

## ガイダンス

### 概要

本科目では [Next.js](https://www.google.com/search?q=Next.js) をフレームワークとした「**ウェブアプリ開発**」を実践形式で学び、実際にオリジナルの**ブログシステム** (ログイン機能、記事の閲覧と投稿機能を持つもの) をゼロから開発、デプロイ・公開することができる知識とスキルの修得を目標としています。


- **デプロイ** (Deployment) とは <span class="masked">開発したウェブアプリをサーバにアップロードし、実際に、ユーザーがインターネット経由でスマホやPCから利用できる状態</span> にすることです。
- 昨年度の学生が最終課題として開発したオリジナルウェブアプリは[こちら](https://omunet-my.sharepoint.com/:t:/g/personal/z21707r_omu_ac_jp/EVLWOU5xMd5LqQ3yVCpRmEYBLBWOQR8BX9R302NUTB3quA)(学内のみ)

皆さんが、この授業で開発するウェブアプリは、来年度のインターンシップや、今後の就活のなかで、**自分の能力と経験 (実績) を客観的に示すこと** に利用できます。授業という枠に捕らわれずに、意欲的に取り組んで欲しいと思います (特にウェブ系エンジニアを将来の視野に入れているひとは頑張ってください)。

- [ウェブエンジニア](https://mynavi-agent.jp/it/jobindex/17.html)@マイナビ
- [ウェブエンジニア](https://careergarden.jp/web-engineer/)@キャリアガーデン

### 授業の位置づけ

この授業の位置づけは、次のようになります。
 
#### 基本情報

- 学年・学科： 3年 総合工学システム学科 ***知能情報コース専門科目***
- 単位数： **2単位** (後期・**学修単位**)
- 卒業要件： DP-D
- 担当教員： Takeshi Wada

<div class="note type-senior">
**学修単位**

本科目は、前期の **情報3** や **プログラミング2** と同じく「**学修単位**」の科目であり、「**30時間 (相当) の対面授業**」と「**60時間 (相当) の授業時間外学習**」が要求される科目となります。

授業については**毎週90分**を実施し、これを2時間と見なして全15回の講義によって「30時間相当の対面授業」を確保しています。これに加えて、皆さんは**授業1回につき、授業時間外に** <span class="masked">約4時間の自主的な学習</span> **が求められます**。

そして、この授業は、それらの授業時間外学習を前提にボリュームや難易度を設定しています。

</div>

#### 関連科目

知能情報コースの専門科目は ***ソフトウェア系***、***ハードウェア系***、***応用情報科学系*** の **3系統** から構成されています。ここでは、**ソフトウェア系** と **応用情報科学系** のなかで本科目と**特に関連がある科目**を挙げています。

- 2年 通年 (履修単位) **プログラミング1** (Python) ***済***
    - [2023-講義資料](https://takeshiwada1980.github.io/Programming1-2023/)/[2024-講義資料](https://takeshiwada1980.github.io/Programming1-2024/)/[2025-講義資料](https://takeshiwada1980.github.io/Programming1-2024/)
- 2年 前期 (履修単位) **マイクロコンピュータ** ***済***
- 3年 前期 (学修単位) **プログラミング2** (C言語) ***済***
- 3年 前期 (学修単位) **アルゴリズムとデータ構造1**
  - 教科書 [問題解決力を鍛える！アルゴリズムとデータ構造](https://www.kspub.co.jp/book/detail/5128442.html)
- 3年 通年 (履修単位) **知能情報実験実習** (自然言語処理・スクレイピング/Python) ***済***
- 3年 後期 (学修単位) **プログラミング3** (ウェブ系開発) ***!!! 本科目!!!***
  - Next.js、React、TypeScript
  - 参考書 [(改訂新版) これからはじめるReact実践入門 コンポーネントの基本からNext.jsによるアプリ開発まで](https://www.amazon.co.jp/dp/B0FFGQPMSX/)。やや高額 (￥4,755) ですが、お勧めできる書籍です。自己投資として購入しても損はないと思います。
    - 本書は研究室に1冊所蔵しています。内容を確認したい学生は声をかけてください。

<hr>

また、4年生以降は、次のような科目が展開されます。

- 4年 通年 (履修単位) **知能情報実験実習2**
  - 前期テーマ：[ウェブシステムのセキュリティ評価](https://takeshiwada1980.github.io/Eii2-2025/)
- 4年 前期 (学修単位) **アルゴリズムとデータ構造2**
- 4年 後期 (学修単位) **データベース工学**
  - [2025-講義資料](https://takeshiwada1980.github.io/DB-2025/)
- 4年 通年 (履修単位) **マルチメディア情報処理**
- 5年 前期 (学修単位) **オートマトンと形式言語**
- 5年 後期 (学修単位) **オペレーティングシステム**
- 5年 前期 (学修単位) **ソフトウェア工学**
- 5年 通年 (履修単位) **人工知能**

### 本科目を通じて学べる知識・スキル

本科目では[Next.js](https://www.google.com/search?q=Next.js)をフレームワークに採用した「**ウェブアプリ開発**」についてハンズオン形式で実践的に学び、最終的にオリジナルのブログシステム (記事の閲覧と投稿機能を持つもの) を **ゼロから開発、デプロイ (公開) できる知識とスキルの修得** を目指します。

Next.js は <span class="masked">Reactを基盤として、バックエンドも含めたウェブアプリ開発環境を提供する</span> フルスタックフレームワークです。

具体的には、Next.js に加えて、次のような技術やウェブサービスについてハンズオン形式で学んでいきます。

- TypeScript (JavaScript)、**React**
- [Tailwind CSS (v4)](https://tailwindcss.com/)、[Shadcn/ui](https://ui.shadcn.com/)
- [MicroCMS](https://microcms.io/)
- SQLite、[Spabase](https://supabase.com/)、Prisma
- GitHub、GitHub Pages、CI/CD (GitHub Actions)、[Vercel](https://vercel.com/)

<div class="note type-tips">

**「React」とは**

React は、**SPA** (Single-Page Application) 型のウェブアプリの開発に特化した **ユーザーインターフェイス構築ライブラリ** (フロントエンドフレームワーク) です。

- 参考: [React入門](https://ai10pro.github.io/my-portfolio/pages/articles/01_react-study.html) @ 2024-情報3 (課題④) I.A.君による技術解説記事
- 参考: [ReactHookの使い方](https://ykongr.github.io/js_explanation/) @ 2025-情報3 (課題④) K.H.君による技術解説記事
- 参考: [Googel検索「Reactとは...」](https://www.google.com/search?q=Reactとは)


Reactは、ウェブアプリの開発者に対しては **高度な再利用性と優れた保守性を提供** し、ウェブアプリの利用者には <span class="masked">高速で応答性の高い快適なUI/UX</span> を提供します。Meta社 (旧Facebook社) が開発・保守しているライブラリで、ウェブ版の Facebook や Instagram、メルカリ、LINE、Netflix、Dropbox、UberEats などでもガンガンに使われています。

ウェブアプリのフロントエンドフレームワークとしては、React の他、[Vue.js](https://www.google.com/search?q=Vue.jsとは)(ビュージェイエス) や[Angular](https://www.google.com/search?q=Angularとは) (アンギュラーアンギュラー)、[Svelte](https://www.google.com/search?q=Svelteとは)(スヴェルト) なども存在しますが、いまは React が最も人気で技術情報も豊富です。

- 参考: [主要JSフレームワークの種類と特徴](https://create-alt.github.io/js_webpage/)@ 2025-情報3 (課題④) T.Y.君による技術解説記事

</div>

#### 前提とする知識とスキル

本科目は、概ね次のような学習経験を積んでいることを「**前提**」とした授業内容、授業スピード (展開速度) となります。

- **HTML/CSS**: 10時間以上
    - 2年通年「プログラミング1」、3年前期「情報3」、1年後期「情報1」(Progate課題)
- **JavaScript**: 6時間以上
    - 3年前期「情報3」(課題④)
- **DB/SQL** (SQLite): 6時間以上
    - 2年前期「情報2 (第11回講義・第12回講義)」
- **Git/GitHub** : 16時間以上
    - 2年通年「プログラミング1 ([第14回講義](https://takeshiwada1980.github.io/Programming1-2024/lecture14.html)・[第15回講義](https://takeshiwada1980.github.io/Programming1-2024/lecture15.html)・[第16回講義](https://takeshiwada1980.github.io/Programming1-2024/lecture16.html)・[第27回講義](https://takeshiwada1980.github.io/Programming1-2024/lecture27.html))」、文化祭活動
- **Python**: 120時間以上
    - 2年通年「プログラミング1」、3年前期「知能情報実験実習1」、3年前期「アルゴリズムとデータ構造1」、文化祭活動
- **C言語**: 120時間以上
    - 3年前期「プログラミング2」、2年前期「マイクロコンピュータ」、3年前期「アルゴリズムとデータ構造1」

知識やスキルが不足していると感じる学生は[Progete](https://prog-8.com/)などを活用して補習しておいてください🚀

### 科目の達成目標

シラバスからの抜粋を次に示します。

1. Next.jsとTypeScriptを用いて基本的なウェブアプリケーションの開発ができる。
2. リレーショナルデータベースの設計とORMによるデータアクセス処理の実装ができる。
3. 認証と認可の処理を備えたセキュアなウェブアプリケーションの設計と運用ができる。
4. ホスティングサービスを利用してウェブアプリケーションのデプロイメントと公開ができる。


### 成績評価法

**総合成績**（年度末の最終成績）は、シラバスに記載したように次のように評価します。

- 各達成目標に対する到達度を、課題 ***70%***、小テスト ***30%*** で総合して評価する。
- 100点法により評価し、60点以上を合格とする。

中間試験や期末試験などの筆記形式の定期試験は**実施しません**。

<div class="note type-tips">
**小テストを欠席した場合**

遅刻や欠席（公欠や出欠停止を含む）により、小テストを受験できず追試験を希望する者は **当該授業日を含めて2日以内** に、学生から和田宛に **TeamsChat で追試験の実施依頼** をしてください。例えば、10月02日（木）に実施された小テストの追試験を希望する場合は、10月03日(金) の 23:59 までに連絡してください。

小テストの追試験は、公欠や忌引を含めて理由に関わらず **1人あたり最大3回まで**対応します。4回目以降の欠席・遅刻による小テスト未受験に対して、追試は実施せず「0点」で評価します。
</div>

### 授業の進め方

「**ウェブアプリ開発とは？**」や「**ウェブアプリ開発とウェブサイト制作の違いは？**」といった座学的な内容は、今後の授業のなかで、順次、説明していきます。初回授業から、手を動かさずに話を聞いているだけでは実感も湧かず、眠くなってしまう🐏💤と思うので・・・。

気になる人は以下を参考にしてください (内容としては、キャリア形成の観点で極めて重要です)。

- 参考: [YouTube検索「Web制作 Web開発 違い」](https://www.youtube.com/results?search_query=Web制作+Web開発+違い)
- 参考: [Googel検索「Web制作 Web開発 違い」](https://www.google.com/search?q=Web制作+Web開発+違い)

**(プロンプト例)**

> 業務内容と、スキル・キャリアの観点から「Web制作」と「Web開発」について、高校生にも分かりやすく解説してください。

本日 (第01回) から 第05回講義 までは「**開発環境の構築・設定**」「**モダンTypeScriptの学習**」「**Reactを使った「Todoアプリ」の開発**」を目標に進めていきます。ここでの「Todoアプリ」は <span class="masked">フロントエンドだけで完結するウェブアプリ (ウェブブラウザを実行環境とするアプリ)</span> として開発します。

その後、データベース (SQLite3) や、各ウェブサービス (microCMS/Supabase) との連携、Next.js によるウェブAPI開発などの「**バックエンドの領域**」について学びながら「**オリジナルのブログシステムの開発**」に挑んでいきます。

後期中間ぐらいまでの流れ

1. モダンTypeScript基礎学習のための環境構築
1. TypeScript基礎学習
1. Reactを使ったTodoアプリのための環境構築
1. Todoアプリ開発（Reactによるフロントエンド開発）のチュートリアル
1. Todoアプリのカスタマイズや作り込み

詳細なフローは、昨年度の[講義資料](https://takeshiwada1980.github.io/Programming3-2024/)を参照してください。


## 最初の目標「Todoアプリの開発」

後期の中間試験前ぐらいまでは、次のリンクに示すような「Todoアプリ」を[React](https://www.google.com/search?q=Reac)という モダンなJavsScriptライブラリ (フロントエンド開発フレームワーク) を使って開発できるようになること (= <span class="masked">ある程度の意味や内容を理解して実装できるようになること</span> ) を目標にします。

- [Todoアプリのサンプル](https://takeshiwada1980.github.io/react-todo-app-demo/) (ギリギリ合格水準のレベル、点数で言えば60点😨)
- [Todoアプリのサンプル](https://takeshiwada1980.github.io/react-todo-app-demo/2) (内容を十分に理解した上で、このレベルが実装できたら素晴らしい！90点超🎉)
    - このTodoアプリは、フロントエンド技術のみで開発します (ウェブブラウザの localStorage という機能を利用して Todoデータ の永続化を行ないます)。
    - 90点のほうのサンプルにも、カテゴリ機能をつけたり、タスクごとにメモをつけられるようにしたり、カレンダを表示できるようにしたり…などカスタムの余地はたくさんあります。
    - このアプリはバックエンドを含まないため (多少の設定と工夫は必要ですが) GitHub Pages にデプロイして公開することもできます。 

![img](figs/01/todo_01.png)

以上のようなTodoアプリの開発に要求されるのが **TypeScript言語 (JavaScript言語) の基礎** であり、そのために必要となるのが **開発環境の構築** (IDEの設定を含む) になります。なお、IDE (Integrated Development Environment、統合開発環境) については、皆さんも使い慣れているハズの「VSCode」を使用していきます。

<div class="note type-tips">
**「フロントエンド」と「バックエンド」**

ウェブアプリは、画面をつくる「**フロントエンド**」と、裏で処理を支える「**バックエンド**」の大きく2つに分けて開発します。

- フロントエンド (クライアントサイド) : 主に対ユーザの入出力 (UI/UX) を担う層で、ウェブブラウザ上で動作するプログラムやコンテンツの設計や開発を行ないます。基本的に、HTML/CSS/JavaScript (TypeScript) で開発します。
- バックエンド (サーバサイド) : サーバ上で動作し、データベースや外部サービスと連携して、ウェブブラウザからのリクエストに応じた処理やレスポンスを返す部分の設計や開発を行ないます。様々な言語で開発することができますが、本科目では TypeScript で開発します。
</div>


## JavaScript/TypeScriptの概要

***TypeScript*** (**タイプスクリプト**) は、JavaScript (ジャバスクリプト) に「**静的型付け**」や「**クラスベースのオブジェクト指向**」など導入して拡張したプログラミング言語です。Microsoft によって開発・保守され、**最近の中規模以上のフロントエンド開発**では、<span class="masked">TypeScript が事実上の標準言語 (ほぼ唯一の選択肢)</span> となっています。

この授業で学ぶ React や Next.js のほか、**Angular** や **Vue.js** などのウェブアプリ開発の主要フレームワークも TypeScript による開発を推奨しており、実際に多くのウェブ開発現場で TypeScript が採用されています。**プログラミング言語別の求人ランキング** ([参考](https://career.levtech.jp/guide/knowhow/article/918/)) においても上位を陣取る言語となっています。

なお、TypeScript プログラムは、「**トランスパイラ**」というものを使って JavaScriptプログラムに変換できるので、基本的には <span class="masked">「TypeScriptが使える」＝「JavaScriptが使える」</span> と考えて問題ありません。

<div class="note type-tips">
**トランスパイラによる「TypeScript」から「JavaScript」への変換**

`prac00.ts` という TypeScriptプログラム は、TypeScriptコンパイラによって `prac00.js` という JavaScriptプログラム に変換できます。今回の授業後半では、プロジェクトに設定ファイルを用意して `npx tsc` で実際にトランスパイルをしてもらいます。

```typescript{.numberLines caption="変換前: prac00.ts（TypeScriptプログラム）"}
function greetAndCalculate(name: string, a: number, b: number): string {
  const sum: number = a + b;
  return `Hello, ${name}! The sum of ${a} and ${b} is ${sum}.`;
}

const userName: string = "Alice";
const x: number = 10;
const y: number = 20;

const result: string = greetAndCalculate(userName, x, y);
console.log(result);
```

```typescript{.numberLines caption="変換後: prac00.js（JavaScriptプログラム）"}
function greetAndCalculate(name, a, b) {
    const sum = a + b;
    return `Hello, ${name}! The sum of ${a} and ${b} is ${sum}.`;
}
const userName = "Alice";
const x = 10;
const y = 20;
const result = greetAndCalculate(userName, x, y);
console.log(result);
```

</div>

### JavaScript ($\neq$ TypeScript) の実行環境

もともと JavaScript は[Netscape](https://ja.wikipedia.org/wiki/Netscapeシリーズ)というウェブブラウザにおいて、HTML要素に対して**動的な視覚的効果を与えたり、ダイアログを表示したりするため**に開発された言語であり、**JavaScript の (基本的な) 実行環境** は <span class="masked">ウェブブラウザ (Chrome、Edge、Safari、Firefox など)</span> となります。

<div class="note type-tips">
「JavaScript」は、当初「**LiveScript**」という名前でした。しかし、**当時の Java の爆発的人気にあやかって JavaScript に改名**しています。念のために「Java」と「JavaScript」は <span class="masked">メロンとメロンパンぐらい違う (有名な「たとえ」ですね)</span> ので注意してください。完全なる別物です。

- [JavaとJavaScriptの比較](https://2ufkpfb9daxnik.github.io/portfolio/javascriptVSjava/index.html) @ 情報3 (課題④) N.H.君による技術解説記事
</div>

JavaScriptが「**ウェブブラウザを実行環境として動作する**」というのは、**Python や C言語 などのネイティブアプリ開発用の言語と比較して大きな特徴** となります。

- ウェブブラウザが使える環境であれば OS や デバイス (スマホやPC) に依存せず JavaScript が実行可能できるというのは **大きな「強み」** といえます。

例えば、自分が作成した「Pythonプログラム」を誰かに使ってもらおうとしたら、その利用者の PC に Python の実行環境をインストールしてもらって、さらに必要なパッケージを pip でインストールしてもらって…という非常に高いハードルがありました (Pythonコードを[EXEファイル化して配付するという手段](https://takeshiwada1980.github.io/Programming1-2024/lecture27.html#exeファイル化)もありましたが、ファイルサイズも非常に大きく起動も遅いアプリになってしまいました) 。

#### ウェブブラウザで実行されるJavaScript

**JavaScriptの実行環境が「ウェブブラウザ」であること**を実際に確認してみます。

次の2つのファイルをテキストエディタで作成・保存 (拡張子に注意) し、`index.html` のほうをダブルクリックして Chrome を起動してください。さらに、Chrome で ***[F12]*** を押下して **デベロッパーツール (開発者ツール) ** を起動し「**コンソール**」タブを確認してください。

```html{.numberLines caption="index.html"}
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <p>"F12"で「コンソール」を開いて結果を確認してください。</p> 
  <script src="hoge.js"></script>
</body>
</html>
```

上記 `index.ts` の **第09行目** で、以下のJavaScriptプログラムを呼び出しています。

```js{.numberLines caption="hoge.js"}
function add(a, b) {
  const c = a + b;
  console.log(`${a} と ${b} を足すと ${c} です。`);
}
add(10,20);
add(50,-30);
```

デベロッパーツールのなかの「**コンソールタブ**」から、次のように <span class="masked">ウェブブラウザを実行環境として JavaScriptプログラム が動くこと</span> が確認できたと思います。

![img](figs/01/chrome_01.png)


なお、ウェブブラウザで JavaScript を実行するためには <span class="masked">HTMLファイル の内部から JavaScriptプログラム を呼び出す必要</span> があります。

 - `hoge.js` をダブルクリックしたり、ウェブブラウザ画面に「JavaScriptファイル」をドラッグアンドドロップしても**動作しません**。実際に試してみてください。


<div class="note type-caution">
**注意**

**ウェブブラウザでは「TypeScript」で書かれたプログラムコードを直接実行することはできません**。ウェブブラウザで実行するためには <span class="masked">トランスパイラ</span> を使って、**あらかじめ「TypeScript」を「JavaScript」に変換・配置し**、HTMLファイルから呼び出すことが原則となります。

なお「トランスパイラ (Transpiler)」とは、あるプログラミング言語で書かれたソースコードを、別のプログラミング言語のソースコードに変換するツールのことで「**トランスレート (Translate)**」と「**コンパイル (Compile)**」を組み合わせた造語です。
</div>

皆さんは、既に「Pyhthon」「C」「Arduino」を学んできているので推測はつくと思いますが `hoge.js` に記述されるプログラムは、Python で書けば以下のようなものとなります。

```python{.numberLines caption="hoge.py"}
def add(a, b):
  c = a + b
  print(f'{a} と {b} を足すと {c} です。')
add(10, 20)
add(50, -30)
```

Pythonプログラムは、覚えてますよね🤔

### もうひとつの JavaScript の実行環境

先のセクションで「**JavaScripthはウェブブラウザ上で実行される**」と解説しましたが、実は、もうひとつ ***Node.js*** という「ウェブブラウザとは異なる JavaScript 実行環境」が存在します。

Node.js (ノード・ジェーエス) は、**Windows や Linux などの OS にインストールして利用するJavaScript実行環境**です。Node.jsがインストールされている環境では、先ほどの `hoge.js` を次のようにターミナル (PowerShellやコマンドプロンプト) から JavaScript を実行できます。HTMLの内部から呼び出すことなく直接的に実行できる点に注意してください。

```
PS C:\Users\xxxx\Desktop> node hoge.js
10 と 20 を足すと 30 です。
50 と -30 を足すと 20 です。
```

ウェブブラウザを使えば手軽に実行できる JavaScript を、**わざわざ Node.js 環境を構築して、実行するような需要はどこにあるのでしょうか**。需要は「**大きく2つ**」あります (ここから非常にややこしい話になるので注意してください)。

まず、1つは、ウェブアプリの **バックエンド (サーバサイド) の実行環境** としての需要があります。既に皆さんは、前期の「知能情報実験実習1」のなかで Flask (Python) を使ってウェブアプリのバックエンド開発を体験していますが、それと同様に、Node.js を使えば **JavaScript/TypeScript でもバックエンド開発** ができます。

具体的には[Express.js](https://www.google.com/search?q=Express.jsとは)や[Koa.js](https://www.google.com/search?q=Koa.jsとは)といったフレームワークを利用して JavaScript/TypeScript 言語でバックエンド開発が可能です。そして、その実行環境として Node.js が使われます。フロントエンドと同じ言語でバックエンドを開発できるのは、開発者サイドにとっては大きなメリットです。

<div class="note type-tips">
**参考**

Pythonでは[Flask](https://www.google.com/search?q=Flask+Python)を用いて次のようにウェブアプリ (バックエンド) を構築できました。

```python{.numberLines caption="app.py"}
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
  return 'hello'

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8000)
```

JavaScriptでは[Express.js](https://www.google.com/search?q=Express.jsとは)というフレームワークを使って、次のようにウェブアプリのバックエンドを構築できます。このプログラムは、Node.js がインストールされた環境で `node app.js` といったコマンドで実際に実行できます。逆に、**ウェブブラウザ上では実行できないタイプの JavaScriptプログラム** となっています。

```python{.numberLines caption="app.js"}
const express = require('express');
const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

なお、Pythonで本格的なバックエンド開発を際には、Flask ではなく[Django (ジャンゴ)](https://www.google.com/search?q=Djangoとは)という多機能な (フルスタックな) フレームワークが利用されます。

</div>

次に、2つめですが「ウェブブラウザを実行環境として動作するフロントエンドのJavaScriptプログラム」を開発するときに、その**ビルド** (<span class="masked">TypeScript から JavaScript へのトランスパイルを含む</span>) **や、開発ツールの実行のために Node.js 環境が使われます**。

たとえば、<span class="masked">React を使ったフロントエンド開発</span> が**典型的な Node.js の利用シーン**となります。Reactは「**ウェブブラウザを実行環境として機能するフロントエンド用のJavaScriptライブラリ**」ですが、その React を使った JavaScriptプログラム を効率的に開発するために Node.js という JavaScriptの実行環境 が必要になってきます (ややこしいですよね💦)。

簡単にまとめると、**Reactを利用したフロントエンドのウェブアプリはウェブブラウザで動作するが、開発中のビルドやツールの利用のために Node.js が必要になる** ということです。

・・・とはいえ、いまの段階で、上記の文章だけを読んでイメージを掴むことは極めて難しいと思います。これらは、**この先の授業のなかで実例を示しながら解説**していきます。いますぐ解決したいときは、生成AIを活用してください。

(プロンプト例)

> Reactはウェブブラウザで動作するフロントエンドのライブラリなのに、その開発に何故 Node.js が必要なのですか？Node.jsを使わずに開発はできないのですか？


なお、後半 (第06回講義以降) で登場する「**Next.js**」は、上記で説明した **2つの Node.js の用途を統合したようなフレームワーク** になっています。つまり、Node.jsによって「フロントエンド開発の効率化」と「バックエンド機能の提供」を同時に実現し、総合的なフルスタック開発・実行環境を提供しています (ここの部分も現段階で理解する必要はありません)。

#### 定着確認

- Reactは「フロントエンド開発用のライブラリ」と「バックエンド開発用のライブラリ」のどちらか。
    - 答え <span class="masked">フロントエンド開発用のライブラリ</span> 
- JavaScript の実行環境を2つ答えよ。
    - 答え <span class="masked">「ウェブブラウザ」と「Node.js」</span>
- 次の説明は適切か。「Reactを使った (ウェブアプリ) フロントエンドの "実行" に、Node.js が使われる」
    - 答え <span class="masked">適切ではない。Reactを使ったフロントエンドの "開発" には、Node.jsは事実上必須ですが、"実行" には基本的に Node.js は必要ではありません。</span>
- 次の説明は適切か。「 (基本的に) ウェブブラウザでは TypeScriptプログラム は動作しない。」
    - 答え <span class="masked">適切です。</span>

## Node.js のインストール

ここから、TypeScript の基礎学習と、自動テストのための **開発環境** を構築します。Windows PC と VSCode を使用します。環境構築も、この授業で身につけてほしいスキルのひとつです。

単に操作をまねるだけでなく、**「何のために」「どこに」「何を用意するか」** を考えながら進めてください。最初は詳しく説明しますが、徐々に「プロジェクトのルートで実行」「`src` にファイルを作成」のような指示から、自分で必要な操作を判断できるようになってほしいと思います。

### 授業で使用するバージョン

この授業では **Node.js 24 系列 (LTS)** と **TypeScript 6.0 系列** を使用します。以下は、2026年9月22日にコマンドで動作確認した組合せです。まずは、この組合せで環境をそろえてください。

| ツール・パッケージ | バージョン | 主な役割 |
| :--- | :--- | :--- |
| Node.js | 24.21.0 | JavaScriptの実行環境 |
| npm | 11.9.0 | パッケージの管理 |
| TypeScript | 6.0.3 | 型チェック、JavaScriptへの変換 |
| @types/node | 24.13.6 | Node.jsのAPIに関する型情報 |
| tsx | 4.23.15 | TypeScriptの変換と実行、変更時の再実行 |
| Vitest | 5.0.1 | 自動テストの実行 |
| Vite | 8.3.0 | Vitestが内部で利用する変換・読み込みの仕組み |

**LTS** は <span class="masked">Long-Term Support</span> の略語で「長期サポート」を意味します。Node.js の「いちばん大きなバージョン番号」と「最新のLTS」は同じとは限りません。[公式のリリース一覧](https://nodejs.org/en/about/previous-releases)で確認できます。

既にNode.jsを入れている場合も、次の手順でバージョンを確認してください。以前の授業や個人開発で使った環境を、そのまま今回の標準環境と考えないようにしましょう。

### インストーラのダウンロードと実行

[Node.jsの公式ダウンロードページ](https://nodejs.org/en/download)で **24 系列、Windows、使用するPCのCPUに対応するもの** を選び、Windows用インストーラ (`.msi`) をダウンロードしてください。一般的なIntel/AMDのPCでは `x64` を選びます。ARMのPCでは `ARM64` なので注意してください。

インストーラを実行し、基本的には標準の設定で進めてください。Node.jsとnpmをインストールします。追加のネイティブモジュール用ビルドツールは、今回の演習では必要ありません。インストール後、**開いていたVSCodeとターミナルを開きなおしてください**。

<!-- 撮影予定: nodejs_01.png。旧画像はv20を示すため一時的に非表示。Windows用24系列の選択画面を撮り直す。 -->

### インストールできたことの確認

PowerShellで、次のコマンドを実行してください。以降のコードブロックには、基本的に **入力するコマンドだけ** を記載します。

```powershell
node -v
npm -v
where.exe node
```

確認した環境では、それぞれ `v24.21.0`、`11.9.0`、Node.jsの実行ファイルのパスが表示されます。npmはまずNode.jsに付属する版を使い、この段階で無条件に最新版へ更新しないでください。通常のインストーラで導入した場合、パスは `C:\Program Files\nodejs\node.exe` のようになります。

`where.exe node` は <span class="masked">コマンドとして実行されるNode.jsが、どこにあるか</span> を調べるためのものです。見つからない場合はターミナルを開きなおし、インストール状態を確認してください。複数のパスが出る場合は、以前の環境やバージョン管理ツールが関係していないか確認します。原因を確認せずに、既存のツールを次々に削除しないでください。

<div class="note type-caution">
**PowerShellで npm.ps1 の実行が拒否される場合**

「このシステムではスクリプトの実行が無効になっている」のようなエラーの場合は、まず `npm.cmd -v` を試してください。以降も `npm` を `npm.cmd`、`npx` を `npx.cmd` に読み替えることで、PowerShellの実行ポリシーを変更せずに進められます。`node` はそのままです。

「コマンドが見つからない」「ファイルが見つからない」は別の原因です。**エラーメッセージを読んで、何が失敗しているかを区別**しましょう。
</div>

## TypeScriptの基礎学習のための環境構築

### プロジェクトフォルダと作業位置

適切な位置 (**OneDrive管理下はお勧めしません**) に `ts-playground` というフォルダを作成して、VSCodeで **そのフォルダ自体** を開いてください。次回以降も使用するプロジェクトです。

例えば、作業用の親フォルダでターミナルを開いている場合、次のように操作できます。

```powershell
mkdir ts-playground
cd ts-playground
code .
```

ここで `.` は <span class="masked">現在の作業フォルダ (カレントフォルダ)</span> を意味します。`code` コマンドが使えない場合は、VSCodeの「ファイル」→「フォルダーを開く」から開いてください。

VSCodeのエクスプローラーの最上位が **TS-PLAYGROUND** になっていることを確認してください。この最上位のフォルダを、以降 **プロジェクトのルート** と呼びます。PCのドライブのルートとは異なります。

VSCodeの「ターミナル」→「新しいターミナル」でPowerShellを開き、作業位置を確認してください。

```powershell
Get-Location
Get-ChildItem
```

以降、特に断りがない限り、**コマンドはプロジェクトのルートで実行**します。エディタで開いているファイルの場所と、ターミナルの作業位置は同じとは限りません (初心者がよく混乱するところです)。

<!-- 撮影予定: vscode_01.png。ルートフォルダとターミナルの作業位置を示す。 -->

### npm とローカルインストール

**npm** は、開発に使用するパッケージ (ライブラリやツール) を管理するものです。Pythonでの <span class="masked">pip</span> に近い役割があります。

まず、プロジェクトのルートで次を実行してください。

```powershell
npm init -y
npm install -D --save-exact typescript@6.0.3 @types/node@24.13.6
```

- `npm init -y` : プロジェクトの情報を記録する **`package.json`** を、標準的な内容で作成します。
- `install` (省略形は `i`) : パッケージをインストールします。ダウンロード時にはインターネット接続が必要です。
- `-D` (`--save-dev`) : 開発用の依存関係として `devDependencies` に記録します。
- `--save-exact` : `package.json` に、バージョンの範囲ではなく **指定したバージョンそのもの** を記録します。
- `@6.0.3` : 導入するバージョンの指定です。今回は、授業で確認した組合せを使用します。

この操作は **ローカルインストール** です。`-g` を付けるグローバルインストールとは異なり、パッケージの本体は <span class="masked">このプロジェクトの `node_modules` フォルダ</span> に入ります。TypeScriptをグローバルにインストールする必要はありません。

作成されたファイル・フォルダを、VSCodeで確認してください。

| 名前 | 役割 |
| :--- | :--- |
| `package.json` | プロジェクトの情報、直接使用するパッケージとバージョン指定、実行コマンドなど |
| `package-lock.json` | 間接的に必要となるものも含め、実際に導入したパッケージのバージョンなどを記録 |
| `node_modules` | インストールされたパッケージの本体 |

`node_modules` の内部や `package-lock.json` を、手作業で書き換える必要はありません。`package.json` は、次のように編集することがあります。

### package.json の設定

`package.json` を、次の内容にしてください。今回は最小限の構成にそろえます。

```json{.numberLines caption="package.json"}
{
  "name": "ts-playground",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "devDependencies": {
    "@types/node": "24.13.6",
    "typescript": "6.0.3"
  }
}
```

`"private": true` は、誤ってこのプロジェクトを **npmのパッケージとして公開** しないための設定です。GitHubの公開・非公開の設定とは関係ありません。

`"type": "module"` は、このプロジェクト内の `.js` ファイルを **ES Modules** として扱うための設定です。今後、ファイルを分けたプログラムで `import` / `export` を使います。詳しい構文は、そのときに学習します。

ここで、導入したTypeScriptを確認します。

```powershell
npx tsc --version
npm list --depth=0
```

`Version 6.0.3` が表示されることと、2つのパッケージが指定したバージョンで入っていることを確認してください。**`npx tsc` は、このプロジェクトに入れたTypeScriptのコマンドを呼び出す**ために使用します。

<div class="note type-caution">
**npxで、追加インストールの確認が表示されたら**

この手順では、使うツールを先にローカルインストールします。`npx tsc` などで別のパッケージのインストールを求められたら、そのまま同意せず、作業フォルダと `npm list --depth=0` の結果を確認してください。`npx` には、ローカルにないパッケージを取得して実行する機能もあるためです。
</div>

### TypeScriptの設定

プロジェクトのルートで、設定の雛形を作成します。

```powershell
npx tsc --init
```

作成された **`tsconfig.json`** を開いてください。これは <span class="masked">TypeScriptの型チェックや、JavaScriptへの変換方法</span> を指定するファイルです。雛形の全項目を今すぐ覚える必要はありません。今回は、内容を次に置き換えて保存します。

```json{.numberLines caption="tsconfig.json"}
{
  "compilerOptions": {
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "NodeNext",
    "moduleDetection": "force",
    "rootDir": "./src",
    "outDir": "./dist",
    "types": ["node"],
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "verbatimModuleSyntax": true,
    "noEmitOnError": true,
    "sourceMap": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts"]
}
```

最初に理解してほしい項目は、次のとおりです。

- `rootDir` : ソースファイルの配置の基準を `src` にします。
- `outDir` : 生成したJavaScriptを `dist` に出力します。例えば `src/foo/bar.ts` は <span class="masked">`dist/foo/bar.js`</span> になります。`dist` は distribution に由来する、生成物の置き場所によく使われる名前です。
- `include` : 今回は `src` 内の `.ts` ファイルを対象にします。`**` はサブフォルダも対象とする指定です。
- `types` : Node.jsの型情報を読み込みます。**TypeScript 6.0では、この項目を省略してもNode.jsの型情報が自動で追加されるわけではありません**。
- `strict` : 厳密な型チェックを有効にします。
- `noEmitOnError` : 型などにエラーがあるとき、新しいJSファイルを出力しません。ただし、以前に生成したJSを削除する設定ではありません。

`target` は変換先のJavaScriptの仕様、`lib` は型チェックで利用する標準APIの型情報を指定します。今回はNode.js 24で実行するための設定です。`module` と `package.json` の `type` は、ファイル間の読み込み方式に関係します。`sourceMap` は元のTSと生成したJSの対応情報を出力する設定です。

`tsconfig.json` はコメントも書けるJSON形式ですが、通常の `package.json` にはコメントを書けません。項目と項目の間のカンマにも注意してください。

ルートに **`src` フォルダを作成**してください。まだ `.ts` ファイルがないため「入力ファイルがない」という診断が出る場合がありますが、次のファイルを作成した後に確認します。`dist` はコンパイル時に自動作成されます。

### TSファイルの作成と、JSファイルへの変換・実行

`src` に `prac00.ts` を作成し、次のプログラムを記述して保存してください。

```typescript{.numberLines caption="src/prac00.ts"}
function greetAndCalculate(name: string, a: number, b: number): string {
  const sum: number = a + b;
  return `Hello, ${name}! The sum of ${a} and ${b} is ${sum}.`;
}

const userName: string = "Alice";
const x: number = 10;
const y: number = 20;

const result: string = greetAndCalculate(userName, x, y);
console.log(result);
```

ルートで次を実行します。

```powershell
npx tsc
```

この場合、`tsconfig.json` に従って変換します。**ファイル名は付けません**。TypeScript 6.0では、設定ファイルのある場所で `npx tsc src/prac00.ts` とすると、設定を無視する指定になっている旨のエラーになります。

`dist/prac00.js` を開き、元のTSと比較してください。**型の注釈がどうなったか**を確認しましょう。`.js.map` は元のソースとの対応情報です。設定に応じて `export {};` が付くこともあります。

つづいて、生成されたJavaScriptを実行します。

```powershell
node dist/prac00.js
```

```text
Hello, Alice! The sum of 10 and 20 is 30.
```

**「変換するコマンド」と「実行するコマンド」は別**です。ここを曖昧にしないでください。

#### 演習 (目標時間: 3分)

`src/prac00.ts` の `x` を `11` に変更して保存してください。そのまま `node dist/prac00.js` を実行すると、結果は変わるでしょうか。予想してから確認してください。

次に `npx tsc`、`node dist/prac00.js` の順に実行してください。先ほどとの違いを説明できますか。確認後は `x` を `10` に戻し、再度コンパイルしてください。

### VSCodeで使用するTypeScriptをそろえる

VSCodeにはTypeScriptの編集機能がありますが、**エディタで診断に使うTypeScriptと、ターミナルから呼ぶTypeScriptは別々に選択される**ことがあります。同じコードについて結果が食い違わないように設定します。

少し分かりにくいところですが、ここまでに `npm` でTypeScriptをインストールしただけでは、**VSCodeの編集機能まで、そのTypeScriptに切り替わるとは限りません**。

| TypeScriptを使う場面 | 使用するもの |
| :--- | :--- |
| ターミナルで `npx tsc` を実行する | このプロジェクトにインストールしたTypeScript 6.0.3 |
| VSCodeでコードを編集し、補完候補や赤い波線を表示する | VSCodeの編集機能で選択されているTypeScript。標準ではVSCodeに付属する版 |

バージョンが異なると、例えば **「ターミナルでは型チェックに通るのに、エディタでは赤い波線が出る」**、あるいはその逆が起こる場合があります。利用できる構文や設定項目、型の判定がバージョンによって変わるためです。

未設定なら必ずエラーになるわけではありません。簡単なコードでは違いが出ず、気づかないこともあります。ここでは、編集時とコマンド実行時で <span class="masked">同じバージョンのTypeScriptを使い、診断の基準をそろえる</span> ために設定します。

ルートに `.vscode` フォルダを作成し、その中に `settings.json` を作成してください。

```json{.numberLines caption=".vscode/settings.json"}
{
  "js/ts.tsdk.path": "./node_modules/typescript/lib",
  "js/ts.tsdk.promptToUseWorkspaceVersion": true
}
```

`js/ts.tsdk.path` は **使用したいTypeScriptの場所**、`js/ts.tsdk.promptToUseWorkspaceVersion` は **そのワークスペース版を使うか確認する案内を有効にする設定**です。後者の `true` 自体が「ワークスペース版を選択済み」という意味ではありません。

**先に `settings.json` から `src/prac00.ts` のタブへ切り替え、コード部分をクリックしてください。JSONファイルを開いたままでは、次のTypeScript用コマンドは表示されません。**

`src/prac00.ts` を開いた状態で `[Ctrl]+[Shift]+[P]` から **「TypeScript: Select TypeScript Version」(TypeScriptのバージョンを選択)** を実行し、**「Use Workspace Version」(ワークスペースのバージョンを使用)** を選択します。**6.0.3** であることを確認してください。設定ファイルを置いただけで、選択まで済んだと思い込まないようにしましょう。

#### 設定できたことの確認

**エラーが表示されないことだけでは、同じバージョンを使っている証拠にはなりません**。次の2か所を照合してください。

1. プロジェクトのルートのターミナルで `npx tsc --version` を実行し、**`Version 6.0.3`** と表示されることを確認します。これはコマンド側の確認です。
2. `prac00.ts` を開き、もう一度 **「TypeScript: Select TypeScript Version」** を開きます。現在選択されている項目には **先頭に丸印 (`•`)** が付きます。丸印が付いた **「Use Workspace Version」** のバージョンが **6.0.3**、場所がプロジェクト内の `node_modules/typescript/lib` であることを確認してください。確認後は `[Esc]` で閉じて構いません。

両方のバージョンが一致したら、`npx tsc --noEmit` で型チェックし、VSCodeの `[Ctrl]+[Shift]+[M]` で「問題」パネルも確認します。現在の `prac00.ts` と設定ファイルにエラーが残っていないことを確かめてください。`--noEmit` は、JSを出力せずにチェックだけを行なう指定です。

TypeScript 7用の拡張機能などを既に使用している場合は、このワークスペースでは無効にして、標準のTypeScript編集機能で6.0.3を選んでください。選択できない場合は、ルートフォルダ、パッケージの導入、VSCodeの組み込み「TypeScript and JavaScript Language Features」が有効かを確認します。

<div class="note type-tips">
**この操作はファイルを作るたびに必要？**

**同じプロジェクトでは、通常は一度選択すれば十分です**。選択結果はVSCode内部にワークスペース単位で保存されるため、新しい `.ts` ファイルを作成するたびに選び直す必要はありません。同じフォルダを開き直したときも維持されます。

`settings.json` にはTypeScriptの場所などを記録しますが、「ワークスペース版を使う」という選択自体はVSCode内部に保存されます。そのため、**別のプロジェクトや別のPCで開くときは、選択を改めて確認**してください。
</div>

<!-- 撮影予定: TypeScriptのワークスペース版6.0.3の選択、および「問題」パネル。 -->

## 開発を効率的に行なうための設定

### tsx と Vitest の追加

ルートで、次を実行してください。

```powershell
npm install -D --save-exact tsx@4.23.15 vitest@5.0.1 vite@8.3.0
```

**tsx** は、TypeScriptの変換と実行をまとめて行なうツールです。**Vitest** は、期待したとおりにプログラムが動くかを、自動的に確認するためのツールです。どちらも、このプロジェクトの開発用パッケージとして追加します。

Vitestが使用する **Vite** も、確認したバージョンを明示して入れます。今はViteでウェブアプリを作成する操作は必要ありません。

`package.json` に `scripts` を追加し、全体を次の状態にしてください。`devDependencies` は上のインストール操作で追加されます。

```json{.numberLines caption="package.json"}
{
  "name": "ts-playground",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsc",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "test:run": "vitest run"
  },
  "devDependencies": {
    "@types/node": "24.13.6",
    "tsx": "4.23.15",
    "typescript": "6.0.3",
    "vitest": "5.0.1",
    "vite": "8.3.0"
  }
}
```

`scripts` は、よく使うコマンドに名前を付けるための項目です。例えば `npm run build` で `tsc` を実行できます。**npmのスクリプト内では、ローカルに導入したコマンドを使用できるので `npx` は不要**です。

| 操作 | コマンド | 確認・生成するもの |
| :--- | :--- | :--- |
| コンパイル | `npm run build` | 型などを確認し、`dist` にJSを出力 |
| 型チェック | `npm run typecheck` | 型などを確認。JSは出力しない |
| TSの実行 | `npx tsx src/prac00.ts` | 変換して実行。型チェックはしない |
| 自動テスト | `npm run test:run` | テストを1回実行し、結果を表示して終了 |
| テストの監視実行 | `npm test` | 変更を監視し、テストを再実行 |

### TypeScriptの実行と型チェック

次を実行し、先ほどと同じ結果になることを確認してください。

```powershell
npx tsx src/prac00.ts
npm run typecheck
```

`tsx` では、事前に自分でJSファイルを生成する操作を省略できます。ただし、**内部で変換しているのであって、型をそのまま実行しているわけではありません。また、tsx自身は型チェックを行ないません**。

`npm run typecheck` は、問題がなければスクリプト名やコマンドの表示だけで終了します。「何もエラーが出なかった」ことを確認してください。

#### 演習 (目標時間: 3分)

`prac00.ts` の `const x: number = 10;` を、一時的に `const x: number = "10";` に変えて保存してください。

- VSCodeは、どこに何を指摘するでしょうか。
- `npm run typecheck` と `npx tsx src/prac00.ts` は、それぞれどうなるでしょうか。

予想してから実行してください。型チェックではエラーになり、tsxでは実行されて、数値の加算とは異なる結果になります。**実行できたことと、型が正しいことは別**だと確認できたら、`10` に戻し、型チェックとビルドをやり直してください。

ファイルを保存するたびに通常のプログラムを再実行したい場合は、次を使います。

```powershell
npx tsx watch src/prac00.ts
```

終了は `[Ctrl]+[C]` です。これは変更監視による **再実行** です。後で扱うブラウザ画面の更新などと区別しておきましょう。

### VSCodeから現在のTSファイルを実行

`.vscode/tasks.json` を次の内容で作成してください。ターミナルでの実行方法を確認してから、ショートカットも使えるようにします。

```json{.numberLines caption=".vscode/tasks.json"}
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Run Current TypeScript File",
      "type": "shell",
      "command": "npx.cmd",
      "args": ["tsx", "${file}"],
      "options": {
        "cwd": "${workspaceFolder}"
      },
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "presentation": {
        "reveal": "always",
        "panel": "dedicated",
        "echo": true
      },
      "problemMatcher": []
    }
  ]
}
```

`src/prac00.ts` を開いて **保存してから** `[Ctrl]+[Shift]+[B]` を押してください。今回はビルド用のショートカットに、tsxによる実行を割り当てています。型チェックや `dist` への出力は行ないません。

`${file}` は開いているファイルのパス、`${workspaceFolder}` はプロジェクトのルートです。JSONなど別のファイルを開いていると、そのファイルが実行対象になってしまうので注意してください。後で作る **`.test.ts` はこのショートカットで実行せず、Vitestで実行**します。

### Vitest と VSCode拡張機能の動作確認

まずは、**テストツールが動く環境になっていること**を確認します。テストを使って設計・実装を進める練習は、その後に行ないます。

ルートに **`vitest.config.js`** を作成してください。これはVitest専用の設定ファイルで、今回はJavaScriptで記述します。

```javascript{.numberLines caption="vitest.config.js"}
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
});
```

`include` で **`src` 内の `.test.ts` だけをテスト対象** にします。`environment` はテストするコードをNode.jsの環境で動かす指定です。`tsconfig.json` の `include` はTypeScriptの対象、こちらの `include` はVitestの対象であり、役割が違います。

`src` に `environment.test.ts` を作成してください。

```typescript{.numberLines caption="src/environment.test.ts"}
import { expect, test } from "vitest";

test("10と20の合計が30になる", () => {
  expect(10 + 20).toBe(30);
});
```

`test` はテストの名前と処理を登録し、`expect(...).toBe(...)` は <span class="masked">実際の値が、期待した値と一致するか</span> を確認します。`import` や `() => { ... }` の詳しい構文は後で学びますが、ここでは「テスト名」「実際の値」「期待値」がどれかを確認してください。

ルートで、次の2つを実行します。

```powershell
npm run typecheck
npm run test:run
```

型チェックでエラーがなく、テスト結果に **1つのファイル・1つのテストの成功** が表示されれば、コマンド側の準備はできています。Vitestは `.test.ts` などをテストとして検出します。今回はテストも `src` に置くので、TypeScriptの型チェックの対象にもなります。

この構成では `npm run build` によってテスト用のJSも `dist` に出力されます。**上の設定でテスト対象を限定するため、元のテストと生成物が二重に実行されることを防げます**。テスト用のJSを `node` で直接実行する必要もありません。

つづいて、VSCodeの拡張機能から **[Vitest](https://marketplace.visualstudio.com/items?itemName=vitest.explorer) (識別子: `vitest.explorer`)** をインストールしてください。**npmで入れるVitest本体と、VSCodeの拡張機能は別**です。拡張機能だけを入れても、このプロジェクトにVitest本体が導入されるわけではありません。

1. VSCodeで `ts-playground` を開いた状態で、左側の **テスト (Testing)** ビューを開いてください。
2. `environment.test.ts` と、その中のテストが表示されることを確認してください。表示されない場合はテストの更新 (Refresh Tests) を試してください。
3. テスト横の実行ボタンから実行し、成功することを確認してください。
4. 期待値だけを `30` から `31` に変えて保存し、再実行してください。**失敗になり、期待値と実際の値の違いを確認できること**を確かめます。
5. `30` に戻して保存し、再実行して成功に戻してください。
6. 継続実行 (Continuous Run) を有効にし、同じ変更・保存で結果が更新されることも確認します。終わったら停止してください。

意図的に失敗させるのは、**間違いがある場合に、実際にテストが知らせてくれること**まで確認するためです。期待値を変えて失敗を作る操作は、ここではツールの動作確認のために行なっています。普段の開発で、テストを通すためだけに期待値を都合よく変えてはいけません。

<!-- 撮影予定: Vitest拡張の導入、テスト一覧、成功、期待値と実際の値の差、継続実行。 -->

<div class="note type-caution">
**テストが見つからない・実行できないとき**

最初に、ターミナルで `npm run test:run` が成功するか確認してください。こちらも失敗するなら、まずパッケージ、ファイル名、保存、作業フォルダを調べます。コマンドでは成功するのにVSCodeだけ失敗する場合は、開いたフォルダ、拡張機能が有効か、ワークスペースの信頼状態を確認し、「出力」パネルのVitest関連ログを読みます。自分で作成したこのプロジェクトについて信頼を設定してください。

「問題」パネルで赤い波線が出る場合は、TypeScriptの選択バージョンと型チェックも確認してください。**テストの成功と、エディタの型エラーの解消は、両方確認する必要があります**。
</div>

### 環境構築の完了確認

次の状態になっているか確認してください。`node_modules` と `dist` の内部は一部を省略しています。

```text
ts-playground/
├─ .vscode/
│  ├─ settings.json
│  └─ tasks.json
├─ src/
│  ├─ prac00.ts
│  └─ environment.test.ts
├─ dist/                    ← ビルドで生成
├─ node_modules/            ← npmで導入
├─ package.json
├─ package-lock.json
├─ tsconfig.json
└─ vitest.config.js
```

- `npx tsc --version` と、VSCodeが使うTypeScriptが、どちらも **6.0.3**。
- `npm run typecheck` と `npm run build` が成功する。
- `node dist/prac00.js`、`npx tsx src/prac00.ts`、VSCodeのショートカットで、同じ結果が出る。
- `npm run test:run` とVSCodeのテスト実行が成功する。意図的な失敗と、その修正も確認できた。
- 変更したコードを元に戻し、**設定ファイル・TSファイルに赤い波線が残っていない**。

### 練習

コンソールに `Hi, Bob!` と出力するプログラムを **`src/prac00a.ts`** に作成し、実行してください。変数に `Bob` を代入して `console.log()` で文字列を組み立てればOKです。ファイル作成から実行までの操作を、自分で判断して取り組んでください。

- 解答例は[こちら](https://github.com/TakeshiWada1980/Programming3-2025/blob/main/docs/codes/01/prac00a.ts)。

#### 定着確認

- LTSとは何の略語か、英語で答えよ。
  - **答え**: <span class="masked">Long-Term Support</span>
- Node.jsのバージョンを確認するコマンドを答えよ。
  - **答え**: <span class="masked">`node -v`</span>
- `dist/prac00.js` をNode.jsで実行するコマンドを答えよ。作業位置はプロジェクトのルートとする。
  - **答え**: <span class="masked">`node dist/prac00.js`</span>
- パッケージの管理に使用するツールの名前を答えよ。
  - **答え**: <span class="masked">npm</span>
- `npm install` に `-g` を付けない場合、通常はローカルとグローバルのどちらにインストールされるか。
  - **答え**: <span class="masked">ローカル</span>
- ローカルに導入したパッケージの本体が入るフォルダ名を答えよ。
  - **答え**: <span class="masked">`node_modules`</span>
- パッケージの依存関係を記録する2つのファイル名を答えよ。
  - **答え**: <span class="masked">`package.json` と `package-lock.json`</span>
- `npm run` で実行するコマンドを登録するファイルと、その項目名を答えよ。
  - **答え**: <span class="masked">`package.json` の `scripts`</span>
- TypeScriptのコンパイル設定を記述するファイル名と、この資料の設定を使ってJSを生成するコマンドを答えよ。
  - **答え**: <span class="masked">`tsconfig.json`、`npx tsc` (または `npm run build`)</span>
- ローカルに導入済みのtsxで `src/hoge.ts` を実行するコマンドを答えよ。
  - **答え**: <span class="masked">`npx tsx src/hoge.ts`</span>
- `src/hoge.ts` の保存ごとに再実行するコマンドを答えよ。
  - **答え**: <span class="masked">`npx tsx watch src/hoge.ts`</span>
- 「tsxで実行できれば、型チェックも成功している」。この説明は適切か、不適切か。
  - **答え**: <span class="masked">不適切</span>
  - **解説**: <span class="masked">tsx自身は型チェックを行なわない。`npm run typecheck` でも確認する。</span>
- 「VitestのVSCode拡張を入れたので、プロジェクトにVitest本体を入れる必要はない」。この説明は適切か、不適切か。
  - **答え**: <span class="masked">不適切</span>
  - **解説**: <span class="masked">VSCode拡張は操作するための窓口であり、プロジェクトにはnpmでVitest本体を導入する。</span>

### 環境構築の参考資料

- [Node.jsのリリース一覧](https://nodejs.org/en/about/previous-releases)
- [TypeScript 6.0の変更点](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html)
- [VSCodeで使うTypeScriptの選択](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-newer-typescript-versions)
- [tsxと型チェック](https://tsx.hirok.io/typescript)
- [Vitestの導入](https://vitest.dev/guide/)、[VSCode拡張機能](https://marketplace.visualstudio.com/items?itemName=vitest.explorer)

## Git/GitHub管理

ここまで作成してきたプロジェクトフォルダについて**Git管理を有効化**し、さらに GitHub に公開していきます。Git / GitHub 基本設定は既に完了しているものとします。未設定の場合は[PG1の講義資料](https://takeshiwada1980.github.io/Programming1-2025/lecture14.html#gitのダウンロードとインストール設定)を参照して設定してください。


### .gitignore の設定

プロジェクトフォルダのトップ階層に `.gitignore` を作成して `node_modules` フォルダを **Gitの管理対象外** に設定します。`node_modules` には (パッケージのインストール状況によっては) 何千ものファイルが含まれるため、必ず `.gitignore` に含めるようにしてください。

以下のように `.gitignore` を作成して保存してください。

```text{.numberLines caption=".gitignore"}
/node_modules/
/dist/
/.vitest/
```

`dist` は再生成できるビルド結果、`.vitest` はテスト関連の生成物の保存先として使われることがあるため、これらも管理対象外にします。一方、`package.json`、`package-lock.json`、設定ファイル、`src` のコードとテストはGitで管理してください。

<!-- 撮影予定: vscode_05.png。新しい環境構築のファイル構成とGit管理対象に合わせる。 -->

現状のプロジェクトフォルダの構成は、前の「環境構築の完了確認」と照合してください。

<!-- 旧構成の画像: figs/01/vscode_05.png。撮り直し後に再掲。 -->

以下の手順で、このプロジェクトフォルダを GitHub に Public なリポジトリとして発行してください。

![img](figs/01/git_01.png)

![img](figs/01/git_02.png)

問題なく発行できれば、以下のようにウェブブラウザからリポジトリが確認できるハズです。

![img](figs/01/git_03.png)

あとは、定期的にファイルの変更、ステージング、コミット、プッシュを行なってください。

#### 演習

開発環境の構築は、**一度操作しただけでは理解も定着もしないので (授業時間外に) 再度構築してみてください**。

既存のプロジェクトを残して、別の空フォルダで構築しなおしてください。詳しい操作を見なくても、必要なファイルの配置とコマンド実行を判断できるか確認しましょう。`.git` の削除はGitの履歴・管理情報を消す操作であり、開発環境全体を削除する操作ではありません。

また、作成済みの `package.json` と `package-lock.json` がそろっているプロジェクトでは、`npm ci` によってロックファイルに記録した依存関係を再インストールできます。初回の構築と、記録からの復元の違いも確認してください。`npm ci` は既存の `node_modules` を置き換えますが、ソースコードを削除する操作ではありません。

### 補足： フォーマッタのインストール と おまけ

TypeScript/JavaScript および HTML/CSS の **コード整形 (フォーマット)** のために **Prettier** (識別子: `esbenp.prettier-vscode`) という VSCode の拡張機能をインストールしておいてください。

![img](figs/01/vscode_06.png)

**vscode-pets** (識別子: `tonybaloney.vscode-pets`) は、役に立ちませんがおすすめです。ペットの種類や背景は、VCCodeの設定項目の [ここから](figs/01/vscode_08.png) 変更できます。

![img](figs/01/vscode_07.png)

## モダンTypeScript入門

TypeScript の 開発環境が構築できたので、ここから (本格的には次週の講義から) **モダンTypeScript** について学んでいきます 。

### コンソールメソッド

コンソールメソッドは `console.log("Hello, World!")` のように使用するもので **主にデバッグや開発時の情報出力** に利用します。<span class="masked">Python の `print` 関数、C言語の `printf` 関数</span> に相当するものと考えてください。

コンソールメソッドには `console.log()`、`console.error()`、`console.warn()`、`console.info()`、`console.debug()` などが存在します。これらは、C言語の <span class="masked">`fprintf(stdout, ...)` や `fprintf(stderr, ...)`</span> のように使い分けます。

実行環境によっては、ログレベル (log, error, warn...) に応じて「色分け」や「装飾付き」で出力されたり、フィルタリング機能 (=<span class="masked">特定のレベル以上のメッセージのみを表示する機能</span>) が提供されます。しかし、最初のうちは細かな使い分けは考えずに `console.log()` だけの使用 (もしくは `console.error()` との2つの使い分け) で十分です。

例えば、`name` と `priority` という2つの変数の値を出力したいときは、以下のように <span class="masked">カンマ区切り</span> で記述します (可変長引数としてコンソールメソッドに与えます)。`src/prac01.ts` というファイルを新規作成して、コードを記述し、実際に実行して結果を確認してください。

- プログラムの実行は、ターミナルから `npx tsx src/prac01.ts`、もしくは `[Ctrl]+[Shift]+[B]` のショートカットから行なうことができます (基本操作として覚えておいてください)。

```typescript{.numberLines caption="prac01.ts (コンソールメソッドの基本)"}
// 文字列型 (string type) の変数 name の宣言と初期化
let name: string = "TypeScriptの勉強";
// 数値型 (number type) の変数 priority の宣言と初期化
let priority: number = 3;
console.log(name, priority); // console.log は可変長引数を受け取り可能
```

(すこし分かりづらいですが) 以下のようにスペースで区切られて `name` と `priority` の値が出力されます。

```
TypeScriptの勉強 3
```

#### 演習1 (<i class="fa-solid fa-stopwatch"></i>5分)

`src/prac01.ts` に、次のような Date型 (日付・日時型) の変数 `deadline` を追加して、コンソールメソッドで出力してください。

```typescript{.numberLines caption="Date型の変数"}
// Date型の変数 deadline の宣言と初期化
// 2025年10月2日 14:15 で初期化したつもり
let deadline: Date = new Date(2025, 10, 2, 14, 15);
```

- `new Date(...)` による初期化において、<span class="masked">Month (月) の扱いに注意が必要なこと</span> に気づけたでしょうか？
  - <span class="masked">ゼロオリジンなので `10` を与えると「11月」と解釈されます</span>
- コンソールメソッドに Dateオブジェクトを直接渡したとき、出力される時刻フォーマットが <span class="masked">ISO 8601形式</span> となることが確認できたでしょうか。
  - 生成AIあるいはウェブ検索を利用して [ISO8601形式](https://www.google.com/search?q=ISO8601形式) について概要を把握してください。

<div class="note type-tips">
上記の `prac01.ts` は、次のようなC言語プログラムに相当します。C言語では `型名 変数名 = 初期値;` のように変数宣言しましたが、TypeScriptでは <span class="masked">`変数名 : 型名 = 初期値;`</span> のようにするので注意してください (順番が逆になることに慣れてください)。

```c{.numberLines caption="prac01.c"}
#include <stdio.h>
int main() {
  char name[50] = "TypeScriptの勉強";
  int priority = 3;
  fprintf(stdout, "%s, %d\n", name, priority);
  return 0;
}
```
</div>

### 変数宣言キーワード

TypeScript において、変数宣言のキーワードとしては `let`、`const`、`var` が使用できます。このうち、<span class="masked">`var` の使用は推奨されていません </span>(この背景や理由は「ウェブ検索」もしくは「生成AI」で解決してください)。

**(プロンプト例)**

> モダンTypeScriptでは、変数のキーワードとして `var` の使用は推奨されていない、と聞きました。なぜですか。

また、初期化後、書き換えの予定のない変数 (定数) については `const` を使用してください。

この科目で扱う範囲のウェブアプリ開発では、9割以上の変数は `const` で対応可能です。さきほどの `prac01.ts` においても `name` と `priority` は、初期化以降、書き換えられる予定がないので、以下のように記述することが強く推奨されます (**モダンTypeScript においてコード品質や可読性を高めるためのガイドラインとなっています**)。

```typescript{.numberLines caption="prac01.ts"}
const name: string = "TypeScriptの勉強";
const priority: number = 3;
console.log(name, priority);
```

小テストや課題においても、変更されることがない変数 (定数) については `const` で宣言してください。`let` や `var` による冗長な変数宣言は**誤答または減点**とします。

### テンプレート文字列

TyepScriptにおける「**テンプレート文字列**」とは、Pythonにおける <span class="masked">f文字列</span> に相当するものです。バッククォートで囲んで「`$`マーク」と「波括弧」を組わせて使用します。

テンプレート文字列の使用例を以下に示します。

```typescript{.numberLines caption="prac01.ts (テンプレート文字列の利用)"}
const name: string = "TypeScriptの勉強";
const priority: number = 3;
console.log(`Todo 1 => ${name}（優先度:${priority}）`); // テンプレート文字列
```

以下のような出力が得られます。

```
Todo 1 => TypeScriptの勉強（優先度:3）
```

Pythonとは異なり、`$`マークをつけなければいけない点に、十分に注意してください。

#### 演習2 (<i class="fa-solid fa-stopwatch"></i>10分)

- 生成AIあるいはウェブ検索を利用して、`dayjs` や `moment` などのライブラリを使わずに、Date型オブジェクトを「2025/10/02 14:15」や「2025年10月02日 14時15分」のような書式で出力する方法について**調べて実装**してください。また、実行して、結果を確認してください。

- 実装例は[こちら](https://github.com/TakeshiWada1980/Programming3-2025/blob/main/docs/codes/01/prac01a.ts)。

### オブジェクトのコンソール出力 (1)

ウェブアプリ開発では **複数の変数をオブジェクトにまとめて扱うこと** が非常に多いです。ここでのオブジェクトとは、プログラミング1で「オブジェクト指向プログラミング」を学んだときの「オブジェクト」と同じものです。

- 参考: プログラミング1 [第23回講義](https://takeshiwada1980.github.io/Programming1-2024/lecture23.html#オブジェクト指向プログラミング-超々入門)、[第24回講義](https://takeshiwada1980.github.io/Programming1-2024/lecture24.html)

ただ、TypeScript (特にフロントエンド開発) では クラス は定義・使用せずに **オブジェクトを直接記述してプログラムのなかで使うケース** が多いです。その場合、メソッドを持たないプロパティ(属性)のみで構成されるオブジェクトになることが多いです (その意味では、C言語の「**構造体**」に近いと思います)。

さきほどの `prac01.ts` は、以下のような **オブジェクトリテラル記法** (オブジェクトを直接的に記述する方法) で、以下のように書き換えることができます。

```typescript{.numberLines caption="prac01.ts (テンプレート文字列の利用)"}
const todo = {
  name: "TypeScriptの勉強", // name = "..." ではない点に要注意
  priority: 3, // priority = "..." ではない点に要注意
};
console.log(`Todo 1 => ${todo.name}（優先度:${todo.priority})`);
```

オブジェクトリテラル記法では <span class="masked">`=` ではなく `:` で値を与えること</span> に注意してください (**初心者がよく間違える/混乱するところです**)。

また、オブジェクトのプロパティ (属性、フィールド) には、**第06行目** のようにドット (`.`) を使ってアクセスができます。

### オブジェクトのコンソール出力 (2)

オブジェクト全体を出力したいとき (オブジェクトの内容確認したいとき) は `console.log(todo);` のようにします。例えば、上記の `todo` は以下のように出力されます。

```
{ name: 'TypeScriptの勉強', priority: 3 }
```

ただし、オブジェクトが **多数のプロパティを持つとき** や **配列を含むとき**、`console.log()` にオブジェクトを与えるだけでは非常に見づらくなります。このようなときは `console.log(JSON.stringify(todo, null, 2));` のようにすることで、次のように整形された出力が得られます。

```
{
  "name": "TypeScriptの勉強",
  "priority": 3
}
```

ここで、`JSON.stringify()` は、オブジェクトをJSON文字列 (=<span class="masked">JavaScript Object Notation 文字列</span>) に変換するメソッドです。第1引数にオブジェクトを与え、第2引数を `null`、第3引数を `2` を与えると、上記のように改行とインデント (スペース2文字で字下げ) された文字列を得ることができます。

なお、JSON文字列に変換するとプロパティ (例えば `name` ) が <span class="masked">ダブルクォーテーションで囲まれて出力される</span> など、直接出力した場合と差異があるので注意してください。

#### 定着確認

- 文字列型で「Reactの予習」という値を持った定数 `name` を宣言する文を記述せよ。ここでは、型を明示すること。
    - 答え <span class="masked">`const name: string = "Reactの予習"`</span> 
- 数値型で「2」という値を持った定数 `priority` を宣言する文を記述せよ。ここでは、型を明示すること。
    - 答え <span class="masked">`const priority: number = 2`</span> 
- 上記の `name` と `priority` を使用して `Reactの勉強（優先度:2)` を得るテンプレート文字列を記述せよ。なお、コンソールメソッドで出力する必要はない。
    - 答え <span class="masked">`` `${name}（優先度:${priority})` ``</span> 
- 上記の `name` と `priority` と同様の型を値を持ったプロパティを有する `todo` というオブジェクトを、オブジェクトリテラル記法で記述せよ。
    - 答え <span class="masked">講義資料内の `prac01.ts` を参照してください。</span>
- 上記の `todo` オブジェクトを、タブやインデントで整形された JSON に変換してコンソール出力せよ。
    - 答え <span class="masked">`console.log(JSON.stringify(todo, null, 2));`</span> 
- ウェブアプリ開発の文脈で「JSON」とは何の略語か英語で答えよ。
    - 答え <span class="masked">JavaScript Object Notation</span> 

## 小さなテスト駆動開発を体験する

ここまでで、TypeScriptのプログラムと自動テストを動かす環境ができました。次は、**「どう動いてほしいか」を先にテストで表してから、プログラムを実装する**ことに挑戦します。

これを **テスト駆動開発 (TDD: Test-Driven Development)** と呼びます。基本的には、次のサイクルを小さく繰り返します。

1. **Red** : 期待する動作をテストに書き、まだ実装できていないために **失敗すること** を確認する。
2. **Green** : テストが成功するように、必要な実装をする。
3. **Refactor** : テストの成功を保ちながら、コードの読みやすさなどを改善する。

完成コードを先に貼り付けず、**各段階で予測・実行・確認してから**先へ進んでください。目標時間は **35〜45分** です。途中で調べたり、寄り道したりしても構いません。

### まず、期待する動作を決める

Todoアプリの「優先度」を判定する、小さな関数を作ります。今回は次の仕様にします。

- 関数名は `isValidPriority`。`number` 型の値を1個受け取る。
- 優先度として有効なのは **1〜3の整数**。有効なら `true`、それ以外なら `false` を返す。
- 不適切な値を、勝手に丸めたり範囲内に直したりしない。

例えば、`2` は有効です。では `0`、`3`、`1.5` はどうでしょうか。**コードを書く前に、それぞれの期待する結果を考えてください**。

ここで「範囲外なら `false` を返す」は、私たちが決めた **設計上の判断** です。値を補正する、例外を投げる、といった設計もあり得ますが、この関数では判定結果を返します。画面にエラーメッセージを出す処理などは、呼び出す側の役割として分けておきます。

### 関数とテストを別のファイルに置く

`ts-playground` の `src` に、次の **2つのファイル** を作成してください。既存の `environment.test.ts` は、そのまま残して構いません。

```text
ts-playground/
└─ src/
   ├─ priority.ts       ← 判定する関数
   └─ priority.test.ts  ← その関数のテスト
```

まず `priority.ts` に、関数の名前・引数・戻り値だけを用意します。中身はまだ未完成で、何を渡しても `false` を返します。

```typescript{.numberLines caption="src/priority.ts (仮の実装)"}
export function isValidPriority(value: number): boolean {
  return false;
}
```

- `value: number` : 数値を1個受け取る。
- `): boolean` : 戻り値の型は <span class="masked">真偽値 (`true` または `false`)</span>。
- `export` : この関数を、別のファイルから利用できるようにする。

PythonやC言語で学んだ「引数を受け取って、値を返す関数」と同じ考え方です。TypeScriptの関数の詳しい書き方は、今後の講義でも扱います。

次に、**「2を渡すとtrueになる」** というテストを `priority.test.ts` に書きます。

```typescript{.numberLines caption="src/priority.test.ts (最初のテスト)"}
import { expect, test } from "vitest";
import { isValidPriority } from "./priority.js";

test("優先度2は有効", () => {
  expect(isValidPriority(2)).toBe(true);
});
```

`import` は別のファイルやパッケージから機能を読み込む文です。ここでは、Vitestの機能と、自分で定義した関数を読み込んでいます。

<div class="note type-tips">
**priority.ts を作ったのに、importでは priority.js？**

今回の `NodeNext` の設定では、JSへ変換した後にNode.jsが読み込むファイル名に合わせて、**相対importに `.js` を書きます**。TypeScriptは型チェック時に対応する `priority.ts` を参照でき、Vitestでもこの構成でテストできます。`src` に `priority.js` を手作業で作る必要はありません。
</div>

`test("名前", () => { ... })` の `() => { ... }` は、**テスト実行時に行なう処理を、関数として渡す書き方**です。今回は、この内側に確認したい処理を書きます。

### Red：意図した理由で失敗することを確認

VSCodeのテストビューから `priority.test.ts` のテストを実行してください。ターミナルでは、プロジェクトのルートで次を実行できます。

```powershell
npm run test:run -- src/priority.test.ts
```

`--` より後ろは、npmからテストツールに渡す引数です。ここでは、今回のファイルだけを対象にします。テストは **`Ctrl+Shift+B` やtsxではなく、Vitestで実行**してください。

結果は **1件失敗** となり、期待値 (`Expected`) が `true`、実際の値 (`Received`) が `false` と表示されるはずです。

これは、テストが動作し、**未完成の関数が仕様を満たしていないことを検出できた**という状態です。「ファイルが見つからない」「構文エラーで起動できない」は、ここで確認したい失敗とは異なります。失敗したという表示だけで満足せず、**失敗の理由を読んでください**。

### Green：まず1件を成功させる

`priority.ts` を次のように変更して保存し、同じテストを再実行してください。

```typescript{.numberLines caption="src/priority.ts (最初の成功)"}
export function isValidPriority(value: number): boolean {
  return true;
}
```

**1件成功** になりました。ただし、この実装が「1〜3の整数だけを有効とする」という仕様を満たしていないことは分かりますね🤔

ここでは、テストを小さく始めるために、意図的に単純な実装にしています。**テストが成功しても、まだテストしていない条件については何も確認できていません**。

#### 定着確認

- 「2を渡すとtrueになる」というテストが成功した。この結果から、0や4を渡した場合の動作も正しいと判断できる。この説明は適切か、不適切か。
  - **答え**: <span class="masked">不適切</span>
  - **解説**: <span class="masked">確認したのは2に対する結果だけ。常にtrueを返す関数でも、そのテストは成功する。</span>

### 境界と、その外側をテストする

有効範囲の端に当たる `1` と `3`、その外側の `0` と `4` についても確認します。このように、条件が切り替わる境目を意識して調べることが重要です。

**今あるテストを消さずに**、`priority.test.ts` の末尾へ次を追加してください。

```typescript{.numberLines caption="src/priority.test.ts (境界のテストを追記)"}
test("下限の1は有効", () => {
  expect(isValidPriority(1)).toBe(true);
});

test("上限の3は有効", () => {
  expect(isValidPriority(3)).toBe(true);
});

test("下限より小さい0は無効", () => {
  expect(isValidPriority(0)).toBe(false);
});

test("上限より大きい4は無効", () => {
  expect(isValidPriority(4)).toBe(false);
});
```

現在の実装で、どのテストが失敗するかを予測してから実行してください。**3件成功・2件失敗** になるはずです。

次に、関数を **1以上かつ3以下の場合にtrueを返す** ように変更してみてください。`&&` はC言語と同じ「かつ」で、Pythonの `and` に相当します。

取り組んでから、次の実装例と比較してください。

```typescript{.numberLines caption="src/priority.ts (範囲の判定)"}
export function isValidPriority(value: number): boolean {
  return value >= 1 && value <= 3;
}
```

これで **5件成功** になります。ここで、仕様をもう一度読み直してください。**まだ確認していない条件はありませんか？**

### 数値型なら、適切な入力なのか？

仕様は「1〜3の **整数**」でした。`number` 型では、`1.5` のような小数も扱えます。したがって <span class="masked">型チェックに通ることと、用途に適した値であること</span> は同じではありません。

まず、実装には触れずに次のテストを追加してください。

```typescript{.numberLines caption="src/priority.test.ts (小数のテストを追記)"}
test("範囲内でも小数の1.5は無効", () => {
  expect(isValidPriority(1.5)).toBe(false);
});
```

実行して、**5件成功・1件失敗** となることを確認してください。失敗を確認したら、整数かどうかも調べるように関数を変更します。

整数の判定には **`Number.isInteger(value)`** が使えます。整数なら `true`、そうでなければ `false` を返します。例えば `Number.isInteger(2)` は `true`、`Number.isInteger(1.5)` は `false` です。

```typescript{.numberLines caption="src/priority.ts (整数の判定を追加)"}
export function isValidPriority(value: number): boolean {
  if (!Number.isInteger(value)) {
    return false;
  }
  return value >= 1 && value <= 3;
}
```

`!` はC言語と同じ否定で、Pythonの `not` に相当します。整数でなければ先に `false` を返し、整数の場合に範囲を判定しています。保存して再実行し、**6件成功** に戻ることを確認してください。

### Refactor：動作を保ってコードを整理する

今の関数は、次のように「整数である」「1以上」「3以下」という条件をまとめることもできます。

```typescript{.numberLines caption="src/priority.ts (整理後)"}
export function isValidPriority(value: number): boolean {
  return Number.isInteger(value) && value >= 1 && value <= 3;
}
```

この変更では **仕様も、テストの期待値も変えません**。保存後、6件が引き続き成功することを確認してください。確認済みの動作を壊していないか、すぐに調べられるのが自動テストの利点です。なお、行数が短ければ必ず良いというわけではなく、読みやすさも判断してください。

最後に、次を実行します。

```powershell
npm run typecheck
npm run build
npm run test:run
```

`environment.test.ts` を残しており、他にテストを追加していなければ、最後の結果は **2ファイル・7件成功** になります。VSCodeの「問題」パネルにもエラーが残っていないことを確認してください。

### 演習3：テストが見逃す条件を考える (目標時間: 5分)

関数の `value <= 3` を、一時的に `value < 3` に変えたら、どのテストが失敗するでしょうか。予想を書いてから、実際に変更・保存・実行して確かめてください。確認後は元に戻し、すべて成功することを確認します。

もしテストが `2` と `1.5` の2つしかなかったら、この間違いに気づけるでしょうか。**テストの数だけでなく、どんな条件を選んだかが重要**だと説明できるようになってください。

余裕があれば、負の数や別の小数など、自分で入力を選んでテストを追加してください。期待値を決めた理由も説明してください。

### AIのコードを評価するときにも使う

AIが `return value >= 1 && value <= 3;` というコードを提案したとします。ぱっと見では正しそうでも、「整数」という条件が抜けています。**人間が仕様を読み、見落としそうな条件を選んで検証すること**が大切です。

AIに相談するときも、先に「入力」「期待する結果」「その理由」を自分で考えてください。例えば、次のように使えます。

> 優先度として1〜3の整数だけを受け付ける関数を作っています。私が考えたテスト入力と期待値は以下のとおりです。見落としている条件があれば、完成コードを出さずに質問してください。

失敗したときは、実装の誤りだけでなく **テストの期待値や仕様の解釈が誤っていないか** も調べます。ただ緑色の成功表示にするために期待値を変更するのではなく、仕様に立ち戻って判断してください。

今回扱ったのは、`number` 型の値を受け取る小さな関数です。ユーザー入力や外部データでは、文字列や未入力なども考慮が必要になります。**外部から来た値が、型注釈を書くだけで自動検証されるわけではありません**。そのような入力の検証や、通信・保存の失敗時の振る舞いは、今後の開発で段階的に扱います。

#### 定着確認

- TDDでは、これから実装する動作のテストを先に書き、意図した理由で失敗することを確認する。この説明は適切か、不適切か。
  - **答え**: <span class="masked">適切</span>
- この関数に `number` 型を指定しても、1.5が渡されることを型チェックだけでは防げない。その理由を答えよ。
  - **答え**: <span class="masked">number型は整数だけでなく、小数も扱うため。</span>
- 優先度の下限と上限、およびそれぞれのすぐ外側として、今回使った整数を答えよ。
  - **答え**: <span class="masked">下限1・上限3、範囲外の0・4。</span>
- `value <= 3` を `value < 3` に誤って変更した場合、今回のどの入力のテストが失敗するか。
  - **答え**: <span class="masked">3を入力する「上限の3は有効」のテスト。</span>
- Refactorの段階では、実装に合わせてテストの期待値も変更する。この説明は適切か、不適切か。
  - **答え**: <span class="masked">不適切</span>
  - **解説**: <span class="masked">期待する動作は維持し、コードの構造などを改善する。今回の整理では期待値を変えない。</span>
- 不適切な優先度を渡した場合に、今回の関数はプログラムを停止させるか、それとも何かを返すか。
  - **答え**: <span class="masked">falseを返す。停止させたり、値を補正したりはしない設計。</span>
- AIが実装とテストの両方を作り、そのテストが全て成功すれば、仕様の見落としはないと判断できる。この説明は適切か、不適切か。
  - **答え**: <span class="masked">不適切</span>
  - **解説**: <span class="masked">実装とテストの両方が同じ条件を見落としている可能性がある。仕様と照合し、確認する条件や期待値を評価する必要がある。</span>

- 参考: [Vitestのtest](https://vitest.dev/api/test)、[Number.isInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)

<!-- 撮影予定: priority.test.tsのRed、Green、境界テストの失敗、継続実行、最後の2ファイル7件成功。 -->

## 授業時間外学習

- 本科目は「**学修単位科目**」です。今回の講義内容 +アルファ に関して **4時間相当の授業時間外学習** に取り組んでください。疑問点や不明点などを「生成AI」で調べて深堀したり、C言語やPythonプログラムを TypeScript に移植したりすることをお勧めします。
    - 何を学べばよいか分からない人は[モダンTypeScript入門](https://www.youtube.com/results?search_query=モダンTypeScript入門) などのキーワードで「ウェブ検索」や「YouTube検索」して、それを勉強してください。
    - 参考: [サバイバルTypeScript](https://typescriptbook.jp/) TypeScript の入門ページです。
- 次回の授業のはじめに「**小テスト**」を実施します。主に「定着確認」から出題します。筆記用具を持参してください。
