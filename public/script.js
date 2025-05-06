let selectedType = 'T';

function setType(type) {
  selectedType = type;
}

async function submitQuestion() {
  const input = document.getElementById('userInput').value;

  document.getElementById('egg').src = 'egg-hatching.gif'; // 애니메이션

  const res = await fetch('/api/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input, type: selectedType }),
  });

  const data = await res.json();

  const answerDiv = document.getElementById('answer');
  answerDiv.innerText = data.answer;
}
