import { fetchQuote } from "./fetchQuote.js";
import { countUpdate } from "./countCheck.js";

let previousLength = 0;
let count = 0;
let user_count = 0;
// Helper function to update classes
function updateClass(element, removeClasses, addClass) {
  element.classList.remove(...removeClasses);
  element.classList.add(addClass);
}

document
  .getElementById("dynamicTextarea")
  .addEventListener("input", function (e) {
    console.log(e.isComposing);
    adjustTextareaHeight();
    const spans = document.getElementById("quote").querySelectorAll(`span`);
    const textLength = spans.length;
    const textareaValue = this.value; // textarea의 값을 가져옴
    const currentLength = textareaValue.length;
    console.log(previousLength, currentLength, textLength);

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

    if (previousLength > textLength) {
      previousLength = 0;
    }
    // 처음 입력을 시작할 때의 설정값 변경
    if (previousLength < currentLength && currentLength === 1) {
      previousLength = currentLength;
    }
    if (currentLength === textLength + 1) {
      checkValid(textareaValue, previousLength, currentLength);
      this.value = textareaValue.trim();
      this.value = "";
      previousLength = 0;
      incrementCount();
      fetchQuote(getCount());
      adjustTextareaHeight();
      incrementUserCount();
      countUpdate(user_count);
    } else if (currentLength !== previousLength) {
      // 입력값이 현재 주어진 텍스트보다 길면 확인하지 않는다.
      if (currentLength <= textLength) {
        console.log("check in!");
        checkValid(textareaValue, previousLength, currentLength);
      }
      // 체킹이 끝나면 previousLength를 업데이트해준다.
      previousLength = currentLength;
    }
  });

document
  .getElementById("dynamicTextarea")
  .addEventListener("keydown", function (event) {
    // console.log(event);
    const spans = document.getElementById("quote").querySelectorAll("span");
    const textLength = spans.length;
    const textareaValue = this.value;
    const currentLength = textareaValue.length;
    const done = currentLength === textLength && previousLength === textLength;
    if (event.key === "Enter") {
      event.preventDefault(); // 기본 동작 방식

      if (done) {
        checkValid(textareaValue, previousLength, currentLength);
        this.value = textareaValue.trim();
        this.value = "";
        previousLength = 0;
        incrementCount();
        fetchQuote(getCount());
        adjustTextareaHeight();
        incrementUserCount();
        countUpdate(user_count);
      }
    } else if (event.code === "Space" && done) {
      event.preventDefault();
      checkValid(textareaValue, previousLength, currentLength);
      this.value = textareaValue.trim();
      this.value = "";
      previousLength = 0;
      incrementCount();
      fetchQuote(getCount());
      adjustTextareaHeight();
      incrementUserCount();
      countUpdate(user_count);
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
    updateClass(checkTag, ["typing__correct", "typing__error"], "typing__none");
  }
  // 그외 초성,중성,종성 작성 중일 때
  else {
    // console.log(previousLength, currentLength);
  }
}

function incrementCount() {
  count++;
}

function decrementCount() {
  if (count > 0) {
    count--;
  }
}

function getCount() {
  return count;
}

function incrementUserCount() {
  user_count++;
}

function getUserCount() {
  return user_count;
}
export {
  count,
  incrementCount,
  decrementCount,
  getCount,
  incrementUserCount,
  getUserCount,
};
