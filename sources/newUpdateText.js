import { fetchQuote } from "./fetchQuote.js";
import { countUpdate } from "./countCheck.js";

let totalKeyPress = 0;
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
  .addEventListener("keydown", function (e) {
    // console.log(e);
    adjustTextareaHeight();
    const textLength = document
      .getElementById("quote")
      .querySelectorAll(`span`).length;
    const textareaValue = this.value; // textarea의 값을 가져옴
    const currentLength = textareaValue.length;
    console.log(currentLength);

    if (previousLength > textLength) {
      previousLength = 0;
    }

    // 처음 입력을 시작할 때의 설정값 변경
    if (previousLength < currentLength && currentLength === 0) {
      currentLength = 1;
      previousLength = currentLength;
    }
  });

document
  .getElementById("dynamicTextarea")
  .addEventListener("keyup", function (event) {
    const spans = document.getElementById("quote").querySelectorAll("span");
    const textLength = spans.length;
    const textareaValue = this.value;
    const currentLength = textareaValue.length;
    const done = currentLength === textLength && previousLength === textLength;

    if (event.key === "Enter" && done) {
      event.preventDefault(); // 기본 동작 방지
      checkValid(textareaValue, previousLength, currentLength);
      handleTextValidation(textareaValue, previousLength, currentLength);
    } else if (event.code === "Space" && done) {
      event.preventDefault();
      checkValid(textareaValue, previousLength, currentLength);
      handleTextValidation(textareaValue, previousLength, currentLength);
    } else if (event.key === "ArrowLeft" && getCount() > 0) {
      event.preventDefault();
      handleTextValidation(textareaValue, previousLength, currentLength);
    } else if (event.key === "ArrowRight" && getCount() >= 0) {
      event.preventDefault();
      handleTextValidation(textareaValue, previousLength, currentLength);
    } else if (currentLength !== previousLength) {
      // 입력값이 현재 주어진 텍스트보다 길면 확인하지 않는다.
      if (currentLength <= textLength) {
        checkValid(textareaValue, previousLength, currentLength);
      }
      // 체킹이 끝나면 previousLength를 업데이트해준다.
      previousLength = currentLength;
    }
  });

function handleTextValidation(textareaValue, previousLength, currentLength) {
  document.getElementById("dynamicTextarea").value = textareaValue.trim();
  document.getElementById("dynamicTextarea").value = "";
  previousLength = 0;
  incrementCount();
  fetchQuote(getCount());
  adjustTextareaHeight();
  incrementUserCount();
  countUpdate(user_count);
}

// function handleNavigation(direction) {
//   document.getElementById("dynamicTextarea").value = "";
//   previousLength = 0;
//   if (direction === "left") {
//     decrementCount();
//   } else if (direction === "right") {
//     incrementCount();
//   }
//   fetchQuote(getCount());
//   adjustTextareaHeight();
// }

function checkValid(textareaValue, previousLength, currentLength) {
  const checkTag = document
    .getElementById("quote")
    .querySelector(`span:nth-child(${previousLength})`);
  const checkText = checkTag.textContent;
  const curE = textareaValue[previousLength - 1];

  if (currentLength === 0) {
    updateClass(checkTag, ["typing__correct", "typing__error"], "typing__none");
  } else if (previousLength <= currentLength) {
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
  } else if (previousLength > currentLength) {
    updateClass(checkTag, ["typing__correct", "typing__error"], "typing__none");
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

function gettotalKeyPress() {
  return totalKeyPress;
}

function incrementtotalKeyPress() {
  totalKeyPress++;
}

export {
  count,
  incrementCount,
  decrementCount,
  getCount,
  incrementUserCount,
  getUserCount,
  gettotalKeyPress,
  incrementtotalKeyPress,
};
