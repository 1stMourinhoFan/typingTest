// 사용자가 Enter 키를 눌렀을 때 줄바꿈을 방지
document
  .getElementById("dynamicTextarea")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // 기본 동작 방지
    }
  });
