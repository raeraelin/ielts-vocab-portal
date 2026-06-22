fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const item = data[Math.floor(Math.random() * data.length)];
    let displaySentence = item.sentence;
    item.blanks.forEach(word => {
      displaySentence = displaySentence.replace(word, `<input type="text" class="blank" data-answer="${word}" style="margin: 0 5px; padding: 5px; width: 100px; text-align: center;">`);
    });
    document.getElementById('exercise').innerHTML = displaySentence;
  })
  .catch(error => console.error('Error loading the vocab data:', error));

function checkAnswers() {
  document.querySelectorAll('.blank').forEach(input => {
    if(input.value.trim().toLowerCase() === input.dataset.answer.toLowerCase()) {
      input.style.backgroundColor = '#d4edda'; // 答對變淺綠色
    } else {
      input.style.backgroundColor = '#f8d7da'; // 答錯變淺紅色
    }
  });
}
