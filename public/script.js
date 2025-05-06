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
