// 여기에서는 이제 count값을 받은 다음에
// 좌,우 방향키를 통해 count값을 조정하여 문장을 불러온다.
import { fetchQuote } from "./fetchQuote.js";
import {
  incrementCount,
  decrementCount,
  getCount,
  setStartTime,
  setPrevLeng,
} from "./checkText.js";

function countUpdate(count) {
  document.getElementById("current__count").innerText = count;
}

export { countUpdate };
