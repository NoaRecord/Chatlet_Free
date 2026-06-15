/**
 * Chatlet Free - Minimal Bookmarklet for Beginners (Bilingual Maintenance Comments)
 * 
 * Chatlet Free is a lightweight assistant utility designed to run inside ChatGPT's UI.
 * This version uses local/transient state and doesn't store data, launching with standard defaults.
 * 
 * Chatlet Freeは、ChatGPTのUI内部で動作するよう設計された軽量のアシスタントユーティリティです。
 * このバージョンはローカルの一時ステートを使用し、データを保存せず、標準のデフォルト状態で起動します。
 */
(function () {
    'use strict';

    // [DOM Element Configurations / DOM要素設定]
    // Constants used for namespace styling and element querying within the host page.
    // ホストページ内でのスタイル競合や要素選択を避けるために使用する固有のCSS ID/クラス名定数。
    const ID = 'chatlet-free-container';
    const STYLE_ID = 'chatlet-free-style';
    const LIMIT_STYLE_ID = 'chatlet-free-display-limit-style';
    const LATEST_COUNT = 10;

    // [Cleanup Previous Instances / 既存インスタンスの後片付け]
    // Safely remove any older versions or conflicting loaders before launching a new cycle.
    // 新しいサイクルを開始する前に、古いバージョンや競合するローダーを安全に削除してクリーンアップします。
    if (window.Chatlet && typeof window.Chatlet.cleanup === 'function') {
        window.Chatlet.cleanup();
    }
    if (window.ChatletStandard && typeof window.ChatletStandard.cleanup === 'function') {
        window.ChatletStandard.cleanup();
    }
    if (window.ChatletPro && typeof window.ChatletPro.cleanup === 'function') {
        window.ChatletPro.cleanup();
    }
    if (window.ChatletFree && typeof window.ChatletFree.cleanup === 'function') {
        window.ChatletFree.cleanup();
    }

    const ChatletFree = {
        presets: [
            { label: '進めて', value: '進めて' },
            { label: '要約して', value: '要約して' }
        ],

        showLatest: false,

        // [Lifecycle Entrypoint / ライフサイクル エントリーポイント]
        // Sets up styles and spawns UI elements inside the host page.
        // ホストページ内にて、スタイルの差し込みとUI要素の構築を順次実行します。
        init() {
            this.createStyle();
            this.createUI();
        },

        // [Styles Injection / CSSスタイルの動的注入]
        // Appends a scoped <style> block to format the floating container at bottom-left.
        // 画面左下にフローティング表示されるコンテナをスタイリングする専用の<style>ブロックを追加します。
        createStyle() {
            document.getElementById(STYLE_ID)?.remove();

            const style = document.createElement('style');
            style.id = STYLE_ID;
            style.textContent = `
                #chatlet-free-container { position: fixed !important; bottom: 20px !important; left: 20px !important; width: 310px !important; background: #ffffff !important; color: #1f2937 !important; border: 1px solid #d1d5db !important; border-radius: 12px !important; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1) !important; z-index: 2147483647 !important; font-family: system-ui, -apple-system, sans-serif !important; overflow: hidden !important; box-sizing: border-box !important; }
                #chatlet-free-container * { box-sizing: border-box !important; }
                #chatlet-free-container .free-header { height: 38px !important; padding: 0 12px !important; background: #444444 !important; color: #ffffff !important; display: flex !important; align-items: center !important; justify-content: space-between !important; font-size: 13px !important; font-weight: 600 !important; border-bottom: 1px solid rgba(0,0,0,0.05) !important; select: none !important; }
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
                #chatlet-free-container .free-input:focus { border-color: #444444 !important; box-shadow: 0 0 0 2px rgba(68, 68, 68, 0.1) !important; }
                #chatlet-free-container .free-send { width: 32px !important; height: 32px !important; background: #444444 !important; color: #ffffff !important; border: none !important; font-size: 14px !important; display: flex !important; align-items: center !important; justify-content: center !important; border-radius: 6px !important; font-weight: bold !important; box-shadow: 0 1px 2px rgba(0,0,0,0.05) !important; }
                #chatlet-free-container .free-send:hover { opacity: 0.9 !important; }
                #chatlet-free-container .free-setting { border-top: 1px solid #f3f4f6 !important; padding-top: 8px !important; font-size: 11px !important; color: #4b5563 !important; display: flex !important; align-items: center !important; gap: 2px !important; select: none !important; cursor: pointer !important; }
                #chatlet-free-container input[type="checkbox"] { appearance: none !important; -webkit-appearance: none !important; width: 14px !important; height: 14px !important; margin: 0 6px 0 0 !important; border: 1px solid #d1d5db !important; border-radius: 3px !important; background: #ffffff !important; cursor: pointer !important; position: relative !important; vertical-align: middle !important; display: inline-block !important; padding: 0 !important; }
                #chatlet-free-container input[type="checkbox"]:checked { background: #444444 !important; border-color: #444444 !important; }
                #chatlet-free-container input[type="checkbox"]:checked::after { content: "" !important; position: absolute !important; left: 4px !important; top: 1px !important; width: 4px !important; height: 8px !important; border: solid #ffffff !important; border-width: 0 2px 2px 0 !important; transform: rotate(45deg) !important; }
                [data-chatlet-hidden-turn="true"] { display: none !important; }
            `;
            document.head.appendChild(style);
        },

        // [UI Construction / UIレンダリング]
        // Assembles and mounts the markup, querying standard elements safely.
        // マークアップを組み立てて挿入し、操作ボタンやインプット枠のDOM参照をマッピングします。
        createUI() {
            document.getElementById(ID)?.remove();

            if (!document.getElementById(LIMIT_STYLE_ID)) {
                const limitStyle = document.createElement('style');
                limitStyle.id = LIMIT_STYLE_ID;
                document.head.appendChild(limitStyle);
            }

            const root = document.createElement('div');
            root.id = ID;
            root.innerHTML = `
                <div class="free-header">
                    <span>Chatlet Free</span>
                    <button type="button" class="free-close" id="free-close" title="閉じる">☒</button>
                </div>
                <div class="free-body">
                    <div class="free-row" id="free-presets"></div>
                    <div class="free-input-row">
                        <input type="text" class="free-input" id="free-input" placeholder="ここに入力...">
                        <button type="button" class="free-send" id="free-send" title="送信">↵</button>
                    </div>
                    <label class="free-setting">
                        <input type="checkbox" id="free-show-latest"> 最新10ターンのみ表示
                    </label>
                </div>
            `;
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
        },

        // [Render Preset Buttons / プリセットボタンの展開]
        // Distributes the labels defined in presets into actual clickable UI nodes.
        // プリセット設定配列から、クリック可能なUIボタン要素を動的に展開します。
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

        // [Bind Events / イベントリスナーの展開]
        // Handles input submittals, keydowns, closures, and preferences changes.
        // 送信キーのアクション、Enterショートカット、閉じる、表示設定の切り替えイベントを結びつけます。
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

        // [Send Actions to ChatGPT UI / ChatGPT入力欄への書き込み・送信エミュレート]
        // Resolves typical rich contenteditable elements and textareas in ChatGPT views,
        // triggers natural inputs and fires the standard send button dispatch mechanism.
        // ChatGPT画面におけるリッチエディタや各種テキスト記述エリアを走査し、
        // メッセージを投入して、ChatGPT内蔵の送信ボタンをクリック検知経由で手動トリガーします。
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

            // High-reactivity UI notifies hosts of custom keyboard and context alterations.
            // React等のUIフレームワーク側が検知可能にするために、カスタムの 'input' イベントを発火します。
            inputElement.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
            if (inputElement instanceof HTMLElement) inputElement.focus();

            // Intermittently checks for visual button activation to fire a clean send event.
            // 送信準備が整いボタンがアクティブになるのを待ち、自動クリック(送信発火)を実行します。
            let attempts = 0;
            const timer = setInterval(() => {
                const sendButton = document.querySelector('button[data-testid="send-button"]');
                if (sendButton && !sendButton.disabled) {
                    sendButton.click();
                    clearInterval(timer);
                } else if (attempts++ > 50) {
                    clearInterval(timer);
                }
            }, 100);
        },

        // [Filter Display / チャット特定表示制限]
        // Traverses active conversation blocks inside the screen to inject display filtering metadata.
        // 動作中のターンブロックを巡回し、特定件数を上回る古いコメント群をCSSにて非表示処理します。
        getConversationTurns() {
            return Array.from(document.querySelectorAll('[data-testid^="conversation-turn-"]'))
                .map((element) => {
                    const match = /^conversation-turn-(\d+)$/.exec(element.getAttribute('data-testid') || '');
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

            if (!this.showLatest) {
                return;
            }

            const turns = this.getConversationTurns();
            const visibleTurns = new Set(turns.slice(-LATEST_COUNT).map(turn => turn.element));
            turns.forEach((turn) => {
                if (!visibleTurns.has(turn.element)) {
                    turn.element.setAttribute('data-chatlet-hidden-turn', 'true');
                }
            });
            this.elements.limitStyle.textContent = '[data-chatlet-hidden-turn="true"]{display:none!important;}';
        },

        // [Teardown / リソース解放]
        // Gracefully removes appended DOM nodes and style blocks, then clears window objects.
        // 生成したDOM要素やスタイルタグを根こそぎ撤去し、グローバルオブジェクト上のメモリを解放します。
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
})();
