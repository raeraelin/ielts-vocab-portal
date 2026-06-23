const quotes = [
  "The limits of my language mean the limits of my world.",
  "Every expert was once a beginner. Keep writing!",
  "Small daily improvements over time lead to stunning results.",
  "Your writing is your voice—let it be heard clearly.",
  "Mistakes are proof that you are trying. Excellent effort!"
];

let currentIndex = 0;
let essayData = [];

// 讀取資料
fetch('data.json?v=' + new Date().getTime())
  .then(response => response.json())
  .then(data => {
    essayData = data;
    renderQuiz();
  });

function renderQuiz() {
  const item = essayData[currentIndex];
  
  // 顯示進度與隨機金句
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  let htmlContent = `
    <div style="margin-bottom: 20px; font-style: italic; color: var(--on-surface-de-emphasis);">"${quote}"</div>
    <div style="margin-bottom: 15px; font-weight: bold;">進度: ${currentIndex + 1} / ${essayData.length}</div>
  `;
  
  let displaySentence = item.sentence;
  item.blanks.forEach(blankObj => {
    const hintData = encodeURIComponent(JSON.stringify(blankObj));
    const inputHTML = `<span class="blank-wrapper" style="position:relative;">
      <input type="text" class="blank" data-answer="${blankObj.word.toLowerCase()}" data-hints="${hintData}" 
      style="margin: 0 5px; padding: 5px; width: 110px; text-align: center; border: 1px solid #ccc; border-radius: 4px;">
    </span>`;
    displaySentence = displaySentence.replace(blankObj.word, inputHTML);
  });

  document.getElementById('exercise').innerHTML = htmlContent + `<div style="line-height:2.5;">${displaySentence}</div>`;
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
      } else if (userAnswer !== "") {
        input.style.backgroundColor = '#f8d7da';
        input.style.borderColor = '#dc2626';
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

    const popover = document.createElement('div');
    popover.className = 'hint-popover';
    popover.style.cssText = "display:none; position:absolute; bottom:130%; left:50%; transform:translateX(-50%); background:#fff; border:1px solid #ccc; padding:10px; border-radius:8px; z-index:100; width:180px; font-size:12px;";

    const resText = document.createElement('div');
    resText.innerText = '點選提示級別';
    resText.style.marginBottom = '5px';

    ['拼字', '定義', '同義詞'].forEach(type => {
        const btn = document.createElement('button');
        btn.innerText = type;
        btn.onclick = () => {
            if(type === '拼字') resText.innerText = correctAnswer[0] + ' _ '.repeat(correctAnswer.length - 1);
            if(type === '定義') resText.innerText = hints.definition;
            if(type === '同義詞') resText.innerText = hints.synonym;
        };
        popover.appendChild(btn);
    });
    
    popover.appendChild(resText);
    wrapper.appendChild(bulb);
    wrapper.appendChild(popover);

    bulb.onclick = () => {
        popover.style.display = popover.style.display === 'none' ? 'block' : 'none';
    };
}

function navigate(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex >= essayData.length) currentIndex = essayData.length - 1;
  renderQuiz();
}

// 建立導航鈕 (直接加在 body 底部)
const navDiv = document.createElement('div');
navDiv.style.marginTop = '30px';
navDiv.style.display = 'flex';
navDiv.style.gap = '10px';
navDiv.innerHTML = `
    <button onclick="navigate(-1)" style="padding: 5px 15px;">上一題</button>
    <button onclick="navigate(1)" style="padding: 5px 15px;">下一題</button>
`;
document.body.appendChild(navDiv);
```

這次修改後，導航按鈕變得非常清爽，操作起來會更有專業的「練習感」。您更新 `writing.js` 後，再測試一下看看，如果沒問題，我們這套寫作語料循環系統就正式宣告大功告成囉！
