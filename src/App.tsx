import React, { useState, useMemo, useEffect } from 'react';
import {
  Sparkles,
  Code,
  Settings,
  BookOpen,
  Play,
  Check,
  Copy,
  Plus,
  Trash,
  ArrowRight,
  ExternalLink,
  Globe,
  Bookmark,
  Download,
  ChevronRight,
  Cpu,
  Layers,
  Video,
  Github,
  Folder,
  FileText,
  AlertCircle,
  Heart
} from 'lucide-react';
import {
  presetPacks,
  fileTemplates,
  readmeText,
  licenseText,
  contributingText,
  changelogText,
  videosList,
  learnItems,
  markdownDocs,
  PresetItem,
  PresetPack
} from './data';

// Custom bookmarklet compiler with robust client-side minifying substitution
function generateBookmarkletCode(
  title: string,
  themeColor: string,
  presets: PresetItem[],
  limitCount: number,
  enabledLimit: boolean,
  widthType: 'normal' | 'wide' | 'narrow'
) {
  const presetsStr = JSON.stringify(presets);
  const widthVal = widthType === 'wide' ? '360px' : widthType === 'narrow' ? '270px' : '310px';
  
  const sourceCode = `(function () {
    'use strict';
    const ID = 'chatlet-free-container';
    const STYLE_ID = 'chatlet-free-style';
    const LIMIT_STYLE_ID = 'chatlet-free-display-limit-style';
    const LATEST_COUNT = ${limitCount};

    if (window.Chatlet && typeof window.Chatlet.cleanup === 'function') { window.Chatlet.cleanup(); }
    if (window.ChatletFree && typeof window.ChatletFree.cleanup === 'function') { window.ChatletFree.cleanup(); }

    const ChatletFree = {
        presets: ${presetsStr},
        showLatest: ${enabledLimit ? 'true' : 'false'},
        init() {
            this.createStyle();
            this.createUI();
        },
        createStyle() {
            document.getElementById(STYLE_ID)?.remove();
            const style = document.createElement('style');
            style.id = STYLE_ID;
            style.textContent = \`
                #chatlet-free-container { position: fixed !important; bottom: 20px !important; left: 20px !important; width: ${widthVal} !important; background: #ffffff !important; color: #1f2937 !important; border: 1px solid #d1d5db !important; border-radius: 12px !important; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1) !important; z-index: 2147483647 !important; font-family: system-ui, -apple-system, sans-serif !important; overflow: hidden !important; box-sizing: border-box !important; }
                #chatlet-free-container * { box-sizing: border-box !important; }
                #chatlet-free-container .free-header { height: 38px !important; padding: 0 12px !important; background: ${themeColor} !important; color: #ffffff !important; display: flex !important; align-items: center !important; justify-content: space-between !important; font-size: 13px !important; font-weight: 600 !important; border-bottom: 1px solid rgba(0,0,0,0.05) !important; select: none !important; }
                #chatlet-free-container .free-header span { overflow: hidden !important; text-overflow: ellipsis !important; white-space: nowrap !important; max-width: 220px !important; display: block !important; }
                #chatlet-free-container .free-body { padding: 10px !important; display: flex !important; flex-direction: column !important; gap: 8px !important; background: #ffffff !important; }
                #chatlet-free-container .free-row { display: flex !important; gap: 6.5px !important; flex-wrap: wrap !important; margin: 0 !important; padding: 0 !important; }
                #chatlet-free-container button { cursor: pointer !important; border-radius: 6px !important; font-size: 11px !important; font-family: inherit !important; transition: all 0.15s ease !important; margin: 0 !important; outline: none !important; }
                #chatlet-free-container .free-preset { display: inline-block !important; padding: 5px 10px !important; background: #f3f4f6 !important; color: #111827 !important; border: 1px solid #d1d5db !important; font-weight: 500 !important; box-shadow: 0 1px 2px rgba(0,0,0,0.05) !important; text-align: center !important; }
                #chatlet-free-container .free-preset:hover { background: #e5e7eb !important; border-color: #9ca3af !important; }
                #chatlet-free-container .free-close { width: 24px !important; height: 24px !important; background: none !important; color: #ffffff !important; border: none !important; font-size: 16px !important; display: flex !important; align-items: center !important; justify-content: center !important; opacity: 0.8 !important; padding: 0 !important; }
                #chatlet-free-container .free-close:hover { opacity: 1 !important; background: rgba(0,0,0,0.15) !important; border-radius: 4px !important; }
                #chatlet-free-container .free-input-row { display: flex !important; gap: 6px !important; margin: 0 !important; padding: 0 !important; }
                #chatlet-free-container .free-input { flex: 1 !important; min-width: 0 !important; height: 32px !important; border: 1px solid #d1d5db !important; border-radius: 6px !important; padding: 4px 8px !important; font-size: 12px !important; color: #111827 !important; background: #ffffff !important; outline: none !important; }
                #chatlet-free-container .free-input:focus { border-color: ${themeColor} !important; box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1) !important; }
                #chatlet-free-container .free-send { width: 32px !important; height: 32px !important; background: ${themeColor} !important; color: #ffffff !important; border: none !important; font-size: 14px !important; display: flex !important; align-items: center !important; justify-content: center !important; border-radius: 6px !important; font-weight: bold !important; box-shadow: 0 1px 2px rgba(0,0,0,0.05) !important; }
                #chatlet-free-container .free-send:hover { opacity: 0.9 !important; }
                #chatlet-free-container .free-setting { border-top: 1px solid #f3f4f6 !important; padding-top: 8px !important; font-size: 11px !important; color: #4b5563 !important; display: flex !important; align-items: center !important; gap: 2px !important; select: none !important; cursor: pointer !important; }
                #chatlet-free-container input[type="checkbox"] { appearance: none !important; -webkit-appearance: none !important; width: 14px !important; height: 14px !important; margin: 0 6px 0 0 !important; border: 1px solid #d1d5db !important; border-radius: 3px !important; background: #ffffff !important; cursor: pointer !important; position: relative !important; vertical-align: middle !important; display: inline-block !important; padding: 0 !important; }
                #chatlet-free-container input[type="checkbox"]:checked { background: ${themeColor} !important; border-color: ${themeColor} !important; }
                #chatlet-free-container input[type="checkbox"]:checked::after { content: "" !important; position: absolute !important; left: 4px !important; top: 1px !important; width: 4px !important; height: 8px !important; border: solid #ffffff !important; border-width: 0 2px 2px 0 !important; transform: rotate(45deg) !important; }
            \`;
            document.head.appendChild(style);
        },
        createUI() {
            document.getElementById(ID)?.remove();
            if (!document.getElementById(LIMIT_STYLE_ID)) {
                const limitStyle = document.createElement('style');
                limitStyle.id = LIMIT_STYLE_ID;
                document.head.appendChild(limitStyle);
            }
            const root = document.createElement('div');
            root.id = ID;
            root.innerHTML = \`
                <div class="free-header">
                    <span>${title}</span>
                    <button type="button" class="free-close" id="free-close" title="閉じる">☒</button>
                </div>
                <div class="free-body">
                    <div class="free-row" id="free-presets"></div>
                    <div class="free-input-row">
                        <input type="text" class="free-input" id="free-input" placeholder="ここに入力...">
                        <button type="button" class="free-send" id="free-send" title="送信">↵</button>
                    </div>
                    <label class="free-setting">
                        <input type="checkbox" id="free-show-latest" \${this.showLatest ? 'checked' : ''}> 最新\${LATEST_COUNT}ターンのみ表示
                    </label>
                </div>
            \`;
            document.body.appendChild(root);

            this.elements = {
                root,
                presetRow: root.querySelector('#free-presets'),
                input: root.querySelector('#free-input'),
                send: root.querySelector('#free-send'),
                close: root.querySelector('#free-close'),
                showLatest: root.querySelector('#free-show-latest'),
                limitStyle: document.getElementById(LIMIT_STYLE_ID)
            };

            this.renderPresets();
            this.bindEvents();
            if (this.showLatest) { this.applyDisplayLimit(); }
        },
        renderPresets() {
            this.elements.presetRow.innerHTML = '';
            this.presets.forEach((preset) => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'free-preset';
                button.textContent = preset.label;
                button.title = preset.value;
                button.onclick = () => this.sendMessage(preset.value);
                this.elements.presetRow.appendChild(button);
            });
        },
        bindEvents() {
            this.elements.close.onclick = () => this.cleanup();
            this.elements.send.onclick = () => this.sendMessage(this.elements.input.value);
            this.elements.input.onkeydown = (event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    this.elements.send.click();
                }
            };
            this.elements.showLatest.onchange = () => {
                this.showLatest = this.elements.showLatest.checked;
                this.applyDisplayLimit();
            };
        },
        sendMessage(text) {
            if (!text || text.trim() === '') return;
            let inputElement = null;
            const richEditor = document.querySelector('div[contenteditable="true"]#prompt-textarea');
            if (richEditor instanceof HTMLElement) {
                const paragraph = richEditor.querySelector('p');
                if (paragraph) {
                    paragraph.textContent = text;
                    inputElement = richEditor;
                }
            }
            if (!inputElement) {
                const textarea = document.querySelector('#prompt-textarea, textarea[data-testid="prompt-textarea"]');
                if (textarea instanceof HTMLTextAreaElement) {
                    const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
                    if (setter) setter.call(textarea, text);
                    else textarea.value = text;
                    inputElement = textarea;
                }
            }
            if (!inputElement) {
                alert('Chatlet Free: 入力欄が見つかりませんでした。');
                return;
            }
            inputElement.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
            if (inputElement instanceof HTMLElement) inputElement.focus();

            let attempts = 0;
            const timer = setInterval(() => {
                const sendButton = document.querySelector('button[data-testid="send-button"]');
                if (sendButton && !sendButton.disabled) {
                    sendButton.click();
                    clearInterval(timer);
                } else if (attempts++ > 15) {
                    clearInterval(timer);
                }
            }, 100);
        },
        getConversationTurns() {
            return Array.from(document.querySelectorAll('[data-testid^="conversation-turn-"]'))
                .map((element) => {
                    const match = /^conversation-turn-(\\d+)$/.exec(element.getAttribute('data-testid') || '');
                    if (!match) return null;
                    return { element, number: parseInt(match[1], 10) };
                })
                .filter(Boolean)
                .sort((a, b) => a.number - b.number);
        },
        clearDisplayLimit() {
            document.querySelectorAll('[data-chatlet-hidden-turn="true"]').forEach((element) => {
                element.removeAttribute('data-chatlet-hidden-turn');
            });
            if (this.elements?.limitStyle) {
                this.elements.limitStyle.textContent = '';
            }
        },
        applyDisplayLimit() {
            if (!this.elements.limitStyle) return;
            this.clearDisplayLimit();
            if (!this.showLatest) { return; }
            const turns = this.getConversationTurns();
            const visibleTurns = new Set(turns.slice(-LATEST_COUNT).map(turn => turn.element));
            turns.forEach((turn) => {
                if (!visibleTurns.has(turn.element)) {
                    turn.element.setAttribute('data-chatlet-hidden-turn', 'true');
                }
            });
            this.elements.limitStyle.textContent = '[data-chatlet-hidden-turn="true"]{display:none!important;}';
        },
        cleanup() {
            this.clearDisplayLimit();
            document.getElementById(ID)?.remove();
            document.getElementById(STYLE_ID)?.remove();
            document.getElementById(LIMIT_STYLE_ID)?.remove();
            delete window.Chatlet;
            delete window.ChatletFree;
        }
    };

    window.Chatlet = ChatletFree;
    window.ChatletFree = ChatletFree;
    ChatletFree.init();
})();`;

  // Trim space and comment blocks accurately
  let minifiedCode = sourceCode
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0 && !line.startsWith('//'))
    .join(' ');

  // Extra clean formatting for space reduction (keeping curly braces to preserve space around template variables)
  minifiedCode = minifiedCode
    .replace(/\s+/g, ' ')
    .replace(/\s*([;,=+&|<>:])\s*/g, '$1')
    .trim();

  const bookmarklet = 'javascript:' + encodeURIComponent(minifiedCode);
  return { sourceCode, minifiedCode, bookmarklet };
}

const JA_DEFAULTS = [
  { label: '進めて', value: '今の回答の続き、または次のステップを進めてください。' },
  { label: '要約して', value: '直前の回答、または以下の文章を、要点が一目でわかるように簡潔に要約してください：\n\n' },
  { label: '説明求む', value: '直前の回答（または指定のテーマ）について、専門用語を避け、初心者向けにわかりやすく直感的に説明してください：\n\n' }
];

const EN_DEFAULTS = [
  { label: 'Continue', value: 'Please continue the previous response or proceed to the next step.' },
  { label: 'Summarize', value: 'Please summarize the previous response or the text below into concise bullet points:\n\n' },
  { label: 'Explain Simply', value: 'Please explain the previous response (or specific topic) in simple, intuitive terms, avoiding technical jargon:\n\n' }
];

export default function App() {
  const [lang, setLang] = useState<'ja' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chatlet_lang');
      if (saved === 'ja' || saved === 'en') {
        return saved;
      }
      if (typeof navigator !== 'undefined') {
        const browserLang = navigator.language || (navigator.languages && navigator.languages[0]);
        if (browserLang && browserLang.toLowerCase().startsWith('ja')) {
          return 'ja';
        }
      }
    }
    return 'en'; // Default to English for international audiences
  });
  const [activeTab, setActiveTab] = useState<'home' | 'examples' | 'generator' | 'install' | 'learn' | 'videos' | 'repo'>('home');
  
  const isOfficialHost = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const hn = window.location.hostname.toLowerCase();
    return (
      hn.includes('localhost') ||
      hn.includes('127.0.0.1') ||
      hn.includes('run.app') || // AI Studio Development Sandbox
      hn.includes('noarecord.github.io') ||
      hn.includes('another-world.site')
    );
  }, []);
  
  // Custom states for Generator
  const [customTitle, setCustomTitle] = useState('Chatlet Free');
  const [customTheme, setCustomTheme] = useState('#4f46e5'); // Indigo theme standard
  const [customWidth, setCustomWidth] = useState<'normal' | 'wide' | 'narrow'>('normal');
  const [customLimit, setCustomLimit] = useState(10);
  const [enableLimit, setEnableLimit] = useState(true);
  const [customPresets, setCustomPresets] = useState<PresetItem[]>(() => {
    // Pick presets during initialization based on current language
    let initialLang: 'ja' | 'en' = 'en';
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chatlet_lang');
      if (saved === 'ja' || saved === 'en') {
        initialLang = saved;
      } else if (typeof navigator !== 'undefined') {
        const browserLang = navigator.language || (navigator.languages && navigator.languages[0]);
        if (browserLang && browserLang.toLowerCase().startsWith('ja')) {
          initialLang = 'ja';
        }
      }
    }
    return initialLang === 'ja' ? JA_DEFAULTS : EN_DEFAULTS;
  });

  // Temporary generator input states
  const [newLabel, setNewLabel] = useState('');
  const [newValue, setNewValue] = useState('');

  // Notifications
  const [copyState, setCopyState] = useState<{ [key: string]: boolean }>({});
  const [applyFlash, setApplyFlash] = useState(false);

  const handleToggleLang = () => {
    const nextLang = lang === 'ja' ? 'en' : 'ja';
    setLang(nextLang);
    localStorage.setItem('chatlet_lang', nextLang);

    // If the presets match the current language's defaults, auto-switch them to the next language's defaults!
    const isMatchingJaDefaults = JSON.stringify(customPresets) === JSON.stringify(JA_DEFAULTS);
    const isMatchingEnDefaults = JSON.stringify(customPresets) === JSON.stringify(EN_DEFAULTS);
    if (nextLang === 'ja' && isMatchingEnDefaults) {
      setCustomPresets(JA_DEFAULTS);
    } else if (nextLang === 'en' && isMatchingJaDefaults) {
      setCustomPresets(EN_DEFAULTS);
    }
  };

  const languages = {
    ja: {
      siteTitle: 'Chatlet Free Portal',
      siteSubtitle: 'ChatGPTプロンプト・ツールキット ＆ 開発学習ベース',
      heroTitle: 'Use it. Customize it. Learn from it.',
      heroDesc: 'Chatlet Freeは、ChatGPTで行う「いつもの作業」をワンクリックにします。サーバ不要・完全クライアントサイド動作のオープンソース・ブックマークレット。プロンプトをワンクリック注入し、最新の会話を指定のターン数だけにフォーカスする超軽量な作業改善ツール。',
      ctaInstall: '今すぐインストール',
      ctaCustomize: '自分仕様に改造する (Generator)',
      featureTitle: 'Chatlet Free 3つの柱',
      features: [
        { title: '即効性の実用ツール', desc: '毎日の定型プロンプト（要約・推敲・質問等）を、拡張機能すら入れずにワンクリックで注入。' },
        { title: 'JavaScript学習教材', desc: 'ChatGPTなどの最新サイトの入力欄に文字を自動入力する仕組みや、CSSスタイルの変更方法などを学ぶのに最適な、丁寧な解説コメント付きコード設計。自分好みの機能追加やカスタマイズがしやすいよう、あえてシンプルに作られています。' },
        { title: 'AI時代の改造ベース', desc: 'AIにコードを貼り付けて「ChatGPT用に〇〇機能を追加して」と指示し、自分専用 of ChatGPTカスタムプラグインをAIと一緒に開発可能。' }
      ],
      interactiveHeader: '💻 Chatlet Free 動作シミュレータ',
      interactiveSub: 'ChatGPT画面に入り込んだような挙動を体験。プリセットボタンを押してみてください。',
      mockGptInput: 'ここに入力...',
      mockGptSend: '送信',
      limitCountLabel: '最新10ターンのみ表示 (集中モード)',
      packSectionTitle: '🎁 シーン別プロンプトパック (Examples)',
      packSectionDesc: '用途別に用意されたプロンプト集。そのままコピーして使うか、ボタンを押してジェネレーターに展開できます。',
      applySuccess: 'ジェネレーターにプリセットを適用しました！Tabを切り替えます。',
      applyBtn: 'ジェネレーターへ適用',
      copied: 'コピー完了！',
      copyFullBookmarklet: 'ブックマークレットコードをコピー',
      copySourceCode: 'ソースコードをコピー',
      themeLabel: 'テーマカラー',
      widthLabel: 'コンテナの横幅',
      limitTurnLabel: 'ターン表示制限数',
      addPreset: 'プリセットボタンを追加',
      buttonLabel: 'ボタンの表示名',
      buttonValue: '送信されるプロンプト',
      generatorTitle: '🛠 ブックマークレット・カスタマイザー',
      generatorDesc: 'ボタンの数やプロンプト内容を完全にカスタマイズした、あなた専用のブックマークレットを生成します。',
      generatorRecommend: '👉 【推奨】設定を自分用に調整したカスタムブックマークレットを作成する方が圧倒的に便利（簡単登録可能）です！',
      starAppeals: '気に入っていただけたらStar⭐をお願いします！',
      installHeader: '📥 ブックマークレットの登録手順',
      learnHeader: '📚 OSSと教材の架け橋 (Learn)',
      videosHeader: '🎥 レクチャー ＆ 実例動画集',
      repoHeader: '📂 OSS GitHub リポジトリ・エクスプローラー'
    },
    en: {
      siteTitle: 'Chatlet Free Portal',
      siteSubtitle: 'ChatGPT Prompt Toolkit & OSS Learning Baseline',
      heroTitle: 'Use it. Customize it. Learn from it.',
      heroDesc: 'Chatlet Free makes your daily, recurring ChatGPT tasks a single-click breeze. A serverless, 100% client-side open-source bookmarklet to inject dynamic prompts and keep your focus on the latest conversation turns.',
      ctaInstall: 'Quick Installation',
      ctaCustomize: 'Customize Prompts (Generator)',
      featureTitle: 'The 3 Pillars of Chatlet',
      features: [
        { title: 'Practical Tooling', desc: 'Instantly insert redundant daily instructions (Proofread, Summarize, Simplify) via zero-overhead local link triggers.' },
        { title: 'Pure JavaScript Learning', desc: 'Thoroughly commented, pure JavaScript code detailing modern Web browser DOM override patterns and CSS style isolation. Simplified, educational blueprint optimized for personal tweaking.' },
        { title: 'AI-Co-Development Sandbox', desc: 'Feed the code straight into an AI, instruct it to customize functions for ChatGPT, and easily co-create your own version.' }
      ],
      interactiveHeader: '💻 Chatlet Free Live Simulator',
      interactiveSub: 'Experience how Chatlet hooks into the active text area and triggers standard event bubbles. Try clicking presets!',
      mockGptInput: 'Enter custom values...',
      mockGptSend: 'Send',
      limitCountLabel: 'Display latest 10 conversation turns only (Concentrate)',
      packSectionTitle: '🎁 Pre-curated Use-Cases (Examples)',
      packSectionDesc: 'Select an tailored pack that matches your tasks, copy specific values or load it inside the Generator form.',
      applySuccess: 'Successfully loaded presets to Generator! Swapping Tabs.',
      applyBtn: 'Apply to Generator',
      copied: 'Copied!',
      copyFullBookmarklet: 'Copy Bookmarklet Link Text',
      copySourceCode: 'Copy Source JavaScript',
      themeLabel: 'Theme Accent Color',
      widthLabel: 'Container Width',
      limitTurnLabel: 'Turn Limit Count',
      addPreset: 'Add Preset Action',
      buttonLabel: 'Button Label Text',
      buttonValue: 'Target Prompt Content',
      generatorTitle: '🛠 Draggable Bookmarklet Generator',
      generatorDesc: 'Specify original button pairs, edit title values or switch colors. No database required—works 100% in local memory!',
      generatorRecommend: '👉 [Recommended] Creating a customized bookmarklet with your preferred presets is extremely convenient!',
      starAppeals: 'If you like Chatlet, please give us a Star⭐!',
      installHeader: '📥 Installation & Setup Instructions',
      learnHeader: '📚 Educational Blueprints (Learn)',
      videosHeader: '🎥 Video Courses & Standard Editions',
      repoHeader: '📂 OSS GitHub Repository Tree Explorer'
    }
  };

  // =========================================================================
  // 【応援・寄付（Sponsor）定義】将来の拡張性を持たせるため、ここで一元管理しています。
  // 将来的にGitHub Sponsorsなどを追加・変更する際は、ここを編集・追加するだけでOKです。
  // =========================================================================
  const SPONSOR_CONFIG = {
    links: [
      {
        id: 'ko-fi',
        labelJa: 'Ko-fi でサポート',
        labelEn: 'Support on Ko-fi',
        url: 'https://ko-fi.com/noarecord',
        descJa: '一杯のコーヒー代から開発者を支援',
        descEn: 'Buy the developer a coffee',
      },
      {
        id: 'ofuse',
        labelJa: 'OFUSE（送金・ファンレター）',
        labelEn: 'Support on OFUSE',
        url: 'https://ofuse.me/o?uid=142448',
        descJa: 'メッセージと共に支援を送ることができます',
        descEn: 'Send a warm message with funding',
      },
      /* 
      // 【将来GitHub Sponsorsを有効化する際は、こちらのコメントアウトを解除・編集してください】
      {
        id: 'github-sponsors',
        labelJa: 'GitHub Sponsors',
        labelEn: 'GitHub Sponsors',
        url: 'https://github.com/sponsors/あなたのユーザー名', // または Organization 名
        descJa: 'GitHub を通じて継続的な寄付・スポンサーを行います',
        descEn: 'Support open-source development directly on GitHub',
      }
      */
    ],
    header: {
      ja: '開発を応援する (Sponsor)',
      en: 'Sponsor & Support'
    },
    footerNote: {
      ja: 'Chatlet Freeは完全無料かつオープンソースで提供されています。もし気に入っていただけましたら、開発の継続的なアップデートやより良いコンテンツ作成をご支援いただけますと大変励みになります！',
      en: 'Chatlet Free is 100% free and open-source. If you find it helpful, please consider supporting development to inspire continuous maintenance and security updates!'
    }
  };

  const activeLang = languages[lang];

  // Selected Repository File State
  const [selectedRepoFile, setSelectedRepoFile] = useState<string>('README.md');

  // Trigger simulated typing & send to ChatGPT
  const [mockGptText, setMockGptText] = useState('');
  const [mockMessages, setMockMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; id: number }>>([
    { sender: 'assistant', text: 'こんにちは！どのようなご用件でしょうか？ / Hello! How can I assist you today?', id: 1 },
    { sender: 'user', text: 'ChatGPTを快適に使う方法を教えて。', id: 2 },
    { sender: 'assistant', text: 'ChatGPTを最速で動かすには、定型的な繰り返しプロンプトを半自動で入力できるようにすると効果的です。Chatletを使うと瞬時に要約や校正の指示を入力・送信できますよ！', id: 3 }
  ]);
  const [mockLimitActive, setMockLimitActive] = useState(false);

  const simulateSendMessage = (text: string) => {
    if (!text || text.trim() === '') return;
    const nextId = mockMessages.length + 1;
    // Add User Message
    const newMsgs = [...mockMessages, { sender: 'user', text, id: nextId }];
    setMockMessages(newMsgs);
    setMockGptText('');

    // Trigger Mock Gpt response
    setTimeout(() => {
      const respId = nextId + 1;
      let reply = '【シミュレータ動作】プロンプトの注入を確認しました！ボタンからイベントがディスパッチされています！\n[Simulation] Captured input event successfully and dispatched prompt action!';
      if (text.includes('進めて') || text.includes('Continue')) {
        reply = '【シミュレーション】了解しました。続きの論理・実装アイデアを展開します...';
      } else if (text.includes('要約') || text.includes('Summarize')) {
        reply = '【シミュレーション】提供されたコンテキストの核を摘出し、簡潔な箇条書きへと要約し直しました。';
      }
      setMockMessages(prev => [...prev, { sender: 'assistant', text: reply, id: respId }]);
    }, 850);
  };

  // Compile code based on states
  const compiledCode = useMemo(() => {
    return generateBookmarkletCode(
      customTitle,
      customTheme,
      customPresets,
      customLimit,
      enableLimit,
      customWidth
    );
  }, [customTitle, customTheme, customPresets, customLimit, enableLimit, customWidth]);

  // Ref and effect to inject bookmarklet bypass safety checks
  const draggableLinkRef = React.useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (draggableLinkRef.current) {
      draggableLinkRef.current.href = compiledCode.bookmarklet;
    }
  }, [compiledCode.bookmarklet, activeTab]);

  useEffect(() => {
    // Dynamic execution parser for standard GitHub Star buttons to guarantee clean cross-react-render bindings
    const scriptId = 'github-buttons-js';
    const oldScript = document.getElementById(scriptId);
    if (oldScript) {
      oldScript.remove();
    }
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://buttons.github.io/buttons.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, [activeTab, lang]);

  const triggerCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyState(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopyState(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const handleApplyPackToGenerator = (pack: PresetPack) => {
    const list = lang === 'ja' ? pack.presets.ja : pack.presets.en;
    setCustomPresets([...list]);
    
    // Auto-trim long packet titles to avoid header overflow
    let rawTitle = lang === 'ja' ? pack.title.ja : pack.title.en;
    let cleanTitle = rawTitle.replace(/\s*[\(（].*?[\)）]/g, '').trim();
    if (cleanTitle.length > 15) {
      cleanTitle = cleanTitle.slice(0, 15);
    }
    setCustomTitle(cleanTitle || 'Chatlet Free');

    setActiveTab('generator');
    alert(activeLang.applySuccess);
  };

  const addNewPresetItem = () => {
    if (!newLabel || !newValue) {
      alert('Label and Prompt contents are both required.');
      return;
    }
    setCustomPresets(prev => [...prev, { label: newLabel, value: newValue }]);
    setNewLabel('');
    setNewValue('');
  };

  const removePresetItem = (idx: number) => {
    setCustomPresets(prev => prev.filter((_, i) => i !== idx));
  };

  // Standard Repository File content rendering
  const repoFiles = [
    { name: 'README.md', category: 'Root info', icon: FileText, content: readmeText.en },
    { name: 'README_JA.md', category: 'Root info', icon: FileText, content: readmeText.ja },
    { name: 'LICENSE', category: 'Licenses', icon: FileText, content: licenseText },
    { name: 'CONTRIBUTING.md', category: 'Guides', icon: FileText, content: contributingText },
    { name: 'CHANGELOG.md', category: 'Updates', icon: FileText, content: changelogText },
    { name: 'src/chatlet_free.js', category: 'Unminified JS', icon: Code, content: `// unminified source code` },
    { name: 'dist/chatlet_free.min.js', category: 'Production JS', icon: Code, content: `!function(){"use strict";const e="chatlet-free-container"...` },
    { name: 'dist/chatlet_free.bookmarklet.txt', category: 'Protocol Link', icon: Bookmark, content: `javascript:!function()...` },
    { name: 'docs/architecture.md', category: 'Docs', icon: BookOpen, content: markdownDocs.architecture.ja },
    { name: 'docs/customization.md', category: 'Docs', icon: BookOpen, content: markdownDocs.customization.ja },
    { name: 'docs/examples.md', category: 'Docs', icon: BookOpen, content: markdownDocs.architecture.en },
    { name: 'examples/starter-pack.json', category: 'JSON configuration', icon: Layers, content: JSON.stringify(presetPacks[0].presets.ja, null, 2) },
    { name: 'examples/writer-pack.json', category: 'JSON configuration', icon: Layers, content: JSON.stringify(presetPacks[1].presets.ja, null, 2) },
    { name: 'examples/study-pack.json', category: 'JSON configuration', icon: Layers, content: JSON.stringify(presetPacks[2].presets.ja, null, 2) },
    { name: 'examples/developer-pack.json', category: 'JSON configuration', icon: Layers, content: JSON.stringify(presetPacks[3].presets.ja, null, 2) },
    { name: 'examples/critical-pack.json', category: 'JSON configuration', icon: Layers, content: JSON.stringify(presetPacks[4].presets.ja, null, 2) }
  ];

  const activeFileObject = useMemo(() => {
    return repoFiles.find(f => f.name === selectedRepoFile) || repoFiles[0];
  }, [selectedRepoFile]);

  // Handle direct downloads for static files
  const downloadFile = (name: string, content: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col antialiased text-neutral-800">
      
      {/* Premium Multi-lingual Nav bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 shrink-0 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-neutral-950 flex items-center justify-center text-white shadow-md shadow-neutral-200 shrink-0">
              <Bookmark className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0 select-none">
              <span className="font-display font-extrabold text-base sm:text-lg tracking-tight block text-neutral-900 truncate">
                Chatlet <span className="text-[10px] bg-neutral-100 text-neutral-800 px-1.5 py-0.5 rounded font-mono ml-0.5 font-bold">Free</span>
              </span>
              <span className="text-[9px] text-neutral-400 font-mono block -mt-1 uppercase tracking-wider">
                OSS Bookmarklet v2.0
              </span>
            </div>
          </div>

          {/* Tab Options */}
          <nav className="hidden md:flex space-x-1">
            {[
              { id: 'home', label: lang === 'ja' ? 'トップ' : 'Home', icon: Sparkles },
              { id: 'examples', label: lang === 'ja' ? 'レシピ集' : 'Examples', icon: Layers },
              { id: 'generator', label: lang === 'ja' ? 'ジェネレーター' : 'Generator', icon: Settings },
              { id: 'install', label: lang === 'ja' ? 'インストール' : 'Install', icon: Download },
              { id: 'learn', label: lang === 'ja' ? '学習教材' : 'Learn', icon: BookOpen },
              { id: 'videos', label: lang === 'ja' ? 'レクチャー動画' : 'Videos', icon: Video },
              { id: 'repo', label: lang === 'ja' ? 'リポジトリ構成' : 'Repository', icon: Folder },
            ].filter(tab => isOfficialHost || (tab.id !== 'learn' && tab.id !== 'videos')).map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all select-none ${
                    isSelected
                      ? 'bg-neutral-900 text-white shadow-sm shadow-neutral-200/50'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Action Flags */}
          <div className="flex items-center gap-2.5 shrink-0">
            {isOfficialHost && (
              <a
                href="https://another-world.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-950 font-medium px-2 py-1.5 transition-colors whitespace-nowrap animate-fade-in"
              >
                NoaRecord <ExternalLink className="w-3 h-3 text-neutral-400" />
              </a>
            )}
            <button
              onClick={handleToggleLang}
              className="flex items-center gap-1 text-[11px] sm:text-xs text-neutral-600 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200/80 px-2.5 py-1.5 rounded-lg transition-transform active:scale-95 border border-neutral-200/80 shrink-0 whitespace-nowrap select-none font-medium"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-500" />
              <span>{lang === 'ja' ? 'EN' : 'JA'}</span>
            </button>
            <a
              href="https://github.com/NoaRecord/Chatlet_Free"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-white shrink-0 transition-transform hover:scale-105 active:scale-95 shadow-sm"
              title="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Nav Bar - Scrollable, Modern Single-Line Tab Strip */}
      <div className="md:hidden flex items-center gap-1.5 bg-white border-b border-neutral-200 py-2.5 px-4 sticky top-16 z-40 overflow-x-auto scrollbar-none whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x select-none">
        {[
          { id: 'home', label: lang === 'ja' ? 'トップ' : 'Home' },
          { id: 'examples', label: lang === 'ja' ? 'レシピ集' : 'Examples' },
          { id: 'generator', label: lang === 'ja' ? 'ジェネレーター' : 'Generator' },
          { id: 'install', label: lang === 'ja' ? 'インストール' : 'Install' },
          { id: 'learn', label: lang === 'ja' ? '学習教材' : 'Learn' },
          { id: 'videos', label: lang === 'ja' ? '動画' : 'Videos' },
          { id: 'repo', label: lang === 'ja' ? 'リポジトリ' : 'Repo' },
        ].filter(tab => isOfficialHost || (tab.id !== 'learn' && tab.id !== 'videos')).map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 text-xs rounded-lg transition-all shrink-0 whitespace-nowrap snap-center font-semibold ${
                isSelected
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-950 active:bg-neutral-100'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <main className="flex-grow shrink-0">
        
        {/* HERO SECTION - HOME TAB */}
        {activeTab === 'home' && (
          <div className="animate-fade-in animate-duration-300">
            {/* Visual Header - Sleek Minimal Canvas */}
            <div className="bg-gradient-to-b from-neutral-100/60 via-neutral-50/10 to-transparent py-14 sm:py-20 border-b border-neutral-200/50">
              <div className="max-w-4xl mx-auto px-4 select-none text-center">
                <div className="mb-6 flex justify-center flex-col sm:flex-row items-center gap-2">
                  <span className="inline-flex items-center gap-1 bg-neutral-900 text-neutral-100 px-2.5 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase shadow-sm">
                    <Cpu className="w-3.5 h-3.5 text-neutral-300 animate-pulse" />
                    Chatlet Free Project
                  </span>
                  {isOfficialHost && (
                    <a
                      href="https://another-world.site/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-white ring-1 ring-neutral-250 hover:bg-neutral-50 px-3 py-1 rounded-full text-xs text-neutral-600 hover:text-neutral-900 font-medium transition-all group animate-fade-in"
                    >
                      <span>Presented by <strong>NoaRecord</strong></span>
                      <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-neutral-800 transition-colors" />
                    </a>
                  )}
                </div>
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-neutral-955 tracking-tight leading-none mb-6">
                  <span className="inline-block whitespace-nowrap">Use it.</span>{' '}
                  <span className="inline-block whitespace-nowrap">Customize it.</span>{' '}
                  <br className="hidden sm:inline" />
                  <span className="inline-block whitespace-nowrap text-neutral-900 underline decoration-neutral-300 underline-offset-8 decoration-4">Learn from it.</span>
                </h1>
                <p className="text-neutral-500 font-sans font-light text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                  {activeLang.heroDesc}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
                  <button
                    onClick={() => setActiveTab('install')}
                    className="w-full sm:w-auto bg-neutral-950 hover:bg-neutral-800 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 text-sm select-none"
                  >
                    <Download className="w-4 h-4" />
                    <span>{activeLang.ctaInstall}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('generator')}
                    className="w-full sm:w-auto bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300/85 font-semibold px-8 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 text-sm shadow-sm select-none"
                  >
                    <Settings className="w-4 h-4 text-neutral-500" />
                    <span>{activeLang.ctaCustomize}</span>
                  </button>
                </div>

                {/* Recommended Customize Alert & GitHub Star Callout within Hero block */}
                <div className="mt-8 flex flex-col items-center gap-3.5 max-w-xl mx-auto">
                  <button
                    onClick={() => setActiveTab('generator')}
                    className="w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-950 text-white px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all hover:scale-[1.01] shadow-md select-none text-center"
                  >
                    <span>{activeLang.generatorRecommend}</span>
                  </button>

                  <div className="inline-flex items-center gap-3 bg-neutral-100 border border-neutral-200 px-4 py-2 rounded-2xl shadow-sm text-neutral-700">
                    <span className="text-xs font-semibold">
                      {activeLang.starAppeals}
                    </span>
                    <div className="flex items-center min-h-[28px]">
                      <a
                        className="github-button"
                        href="https://github.com/NoaRecord/Chatlet_Free"
                        data-icon="octicon-star"
                        data-size="large"
                        aria-label="Star NoaRecord/Chatlet_Free on GitHub"
                      >
                        Star
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* THREE PILLARS CARD CONTAINER */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-center text-neutral-900 tracking-tight mb-12">
                {activeLang.featureTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {activeLang.features.map((feat, idx) => {
                  let IconComponent = Layers;
                  if (idx === 1) IconComponent = Code;
                  if (idx === 2) IconComponent = Sparkles;
                  return (
                    <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200/60 hover:shadow-md transition-shadow relative overflow-hidden group">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-950 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                      <div className="w-12 h-12 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center mb-5 group-hover:bg-neutral-950 group-hover:text-white transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-semibold text-lg text-neutral-900 mb-2.5">
                        {feat.title}
                      </h3>
                      <p className="text-neutral-500 text-sm leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SIMULATOR REPLACEMENT / WORKFLOW EXPLANATION ZONE */}
            <div className="bg-neutral-100 py-16 border-y border-neutral-200 animate-fade-in">
              <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-10">
                  <span className="inline-block bg-neutral-900 text-white text-[11px] font-mono font-bold px-2.5 py-1 rounded-full mb-3">
                    {lang === 'ja' ? '💡 本番のChatGPTで動作する本来の姿' : '💡 Actual Behavior on ChatGPT'}
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 tracking-tight mb-2">
                    {lang === 'ja' ? 'Chatlet Free の基本動作システム' : 'Chatlet Free Native System Workflow'}
                  </h2>
                  <p className="text-neutral-500 text-sm max-w-xl mx-auto">
                    {lang === 'ja' ? '実機ChatGPT画面上でお気に入りボタン（Bookmarklet）をクリックすると、画面左下にフローティングパネルが現れ、以下の機能が確実に動作します。' : 'When executed on an active ChatGPT website, Chatlet Free overlay spawns seamlessly with full feature operations.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 text-neutral-800 flex items-center justify-center font-bold font-mono text-sm mb-4">A</div>
                    <h4 className="font-semibold text-neutral-900 mb-2">
                      {lang === 'ja' ? '1. プリセットボタンで瞬時入力' : '1. Instantly Inject Presets'}
                    </h4>
                    <p className="text-neutral-500 text-xs leading-relaxed">
                      {lang === 'ja' ? 'よく使う定型的なプロンプト（要約・推敲・初心者に優しい説明など）をワンクリック。ChatGPT本体のプロンプト入力欄へと自動的にテキスト入力して送信されます。' : 'One click fills preset instructions into ChatGPT prompt textareas and automatically sends them directly to the AI.'}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 text-neutral-800 flex items-center justify-center font-bold font-mono text-sm mb-4">B</div>
                    <h4 className="font-semibold text-neutral-900 mb-2">
                      {lang === 'ja' ? '2. 自由入力(1行) ＆ 送信(↵)を完備' : '2. Custom Input & Send Prompt (↵)'}
                    </h4>
                    <p className="text-neutral-500 text-xs leading-relaxed">
                      {lang === 'ja' ? '登録したプリセットボタンとは別に、Chatletには「自由入力フォームが1個」と「送信(↵)」が組み込まれています。ここに入力したカスタムの一行プロンプトも、即座にChatGPT本体に自動送信できます。' : 'Alongside presets, a physical custom input form and an execution button (↵) are built inside, allowing you to fluidly write and dispatch customizable prompt strings.'}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 text-neutral-800 flex items-center justify-center font-bold font-mono text-sm mb-4">C</div>
                    <h4 className="font-semibold text-neutral-900 mb-2">
                      {lang === 'ja' ? '3. 最新10ターンのみ表示' : '3. Keep Latest 10 Turns'}
                    </h4>
                    <p className="text-neutral-500 text-xs leading-relaxed">
                      {lang === 'ja' ? '「最新10ターンのみ表示」チェックボックスをONにすると、長くて重くなった過去のスレッドを非表示にし、最新の対話10ターンだけを表示。ブラウザの負荷の軽減をし、直近部分だけに集中できます。' : 'Enabling turn limits hides bloated historic messages and renders only the latest 10 turns. This reduces browser tab memory load and helps you focus on active replies.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK STEPS INSTRUCTIONS HIGHLIGHT */}
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
              <h3 className="font-display font-bold text-xl sm:text-2xl mb-4 text-neutral-900">
                {lang === 'ja' ? '🚀 ブックマーク登録するだけでChatGPTをもっと便利に' : '🚀 Supercharge ChatGPT Simply with a Bookmark'}
              </h3>
              <p className="text-neutral-500 text-sm max-w-xl mx-auto mb-8">
                {lang === 'ja' 
                  ? 'サーバ不要のため個人情報は一切取得されません。開発者による100%安全保証済みのオープンソース教材です。' 
                  : 'Completely serverless. Zero personal data collection. A 100% safe, developer-guaranteed open-source educational toolkit.'}
              </p>
              <button
                onClick={() => setActiveTab('install')}
                className="inline-flex items-center gap-1 text-neutral-900 hover:text-neutral-950 font-semibold text-sm transition-colors group"
              >
                <span>{lang === 'ja' ? '詳しい登録ガイドを見る' : 'View Detailed Setup Guide'}</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}


        {/* EXAMPLES TAB */}
        {activeTab === 'examples' && (
          <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
            <div className="border-b border-neutral-200 pb-6 mb-10">
              <span className="text-xs bg-neutral-900 text-white font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono shadow-sm">
                Prompt Catalog v2.0
              </span>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-neutral-900 tracking-tight mt-3 mb-2">
                {activeLang.packSectionTitle}
              </h1>
              <p className="text-neutral-500 text-sm leading-relaxed max-w-2xl">
                {activeLang.packSectionDesc}
              </p>
            </div>

            {/* Grid of packs */}
            <div className="space-y-10">
              {presetPacks.map((pack) => {
                const titleText = lang === 'ja' ? pack.title.ja : pack.title.en;
                const descText = lang === 'ja' ? pack.description.ja : pack.description.en;
                const presetsList = lang === 'ja' ? pack.presets.ja : pack.presets.en;

                return (
                  <div key={pack.id} className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-neutral-100">
                      <div>
                        <h3 className="font-display font-bold text-lg text-neutral-900">
                          {titleText}
                        </h3>
                        <p className="text-neutral-500 text-xs mt-0.5">
                          {descText}
                        </p>
                      </div>
                      <button
                        onClick={() => handleApplyPackToGenerator(pack)}
                        className="inline-flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold px-4 py-2 rounded-lg transition-colors border border-neutral-200/80 shrink-0 self-start sm:self-auto"
                      >
                        <Settings className="w-3.5 h-3.5 text-neutral-500" />
                        <span>{activeLang.applyBtn}</span>
                      </button>
                    </div>

                    {/* Presets Listing */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {presetsList.map((preset, idx) => {
                        const copyId = `${pack.id}-${idx}`;
                        const isCopied = copyState[copyId];
                        return (
                          <div key={idx} className="bg-neutral-50 border border-neutral-200/60 rounded-xl p-3.5 flex flex-col justify-between group hover:border-neutral-300 transition-colors">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <span className="font-display font-semibold text-sm text-neutral-850">
                                {preset.label}
                              </span>
                              <button
                                onClick={() => triggerCopy(preset.value, copyId)}
                                className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all shrink-0 ${
                                  isCopied
                                    ? 'bg-green-100 border-green-300 text-green-700 font-bold'
                                    : 'bg-white border-neutral-200 text-neutral-400 hover:text-neutral-800'
                                }`}
                                title="Copy prompt template"
                              >
                                {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                            <p className="text-neutral-500 text-xs font-mono bg-white/60 p-2.5 rounded border border-neutral-200/50 max-h-24 overflow-y-auto whitespace-pre-wrap leading-relaxed select-all">
                              {preset.value}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}


        {/* GENERATOR TAB */}
        {activeTab === 'generator' && (
          <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Form Customizer Column */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
              <h2 className="font-display font-extrabold text-2xl text-neutral-900 tracking-tight mb-2">
                {activeLang.generatorTitle}
              </h2>
              <p className="text-neutral-500 text-xs leading-relaxed mb-4">
                {activeLang.generatorDesc}
              </p>

              {/* Informative top banner explaining real-time generation */}
              <div className="bg-neutral-100 border border-neutral-200 p-4 rounded-xl text-xs text-neutral-850 leading-relaxed mb-6 font-sans flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <span className="font-bold block text-neutral-900 mb-0.5">
                    {lang === 'ja' ? '💡 リアルタイム自動生成・即座反映' : '💡 Real-time Auto-compiled Specs'}
                  </span>
                  <span>
                    {lang === 'ja' 
                      ? '左側のパラメータを変更すると、右側の「実行コード」および「ドラッグ可能なブックマークボタン」へリアルタイムに即座反映されます。手動による作成を明示的に検証されたい場合は、最下部の作成ボタンもご利用いただけます。'
                      : 'Parameters customized on the left instantly adjust the draggable bookmarklet and copyable executable codes in the right column. No manual compiling is required.'
                    }
                  </span>
                </div>
              </div>

              <div className="space-y-5">
                {/* Custom Title */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                    Bookmarklet Window Title (タイトル名)
                  </label>
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                {/* Theme Selector */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                    {activeLang.themeLabel} (カラーテーマ)
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      { hex: '#18181b', name: 'Charcoal Minimal' },
                      { hex: '#1e3a8a', name: 'Navy Blue' },
                      { hex: '#0f172a', name: 'Slate Gray' },
                      { hex: '#064e3b', name: 'Forest Green' },
                      { hex: '#991b1b', name: 'Dark Crimson' },
                      { hex: '#6b21a8', name: 'Night Violet' }
                    ].map((theme) => (
                      <button
                        key={theme.hex}
                        onClick={() => setCustomTheme(theme.hex)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all text-white`}
                        style={{ backgroundColor: theme.hex }}
                      >
                        {customTheme === theme.hex && <Check className="w-3.5 h-3.5" />}
                        <span>{theme.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Container Width (UIの横幅調整) */}
                <div className="border-t border-neutral-100 pt-5">
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                    {activeLang.widthLabel} (サイズ変更)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'narrow', label: lang === 'ja' ? '極小 (270px)' : 'Narrow (270px)' },
                      { id: 'normal', label: lang === 'ja' ? '標準 (310px)' : 'Normal (310px)' },
                      { id: 'wide', label: lang === 'ja' ? '幅広 (360px)' : 'Wide (360px)' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setCustomWidth(opt.id as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                          customWidth === opt.id
                            ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                            : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Show Latest Turn Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-neutral-100 pt-5">
                  <div className="flex items-center py-2.5">
                    <label className="flex items-center gap-2 text-sm text-neutral-700 select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enableLimit}
                        onChange={(e) => setEnableLimit(e.target.checked)}
                        className="w-4 h-4 accent-neutral-950 rounded"
                      />
                      <span className="font-semibold">{activeLang.limitCountLabel}</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">
                      {activeLang.limitTurnLabel} (LATEST_COUNT)
                    </label>
                    <input
                      type="number"
                      min={3}
                      max={40}
                      disabled={!enableLimit}
                      value={customLimit}
                      onChange={(e) => setCustomLimit(parseInt(e.target.value, 10))}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 disabled:opacity-40"
                    />
                  </div>
                </div>

                {/* Preset List Configurations */}
                <div className="border-t border-neutral-100 pt-5">
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-3">
                    Configure Active Preset Buttons (現在のプリセットボタン定義)
                  </label>

                  <div className="space-y-2.5 max-h-[220px] overflow-y-auto mb-3 pr-1">
                    {customPresets.map((preset, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 p-2.5 rounded-xl">
                        <span className="text-xs font-mono font-bold bg-neutral-200 text-neutral-800 px-1.5 py-0.5 rounded">
                          BTN {idx + 1}
                        </span>
                        <div className="flex-grow grid grid-cols-1 sm:grid-cols-3 gap-2 min-w-0">
                          <span className="text-xs font-bold text-neutral-800 font-sans truncate sm:col-span-1">
                            {preset.label}
                          </span>
                          <span className="text-[11px] text-neutral-500 font-mono truncate sm:col-span-2">
                            {preset.value}
                          </span>
                        </div>
                        <button
                          onClick={() => removePresetItem(idx)}
                          className="w-7 h-7 text-red-500 hover:text-red-700 hover:bg-red-50 rounded flex items-center justify-center transition-colors border border-transparent hover:border-red-200 shrink-0"
                          title="Remove actions"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add action row */}
                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-2xl">
                    <span className="text-[11px] font-bold text-neutral-500 block mb-2">ADD NEW PRESET BUTTON</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2.5">
                      <input
                        type="text"
                        placeholder="例：進めて / Continue"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        className="bg-white border text-xs border-neutral-300 rounded-xl px-3 py-2 focus:outline-none focus:border-neutral-900"
                      />
                      <input
                        type="text"
                        placeholder="例：詳細な説明を継続して / Continue detailed..."
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        className="bg-white border text-xs border-neutral-300 rounded-xl px-3 py-2 focus:outline-none focus:border-neutral-900"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={addNewPresetItem}
                      className="w-full bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl py-2 text-xs font-semibold flex items-center justify-center gap-1 transition-colors shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5 opacity-90" />
                      <span>{activeLang.addPreset}</span>
                    </button>
                  </div>

                </div>

                {/* Manual Compile Button to reassure users */}
                <div className="border-t border-neutral-100 pt-5 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      triggerCopy(compiledCode.bookmarklet, 'compile-trigger');
                      setApplyFlash(true);
                      setTimeout(() => setApplyFlash(false), 1500);
                    }}
                    className="w-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <Cpu className="w-4 h-4 text-emerald-400" />
                    <span>
                      {lang === 'ja' ? '設定を適用してブックマークレットを作成' : 'Compile & Generate Custom Bookmarklet'}
                    </span>
                  </button>
                  {copyState['compile-trigger'] && (
                    <div className="text-center font-semibold text-emerald-600 text-xs mt-2 transition-all">
                      {lang === 'ja' ? '✓ 生成完了！お気に入りボタンを最新にアップデートしてコードをコピーしました。' : '✓ Successfully Compiled! Swiped settings to output. Copy or drag the code in the right column.'}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Output Anchor and code copy Column */}
            <div className="lg:col-span-5 bg-neutral-900 text-white rounded-2xl p-6 shadow-xl border border-neutral-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-widest block mb-4 w-max">
                  Generated Output (実行コード)
                </span>
                
                {/* 1. THE DRAGGABLE ANCHOR LINK BLOCK */}
                <div className={`rounded-2xl p-5 border text-center mb-6 shadow-inner relative overflow-hidden transition-all duration-300 ${
                  applyFlash 
                    ? 'border-emerald-500 bg-neutral-800/90 ring-4 ring-emerald-500/10' 
                    : 'border-neutral-850 bg-neutral-850'
                }`}>
                  <div className="absolute top-2 right-2 text-[9px] font-mono text-neutral-400 bg-neutral-950 border border-neutral-800 px-1.5 py-0.5 rounded">
                    Draggable Link
                  </div>
                  <h4 className="font-display font-semibold text-xs text-neutral-400 mb-3">
                    Drag the below button to your Bookmarks Bar (お気に入りバーへ直接ドラッグ)
                  </h4>
                  
                  {/* Draggable Anchor Literal Link! */}
                  <a
                    ref={draggableLinkRef}
                    href={compiledCode.bookmarklet}
                    onClick={(e) => {
                      e.preventDefault();
                      alert(lang === 'ja' 
                        ? 'このボタンは直接クリックするのではなく、お気に入り（ブックマーク）バーへドラッグ＆ドロップして登録してください。お好みのプロンプトにカスタマイズされています！'
                        : 'Do not click this button directly. Instead, drag and drop it onto your browser bookmarks toolbar to install!'
                      );
                    }}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl shadow-lg transition-all border font-sans text-sm font-bold text-white cursor-grab active:cursor-grabbing ${
                      applyFlash 
                        ? 'animate-bounce scale-110 ring-4 ring-emerald-400 ring-offset-2 ring-offset-neutral-900 border-white' 
                        : 'hover:scale-105 active:scale-95'
                    }`}
                    style={{ backgroundColor: customTheme, borderColor: customTheme }}
                  >
                    <Bookmark className="w-4 h-4 fill-white" />
                    <span>{customTitle}</span>
                  </a>

                  <p className="text-[10px] text-neutral-500 mt-3 leading-relaxed">
                    ※ {lang === 'ja' ? 'スマホの方は以下のコードをコピーしてお気に入りURLへ貼り付けて登録してください。' : 'Or copy the minified script below and map it into arbitrary URLs manually.'}
                  </p>
                </div>

                {/* 2. MINIFIED REDUCED RUNTIME */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-neutral-400 font-semibold font-mono">Minified Executable JS</span>
                    <button
                      onClick={() => triggerCopy(compiledCode.bookmarklet, 'min-copy')}
                      className="text-xs text-neutral-300 hover:text-white font-semibold flex items-center gap-1 transition-colors"
                    >
                      {copyState['min-copy'] ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
                      <span>{copyState['min-copy'] ? activeLang.copied : 'Copy Code'}</span>
                    </button>
                  </div>
                  <div className="font-mono text-[11px] bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 text-neutral-300 h-28 overflow-y-auto break-all font-light leading-relaxed select-all">
                    {compiledCode.bookmarklet}
                  </div>
                </div>

                {/* 3. ORIGINAL SOURCE REWRITTEN */}
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-neutral-400 font-semibold font-mono">Custom Raw Source</span>
                    <button
                      onClick={() => triggerCopy(compiledCode.sourceCode, 'source-copy')}
                      className="text-xs text-neutral-300 hover:text-white font-semibold flex items-center gap-1 transition-colors"
                    >
                      {copyState['source-copy'] ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
                      <span>{copyState['source-copy'] ? activeLang.copied : 'Copy Source'}</span>
                    </button>
                  </div>
                  <pre className="font-mono text-[10px] bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 text-neutral-400 h-36 overflow-y-auto whitespace-pre leading-relaxed scrollbar-thin">
                    {compiledCode.sourceCode}
                  </pre>
                </div>

              </div>

              <div className="border-t border-neutral-800 pt-4 mt-4 text-[10px] text-neutral-500 leading-normal flex flex-col gap-3.5 select-none animate-fade-in">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                  <span>
                    No background servers are referenced. The customization compiler compiles code 100% locally via dynamic client strings. Use, modify, and learn freely!
                  </span>
                </div>
                {/* Customizer specific GitHub Star promotion panel */}
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-300">
                  <div className="text-left">
                    <span className="font-mono text-[9px] text-neutral-400 block font-bold uppercase tracking-wider mb-0.5">
                      Support Chatlet Free
                    </span>
                    <span className="text-[11px] font-medium block">
                      {activeLang.starAppeals}
                    </span>
                  </div>
                  <div className="flex items-center min-h-[28px] shrink-0">
                    <a
                      className="github-button"
                      href="https://github.com/NoaRecord/Chatlet_Free"
                      data-icon="octicon-star"
                      data-size="large"
                      aria-label="Star NoaRecord/Chatlet_Free on GitHub"
                    >
                      Star
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}


        {/* INSTALL TAB */}
        {activeTab === 'install' && (
          <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in text-neutral-800">
            <div className="border-b border-neutral-200 pb-5 mb-8">
              <h1 className="font-display font-extrabold text-3xl text-neutral-900 tracking-tight">
                {activeLang.installHeader}
              </h1>
              <p className="text-neutral-500 text-sm mt-1">
                {lang === 'ja' 
                  ? 'デスクトップ、およびモバイル（iOS Safari/Android Chrome）でのブックマークレット登録・起動マニュアルです。'
                  : 'Desktop and mobile (iOS Safari/Android Chrome) bookmarklet registration and launch manual.'}
              </p>
            </div>

            <div className="space-y-8">
              
              {/* DESKTOP GUIDES */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center font-display font-semibold text-xs text-neutral-700">1</span>
                  <span className="font-display font-bold text-base text-neutral-900">
                    {lang === 'ja' ? 'PC（Chrome / Safari / Edge / Firefox）での登録' : 'PC (Chrome / Safari / Edge / Firefox) Installation'}
                  </span>
                </div>
                <div className="ml-8 space-y-3.5 text-sm text-neutral-600 leading-relaxed font-sans">
                  <div className="bg-neutral-50 p-4 border border-neutral-100 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <span className="block font-bold text-neutral-800">
                        {lang === 'ja' ? 'ドラッグ＆ドロップだけで完了：' : 'Instant Drag & Drop Setup:'}
                      </span>
                      <span className="text-xs text-neutral-400">
                        {lang === 'ja' 
                          ? 'ブックマークバーにお好みのボタンを直接ドラッグします。詳細はジェネレータータブを参照してください。'
                          : 'Simply drag and drop your preferred button directly to your Bookmarks Bar. See the Generator tab for details.'}
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveTab('generator')}
                      className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg px-4 py-2 hover:shadow-md text-xs font-semibold whitespace-nowrap shrink-0 transition-transform active:scale-95"
                    >
                      {lang === 'ja' ? 'ジェネレーターへ移動' : 'Go to Generator'}
                    </button>
                  </div>
                  <p>
                    <span className="font-bold text-neutral-800">
                      {lang === 'ja' ? '手動登録の手順：' : 'Manual Setup Steps:'}
                    </span>
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-xs text-neutral-500">
                    {lang === 'ja' ? (
                      <>
                        <li>ブラウザのブックマークバーやお気に入りに、適当なウェブページ（本日のYahooでも何でも可）を一旦ダミー登録します。</li>
                        <li>登録したブックマークをお気に入り一覧で右クリックし、<strong>「編集」</strong>、または<strong>「URLを編集」</strong>を選択します。</li>
                        <li>ブックマーク名をお好みの表示（例：<code className="bg-neutral-100 px-1 py-0.5 rounded font-bold font-mono text-neutral-800">Chatlet Free</code>）に変更。</li>
                        <li>URL入力ボックスに、コピーした minified ブックマークレットコードを<strong>全てペースト（貼付け）</strong>して保存します。</li>
                      </>
                    ) : (
                      <>
                        <li>Bookmark any random web page temporarily to your browser Bookmarks Bar (e.g., this page or Google).</li>
                        <li>Right-click the newly added bookmark in your bookmarks bar and select <strong>"Edit"</strong> or <strong>"Properties"</strong>.</li>
                        <li>Change the bookmark name to anything you like (e.g., <code className="bg-neutral-100 px-1 py-0.5 rounded font-bold font-mono text-neutral-800">Chatlet Free</code>).</li>
                        <li>Replace the entire URL input box content with your <strong>copied minified bookmarklet code (paste everything)</strong> and save.</li>
                      </>
                    )}
                  </ol>
                </div>
              </div>

              {/* MOBILE GUIDES */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center font-display font-semibold text-xs text-neutral-700">2</span>
                  <span className="font-display font-bold text-base text-neutral-900">
                    {lang === 'ja' ? 'モバイル端末（iOS Safari / Android Chrome）での手順' : 'Mobile Platforms (iOS Safari / Android Chrome) Setup'}
                  </span>
                </div>
                <div className="ml-8 text-sm text-neutral-600 leading-relaxed font-sans">
                  {lang === 'ja' ? (
                    <p className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-xs font-medium">
                      スマートフォンではPCと異なり、現在のChatletFreeは動作しません。将来対応できるようにプロジェクトを応援、ご支援ください。
                    </p>
                  ) : (
                    <p className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-xs font-medium">
                      Unlike PCs, the current ChatletFree is not supported on mobile devices. Please support and fund the project so we can publish future mobile compatibility updates!
                    </p>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}


        {/* LEARN TAB */}
        {activeTab === 'learn' && isOfficialHost && (
          <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in text-neutral-800">
            <div className="border-b border-neutral-200 pb-5 mb-8">
              <h1 className="font-display font-extrabold text-3xl text-neutral-900 tracking-tight">
                {activeLang.learnHeader}
              </h1>
              <p className="text-neutral-500 text-sm mt-1">
                {lang === 'ja' 
                  ? 'JavaScriptの基礎から、ChatGPTのDOM構造、AI共同開発によるカスタム方法までを体系化された学習ガイドです。'
                  : 'A systematic learning guide covering JavaScript basics, ChatGPT DOM structures, and AI-assisted custom creation.'}
              </p>
              
              {/* Note about Japanese tutorials */}
              <div className="mt-4 bg-neutral-50 border border-neutral-200/60 rounded-xl p-3.5 text-xs text-neutral-500 leading-relaxed font-sans flex items-start gap-2.5">
                <span className="text-neutral-400 select-none text-sm">🌐</span>
                <div>
                  <p className="font-semibold text-neutral-700">
                    {lang === 'ja' ? '※ 学習言語に関するお知らせ' : '※ Language Notice for Tutorials'}
                  </p>
                  <p className="mt-0.5">
                    {lang === 'ja' 
                      ? '学習教材の解説記事や外部解説（note等のマガジン記事）は主に日本語で記述されています。note.com独自の自動翻訳機能（単体無料記事から順次対応中、マガジン記事は今後対応予定）や、ブラウザの翻訳機能をご活用いただけますと幸いです。'
                      : 'Our tutorial articles and external deep-dives (such as note.com magazine posts) are primarily written in Japanese. While note.com is gradually rolling out its own automatic translation features (currently supporting standalone free articles, with magazine support coming soon), we highly encourage using built-in browser translation tools in the meantime.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {learnItems.map((item, idx) => (
                <div key={idx} className="bg-white p-5 border border-neutral-200 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <h3 className="font-display font-bold text-base text-neutral-900 mb-2">
                      {lang === 'ja' ? item.title.ja : item.title.en}
                    </h3>
                    <p className="text-neutral-500 text-xs leading-relaxed mb-4">
                      {lang === 'ja' ? item.desc.ja : item.desc.en}
                    </p>
                  </div>
                  <a
                    href={item.link.startsWith('#') ? '#' : item.link}
                    onClick={(e) => {
                      if (item.link.startsWith('#')) {
                        e.preventDefault();
                        setActiveTab('repo');
                        setSelectedRepoFile('docs/customization.md');
                        alert(lang === 'ja' 
                          ? 'リポジトリタブのエクスプローラーでdocs/customization.mdを表示します。'
                          : 'Opening docs/customization.md inside the repository file explorer.'
                        );
                      }
                    }}
                    target={item.link.startsWith('#') ? '_self' : '_blank'}
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
                  >
                    <span>{lang === 'ja' ? item.actionText.ja : item.actionText.en}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>

            {/* In-depth educational docs inside layout */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
              <h3 className="font-display font-bold text-lg text-neutral-900 border-b border-neutral-100 pb-3 mb-4">
                {lang === 'ja' 
                  ? '💡 技術的読解：最新サイトの入力欄を自動制御する技術' 
                  : '💡 Tech Deep-Dive: Controlling Modern Form Elements in SPAs'}
              </h3>
              <div className="text-sm text-neutral-600 leading-relaxed font-sans space-y-4">
                {lang === 'ja' ? (
                  <>
                    <p>
                      ChatGPTをはじめとした最近の高度なSPA（シングルページアプリケーション）では、テキスト入力欄の
                      「value」変更をJavaScriptの変数変更（<code className="bg-neutral-100 px-1 font-mono">textarea.value = text</code>）だけで更新しようとしても、画面内部のReactステートが値の変更をキャッチしてくれません。ボタンがクリックできない状態のままになってしまいます。
                    </p>
                    <p>
                      Chatlet Freeはこの問題を克服するため、外部フレームワークを呼び出すことなく純粋なJavaScript（JS）だけで入力欄にテキストを設定後、
                      <strong>Reactのネイティブハンドラー（イベントバブル）</strong>をフックする以下のカスタムコードを走らせています。
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      In modern Single Page Applications (SPAs) like ChatGPT, simply updating a text input’s raw value via JavaScript (<code className="bg-neutral-100 px-1 font-mono">textarea.value = text</code>) will not update the virtual DOM or notify React's internal state managers. As a result, the "Send" button remains locked or unclickable.
                    </p>
                    <p>
                      To overcome this hurdle without bundling external frameworks, Chatlet Free writes text directly to the input field and immediately fires a synthetic <strong>React Native Event Hook (Event Bubbling)</strong> with the following pure JavaScript code:
                    </p>
                  </>
                )}
                
                <pre className="font-mono text-xs bg-neutral-900 text-neutral-300 p-4 rounded-xl leading-relaxed whitespace-pre overflow-x-auto">
{lang === 'ja' 
? `// Reactへ「キー入力が手動で行われた」とDOMレベルで信じさせるために
// バブリングとキャンセル可能な設定でinputイベントを発行します
inputElement.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
if (inputElement instanceof HTMLElement) {
    inputElement.focus();
}`
: `// Trick React into believing this input was typed manually by a real user
// Dispatch an input event with bubbles and cancelable enabled
inputElement.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
if (inputElement instanceof HTMLElement) {
    inputElement.focus();
}`}
                </pre>
                
                {lang === 'ja' ? (
                  <p>
                    このように「既存の高度な大企業アプリを壊さずに安全にハックする」というリアルなDOMプログラミングの現場知見を楽しく学べるのが、Bookmarkletを学習教材にする最大のメリットです。
                  </p>
                ) : (
                  <p>
                    Learning how to interact safely with heavily optimized production systems without breaking their standard event handling logic is the ultimate real-world web engineering experience that bookmarklet development uniquely provides!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}


        {/* VIDEOS TAB */}
        {activeTab === 'videos' && isOfficialHost && (
          <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in text-neutral-800 text-center">
            <div className="border-b border-neutral-200 pb-5 mb-10">
              <h1 className="font-display font-extrabold text-3xl text-neutral-900 tracking-tight">
                {activeLang.videosHeader}
              </h1>
              <p className="text-neutral-500 text-sm mt-1">
                {lang === 'ja' ? 'レクチャー動画 ＆ アップデート・チュートリアル' : 'Lecture Videos & Standard Walkthroughs'}
              </p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-3xl p-10 shadow-sm max-w-2xl mx-auto my-6 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 text-amber-500 flex items-center justify-center mb-6">
                <Video className="w-8 h-8" />
              </div>
              <h2 className="font-display font-bold text-xl text-neutral-900 mb-3">
                {lang === 'ja' ? '現在、レクチャー動画は準備中です 🚧' : 'Lecture Videos Under Construction 🚧'}
              </h2>
              <p className="text-neutral-500 text-xs leading-relaxed max-w-md mb-6">
                {lang === 'ja' 
                  ? '現在、第2世代（v2.0）に合わせた最新の開発解説・カスタムデモ映像を鋭意制作しております。公開を楽しみにお待ちください！' 
                  : 'We are currently filming high-quality custom tutorials and AI co-development walkthroughs for Chatlet Free v2.0. Please check back soon!'
                }
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveTab('generator')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-5 py-2.5 text-xs font-semibold whitespace-nowrap transition-all shadow shadow-indigo-100 shrink-0"
                >
                  {lang === 'ja' ? 'カスタマイザーを試す' : 'Try Customizer Form'}
                </button>
                <button
                  onClick={() => setActiveTab('learn')}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl px-5 py-2.5 text-xs font-semibold whitespace-nowrap transition-all shrink-0"
                >
                  {lang === 'ja' ? '学習教材を読む' : 'Read Educational Guides'}
                </button>
              </div>
            </div>
          </div>
        )}


        {/* REPOSITORY TAB */}
        {activeTab === 'repo' && (
          <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in text-neutral-800">
            <div className="border-b border-neutral-200 pb-5 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="font-display font-extrabold text-3xl text-neutral-900 tracking-tight">
                  {activeLang.repoHeader}
                </h1>
                <p className="text-neutral-500 text-sm mt-1">
                  このWebポータル内には、GitHubにそのままPush可能な実ファイル群がすべて構造化されています。
                </p>
              </div>
              <button
                onClick={() => {
                  downloadFile(activeFileObject.name, activeFileObject.content);
                }}
                className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 text-center justify-center shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Active File</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Repository Finder Side Column */}
              <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200 p-4 shadow-sm">
                <span className="text-[10px] font-bold text-neutral-400 block mb-3 font-mono tracking-wider">
                  REPOSITORY ROOT (chatlet-bookmarklet-toolkit)
                </span>
                
                <div className="space-y-1.5">
                  {repoFiles.map((file) => {
                    const FileIcon = file.icon;
                    const isSelected = selectedRepoFile === file.name;

                    return (
                      <button
                        key={file.name}
                        onClick={() => setSelectedRepoFile(file.name)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs flex items-center justify-between gap-2.5 transition-all ${
                          isSelected
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-semibold shadow-inner'
                            : 'bg-white border-neutral-200/50 hover:bg-neutral-50 hover:border-neutral-300 text-neutral-600'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <FileIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-600' : 'text-neutral-400'}`} />
                          <span className="font-mono truncate">{file.name}</span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                          {file.category}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Code viewer column */}
              <div className="lg:col-span-8 bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between">
                <div>
                  
                  {/* Filename Header bar */}
                  <div className="bg-neutral-950 px-4 py-3 border-b border-neutral-800 flex items-center justify-between font-mono text-xs text-neutral-400 select-none">
                    <div className="flex items-center gap-2">
                      <Code className="w-3.5 h-3.5 text-indigo-500" />
                      <span className="text-neutral-200 font-bold">{activeFileObject.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>Syntax: {activeFileObject.name.endsWith('.js') ? 'JavaScript' : activeFileObject.name.endsWith('.json') ? 'JSON' : 'Markdown'}</span>
                      <button
                        onClick={() => triggerCopy(activeFileObject.content, 'repo-copy')}
                        className="text-[11px] text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1.5 transition-colors"
                      >
                        {copyState['repo-copy'] ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copyState['repo-copy'] ? activeLang.copied : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Code Body rendering */}
                  <pre className="p-5 overflow-auto text-xs font-mono text-neutral-300 bg-neutral-900/95 max-h-[500px] leading-relaxed break-all select-text font-light scrollbar-thin whitespace-pre-wrap">
                    {activeFileObject.content}
                  </pre>

                </div>

                <div className="bg-neutral-950 p-3.5 border-t border-neutral-800 text-[10px] text-neutral-500 leading-normal flex items-center justify-between font-mono select-none">
                  <span>Chatlet OSS Project Files - 2026</span>
                  <span className="font-mono bg-neutral-900 px-2 py-0.5 border border-neutral-800 rounded">
                    CC BY-NC-SA 4.0
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      <footer className="bg-white border-t border-neutral-200 py-10 mt-16 select-none shrink-0">
        
        {/* Support & Sponsor Section */}
        {isOfficialHost && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 border-b border-neutral-200/50 pb-8 animate-fade-in">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2 bg-neutral-100 px-2.5 py-1 rounded-full border border-neutral-200/50">
                  <Heart className="w-3.5 h-3.5 text-red-550 fill-red-500 animate-pulse" />
                  {lang === 'ja' ? SPONSOR_CONFIG.header.ja : SPONSOR_CONFIG.header.en}
                </span>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {lang === 'ja' ? SPONSOR_CONFIG.footerNote.ja : SPONSOR_CONFIG.footerNote.en}
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5 w-full lg:w-auto shrink-0">
                {SPONSOR_CONFIG.links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-col items-start bg-neutral-50 hover:bg-neutral-100/70 border border-neutral-200/80 rounded-xl p-3 min-w-[210px] flex-grow sm:flex-grow-0 transition-all hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span className="text-xs font-bold text-neutral-800 flex items-center gap-1">
                      {lang === 'ja' ? link.labelJa : link.labelEn}
                      <ExternalLink className="w-3 h-3 text-neutral-400" />
                    </span>
                    <span className="text-[10px] text-neutral-400 font-sans mt-0.5">
                      {lang === 'ja' ? link.descJa : link.descEn}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-semibold shadow shadow-indigo-100">
                <Bookmark className="w-3.5 h-3.5 fill-white" />
              </div>
              <span className="text-neutral-500 text-xs font-sans">
                &copy; 2026 Chatlet Bookmarklet Toolkit. Licensed under CC BY-NC-SA 4.0.
              </span>
            </div>
            {/* Soft inline footer GitHub Star widget */}
            <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200/60 px-3 py-1 rounded-xl relative select-none">
              <span className="text-[11px] font-sans text-neutral-500 font-medium">
                {activeLang.starAppeals}
              </span>
              <div className="flex items-center min-h-[20px] scale-90 origin-left">
                <a
                  className="github-button"
                  href="https://github.com/NoaRecord/Chatlet_Free"
                  data-icon="octicon-star"
                  data-size="large"
                  aria-label="Star NoaRecord/Chatlet_Free on GitHub"
                >
                  Star
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-neutral-400 flex-wrap justify-center">
            <a
              href="https://another-world.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-indigo-600 font-semibold flex items-center gap-1.5 transition-colors"
            >
              NoaRecord Official <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>
            <span>&middot;</span>
            <button href="#" onClick={() => setActiveTab('repo')} className="hover:text-neutral-700">README</button>
            <span>&middot;</span>
            <button href="#" onClick={() => setActiveTab('generator')} className="hover:text-neutral-700">Customizer</button>
            <span>&middot;</span>
            <button href="#" onClick={() => setActiveTab('learn')} className="hover:text-neutral-700">Educational Guides</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
