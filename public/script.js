let selectedType = 'T';

// T/F 유형 선택
function setType(type) {
  selectedType = type;
  // 선택된 이미지에만 강조 효과
  document.querySelectorAll('.type-selector').forEach(el => {
    el.classList.remove('selected');
  });
  const selectedImg = document.querySelector(`img[onclick="setType('${type}')"]`);
  if (selectedImg) selectedImg.classList.add('selected');
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
  const input = document.getElementById("userInput").value.trim();
  if (!selectedType || !input) {
    alert("고민을 입력하고 공룡을 선택해 주세요!");
    return;
  }

  const advisorImg = document.getElementById("advisorImg");
  const answerBox = document.getElementById("answer");

  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, type: selectedType }),
    });

    const data = await response.json();

    // 공룡 조언자 이미지 표시
    advisorImg.src = selectedType === "T" ? "adviceT.png" : "adviceF.png";
    advisorImg.classList.remove("hidden");

    // GPT 응답 표시
    answerBox.textContent = data.answer;
    answerBox.classList.remove("hidden");

  } catch (err) {
    answerBox.textContent = "🐣 공룡이 고민하다가 잠들었어요. 다시 시도해 주세요!";
    answerBox.classList.remove("hidden");
  }
}
