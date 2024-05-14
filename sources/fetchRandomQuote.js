function fetchRandomQuote() {
    fetch("data/maxim.json")
      .then((response) => response.json())
      .then((data) => {
        let randomQuote;
        // 랜덤하게 선택된 문장의 길이가 50을 넘으면 다시 선택
        do {
          const randomIndex = Math.floor(Math.random() * data.length);
          randomQuote = data[randomIndex];
        } while (randomQuote.message.length > 80);

        document.getElementById("author").innerText = randomQuote.author;

        const cleanedMessage = randomQuote.message.replace(
          /[^가-힣\s,'".]/g,
          ""
        );
        // 문자열을 span 태그로 분해하여 다시 조합
        const messageContainer = document.getElementById("quote");
        messageContainer.innerHTML = ""; // 이전 내용 초기화

        const messageArray = cleanedMessage.split("");
        messageArray.forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.classList.add("typing__none");
          messageContainer.appendChild(span);
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  // 초기에 한 번 실행하고, 길이가 50을 초과하는 경우에만 반복 실행
  fetchRandomQuote();