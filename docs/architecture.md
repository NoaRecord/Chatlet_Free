# Chatlet Architecture & 設計思想

Chatlet Free は、ChatGPTの強力なウェブインターフェース（SPA）とシームレスに機能するように設計された軽量なブックマークレットです。

## 主な特徴
1. **セキュリティ優先 (Zero Server-side Overhead)**
   - サーバにデータを送信しません。ユーザー情報、入力履歴、プリセット内容は、完全にブラウザ内部でのみ処理されます。

2. **React追従型の入力インジェクション**
   - ChatGPTの入力欄はReactのステート（状態管理）によって厳しく管理されています。単に `textarea.value` を書き換えるだけでは、ChatGPT側のエンジンが状態変化に気づかず、送信ボタンが有効になりません。
   - Chatletでは以下のように、値を書き換えた直後に明示的に `input` イベントをディスパッチすることで、Reactに状態変化を直接通知し、完全な相互運用を保証しています。
   ```javascript
   inputElement.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
   ```

3. **DOM階層に依存しない会話フィルタリング (最新10ターン抽出)**
   - 各ターンの会話要素に付与されている `data-testid="conversation-turn-N"` を利用して、古いチャットログをCSSの特定セレクトによって非表示します。
   - これにより、チャット表示数を意図的に制限し、視界をすっきりさせて集中力を担保（集中モード）できます。
