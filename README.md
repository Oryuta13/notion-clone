# 概要

Notion のクローンアプリを作成しました。

# 使用技術

- Typescript(React Hooks)
- React.js
- Redux Toolkit
- MaterialUI
- Axios
- Node.js
- Express
- MongoDB

# 技術選定理由

「課題要件だから」という理由以外で述べさせて頂きます。

- Typescript
  - 静的型付けであるため即座にエラー箇所がわかり、型を定義することで堅牢な開発が可能。
- React.js
  - 仮想 DOM という技術を使用してパフォーマンスを最適化することでレンダリングが高速。
  - コンポーネントベースで管理するため自由度高く開発が可能。小さいパーツで分けておくことで管理がしやすく再利用も可能。
- Redux Toolkit
  - user 管理に使用しました。ログインしている user 情報を使いグローバルに管理するため。
- MaterialUI
  - デフォルトでスタイルのあたったコンポーネントを組み合わせるだけで比較的容易に UI を構築できる為、学習コストが低い。
- Axios
  - fetch と比べて、Node.js と相性が良いため。
- Node.js
  - シングルスレッドを採用しており、多くの接続があってもリアルタイムでレスポンスを返せる。
  - 開発に使用する言語を JavaScript に統一できる。
- Express
  - Node.js のフレームワークの中で 1 番シェアが多いため、ネット上に情報が多く落ちており学習コストが低いと思った為。
- MongoDB
  - MySQL などの RDB は使ったことがあり NoSQL は使ったことが無かったのでこの機会に使ってみたかった為。

# 機能一覧

/////////

# 開発の流れ

- Github-flow を用いて機能ごとにブランチを切り、プルリクエストからマージまで実務を想定して開発を行いました。

- TypeScript を使ったことが無かった為、まず JavaScript でプロトタイプを実装しその後、ts-migrate を使って TypeScript に移行しました。

# 工夫したところ

- JWT を使った認証機能の実装

  - 新規登録時に JWT をサーバーで発行しクライアントで持つことで次回ログイン時に楽になるようにしました。

- EmojiPicker の実装
  - EmojiMart ライブラリを使って絵文字の選択画面を作り UX の向上を図りました。個人的に Notion といえば絵文字のイメージも思い浮かんだので実装しました。

# 大変だったところ

- JWT を使った認証機能の実装
  //////////

- MongoDB 関連はドキュメントや記事が少なく、欲しい情報にたどり着くのに苦労した。

# 改善したい箇所

- TypeScript の型の種類が多すぎてどの型が適しているのか分からないことが多くあり、記事などを参考になんとか型を定義している段階ですが、まだ any 型を使ってしまっている箇所もあり保守性や堅牢性に欠けるコードを改善していきたい。

- 機能面がまだメモ機能しかないのでタスク管理機能などのテンプレートも作ってみたい。

- デプロイがまだ出来ていないので、実際に周りの人に使ってもらえるように AWS 等でデプロイしたい。
