// 여기에서는 이제 count값을 받은 다음에
// 좌,우 방향키를 통해 count값을 조정하여 문장을 불러온다.
import { fetchQuote } from "./fetchQuote.js";
import { incrementCount, decrementCount, getCount } from "./checkText.js";

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    if (getCount() > 0) {
      decrementCount();
      fetchQuote(getCount());
    }
  }
  if (event.key === "ArrowRight") {
    if (getCount() >= 0) {
      incrementCount();
      fetchQuote(getCount());
    }
  }
});
