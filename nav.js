document.write(`
<nav class="fixed top-0 left-0 right-0 z-40 bg-white border-b-4 border-black p-3 shadow-[0_4px_0_0_rgba(0,0,0,1)] flex items-center justify-between px-4 md:px-8">
    <a href="index.html" class="bg-[var(--pop-yellow)] border-2 border-black rounded-xl px-3 py-1.5 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 transition-all flex items-center gap-2 text-sm md:text-base">
        <i class="fas fa-home"></i> 回首頁
    </a>
    <div class="flex items-center gap-2">
        <label class="font-black text-xs md:text-sm text-black hidden sm:inline">切換單元：</label>
        <select onchange="location.href=this.value" class="border-2 border-black rounded-xl px-3 py-1.5 bg-white font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs md:text-sm outline-none cursor-pointer">
            <option value="01-environment.html">Unit 1: 環境單元</option>
            <option value="02-tech-ai.html">Unit 2: 科技與 AI</option>
            <option value="03-society-culture.html">Unit 3: 社會與文化變遷</option>
            <option value="04-climate.html">Unit 4: 環境科學與氣候變遷</option>
            <option value="05-tech-edu.html">Unit 5: 科技、AI 與數位教育</option>
            <option value="06-wildlife.html">Unit 6: 生物與野生動物</option>
            <option value="07-psychology.html">Unit 7: 心理學與人類行為</option>
        </select>
    </div>
</nav>
`);
