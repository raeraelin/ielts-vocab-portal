(function() {
    // 1. 導航列 HTML
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
    
    document.body.insertAdjacentHTML('afterbegin', navHTML);

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

    // 2. 滿分鼓勵卡片庫 (通用鼓勵語)
    const completionNotes = {
        "01-environment.html": "太棒了！地球因為你的努力變得更好了！繼續保持這個節奏！🌍",
        "02-tech-ai.html": "太強了！你已經掌握了科技語彙，現在你是 AI 世代的領航員！🤖",
        "03-society-culture.html": "做得好！對社會現象有洞察力，這就是雅思寫作高分的關鍵！🤝",
        "04-climate.html": "氣候先鋒！你對環境議題的掌握度已經非常精準，這對於學術閱讀非常有幫助。🌱",
        "05-tech-edu.html": "數位學霸！你對學習工具的運用已經非常靈活，學習效率大大提升。💻",
        "06-wildlife.html": "生態守護者！你對自然的理解既深且廣，相信你一定能保護好這份學術知識。🦁",
        "07-psychology.html": "心理大師！你對人類行為的洞察力，絕對能幫你在雅思口說中講出更有深度的觀點！🧠",
        "08-international-relations.html": "全球觀點！國際視野已解鎖，你的雅思分數正朝著高峰邁進。🌍",
        "09-trade-economy.html": "市場贏家！你對經濟趨勢的掌握非常犀利，學習效率滿分！📈",
        "10-urban-planning.html": "都市規劃師！對於空間與資源的邏輯規劃，你已經表現得無懈可擊。🏙️",
        "11-mass-media.html": "媒體識讀高手！在这个資訊時代，你的判斷力無人能敵。🎙️",
        "12-demographics.html": "數據專家！人口結構的奧秘已被你徹底破解，繼續努力！👥",
        "13-health.html": "健康守護者！照顧好大腦與身體，學習效果才會加倍，做得好！🏥",
        "14-arts-culture.html": "藝術品味家！對文化歷史的深度與廣度，是你寫作時最強大的武器！🏛️"
    };

    // 3. 頁尾隨機鼓勵語句庫
    const encouragementFooter = [
        "嘿！你今天的進度條又往前了一小步，這是很棒的累積喔！保持節奏，你很厲害！",
        "單字背不起來沒關係，深呼吸，再唸一次，你會驚訝於大腦的神奇記憶力。",
        "休息一下，喝口水。你的努力，會化作通往目標最堅實的磚塊。",
        "雅思這場冒險，你正在一步步解鎖成就。保持好奇心，繼續加油！",
        "不管今天挑戰了多少個單字，你都已經比早上起床時進步了，這是最真實的成長。",
        "你做得很好！每一個學會的單字，都在為你未來的藍圖添上一抹色彩。",
        "不要急著一次看完，今天的目標達成，明天就會更輕鬆。這就是學習的節奏。",
        "就算只是記住一個單字，這也是一種勝利。你是很棒的學習者！",
        "看看窗外的景色，給大腦一點時間沉澱。你的腦袋需要休息，才能裝下更多精彩的知識。",
        "相信自己的潛力，每一次的點擊和拼寫，都在打造更好的自己。",
        "學習不是衝刺，是一場馬拉松。按照你的步調，你會跑得比誰都遠。",
        "每一個你不認識的單字，都是你即將要征服的領域，加油！",
        "別看著山頂，看看腳下的路，你已經走得比昨天更遠了。",
        "你的專注力非常令人印象深刻。繼續保持，目標就在前方。",
        "給自己一個微笑吧！你正為了未來的夢想而全力以赴，這模樣真的很棒。"
    ];

    window.addEventListener('DOMContentLoaded', () => {
        // 綁定通關彈窗的鼓勵語
        const originalShowUltimate = window.showUltimateCelebration;
        if (originalShowUltimate) {
            window.showUltimateCelebration = function() {
                originalShowUltimate();
                const modal = document.getElementById('completion-modal');
                if (modal) {
                    const pElement = modal.querySelector('p');
                    const existingMemo = document.getElementById('rui-memo-box');
                    if (pElement && !existingMemo && completionNotes[currentFile]) {
                        const memoHTML = `
                            <div id="rui-memo-box" class="mt-4 p-3 bg-[#FFF5E4] border-2 border-black rounded-xl text-left shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <p class="text-xs font-black text-[var(--pop-orange)] mb-1">🎒 給學生的鼓勵：</p>
                                <p class="text-xs font-bold text-gray-700 italic leading-relaxed">${completionNotes[currentFile]}</p>
                            </div>
                        `;
                        pElement.insertAdjacentHTML('afterend', memoHTML);
                    }
                }
            };
        }

        // 綁定頁尾隨機金句
        const footerMemo = `
            <footer class="mt-12 mb-8 text-center px-4 max-w-2xl mx-auto">
                <p class="text-sm font-bold text-gray-400 italic">
                    ${encouragementFooter[Math.floor(Math.random() * encouragementFooter.length)]}
                </p>
            </footer>
        `;
        const mainEl = document.querySelector('main');
        if (mainEl) {
            mainEl.insertAdjacentHTML('beforeend', footerMemo);
        }
    });
})();
