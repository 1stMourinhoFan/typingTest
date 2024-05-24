// import { accuracy } from "./calAccuracy";
import { getUserCount } from "./checkText";
import { CPM, WPM, accuracy } from "./wpm";
let maxCPM = 0;
let totalCPM = 0;

function fetchResult() {
  //   console.log(WPM);
  const historyContainer = document.querySelector(".typing__history");

  // Create the new div element with the specified content
  const newItem = document.createElement("div");
  newItem.className = "typing__hisInfo";
  newItem.textContent = `${
    historyContainer.children.length + 1
  } WPM: ${WPM} | CPM: ${CPM} | ACC: ${accuracy}`;

  // Check if the number of child elements exceeds 4
  if (historyContainer.children.length > 3) {
    // Remove the first child element
    historyContainer.removeChild(historyContainer.firstChild);
  }

  // Append the new item to the container
  historyContainer.appendChild(newItem);

  // Update maxCPM and avgCPM
  if (CPM > maxCPM) {
    maxCPM = CPM;
  }

  totalCPM += CPM;
  const avgCPM = Math.round(totalCPM / getUserCount());

  document.getElementById("typing__result").innerText = `${maxCPM}/${avgCPM}`;
}

export { fetchResult };
