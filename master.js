(function() {
    const units = [
        { file: "01-environment.html", title: "Unit 1: 環境單元" },
        { file: "02-tech-ai.html", title: "Unit 2: 科技與 AI" },
        { file: "03-society-culture.html", title: "Unit 3: 社會與文化變遷" },
        { file: "04-climate.html", title: "Unit 4: 環境科學與氣候變遷" },
        { file: "05-tech-edu.html", title: "Unit 5: 科技、AI 與數位教育" },
        { file: "06-wildlife.html", title: "Unit 6: 生物與野生動物" },
        { file: "07-psychology.html", title: "Unit 7: 心理學與人類行為" },
        { file: "08-health.html", title: "Unit 8: 健康與生活方式" },
        { file: "09-language.html", title: "Unit 9: 語言學習策略" },
        { file: "10-globalization.html", title: "Unit 10: 全球化議題" },
        { file: "11-art.html", title: "Unit 11: 藝術與創意" },
        { file: "12-history.html", title: "Unit 12: 歷史與發展" },
        { file: "13-economy.html", title: "Unit 13: 經濟思維" },
        { file: "14-future.html", title: "Unit 14: 未來趨勢" }
    ];

    const currentFile = window.location.pathname.split("/").pop();
    
    let options = units.map(u => 
        `<option value="${u.file}" ${u.file === currentFile ? 'selected' : ''}>${u.title}</option>`
    ).join('');

    const navHTML = `
    <nav class="fixed top-0 left-0 right-0 z-40 bg-white border-b-4 border-black p-3 shadow-[0_4px_0_0_rgba(0,0,0,1)] flex items-center justify-between px-4 md:px-8">
        <a href="index.html" class="bg-[var(--pop-yellow)] border-2 border-black rounded-xl px-3 py-1.5 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 transition-all flex items-center gap-2 text-sm md:text-base text-black no-underline">
            <i class="fas fa-home"></i> 回首頁
        </a>
        <div class="flex items-center gap-2">
            <label class="font-black text-xs md:text-sm text-black hidden sm:inline">切換單元：</label>
            <select onchange="location.href=this.value" class="border-2 border-black rounded-xl px-3 py-1.5 bg-white font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs md:text-sm outline-none cursor-pointer">
                ${options}
            </select>
        </div>
    </nav>`;

    document.write(navHTML);
})();
