import { shuffledData } from "./getQuotes.js";

async function fetchQuote(count) {
  try {
    // const shuffledData = await fetchAndDisplayQuotes();
    document.getElementById("author").innerText = shuffledData[count].author;
    const messageContainer = document.getElementById("quote");
    messageContainer.innerHTML = ""; // 이전 내용 초기화

    const messageArray = shuffledData[count].message.split("");
    messageArray.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.classList.add("typing__none");
      messageContainer.appendChild(span);
    });
  } catch (error) {
    console.error(error);
  }
}

export { fetchQuote };
