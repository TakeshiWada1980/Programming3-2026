---
var:
  header-title: "2025-3I プログラミング3 第07回 講義資料"
  header-date: "2025年11月20日（木）5・6時限"
---

# 第07回 3I-プログラミング3

## 連絡

### 小テスト実施

「**小テスト5**」を実施します。

### 課題1について

[課題1](lecture05.html#課題1)<font size=-1>～ ぼくのかんがえたさいきょうのTodoアプリ ～</font> の提出期限は「**11月19日 (水) 23時**」です。

まだ、提出していない場合は、直ちに Teamsの「**PG3-課題1**」にリポジトリのURLを提出してください。

- [提出されたTodoAppの共有](https://omunet-my.sharepoint.com/:t:/g/personal/z21707r_omu_ac_jp/EbU8myRl3IJJny0f_QNRyHIBanMY_sgtuBABoS0nf1rszg?e=7J9XuH) <font size="-1">(学内のみ)</font>
- 課題の採点後は、修正版の再提出・追提出があっても原則として再評価はしません (＝<u>採点がTeamsでフィードバックされるまでは内容を更新しても問題ありません</u>)。

### 今後の授業の流れ

今後の授業の大まかな流れは、次のようになっています。

1. Next.js 開発環境の構築 **_済_**
2. ブログアプリの「**フロントエンド開発**」のチュートリアル **← 今回の授業**
    - ヘッドレスCMS ([microCMS](https://microcms.io/)) との連携
3. ブログアプリの「**バックエンド開発**」のチュートリアル **← 次回 (中間試験明け) の授業**
    - [supabase](https://supabase.com/) と [vercel](https://vercel.com/) の利用
4. ブログアプリのカスタマイズとつくり込み → **_課題2_**
5. オリジナルのウェブアプリ → **_課題3_** (最終課題)
    - [2024年度の学生作品](https://omunet-my.sharepoint.com/:t:/g/personal/z21707r_omu_ac_jp/EVLWOU5xMd5LqQ3yVCpRmEYBLBWOQR8BX9R302NUTB3quA?e=bh9paV)<font size="-1">学内のみアクセス可</font>

※ **CMS**: <span class="masked">Content Management System</span>、コンテンツ管理システム。

## 投稿記事の「詳細」を表示する機能の実装

トップページに表示される「記事一覧」のなかの各記事をクリックすると、**記事詳細ページに遷移する機能** や **外部サイトに配置した画像を表示する機能** を実装していきます。

![img](figs/07/app_03.png)

ここでは `/posts/[id]` というパスにアクセスすると「記事の詳細 (全文)」と「カバーイメージ (画像)」が表示されるように実装していきます。

ところで Next.js において、URLパスのなかの `[id]` のような表記は <span class="masked">パラメータプレースホルダ</span> とよばれ、そこには **動的に値が入ること** を意味します。具体的には、次のように[投稿記事のID](https://github.com/TakeshiWada1980/Programming3-2024/blob/main/docs/codes/06/dummyPosts.ts)を表す文字列が `[id]` の部分に埋め込まれるようなURLパターンを `/posts/[id]` のように表記します。

- 投稿1 `/posts/36b7c693-4cce-4d73-afa3-acb54a404290`
- 投稿2 `/posts/24f932b8-231b-429b-b9dc-569f07ba16a7`
- 投稿3 `/posts/1d4cbd35-6ec2-4f34-b3e7-4a9b35a60d1a`

### ハイパーリンクの追加

詳細記事へのリンクを実装するために、まずは `PostSummary.tsx` (前回講義で作成済み) の JSX のなかに ``<Link href={`/posts/${post.id}`}>...<Link>`` という **ハイパーリンク設定** を追加してください。Linkコンポーネントは「文字列」だけではなく、次のように <span class="masked">div要素</span> を**子要素**にすることもできます (そのdiv要素内の領域であれば、どこをクリックしてもリンクするように設定できます)。

```ts{.numberLines caption="src/app/_components/PostSummary.tsx (抜粋・実装例)"}
{/* ファイルの先頭で「Linkコンポーネント」のインポートが必要です */}
<Link href={`/posts/${post.id}`}>
  <div className="mb-1 text-lg font-bold">{post.title}</div>
  <div
    className="line-clamp-3"
    dangerouslySetInnerHTML={{ __html: safeHTML }}
  />
</Link>
```

上記 **第02行目** の ``href={`/posts/${post.id}`}`` により `post.id` **に応じて動的にハイパーリンク先を設定** していることを確認してください。なお、**Linkコンポーネントのインポート** については、既に実装済みの `Header.tsx` を参照してください。

上記の変更ができたら、現時点でハイパーリンクが機能すること (=**記事概要をクリックするとブラウザのアドレバーの「URLパス」が変化すること**) を確認してください。また、リンク先のコンテンツが存在しないときに、どのようになるのかも実際に確認してください。

開発では、<span class="masked">(いまさらですが) こまめに部分的な動作確認を繰り返すこと</span> が重要です。また、デベロッパーツールのコンソールタブから、**エラーや警告が発生していないことを定期的に確認すること** も大切です。

### 記事詳細ページの作成

リンク先のコンテンツ (= **記事詳細ページのコンテンツ**) を作成していきます。

まずは、次のような構成になるようにプロジェクトにフォルダを追加してください。つまり、`/src/app` のなかに `posts` フォルダを作成して、さらに、そのなかに `[id]` フォルダを作成してください。前回講義でも解説したように Next.js では <span class="masked">フォルダ構成が、そのまま「URLパス」に対応する仕組み</span> となるため、フォルダの「**名前設定**」や「**階層構造**」には十分に注意を払ってください。

![img](figs/07/vscode_01.png)

次に `[id]` フォルダのなかに `page.tsx` というファイルを作成して、URLパスの `[id]` に対応した記事詳細を表示 (例えば、`[id]` が `36b7c693-4cce-4d73-afa3-acb54a404290` であれば「**投稿1**」を表示) するためのコードを記述してください。

```ts{.numberLines caption="src/app/posts/[id]/page.tsx"}
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ◀ 注目

import type { Post } from "@/app/_types/Post";
import dummyPosts from "@/app/_mocks/dummyPosts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import DOMPurify from "isomorphic-dompurify";

// 投稿記事の詳細表示 /posts/[id]
const Page: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 動的ルートパラメータから 記事id を取得 （URL:/posts/[id]）
  const { id } = useParams() as { id: string };

  // コンポーネントが読み込まれたときに「1回だけ」実行する処理
  useEffect(() => {
    // 本来はウェブAPIを叩いてデータを取得するが、まずはモックデータを使用
    // (ネットからのデータ取得をシミュレートして１秒後にデータをセットする)
    setIsLoading(true);
    const timer = setTimeout(() => {
      console.log("ウェブAPIからデータを取得しました (虚言)");
      // dummyPosts から id に一致する投稿を取得してセット
      setPost(dummyPosts.find((post) => post.id === id) || null);
      setIsLoading(false);
    }, 1000);

    // データ取得の途中でページ遷移したときにタイマーを解除する処理
    return () => clearTimeout(timer);
  }, [id]);

  // 投稿データの取得中は「Loading...」を表示
  if (isLoading) {
    return (
      <div className="text-gray-500">
        <FontAwesomeIcon icon={faSpinner} className="mr-1 animate-spin" />
        Loading...
      </div>
    );
  }

  // 投稿データが取得できなかったらエラーメッセージを表示
  if (!post) {
    return <div>指定idの投稿の取得に失敗しました。</div>;
  }

  // HTMLコンテンツのサニタイズ
  const safeHTML = DOMPurify.sanitize(post.content, {
    ALLOWED_TAGS: ["b", "strong", "i", "em", "u", "br"],
  });

  return (
    <main>
      <div className="space-y-2">
        <div className="mb-2 text-2xl font-bold">{post.title}</div>
        <div>
          <Image
            src={post.coverImage.url}
            alt="Example Image"
            width={post.coverImage.width}
            height={post.coverImage.height}
            priority
            className="rounded-xl"
          />
        </div>
        <div dangerouslySetInnerHTML={{ __html: safeHTML }} />
      </div>
    </main>
  );
};

export default Page;
```

ここで注目すべき処理は、

- **第19行目** の **URLパス** (動的ルートパラメータの `[id]` の部分) から、具体的な値 (文字列) を取得する処理
- 上記の `id` に一致するブログ記事を、`dummyPosts` から探して **第15行目** で宣言している状態 (state) にセットする処理

...になります。


#### パラメータプレースホルダの処理

URLパスから `id` を取得する処理は、**第03行目** でインポートしている `useParams` という Hook を利用して **第19行目** で行なっています。

なお、`useParams` は <span class="masked">2個以上のパラメータプレースホルダを持つケース</span> にも対応しています。例えば `/posts/[categoryId]/[postId]` となっているときは、次のように **categoryId** と **postId** の値を取得することができます。

```ts{.numberLines caption="複数のパラメータプレースホルダから値の取得する例"}
// src/app/posts/[categoryId]/[postId]/page.tsx
const { categoryId, postId } = useParams() as { categoryId: string; postId: string };
```

パラメータプレースホルダに与えられる値が「数値」であっても、まずは「**文字列**」として取得してから <span class="masked">`parseInt()`などを使って「数値」に変換する必要</span> があります。

---

なお、`useSearchParams` や `useLocation` というHooksも存在します。`useParams` の違いは生成AIを使って解決してください。

**(プロンプト例)**

> React (Next.js) における useParams と useSearchParams、useLocation の「違い」や「使い分け」について解説してください。

#### findメソッドによる検索

`id` と一致する記事の取得は、配列操作メソッドの `find` を使って  **第29行目** で行なっています。`filter` は条件を満たす要素の「**配列**」を戻り値としていましたが、`find` は条件を満たす <span class="masked">単一の要素 (配列の先頭からチェックして一番初めに条件を満たした単一の要素)</span> を戻り値とします。なお、条件に一致する要素が存在しなかったときは `undefined` を返します。

ここでは、idに該当する記事が存在しないことを `undefined` ではなく `null` を使って扱いたいので、次のようにしています。これにより `dummyPosts.find((post) => post.id === id)` の結果が `undefined` のとき、`setPost(null)` となります。

```ts{.numberLines caption="src/app/posts/[id]/page.tsx (抜粋)" startFrom=29}
setPost(dummyPosts.find((post) => post.id === id) || null);
```

上記処理を、段階に分けて書けば以下のようなコードとなります。

```ts{.numberLines caption="等価な処理"}
const foundPost = dummyPosts.find((post) => post.id === id);
if (foundPost !== undefined) {
  setPost(foundPost);
} else {
  setPost(null);
}
```

<div class="note type-tips">
**「null」と「undefined」の使い分けについて**

`null` と `undefined` は、条件式の内部で単体で評価すると同じ結果（falsyな値）になるなど同じような挙動を示すことがありますが、実際には **両者には様々な差異** があります。そして、慣れないうちは、実際問題として `null` **と** `undefined` **の使い分けが難しい** という場面が多々あります。

例えば **第15行目** では `useState<Post | null>(null)` としていますが、これを `useState<Post | undefined>(undefined)` としていない理由を説明しようとすると (理解して納得するためには)、Typescript や Next.js、React に関しての一定の知識と経験が必要となってきます。また、ここで `undefined` を使ったとしても、実質的に動作上の問題もありません。

ただ、大まかなには、次のように使い分けると良いと思います。

- `undefined` は **言語システムが自動的に設定する値** として考える
- `null` は **開発者が意図的に「値が存在しない」ことを表現したい場合** に使用する

両者の違いや、使い分けについては、時間があるときに生成AIを利用して (学習の段階に応じて) 徐々に理解を深めていってください。
</div>

#### 不正なidを受け取ったときの処理

ウェブブラウザのアドレバーにURLが直接入力された場合などは、**不正なid** を受け取ることがあります。**第48行目** から **第50行目** は、そのような場合に対処する実装となります。

![img](figs/07/app_05.png)
 
#### 動作確認と画像取得に関する設定変更

`src/app/posts/[id]/page.tsx` を作成、保存したら開発モードで動作を確認してください。トップページの記事概要から詳細ページに移動すると、次のようなエラーが発生します。

![img](figs/07/app_02.png)

これは、エラーメッセージから読み取れるように (`public`フォルダなどのプロジェクト内部に配置した画像ではなく) <span class="masked">外部サイトから画像を取得して表示しようとしていること</span> に起因します。Next.js のデフォルト設定では、「セキュティ」と「パフォーマンス最適化」の観点から **外部からの画像の読込みが制限** されるようになっています。

**(プロンプト例)**

> Next.js のデフォルト設定では、外部からの画像の読込みが制限されています。この理由について教えてください。

外部からの画像の読込みを許可するためには、プロジェクトフォルダの直下に配置されている `next.config.ts` を次のように変更します。

```js{.numberLines caption="next.config.ts (特定の外部オリジンからの画像の読込みの許可)"}
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "w1980.blob.core.windows.net" },
    ],
  },
};

export default nextConfig;
```

複数のサイトを設定したいときは、次のように設定します。

[placehold.jp](https://placehold.jp)は、<span class="masked">指定したサイズでダミー画像 (モックアップ用の画像)</span> を生成してくれるウェブサービスとなっています。ウェブアプリ開発の初期段階で非常に役立つサービスなので覚えておいてください。

```js{.numberLines caption="next.config.ts"}
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "w1980.blob.core.windows.net" },
      { protocol: "https", hostname: "placehold.jp" },
    ],
  },
};

export default nextConfig;
```


`next.config.ts` の変更後は、稀に**ホットリロードが効かないこと**があります。そのときは、開発サーバを停止してから、再度、起動して動作を確認してください。今度は、記事詳細ページのなかで次のように画像が表示されるはずです。

![img](figs/07/app_01.png)

#### 演習 (宿題: <i class="fa-solid fa-stopwatch"></i> 30分) 

記事詳細のページのなかに「**投稿日**」と「**カテゴリ**」の情報が表示されるように実装してください。またデザインなどをカスタマイズして、つくり込みをしてください。

## ウェブから記事データを取得

ここまではモック (`src/app/_mocks/dummyPosts.ts`) からブログ記事のデータを取得して利用してきましたが、これを <span class="masked">ウェブAPIを使ってバックエンドから取得できる</span> ようにアップデートしていきます。

### ウェブAPIとは

まずは [zipcloud](https://zipcloud.ibsnet.co.jp)が提供している[郵便番号検索API](https://zipcloud.ibsnet.co.jp/doc/api)(=**郵便番号から住所の取得が可能なウェブAPI**) というウェブサービスを利用して、**外部からデータを取得する処理** について学んでいきます。

現在、ウェブAPI (Web Application Programming Interface) の多くは **HTTP/HTTPS** を使って <span class="masked">JSONフォーマット</span> でデータを取得できるように設計・実装がされています。ここで利用する[郵便番号検索API](https://zipcloud.ibsnet.co.jp/doc/api)についても、**HTTPSでリクエスト**を送って**JSONフォーマット**で住所データが取得できるサービスになっています。また、このあと利用する[microCMS](https://microcms.io/)も、Next.js で実装するバックエンドについても、そのような設計・実装になっています。

[郵便番号検索API](https://zipcloud.ibsnet.co.jp/doc/api)は、利用に際して **HTTPヘッダに認証情報等を付加する必要がないので**、ブラウザから直接利用することができます。Chromeのアドレスバーに次のURLを入力すると、以下のようにJSONフォーマットのレスポンスを得ることができます。

- `https://zipcloud.ibsnet.co.jp/api/search?zipcode=572-0832`

![img](figs/07/api_01.png)

また、次のような **不正なリクエスト** を送信すると、どのようなレスポンスが返ってくるかを把握してください。

- `https://zipcloud.ibsnet.co.jp/api/search?zipcode=999-9999`
- `https://zipcloud.ibsnet.co.jp/api/search?zipcode=ABC`

URL (URI) のなかで `?` 以降の部分を <span class="masked">クエリパラメータ (Query Parameter)</span> や「**クエリ文字列 (Query String)**」と呼びます。クエリパラメータは、ウェブサーバーに対して追加のパラメータを送信するために使用され <span class="masked">`パラメータ名=値`</span> の形式で指定します。

**2個以上のパラメータ**を指定する場合は `&` で区切ります。例えば、`limit=5` というパラメータを追加したい場合は <span class="masked">`?zipcode=999-9999&limit=5`</span> のようにクエリパラメータを与えます。

<div class="note type-tips">
**URLエンコード**

クエリパラメータに、日本語やスペース、記号などの特殊文字を使用したい場合があります。しかし、このような文字をそのままURLに使用すると問題が発生する可能性があるため、<span class="masked">URLエンコード (パーセントエンコード)</span> という処理で安全な文字列に変換する必要があります。

例えば、半角スペースは `%20`、「大阪」という文字は `%E5%A4%A7%E9%98%AA` のようにURLエンコーディングすることができます。JavaScript では組込み関数の encodeURI() や encodeURIComponent() を使用してURLエンコーディングができます (2つの関数の差異については生成AIを使って調べてください)。

以下のURLは `tbm=isch` と `q=大阪` というクエリパラメータを与えている例となります (「tbm=isch」は画像検索のためのパラメータになります)。

- `https://www.google.com/search?tbm=isch&q=%E5%A4%A7%E9%98%AA`
</div>


### 郵便番号検索APIの組込み

Next.js のコンポーネントのなかで、[郵便番号検索API](https://zipcloud.ibsnet.co.jp/doc/api)にリクエストを送って、そのレスポンスとして得られるJSONデータに基づいてコンテンツを構築する仕組みを実装をしていきます。

具体的には `http://localhost:3000/playground/zip-code/572-0832` というパスにアクセスしたとき、次のような画面が表示されるように設計・実装していきます。

![img](figs/07/app_04.png)

まずは `src/app` に `playground` というフォルダを作成して、そこに `zip-code` というサブフォルダを作成してください。さらに `zip-code` のなかに `[code]` というフォルダを作成して、そこに `page.tsx` を作成してください。

```
📂 src/app/
└─ 📂 playground/
    └─ 📂 zip-code/
        └─ 📂 [code]/
            └─ page.tsx
```

`page.tsx` には、以下のコードを記述してください。

```ts{.numberLines caption="src/app/playground/zip-code/[code]/page.tsx"}
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const Page: React.FC = () => {
  const endpoint = "https://zipcloud.ibsnet.co.jp/api/search";
  const { code } = useParams() as { code: string };
  const [response, setResponse] = useState<string>("APIからデータを取得中...");

  useEffect(() => {
    const fetchAddressFromZipCode  = async () => {
      // ウェブAPIにGETリクエストを送信してレスポンスを取得
      const requestUrl = `${endpoint}?zipcode=${code}`;
      const response = await fetch(requestUrl, { // ◀◀ 注目
        method: "GET",
        cache: "no-store", // キャッシュを利用しない
      });
      console.log("ウェブAPIからデータを取得しました");

      // レスポンスからJSON形式でデータ取得して整形して表示
      const parsedData = await response.json(); // ◀◀ 注目
      setResponse(JSON.stringify(parsedData, null, 2));
    };

    fetchAddressFromZipCode (); // 関数を実行
  }, [code]);

  return (
    <main>
      <div className="mb-5 text-2xl font-bold">{`郵便番号 ${code} の検索`}</div>
      <div className="space-y-3">
        <div>実行結果</div>
        <pre className="rounded-md bg-green-100 p-3 text-sm">{response}</pre>
      </div>
    </main>
  );
};

export default Page;
```

はじめに開発モードで起動して、`http://localhost:3000/playground/zip-code/572-0832` にアクセスした意図したように機能することを確認してください。

![img](figs/07/app_04.png)

このコードのなかで注目すべき箇所は **第10行目** から **第26行目** にかけての `useEffect` の処理になります。

メインとなるデータ取得の処理は `useEffect(() => {...},[code])` のなかに記述されており、**Pageコンポーネントが読み込まれたとき (マウントされたとき)** と、`code` が変更されたとき **だけ**、APIからのデータ取得が実行されるようになっています。


`useEffect` の内部では、**第11行目** から **第23行目** にかけて `fetchAddressFromZipCode` がアロー関数形式で定義され、それが **第25行目** で呼び出されています。`fetchAddressFromZipCode` の内部では `async` と `await` という<span class="masked">「非同期処理」を取り扱うためのキーワード</span> が使用されています (非同期処理の詳細は次のセクションで解説します)。そして、ウェブAPIからデータを取得するメイン処理は **第14行目** の `fetch` という組み込み関数で行なわれています。

「fetch」とは、ウェブアプリの文脈では <span class="masked">データを外部から取得する</span> や <span class="masked">リモートのリソースを読み込んでくる</span> という意味になります。関数 `fetch` の **第1引数** にはウェブAPI の URL (エンドポイントとも呼ばれます) を与え、**第2引数** にはリクエストのオプション設定を与えます。

---


なお、**第33行目** の `<pre>...</pre>` は、**Preformatted Text** (整形済みテキスト) のためのタグで、タグに囲まれた子要素の内容を <span class="masked">「スペース」や「改行」などをそのままに、等幅フォントで</span> 出力する機能を持ちます。

#### 演習 (<i class="fa-solid fa-stopwatch"></i> 5分) 

**第33行目** の `<pre>` タグを以下のように `<div>` タグに書き換えて、画面表示がどのように変化するか確認してください。

```ts{.numberLines caption="src/app/playground/zip-code/[code]/page.tsx (抜粋・変更前)" startFrom=32}
<pre className="rounded-md bg-green-100 p-3 text-sm">{response}</pre>
```

```ts{.numberLines caption="src/app/playground/zip-code/[code]/page.tsx (抜粋・変更後)" startFrom=32}
<div className="rounded-md bg-green-100 p-3 text-sm">{response}</div>
```

## 同期処理と非同期処理

ここでは「**同期処理**」や「**非同期処理**」の概要について学んでいきます。

<div class="note type-caution">
**注意**: ここでは **正確性・厳密性をある程度犠牲にして、分かりやすさを優先した解説**になることを了承ください。詳しいことについては、ウェブや生成AIを利用して理解を深めてください。
</div>

アプリ開発の文脈において「**同期処理**」や「**非同期処理**」とは <span class="masked">プログラム (タスク) の実行順序についての制御方式</span> を指す用語になります。ざっくりと言えば、同期処理は「**順次実行**」、非同期処理は <span class="masked">「並列実行」</span> を基本とした制御方式になります。

例えば、次のような順序でプログラムが書かれているとき：

```
関数1();
関数2();
関数3();
```

**同期処理** (Synchronous Processing) とは、`関数1()` から `関数3()` までを **ひとつずつ順番に実行する方式** になります。つまり `関数1()` の**完了を待ってから** `関数2()` が実行されます。また、`関数2()` の**完了を待ってから** `関数3()` が実行されます。JavaScript や Python など、ほとんどのプログラミング言語では **非同期処理のための特別なキーワード** (`async` など) を使用しない限り、このような同期処理で実行されます。

一方で **非同期処理** (Asynchronous Processing) とは、`関数1()` の**完了を待たずに** <span class="masked">`関数2()` が実行され</span>、また `関数2()` の**完了を待たずに** `関数3()` が実行されるような制御方式となります。

### 同期処理の動作確認

はじめに **同期処理** について、**動作や挙動を確認するための実験**をしていきます。ブログアプリのプロジェクトフォルダに、次のような実験のためのファイルを作成してください。

```ts{.numberLines caption="src/app/playground/sync/page.tsx"}
"use client";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const syncTask = (name: string) => {
  // なんらかの処理が実行されると仮定
  console.log(`同期処理 ${name} が完了しました`);
};

const Page: React.FC = () => {
  const syncProcess = () => {
    console.log("関数 syncProcess を開始");
    syncTask("処理1");
    syncTask("処理2");
    syncTask("処理3");
    console.log("関数 syncProcess の最後に到達");
  };

  return (
    <main>
      <div className="mb-5 text-2xl font-bold">
        同期処理を理解するための実験1
      </div>
      <div className="space-y-3">
        <button
          type="button"
          onClick={syncProcess}
          className={twMerge(
            "rounded-md px-3 py-1",
            "bg-indigo-500 font-bold text-white hover:bg-indigo-600"
          )}
        >
          同期処理の実行
        </button>
        <div className="flex justify-items-start space-x-2">
          <div>
            <FontAwesomeIcon
              icon={faGear}
              className="animate-spin text-2xl [animation-duration:2s]"
            />
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <input
                id={`cb-${i}`}
                type="checkbox"
                className="mr-1"
                defaultChecked={i === 1}
              />
              <label htmlFor={`cb-${i}`} className="font-bold">
                項目{i}
              </label>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
```

上記のプログラムは `async` や `await` などのキーワードを含まない、つまり **非同期処理を含まない純粋な「同期処理」のプログラム** となっています。まずは、開発モードでサーバを起動して `/playground/sync` にアクセスして、次のようなコンテンツが表示されることを確認してください。

そして、画面内の「**同期処理の実行**」を押下したとき (つまり **第28行目** の設定によって、関数 `syncProcess` がコールされたとき)、デベロッパーツールのコンソールに <span class="masked">どのような順序で、どのようなログが出力されるか</span> について少し考えてみてください。これは同期処理なので、難しく考えず普通に素直に考えてもらってOKです。

![img](figs/07/sync_01.png)

コンソール出力がどのようになるか、予測できたでしょうか。実際に「同期処理の実行」のボタンを押下して結果を確認してみてください。次のような結果となるはずです。

```
関数 syncProcess を開始
同期処理 処理1 が完了しました
同期処理 処理2 が完了しました
同期処理 処理3 が完了しました
関数 syncProcess の最後に到達
```

予測したように各処理は、プログラムの **第13行目** から **第17行目** にかけて記述した順番通りに実行され、ログが出力されています。つまり、`syncTask("処理1")` の完了を待ってから `syncTask("処理2")` が実行されていることが確認できました。同様に `syncTask("処理2")` の完了を待ってから `syncTask("処理3");` されていることが確認できました。

ところで、これは視点を変えれば `syncTask("処理1")` の実行中は、後続の処理である `syncTask("処理2")` の **実行が一時的に中断されている状態** とみることもできます。このような実行の中断状態のことを <span class="masked">ブロッキング (blocking)</span> と呼びます。このとき、`syncTask("処理1")` は実行中のタスクとして、後続の `syncTask("処理2")` の実行を「**ブロック**」していると表現します。

### 処理時間を要するタスクを同期処理で扱うときの問題

次に `src/app/playground/sync/page.tsx` を次のように書き換えてください。**第11行目** の `heavySyncTask` は、**処理時間を要するタスク** (実行完了までに時間のかかるタスク) を疑似的にシミュレートしている関数になります。

この「**処理時間を要するタスク**」とは、フロントエンド開発で言えば具体的には <span class="masked">ウェブAPIからのデータの取得</span> や、大量のデータを処理する計算、複雑なDOM操作などが相当します。

`page.tsx` を書き換えたら、先ほどと同様に「**同期処理の実行**」のボタンを押下したとき、どのようなコンソール出力が得られるかを考え、その後、実際に実行してみてください。

```ts{.numberLines caption="src/app/playground/sync/page.tsx"}
"use client";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const syncTask = (name: string) => {
  // なんらかの処理が実行されると仮定
  console.log(`同期処理 ${name} が完了しました`);
};

const heavySyncTask = (workload: number) => {
  // なんらかの重たい処理が実行されると仮定
  const startTime = Date.now();
  while (Date.now() - startTime < workload) { }
  const ret = Math.floor(Math.random() * 10);
  console.log("同期処理 heavySyncTask が完了しました");
  return ret;
};

const Page: React.FC = () => {
  const syncProcess = () => {
    console.log("関数 syncProcess を開始");
    syncTask("処理1");
    heavySyncTask(2000); // 実行完了に2000msかかる処理
    syncTask("処理2");
    syncTask("処理3");
    console.log("関数 syncProcess の最後に到達");
  };

// 以下、変更なし 
```

コンソール出力は (予測のとおりに) 次のようになったはずです。ただ、**それとは別に画面内に変化があったこと**に気づいたでしょうか。もし、気付かなかったときは、再度「同期処理の実行」のボタンを押下してください。

```
関数 syncProcess を開始
同期処理 処理1 が完了しました
同期処理 heavySyncTask が完了しました
同期処理 処理2 が完了しました
同期処理 処理3 が完了しました
関数 syncProcess の最後に到達
```

処理時間を要するタスクを含む場合、ボタン押下後に <span class="masked">歯車マークのCSSアニメーションが止まってしまうこと</span> に気づけたでしょうか。そして、ややあって「**関数 syncProcess の最後に到達**」というログが出力され、アニメーションの実行アニメーションが再開されることに気付いたでしょうか。つまり、`syncProcess` **の実行が完了するまではアニメーションが停止してしまうという問題**が生じます。

そして、もうひとつ、`syncProcess` の **実行が完了するまで** は <span class="masked">チェックボックスをクリックしても応答しなくなってしまうこと</span> も確認してください。このようにフリーズしたような状態というのは、ユーザ体験 (UX) を著しく悪化させることになります。

![img](figs/07/sync_02.png)

### 同期処理で問題が起こる原因

なぜ「**このようなことが起きるのか**」について紐解いていきます。

ウェブブラウザで実行される JavaScript では、開発者が記述したプログラムの処理 (例えば `syncProcess` など) に加えて、実は、次のような処理も担当しています。

- **DOMイベント** (クリックやスクロールなどのユーザー操作) への応答
- **レンダリング処理** (CSSアニメーションの実行を含む) 

これらの処理は、特に非同期処理として明示されていない限り **メインスレッド** (あるいはUIスレッド) とよばれる **単一のスレッド** において常に1つずつ順番に処理されることになります。そのため、`heavySyncTask` のような実行時間の長いタスクを同期的に処理すると、先ほど確認したようにアニメーションやユーザ操作 (チェックボックスのクリックなど) に対する応答がブロックされることになります。

このブロッキングは実際には常に発生していますが、ユーザ処理が軽い場合 (数ミリ秒程度で完了する場合) は、その時間が短すぎて知覚することはありません。しかし、**ウェブAPIからのデータの取得** のように時間のかかる処理を同期的に実行すると、UIの明らかな停止としてUXを損ねることになります。

このようなことから、JavaScript では **HTTPリクエストを実行する標準機能** として `fetch` という非同期処理が提供されています。開発者が誤って同期的な実装をしないように、`fetch` について同期バージョンは提供されていません。

### 非同期処理

以上に示したような同期処理の問題 (ブロッキング) を回避するために、JavaScript には **非同期処理の仕組み** が用意されています。まずは、実際に実装して、その動作を確認してみます。新規に `src/app/playground/async/page.tsx` を作成して、以下のコードを記述してください。

全体構造は、先ほどの同期処理と同じですが、**第11行目** の `heavyAsyncTask` 関数が大きく書き換わっています。`heavyAsyncTask` は `async` キーワードが付けられた <span class="masked">非同期処理を含んだ関数</span> となっています (非同期処理の本体部分は **第12行目** です)。

```ts{.numberLines caption="src/app/playground/async/page.tsx"}
"use client";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const syncTask = (name: string) => {
  // なんらかの処理が実行されると仮定
  console.log(`同期処理 ${name} が完了しました`);
};

const heavyAsyncTask = async (workload: number) => {
  await new Promise((resolve) => setTimeout(resolve, workload));
  const ret = Math.floor(Math.random() * 10);
  console.log("非同期処理 heavyAsyncTask が完了しました");
  return ret;
};

const Page: React.FC = () => {
  const asyncProcess = () => {
    console.log("関数 asyncProcess を開始");
    syncTask("処理1");
    heavyAsyncTask(2000); // 実行完了に2000msかかる非同期処理
    syncTask("処理2");
    syncTask("処理3");
    console.log("関数 asyncProcess の最後に到達");
  };

  return (
    <main>
      <div className="mb-5 text-2xl font-bold">
        非同期処理を理解するための実験1
      </div>
      <div className="space-y-3">
        <button
          type="button"
          onClick={asyncProcess}
          className={twMerge(
            "rounded-md px-3 py-1",
            "bg-indigo-500 font-bold text-white hover:bg-indigo-600"
          )}
        >
          非同期処理の実行
        </button>
        <div className="flex justify-items-start space-x-2">
          <div>
            <FontAwesomeIcon
              icon={faGear}
              className="animate-spin text-2xl [animation-duration:2s]"
            />
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <input
                id={`cb-${i}`}
                type="checkbox"
                className="mr-1"
                defaultChecked={i === 1}
              />
              <label htmlFor={`cb-${i}`} className="font-bold">
                項目{i}
              </label>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
```

`/playground/async` にアクセスして「**非同期処理の実行**」のボタンを押下してみてください。デベロッパーツールのコンソール出力は次のような結果となったはずです。

![img](figs/07/async_01.png)

ここで注目してほしいことは、非同期関数 `heavySyncTask(2000);` の**完了を待たず**に `syncTask("処理2")`、`syncTask("処理3")` が実行されているということです。そして「非同期処理 heavyAsyncTask が完了しました」は、`heavySyncTask(2000)` をコールしている `asyncProcess` の実行完了後に出力されています。また、同期処理のときとは違い、「アニメーション」や「チェックボックス操作」がブロックされないことも確認してください。

ところで、この場合 `heavySyncTask()` の結果に基づいた後続処理をしたい (例えば、戻り値を `syncTask("処理3")` に与えたい) ときにどうすればよいか、という問題に気づいたでしょうか。現状のままでは、`heavySyncTask()` の完了を待たず、`syncTask("処理3")` は実行されてしまうため、そのような処理ができません。

### awaitを用いた非同期処理の完了待機

非同期関数 `heavyAsyncTask` の完了を待って、そのあとに `syncTask("処理3")` を実行したいときは、次のように `async` と `await` キーワードを使用して `asyncProcess` を書き換えます。

```ts{.numberLines caption="src/app/playground/async/page.tsx (抜粋)" startFrom=18}
const Page: React.FC = () => {
  const asyncProcess = async () => { // ◀ async キーワードの追加
    console.log("関数 asyncProcess を開始");
    syncTask("処理1");
    const asyncTask = heavyAsyncTask(2000); // ◀ 変更
    syncTask("処理2");
    const num = await asyncTask;  // ◀ 変更
    syncTask(`処理3 num=${num}`);  // ◀ 変更
    console.log("関数 asyncProcess の最後に到達");
  };
// 以下、変更なし 
```

まずは、実行結果を確認してください。コンソールのログからは、次のように「heavyAsyncTask の完了を待って、処理3 が実行されていること」が確認できるはずです。また、<span class="masked">アニメーションやUI応答がブロックされないこと</span> もあわせて確認してください。

```
関数 asyncProcess を開始
同期処理 処理1 が完了しました
同期処理 処理2 が完了しました
非同期処理 heavyAsyncTask が完了しました
同期処理 処理3 num=1 が完了しました
関数 asyncProcess の最後に到達
```

上記の結果から推測できるように、キーワード `await` を使用すると <span class="masked">非同期処理の完了を待機</span> できるようになります。この際、**メインスレッドをブロッキングすることなく**、非同期処理が完了するまで現在の関数 (ここで言えば `asyncProcess`) の実行を一時停止することができます。

なお、`syncTask("処理2")` も、`heavyAsyncTask` の完了を待ってから実行したい場合、次のように記述することができます。

```ts{.numberLines caption="src/app/playground/async/page.tsx (抜粋)" startFrom=19}
const Page: React.FC = () => {
  const asyncProcess = async () => { // ◀ async キーワードの追加
    console.log("関数 asyncProcess を開始");
    syncTask("処理1");
    const num = await heavyAsyncTask(2000); // ◀ 変更
    syncTask(`処理2 num=${num}`);  // ◀ 変更
    syncTask(`処理3 num=${num}`);  // ◀ 変更
    console.log("関数 asyncProcess の最後に到達");
  };
// 以下、変更なし 
```

#### 演習 (<i class="fa-solid fa-stopwatch"></i> 10分) 

`await` は、`async` キーワードをつけた関数のなかでのみ使用できます。**20行目** の `async` キーワードを削除すると、どのようなエラーが発生するか確認してください。

### 改めて郵便番号検索APIの利用処理を確認

非同期処理について概要が理解できたところで、**郵便番号検索APIからデータを取得する処理** について改めてプログラムを確認していきます。

```ts{.numberLines caption="src/app/playground/zip-code/[code]/page.tsx (再掲・抜粋)" startFrom=10}
useEffect(() => {
  const fetchAddressFromZipCode  = async () => {
    // ウェブAPIにGETリクエストを送信してレスポンスを取得
    const requestUrl = `${endpoint}?zipcode=${code}`;
    const response = await fetch(requestUrl, { // ◀◀ 注目
      method: "GET",
      cache: "no-store", // キャッシュを利用しない
    });
    console.log("ウェブAPIからデータを取得しました");

    // レスポンスからJSON形式でデータ取得して整形して表示
    const parsedData = await response.json(); // ◀◀ 注目
    setResponse(JSON.stringify(parsedData, null, 2));
  };

  fetchAddressFromZipCode (); // 関数を実行
}, [code]);
```

- **第11行目** で `async` キーワードを付けているのは、その内部で `await` を使用するためです。

- **第14行目** で `await fetch (...)` としているのは `fetch` が「**非同期処理**」であり、なおかつ、その完了を待ってから **第18行目** を実行したいためです。

- **第21行目** で `await response.json()` としているのは、`json()` メソッドが「**非同期処理**」で実装されており、<span class="masked">その完了を待って (=その「戻り値」を使って) 後続の`setResponse`を実行したいため</span> です。

なお、`json()` メソッドは HTTP/HTTPSレスポンスのボディ部が**JSONフォーマットであることを前提に**オブジェクトへの変換を行います。関数やメソッドが「**非同期処理かどうか**」は、VSCodeのエディタ上でカーソルをあわせて表示されるツールチップで、その関数/メソッドの「戻り値」が `Promise<...>` であるかで判断できます。

![img](figs/07/async_02.png)

最後に、**第11行目** で `fetchAddressFromZipCode` をアロー関数形式で定義して、それを **第25行目** でコールするという (面倒な) 手続きをしているのは、<span class="masked">useEffect のなかには、非同期処理を直接書くことができない</span> という仕様のためです。

#### 演習 (<i class="fa-solid fa-stopwatch"></i> 5分) 

次のように `useEffect` の第1引数として、`async` キーワードを使った非同期関数を与えると、どのような警告やエラーが発生するか確認してください。

```ts{.numberLines caption="useEffectに非同期処理を直接記述できない"}
useEffect(async () => {
  // ウェブAPIにGETリクエストを送信してレスポンスを取得
  const requestUrl = `${endpoint}?zipcode=${code}`;
  const response = await fetch(requestUrl, {
    method: "GET",
    cache: "no-store", // キャッシュを利用しない
  });

  // レスポンスからJSON形式でデータ取得して整形して表示
  const parsedData = await response.json();
  setResponse(JSON.stringify(parsedData, null, 2));
}, [code]);
```

## ブログ記事のデータをウェブから取得

ウェブAPIからJSONフォーマットのデータを取得し、それをオブジェクトに変換する処理について学んだので、これをブログアプリに適用してみたいと思います。ブログ記事の一覧がJSONフォーマットで取得可能なエンドポイントとして、以下を用意したので、これを利用してきます。

- [https://w1980.blob.core.windows.net/pg3/posts.json](https://w1980.blob.core.windows.net/pg3/posts.json)


まずは、ブラウザからアクセスしてJSON形式で記事データが取得可能なことを確認してください。こちらには「投稿4」が追加されています。

![img](figs/07/app_06.png)

トップページ (`src/app/page.tsx`) の実装を次のように変更して、ウェブから記事が取得することができることを確認してください。基本的には、ここまでに学んできたことの組み合わせになります。

```ts{.numberLines caption="src/app/page.tsx (ウェブから記事を取得)"}
"use client";
import { useState, useEffect } from "react";
import type { Post } from "@/app/_types/Post";
import PostSummary from "@/app/_components/PostSummary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Page: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const requestUrl = "https://w1980.blob.core.windows.net/pg3/posts.json";
        const response = await fetch(requestUrl, {
          method: "GET",
          cache: "no-store", // キャッシュを利用しない
        });
        if (!response.ok) {
          throw new Error("データの取得に失敗しました");
        }
        const data = (await response.json()) as Post[];
        setPosts(data);
      } catch (e) {
        setFetchError(
          e instanceof Error ? e.message : "予期せぬエラーが発生しました"
        );
      }
    };
    fetchPosts();
  }, []);

  if (fetchError) {
    return <div>{fetchError}</div>;
  }

  if (!posts) {
    return (
      <div className="text-gray-500">
        <FontAwesomeIcon icon={faSpinner} className="mr-1 animate-spin" />
        Loading...
      </div>
    );
  }

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

実行すると次のような結果が得られると思います。

![img](figs/07/app_07.png)

ここまでの実装で、このブログアプリに**「閲覧者」としてアクセスしたとき**のフロントエンド処理の本質な実装の**概ね完了**したことなります (ただし**「投稿者」としてアクセスしたとき**のフロントエンドは、まだ実装できていません)。

## microCMSを利用したバックエンドの構築

フロントエンド開発が一段落したので、次回の後期中間試験明けの講義からは <span class="masked">Next.js を利用したバックエンド開発</span> を進めていきます。しかし、それに先立ってバックエンドの「役割」や「機能」について理解するために、ヘッドレスCMS である [microCMS](https://microcms.io/) を使って、このブログアプリのバックエンド部分を構築してみたいと思います。

CMS とは <span class="masked">Content Management System</span> の頭文字をとったもので、ウェブを使って<u>コンテンツの作成・管理・公開ができるようなシステム全般</u>を指します。用途によって、ウェブサイト構築用のCMS ([WordPress](https://www.google.com/search?q=wordpressとは)が超有名!!)、教育用のCMS (Moodle や GoogleClassroom) 、コンテンツ共有プラットフォーム ([note](https://note.com/)、[Zenn](https://zenn.dev/)、[Qiita](https://qiita.com/)、各種Wiki、各種ブログ) などに分類できます。いずれも通常の利用範囲では**プログラミングの知識は不要**で、また**専用ソフトも不要**という特徴があります。

このなかで **ヘッドレスCMS** (Headless CMS) とは、コンテンツの「**公開**」や「**閲覧**」に関する部分について<u>ビューやUIなどのフロントエンド機能を提供しないタイプのCMS</u>、つまり <span class="masked">コンテンツの閲覧・公開機能がAPIだけで提供</span> されるCMSと言えます。

[microCMS](https://microcms.io/)は、このようなヘッドレスCMSに分類されるサービスになります。microCMS を利用すると、次のように **「ブログ投稿者」としての投稿記事の作成や編集** は microCMSのサイトで行なって、**「閲覧者」としての投稿記事の取得** はウェブAPIで行なって「ビュー や UI は React を使って自分で自由にデザイン・実装する」という使い方が可能になります。

![img](figs/07/cms_00.png)

皆さんには、後期中間試験後にバックエンドについても Next.js で実装してもらいますが、[microCMS](https://microcms.io/)などのヘッドレスCMSと連携すれば、現段階のフロントエンドの実装だけでも実用的なブログアプリとしてリリースすることができます。

### microCMSの利用準備

[microCMS](https://microcms.io/)を利用するための準備を行なっていきます。まずは[microCMS](https://microcms.io/)にアクセスしてユーザ登録をしてください。クレジットカードの登録などは不要で、無料で登録することができます。

登録完了後、ログインして**サービス管理画面** ([https://app.microcms.io/](https://app.microcms.io/)) に移動してください。

ブログ記事のコンテンツの作成・管理・公開のサービスを作成していきます。画面内の「**＋追加**」を押下してください。

![img](figs/07/cms_01.png)

「**1から作成する**」を選択してください。

![img](figs/07/cms_02.png)

サービス情報として「サービス名」と「サービスID」を設定します。サービスIDについては、他のユーザが既に使用しているIDは使用できません。サービスIDは<u>基本的には表側にはでてこない値なので、デフォルト値をそのまま使用することを推奨</u>します。

- ここでは **サービス名** は `next-blog-app` と設定する想定で進めます。

![img](figs/07/cms_03.png)

「**サービスにアクセスする**」のボタンを押下してください。

![img](figs/07/cms_04.png)

サービスのトップページ (`https://[ServiceID].microcms.io/create-api`) に移動したら、「**APIを作成**」というページになっていることを確認して「**自分で決める**」を選択してください。

- もし「APIを作成」のページになっていなければ、左パネルの「**コンテンツ (API)**」の右隣の <i class="fa-solid fa-ellipsis-vertical"></i> を押下して「**＋新しいAPIを作成**」の項目を押下していください。

![img](figs/07/cms_05.png)

API管理用の名前 (**API名**) と、そのAPIを利用するための**エンドポイント** (URL) を設定します。ここでは「**ブログ記事の一覧を取得するためのAPI**」を作成するので、エンドポイントは `posts` に設定します。完了したら、画面右下の「**次へ**」を押下します。

![img](figs/07/cms_06.png)

記事の「**一覧**」を取得するためのAPIを作成するので「**リスト形式**」を選択して、画面右下の「**次へ**」を押下します。

![img](figs/07/cms_07.png)

次のように **APIのスキーマ** (＝構造) を定義します。これは `src/app/_types/Post.ts` で定義した**「Post型」に対応させるように設定**していきます ([参照](https://github.com/TakeshiWada1980/Programming3-2025/blob/main/docs/codes/07/code02.ts))。なお、画面上で説明されているように `id` や `createdAt` は自動的に作成されるので、ここで項目を作成する必要はありません。

また、カテゴリ (`categories`) については、<u>あとのステップで追加</u>します。

![img](figs/07/cms_08.png)

以上のAPIのスキーマ (構造) の設定で、利用準備が整いました。

### microCMSにコンテンツを追加

ここからは、microCMSに **コンテンツ**、つまり、**ブログの投稿記事** を追加していきます。次のように「**ブログ記事**」を選択して「**＋追加**」を押下してください。

- ブラウザの画面幅が狭いと、下図の <font color="deeppink">❷</font> の「**＋追加**」ボタンが隠れているので注意してください。

![img](figs/07/cms_09.png)

APIのスキーマ (構造) で設定した項目 (=タイトル、本文、カバーイメージ) の入力フォームが表示されるので、自由にコンテンツを作成してください (見本のとおりに入力する必要はありません)。

画像も自由に設定してください (画像のアスペクト比も特に気にする必要はありません)。適当な画像がなければ[こちら](https://w1980.blob.core.windows.net/pg3/cover-img-purple.jpg)を利用してください。

入力が完了したら右上の「**公開**」のボタンを押下してください。「**コンテンツを公開します。よろしいですか？**」というアラートが表示されるので「OK」を押下してください。

![img](figs/07/cms_10.png)

もし、以下のダイアログが表示されたら「**APIプレビューを開く**」のボタンを押下してください。

![img](figs/07/cms_11.png)

上記のダイアログが表示されなかったときは、次の操作で **APIプレビュー** を開いてください。

![img](figs/07/cms_12.png)

APIプレビューでは、<u>このブログ記事の一覧を取得するためのAPIのエンドポイント (URL)</u> と、認証のためにHTTPリクエストの **Header** に付加しなければならない `X-MICROCMS-API-KEY` の値が表示されます。基本的には `X-MICROCMS-API-KEY` は <u>公開すべき値ではないので注意</u>してください (とはいえ、フロントエンドからHTTPリクエストを送るので、ちょっと工夫すれば覗けてしまう値ですが…)。

![img](figs/07/cms_13.png)

上記で「**取得**」のボタンを押下すると `https://xxxxxx.microcms.io/api/v1/posts/yyyyyy"` というAPIエンドポイントで取得できる JSON の内容が確認できます。

---

このあとの作業で使用するので、**サービスID** と `X-MICROCMS-API-KEY` (**APIキー**) の値、`contentId` (**投稿記事のID**) の値を、適当なファイルにメモしておいてください。

![img](figs/07/cms_26.png)

**(プロンプト例)**

> APIエンドポイントとはなんですか。

> APIエンドポイントにアクセスする際には `X-MICROCMS-API-KEY` を設定してください、と言われました。何が要求されていますか。

### APIの利用テスト

さきほど作成した MicroCMS の APIエンドポイント に対して、実際に外部から「**HTTP GET リクエスト**」を送信し、JSON (＝**投稿記事の内容**) が正常に取得できるかどうかを確認していきます。

これは Chrome などのウェブブラウザからでも確認できそうですが、HTTPリクエストの **Header に** `X-MICROCMS-API-KEY` **という項目でAPIキーを設定する必要があるため**、ブラウザのアドレスバーにエンドポイントを入力するだけでは、APIの正常な応答が確認できません。

実際にウェブブラウザのエンドポイント `https://サービスID.microcms.io/api/v1/posts/` を入力してみてください。以下のような応答が返ってきます。

![img](figs/07/vscode_03.png)

- もし、応答が `HTTP ERROR 404` であった場合、サービスIDに誤りがあります。確認してください。


このようにウェブAPIは、ウェブブラウザでは十分にテストできないため、専用のツールを使用します。専用ツールとしては[curl](https://www.google.com/search?q=curl+api)や[Postman](https://www.postman.com/)など様々なものがありますが、ここでは VSCode の **httpYac** (識別子 `anweber.vscode-httpyac` ) という拡張機能を利用していきます。

なお、個人開発などで、
既に他の RESTクライアントツール を使い慣れている場合は、それを継続で使用してください。httpYacを別途導入する必要はありません。

![img](figs/07/vscode_04.png)

インストールが完了したら、プロジェクトフォルダのルートに、次のようなフォルダとファイルを新規作成してください。

```
📂 devtools/
└─ 📂 httpYac/
    └─ MicroCMS.http
```

`MicroCMS.http` に次のような内容を記述して保存してください。なお、**第03行目**から**第05行目** には、さきほどメモした値を設定してください。

```txt{.numberLines caption="devtools/httpYac/MicroCMS.http"}
# [Ctrl]+[Alt]+[R] で各セクションを実行

@service_id = xxxxxx
@api_key = zzzzzz
@post_id = yyyyyy

### 全投稿の取得
GET https://{{service_id}}.microcms.io/api/v1/posts
X-MICROCMS-API-KEY : {{api_key}}

### 単投稿の取得
GET https://{{service_id}}.microcms.io/api/v1/posts/{{post_id}}
X-MICROCMS-API-KEY : {{api_key}}
```

<div class="note type-tips">
`MicroCMS.http` には、APIキーなどの情報を含むので、Git管理の対象から外します (GitHubにプッシュしないようにします)。`.gitignore` に `devtools/httpyac` を追記しておいてください。
</div>

ファイルを保存したら、まずは「**全投稿の取得**」のセクションの `send` のボタン (下図参照) を押下してください (あるいは、当該セクションにカーソルがある状態で `[Ctrl]+[Alt]+[R]` を押下してください)。

![img](figs/07/vscode_08.png)

これにより、指定のエンドポイントに HTTPリクエスト が送信されて、HTTPレスポンス が返ってきます。

![img](figs/07/vscode_09.png)

このレスポンスは、次のようなJSONフォーマットのデータになっていることを確認してください。特に <span class="masked">`contents` が `Posts[]` に対応する値</span> になっていることに注意してください (あとで利用することになります)。

```json{.numberLines caption="/api/v1/posts/ のレスポンス"}
{
  "contents": [
    {
      "id": "yyyyyy",
      "createdAt": "2025-11-14T09:37:22.652Z",
      "updatedAt": "2025-11-14T09:37:22.652Z",
      "publishedAt": "2025-11-14T09:37:22.652Z",
      "revisedAt": "2025-11-14T09:37:22.652Z",
      "title": "投稿1",
      "content": "<p>春はあけぼの。</p><p>やうやう白くなゆく...</p>",
      "coverImage": {
        "url": "https://images.microcms-assets.io/assets/zzzz/xxxx/cover-img-purple.jpg",
        "height": 768,
        "width": 1365
      }
    }
  ],
  "totalCount": 1,
  "offset": 0,
  "limit": 10
}
```

また、このレスポンスから、microCMSにアップロードした画像は `https://images.microcms-assets.io/assets/...` に配置されることが分かります。この画像は、カバーイメージとして記事詳細のページのなかで読み込む予定なので `next.config.ts` のなかに「**画像読込みを許可するサイト**」として `images.microcms-assets.io` を追加しておいてください。

```js{.numberLines caption="next.config.ts (画像読込み許可サイトの追加)"}
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "w1980.blob.core.windows.net" },
      { protocol: "https", hostname: "placehold.jp" },
      { protocol: "https", hostname: "images.microcms-assets.io" },
    ],
  },
};

export default nextConfig;
```

さらに、レスポンスが表示されているタブの上部の `HTTP/1.1 200 - OK` の部分をクリックすると...

![img](figs/07/vscode_11.png)

バックグラウンドで送受信された生の「HTTPリクエスト」と「HTTPレスポンス」をヘッダを含めて確認することができます。

![img](figs/07/vscode_10.png)

#### 演習 (<i class="fa-solid fa-stopwatch"></i> 8分) 

- `MicroCMS.http"` の `### 単投稿の取得` のセクションから、「投稿記事 (単体) のデータ」が取得できることを確認してください。

- `MicroCMS.http"` の `@service_id`、`@api_key`、`@post_id` に誤りがあると、それぞれ、どのようなレスポンスになるか実際に確認してください。
  - `@service_id` に誤り 👉 <span class="masked">404 - Not Found</span>
  - `@api_key` に誤り 👉 <span class="masked">401 - Unauthorized</span>
  - `@post_id` に誤り 👉 <span class="masked">404 - Not Found</span>

### カテゴリの追加

つづいて microCMS に「カテゴリ」を作成して、さきほどの「**ブログ記事**」の属性として設定できるようにしていきます。左パネルの「**コンテンツ (API)**」の右隣の <i class="fa-solid fa-ellipsis-vertical"></i> を押下して「**＋新しいAPIを作成**」の項目を押下していください。さらに、APIを作成の「自分で決める」のボタンを押下してください。

![img](figs/07/cms_14.png)

次のように設定してください。投稿記事のときもそうでしたが、データの配列を取得するエンドポイントは `categories` のように **複数形** にすることが一般的になります。設定できたら画面下部の「次へ」を押下してください。

![img](figs/07/cms_15.png)

「**リスト形式**」を選択肢してください。設定できたら画面下部の「次へ」を押下してください。

![img](figs/07/cms_16.png)

次のようにカテゴリAPIのスキーマ (構造) を定義します。これは `src/app/_types/Category.ts` で定義した **「Category型」に対応させるように設定** していきます。設定できたら画面右下の「**作成**」を押下して確定します。

![img](figs/07/cms_17.png)

作成したフィールドに、実際にカテゴリのコンテンツ (`TypeScript` や `React` など) を追加していきます。

![img](figs/07/cms_18.png)

とりあえず、適当に2個ほどカテゴリに設定する値 (`TypeScript` や `React` など) を自由に追加してください。

![img](figs/07/cms_19.png)

![img](figs/07/cms_27.png)


「**ブログ記事**」の属性として、「**カテゴリ**」を設定できるようにAPIスキーマ (構造) を変更していきます。画面から「**ブログ記事**」を選択して、「**API設定**」を選択してください。

![img](figs/07/cms_20.png)

「**APIスキーマ**」を選択して、「**＋フィールドを追加**」を選択してください。

![img](figs/07/cms_21.png)

次のように設定してください。ひとつの「ブログ記事」に複数個のカテゴリが設定できるように、「**種類**」の設定値は「**複数コンテンツ参照**」としてください。

![img](figs/07/cms_22.png)

次のダイアログが表示されるので `Categories` を選択肢して「**決定**」を押下してしてください。

![img](figs/07/cms_22-1.png)

ダイアログが閉じて元の設定画面に戻るので「**変更する**」を押下します。さらに、次のような**確認ダイアログ**が表示されるので、画面の指示に従って「**変更する**」を実行してください。

![img](figs/07/cms_23.png)

以上で設定が完了です。

作成済みの「ブログ記事」に「カテゴリ」の属性を設定していきます。左パネルの「**ブログ記事**」から、さきほど作成したブログ記事 (ステータスが「公開中」になっているもの) を選択して編集モードに切り替え、次の図のように**カテゴリ**の「**追加**」ボタンを押下してください。

![img](figs/07/cms_24.png)

任意のカテゴリを選択して、「**公開**」のボタンを押下してください。

![img](figs/07/cms_25.png)

以上で、ブログ記事にカテゴリが設定できました。

httpYac を使って `https://[ServiceID].microcms.io/api/v1/posts/` からデータを取得して、<span class="masked">そのデータにカテゴリが含まれていること</span> を確認してください。

#### 演習 (<i class="fa-solid fa-stopwatch"></i> 5分) 

エンドポイント `https://[ServiceID].microcms.io/api/v1/categories/` から「**カテゴリ一覧**」が取得できることを確認してください。

- [MicroCMS.httpの記述例](https://github.com/TakeshiWada1980/Programming3-2025/blob/main/docs/codes/07/code03.http)
  - まずは、自分で記述してから参照してください。

## ブログアプリとmicroCMSの連携

microCMS (ウェブAPI) からブログ記事データを取得し、それを表示するように Next.js で開発しているブログアプリを変更していきます。

### 準備: 環境変数の設定

httpYac を使って実験したように、microCMS の API を利用するためには <span class="masked">「APIキー」</span> が必要となります。

一般に、このような **APIキー** や **データベースの接続文字列**、**パスワード** などの認証情報をハードコーディングすること (=<span class="masked">プログラムのソースコードに直書きすること</span>) は **NG行為** となっています。これは Git/GitHub のコミット履歴やリポジトリを通じて、**認証情報が意図せず公開されてしまう可能性があるため** です。

先のセクションで取得した APIキー は (設定を変更しない限りは) 以下のようにブログ記事の **GET (READ) 権限のみ** を持つ設定となっているため、大して問題にはなりませんが、**編集や削除といった権限を持ったAPIキー**が流出・漏洩すると不正利用され実害が生じます。

![img](figs/07/cms_2_01.png)

そこで、一般に認証情報などは <span class="masked">環境変数</span> に格納して管理することが推奨されています。**環境変数**とは OSやシェル環境で設定される変数のことで、プログラムから参照することができます。環境変数を利用する方法には、以下のようなメリットがあります。

1. **セキュリティの向上**：認証情報をソースコードから分離できる
2. **柔軟な管理**：開発環境と本番環境で異なる値を設定できる
3. **安全な共有**：チーム開発時もソースコードのみを共有できる

<div class="note type-caution">
**注意**

ここでは、**フロントエンドのプログラムで「APIキー」を参照**します。フロントエンドプログラムは**ブラウザで実行されるため**、たとえ環境変数に設定したAPIキーであっても、デベロッパーツールを使うと簡単に値 (APIキーの文字列) を取得できてしまいます。

そのため、フロントエンド使用するAPIキーには、**参照 (GET) 権限のみを付与**し、編集・削除などの権限は与えないように注意してください。逆に言えば、編集・削除などの権限を持ったAPIキーは <span class="masked">バックエンドのみで使用</span> するようにしてください。
</div>

Next.js の開発では環境変数の設定に `.env` ファイルを利用します。このファイルは `.gitignore` に追加し、**Gitによるバージョン管理から除外**します。既に[前回講義](lecture06.html#gitignore)で `.gitignore` に `.env` を設定済みですが、再度、確認してください。

確認ができたら、プロジェクトフォルダの直下に `.env` というファイルを作成して、以下の設定を記述して保存してください。`XXXXX` にはサービスID、`YYYYY` には APIキー を記述してください (ダブルクォーテーションで囲む必要はありません)。通常、環境変数は **アッパースネークケース** で名前をつけます。

`#` から始まる行はコメント扱いとなります。<span class="masked">`=`の前後にスペースを入れると予期しない動作</span> を引き起こす可能性があります。

```py{.numberLines caption=".env"}
# microCMS
NEXT_PUBLIC_MICROCMS_BASE_EP=https://XXXXX.microcms.io/api/v1
NEXT_PUBLIC_MICROCMS_API_KEY=YYYYY
```

ここでは、**必ず** `NEXT_PUBLIC_` **というプレフィックス**を付けください。`NEXT_PUBLIC_` を付けていない環境変数は、フロントエンドのプログラムでは参照できません。逆に言えば、<span class="masked">利用者に知られて困る環境変数</span> には `NEXT_PUBLIC_` を付けないようにしてください。

なお、環境変数は、プログラムからは次のように参照できます。

```ts{.numberLines caption="環境変数の参照"}
const apiKey = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;
```

なお、この際、`apiKey` は `string | undefined` 型になります (当該の環境変数が存在しない場合は `apiKey` は `undefined` となります)。

### ブログ記事一覧の表示

microCMS からデータを取得するために `src/app/page.tsx` を次のように変更してください。変更後は、ホットリロードが機能しない場合があるので、そのときは、ブラウザで再読み込みを実行してください。

```ts{.numberLines caption="src/app/page.tsx (microCMSから)"}
"use client";
import { useState, useEffect } from "react";
import type { Post } from "@/app/_types/Post";
import PostSummary from "@/app/_components/PostSummary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Page: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // 環境変数から「APIキー」と「エンドポイント」を取得
  const apiBaseEp = process.env.NEXT_PUBLIC_MICROCMS_BASE_EP!;
  const apiKey = process.env.NEXT_PUBLIC_MICROCMS_API_KEY!;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // microCMS から記事データを取得
        const requestUrl = `${apiBaseEp}/posts`;
        const response = await fetch(requestUrl, {
          method: "GET",
          cache: "no-store",
          headers: {
            "X-MICROCMS-API-KEY": apiKey,
          },
        });
        if (!response.ok) {
          throw new Error("データの取得に失敗しました");
        }
        const data = await response.json();
        setPosts(data.contents as Post[]);
      } catch (e) {
        setFetchError(
          e instanceof Error ? e.message : "予期せぬエラーが発生しました"
        );
      }
    };
    fetchPosts();
  }, [apiBaseEp, apiKey]);

  if (fetchError) {
    return <div>{fetchError}</div>;
  }

  if (!posts) {
    return (
      <div className="text-gray-500">
        <FontAwesomeIcon icon={faSpinner} className="mr-1 animate-spin" />
        Loading...
      </div>
    );
  }

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

**第13行目** と **第14行目** では、環境変数からの値の読込みを行なっています。末尾の `!` は、**Non-null assertion operator** といって <span class="masked">この値は必ず存在する (`undefined`や`null`ではない)</span> ということをコンパイラに明示的に伝えるための演算子になります。この `!` を付けることで `apiKey` と `apiBaseEp` は「string型」となりますが、付けないと「string | undefined型」となってしまいます。これらの値が「string | undefined型」だと、後続のコードで型互換性のエラーが発生するため、ここでは `!` を付けています。

実際に `apiKey` の `!` を外して、どこで型互換性の問題が発生するかを確認してください。

**第21行目** から **第27行目** では、microCMS (ウェブAPI) からの **データフェッチ** を実行しています。`fetch` に与える第2引数のオブジェクトに `headers` 属性を設定することで <span class="masked">HTTPリクエストに任意のヘッダを追加すること</span> ができます。

**第31行目** の `const data = await response.json()` では、HTTPレスポンスをオブジェクトに変換して `data` に格納しています。なお、HTTPリクエストのボディ部が **JSONフォーマットではない場合に** (例えば CSV形式や、その他形式の場合に)`.json()` メソッドを使用すると例外が発生するので注意してください。また、`json()` は <span class="masked">非同期メソッドなので `await` を付けること</span> を忘れないようにしてください。

httpYac を使って[事前確認](lecture07.html#apiの利用テスト)したように、`https://[ServiceID].microcms.io/api/v1/posts/` のレスポンスそのものは `Post[]` **ではありません**。レスポンスのなかの `contents` に `Post[]` に相当する情報が格納されています。そのため、**第32行目** では `setPosts(data.contents as Post[])` のようにしています。なお、`as Post[]` は省略可能です。

以上、動作確認をしてください。なお、開発モードでアプリを立ち上げた直後は、(動的にコンパイルの実行処理の関係で) 高確率でフェッチ処理に失敗するので (=「Loading...」から進まないことがあるので)、その場合は <span class="masked">ブラウザをリロード</span> してください。なお、本番環境では、この問題は生じません。

#### 演習 (宿題: <i class="fa-solid fa-stopwatch"></i> 40分) 

記事詳細のページについても、トップページと同様に microCMS からデータを取得して表示できるように実装しておいてください。

- `https://[ServiceID].microcms.io/api/v1/posts/[投稿記事のid]` のエンドポイントを利用してください。
- 画像の取得に失敗するときは `next.config.ts` の設定を確認してください。
- どうしても実装できないときは[こちら<i class="fa-solid fa-person-chalkboard"></i>](https://github.com/TakeshiWada1980/Programming3-2025/blob/main/docs/codes/07/code01.tsx)を参照してください。

## 宿題

次回の授業 (後期中間試験明け) では、バックエンド開発として **リレーショナルデータベース (RDB)** を扱います。[Progate](https://prog-8.com/)の「SQL 1」のセクション ([https://prog-8.com/lessons/sql/study/1](https://prog-8.com/lessons/sql/study/1)のうち無料利用可能なコンテンツ) を使って予習しておくことをお勧めします。20分程度で取り組むことができます。

![img](figs/07/progate_01.png)

なお、RDBについては、2年次の「情報2」の第13回と第14回でも取り上げています。講義資料と教科書 (キタミ式ITパスポート) の p.160 ～ p.191 もあわせて復習しておくことをお勧めします。