document.write(`
<style>
    .nav-bar-wrapper { 
        position: fixed; top: 0; left: 0; right: 0; z-index: 9999; 
        background-color: white; border-bottom: 4px solid #000; 
        padding: 10px 20px; display: flex; align-items: center; 
        justify-content: space-between; box-shadow: 0 4px 0 0 rgba(0,0,0,1);
    }
    .nav-home-btn { 
        background: #FFD93D; border: 2px solid #000; border-radius: 12px; 
        padding: 6px 12px; font-weight: 900; text-decoration: none; 
        color: #000; box-shadow: 2px 2px 0px #000; font-family: sans-serif; font-size: 14px;
    }
    .nav-select { 
        border: 2px solid #000; border-radius: 12px; padding: 6px; 
        font-weight: 900; background: white; cursor: pointer;
        font-family: sans-serif; font-size: 14px;
    }
</style>
<nav class="nav-bar-wrapper">
    <a href="index.html" class="nav-home-btn"><i class="fas fa-home"></i> 回首頁</a>
    <div>
        <label class="font-black mr-2 hidden sm:inline-block">切換單元：</label>
        <select onchange="location.href=this.value" class="nav-select">
            <option value="" disabled selected>-- 選擇單元 --</option>
            <option value="01-environment.html">Unit 1: 環境單元</option>
            <option value="02-tech-ai.html">Unit 2: 科技與 AI</option>
            <option value="03-society-culture.html">Unit 3: 社會與文化變遷</option>
            <option value="04-climate.html">Unit 4: 環境科學與氣候變遷</option>
            <option value="05-tech-edu.html">Unit 5: 科技、AI 與數位教育</option>
            <option value="06-wildlife.html">Unit 6: 生物與野生動物</option>
            <option value="07-psychology.html">Unit 7: 心理學與人類行為</option>
            <option value="08-international-relations.html">Unit 8: 國際關係與地緣政治</option>
            <option value="09-climate.html">Unit 9: 經濟全球化與國際貿易</option>
            <option value="10-urban-planning.html">Unit 10: 城市化與都市規劃</option>
            <option value="11-mass-media.html">Unit 11: 大眾傳播與現代媒體</option>
            <option value="12-demographics.html">Unit 12: 人口結構與社會變遷</option>
            <option value="13-health.html">Unit 13: 健康、醫療與生活型態</option>
            <option value="14-arts-culture.html">Unit 14: 藝術、文化與歷史</option>
        </select>
    </div>
</nav>
`);
