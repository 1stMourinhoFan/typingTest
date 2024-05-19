// 사용자가 Enter 키를 눌렀을 때 줄바꿈을 방지
document
  .getElementById("dynamicTextarea")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // 기본 동작 방식

      const spans = document.getElementById("quote").querySelectorAll("span");
      const textLength = spans.length;
      const textareaValue = this.value;
      const currentLength = textareaValue.length;

      const done =
        currentLength - 1 === textLength && previousLength === textLength;

      if (done) {
        checkValid(textareaValue, previousLength, currentLength);
        this.value = textareaValue.trim();
        this.value = "";
        previousLength = 0;
        fetchRandomQuote();
        adjustTextareaHeight();
      }
    }
  });
