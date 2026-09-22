---
var:
  header-title: "2026-3I プログラミング3 第01回 講義資料"
  header-date: "2026年09月25日（金）1時限"
---


# 第01回 3I-プログラミング3 (2026)

## ガイダンス

### 概要

本科目では[Next.js](https://www.google.com/search?q=Next.js)をフレームワークとした「**ウェブアプリ開発**」を実践形式で学び、実際にオリジナルの**ブログシステム** (ログイン機能、記事の閲覧と投稿機能を持つもの) をゼロから開発、デプロイ・公開することができる知識とスキルの修得を目標としています。


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

`prac00.ts` という TypeScriptプログラム があるとき、`tsc --target es6 prac00.ts` というコマンドで `prac00.js` という JavaScriptプログラム に変換できます。今回の授業後半で開発環境が構築できたら、実際にトランスパイルをしてもらいます。

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

理由はさておき、**React や Next.js を使用したウェブウェブアプリの開発 (TyepScript から JavaScriptへの変換を含む) には Node.js 環境が事実上必須である** ことが分かったと思います。

ここでは、Windows PC に Node.js をインストールする手順について示します。なお、この講義資料に記載するプログラムは `Node.js v24 (LTS)` で動作確認をしています。特段の理由がない限り `v24` のバージョンを使用してください。

- v24 は、2025年10月28日から「Active LTS」に移行し、2028年4月30日 までサポートが予定されています。**LTS** は <span class="masked">long-term support</span> の略語で「長期サポート」を意味します。
- 既に Node.js をPCにインストール済みの場合、`v20`、`v22` を引き続き利用しても問題ありません。

なお、既に Node.js をインストール済みの場合、再インストールする必要はありません。

### インストーラのダウンロード

Node.js の公式ページ ([https://nodejs.org/en/download/prebuilt-installer](https://nodejs.org/en/download/prebuilt-installer)) から Node.js の ***v24*** をダウンロードしてインストールしてください。

![img](figs/01//nodejs_01.png)

2025年9月25日現在、Node.js v24 系列の最新リリースは `v24.8.0` です。もし、**より新しいマイナーバージョンが公開されている場合**は、そちらを利用してください。また、講義資料に記載されているバージョン番号を読み替えてください。

### インストーラの実行

ダウンロードしたインストーラ `node-v24.8.0-x64.msi` を実行してください。インストーラからの要求があれば管理者権限を与えてください。**インストールに関する設定は「全てデフォルトのまま」で問題ありません (特に変更必要とする項目はありません)**。

### インストールできたことの確認

PowerShell から以下のコマンドを実行し「**Node.js が問題なくインストールされていること**」「**Node.js に パス (path) が通っていること**」を確認してください。コマンドプロンプト (cmd) を使用すると、一部の操作やレスポンスが違ってくるので注意してください。

```
PS C:\Users\xxxx> node -v
v24.8.0
```

なお、以下のコマンドで node のパス (=<span class="masked">Node.jsの本体が配置されているフォルダ位置</span>) が確認できます。

```
PS C:\Users\xxxx> where.exe node
C:\Program Files\nodejs\node.exe
```

## npm 関連の初期設定

Node.js では「**npm (Node Package Manager)**」というツール使ってパッケージ (ライブラリ) の管理をします。ここでのパッケージとは「**JavaScript でアプリの開発するために使用する各種ライブラリのこと**」と考えてください。なお、パッケージは、ウェブ経由で取得するので npm を実行するときにはインターネットに接続している必要があります。

Node.js における npm は、Python における<span class="masked"> pip のようなもの</span> と考えてください。

### npm のバージョンアップ

次のコマンドで、グローバル環境での npm の最新版へのアップグレードと、そのバージョン確認を実行してください。
2025年9月25日現在、npm の最新リリースは `11.6.1` です。

```
PS C:\Users\xxxx> npm install -g npm
PS C:\Users\xxxx> npm -v
11.6.1
```

ここで `npm install` は、npmパッケージをインストールするコマンドです。`-g` オプションは「**グローバル環境**」を指定しています。上記のコマンドは複数回実行しても問題ありません。

なお、グローバル環境には **最低限のパッケージだけをインストールすることが推奨** されます。個別の開発で必要なパッケージは、後述する方法でプロジェクトフォルダのなかの `node_modules` フォルダに **ローカルインストール** することが推奨されます。

<span class="masked">明示的に `-g` (または `--global`) オプションを付けない限り</span>、`npm` を実行したときはプロジェクトフォルダ内のローカル環境にインストールされます。

### TypeScript のインストール

次のコマンドにより、TypeScript を**グローバル環境**にインストールしてください。これにより、TypeScript を JavaScript にトランスパイルする `tsc` などのコマンドが使用可能になります。

```
PS C:\Users\xxxx> npm install -g typescript
```

ここが、うまくいかないときは、[Volta](https://volta.sh/) などの他のパッケージマネージャがインストールされている可能性があります。Volta をアンインストールするか、あるいは、以降のパッケージ管理を全て Volta に読み替えるなどで対応してください。

### グローバル環境にインストールされたパッケージの確認

グローバル環境にインストールされたパッケージの一覧は、`npm list -g --depth=0` コマンドで確認できます。以下は、実行結果の一例です。

```
PS C:\Users\xxxx> npm list -g --depth=0
C:\Users\xxxx\AppData\Roaming\npm
+-- @anthropic-ai/claude-code@2.0.0
+-- @google/gemini-cli@0.6.1
+-- @openai/codex@0.42.0
+-- npm@11.6.1
`-- typescript@5.9.2
```

### トランスパイルとJavaScriptプログラムの実行

ここまでの環境構築により、Node.js環境で「**トランスパイル**」と「**JavaScriptプログラムの実行**」ができるようになりました。実際に、これらを試していきます。

以下のTypeScriptプログラムを `test.ts` という名前でデスクトップ (`C:\Users\xxxx\Desktop>`) に保存してください。

```typescript{.numberLines caption="test.ts（TypeScriptプログラム）"}
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

デスクトップ画面で `[Shift]` を押下しながら右クリックして「**ターミナルで開く**」を選択して PowerShell か コマンドプロンプト を開いてください。`ls` か `dir` のコマンドで `test.ts` が存在することを確認してください。

![img](figs/01/ps_01.png)

以下のコマンドで `test.ts` を `test.js` にトランスパイルしてください。ここで `--target es6` オプションは、ES6 (ES2015) の使用に準拠した JavaScript (ECMASCript) に変換することを明示したものです。

```
PS C:\Users\xxxx\Desktop> tsc --target es6 test.ts
```

デスクトップに `test.js` (JavaScriptプログラム) が生成されているので、適当なテキストエディタで開いて内容を確認してください。

次に、以下のコマンド (`node test.js`) で実行してください。

```
PS C:\Users\xxxx\Desktop> node test.js
Hello, Alice! The sum of 10 and 20 is 30.
```

ここで失敗する場合は「**PowerShellから、スクリプトが実行できるように設定されていない可能性**」があります。以下のコマンドでスクリプトの実行設定を変更して、ターミナルを開きなおして `tsc ...` を再実行してみてください。

```
C:\Users\xxxx> Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

#### 演習

`--target e6` のようにオプションを指定しない場合、**「ES5」という古い仕様に準拠した JavaScriptプログラム** (= <span class="masked">Internet Explorer 11 のようなレガシーなブラウザでも動作する JavaScript プログラム</span>) が出力されます。実際に確認してみてください。

また、そのプログラムでも、同様の実行結果 (=`Hello, Alice! The sum of 10 and 20 is 30.`) が得られることを確認してください。

#### 定着確認

- ライブラリのバージョンに関する文脈において「LTS」とは何の略語か英語で答えよ。
    - 答え <span class="masked">Long-Term Support</span>
- PCにインストールされている Node.js のバージョンを調べるコマンドを答えよ。
    - 答え <span class="masked">`node -v`</span>
- `hoge.js` というJavaScriptプログラムを Node.js 環境で実行するためのコマンドを答えよ。
    - 答え <span class="masked">`node hoge.js`</span>
- Node.js におけるパッケージ管理ツールのコマンド名を答えよ。
    - 答え <span class="masked">`npm`</span>
- カレントフォルダにある `test.ts` という TypeScriptプログラム を、`test.js` という JavaScriptプログラム 変換してカレントフォルダに出力したい。このためのコマンドを答えよ。
    - 答え <span class="masked">`tsc test.ts`</span>
- `npm install` コマンドでパッケージをインストールするとき、特にオプション指定しなければ、それは「グローバルインストール」になるか、それとも「ローカルインストール」になるか答えよ。
    - 答え <span class="masked">ローカルインストール</span>

## TypeScriptの基礎学習のための環境構築

TypeScriptの基礎学習用のプロジェクトフォルダを作成して「**環境の構築**」を行ないます。次回以降の授業でも継続的に使用していく予定なので (課題として提出してもらう可能性もあるので)、プロジェクトフォルダの位置や名前などには、十分に注意してください。

### プロジェクトフォルダの作成

適切な位置 (**OneDrive管理下はお勧めしません**) に、`learn-ts-basics` というプロジェクトフォルダを作成して VSCode で開いてください。なお、必ず `learn-ts-basics` が **VSCodeのワークスペースのトップフォルダ（ルートフォルダ）** となるようにしてください。

![img](figs/01/vscode_01.png)

ターミナルから実行するのであれば、以下のようにしてください。この方法であれば、`learn-ts-basics` が確実に VSCodeのワークスペースのトップフォルダになります。

```
mkdir learn-ts-basics
cd learn-ts-basics
code .
```

### TypeScriptの設定 (1)

実際のReact開発に近しい環境を構築して、そこで TypeScript の基礎学習をしていきます。具体的には npm によるパッケージ追加や、ファイル変更を監視してのホットリロード設定 (=<span class="masked">自動的にトランスパイル、ビルドして再読み込みして実行すること</span>) などを行なった環境を構築して、TypeScript の基礎を学んでいきます。

まずは、**TypeScript に関する基本設定** から行なっていきます。

VSCodeで `[Ctrl]+[j]` のショートカットでターミナル (PowerShell) を開いて、以下のコマンドを実行してください。

```
tsc --init
```

`tsc` は先ほどのトランスパイルに使ったコマンドです。`tsc --init` のようにオプションをつけて実行すると、**トランスパイルに関する各種設定が記述された** `tsconfig.json` **という雛形ファイル**が作成されます。

<div class="note type-caution">
もし、VSCode のターミナルで `tsc` が見つからない旨のエラーがでた場合は、VSCodeを再起動して試してください。解決しないときは PC を再起動してください。
</div>

コマンド実行後、プロジェクトフォルダに `tsconfig.json` が作成されているはずなので、VSCode上で開いてください。大量の設定が羅列されていますが、大半がコメントアウトで無効になっています。

コメントアウトを含んでいると分かりずらいので **コメントされた文は全て「削除」して保存** してください。以下のような設定だけが残ると思います。これらは `tsc` コマンドによるトランスパイル (コンパイル) のオプション設定となります。 

```json{.numberLines caption="tsconfig.json（TypeScript関連の設定ファイル）"}
{
  "compilerOptions": {
    "module": "nodenext",
    "target": "esnext",
    "types": [],
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true
  }
}
```

JSONファイルでは <span class="masked">最後の項目以外には、末尾にカンマ (`,`)</span> が必要です。これを忘れるとエラーの原因となるので注意してください (VSCodeでエラーを表す波線が表示されます)。

#### 演習

`tsconfig.json` の各項目が意味することを「生成AI」を利用して簡単に把握してください。詳細に理解する必要はありません、ざっくりと理解してください。

(プロンプトの例)

> TypeScript の設定ファイル `tsconfig.json` を以下に示します。各項目の意味について TypeScript 初心者向けに概要を説明してください。 

### TypeScriptの設定 (2)

Typescriptの基礎学習用に `tsconfig.json` を次のようにカスタマイズしてください。

```ts{.numberLines caption="tsconfig.json（TypeScript関連の設定ファイル）"}
{
  "compilerOptions": {
    "module": "nodenext",
    "target": "esnext",
    "outDir": "./dist" /* 追加 */,
    "rootDir": "./src" /* 追加 */,
    /* "types": [], // 削除 */
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "strict": true,
    /* "jsx": "react-jsx", // 削除 */
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true
  } /* ここにカンマをつけないとダメ!!! → */,
  "include": ["src/**/*"] /* 追加 */
}
```

ここで追加・削除した設定が項目の意味は次のとおりです。

- `"outDir":"./dist"` : Typescript を変換して生成した JavaScriptファイル の出力先を `./dist` (destinationの略) に指定しています。<span class="masked">最終的にユーザーに配付するようなファイルの出力先フォルダ</span> として `dist` は、よく使われる名前なので覚えておいてください。
- `"rootDir":"./src"` : トランスパイル対象のソースファイル (TypeScriptファイル) の「**ルート（基準となるフォルダ）**」を指定します。ここからの相対パス構造が、そのまま `outDir` に生成されるイメージです。
  - 例： `src/foo/bar.ts` 👉 `dist/foo/bar.js`
- `"types": []` : TypeScript に読み込ませる型定義を、明示的にリストで指定するオプションです。たとえば `"types": ["node", "jest"]` のように書くと、それらの型だけが使えるようになります。そのため、`[]` のようにすると「一切の型定義リストを読み込まない」という扱いになってしまいます (不便です)。一方で、この `"types"` の項目自体を記述しなければ、**必要な型が自動で読み込まれるようになるので** (そのほうがトラブルが少ないので)、ここでは項目ごと削除しておきます。
- `"jsx": "react-jsx"` : React を使用するときに必要な設定です。まだ、現段階では React を使用しないのでコメントアウトしておきます。
- `"include": ["src/**/*"]` : トランスパイルの対象とするファイルやディレクトリを指定しています。`**` は「すべてのサブフォルダ」、`*` は「すべてのファイル」を意味します。つまり、ここでは <span class="masked">プロジェクトフォルダ内の「`src`」フォルダのなかのファイルのみをコンパイル対象とする</span> という設定になります。

#### 定着確認

- TypeScript のコンパイルオプションなどを記述する設定ファイル (JSONファイル) の名称を答えよ。
    - 答え <span class="masked">`tsconfig.json`</span> 

### フォルダの作成

現時点でプロジェクトフォルダのなかに `src` と `dist` のフォルダが存在していません。新規作成してください。

![img](figs/01/vscode_02.png)

なお、VSCodeの **フォルダアイコン** や **ファイルアイコン** をいい感じにしたいときは、拡張機能の **Material Icon Theme** (識別子:`pkief.material-icon-theme`) をインストールしてください。プログラミング1の授業でも紹介ずみです。

### TSファイルの作成とトランスパイルによるJSファイルの出力と実行

ここまでの環境構築が問題なくできているかを確認していきます。`src` フォルダに `prac00.ts` というファイル (Practiceの略語) を作成して、以下の TypeScriptプログラム を貼り付けて**保存**してください。

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

次に、トランスパイルして動作確認します。VSCodeのターミナル (`[Ctrl]+[J]`でオープン) から以下のコマンドを実行してください。

- 先ほどは `tsc --target es6 prac00.ts` のように、`tsc` に引数を指定しましたが <span class="masked">カレントフォルダに `tsconfig.json` があり、その設定が参照される</span> ので引数は不要です。

```
tsc
```

この `tsc` コマンドによって、`src/prac00.ts` がトランスパイルされて、`dist/prac00.js` 出力されているはずです。VSCode で確認してください。

<div class="note type-senior">
**TypeScriptコンパイル時の出力ファイル**

`tsc` を実行するすると、`dist` には `prac00.js` 以外にも `prac00.js.map`、`prac00.d.ts`、`prac00.d.ts.map` というファイルが同時に出力されていると思います。これらのファイルの内容が気になるときは、生成AIを使って深堀してください。

**(プロンプト例)**

> TypeScript ファイル `prac00.ts` を作成して、`tsc` でトランスパイルしたら、`prac00.js` の他に、`prac00.js.map`、`prac00.d.ts`、`prac00.d.ts.map` というファイルも生成されました。各ファイルの意味や役割について教えてください。

</div>

つづいて、トランスパイルによって生成された `dist/prac00.js` を実際に動作させてみます。以下のコマンドを実行してください。

```
node dist/prac00.js
```

ここで `Hello, Alice! The sum of 10 and 20 is 30.` のような文字列が出力されれば、ここまでの設定が正しくできています。

### 開発を効率的に行なうためのパッケージの追加

ここまでの設定で、TypeScriptを書いて実行する「**最低限の環境**」が構築できました。

ここからは **効率的にTypeScript開発を進めるための環境構築や設定** を進めていきます。React や Next.js を開発するときにも関係してくる内容となります (`package.json`など)。

まず、効率的なTS開発に必要なパッケージ (ライブラリ) として `typescript`、`tsx`、`@types/node` を、**プロジェクトのローカル環境にインストール**していきます。なお、`typescript` については既にグローバル環境にインストール済みですが、改めてローカル環境にもインストールしておきます。

- `typescript`: JavaScriptに静的型付けと他の機能を追加する言語とコンパイラです。
- `tsx`: TypeScriptファイルを直接実行できるツールです。
  - 通常の `tsc` 👉 `node` の手順を省略し、`tsx hoge.ts` で即実行ができます。
  - ファイル変更を監視して自動再実行する便利な機能も備えています。
- `@types/node`: Node.jsの型定義ファイルを提供し、TypeScript で Node.js を使用する際の型チェックとコード補完を可能にします。

以下のコマンドで <span class="masked">3つのパッケージをまとめてインストールすること</span> ができます。

```
npm i -D typescript tsx @types/node
```

また、以下のコマンドでも同じことができます。

```
npm install --save-dev typescript tsx @types/node
```

ここで `i` または `install` はパッケージの「インストール操作」を意味します。`-D` または `--save-dev` は、<span class="masked">開発のときだけに使うパッケージ</span> (=プロダクトとしての出力には含めないパッケージ) としてインストールすることを意味します。

コマンド実行後、プロジェクトフォルダのなかに `node_modules` フォルダと、`package.json` と `package-lock.json` という2個のファイルが自動作成されたことを確認してください。

![img](figs/01/vscode_03.png)

`node_modules` フォルダには、`npm install` (=もしくは `npm i`) コマンドで <span class="masked">インストールされたパッケージ (本体) と、そのパッケージと依存関係にあるパッケージ (本体)</span> が格納されています。基本的に、皆さんがこの `node_modules` フォルダを操作することはありません。

`package.json` と `package-lock.json` は <span class="masked">自分のプロジェクトが依存するパッケージ (=外部ライブラリ) を管理するため</span> のファイルになります。Pythonでいうところの `requirements.txt` $+\ \alpha$ が記述されたファイルと考えてください。

- `package.json`: プロジェクトの基本情報、設定・構成情報などを記述します。
  - </span>依存関係のセクション (`"devDependencies"` や `"dependencies"` の項目) は `npm install` コマンドなどを実行すると <span class="masked">自動追記</span> されますが、`"scripts"` などの項目は必要に応じて手動で追記や編集をします。
  - インストールされたパッケージとそのバージョンの一覧を保持します。
  - スクリプトコマンド（`npm run` で実行できるコマンド）を定義します。詳しくは後述します。
- `package-lock.json`: インストールされた全てのパッケージの正確なバージョンと依存関係のツリーを記録するもので、基本的に皆さんが編集することはありません。

#### 定着確認

- Node.js 環境で、アプリ開発時だけに使用するライブラリとして「tsx」をローカルインストールしたい。これを実行するコマンドを答えよ。
    - 答え <span class="masked">`npm install --save-dev tsx` または `npm i -D tsx`</span>
- Node.js 環境において、`npm` コマンドでライブラリをローカルインストールしたとき、それらは何という名前のフォルダにインストールされるか答えよ。
    - 答え <span class="masked">`node_modules`</span>
- Node.js 環境において、`npm` コマンドでライブラリをローカルインストールしたとき、その情報が記録される2つのファイルの名称を答えよ。
  - 答え <span class="masked">`package.json` および `package-lock.json`</span>
- Node.js 環境において、スクリプトコマンドを記述するファイルは `package.json`、 `package-lock.json`、`tsconfig.json` のうちどれか、答えよ。
  - 答え <span class="masked">`package.json`</span>

### TypeScriptの直接実行

以上の環境構築により、トランスパイルせずに TypeScript を直接実行できるようになりました。次のようにコマンドを実行してみてください。`npx` をつけることを忘れないようにしてください。

```
npx tsx src/prac00.ts
```

![img](figs/01/vscode_09.png)

また、以下のように `watch` オプションを指定すると、`src/prac00.ts` を監視して、ファイルの保存を検出するたびに即座に再実行してくれます。終了したいときは、ターミナルで `[Ctrl]+[C]` を入力します。

```
npx tsx watch src/prac00.ts
```

**(プロンプト例)**

> Node.js の文脈で、`npx` ってなんですか？ `npm` とは何が違うのですか？初学者向けに解説してください。

#### 定着確認

- tsx がインストールされている環境で `src/hoge.ts` を実行するためのコマンドを答えよ。
   - 答え <span class="masked">`npx tsx src/hoge.ts`</span>
- tsx を利用して、`src/fuga.ts` を変更保存するたびに自動で再実行されるようにするコマンドを答えよ。
   - 答え <span class="masked">`npx tsx watch src/fuga.ts`</span>


### 開発を効率的に行なうための設定

#### package.json の編集

`package.json` を以下のように変更してください。各ライブラリのバージョンは、各自の環境に読み替えてください。

```json{.numberLines caption="package.json (変更前)"}
{
  "devDependencies": {
    "@types/node": "^24.5.2",
    "tsx": "^4.20.5",
    "typescript": "^5.9.2"
  }
}
```

```json{.numberLines caption="package.json (変更後)"}
{
  "name": "learn-ts-basics",
  "version": "1.0.0",
  "type": "module",
  "devDependencies": {
    "@types/node": "^24.5.2",
    "tsx": "^4.20.5",
    "typescript": "^5.9.2"
  }
}
```

- `"type": "module"` : この設定により、`import` や `export` の構文が使用できるようになります。一方で `require()` が使用できなくなります。React や Next.js で開発するときは `require` ではなく `import/export` を使用するため、現段階からそれに慣れておきます。

#### tasks.json の新規作成

次のようにプロジェクトフォルダのルートに `.vscode/tasks.json` を新規作成してください。

```json{.numberLines caption=".vscode/tasks.json"}
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Run Current TypeScript File",
      "type": "shell",
      "command": "npx",
      "args": ["tsx", "${relativeFile}"],
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

上記の設定を行うと、VSCode 上で **アクティブなTypeScriptファイル** を対象に `[Ctrl]+[Shift]+[B]` を押下するだけで `npx tsx` コマンドを実行できるようになります。`[B]` は Build (ビルド) の意味です。

![img](figs/01/vscode_10.png)

### 練習

コンソール (標準出力) に `Hi, Bob!` のような文字列を出力するプログラム (`src/prac00a.ts`) を作成して、実際に実行してください。

- プログラムは `src/prac00.ts` を参考に作成してください。
- `greetAndCalculate` のような関数を定義する必要はありません。適当な変数に `Bob` を代入して `console.log()` で文字列結合して出力すればOKです。
- 解答例は[こちら](https://github.com/TakeshiWada1980/Programming3-2025/blob/main/docs/codes/01/prac00a.ts)。

## Git/GitHub管理

ここまで作成してきたプロジェクトフォルダについて**Git管理を有効化**し、さらに GitHub に公開していきます。Git / GitHub 基本設定は既に完了しているものとします。未設定の場合は[PG1の講義資料](https://takeshiwada1980.github.io/Programming1-2025/lecture14.html#gitのダウンロードとインストール設定)を参照して設定してください。


### .gitignore の設定

プロジェクトフォルダのトップ階層に `.gitignore` を作成して `node_modules` フォルダを **Gitの管理対象外** に設定します。`node_modules` には (パッケージのインストール状況によっては) 何千ものファイルが含まれるため、必ず `.gitignore` に含めるようにしてください。

以下のように `.gitignore` を作成して保存してください。

```text{.numberLines caption=".gitignore"}
/node_modules
```

現状で以下のようなプロジェクトフォルダの構成になっているはずです。

![img](figs/01/vscode_05.png)

以下の手順で、このプロジェクトフォルダを GitHub に Public なリポジトリとして発行してください。

![img](figs/01/git_01.png)

![img](figs/01/git_02.png)

問題なく発行できれば、以下のようにウェブブラウザからリポジトリが確認できるハズです。

![img](figs/01/git_03.png)

あとは、定期的にファイルの変更、ステージング、コミット、プッシュを行なってください。

#### 演習

開発環境の構築は、**一度操作しただけでは理解も定着もしないので (授業時間外に) 再度構築してみてください**。

ローカル環境 (ローカルリポジトリ) は、エクスプローラから `.git` を削除すれば完全に消去できます。GitHubリポジトリはウェブブラウザから操作して削除することができます。

- 参照: [リポジトリの削除](https://takeshiwada1980.github.io/Programming1-2025/lecture14.html#リポジトリの削除) @ プログラミング1

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

## 授業時間外学習

- 本科目は「**学修単位科目**」です。今回の講義内容 +アルファ に関して **4時間相当の授業時間外学習** に取り組んでください。疑問点や不明点などを「生成AI」で調べて深堀したり、C言語やPythonプログラムを TypeScript に移植したりすることをお勧めします。
    - 何を学べばよいか分からない人は[モダンTypeScript入門](https://www.youtube.com/results?search_query=モダンTypeScript入門) などのキーワードで「ウェブ検索」や「YouTube検索」して、それを勉強してください。
    - 参考: [サバイバルTypeScript](https://typescriptbook.jp/) TypeScript の入門ページです。
- 次回の授業のはじめに「**小テスト**」を実施します。主に「定着確認」から出題します。筆記用具を持参してください。
