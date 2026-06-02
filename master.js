(function() {
    // 1. 在網頁上方自動插入原本的 14 單元導航列
    const navHTML = `
    <nav class="fixed top-0 left-0 right-0 z-40 bg-white border-b-4 border-black p-3 shadow-[0_4px_0_0_rgba(0,0,0,1)] flex items-center justify-between px-4 md:px-8">
        <a href="index.html" class="bg-[#FFD93D] border-2 border-black rounded-xl px-3 py-1.5 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 transition-all flex items-center gap-2 text-sm md:text-base text-black no-underline">
            <i class="fas fa-home"></i> 回首頁
        </a>
        <div class="flex items-center gap-2">
            <label class="font-black text-xs md:text-sm text-black hidden sm:inline">切換單元：</label>
            <select onchange="location.href=this.value" class="border-2 border-black rounded-xl px-3 py-1.5 bg-white font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs md:text-sm outline-none cursor-pointer">
                <option value="" disabled>-- 選擇其他主題 --</option>
                <option value="01-environment.html">Unit 1: 環境單元</option>
                <option value="02-tech-ai.html">Unit 2: 科技與 AI</option>
                <option value="03-society-culture.html">Unit 3: 社會與文化變遷</option>
                <option value="04-climate.html">Unit 4: 環境科學與氣候變遷</option>
                <option value="05-tech-edu.html">Unit 5: 科技、AI 與數位教育</option>
                <option value="06-wildlife.html">Unit 6: 生物與野生動物</option>
                <option value="07-psychology.html">Unit 7: 心理學與人類行為</option>
                <option value="08-international-relations.html">Unit 8: 國際關係與地緣政治</option>
                <option value="09-trade-economy.html">Unit 9: 經濟全球化與國際貿易</option>
                <option value="10-urban-planning.html">Unit 10: 城市化與都市規劃</option>
                <option value="11-mass-media.html">Unit 11: 大眾傳播與現代媒體</option>
                <option value="12-demographics.html">Unit 12: 人口結構與社會變遷</option>
                <option value="13-health.html">Unit 13: 健康、醫療與生活型態</option>
                <option value="14-arts-culture.html">Unit 14: 藝術、文化與歷史</option>
            </select>
        </div>
    </nav>
    `;
    
    // 將導航列塞入頁面最上方
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // 根據當前網頁檔名，自動讓下拉選單對應正確的單元
    const currentFile = window.location.pathname.split("/").pop();
    const selectEl = document.querySelector('nav select');
    if (selectEl && currentFile) {
        for (let option of selectEl.options) {
            if (option.value === currentFile) {
                option.selected = true;
                break;
            }
        }
    }

    // ====================================================
    // 💡 瑞瑞老師的「滿分限定版」多巴胺勉勵小語系統
    // ====================================================
    
    // 這裡存放 14 個單元專屬的老師小叮嚀（您可以隨時修改這些文字！）
    const ruiQuotes = {
        "01-environment.html": "瑞老師小叮嚀：環境保育不只是口號，就像背單字一樣，每天一點點累積，世界就會因你而改變！🌍",
        "02-tech-ai.html": "瑞老師小叮嚀：AI 是強大的工具，但別忘了發揮你獨一無二的創意思維，那才是無法被取代的核心價值喔！🤖",
        "03-society-culture.html": "瑞老師小叮嚀：社會在變，文化在融合。保持開放與同理心，你也能在多變的世界裡找到自己的定位！🤝",
        "04-climate.html": "瑞老師小叮嚀：面對氣候變遷的挑戰，每個人都是關鍵。今天的滿分，代表你已經具備了理解世界危機的全球視野！🌱",
        "05-tech-edu.html": "瑞老師小叮嚀：數位教育打破了時空限制，看著你親手解鎖這個單元，老師真的非常為你的資訊素養感到驕傲！💻",
        "06-wildlife.html": "瑞老師小叮嚀：萬物皆有靈。恭喜你通關！保護野生動物的第一步，就是用我們學到的知識去為牠們發聲！🦁",
        "07-psychology.html": "瑞老師小叮嚀：人類的認知與動機非常神奇。當你完成這個單元的瞬間，你的大腦神經元已經建立了更強大的聯結囉！🧠",
        "08-international-relations.html": "瑞老師小叮嚀：國際關係就像人際交往，需要智慧與外交手腕。具備了地緣政治的字彙，你的視野已經拓展到了全球！🌍",
        "09-trade-economy.html": "瑞老師小叮嚀：全球貿易將世界連成一體。理解了經濟的流動，代表你離成為一個宏觀的國際化人才又更近了一步！📈",
        "10-urban-planning.html": "瑞老師小叮嚀：城市的規劃需要前瞻性。而你現在為雅思所做的每一步規劃，都在為未來的耀眼人生奠定無比堅實的基石！🏙️",
        "11-mass-media.html": "瑞老師小叮嚀：在這個資訊爆炸的媒體時代，保持客觀與獨立思考（Media Literacy）比盲目吸收更重要，你做到了！🎙️",
        "12-demographics.html": "瑞老師小叮嚀：人口結構正在轉變，但只要保持終身學習的熱情，無論在哪個時代或社會，你都能立於不敗之地！👥",
        "13-health.html": "瑞老師小叮嚀：健康是一切多巴胺與能量的源頭。享受備課與學習的同時，記得喝杯 mapel coffee，好好照顧自己唷！🌿☕️",
        "14-arts-culture.html": "瑞老師小叮嚀：藝術是人類靈魂的精華。恭喜你完成了全部 14 個單元的終極挑戰！這絕對是一幅屬於你的無價大師傑作！🏛️✨"
    };

    // 自動攔截並改寫網頁中的 showUltimateCelebration (100%灑花函數)
    // 讓它在跳出滿分彈窗時，自動注入漂亮的「老師備忘錄」區塊
    window.addEventListener('DOMContentLoaded', () => {
        const originalShowUltimate = window.showUltimateCelebration;
        if (originalShowUltimate) {
            window.showUltimateCelebration = function() {
                // 先執行原本的灑花和音效功能
                originalShowUltimate();
                
                // 找出網頁上的滿分彈窗內容區
                const modal = document.getElementById('completion-modal');
                if (modal) {
                    const pElement = modal.querySelector('p');
                    const existingMemo = document.getElementById('rui-memo-box');
                    
                    // 如果還沒有注入過備忘錄，且抓得到當前單元的金句，就把它塞進去！
                    if (pElement && !existingMemo && ruiQuotes[currentFile]) {
                        const memoHTML = `
                            <div id="rui-memo-box" class="mt-4 p-3 bg-[#FFF5E4] border-2 border-black rounded-xl text-left shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <p class="text-xs font-black text-[var(--pop-orange)] mb-1">🎒 瑞瑞老師的本日備忘錄：</p>
                                <p class="text-xs font-bold text-gray-700 italic leading-relaxed">${ruiQuotes[currentFile]}</p>
                            </div>
                        `;
                        // 把備忘錄卡片插在原有說明的下方
                        pElement.insertAdjacentHTML('afterend', memoHTML);
                    }
                }
            };
        }
    });
})();
