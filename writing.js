const quotes = [
  { en: "The limits of my language mean the limits of my world.", zh: "我語言的局限，就是我世界的局限。" },
  { en: "Every expert was once a beginner. Keep writing!", zh: "每個專家都曾是初學者。繼續寫吧！" },
  { en: "Small daily improvements over time lead to stunning results.", zh: "每天微小的進步，終將帶來驚人的成果。" },
  { en: "Your writing is your voice—let it be heard clearly.", zh: "你的文字就是你的聲音——讓它被清晰地聽見。" },
  { en: "Mistakes are proof that you are trying. Excellent effort!", zh: "錯誤是你正在努力的證明。很棒的嘗試！" }
];

let currentIndex = 0;
let essayData = [];
let hasCompletedCurrent = false;

fetch('data.json?v=' + new Date().getTime())
  .then(response => response.json())
  .then(data => {
    essayData = data;
    renderQuiz();
  })
  .catch(error => {
    document.getElementById('exercise').innerHTML = `<div style="color: #dc2626; padding: 20px; border: 1px solid #dc2626; border-radius: 8px; background: #f8d7da; line-height: 1.6;">
      <strong>⚠️ 讀取題庫失敗！</strong><br>這通常是因為 <code>data.json</code> 的格式有小錯誤。<br>
      技術錯誤訊息：${error.message}
    </div>`;
  });

function renderQuiz() {
  if (essayData.length === 0) return;
  hasCompletedCurrent = false; 
  const item = essayData[currentIndex];
  
  const quoteObj = quotes[Math.floor(Math.random() * quotes.length)];
  
  // 頂部進度條
  let headerContent = `
    <div style="margin-bottom: 20px; font-weight: bold; color: #0b57d0; font-size: 1.1em;">進度: ${currentIndex + 1} / ${essayData.length}</div>
  `;
  
  // 中間句子與挖空
  let displaySentence = item.sentence;
  item.blanks.forEach(blankObj => {
    const hintData = encodeURIComponent(JSON.stringify(blankObj));
    const inputHTML = `<span class="blank-wrapper" style="position:relative; display:inline-block;">
      <input type="text" class="blank" data-answer="${blankObj.word.toLowerCase()}" data-hints="${hintData}" 
      style="margin: 0 5px; padding: 5px; width: 110px; text-align: center; border: 1px solid #ccc; border-radius: 4px; font-size: 1em;">
    </span>`;
    displaySentence = displaySentence.replace(blankObj.word, inputHTML);
  });

  // 底部雙語金句
  let quoteContent = `
    <div style="margin-top: 40px; margin-bottom: 20px; text-align: center; color: #5f6368; font-family: sans-serif; background-color: #f8f9fa; padding: 15px; border-radius: 8px;">
      <div style="font-style: italic; font-weight: bold; margin-bottom: 8px; color: #333;">"${quoteObj.en}"</div>
      <div style="font-size: 0.95em; letter-spacing: 1px;">${quoteObj.zh}</div>
    </div>
  `;

  // 渲染到畫面上
  const exerciseDiv = document.getElementById('exercise');
  exerciseDiv.innerHTML = headerContent + `<div style="line-height:2.5; font-size: 1.15em; color: #202124;">${displaySentence}</div>` + quoteContent;
  
  // 加上導航按鈕 (強制放在 exerciseDiv 的最底下，確保排版正確)
  const navDiv = document.createElement('div');
  navDiv.id = 'quiz-nav';
  navDiv.style.marginTop = '20px';
  navDiv.style.display = 'flex';
  navDiv.style.gap = '15px';
  navDiv.style.justifyContent = 'center';
  navDiv.innerHTML = `
      <button onclick="navigate(-1)" style="padding: 10px 25px; cursor: pointer; border-radius: 6px; border: 1px solid #ccc; background: white; color: #000000 !important; font-weight: bold; font-size: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">上一題</button>
      <button onclick="navigate(1)" style="padding: 10px 25px; cursor: pointer; border-radius: 6px; border: 1px solid #ccc; background: white; color: #000000 !important; font-weight: bold; font-size: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">下一題</button>
  `;
  exerciseDiv.appendChild(navDiv);

  setupImmediateFeedback();
}

function setupImmediateFeedback() {
  document.querySelectorAll('.blank').forEach(input => {
    input.addEventListener('input', (e) => {
      const userAnswer = e.target.value.trim().toLowerCase();
      const correctAnswer = input.dataset.answer.toLowerCase();
      
      if (userAnswer === correctAnswer) {
        input.style.backgroundColor = '#d4edda';
        input.style.borderColor = '#28a745';
        input.style.color = '#155724';
        input.style.fontWeight = 'bold';
        const wrapper = input.parentElement;
        const existingBulb = wrapper.querySelector('.bulb-btn');
        if (existingBulb) existingBulb.remove();
        
        checkAllCompleted(); 
      } else if (userAnswer !== "") {
        input.style.backgroundColor = '#f8d7da';
        input.style.borderColor = '#dc2626';
        input.style.color = '#721c24';
        input.style.fontWeight = 'normal';
      } else {
        input.style.backgroundColor = 'white';
        input.style.borderColor = '#ccc';
        input.style.color = '#000';
      }
    });

    input.addEventListener('focus', () => {
      const wrapper = input.parentElement;
      if (!wrapper.querySelector('.bulb-btn') && input.style.backgroundColor !== 'rgb(212, 237, 218)') {
         createBulb(input);
      }
    });
  });
}

function createBulb(input) {
    const wrapper = input.parentElement;
    const hints = JSON.parse(decodeURIComponent(input.dataset.hints));
    const correctAnswer = input.dataset.answer;

    const bulb = document.createElement('span');
    bulb.className = 'bulb-btn';
    bulb.innerText = '💡';
    bulb.style.cursor = 'pointer';
    bulb.style.marginLeft = '8px';
    bulb.style.position = 'absolute';
    bulb.style.top = '50%';
    bulb.style.transform = 'translateY(-50%)';
    bulb.style.fontSize = '1.2em';

    const popover = document.createElement('div');
    popover.className = 'hint-popover';
    popover.style.cssText = "display:none; position:absolute; bottom:130%; left:50%; transform:translateX(-50%); background:#fff; border:1px solid #ccc; padding:12px; border-radius:8px; z-index:100; width:max-content; box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-size:14px; line-height:1.5;";

    const resText = document.createElement('div');
    resText.innerText = '點選下方按鈕取得提示';
    resText.style.marginBottom = '10px';
    resText.style.color = '#dc2626';
    resText.style.fontWeight = 'bold';

    const btnContainer = document.createElement('div');
    btnContainer.style.display = 'flex';
    btnContainer.style.gap = '8px';

    ['拼字', '定義', '同義詞'].forEach(type => {
        const btn = document.createElement('button');
        btn.innerText = type;
        btn.style.padding = '5px 10px';
        btn.style.cursor = 'pointer';
        btn.style.border = '1px solid #0b57d0';
        btn.style.backgroundColor = '#f8fafd';
        btn.style.color = '#0b57d0';
        btn.style.borderRadius = '4px';
        btn.onclick = () => {
            if(type === '拼字') resText.innerText = correctAnswer[0] + ' _ '.repeat(correctAnswer.length - 1);
            if(type === '定義') resText.innerText = hints.definition;
            if(type === '同義詞') resText.innerText = hints.synonym;
        };
        btnContainer.appendChild(btn);
    });
    
    popover.appendChild(resText);
    popover.appendChild(btnContainer);
    wrapper.appendChild(bulb);
    wrapper.appendChild(popover);

    bulb.onclick = (e) => {
        e.stopPropagation();
        document.querySelectorAll('.hint-popover').forEach(p => {
            if (p !== popover) p.style.display = 'none';
        });
        popover.style.display = popover.style.display === 'none' ? 'block' : 'none';
    };
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.blank-wrapper')) {
        document.querySelectorAll('.hint-popover').forEach(p => p.style.display = 'none');
    }
});

function checkAllCompleted() {
    if (hasCompletedCurrent) return;
    const allInputs = document.querySelectorAll('.blank');
    let isAllCorrect = true;

    allInputs.forEach(input => {
        if (input.value.trim().toLowerCase() !== input.dataset.answer.toLowerCase()) {
            isAllCorrect = false;
        }
    });

    if (isAllCorrect) {
        hasCompletedCurrent = true;
        if (typeof confetti === 'function') {
            confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 } });
        }
        const utterance = new SpeechSynthesisUtterance("Excellent, you nailed it!");
        utterance.lang = 'en-GB'; 
        window.speechSynthesis.speak(utterance);
    }
}

window.navigate = function(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex >= essayData.length) currentIndex = essayData.length - 1;
  renderQuiz();
};
