# 🚀 Chatlet Bookmarklet Toolkit
> **Use it. Customize it. Learn from it.**

### 👉 [【超簡単・推奨】ジェネレーター（GitHub Pages）はこちら！](https://NoaRecord.github.io/Chatlet_Free/)
*※自分でソースコードをダウンロードするよりも、ジェネレーターからお気に入りバーへドラッグ＆ドロップで登録する方が圧倒的に簡単で、自作プロンプトの追加やカラー変更も自由自在です！*

---

Chatlet Free は、ChatGPTを数倍便利にする、**完全クライアントサイド動作のオープンソース・ブックマークレット**です。
単なる自動化ツールではなく、「自分で拡張できる技術ベース」および「JavaScriptとブラウザ拡張を学ぶための教材」として設計されています。

---

## 🌟 特徴
- **完全セキュア**: サーバ通信は一切ありません。入力内容や履歴が外部サイトに送信されることは皆無です。
- **軽量・クリーン**: 余分なUIや外部ライブラリを一切使わず、単体の純粋なJavaScriptのみで動作。
- **丁寧なコードコメント**: `src/chatlet_free.js` には保守や理解を助ける日英併記の親切なコードコメントを整備。
- **AIとの相性抜群**: AIにコードを読ませて自分専用のChatGPTカスタム機能を追加・共創するベースとして最適。

---

## 🛠 クイックスタート (登録方法)
1. **ブックマークを追加**: ブラウザのブックマークバーにダミーで何かページを登録します。
2. **URL部分にコードを貼る**: 登録したブックマークを編集し、URL欄に以下のコード（minified版）を上書きペーストします。
   ```javascript
   javascript:!function(){"use strict";const e="chatlet-free-container",t="chatlet-free-style",n="chatlet... (詳細は dist/chatlet_free.bookmarklet.txt を参照)
   ```
3. **ChatGPTで使用**: ChatGPTのページ（https://chatgpt.com）を開き、登録したブックマークを押せば、画面左下に小さくChatletパネルが起動します！

---

## 🎨 プロジェクトフォルダ構成
- `src/chatlet_free.js`: 丁寧な日本語コメント付きの開発・学習用ソースコード。
- `dist/chatlet_free.min.js`: 余計な改行やスペースを詰めた圧縮済の実行コード。
- `dist/chatlet_free.bookmarklet.txt`: すぐにブラウザのブックマークURL欄に貼り付けて使える `javascript:` 形式のコード。
- `examples/`: シーン別のプリセット一覧パック （Starter, Writer, Developerなど）。

---

## ⚖ ライセンス
本プロジェクトは [クリエイティブ・コモンズ 表示 - 非営利 - 継承 4.0 国際ライセンス (CC BY-NC-SA 4.0)](./LICENSE) の下でライセンスされています。非営利目的における自由な使用・改変・再配布が可能です。

---

## ⭐ 応援のお願い
もしこのツールがお気に召しましたら、励みになりますのでぜひ右上の **Star (⭐)** を押して応援してください！要望や不具合報告もリポジトリのIssueにていつでもお待ちしております。
