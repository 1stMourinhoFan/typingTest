function getSpanClasses() {
    const spans = document.getElementById("quote").querySelectorAll("span"); // 모든 span 요소 가져오기
    const classesArray = Array.from(spans).map((span) => span.innerText); // 각 span의 클래스를 배열로 변환하여 저장
    return classesArray;
}

let previousLength = 0;
let text = getSpanClasses();
console.log(text);

document
.getElementById("dynamicTextarea")
  .addEventListener("input", function () {
    const textareaValue = this.value; // textarea의 값을 가져옴
    console.log(textareaValue);
    const currentLength = textareaValue.length
    if(currentLength == 1) {previousLength=currentLength}
    console.log(previousLength, currentLength);
    if (currentLength !== previousLength) {
    checkValid(text,textareaValue,currentLength,previousLength);
    previousLength = currentLength;
  }
  });

function checkValid(text,textareaValue,previousLength, currentLength) {
    console.log(text, textareaValue, previousLength, currentLength);
}
