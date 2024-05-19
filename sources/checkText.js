let previousLength = 0;
// Helper function to update classes
function updateClass(element, removeClasses, addClass) {
  element.classList.remove(...removeClasses);
  element.classList.add(addClass);
}
document
  .getElementById("dynamicTextarea")
  .addEventListener("input", function () {
    const spans = document.getElementById("quote").querySelectorAll(`span`);
    const textLength = spans.length;
    const textareaValue = this.value; // textarea의 값을 가져옴
    const currentLength = textareaValue.length;

    // 항상 currentLegnth 보다 뒤에 있는 span 태그는 typing__none 클래스여야 한다
    spans.forEach((span, index) => {
      if (index >= currentLength) {
        if (!span.classList.contains("typing__none")) {
          updateClass(
            span,
            ["typing__correct", "typing__error"],
            "typing__none"
          );
        }
      }
    });

    const done =
      currentLength - 1 === textLength && previousLength === textLength;
    // 첫 if 문은 입력을 모두 완료했는지 확인하는 구문입니다
    if (done) {
      checkValid(textareaValue, previousLength, currentLength);
      this.value = textareaValue.trim();
      this.value = "";
      previousLength = 0;
      fetchRandomQuote();
      adjustTextareaHeight();
    }
    // 입력이 완료되지 않았을 경우에는 else문을 통해서 맞고 틀림 여부를 확인합니다
    else {
      // 처음 입력을 시작할 때의 설정값 변경
      if (previousLength < currentLength && currentLength === 1) {
        previousLength = currentLength;
      }
      // 사용자의 입력값에 대한 변화가 있을 때 입력한 값이 맞는지 틀린지 판별한다
      if (currentLength !== previousLength) {
        // 입력값이 현재 주어진 텍스트보다 길면 확인하지 않는다.
        if (currentLength <= textLength + 1) {
          checkValid(textareaValue, previousLength, currentLength);
        }
        // 체킹이 끝나면 previousLength를 업데이트해준다.
        previousLength = currentLength;
        // console.log(
        //   `checkValid done ${previousLength}, ${currentLength}, ${textLength}`
        // );
      }
    }
  });

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
        currentLength === textLength && previousLength === textLength;

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

function checkValid(textareaValue, previousLength, currentLength) {
  const checkTag = document
    .getElementById("quote")
    .querySelector(`span:nth-child(${previousLength})`);
  const checkText = checkTag.textContent;
  // console.log(checkTag, checkText);
  const curE = textareaValue[previousLength - 1];
  // const prevE = textareaValue[currentLength - 1];

  // 지우는 걸로 다 지웠을때
  if (currentLength === 0) {
    // console.log(previousLength, currentLength, "");
    updateClass(checkTag, ["typing__correct", "typing__error"], "typing__none");
  }
  // 입력 중일 때 확인
  else if (previousLength <= currentLength) {
    // console.log(previousLength, currentLength, checkText, curE);
    checkTag.classList.remove("typing__none");
    if (checkText === curE) {
      updateClass(
        checkTag,
        ["typing__none", "typing__error"],
        "typing__correct"
      );
    } else {
      updateClass(
        checkTag,
        ["typing__none", "typing__correct"],
        "typing__error"
      );
    }
  }
  // 지웠을 때 확인
  else if (previousLength > currentLength) {
    // console.log(previousLength, currentLength, checkText, prevE);
    updateClass(checkTag, ["typing__correct", "typing__error"], "typing__none");
  }
  // 그외 초성,중성,종성 작성 중일 때
  else {
    // console.log(previousLength, currentLength);
  }
}
