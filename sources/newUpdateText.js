let previousLength = 0;

// Helper function to update classes
function updateClass(element, removeClasses, addClass) {
  element.classList.remove(...removeClasses);
  element.classList.add(addClass);
}

// Function to check the validity of the input
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

// Function to handle input event
function handleInput(event) {
  const spans = document.getElementById("quote").querySelectorAll("span");
  const textLength = spans.length;
  const textareaValue = event.target.value;
  const currentLength = textareaValue.length;

  spans.forEach((span, index) => {
    if (index >= currentLength) {
      if (!span.classList.contains("typing__none")) {
        updateClass(span, ["typing__correct", "typing__error"], "typing__none");
      }
    }
  });

  const done = currentLength === textLength && previousLength === textLength;

  if (done) {
    checkValid(textareaValue, previousLength, currentLength);
    event.target.value = textareaValue.trim();
    event.target.value = "";
    previousLength = 0;
    fetchRandomQuote();
    adjustTextareaHeight();
  } else {
    if (previousLength < currentLength && currentLength === 1) {
      previousLength = currentLength;
    }
    if (currentLength !== previousLength) {
      if (currentLength <= textLength + 1) {
        checkValid(textareaValue, previousLength, currentLength);
      }
      previousLength = currentLength;
    }
  }
}

// Function to handle keydown event
function handleKeydown(event) {
  if (event.key === "Enter") {
    event.preventDefault();

    const spans = document.getElementById("quote").querySelectorAll("span");
    const textLength = spans.length;
    const textareaValue = event.target.value;
    const currentLength = textareaValue.length;
    const done = currentLength === textLength && previousLength === textLength;

    if (done) {
      checkValid(textareaValue, previousLength, currentLength);
      event.target.value = textareaValue.trim();
      event.target.value = "";
      previousLength = 0;
      fetchRandomQuote();
      adjustTextareaHeight();
    }
  }
}

const dynamicTextarea = document.getElementById("dynamicTextarea");
dynamicTextarea.addEventListener("input", handleInput);
dynamicTextarea.addEventListener("keydown", handleKeydown);
