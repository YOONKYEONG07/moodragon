let selectedType = 'T';

// T/F 유형 선택
function setType(type) {
  selectedType = type;
}

// 페이지 로딩 시 시간대에 따라 배경 설정
window.addEventListener('DOMContentLoaded', () => {
  const hour = new Date().getHours();
  const body = document.body;

  if (hour >= 6 && hour <= 19) {
    body.style.backgroundImage = "url('/morning.png')";
  } else {
    body.style.backgroundImage = "url('/night.png')";
  }

  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";
  body.style.backgroundRepeat = "no-repeat";
  body.style.minHeight = "100vh";
});

// GPT에 질문 보내기
async function submitQuestion() {
  const input = document.getElementById('userInput').value;
  const answerDiv = document.getElementById('answer');

  // 공룡알 부화 애니메이션 (선택사항)
  const egg = document.getElementById('egg');
  if (egg) egg.src = 'egg-hatching.gif';

  // GPT 호출
  try {
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input, type: selectedType }),
    });

    const data = await response.json();
    answerDiv.innerText = data.answer;

  } catch (error) {
    console.error("요청 실패:", error);
    answerDiv.innerText = "GPT 응답 중 문제가 발생했어 😢";
  }
}
