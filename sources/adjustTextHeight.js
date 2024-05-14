    // textarea의 높이를 동적으로 조절하는 함수
    function adjustTextareaHeight() {
        var textarea = document.getElementById("dynamicTextarea");
        textarea.style.height = "auto"; // 기존의 높이를 자동으로 조절하도록 설정합니다.
        textarea.style.height = textarea.scrollHeight + "px"; // 실제로 계산된 높이를 적용합니다.
      }
  
      // textarea의 내용이 변경될 때마다 높이를 조절합니다.
      document
        .getElementById("dynamicTextarea")
        .addEventListener("input", adjustTextareaHeight);