---
var:
  header-title: "2026-3I プログラミング3 第02回 講義資料"
  header-date: "2026年10月02日（金）1時限"
---

# 第02回 3I-プログラミング3

## 今回の授業概要と連絡

本科目は学修単位科目です。大学の授業と同様に **1回の授業あたり4時間相当の授業時間外学習** を前提としたボリューム、展開速度となっています。いろいろと忙しいとは思いますが、時間を確保して取り組んでください。

### 小テスト❶

小テスト❶を実施します。

### ここまでの流れ

後期中間試験ぐらいまでの授業の流れ (予定)

- モダンTypeScript基礎学習のための環境構築 ***済***
- TypeScript基礎学習 **← 今回と次回の授業のメイン**
    - **React / Next.js 開発に関連する文法や機能だけを集中的に学びます**。
- Reactを使ったTodoアプリのための環境構築
- Todoアプリ開発（Reactによるフロントエンド開発）のチュートリアル
- Todoアプリのカスタマイズや作り込み → **後期前半の大課題**

まずは、次のような「📝**Todoアプリの開発** (Reactを採用したフロントエンド開発)」を目標とします。

- [Todoアプリのサンプル](https://takeshiwada1980.github.io/react-todo-app-demo/) (ギリギリ合格水準のレベル、点数で言えば60点😨)
- [Todoアプリのサンプル](https://takeshiwada1980.github.io/react-todo-app-demo/2) (ここまで内容を理解して開発できたら90点🎉)

## 前回の復習

前回の授業内容の重要部分の復習と、プラスアルファの解説をしていきます。

### プログラムの実行

プロジェクトに `src/prac01.ts` のような TypeScript ファイルがあるとき、ターミナルから `npx tsx src/prac01.ts` というコマンドを入力すれば、プログラムを実行することができました。

また、`.vscode/tasks.json` が適切に設定されていれば `[Ctrl]+[Shift]+[B]` というショートカットからもプログラムが実行できました。

- 実際に、前回作成したプログラム (`src/prac01.ts`など) が、問題なく実行できることを確認してください。

**(プロンプト例)**

> Node.js における `npx` と `tsx` というコマンドの意味を教えてください。また `npx tsx src/prac01.ts` というコマンドの解釈について教えてください。

### 静的型付け

前回講義において、**TypeScriptは「静的型付け言語」であり、変数宣言時には次のようにコロン (`:`) につづけて型** (`string` や `number`) **を示す必要がある**、と解説しました。

```typescript{.numberLines caption="明示的な型指定"}
let name: string = "TypeScriptの勉強"; // : string で 文字列型を明示
let priority: number = 3; // : number で 数値型を明示
```

ここで「**変数に静的な型付けがされる**」とは、(簡単に言えば) 変数宣言後、<span class="masked">その変数には宣言時に示した型以外の値を (基本的には) 代入できない</span>ように制約がかかるということになります。

例えば、`name: string = ...` のように変数宣言された `name` には <span class="masked">文字列型 (string型) 以外の値を入れること</span> はできず、また、`priority: number = ...` のように変数宣言した `priority` には数値型 (number型) 以外の値を入れることはできないという制約がかかります。

**(プロンプト例)**

> 静的型付け言語って、何がうれしいのですか？変数に指定の型しか格納できないような制約は不便ではないですか？


VSCode で `src/prac02.ts` を新規作成し、以下のコードを貼付けると **第05行目** と **第08行目** にエラーを示す**赤色の波下線**がつくことを確認してください。

```typescript{.numberLines caption="src/prac02.ts (トランスパイルエラー)"}
let name: string = "TypeScriptの勉強";
let priority: number = 3;

// number型の値 (4649) を代入
name = 4649; 

// string型の値 ("High") を代入
priority = "High";
```


![img](figs/02/vscode_02.png)

また、`[Ctrl]+[J]` でターミナルを開き、`tsc src/prac02.ts` というコマンドでトランスパイルすると `error TS2322: Type 'string' is not assignable to type 'number'.` などのエラーが発生することを確認してください。

なお、TypeScript / JavaScript では、慣例的に「変数名」や「ローカルな定数名」は <span class="masked">キャメルケース (小文字はじまり)</span> を原則とするので覚えておいてください。

**(プロンプト例)**

> TypeScriptで `let name: string = "ほげ"; name= 4649;` のようなプログラムを書いたとき、`tsc hoge.ts` では型のエラーが発生するのに、`npx tsx hoge.ts` では問題なく実行できるのは何故ですか？

<div class="note type-tips">
**PythonやJavaScriptは動的型付け言語**

プログラミング1で学んだ **Python** や **JavaScript** は「動的型付け言語」であり、次のようなコードを記述しても問題ありません。

```python{.numberLines caption="type.py (Python)"}
name = 'TypeScriptの勉強' # 文字列で初期化した変数を...
name = 4649 # 整数型の値で上書き可能
```

```js{.numberLines caption="type.js (JavaScript)"}
let name = "TypeScriptの勉強"; // 文字列で初期化した変数を...
name = 4649; // 整数型の値で上書き可能
```

C/C++言語は「静的型付け言語」なので、上記のようなプログラムはコンパイルエラーとなります。

</div>


<div class="note type-tips">
**命名規則**

- 「**キャメルケース**」とは <span class="masked">小文字で開始して単語区切りに大文字</span> を使用する命名規則です。
    - キャメルケースの例: `newName`、`isDone`

- 「**パスカルケース**」とは **大文字で開始して単語区切りにも大文字** を使用する命名規則です。
    - パスカルケースの例: `NewName`、`IsDone`

その他、スネークケースなどがあります。
</div>


TypeScriptの主要な「型」としては、次のようなものがあります。なお、`null` と `undefined` については、あとの授業で扱います。

- `string` : 文字列型。
- `number` : 数値型。<span class="masked">「整数型」と「浮動小数点型」</span> の区別はありません。
- `boolean` : 真偽値型 (ブール型)。`true` と `false` の2値だけを扱います。
    - Python では <span class="masked">`True` と `False` のように真偽値のリテラルは大文字開始</span> でしたが、TypeScript では **先頭が小文字** になることに注意してください。 
- `Date` : 日時型。厳密には TypeScript / JavaScript の **組込みクラス** である `Date` のインスタンス (オブジェクト) の型で「日付」と「時刻」を扱うときに使用します。

#### 定着確認

- TypeScriptにおいて「真偽値」を扱う型を答えよ。プログラム内の表記形式で答えること。
    - 答え <span class="masked">`boolean`</span> 
- TypeScriptにおいて「文字列」を扱う型を答えよ。プログラム内の表記形式で答えること。
    - 答え <span class="masked">`string`</span> 
- TypeScriptにおいて、浮動小数点数や整数を扱う型を答えよ。プログラム内の表記形式で答えること。
    - 答え <span class="masked">`number`</span> 
- TypeScript / JavaScript において、「変数名」や「ローカルな定数名」の表記は慣例的に `？？？` が使用される。`？？？` にあてはまる語として最も適切なのは「キャメルケース」「パスカルケース」「スネークケース」「ハンガリアン記法」のうち、どれか。
    - 答え <span class="masked">キャメルケース</span> 


### 型推論

ここまで「**TypeScriptでは、変数や定数の宣言時に「型」を明示する必要がある**」と説明してきました。しかし、実際には「**型推論**」という機能があり、(ユーザーが明示的に「型」を記述しなくても) <span class="masked">初期値から型を推論 (推測) して自動的に静的型付け</span> を行なうことができます。

例えば、以下のTypeScriptプログラムは `:string` や `:number` を明示していませんが、問題なくトランスパイルされます (VSCodeのエディタにもエラーは表示されません)。変数 `name` は `"TypeScriptの勉強"` という初期値から <span class="masked">文字列型であると推論され、自動的に文字列型に型付け</span> されます。同様に`priority` は数値型に型付けされます。

```typescript{.numberLines caption="src/prac02.ts"}
let name = "TypeScriptの勉強";
let priority = 3;
```

各変数が「推論によって、どのように型付けされているか」は、VSCodeで以下のように **変数にカーソルを合わせること** で確認できます。

![img](figs/02/vscode_03.png)

また、次のように `typeof` を使って推論された型を確認することもできます。実際に実行して、どのような結果が得られるか確認してください。<span class="masked">`typeof(name)` ではなく `typeof name` </span> のように使用する点に注意してください。

```typescript{.numberLines caption="src/prac02.ts (推論された型の確認)"}
let name = "TypeScriptの勉強";
let priority = 3;
console.log(`name の型は ${typeof name} です`);
console.log(`priority の型は ${typeof priority} です`);
```

なお、変数が <span class="masked">初期値を持たないとき</span> や、**関数を定義するとき** などは**明示的に型を記述する必要があります**。学習の初期段階では、練習のために明示的に型を記述することをおすすめします。

#### 定着確認

- TypeScriptにおいて、変数 `hoge` の型をコンソール出力したい。`` `console.log(`変数 hoge の型は ${？？？} です`);` `` の `？？？` に記述すべき適切な語を答えよ。
    - 答え <span class="masked">`typeof hoge`</span> 

### オブジェクトの初期化

TypeScript / JavaScript では、複数の変数をグループ化して (束ねて) <span class="masked">オブジェクト</span> という単位で扱うという解説をしました (参考:[前回講義](lecture01.html#オブジェクトのコンソール出力-1))。ここでの「オブジェクト」とは、既に学習済みの Pythonの「**辞書 (またはクラスのインスタンス)**」や <span class="masked">C言語の「構造体」のようなもの</span> と考えてください。

オブジェクトは、次のような「**オブジェクトリテラル記法**」で初期化することができました。

```typescript{.numberLines caption="src/prac03.ts (オブジェクトリテラル記法によるオブジェクトの生成)"}
const todo = {
  name: "TypeScriptの勉強",
  priority: 3,
  isDone: false,
  deadline: new Date(2025, 9, 11, 9, 45),
};
```

この際、各プロパティ (属性) は `キー: 値` という形式で定義され、<span class="masked">カンマ `,` </span> で区切って記述します。学習初期には **以下のような記述ミスが非常に多い** ので注意してください。

```typescript{.numberLines caption="src/prac03.ts (記述ミス)"}
const todo = {
  name = "TypeScriptの勉強";  // 正しくは name : "..."
  priority = 3;
  isDone = false;  // 正しくは ; ではなく , で属性を区切る
  deadline = new Date(2025, 9, 11, 9, 45);
};
```

オブジェクトを **JSON形式** に変換して整形してコンソール出力するためには <span class="masked">`console.log(JSON.stringify(todo, null, 2))`</span> のようにすることも前回に学びました。

なお `console.log(typeof todo)` による出力は <span class="masked">`object`</span> となります。

## 前回講義の「演習」の解答例と解説

### 問題の確認

前回講義で、次のような[演習問題](lecture01.html#演習2-10分)に取り組んでもらいました。


次のような Date型 (日付・日時型) の変数 `deadline` を追加して、コンソールメソッドで出力してください。また、`dayjs` や `moment` などのライブラリを使わずに「**2025/10/02 14:15**」や「**2025年10月02日 14時15分**」のようにコンソールに出力する方法について調べてください。


```typescript{.numberLines caption="Date型の変数"}
// Date型の変数 deadline の宣言と初期化
let deadline: Date = new Date(2025, 9, 2, 14, 15);
```

上記について、実際に取り組んでもらって、**皆さんそれぞれが「自分なりの解決策」を見つけていること**を前提に解説していきます。


### 解説: 月 (Month) の扱いについて

まず、これまでのプログラミングの経験から、例えば `Date(2025, 9, 2, 14, 15)` とすれば、おそらく「2025年9月2日 14時15分」という日時で初期化された値が、変数 `deadline` に格納されるのだろう・・・と推測したと思います。

しかし、実際に `console.log(deadline)` のように書いてコンソール出力すると、次のような結果になることが確認できたと思います。

```
2025-10-02T05:15:00.000Z
```

上記のような日時表記は[ISO8601形式](https://www.google.com/search?q=ISO8601とは)とよばれる書式 (フォーマット) となります。私たちの日常生活では登場することは少ないですが、コンピュータやネットの世界ではオーソドックスな日時の表記法になっています。

さらに詳しく結果を考察・確認していきます。

まずは「**Month (月)**」について <span class="masked">「9月だろう」と推測していたものの出力結果が違った</span> ことに気づいたでしょうか。TypeScript / JavaScript の `Date` クラスの仕様上、第2引数は **ゼロオリジン** で `0` から `11` によって **Month (月)** を与えるようになっています (ややこしいですが、そのような仕様なので仕方がありません)。

では、第2引数に `12` を与えるとどうなるのか (<span class="masked">コンパイルエラーになるのか、実行時エラーになるのか、あるいは別の動作をするのか</span>) を予想したうえで実際に試してみてください。プログラミング1 の授業から、繰り返し伝えていますが、このように発想を広げて自ら検証してみることは非常に大事です。

```typescript{.numberLines caption="src/prac04.ts (Dateの初期化に関する実験)"}
let deadline: Date = new Date(2025, 12, 31, 11, 45);
console.log(deadline);
```

これから開発しようとしている「Todoアプリ」において、タスクの期限 (deadline) が、1ヵ月ずれて扱われることは致命的なので注意してください。

### 解説: 時刻 (タイムゾーン) の扱いについて

次に時刻について `Date(2025, 9, 2, 14, 15)` とすれば「**14:15**」になると推測したと思いますが、実際の出力は <span class="masked">`05:15:00.000`</span> となりました。「**9時間のずれ**」が生じています。

つまり、`Date` の **第4引数** と **第5引数** を日本のローカル時刻で与えたものの、`deadline` には **協定世界時** (**UTC: Universal time coordinated**) の日時 (時刻) が記録される仕組みになっています。これも、ややこしいと感じるかもしれませんが、仕様なので仕方ありません。

<div class="note type-tips">
**JS / TS 実行環境のタイムゾーンを確認する方法**

現在の JS / TS の実行環境 (Node.jsやウェブブラウザ) が認識しているタイムゾーンは、次のコードで確認することができます。

```typescript{.numberLines caption="タイムゾーンの確認"}
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log(`Timezone: ${timeZone}`);
```

おそらく、皆さんの実行環境では `Timezone: Asia/Tokyo` のようにコンソール出力されると思います。

</div>

ここでは <span class="masked">JS/TSの実行環境によってタイムゾーンが変わること</span> に注意してください。

特にウェブアプリのバックエンドを、クラウドサーバ や Dockerなどのコンテナ で構築する場合、タイムゾーンは一般に `Timezone: UTC` となります。一方で、**フロントエンドのタイムゾーンは利用者環境 (OS) によって違ってくることに注意してください**。

### 解説: 日時の整形出力

次に、Date型の変数の内容を「**YYYY/MM/DD HH:MM**」のような形式で整形出力する方法について考えていきます。ただし、まずは **外部ライブラリを使用しない前提** とします。

<hr>

ウェブ検索を利用して「Date型の日時を整形出力する方法」について探す場合は「[JavaScript Date フォーマット](https://www.google.com/search?q=JavaScript+Date+フォーマット)」などをキーワードにします。検索キーワードは <span class="masked">「TypeScript」ではなく「JavaScript」</span> としたほうが情報のヒット率が高くなります。

TypeScript固有の内容でなければ「JavaScript」をキーワードに使うことも方法として覚えておいてください。

<hr>

GitHub Copilot を利用して解決を試みる場合は、以下のように <span class="masked">処理内容を的確に表現したコメント</span> をプログラムに書くことでCopilotがコードを提案してくれます。

![img](figs/02/vscode_01.png)

<hr>

次に、ChatGPT や Claude などの生成AIを利用して解決を試みる場合は、次のようなプロンプトを記述します。プロンプトのなかで、プログラムコード全体を **3連バッククォート ` ``` ` で囲む** ことで、より適切に読み込みされます。また、プロンプトのなかでもコードの断片は **バッククォートで囲むこと** が推奨されます。


> 次に示す TypeScriptプログラムに続けて、変数 `deadline` の内容を「2025/10/02 11:45」のようにコンソールに整形出力するプログラムを書いてください。実行環境は Node.js、タイムゾーンは `Timezone: Asia/Tokyo` を想定し、外部ライブラリを使用しない前提で記述してください  
> \`\`\`  
> let deadline: Date = new Date(2025, 9, 2, 14, 15);
> console.log(deadline);  
> \`\`\`

ここでは、生成AIから次のような回答 (コード) が得られたと仮定します。

```typescript{.numberLines caption="src/prac04.ts"}
let deadline: Date = new Date(2025, 9, 2, 14, 15);

const year = deadline.getFullYear();
const month = String(deadline.getMonth() + 1).padStart(2, '0');
const day = String(deadline.getDate()).padStart(2, '0');
const hours = String(deadline.getHours()).padStart(2, '0');
const minutes = String(deadline.getMinutes()).padStart(2, '0');

console.log(`${year}/${month}/${day} ${hours}:${minutes}`);
```

**第09行目**では、前回学習した[テンプレート文字列](lecture01.html#テンプレート文字列)が使用されています。提案されたプログラムを実行すると、次のように意図した結果を得ることができます。

```
2025/10/02 14:15
```

生成AIを利用してプログラムを得たときには、動作確認後に <span class="masked">必ずプログラムの意味を理解</span> するように努めてください。「**プログラムの意味は分からないけど、なんか動いているのでOK**」では、ソフトウェアエンジニアを目指す人間としてダメダメ🤪です

> プロの通訳や翻訳家を目指している学生が、生成AIに翻訳させて、そのまま提出するのと同じくらいヤバいです。  
> あるいは「電卓を使えば計算できるから $0.8\times 2 - 9.2$ を自力で計算できなくてもOK」という感覚ぐらいヤバいです。

例えば、**第06行目** では「`deadline.getHours()` メソッドで 値 (number型・ローカルタイムゾーンに基づいた「時」) を得て、それを `String()` で文字列 (string型) に変換して、さらに文字列の `padStart(2, "0")` メソッドで **ゼロ埋めの2文字幅** に変換している」ということを理解し、説明できる必要があります。

そのためには、生成AIに「**自分の解釈の確認をしてもらったり、不明点を追質問したり、コードを書いて実験したりすること**」が必要です。

(例)

> 次に示すTypeScriptの第2行目では、deadline.getHours() メソッドで 値 (number型、ローカルタイムゾーンに基づいて変換された値) を得て、それを String() で文字列 (string型) に変換して、さらに文字列の padStart(2, "0") メソッドを利用してゼロ埋めの2文字幅に変換している、という解釈は正しいですか。  
> \`\`\`  
> let deadline: Date = new Date(2025, 9, 2, 14, 15);  
> const hours = String(deadline.getHours()).padStart(2, "0");  
> \`\`\`

<div class="note type-tips">
**Pythonで日時を扱って整形出力するには?**

Pythonで、先の `prac04.ts` と同様のプログラムを書くと次のようになります。

```python{.numberLines caption="Pythonにおける日付の扱い"}
from datetime import datetime # 日時を扱うための datetime ライブラリ
deadline = datetime(2024, 10, 2, 11, 45)
print(deadline.strftime('%Y/%m/%d %H:%M'))
```

実際に実行してみてください ([paiza.io](https://paiza.io/ja)) 。<span class="masked">実行結果の違いに気づいた</span> でしょうか？

- **Python** の `datetime` クラスでは、月 (Month) は `1` から `12` の整数で与えて初期化します。1月は `1`、2月は `2`、...、12月は `12` となります。
- **JavaScript** (TypeScript) の `Date` クラスでは、月 (Month) は `0` から `11` の整数で与えて初期化します。1月は `0`、2月は `1`、...、12月は `11` となります。

</div>

### 解説: 日時の整形出力 (関数化1)

ここまでの内容で、次のようなコードでDate型のオブジェクトを「**2025/10/02 14:15**」のような形式で出力できることが分かりました。`deadline` の変数宣言キーワードを `let` から `const` に変更しています。

```typescript{.numberLines caption="src/prac05.ts (Date型の整形出力)"}
const deadline: Date = new Date(2024, 10, 2, 11, 45);

const year = deadline.getFullYear();
const month = String(deadline.getMonth() + 1).padStart(2, '0');
const day = String(deadline.getDate()).padStart(2, '0');
const hours = String(deadline.getHours()).padStart(2, '0');
const minutes = String(deadline.getMinutes()).padStart(2, '0');

console.log(`${year}/${month}/${day} ${hours}:${minutes}`);
```

しかし、上記のコードは <span class="masked">再利用性</span> の面で大きな課題があることに気付くと思います。

例えば、Todo の「**作成日時**」を `createdAt` という変数に格納しておいて

```
期日 2025/10/02 14:45 (登録日: 2025/09/25 09:45)

```
...のように出力したいとします。

上記のコードに準じて愚直にコードを書くと以下のようになってしまいます。実際にコピペして実行してみてください。

```typescript{.numberLines caption="src/prac05.ts"}
const deadline: Date = new Date(2025, 9, 2, 14, 15);
const createdAt: Date = new Date(2025, 8, 25, 9, 45);

const dlYear = deadline.getFullYear();
const dlMonth = String(deadline.getMonth() + 1).padStart(2, "0");
const dlDay = String(deadline.getDate()).padStart(2, "0");
const dlHours = String(deadline.getHours()).padStart(2, "0");
const dlMinutes = String(deadline.getMinutes()).padStart(2, "0");

const caYear = createdAt.getFullYear();
const caMonth = String(createdAt.getMonth() + 1).padStart(2, "0");
const caDay = String(createdAt.getDate()).padStart(2, "0");
const caHours = String(createdAt.getHours()).padStart(2, "0");
const caMinutes = String(createdAt.getMinutes()).padStart(2, "0");

const str =
  `期限 ${dlYear}/${dlMonth}/${dlDay} ${dlHours}:${dlMinutes} ` +
  `(登録日 ${caYear}/${caMonth}/${caDay} ${caHours}:${caMinutes})`;
console.log(str);
```

確かに意図する出力は得られますが **保守性** や **再利用性** の面では、あまりにも酷いコード🫠です。既に Python と C言語 を学んできている皆さんであれば、<span class="masked">処理の関数化</span> で解決できることに気付くと思います。

### 解説: 日時の整形出力 (関数化2)

Date型のオブジェクトを「引数」として受け取って「YYYY/MM/DD HH:MM」形式の文字列を「戻り値 (返り値)」とする `date2str` という関数の作成を例に **TypeScriptにおける関数定義の書き方** を学んでいきます。

まず、結論から言えば、以下の **第02行目**から**第09行目** のように関数 `date2str` が定義できます。

```typescript{.numberLines caption="src/prac05.ts (date2str関数の追加)"}
// 関数の定義
function date2str(dt: Date): string {
  const year = dt.getFullYear();
  const month = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");
  const hours = String(dt.getHours()).padStart(2, "0");
  const minutes = String(dt.getMinutes()).padStart(2, "0");
  return `${year}/${month}/${day} ${hours}:${minutes}`;
}

const deadline: Date = new Date(2025, 9, 2, 14, 15);
const createdAt: Date = new Date(2025, 8, 25, 9, 45);

// 関数の呼出し (テンプレート文字列の内部)
let str = `期限 ${date2str(deadline)} (登録日 ${date2str(createdAt)})`;
console.log(str);
```

特に**第02行目**の関数定義の部分 `function date2str(dt: Date): string {` に注目してください。

![img](figs/02/vscode_04.png)

TypeScriptでは、関数の定義に `function` キーワードを使用します (Pythonでは <span class="masked">`def`</span> を使用しました)。そして、丸括弧で囲んで関数内で使用する**引数を型付きで与えて**、さらに、**戻り値の型を記述**します。

特に、慣れるまでは「**戻り値の型を記述する位置が分かりづらい**」ので注意してください。

他にも、関数記述の例を見てみましょう。

**2個の数値型の引数**を受け取って、**真偽値型を戻り値**とする `comp` という関数のシグネチャ (=<span class="masked">関数の基本的な情報を定義する部分</span>) は次のようになります。


```typescript{.numberLines caption="comp"}
function comp(a: number, b: number ): boolean { ... }
```

<hr>

**1個の文字列型の引数**を受け取って、**戻り値を持たない** `printWord` という関数のシグネチャは次のようになります。TypeScript では、慣例的に関数名についても <span class="masked">キャメルケース</span> が使われます。

```typescript{.numberLines caption="printWord"}
function printWord(word: string): void { ... }
```

戻り値が「ない」ことは <span>`void`</span> で表現します。

<hr>

**引数を受け取らず**、**数値型を戻り値**とする `dice` という関数のシグネチャは次のようになります。

```typescript{.numberLines caption="dice"}
function dice(): number { ... }
```

なお、引数がないことを `function dice(void): number { ... }` のように `void` を使って明示することは <span class="masked">できません</span>。


#### 定着確認

- 引数を受け取らず、数値型を戻り値とする `dice` という関数のシグネチャを答えよ。
- 1個の数値型の引数 (仮引数を `num` とする) を受け取り、文字列型を戻り値とする `num2str` という関数のシグネチャを答えよ。
- 2個の文字列型の引数 (仮引数を `word1` と `word2` とする) を受け取り、真偽値型を戻り値とする `comp` という関数のシグネチャを答えよ。
- 1個のDate型の引数 (仮引数を `birthday` とする) を受け取り、数値型を戻り値とする `getAge` という関数のシグネチャを答えよ。

### アロー関数

モダンTypeScriptでは `function` キーワードを使った関数定義よりも、`=>` を使用した ***アロー関数*** という関数定義が一般に使用されます (トレンドになっています)。<span class="masked">ウェブの情報も「アロー関数」で書かれていることが多い</span> ので、**基本的には** `=>` **によるアロー関数を使用**するようにしてください。

先ほどの `date2str` は、次のようにアロー関数形式に書き換えができます。

```typescript{.numberLines caption="書き換え前"}
function date2str(dt: Date): string { ... }
```

```typescript{.numberLines caption="書き換え後"}
const date2str = (dt: Date): string => { ... }
```

実際にアロー関数形式に書き換えて、同じようにプログラムが動作することを確認してください。

#### 定着確認

- 引数を受け取らず、数値型を戻り値とする `dice` という関数のシグネチャを「アロー関数形式」で答えよ。
- 1個の数値型の引数 (仮引数を `num` とする) を受け取り、文字列型を戻り値とする `num2str` という関数のシグネチャを「アロー関数形式」で答えよ。
- 2個の文字列型の引数 (仮引数を `word1` と `word2` とする) を受け取り、真偽値型を戻り値とする `comp` という関数のシグネチャを「アロー関数形式」で答えよ。
- 1個のDate型の引数 (仮引数を `birthday` とする) を受け取り、数値型を戻り値とする `getAge` という関数のシグネチャを「アロー関数形式」で答えよ。

### 関数を別ファイルに分離する

関数 `date2str` は、他のプログラムからも使用する可能性があるので別ファイルに分けて記述します。`src` フォルダに `utils` (utilitiesの略) を作成して、そのなかに `date2str.ts` というファイルを作成して、 以下のように関数 `date2str` を抜き出して貼りつけて保存してください。

```typescript{.numberLines caption="src/utils/date2str.ts"}
export const date2str = (dt: Date): string => {
  const year = dt.getFullYear();
  const month = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");
  const hours = String(dt.getHours()).padStart(2, "0");
  const minutes = String(dt.getMinutes()).padStart(2, "0");
  return `${year}/${month}/${day} ${hours}:${minutes}`;
};
```

![img](figs/02/vscode_06.png)



ここで、`date2str.ts` の **第01行目** の先頭に <span class="masked">`export` というキーワード</span> をつけていることに着目してください。この `export` をつけた関数は **別ファイルに書かれたプログラムから呼び出すことが可能** となります。また関数以外にも、数値や文字列などを格納した変数や定数についても同様に作用します。

実際に `src/utils/date2str.ts` に定義した関数 `date2str` が、別ファイルの `src/prac05.ts` から呼び出せることを確認します。`src/prac05.ts` を以下のように書き換え、動作することを確かめてください。

```typescript{.numberLines caption="src/prac05.ts"}
import { date2str } from "./utils/date2str.js"; // 関数date2strをインポート

const deadline: Date = new Date(2025, 9, 2, 14, 15);
const createdAt: Date = new Date(2025, 8, 25, 9, 45);

let str = `期限 ${date2str(deadline)} (登録日 ${date2str(createdAt)})`;
console.log(str);
```

上記の **第01行目** で、関数 `date2str` がインポートされ **第06行目** で呼び出されています。

ここで注意してほしいことは `"./utils/date2str.ts";` ではなく `from "./utils/date2str.js";` のようにしている点です。これは、ビルド時に `date2str.ts` から `date2str.js` へ変換されることを前提としているためです。

## ライブラリのインストールと利用 

関数を自作してDate型を整形出力する方法について解説しました。ここからは **外部のライブラリ (パッケージ)** を利用して同様のことを行なってみます。ここでは[dayjs](https://www.npmjs.com/package/dayjs)というライブラリを使用します。

### dayjsライブラリのインストール

プロジェクトフォルダに dayjs をローカルインストールするために、以下のコマンドを実行してください。

```
npm i dayjs
```

前回、[開発環境を構築するとき](lecture01.html#開発を効率的に行なうためのパッケージの追加)には `npm i -D typescript tsx @types/node` のように `-D` オプションを付けました。この `-D` (または `--save-dev` ) は <span class="masked">開発だけに使用するライブラリ (=トランスパイルされたあとのプログラムの実行には不要なライブラリ)</span> をインストールするときにつけます。ここで使用する `dayjs` は、実行時に使用するライブラリなので `-D` を **付けず** に `npm` を実行します。

インストールされたことを以下のコマンドで確認してください。

```
npm list --depth=0
```

次のような応答が返ってくると思います。一覧に `dayjs@1.11.13` が含まれていることを確認してください。`@` 以降はバージョン番号なので、適宜、読み替えてください。

```
npm list --depth=0
learn-ts-basics@1.0.0 C:\Users\xxxx\Documents\learn-ts-basics
├── @types/node@24.5.2
├── dayjs@1.11.18
├── tsx@4.20.5
└── typescript@5.9.2
```

`-D` オプションをつけてインストールしたか、そうでないかは `package.json` の内容から確認することができます。VSCodeで `package.json` を確認すると `-D` を**付けて**インストールしたライブラリ (パッケージ) は `"devDependencies"` に記述されます。また、`-D` を**付けずに**インストールしたライブラリは `"dependencies"` に記述されます。

現段階ではまだ利用しませんが <span class="masked">バンドル</span> という処理をする際に、これらの情報が意味を持つようになります。

```json{.numberLines caption="package.json"}
{
  "name": "learn-ts-basics",
  "version": "1.0.0",
  "type": "module",
  "devDependencies": {
    "@types/node": "^24.5.2",
    "tsx": "^4.20.5",
    "typescript": "^5.9.2"
  },
  "dependencies": {
    "dayjs": "^1.11.18"
  }
}
```

<div class="note type-tips">
**バンドル (bundle)** とは、複数のJavaScriptファイルやその **依存関係** を「**1つのファイルにまとめる処理**」のことで、ウェブアプリケーションの配信と実行を効率化するために使用されます。主なバンドルツールには[webpack](https://www.google.com/search?q=webpackとは)、[Vite](https://www.google.com/search?q=Viteとは)、Turbopack、Parcel などがあります。
</div>

<div class="note type-tips">
**依存 (dependency)** とは、そのアプリを正常に動作させるために (あるいは開発するために) 必要な外部のパッケージ (ライブラリ) のことを意味します。

例えば `package.json` の `devDependencies` に記載されているのは、そのアプリを<span class="masked">開発 (コンパイルやビルドなど) するときだけに必要なパッケージ</span> になります。また、`dependencies` に記載されているのは、そのアプリを実行するために必要なパッケージになります。
</div>

#### 定着確認

- アプリの実行時に使用する `uuid` というライブラリを、プロジェクトフォルダにローカルインストールしたい。これを実行するコマンドを答えよ。
    - 答え <span class="masked">`npm i uuid` または `npm install uuid`</span>
- アプリの開発時だけに使用する `@types/uuid` というライブラリを、プロジェクトフォルダにローカルインストールしたい。これを実行するコマンドを答えよ。
    - 答え <span class="masked">`npm i -D @types/uuid` または `npm install --save-dev @types/uuid`</span>

### dayjsライブラリの利用

`npm` コマンドでインストールしたライブラリは `import xxxx from "yyyy";` や `import { xxx1, xxx2 } from "zzzz";` のようにインポートして使用します。

dayjs は、次のようにインポートして使用します。

```typescript{.numberLines caption="src/prac06.ts (dayjsのインポート)"}
import dayjs from "dayjs"; // dayjsのインポート

const deadline: Date = new Date(2025, 9, 2, 14, 15);
const createdAt: Date = new Date(2025, 8, 25, 9, 45);

const str =
  `期限 ${dayjs(deadline).format("YYYY/MM/DD HH:mm")}` +
  `(登録日 ${dayjs(createdAt).format("YYYY/MM/DD HH:mm")})`;
console.log(str);
```

上記のプログラムでは **第01行目** でインポートされた `dayjs` を **第07行目** と **第08行目** で呼び出して使用しています。実際に実行して結果を確認してください。また、ここでは `"YYYY/MM/DD HH:mm"` という文字列が2回登場しているので、これを `dtFmt` という定数にまとめると次のようなプログラムになります。


```typescript{.numberLines caption="src/prac06.ts"}
import dayjs from "dayjs";

const dtFmt = "YYYY/MM/DD HH:mm";
const deadline: Date = new Date(2025, 9, 2, 14, 15);
const createdAt: Date = new Date(2025, 8, 25, 9, 45);

const str =
  `期限 ${dayjs(deadline).format(dtFmt)}` +
  `(登録日 ${dayjs(createdAt).format(dtFmt)})`;
console.log(str);
```

#### 演習 (<i class="fa-solid fa-stopwatch"></i>10分)

次のように「**曜日**」を含めた出力を得たい。そのような出力が得られるようにプログラムをアップデートしてください (**dayjsライブラリ**を使用することを前提とする)。

```
期限 2025/10/02(木) 14:15(登録日 2025/09/25(木) 09:45)
```

- 生成AIやウェブ検索を利用して取り組んでください。


## オブジェクトの型定義

今回講義の[2.4 オブジェクトの初期化](lecture02.html#オブジェクトの初期化) では、次のようなオブジェクトリテラルを使用して `todo` を初期化しました。

```typescript{.numberLines caption="src/prac03.ts (オブジェクトリテラル記法によるオブジェクトの生成)"}
const todo = {
  name: "TypeScriptの勉強",
  priority: 3,
  isDone: false,
  deadline: new Date(2025, 9, 11, 9, 45),
};
```

上記では、実は　推論によって `name` や `priority` などの **プロパティ (属性) の型付け** が行われています。実際に VSCode で `todo` にカーソルを合わせると次のように「推論された型」が確認できます。

![img](figs/02/vscode_07.png)

オブジェクトに対して明示的に「**型**」を与えたいときは、次のように `type` キーワードを使って「型」を定義して使用します。**第02行目** から **第07行目** にかけて `Todo` という型を定義して、**第10行目** で `const todo1: Todo = {` のようにして、`todo1` を `Todo` 型として型付けしています。

```typescript{.numberLines caption="src/prac07.ts"}
// Todo型を定義
type Todo = {
  name: string;  // セミコロンで区切り
  priority: number;
  isDone: boolean;
  deadline: Date;
};

// Todo型のオブジェクトを作成
const todo1: Todo = {
  name: "TypeScriptの勉強",  // カンマで区切り
  priority: 3,
  isDone: false,
  deadline: new Date(2024, 9, 11, 9, 45),
};

// Todo型のオブジェクトを作成
const todo2: Todo = {
  name: "基礎物理3の宿題",
  priority: 1,
  isDone: false,
  deadline: new Date(2024, 9, 10, 16, 0),
};

console.log(JSON.stringify(todo1, null, 2));
console.log(JSON.stringify(todo2, null, 2));
```

なお、「**型定義**」では、各プロパティ (属性) が <span class="masked">セミコロン</span> で区切られている点に注意してください (一方で、オブジェクトリテラルでは各プロパティが **カンマ** で区切られています)。また、型名は慣例的に <span class="masked">大文字からはじめるパスカルケース</span> とする点に注意してください。

上記のように **明示的な型付け** をすることで、プログラミングのなかで生じる様々なミスを早期発見できるという恩恵が得られます。例えば、型付けせずに以下のように `todo1` と `todo2` を定義すると、それに続く処理のなかで実行時エラーや予期せぬ結果の出力に悩まされる可能性が「大」です。

```typescript{.numberLines caption="src/prac07.ts (抜粋・ミスありコード)" startFrom="10"}
const todo1: Todo = {
  name: "TypeScriptの勉強",
  priority: "3",
  isDone: false,
  deadline: new Date(2024, 9, 11, 9, 45),
};

const todo2: Todo = {
  name: "基礎物理3の宿題",
  priority: 1,
  isDone: false,
  deadlien: new Date(2024, 9, 10, 16, 0),
};
```

上記のコードの「**何が問題か**」に気付けるでしょうか。

一方、もし明示的に型付けをしていれば、以下のように VSCode のエディタ画面上で**問題箇所をエラーとして表示**してくれるようになります (また `tsc` のタイミングでもコンパイルエラーとして出力してくれます)。

![img](figs/02/vscode_08.png)



<div class="note type-tips">
**C言語バージョン**

上記のプログラムを、C言語で「構造体」を使用して記述すると以下のようになります。実際にコードを試したい場合は[paiza.io](https://paiza.io/ja)を利用してください。

```c{.numberLines caption="prac02.c"}
#include <stdio.h>
#include <stdbool.h>
#include <string.h>
#include <time.h>

// Todo構造体を定義
typedef struct {
  char name[100];
  int priority;
  bool isDone;
  struct tm deadline;
} Todo;

int main() {
  // Todo構造体のオブジェクトを作成
  Todo todo1 = {
    .name = "TypeScriptの勉強",
    .priority = 3,
    .isDone = false,
    .deadline = {
      .tm_year = 2024 - 1900,
      .tm_mon = 9,
      .tm_mday = 11,
      .tm_hour = 9,
      .tm_min = 45
    }
  };

  // Todo構造体のオブジェクトを作成
  Todo todo2 = {
    .name = "基礎物理3の宿題",
    .priority = 1,
    .isDone = false,
    .deadline = {
      .tm_year = 2024 - 1900,
      .tm_mon = 9,
      .tm_mday = 10,
      .tm_hour = 16,
      .tm_min = 0
    }
  };

  printf("Todo 1: %s, Priority: %d, Done: %s\n", 
          todo1.name, todo1.priority, todo1.isDone ? "true" : "false");
  printf("Todo 2: %s, Priority: %d, Done: %s\n", 
          todo2.name, todo2.priority, todo2.isDone ? "true" : "false");
  return 0;
}
```
</div>

<div class="note type-tips">
**Pythonバージョン**

上記のプログラムを、Pythonで「辞書型(`dict`)」を使用して記述すると以下のようになります。

```python{.numberLines caption="prac02-1.py"}
from datetime import datetime

todo1 = {
  "name": "TypeScriptの勉強",
  "priority": 3,
  "isDone": False,
  "deadline": datetime(2024, 10, 11, 9, 45)
}

todo2 = {
  "name": "基礎物理3の宿題",
  "priority": 1,
  "isDone": False,
  "deadline": datetime(2024, 10, 10, 16, 0)
}

print(f"Todo 1: {todo1['name']}, Priority: {todo1['priority']}, Done: {todo1['isDone']}")
print(f"Todo 2: {todo2['name']}, Priority: {todo2['priority']}, Done: {todo2['isDone']}")
```

また、`Class` を使用して記述すると以下のようになります。

```python{.numberLines caption="prac02-1.py"}
from datetime import datetime

class Todo:
  def __init__(self, name: str, priority: int, is_done: bool, deadline: datetime):
    self.name = name
    self.priority = priority
    self.is_done = is_done
    self.deadline = deadline

  def __str__(self):
    log = f"Todo: {self.name}, Priority: {self.priority}, " + \
        f"Done: {self.is_done}, Deadline: {self.deadline}"
    return log

# Todoクラスのインスタンスを作成
todo1 = Todo(
  name="TypeScriptの勉強",
  priority=3,
  is_done=False,
  deadline=datetime(2024, 10, 11, 9, 45)
)

todo2 = Todo(
  name="基礎物理3の宿題",
  priority=1,
  is_done=False,
  deadline=datetime(2024, 10, 10, 16, 0)
)

print(todo1)
print(todo2)
```
</div>

### 型定義を別ファイルに分離する

先ほどは関数を別のファイルに分離しましたが、同様に (複数のファイルから参照される可能性がある) 型定義も **別ファイルに分離** することができます。

![img](figs/02/vscode_09.png)

実際に `types.ts` というファイルを作成して「**Todo型の定義**」をそこに移動してください。そして、 `prac07.ts` のなかで `import type { Todo } from "./types.js";` のようにインポートしてください。

- 型のインポートでは import **type** { Todo } from "./types.js" のように 「type」をつける点に注意してください。

なお、`types.ts` では <span class="masked">`Todo` に `export` キーワード</span> を付けることを忘れないようにしてください。

```typescript{.numberLines caption="src/prac07.ts (types.tsの読込み)"}
import type { Todo } from "./types.js";

// Todo型のオブジェクトを作成
const todo1: Todo = {
  name: "TypeScriptの勉強", // カンマで区切り
  priority: 3,
  isDone: false,
  deadline: new Date(2024, 9, 11, 9, 45),
};

// Todo型のオブジェクトを作成
const todo2: Todo = {
  name: "基礎物理3の宿題",
  priority: 1,
  isDone: false,
  deadline: new Date(2024, 9, 10, 16, 0),
};

console.log(JSON.stringify(todo1, null, 2));
console.log(JSON.stringify(todo2, null, 2));
```

### オブジェクトを引数に受け取る関数の定義

Todoの型定義を参照して「**Todo オブジェクトを引数として受け取って、その内容をコンソール出力する** `printTodo` **という関数**」を作成してみます。

まず、`utils` フォルダに `printTodo.ts` というファイルを作成してください。次に、そのファイルに以下のプログラムを貼付けてください。

```typescript{.numberLines caption="src/utils/printTodo.ts "}
import dayjs from "dayjs";
import type { Todo } from "../types.js";

export const printTodo = (todo: Todo): void => {
  const todoSummary =
    `(優先度: ${todo.priority}) ${todo.name}` +
    ` 期日: ${dayjs(todo.deadline).format("YYYY/MM/DD HH:mm")}`;
  console.log(todoSummary);
};
```

**第02行目**でTodo型の定義をインポートしています。<span class="masked">相対パスによる指定</span> になるので (`types.ts` は1つ上の階層に存在するので) `from ../types.js` となります。

**第04行目**では、アロー関数として `printTodo` を定義しています。`(todo: Todo)` のように Todo型の値を、**仮引数** `todo` として受け取るように記述しています。

**(プロンプト例)**

> 引数と仮引数の違いって何ですか？TypeScriptを例に解説してください。


また、`prac07.ts` で、関数 `printTodo` を使用するためには次のようにします。**第02行目** で `printTodo` をインポートしています。相対パスで指定することに注意してください。

```typescript{.numberLines caption="src/prac07.ts (printTodoのインポート)"}
import type { Todo } from "./types.js";
import { printTodo } from "./utils/printTodo.js";

// todo1 と todo2 の初期化処理 (略)

printTodo(todo1);
printTodo(todo2);
```

実際に実行すると、次のような出力が得られます。

```
(優先度: 3) TypeScriptの勉強 期日: 2024/10/11 09:45
(優先度: 1) 基礎物理3の宿題 期日: 2024/10/10 16:00
```

### 分割代入

モダンTypeScriptでは ***分割代入*** という文法が多用されます。分割代入はReact開発でも頻繁に使うことになる文法なので、十分に理解して使えるようになってください。

分割代入 (destructuring assignment) とは <span class="masked">オブジェクトから一部の値 (プロパティ) を抽出して、それを個別の変数に簡単に代入</span> する機能になります。以下のプログラムの **第05行目** が「**分割代入**」の実例になります。

```typescript{.numberLines caption="printTodo.ts (分割代入の利用例)"}
import dayjs from "dayjs";
import type { Todo } from "../types.js";

export const printTodo = (todo: Todo): void => {
  const { name, priority, deadline } = todo; // ◀◀ 分割代入
  const todoSummary =
    `(優先度: ${priority}) ${name}` +
    ` 期日: ${dayjs(deadline).format("YYYY/MM/DD HH:mm")}`;
  console.log(todoSummary);
};
```

Todo型は `name`、`priority`、`isDone`、`deadline` の4つのプロパティを持ちますが、このうちの任意の3つを抽出して <span class="masked">同名の変数</span> に代入しています。

さきほどは **第07行目** を `` `(優先度: ${todo.priority}) ${todo.name}` +`` と書いていましたが、ここでは `` `(優先度: ${priority}) ${name}` +`` のように短く記述できています。

なお、分割代入は `const { deadline, priority, name } = todo` のように <span class="masked">順番を変えても問題なく動作します</span>。実際に確認してみてください。

この分割代入は、次のようなプログラムと実質的に同じとなります。

```typescript{.numberLines caption="printTodo.ts (分割代入の利用例)" startFrom="4"}
export const printTodo = (todo: Todo): void => {
  const name = todo.name;          // 通常の代入
  const priority = todo.priority;  // 通常の代入
  const deadline = todo.deadline;  // 通常の代入
  const todoSummary =
    `(優先度: ${priority}) ${name}` +
    ` 期日: ${dayjs(deadline).format("YYYY/MM/DD HH:mm")}`;
  console.log(todoSummary);
};
```

### 引数の分割代入

さらに、次の **第04行目** のように <span class="masked">引数の受け取りに分割代入を適用すること</span> ができます。このテクニックも**React開発のなかで頻繁に利用される**ので「何が行なわれているのか
」を正しく読み取れるようになってください。ウェブの解説や、生成AIが出力するサンプルコードでも、引数の分割代入が使用されていることが多いです。

```typescript{.numberLines caption="printTodo.ts (引数の分割代入)"}
import dayjs from "dayjs";
import type { Todo } from "../types.js";

export const printTodo = ({name, priority, deadline}: Todo): void => {
  const todoSummary =
    `(優先度: ${priority}) ${name}` +
    ` 期日: ${dayjs(deadline).format("YYYY/MM/DD HH:mm")}`;
  console.log(todoSummary);
};
```

#### 定着確認

- 次に示す `greet.ts` の `greet` 関数を「アロー関数形式」に書き換えよ。
- アロー関数形式に書き換えた `greet` の関数内処理を「分割代入」を利用したものに書き換えよ。
- アロー関数形式に書き換えた `greet` を「引数の分割代入」を使ったものに書き換えよ。

```typescript{.numberLines caption="greet.ts"}
type User = {
  name: string;
  age: number;
};

function greet(user: User): void {
  console.log(`こんにちは、${user.name}さん。${user.age}歳ですね。`);
};

const person = { name: "鈴木", age: 30 };
greet(person);
```

#### 演習 (宿題: <i class="fa-solid fa-stopwatch"></i>20分) 

Todo型の引数 (1個) を受け取って「現在時刻が期限 (`deadline`) を過ぎている」かつ「未完了 (`isDone` が `false`)」のとき `true` 、そうでないときは `false` を返す関数を実装してください (アロー関数形式で別ファイルに記述してください)。また、その関数が適切に動作をすることを確認する簡単なテストコードを `prac03.ts` に記述してください。関数名と、それを記述するファイル名も、処理内容にあわせて適切に設定してください。

**(ヒント) 変数や関数、ファイルの命名にも「生成AI」を活用することができます**。

> TypeScriptでXXXXアプリを開発しています。XXXXのような処理を行なう関数の名前を複数提案してください。

#### 演習 (宿題: <i class="fa-solid fa-stopwatch"></i>20分)

Todo型の引数 (1個) を受け取って、完了済みであれば `【済】基礎物理3の宿題`、未完了で期限を過ぎていなければ `【未】基礎物理3の宿題 (期限まで残りXX時間)`、期限を過ぎていれば `【未】基礎物理3の宿題 (期限をXX時間超過)` のような文字列を返す関数 (アロー関数形式で、上記の演習と同じファイル内に記述) を実装してください。また、その関数が適切に動作をすることを確認する簡単なテストコードを `prac03.ts` に記述してください。

- 戻り値の文字列の内容はカスタマイズやアレンジ歓迎です。

## 等価演算子と不等価演算子

### 値の比較

TypeScript (および JavaScript) において「数値型」や「文字列型」などの[プリミティブ型](https://chatgpt.com/share/67051f9c-5e2c-8011-bdc6-bd23f6f43e8a)の値を比較するときは、一般に `===` (**厳密等価演算子**) を使用することが推奨されます。

言語仕様としては `==` (**等価演算子**) も使用可能ですが、こちらは比較の際に <span class="masked">暗黙の型変換が適用</span> されることがあり、その挙動について十分な理解がないままに使用するとバグの原因となります。

```typescript{.numberLines caption="厳密等価演算子を使った比較"}
console.log(3150 === "3150"); // false
console.log(0 === ""); // false
console.log("1,2,3" === [1, 2, 3]); // false
```

```typescript{.numberLines caption="等価演算子を使った比較"}
console.log(3150 == "3150"); // true
console.log(0 == ""); // true
console.log("1,2,3" == [1, 2, 3]); // true
```
なお、**上記のサンプルコードは現在構築しているTypeScript環境では実行できません** (厳密な型チェックをする設定になっているためトランスパイルの段階でエラーとして扱われます)。試したいときは[TypeScript Playground](https://www.typescriptlang.org/play/)を利用してください。


学習初期段階では `==` の使用を避け、`===` を使用する習慣をつけることが望ましいです。基本的には <span class="masked">`==` でなければ実現できない処理</span> は存在しません。`===` と必要に応じての明示的な型変換を組み合わせることで、あらゆる比較操作が可能です。

同様に「等価ではないこと」を判定するためには `!==` (**厳密不等価演算子**) を使用するようにしてください (`!=` の使用は避けてください)。

### オブジェクトの比較 (重要)

厳密等価演算子 (`===`) あるいは等価演算子 (`==`) による「**オブジェクトの比較**」では、<span class="masked">オブジェクトの「参照」の比較</span> が行われ、参照が同じであれば `true`、そうでなければ `false` を返します。配列についても同様に「**参照の比較**」が行なわれます。

オブジェクトの「参照」とは、C言語で言えば「**ポインタ**」、Pythonで言えば「**オブジェクトID**」に相当するものです。

例えば、以下の `todo1` と `todo2` は、同じ値のプロパティを持っていますが、**それぞれ別のオブジェクト** (つまり、異なる「参照」、C言語的に言えば異なる「アドレス」、Python的に言えば異なる「オブジェクトID」) であるため、**第17行目** の出力は <span class="masked">`false`</span> となります。

```typescript{.numberLines caption="src/comp1.ts"}
import type { Todo } from "./types.js";

const todo1: Todo = {
  name: "TypeScriptの勉強",
  priority: 1,
  isDone: false,
  deadline: new Date(2024, 9, 11, 9, 45),
};

const todo2: Todo = {
  name: "TypeScriptの勉強",
  priority: 1,
  isDone: false,
  deadline: new Date(2024, 9, 11, 9, 45),
};

console.log(todo1 === todo2); // 比較結果は「false」
```

一方で、次の `comp2.ts` の **第17行目** の出力は <span class="masked">`true`</span> となります。

**第12行目** の `todo2 = todo1` で行われるのは、いわゆる「**浅いコピー** (Shallow Copy) = 参照のコピー」であるため、そのような結果になります。この「**浅いコピー**」についてはPG1の[第13回講義](https://takeshiwada1980.github.io/Programming1-2024/lecture13.html#リストの浅いコピーと深いコピー)で丁寧に解説しているので再読してください。

```typescript{.numberLines caption="src/comp2.ts"}
import type { Todo } from "./types.js";

const todo1: Todo = {
  name: "TypeScriptの勉強",
  priority: 1,
  isDone: false,
  deadline: new Date(2024, 9, 11, 9, 45),
};

// ここで行なわれるのは「浅いコピー」、
// つまり「参照」のコピーであることに注意
const todo2 = todo1;

todo2.name = "COBOLの勉強をする";
todo2.priority = 3;

console.log(todo1 === todo2); // 比較結果は「true」

console.log(todo1.name);
```

既にPG1で、同様の内容を学んできていると思うので理解できると思いますが `comp2.ts` の最後で `console.log(todo1.name);` を実行したとき、その出力は <span class="masked">「COBOLの勉強をする」</span> となります。

### オブジェクトの深い比較

参照の比較ではなく、**オブジェクトのプロパティがすべて等しいかを比較するためには**、つまり、**深い比較 (Deep Comparison) をするためには**、カスタム比較関数を自作する必要があります (ライブラリを使うという手段もありますが...)。以下に Todo 型オブジェクトの深い比較をするための関数 `deepEqual` の実装例を示します。

```typescript{.numberLines caption="src/utils/deepEqual.ts (深い比較を行なうためのカスタム比較関数)"}
import type { Todo } from "../types.js";

export const deepEqual = (todo1: Todo, todo2: Todo): boolean => {
  if (todo1 === todo2) {
    return true;
  }

  if (
    todo1.name === todo2.name &&
    todo1.priority === todo2.priority &&
    todo1.isDone === todo2.isDone &&
    todo1.deadline.getTime() === todo2.deadline.getTime()
  ) {
    return true;
  }

  return false;
};
```

以上の `deepEqual` を使用することで、`todo1` と `todo2` を同一とみなすような深い比較が可能となります。

```typescript{.numberLines caption="src/comp3.ts"}
import type { Todo } from "./types.js";
import { deepEqual } from "./utils/deepEqual.js"; // 追加

const todo1: Todo = {
  name: "TypeScriptの勉強",
  priority: 1,
  isDone: false,
  deadline: new Date(2024, 9, 11, 9, 45),
};

const todo2: Todo = {
  name: "TypeScriptの勉強",
  priority: 1,
  isDone: false,
  deadline: new Date(2024, 9, 11, 9, 45),
};

console.log(todo1 === todo2); // 浅い比較 false
console.log(deepEqual(todo1, todo2)); // 深い比較 true
```

実際に `utils/deepEqual.ts` を実装して実験してください。

### 三項演算子

React開発では、**条件演算子 (三項演算子)** も頻繁に使われるので覚えておいてください。条件演算子の基本構文は次のようになります。

```
条件 ? 真の場合の値 : 偽の場合の値
```

上記の `条件` の部分には「真偽値の変数」や「各種比較演算子を使った式」を与えます。`if` 構文を使うよりも短く簡潔に記述ができます。以下に例を示します。

```typescript{.numberLines caption="src/prac08.ts"}
import type { Todo } from "./types.js";

const todo1: Todo = {
  name: "TypeScriptの勉強",
  priority: 3,
  isDone: false,
  deadline: new Date(2024, 9, 11, 9, 45),
};

const state = todo1.isDone ? "【済】" : "【未】"; // 条件演算子
console.log(`${state}${todo1.name}`);
```

React開発では、以下のようにオブジェクトの状態によって適用する CSS (画面上の装飾) を切り替えるために **条件演算子 (三項演算子)** がよく使用されます。

```typescript{.numberLines caption="優先度に基づくスタイリング"}
const style = todo.priority === 1 ? "font-bold" : "";
```

```typescript{.numberLines caption="タスクの完了状態に基づくスタイリング"}
const style = todo.isDone ? "text-gray-500 line-through" : "text-slate-800";
```

(参考) 上記のコードの処理と完全一致しているわけではないので注意してください。

![img](figs/02/todo_01.png)

## Reactにおける状態 (オブジェクト) の変更の検知 ～概要～

Reactでは「**極めて大雑把に言えば、＜オブジェクト＞の状態が変更されたことを検知してライブラリ (React) が自動でウェブ画面を書き換える**」ということが行われます (画面=[DOM (Document Object Model)](https://www.google.com/search?q=Domとは))。

ここでの **＜オブジェクト＞** とは、例えば、ここまで何度も登場している `todo` です。そのオブジェクトの「状態が変更された」とは、例えば `name` や `isDone` などの **プロパティ (属性) に変更が生じた** ということを意味します。

オブジェクトのプロパティの変更は、以下の **第14行目** や **第15行目** のように行なうことができます。

```typescript{.numberLines caption="src/prac09.ts"}
import type { Todo } from "./types.js";
import { printTodo } from "./utils/printTodo.js";

const todo1: Todo = {
  name: "TypeScriptの勉強",
  priority: 3,
  isDone: false,
  deadline: new Date(2024, 9, 11, 9, 45),
};

console.log(`■ 状態変更前`);
printTodo(todo1);

todo1.name = "COBOLの勉強をする"; // プロパティの変更
todo1.priority = 1; // プロパティの変更

console.log(`■ 状態変更後`);
printTodo(todo1);
```

実行結果は以下のようになります。確かに **第14行目** と **第15行目** の操作によって「プロパティが変更されていること」が確認できます。

```
■ 状態変更前
(優先度: 3) TypeScriptの勉強 期日: 2024/10/11 09:45
■ 状態変更後
(優先度: 1) COBOLの勉強をする 期日: 2024/10/11 09:45
```

しかし、**極めて重要なポイントとして**、**上記のような操作でオブジェクトのプロパティを変更しても**、Reactは <span class="masked">オブジェクトの状態に変更があったことを検知してくれません</span>。つまり、オブジェクトを変更しても、それを反映するようにウェブ画面の更新 (=再レンダリング) をしてくれません😭。

Reactがオブジェクトの状態変更を検知しない理由は...

> Reactはオブジェクトの「**参照**」が変更されたときに、「オブジェクトが変更された」と検知・判断して画面の再レンダリングするという仕組みになっている (重要)

...ためです。さきほどの[6.2 オブジェクトの比較](lecture02.html#オブジェクトの比較-重要) の `comp2.ts` で示したように、`=` でコピーをしても「参照」は変化しません。また、プロパティを変更しても「参照」は変化しません。

**(プロンプト例)**

> TypeScript (JavaScript) において、オブジェクトの「参照」とはなんですか。いまいちイメージがつかめません。

### Reactが変更を検知可能なオブジェクトの生成

Reactが変更を検知できるようにオブジェクトを生成する方法を解説します。これは、React開発において **特に重要な操作** となってくるので、しっかりと覚えておいてください。

まずは、次のように新たにオブジェクトを生成することで、オリジナル (`todo`) とは <span class="masked">参照が異なるオブジェクト (`updatedTodo`)</span> を生成することができます。


```typescript{.numberLines caption="src/prac10.ts"}
import type { Todo } from "./types.js";

const todo: Todo = {
  name: "TypeScriptの勉強",
  priority: 1,
  isDone: false,
  deadline: new Date(2024, 9, 11, 9, 45),
};

// Reactの状態管理に適した
// todo とは参照が異なる updatedTodo を生成
const updatedTodo: Todo = {
  name: "COBOLの勉強をする", // 変更
  priority: 3, // 変更
  isDone: todo.isDone, // todo の値を引き継ぐ
  deadline: todo.deadline, // todo の値を引き継ぐ
};

// todo と updatedTodo の参照が「異なること」を確認
console.log(todo !== updatedTodo); // true であれば OK
```

ただし、多数のプロパティを持ったオブジェクトについて上記の方法は非常に冗長になります。例えば20個のプロパティを持ったオブジェクトについて、1個のプロパティだけを変更する場合でも、20個のプロパティを列挙する必要があります (コードの可読性が著しく低下します)。

そのようなときに、次のような **スプレッド構文** が利用されます。

```typescript{.numberLines caption="src/prac10.ts (部分抜粋)" startFrom=10}
const updatedTodo: Todo = {
  ...todo, // スプレッド構文
  name: "COBOLの勉強をする", // 変更
  priority: 3, // 変更
};
```

スプレッド構文は、**オブジェクトのプロパティを展開して新しいオブジェクトに組み込む機能** を持っています。これにより、元のオブジェクトのプロパティをコピーしつつ、特定のプロパティだけを変更するコードをシンプルに書くことができます。

なお、スプレッド構文を使用する際は、<span class="masked">プロパティを記述する順序</span> に注意してください。あとに記述するプロパティは、前のプロパティを上書きします。

```typescript{.numberLines caption="不適切な記述" startFrom=10}
const updatedTodo: Todo = {
  name: "COBOLの勉強をする",
  ...todo,
  priority: 3,
};
```

上記の場合、priority は `3` に更新されますが、`name` は `todo` の値 (`"TypeScriptの勉強"`) で上書きされてしまいます。

**(プロンプト例)**

> Reactでオブジェクトの変更を検知するために「スプレッド構文」を使う必要があるのですが、「スプレッド構文」の文法や意味が分かりません。

#### 定着確認

次のプログラムにつづけて、`isDone` が `true` に変更されたオブジェクトを変数 `updatedTodo` に得てください。

ただし、Reactが `todo` との差異を検知可能なように `updatedTodo` の参照は、`todo` の参照とは異なるようにしてください。また、スプレッド構文を使用して記述してください。

```typescript{.numberLines caption="演習"}
import type { Todo } from "./types.js";

const todo: Todo = {
  name: "TypeScriptの勉強",
  priority: 1,
  isDone: false,
  deadline: new Date(2024, 9, 11, 9, 45),
};

// const updatedTodo: Todo =

```

## 授業時間外学習

- 次回の授業のはじめに「**小テスト**」を実施します。筆記用具を持参してください。
- 本科目は「**学修単位科目**」です。今回の講義内容 +アルファ に関して **4時間相当の授業時間外学習** に取り組んでください。
  - この講義資料を再読・熟読し「不明な用語」や「理解が不十分な用語」があればインターネットや、ChatGPTなどの生成AIを利用して解決してください。また、興味関心を持ったトピックについて、ウェブ、生成AI、YouTube動画などを利用して知識を広げ、理解を深めてください。
  - 特に **(プロンプト例)** を示しているものについては、実際に生成AIにプロンプトを投げ、さらに対話を重ねることで、知識の幅を広げるだけでなく、理解をより深く確かなものにしてください。
  - 講義資料内の「演習」に再度取り組んでください。演習内容は、授業時間中に1回取り組むだけでは定着しないので注意してください。
- 次回の授業では「配列」について取り上げ、`map` や `filter` などの **配列操作メソッド** (高階関数) を扱います。これらは React で頻繁に使われるものになります。予習することを強く推奨します。
  - YouTube検索: [TypeScript map](https://www.youtube.com/results?search_query=typescript+map)

