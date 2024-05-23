import { getCurLeng, getStartTime, gettotalKeyPress } from "./checkText.js";

let WPM = 0;
let CPM = 0;
let accuracy = 0;

function calWpm() {
  if (getStartTime() !== null) {
    const spansWithErrorClass = document.querySelectorAll(
      "#quote span.typing__error"
    );
    const errorCount = spansWithErrorClass.length;
    accuracy = Math.round(((getCurLeng() - errorCount) / getCurLeng()) * 100);
    const accurWeight = accuracy / 100;
    // console.log(getCurLeng(), errorCount, accuracy);
    const totalKP = gettotalKeyPress();
    const timeNow = new Date() / 1000;
    const timePerMin = (timeNow - getStartTime()) / 60;
    WPM = Math.round((totalKP / 5 / timePerMin) * accurWeight);
    CPM = Math.round(WPM * 5);
    // console.log(totalKP, timePerMin, WPM);
  } else {
    WPM = 0;
    CPM = 0;
    accuracy = 0;
  }
  document.getElementById("typing__speed").innerText = CPM;
  document.getElementById("current__accuracy").innerText = accuracy;

  requestAnimationFrame(calWpm);
}

requestAnimationFrame(calWpm);

export { WPM, CPM, accuracy, calWpm };
