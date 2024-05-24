import { fetchQuote } from "./fetchQuote.js";
import { countUpdate } from "./countCheck.js";
import { disassembleHangul } from "es-hangul";
import { WPM, calWpm } from "./wpm.js";
// import { calAccur } from "./calAccuracy.js";
import { fetchResult } from "./fetchResult.js";
import { dataLength } from "./getQuotes.js";
import { adjustTextareaHeight } from "./adjustTextHeight.js";

let totalKeyPress = 0;
let previousLength = 0;
let currentLength = 0;
let count = 0;
let user_count = 0;
let startTime = null;
let errorCount = 0;

let isInputEventProcessing = false;

// Helper function to update classes
function updateClass(element, removeClasses, addClass) {
  element.classList.remove(...removeClasses);
  element.classList.add(addClass);
}

const textarea = document.getElementById("dynamicTextarea");

textarea.addEventListener("input", function (e) {
  if (isInputEventProcessing) {
    return;
  }
  isInputEventProcessing = true;
  // console.log(e.isComposing);
  // console.log(e);
  adjustTextareaHeight();
  const spans = document.getElementById("quote").querySelectorAll(`span`);
  const textLength = spans.length;
  const textareaValue = this.value; // textarea의 값을 가져옴
  currentLength = textareaValue.length;
  // console.log(previousLength, currentLength, textLength);
  totalKeyPress = disassembleHangul(textareaValue).length;
  // console.log(disassembleHangul(textareaValue).length);

  // 항상 currentLegnth 보다 뒤에 있는 span 태그는 typing__none 클래스여야 한다
  spans.forEach((span, index) => {
    if (index >= currentLength) {
      if (!span.classList.contains("typing__none")) {
        updateClass(span, ["typing__correct", "typing__error"], "typing__none");
      }
    }
  });

  if (previousLength > textLength) {
    previousLength = 0;
  }
  // 처음 입력을 시작할 때의 설정값 변경
  if (previousLength < currentLength && currentLength === 1) {
    if (!startTime) {
      startTime = new Date() / 1000;
    }
    previousLength = currentLength;
  }

  if (currentLength >= textLength + 1) {
    this.value = this.value.substring(0, textLength);
    currentLength = textLength; // Update the current length to reflect the trimmed value
  }

  if (currentLength !== previousLength) {
    // 입력값이 현재 주어진 텍스트보다 길면 확인하지 않는다.
    if (currentLength <= textLength) {
      // console.log("check in!");
      checkValid(textareaValue, previousLength, currentLength);
    }
    // 체킹이 끝나면 previousLength를 업데이트해준다.
    previousLength = currentLength;
  }

  isInputEventProcessing = false;
});

textarea.addEventListener("keydown", function (event) {
  if (isInputEventProcessing) {
    return;
  }

  // console.log(event);
  const spans = document.getElementById("quote").querySelectorAll("span");
  const textLength = spans.length;
  const textareaValue = this.value;
  currentLength = textareaValue.length;
  const done = currentLength === textLength && previousLength === textLength;
  if (event.key === "Enter" || (event.code === "Space" && done)) {
    event.preventDefault(); // 기본 동작 방식

    if (done) {
      checkValid(textareaValue, previousLength, currentLength);
      incrementUserCount();
      calWpm();
      // calAccur(textLength);
      fetchResult();
      this.value = textareaValue.trim();
      this.value = "";
      previousLength = 0;
      // console.log(getCount());
      incrementCount();
      fetchQuote(getCount());
      adjustTextareaHeight();
      countUpdate(user_count);
      if (startTime) {
        startTime = null;
      }
    }
  } else if (event.code === "Space" && done) {
    event.preventDefault();
    checkValid(textareaValue, previousLength, currentLength);
    incrementUserCount();
    calWpm();
    // calAccur(textLength);
    fetchResult();
    this.value = textareaValue.trim();
    this.value = "";
    previousLength = 0;
    incrementCount();
    // console.log(getCount());
    fetchQuote(getCount());
    adjustTextareaHeight();
    countUpdate(user_count);
    if (startTime) {
      startTime = null;
    }
  }

  if (event.key === "ArrowLeft") {
    startTime = null;
    if (getCount() > 0) {
      event.preventDefault();
      this.value = textareaValue.trim();
      this.value = "";
      previousLength = 0;
      decrementCount();
      // console.log(getCount());
      fetchQuote(getCount());
      adjustTextareaHeight();
    }
  }
  if (event.key === "ArrowRight") {
    startTime = null;
    if (getCount() < dataLength) {
      event.preventDefault();
      this.value = textareaValue.trim();
      this.value = "";
      previousLength = 0;
      incrementCount();
      // console.log(getCount());
      fetchQuote(getCount());
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

  // 지우는 걸로 다 지웠을때
  if (currentLength === 0) {
    // console.log(previousLength, currentLength, "");
    startTime = null;
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
      errorCount++;
      updateClass(
        checkTag,
        ["typing__none", "typing__correct"],
        "typing__error"
      );
    }
  } // 지웠을 때 확인
  else if (previousLength > currentLength) {
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

function getStartTime() {
  return startTime;
}

function getCurLeng() {
  return currentLength;
}

function setStartTime(val) {
  return (startTime = val);
}

function setPrevLeng(val) {
  return (previousLength = val);
}

export {
  count,
  incrementCount,
  decrementCount,
  getCount,
  incrementUserCount,
  getUserCount,
  gettotalKeyPress,
  getStartTime,
  getCurLeng,
  setStartTime,
  setPrevLeng,
};
