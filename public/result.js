// public/result.js
window.addEventListener("DOMContentLoaded", async () => {
  const input = localStorage.getItem("userInput");
  const type = localStorage.getItem("userType");

  const advisorImg = document.getElementById("advisorImg");
  const answerBox = document.getElementById("answer");

  if (!input || !type) {
    answerBox.textContent = "데이터가 없습니다. 다시 시도해 주세요!";
    answerBox.classList.remove("hidden");
    return;
  }

  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, type }),
    });

    const data = await res.json();

    advisorImg.src = type === "T" ? "adviceT.png" : "adviceF.png";
    advisorImg.alt = type === "T" ? "논리 공룡" : "감성 공룡";
    advisorImg.classList.remove("hidden");

    answerBox.textContent = data.answer;
    answerBox.classList.remove("hidden");

  } catch {
    answerBox.textContent = "GPT 응답에 문제가 발생했어요 😢";
    answerBox.classList.remove("hidden");
  }
});
