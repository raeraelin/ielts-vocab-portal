// 加上時間戳記魔法，強迫瀏覽器每次都抓最新題庫
fetch('data.json?v=' + new Date().getTime())
  .then(response => response.json())
  .then(data => {
    const item = data[Math.floor(Math.random() * data.length)];
    let displaySentence = item.sentence;
    
    item.blanks.forEach(blankObj => {
      const word = blankObj.word;
      // 將提示資料藏在 HTML 屬性中
      const hintData = encodeURIComponent(JSON.stringify(blankObj));
      // 執行挖空替換
      displaySentence = displaySentence.replace(word, `<input type="text" class="blank" data-answer="${word}" data-hints="${hintData}" style="margin: 0 5px; padding: 5px; width: 110px; text-align: center;">`);
    });
    
    document.getElementById('exercise').innerHTML = displaySentence;
  })
  .catch(error => console.error('Error loading the data:', error));

function checkAnswers() {
  let allCorrect = true;

  document.querySelectorAll('.blank').forEach(input => {
    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = input.dataset.answer.toLowerCase();
    const hints = JSON.parse(decodeURIComponent(input.dataset.hints));

    // 清除舊的提示區塊
    if (input.nextElementSibling && input.nextElementSibling.classList.contains('hint-area')) {
        input.nextElementSibling.remove();
    }

    if (userAnswer === correctAnswer) {
      input.style.backgroundColor = '#d4edda'; // 答對變綠色
    } else {
      allCorrect = false;
      input.style.backgroundColor = '#f8d7da'; // 答錯變紅色
      
      // 建立提示按鈕區塊
      const hintArea = document.createElement('div');
      hintArea.className = 'hint-area';
      hintArea.style.display = 'inline-block';
      hintArea.style.marginLeft = '8px';

      const hintText = document.createElement('span');
      hintText.style.color = '#dc2626';
      hintText.style.fontSize = '0.9em';
      hintText.style.marginLeft = '8px';

      // 按鈕 1：拼字提示
      const btnSpell = document.createElement('button');
      btnSpell.innerText = '拼字';
      btnSpell.style.padding = '2px 6px';
      btnSpell.style.marginRight = '4px';
      btnSpell.style.fontSize = '0.8em';
      btnSpell.onclick = () => {
          const masked = correctAnswer[0] + ' _ '.repeat(correctAnswer.length - 1);
          hintText.innerText = `提示: ${masked}`;
      };

      // 按鈕 2：定義提示
      const btnDef = document.createElement('button');
      btnDef.innerText = '定義';
      btnDef.style.padding = '2px 6px';
      btnDef.style.marginRight = '4px';
      btnDef.style.fontSize = '0.8em';
      btnDef.onclick = () => { hintText.innerText = `定義: ${hints.definition}`; };

      // 按鈕 3：同義詞提示
      const btnSyn = document.createElement('button');
      btnSyn.innerText = '同義詞';
      btnSyn.style.padding = '2px 6px';
      btnSyn.style.fontSize = '0.8em';
      btnSyn.onclick = () => { hintText.innerText = `同義詞: ${hints.synonym}`; };

      hintArea.appendChild(btnSpell);
      hintArea.appendChild(btnDef);
      hintArea.appendChild(btnSyn);
      hintArea.appendChild(hintText);
      
      input.parentNode.insertBefore(hintArea, input.nextSibling);
    }
  });

  // 如果全部答對，觸發灑花與英國腔語音
  if (allCorrect) {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    
    const utterance = new SpeechSynthesisUtterance("Excellent, you nailed it!");
    utterance.lang = 'en-GB'; 
    window.speechSynthesis.speak(utterance);
  }
}
