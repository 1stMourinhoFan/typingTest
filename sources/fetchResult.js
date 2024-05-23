// import { accuracy } from "./calAccuracy";
import { CPM, WPM, accuracy } from "./wpm";

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
}

export { fetchResult };
