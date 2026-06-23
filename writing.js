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
    // 如果 data.json 格式有錯，這裡會直接顯示錯誤原因
    document.getElementById('exercise').innerHTML = `<div style="color: #dc2626; padding: 20px; border: 1px solid #dc2626; border-radius: 8px; background: #f8d7da; line-height: 1.6;">
      <strong>⚠️ 讀取題庫失敗！</strong><br>這通常是因為 <code>data.json</code> 的格式有小錯誤（例如：多了一個逗號、少了一個引號，或是括號沒有成對）。<br><br>
      技術錯誤訊息：${error.message}
    </div>`;
  });

function renderQuiz() {
  if (essayData.length === 0) return;
  hasCompletedCurrent = false; 
  const item = essayData[currentIndex];
  
  const quoteObj = quotes[Math.floor(Math.random() * quotes.length)];
  let headerContent = `
    <div style="margin-bottom: 15px; font-weight: bold; color: #0b57d0;">進度: ${currentIndex + 1} / ${essayData.length}</div>
  `;
  
  let displaySentence = item.sentence;
  item.blanks.forEach(blankObj => {
    const hintData = encodeURIComponent(JSON.stringify(blankObj));
    const inputHTML = `<span class="blank-wrapper" style="position:relative; display:inline-block;">
      <input type="text" class="blank" data-answer="${blankObj.word.toLowerCase()}" data-hints="${hintData}" 
      style="margin: 0 5px; padding: 5px; width: 110px; text-align: center; border: 1px solid #ccc; border-radius: 4px;">
    </span>`;
    displaySentence = displaySentence.replace(blankObj.word, inputHTML);
  });

  // 雙語金句：置於段落最下方，並置中對齊
  let quoteContent = `
    <div style="margin-top: 50px; text-align: center; color: #5f6368; font-family: sans-serif;">
      <div style="font-style: italic; margin-bottom: 6px;">"${quoteObj.en}"</div>
      <div style="font-size: 0.9em; letter-spacing: 1px;">${quoteObj.zh}</div>
    </div>
  `;

  document.getElementById('exercise').innerHTML = headerContent + `<div style="line-height:2.5; font-size: 1.1em;">${displaySentence}</div>` + quoteContent;
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
        const wrapper = input.parentElement;
        const existingBulb = wrapper.querySelector('.bulb-btn');
        if (existingBulb) existingBulb.remove();
        
        // 每次打對一個字，就檢查是否整段都答對了
        checkAllCompleted(); 
      } else if (userAnswer !== "") {
        input.style.backgroundColor = '#f8d7da';
        input.style.borderColor = '#dc2626';
      } else {
        input.style.backgroundColor = 'white';
        input.style.borderColor = '#ccc';
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
    bulb.style.marginLeft = '5px';
    bulb.style.position = 'absolute';
    bulb.style.top = '50%';
    bulb.style.transform = 'translateY(-50%)';

    const popover = document.createElement('div');
    popover.className = 'hint-popover';
    popover.style.cssText = "display:none; position:absolute; bottom:120%; left:50%; transform:translateX(-50%); background:#fff; border:1px solid #ccc; padding:10px; border-radius:8px; z-index:100; width:max-content; box-shadow: 0 4px 6px rgba(0,0,0,0.1); font-size:13px; line-height:1.5;";

    const resText = document.createElement('div');
    resText.innerText = '點選提示級別';
    resText.style.marginBottom = '8px';
    resText.style.color = '#dc2626';

    const btnContainer = document.createElement('div');
    btnContainer.style.display = 'flex';
    btnContainer.style.gap = '5px';

    ['拼字', '定義', '同義詞'].forEach(type => {
        const btn = document.createElement('button');
        btn.innerText = type;
        btn.style.padding = '3px 8px';
        btn.style.cursor = 'pointer';
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
        // 觸發灑花特效
        if (typeof confetti === 'function') {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
        // 播放語音稱讚
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

const oldNav = document.getElementById('quiz-nav');
if (oldNav) oldNav.remove();

const navDiv = document.createElement('div');
navDiv.id = 'quiz-nav';
navDiv.style.marginTop = '30px';
navDiv.style.display = 'flex';
navDiv.style.gap = '10px';
navDiv.style.justifyContent = 'center';
// 加上 color: #333 確保字體是深灰色可見的
navDiv.innerHTML = `
    <button onclick="navigate(-1)" style="padding: 8px 20px; cursor: pointer; border-radius: 4px; border: 1px solid #ccc; background: white; color: #333; font-weight: bold;">上一題</button>
    <button onclick="navigate(1)" style="padding: 8px 20px; cursor: pointer; border-radius: 4px; border: 1px solid #ccc; background: white; color: #333; font-weight: bold;">下一題</button>
`;

setTimeout(() => {
    const container = document.getElementById('exercise').parentElement;
    container.appendChild(navDiv);
}, 100);
