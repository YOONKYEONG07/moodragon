let selectedType = null;

function setType(type) {
  selectedType = type;
  document.querySelectorAll('.type-selector').forEach(el => {
    el.classList.remove('selected');
  });
  const selectedImg = document.querySelector(`img[onclick="setType('${type}')"]`);
  if (selectedImg) selectedImg.classList.add('selected');
}

function submitQuestion() {
  const input = document.getElementById("userInput").value.trim();
  if (!selectedType || !input) {
    alert("고민을 입력하고 공룡을 선택해 주세요!");
    return;
  }

  localStorage.setItem("userInput", input);
  localStorage.setItem("userType", selectedType);
  window.location.href = "hatch.html";
}

// ✅ 페이지 로딩 시 시간대에 따라 배경 설정
window.addEventListener('DOMContentLoaded', () => {
  const hour = new Date().getHours();
  const body = document.body;

  if (hour >= 6 && hour <= 18) {
    body.style.backgroundImage = "url('morning.png')";
  } else {
    body.style.backgroundImage = "url('night.png')";
  }

  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";
  body.style.backgroundRepeat = "no-repeat";
  body.style.minHeight = "100vh";
});
