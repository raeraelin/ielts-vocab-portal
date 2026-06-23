// 1. 動態載入 CSS 樣式，用來美化懸浮提示框 (Tooltip)，不破壞排版
const style = document.createElement('style');
style.innerHTML = `
  .blank-wrapper { position: relative; display: inline-block; }
  .bulb-btn { cursor: pointer; margin-left: 6px; font-size: 1.2em; transition: transform 0.2s; vertical-align: middle; }
  .bulb-btn:hover { transform: scale(1.2); }
  .hint-popover {
    display: none; position: absolute; bottom: 130%; left: 50%; transform: translateX(-50%);
    background: #ffffff; border: 1px solid #d1d5db; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    border-radius: 8px; padding: 10px; width: 220px; z-index: 100;
  }
  .hint-popover::after {
    content: ''; position: absolute; top: 100%; left: 50%; margin-left: -6px;
    border-width: 6px; border-style: solid; border-color: #ffffff transparent transparent transparent;
  }
  .hint-popover button {
    background: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 4px; padding: 4px 8px;
    font-size: 0.85em; margin: 2px; cursor: pointer; color: #374151; transition: background 0.2s;
  }
  .hint-popover button:hover { background: #e5e7eb; }
  .hint-result { margin-top: 8px; font-size: 0.9em; color: #dc2626; text-align: center; font-weight: 500; line-height: 1.3;}
`;
document.head.appendChild(style);

// 2. 加上時間戳記魔法，強迫瀏覽器每次都抓最新題庫
fetch('data.json?v=' + new Date().getTime())
  .then(response => response.json())
  .then(data => {
    // 隨機挑選一題 (一段作文)
    const item = data[Math.floor(Math.random() * data.length)];
    let displaySentence = item.sentence;
    
    // 將每個重點單字挖空，並包裝在相對定位的 wrapper 裡
    item.blanks.forEach(blankObj => {
      const word = blankObj.word;
      const hintData = encodeURIComponent(JSON.stringify(blankObj));
      // 改良：加入 .blank-wrapper 確保燈泡跟框框黏在一起
      const inputHTML = `<span class="blank-wrapper"><input type="text" class="blank" data-answer="${word}" data-hints="${hintData}" style="margin: 0 5px; padding: 5px; width: 110px; text-align: center; border: 1px solid #ccc; border-radius: 4px;"></span>`;
      displaySentence = displaySentence.replace(word, inputHTML);
    });
    
    document.getElementById('exercise').innerHTML = displaySentence;
  })
  .catch(error => console.error('Error loading the data:', error));

// 3. 檢查答案與燈泡互動邏輯
function checkAnswers() {
  let allCorrect = true;

  document.querySelectorAll('.blank').forEach(input => {
    const wrapper = input.parentElement;
    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = input.dataset.answer.toLowerCase();
    const hints = JSON.parse(decodeURIComponent(input.dataset.hints));

    // 每次檢查前，先清掉舊的燈泡，保持畫面乾淨
    const oldBulb = wrapper.querySelector('.bulb-btn');
    const oldPopover = wrapper.querySelector('.hint-popover');
    if (oldBulb) oldBulb.remove();
    if (oldPopover) oldPopover.remove();

    if (userAnswer === correctAnswer) {
      input.style.backgroundColor = '#d4edda'; // 答對變綠
      input.style.borderColor = '#28a745';
    } else {
      allCorrect = false;
      input.style.backgroundColor = '#f8d7da'; // 答錯變紅
      input.style.borderColor = '#dc2626';
      
      // 建立燈泡圖示
      const bulb = document.createElement('span');
      bulb.className = 'bulb-btn';
      bulb.innerText = '💡';

      // 建立懸浮提示框 (Popover)
      const popover = document.createElement('div');
      popover.className = 'hint-popover';

      const btnContainer = document.createElement('div');
      btnContainer.style.textAlign = 'center';

      const resText = document.createElement('div');
      resText.className = 'hint-result';
      resText.innerText = '請選擇需要的提示級別';

      // 按鈕功能設計
      const btnSpell = document.createElement('button');
      btnSpell.innerText = '拼字';
      btnSpell.onclick = () => { resText.innerText = correctAnswer[0] + ' _ '.repeat(correctAnswer.length - 1); };

      const btnDef = document.createElement('button');
      btnDef.innerText = '定義';
      btnDef.onclick = () => { resText.innerText = hints.definition; };

      const btnSyn = document.createElement('button');
      btnSyn.innerText = '同義詞';
      btnSyn.onclick = () => { resText.innerText = hints.synonym; };

      btnContainer.append(btnSpell, btnDef, btnSyn);
      popover.append(btnContainer, resText);

      // 點擊燈泡，切換顯示/隱藏提示框
      bulb.onclick = () => {
        popover.style.display = popover.style.display === 'none' || popover.style.display === '' ? 'block' : 'none';
      };

      wrapper.appendChild(bulb);
      wrapper.appendChild(popover);
    }
  });

  // 如果全部答對，觸發灑花與英國腔語音
  if (allCorrect) {
    if (typeof confetti !== 'undefined') {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
    const utterance = new SpeechSynthesisUtterance("Excellent, you nailed it!");
    utterance.lang = 'en-GB'; 
    window.speechSynthesis.speak(utterance);
  }
}
