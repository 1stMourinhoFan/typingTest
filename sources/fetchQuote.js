import { dataLength, shuffledData } from "./getQuotes.js";

async function fetchQuote(count) {
  try {
    if (count >= dataLength) {
      alert("모든 문장이 완료되었습니다 새로고침을 통해 재시작해주세요!");
    } else {
      // const shuffledData = await fetchAndDisplayQuotes();
      document.getElementById("author").innerText = shuffledData[count].author;
      // document.getElementsByClassName("typing__next").innerText =
      //   shuffledData[count].message;
      const messageContainer = document.getElementById("quote");
      messageContainer.innerHTML = ""; // 이전 내용 초기화

      const messageArray = shuffledData[count].message.split("");
      messageArray.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.classList.add("typing__none");
        messageContainer.appendChild(span);
      });
    }

    if (count >= dataLength - 1) {
      document.getElementById("typing__next").innerText = `NEXT `;
    } else {
      document.getElementById("typing__next").innerText = `NEXT ${
        shuffledData[count + 1].message
      }`;
    }
  } catch (error) {
    console.error(error);
  }
}

export { fetchQuote };
