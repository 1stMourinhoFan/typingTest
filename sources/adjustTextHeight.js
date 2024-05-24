// textarea의 높이를 동적으로 조절하는 함수
function adjustTextareaHeight() {
  let textarea = document.getElementById("dynamicTextarea");
  textarea.style.height = "auto"; // 기존의 높이를 자동으로 조절하도록 설정합니다.
  textarea.style.height = textarea.scrollHeight + "px"; // 실제로 계산된 높이를 적용합니다.
}

export { adjustTextareaHeight };
