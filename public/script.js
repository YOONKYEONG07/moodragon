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

// ✅ 페이지 로딩 시 배경을 wallpaper.png로 고정 설정 & 화면 비율 맞추기
window.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const isMainPage = window.location.pathname.includes("index.html") || window.location.pathname === "/" || window.location.pathname === "/index";

  if (isMainPage) {
    body.style.backgroundImage = "url('wallpaper.png')";
    body.style.backgroundSize = "contain";
    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundColor = "transparent";
    body.style.minHeight = "100vh";
  }
});
