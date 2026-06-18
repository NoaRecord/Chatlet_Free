export interface PresetItem {
  label: string;
  value: string;
}

export interface PresetPack {
  id: string;
  title: { ja: string; en: string };
  description: { ja: string; en: string };
  presets: { ja: PresetItem[]; en: PresetItem[] };
}

export const presetPacks: PresetPack[] = [
  {
    id: 'starter',
    title: { ja: 'Starter Pack (スターターパック)', en: 'Starter Pack' },
    description: { ja: 'ChatGPTを毎日の相棒にする基本的なショートカット群', en: 'Basic shortcuts to turn ChatGPT into your daily companion' },
    presets: {
      ja: [
        { label: '進めて', value: '今の回答の続き、または次のステップを進めてください。' },
        { label: '要約して', value: '直前の回答、または以下の文章を、要点が一目でわかるように簡潔に要約してください：\n\n' },
        { label: '簡単に説明して', value: '直前の回答（または指定のテーマ）について、専門用語を避け、初心者向けにわかりやすく直感的に説明してください：\n\n' },
        { label: '例を出して', value: '直前の回答で示された内容について、具体的なイメージが湧くわかりやすい例を出して教えてください：\n\n' },
        { label: '箇条書きにして', value: '直前の回答の要点、または以下の内容を、スッキリと見やすい箇条書きで3点程度にまとめてください：\n\n' }
      ],
      en: [
        { label: 'Continue', value: 'Please continue with the next step or complete the unfinished response.' },
        { label: 'Summarize', value: 'Summarize your preceding response, or the following text, in a clear, highly concise way:\n\n' },
        { label: 'Explain Simply', value: 'Explain your preceding response (or the topic below) using intuitive, beginner-friendly terms without using jargon:\n\n' },
        { label: 'Give Examples', value: 'Provide concrete, real-world examples to explain the preceding points or the specified concept:\n\n' },
        { label: 'Bullet Points', value: 'Please summarize the key takeaways of your preceding response (or the following text) in a clean list of 3 bullet points:\n\n' }
      ]
    }
  },
  {
    id: 'writer',
    title: { ja: 'Writer Pack (文章作成・編集)', en: 'Writer Pack' },
    description: { ja: '伝わる文章、スマートな言い回しを瞬時に手に入れる', en: 'Instantly polish text and find the perfect wording' },
    presets: {
      ja: [
        { label: '校正して', value: '直前の回答、あるいは以下の文章を、誤字脱字、不自然な表現、助詞の使い方を中心に校正してください。（※文章が送られていない場合は、あなたの直前の回答文を対象にして修正を加えてください）：\n\n' },
        { label: '短くして', value: '直前の回答、あるいは以下の文章について、内容や要点を崩さず、より簡潔で短い文章に要約・推敲してください。（※文章が送られていない場合は、あなたの直前の回答文を対象に簡潔化してください）：\n\n' },
        { label: '丁寧にして', value: '直前の回答、あるいは以下の文章を、ビジネスやフォーマルで使用できる極めて丁寧で品のある表現に書き直してください。（※文章が送られていない場合は、あなたの直前の回答文を対象に書き換えてください）：\n\n' },
        { label: '分かりやすくして', value: '直前の回答、あるいは以下の文章について、誰が読んでも一読で理解できるよう、明快でわかりやすい表現にリライトしてください。（※文章が送られていない場合は、あなたの直前の回答文を対象にリライトしてください）：\n\n' }
      ],
      en: [
        { label: 'Proofread', value: 'Please proofread the preceding response, or the following text, for grammar, flow, spelling, and clarity (if no input text is provided, please optimize your last response directly):\n\n' },
        { label: 'Shorten It', value: 'Please condense and shorten the preceding response, or the following text, while keeping all core meaning intact (if no input text is provided, please optimize your last response directly):\n\n' },
        { label: 'Make It Polite', value: 'Please rewrite the preceding response, or the following text, to be elegant, polite, and corporate-appropriate (if no input text is provided, please optimize your last response directly):\n\n' },
        { label: 'Make It Clearer', value: 'Please rewrite the preceding response, or the following text, to be extremely clear and easy to understand at first glance (if no input text is provided, please optimize your last response directly):\n\n' }
      ]
    }
  },
  {
    id: 'study',
    title: { ja: 'Study Pack (自学自習・理解向上)', en: 'Study Pack' },
    description: { ja: 'ChatGPTをパーソナル家庭教師に仕立てる学習サポート', en: 'Turn ChatGPT into your personal tutor for learning anything' },
    presets: {
      ja: [
        { label: '初心者向けに説明', value: '直前の内容（または以下のテーマ）について、専門用語を一切使わず、小学生でも完全に理解できるよう直感的な身近な例えを交えて教えてください：\n\n' },
        { label: '理解度を確認', value: 'これまでの説明や直前のやり取りを踏まえて、私の理解度をテストするための4択問題を1題出題してください。私が回答するまで正解は伏せておいてください。' },
        { label: '問題を作成', value: 'これまでの学習テーマ（または以下の内容）に関する練習問題を3つの難易度（基礎、発展、応用）で作成してください。解答は最後にまとめて解説付きで書いてください：\n\n' },
        { label: '重要ポイント', value: 'これまでのやり取りで説明された技術/テーマを学ぶ上で、最も重要で外してはいけない本質的なキーポイントを3点に絞って解説してください。' }
      ],
      en: [
        { label: 'Explain for Beginners', value: 'Explain the preceding explanation (or the topic below) as if I am a complete beginner, using intuitive analogies and avoiding jargon:\n\n' },
        { label: 'Check Understanding', value: 'Based on our preceding explanation and interactions, ask me one multiple-choice question to check my understanding. Do not reveal the answer until I respond.' },
        { label: 'Create Quiz', value: 'Based on our preceding study theme (or the topic below), generate 3 practice questions with progressive difficulty (Easy, Medium, Hard). Provide step-by-step explanations at the very end.' },
        { label: 'Key Takeaways', value: 'What are the 3 most crucial, fundamental key takeaways I must absolutely remember when studying the preceding topic/interaction?' }
      ]
    }
  },
  {
    id: 'developer',
    title: { ja: 'Developer Pack (開発支援・設計)', en: 'Developer Pack' },
    description: { ja: 'コード品質の担保、無駄のないリファクタリング、バグ取りを加速', en: 'Accelerate review, refactoring, writing tests, and catching bugs' },
    presets: {
      ja: [
        { label: 'コードレビュー', value: '直前のコード（あるいは以下のコード）について、パフォーマンス、可読性、安全性の観点から徹底的にコードレビューを行い、具体的な改善案を提示してください：\n\n' },
        { label: 'バグを探して', value: '直前のコード（あるいは以下のコード）に潜むバグ、エッジケース、セキュリティ脆弱性をくまなく見つけ出し、解決済みの修正コードを提供してください：\n\n' },
        { label: 'リファクタリング', value: '直前のコード（あるいは以下のコード）を、SOLID原則や可読性向上、疎結合を意識して、美しく実用的にリファクタリングしてください：\n\n' },
        { label: 'テストケース作成', value: '直前のコードや仕様（あるいは以下のコード）に対応する、網羅的なテストケース案（およびそれを満たすユニットテストコード）を作成してください：\n\n' }
      ],
      en: [
        { label: 'Code Review', value: 'Review the preceding code (or the code below) for performance, readability, style compliance, and security best practices, and suggest architectural enhancements:\n\n' },
        { label: 'Find Bugs', value: 'Locate hidden bugs, quiet failures, edge cases, and security vulnerabilities in the preceding code (or the code below), then supply fixed workable code:\n\n' },
        { label: 'Refactor', value: 'Refactor the preceding code (or the code below) to make it modular, highly readable, conformant, and performant (following standard design patterns):\n\n' },
        { label: 'Create Tests', value: 'Write comprehensive unit test cases (along with the required testing code) to cover all edge cases for the preceding code or specifications:\n\n' }
      ]
    }
  },
  {
    id: 'critical',
    title: { ja: 'Critical Thinking Pack (多角的対話・壁打ち)', en: 'Critical Thinking Pack' },
    description: { ja: '思考の盲点（バイアス）をあぶり出す知的スパイン', en: 'Expose blind spots, challenge assumptions and analyze risks' },
    presets: {
      ja: [
        { label: '問題点を指摘', value: '直前のやり取りで示された私のアイデアや想定（あるいは以下の主張）について、論理的な破綻、現実的な障壁、考慮不足なポイントを厳しく突っ込んで突合してください：\n\n' },
        { label: '反対意見を出して', value: '直前の提案やアサーション（あるいは以下の主張）に対して、最も強力で説得力のある「反対の立場」からの主張や代替視点を提示してください：\n\n' },
        { label: '改善案を出して', value: '直前の企画や文章（あるいは以下の内容）を次のレベルへブラッシュアップするために、足りない要素、付け加えるべき詳細、具体的な構成案を教えてください：\n\n' },
        { label: 'リスク分析', value: '直前の計画やテーマ（あるいは以下の内容）を実行するにあたって、考えられる最悪のシナリオ（リスク要因）を列挙し、それぞれの予防策および対応プランを立案してください：\n\n' }
      ],
      en: [
        { label: 'Find Problems', value: 'Critically analyze my preceding idea/claims (or the ideas below), pointing out logical fallacies, operational weaknesses, or hidden barriers:\n\n' },
        { label: 'Counter Arguments', value: 'Assume a highly critical counter-perspective and raise the strongest objections against my preceding plan/proposal (or the details below):\n\n' },
        { label: 'Suggest Improvements', value: 'Give actionable advice, identify lacking structural dimensions, and suggest concrete revisions to raise my preceding draft/ideas (or the details below) to the next level:\n\n' },
        { label: 'Analyze Risks', value: 'List the worst-case scenario risks associated with our preceding discussion (or the details below), and outline robust mitigation/contingency plans for each:\n\n' }
      ]
    }
  }
];

export const fileTemplates = {
  unminified: `/src/chatlet_free.js`,
  minified: `/dist/chatlet_free.min.js`,
  bookmarklet: `/dist/chatlet_free.bookmarklet.txt`
};

export const markdownDocs = {
  architecture: {
    ja: `# Chatlet Architecture & 設計思想

Chatlet Free は、ChatGPTの強力なウェブインターフェース（SPA）とシームレスに機能するように設計された軽量なブックマークレットです。

## 主な特徴
1. **セキュリティ優先 (Zero Server-side Overhead)**
   - サーバにデータを送信しません。ユーザー情報、入力履歴、プリセット内容は、完全にブラウザ内部でのみ処理されます。

2. **React追従型の入力インジェクション**
   - ChatGPTの入力欄はReactのステート（状態管理）によって厳しく管理されています。単に \`textarea.value\` を書き換えるだけでは、ChatGPT側のエンジンが状態変化に気づかず、送信ボタンが有効になりません。
   - Chatletでは以下のように、値を書き換えた直後に明示的に \`input\` イベントをディスパッチすることで、Reactに状態変化を直接通知し、完全な相互運用を保証しています。
   \`\`\`javascript
   inputElement.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
   \`\`\`

3. **DOM階層に依存しない会話フィルタリング (最新10ターン抽出)**
   - 各ターンの会話要素に付与されている \`data-testid="conversation-turn-N"\` を利用して、古いチャットログをCSSの特定セレクトによって非表示します。
   - これにより、チャット表示数を意図的に制限し、視界をすっきりさせて集中力を担保（集中モード）できます。
`,
    en: `# Chatlet Architecture & Design Philosophy

Chatlet Free is a lightweight bookmarklet designed to work seamlessly with the ChatGPT single-page application (SPA).

## Key Pillars
1. **Security-First (Zero Server-side Overhead)**
   - No data is transmitted to external servers. All custom presets, state toggles, and message dispatches occur entirely within your browser window context.

2. **React-Compliant Prompt Injection**
   - ChatGPT's text editors are structurally governed by React states. Standard modifications to \`textarea.value\` fail to let the app trigger button updates.
   - To interact properly, Chatlet explicitly dispatches standard DOM events to safely sync React with our injections:
   \`\`\`javascript
   inputElement.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
   \`\`\`

3. **Structure-Independent Conversation Filtering (Concentration Toggles)**
   - The bookmarklet detects existing turns labeled with \`data-testid="conversation-turn-N"\` to filter older nodes with a dynamic CSS stylesheet.
   - This keeps your active workspace clean and helps users stay focused.
`
  },
  customization: {
    ja: `# Chatlet カスタマイズ & AI共同開発ガイド

Chatlet Freeは、あなたがAI時代に**「自身でツールを改造すること」**を学び、実践するためのベースとなる学習教材です。
以下は代表的なカスタマイズパターンと、AI（ChatGPT/Gemini/GitHub Copilot）を活用した改造方法です。

## 1. プリセットボタンの追加・変更
\`chatlet_free.js\` 内の \`presets\` 配列を編集することで、オリジナルのボタンを何個でも追加可能です。
\`\`\`javascript
presets: [
    { label: '箇条書き', value: '以下の内容を3点に箇条書きでまとめて：' },
    { label: '英訳', value: '以下の文章を自然な口語体の英語に訳して：' }
]
\`\`\`

## 2. 集中モードの制限ターン数変更
標準の \`LATEST_COUNT = 10\` を \`5\` や \`20\` に変更してアレンジしてください。

## 🤖 AIに改造させるプロンプト例
お手持ちのAIチャットツール、または GitHub Copilot に、\`src/chatlet_free.js\` を貼付けた上で以下のように指示してください。

> 「この Chatlet Free のソースコードに、複数のプリセットを切り替えられる『切り替えタブ（Starter, Writer）』を追加したいです。全体の軽量さを保ちつつ、CSSとDOM生成処理をリファクタして実装を追加してください。」

> 「ポップアップパネルを上部または右側にドラッグ可能（Draggable）にするマウスイベントリスナーを結合してください。ドラッグ中でも追従するようにしてください。」
`,
    en: `# Chatlet Customization & AI-Assisted Co-Development

Chatlet Free is constructed explicitly to serve as a baseline launcher you can customize yourself.
Whether doing manual edits or leveraging AI model pairs (Gemini, ChatGPT, GitHub Copilot), customizing this toolkit is highly intuitive.

## 1. Modifying Preset Key-Value Pairs
Edit the \`presets\` array directly inside \`chatlet_free.js\`:
\`\`\`javascript
presets: [
    { label: 'Bullets', value: 'Summarize into 3 clear bullet points:' },
    { label: 'To English', value: 'Translate the following text into casual, natural English:' }
]
\`\`\`

## 2. Tuning Concentration Turn Limits
Update the constant \`LATEST_COUNT = 10\` to \`5\` or any threshold that matches your screen layout.

## 🤖 Suggested Prompts for AI-Driven Extensions
Copy the \`src/chatlet_free.js\` source to your AI coding sidekick and prompt:

> "Extend this Chatlet Free source code by introducing simple CSS drag hooks, making the entire widget window draggable across the browser screen. Keep code clean and vanilla."

> "Let's append a quick button to easily switch between 'Creative Pack' and 'Developer Pack' templates. Provide a refined compact layout."
`
  }
};

export const readmeText = {
  ja: `# 🚀 Chatlet Bookmarklet Toolkit
> **Use it. Customize it. Learn from it.**

### 👉 [【超簡単・推奨】ジェネレーター（GitHub Pages）はこちら！](https://NoaRecord.github.io/Chatlet_Free/)
*※自分でソースコードをダウンロードするよりも、ジェネレーターからお気に入りバーへドラッグ＆ドロップで登録する方が圧倒的に簡単で、自作プロンプトの追加やカラー変更も自由自在です！*

---

Chatlet Free は、ChatGPTを数倍便利にする、**完全クライアントサイド動作のオープンソース・ブックマークレット**です。
単なる自動化ツールではなく、「自分で拡張できる技術ベース」および「JavaScriptとブラウザ拡張を学ぶための教材」として設計されています。

---

## 🌟 特徴
- **完全セキュア**: サーバ通信は一切ありません。入力内容や履歴が外部サイトに送信されることは皆無です。
- **軽量・クリーン**: 余分な表示や外部ライブラリを一切使わず、単体の純粋なJavaScriptのみで動作。
- **丁寧なコードコメント**: \`src/chatlet_free.js\` には学習用のコメント（\`[学習ポイント:N]\`）が多数。
- **AIとの相性抜群**: AIにコードを読ませて自分だけのオリジナルカスタムツールを共創する学習実験用。

---

## 🛠 クイックスタート (登録方法)
1. **ブックマークを追加**: ブラウザのブックマークバーにダミーで何かページを登録します。
2. **URL部分にコードを貼る**: 登録したブックマークを編集し、URL欄に以下のコード（minified版）を上書きペーストします。
   \`\`\`javascript
   javascript:!function(){"use strict";const e="chatlet-free-container",t="chatlet-free-style",n="chatlet... (以下 minifiedコード)
   \`\`\`
3. **ChatGPTで使用**: ChatGPTのページ（https://chatgpt.com）を開き、登録したブックマークを押せば、画面左下に小さくChatletパネルが起動します！

---

## 🎨 プロジェクトフォルダ構成
- \`src/chatlet_free.js\`: 丁寧な日本語コメント付きの開発・学習用ソースコード。
- \`dist/chatlet_free.min.js\`: 余計な改行やスペースを詰めた圧縮済の実行コード。
- \`dist/chatlet_free.bookmarklet.txt\`: すぐにブラウザのブックマークURL欄に貼り付けて使える \`javascript:\` 形式のコード。
- \`examples/\`: シーン別のプリセット一覧パック （Starter, Writer, Developerなど）。

---

## ⚖ ライセンス
MIT License. 自由に変更・商用利用・再配布して問題ありません。

---

## ⭐ 応援のお願い
もしこのツールがお気に召しましたら、励みになりますのでぜひ右上の **Star (⭐)** を押して応援してください！要望や不具合報告もリポジトリのIssueにていつでもお待ちしております。
`,
  en: `# 🚀 Chatlet Bookmarklet Toolkit
> **Use it. Customize it. Learn from it.**

### 👉 [【Easy & Recommended】Customizer Generator (GitHub Pages) is HERE!](https://NoaRecord.github.io/Chatlet_Free/)
*※ Instead of downloading code and parsing manually, dragging-and-dropping onto your browser bookmarks bar directly from our web generator is extremely easier, fast, and completely customizable!*

---

Chatlet Free is an **open-source, client-side browser bookmarklet** to dramatically speed up your workflow with ChatGPT.
It is intentionally crafted as an interactive tutorial tool to learn how browsers interact with complex SPAs through custom DOM engines.

---

## 🌟 Key Features
- **Zero Privacy Risks**: Runs entirely in local memory inside your tab. It never reaches out to any third-party background API.
- **Pure JavaScript**: Written in clean, readable JavaScript with zero third-party framework layers.
- **Rich Documented Inline Guides**: \`src/chatlet_free.js\` features comprehensive training hooks tagged with \`[学習ポイント:N]\`.
- **Ideal for Jetpack Developers & AI Tutors**: Copy code directly into Gemini or Copilot to collaboratively program visual, reactive overlays!

---

## 🛠 Quick Installation
1. **Create Blank Bookmark**: Simply drag or add any bookmark to your browser bookmark toolbar.
2. **Insert Link Protocol URL**: Edit the bookmark, and replace the URL with the compact minified Bookmarklet code:
   \`\`\`javascript
   javascript:!function(){"use strict";const e="chatlet-free-container",t="chatlet-free-style",n="chatlet...
   \`\`\`
3. **Activate on ChatGPT**: Visit the ChatGPT app (https://chatgpt.com) and click the bookmark. Instantly witness a clean customized controller!

---

## 📐 Project Structure
- \`src/chatlet_free.js\`: Structured unminified source with educational benchmarks.
- \`dist/chatlet_free.min.js\`: Optimized, lightweight runtime code.
- \`dist/chatlet_free.bookmarklet.txt\`: Clipboard-ready executable link syntax.
- \`examples/\`: Preset configuration packs segregated for various creative workflows.

---

## ⚖ License
MIT License. Feel free to copy, modify, redistribute, or build products upon these codes.

---

## ⭐ Support the Project
If you find this toolkit helpful, please support by clicking the **Star (⭐)** button in the top right of this page! Feel free to raise issues or request features anytime.
`
};

export const licenseText = `Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License (CC BY-NC-SA 4.0)

Copyright (c) 2026 Chatlet Bookmarklet Toolkit Contributors

--------------------------------------------------------------------------------------------------
[日本語要約 / Japanese Summary]
本ソフトウェアおよび関連コードは、クリエイティブ・コモンズ 表示 - 非営利 - 継承 4.0 国際ライセンス（CC BY-NC-SA 4.0）の下で提供されています。
利用者は、以下の条件に従う限り、誰でも自由に本ファイルを複製、改変、再配布することができます。

1. 表示 (Attribution):
   適切なクレジット（著作権表示等）を表示し、ライセンスへのリンクを提供する必要があります。
   また、改変を行った場合はその旨を明記する必要があります。

2. 非営利 (NonCommercial):
   営利目的で本ソフトウェアや改変物を販売、あるいは有償の教材等にそのまま利用することはできません。

3. 継承 (ShareAlike):
   本ソフトウェアを改変、加工、またはベースにして新しいツールを作成した場合、その新しい作品についても、
   元の作品と同じCC BY-NC-SA 4.0ライセンスの下で公開する必要があります。

詳細な法文（リーガルコード）は以下をご参照ください：
https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja

--------------------------------------------------------------------------------------------------
[English Summary]
This software and associated files are licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0).
You are free to:
- Share: Copy and redistribute the material in any medium or format.
- Adapt: Remix, transform, and build upon the material.

Under the following terms:
1. Attribution:
   You must give appropriate credit, provide a link to the license, and indicate if changes were made.

2. NonCommercial:
   You may not use the material for commercial purposes.

3. ShareAlike:
   If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

For full legal code, please visit:
https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode`;

export const contributingText = `# Contributing to Chatlet Free OSS Project

Welcome! We are thrilled that you want to contribute to the Chatlet Bookmarklet Toolkit. As an open-source education-oriented project, we encourage customization and community-led optimizations.

## Core Ideals
We strongly value:
- **Cleanliness and Readability**: Keeping the target codebase compact and comment-rich so that beginners feel empowered to review and modify it.
- **Zero Externals**: Not bundling chunky dependencies or complex build steps.
- **Security-First Focus**: Maintaining complete local client execution inside browsers without background telemetry analytics.

## How to Help

### 1. Document New Presets
If you have curated a specialized pack (e.g. Finance-planning Pack, Language-translator Pack), share it as a JSON file in the \`examples/\` directory.

### 2. Share Custom Modules
Created a cool visual slider, an input history buffer, or dragging handlers? Send a Pull Request! Please keep structural hooks clear and include educational inline commenting.

### 3. File Bug Reports
If ChatGPT changes their layout components, the prompt injector may occasionally fail. File an issue detailing exact viewport elements.

Thank you for contributing to OSS education!`;

export const changelogText = `# Changelog - Chatlet Toolkit

All notable changes to the Chatlet bookmarklet toolkit are recorded here.

## [2.0.0] - 2026-06-08
### Added
- Created beautiful multi-page GitHub Pages documentation and code explorer workspace.
- Added Generator form, allowing live customization replacing default button text in local variables.
- Added 5 curated preset packs: Starter Pack, Writer Pack, Study Pack, Developer Pack, and Critical Thinking Pack.
- Formulated full educational guides focusing on Chrome DevTools and AI-driven extensions.

## [1.0.0] - 2026-03-12
### Added
- Released initial Chatlet Free unminified source code.
- Added prompt inject logic using unified state event targets.
- Introduced Concentrated Mode limiting browser turn views to LATEST_COUNT.
- Added basic MIT License and Japanese instructions.`;

export const videosList = [
  {
    title: { ja: '簡単1分！Chatlet Freeのインストールと使い方', en: '1-Minute Guide: Installing & Using Chatlet Free' },
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder embed link
    duration: '01:15',
    description: {
      ja: 'ブラウザのブックマークにChatletを登録し、実際にChatGPTのウェブサイト上で起動、プロンプトを瞬時に送信する一連の基本デモンストレーション動画です。',
      en: 'A quick screen capture showcasing dragging/copying the Bookmarklet to browser bars, navigating into chatgpt.com, and launching the mini interface.'
    }
  },
  {
    title: { ja: 'ChatGPTを120%拡張、プリセットボタンを書き換えよう', en: 'Supercharge ChatGPT: Rewriting Preset Prompts' },
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '03:40',
    description: {
      ja: 'AIとの対話スピードを倍速にするために、自分の目的（プログラミング、執筆など）に特化したカスタムボタンへと中身を書き換える手順を丁寧に解説した動画です。',
      en: 'A visual tutorial explaining how to adjust original values in local systems to map standard workflows like quick language translation and copy-editing.'
    }
  },
  {
    title: { ja: 'Chatlet Standard (作者常用モデル) の紹介', en: 'Introduction to Chatlet Standard (Daily Driver)' },
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '05:50',
    description: {
      ja: '作者本人が毎日愛用している、より多機能で高度な拡張板（Chatlet Standard）を紹介。本番での活用メソッドや快適なショートカット拡張事例をご紹介。',
      en: 'An illustrative overview of the advanced, feature-rich extended edition used by the developer daily. Demonstrates professional AI workflow patterns.'
    }
  }
];

export const learnItems = [
  {
    title: { ja: '【無料】ChatGPTで便利なBookmarklet', en: '【Free】Convenient Bookmarklets on ChatGPT' },
    desc: {
      ja: 'noteの無料教材マガジン。ChatGPTで動くブックマークレットの基本や、日々の生産性を向上させる具体的な使い方を体系的に紹介。ブラウザの英語翻訳機能にも完全に対応しています。',
      en: 'Note.com Free Magazine: Explains bookmarklet basics and handy use-cases systematically. The note platform supports auto-translation into English.'
    },
    actionText: { ja: 'note無料マガジンへ移動', en: 'Open Free Note Magazine' },
    link: 'https://note.com/scotoma_jp/m/ma941ffaadd07'
  },
  {
    title: { ja: '📖 Bookmarklet (ブックマークレット) 入門', en: '📖 Introduction to Bookmarklets' },
    desc: {
      ja: 'ブックマークレットとは、ブラウザのお気に入り（ブックマーク）登録機能を利用して、そのページ上で任意のJavaScriptを実行できる極小プログラムです。拡張機能と違い、インストールの手間が不要で全ての主要ブラウザで動作します。',
      en: 'A bookmarklet is a tiny code container mapped in place of typical hyperlink URLs. Clicking this favorite triggers inline JavaScript execution directly inside the active viewport, with zero browser extension installers.'
    },
    actionText: { ja: '詳しい登録・活用方法を学ぶ (外部URL)', en: 'Read how they work' },
    link: 'https://another-world.site/wp/portal/supplement/bookmarklet-aid/'
  },
  {
    title: { ja: '🛠 Chrome DevTools (デベロッパーツール) 入門', en: '🛠 Working with Chrome DevTools' },
    desc: {
      ja: 'Chatletが裏側でChatGPTのDOM（HTML構造）をどのように検出して挿入しているかは、Chromeのデベロッパーツール（F12）からすべて見ることができます。コードを書き換えたい時やバグ調査をする際に不可欠なツールの使い方です。',
      en: 'Inspect elements, modify styles, and review debugger outputs! Chatlet maps buttons onto web sheets using simple DOM access. Learn how elements are queried and event emissions inspected in the browser console.'
    },
    actionText: { ja: 'DevTools入門記事へ (外部URL)', en: 'DevTools Quick Start' },
    link: 'https://another-world.site/wp/portal/supplement/devtools-guide/'
  },
  {
    title: { ja: '🔍 Chatlet 改造の実用事例', en: '🔍 Chatlet Modification Examples' },
    desc: {
      ja: '特定の会社での定型文添削ツールとして、また外国語学習での文脈質問ツールとして。ボタン1つに「5段階で文法を説明して」などの詳細な指導プロンプトを設定して強力に改造されている実用事例を紹介します。',
      en: 'Transform Chatlet into a corporate template editor or a strict language grammar coach. By specifying highly precise role-playing triggers on a single button, you can guide AI models consistently with zero typing overhead.'
    },
    actionText: { ja: '改造ヒントを見る (外部URL)', en: 'Review customization tips' },
    link: 'https://another-world.site/wp/portal/supplement/chatlet-standard-intro/'
  },
  {
    title: { ja: 'Chatlet Free版 開発教材セット', en: 'Chatlet Free Premium Developer Tutorial' },
    desc: {
      ja: 'Chatlet Freeの要件定義や設計書、教材用にコメントを増強したコードと読み方の解説、AIとの共同でのプログラミング対話手法などを解説した有料教材（noteマガジン）です。',
      en: 'Chatlet Free Premium Tutorial Set: Comprehensive notes, architectural design blueprint details, and premium co-programming prompts on Note.com.'
    },
    actionText: { ja: '有料教材マガジンへ移動', en: 'Open Premium Tutorial' },
    link: 'https://note.com/scotoma_jp/m/md27113c5a9ee'
  },
  {
    title: { ja: 'NoaRecordのnote', en: 'NoaRecord Official Note' },
    desc: {
      ja: 'NoaRecord公式note。ChatGPTやAIを活用した最新のライフハック、ツール開発、教材情報を随時発信中。最新アップデートはこちらから。',
      en: 'NoaRecord official blog on Note.com. Discover advanced AI tutorials, custom tools guides, and productivity enhancements uploaded regularly.'
    },
    actionText: { ja: 'NoaRecordのnoteへ移動', en: 'Visit NoaRecord Blog' },
    link: 'https://note.com/scotoma_jp'
  }
];
