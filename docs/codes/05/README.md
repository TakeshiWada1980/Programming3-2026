# 第05回：Todo アプリの配布コード

第04回で構築した React + TypeScript + Tailwind CSS のプロジェクトで使います。依存関係や設定ファイルは第04回のものを継承します。

各フォルダには、その段階で差し替えるファイルを置いています。**プロジェクトの src フォルダに、同名のファイルとして配置してください。** 段階ごとに新しい Vite プロジェクトをつくる必要はありません。

- `step00`: 開始時点。App・TodoList・WelcomeMessage・types・initTodos の確認用コード。
- `step01`: 名前・優先度・期限をコードで固定した Todo の追加。
- `step02`: 名前の入力と、追加後の名前のリセット。
- `step03`: 優先度の選択とリセット。
- `step04`: 日時入力とリセット。期限を指定しない場合は null。
- `step05`: 名前の検証、エラー表示、form の送信、追加ボタンの無効化。
- `step06`: 完了切り替え。App と TodoList を差し替える。一覧には星・期限・完了表示を追加。
- `step07`: 完了済みの一括削除。TodoList は step06 のまま。
- `step08`: 個別削除。App と TodoList を差し替える。
- `step09`: TodoItem への分割を終えた、LocalStorage 導入前の完成形。src 内の 6 ファイル一式。
- `step10`: LocalStorage による永続化。App を差し替え、ほかのファイルは step09 のものを使う。

途中の段階から再開するときは、`step00` の共通ファイル、再開する段階の App、および直近の TodoList を使用します。たとえば step07 から再開する場合、App は step07、TodoList は step06、WelcomeMessage・types・initTodos は step00 のものです。

`todo-before-localstorage.zip` は、step09 の 6 ファイルを `src/` フォルダにまとめたものです。既存の src/main.tsx と src/index.css は継続して使います。

各段階で `npm run build` と `npm run lint` を実行して確認できます。step00 の setTodos は次の段階で使うため、開始時点では未使用の警告が 1 件出ます。

step00〜step09 では LocalStorage はまだ使いません。ブラウザをリロードすると、データは initTodos の初期状態に戻ります。step10 ではキー「TodoApp」に保存した配列を復元します。保存された空配列も維持し、キーが存在しない場合だけ initTodos を使います。この例はアプリ自身が保存した正しい形式の JSON データを前提としています。
