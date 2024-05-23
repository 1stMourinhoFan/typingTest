import { getCount } from "./checkText.js";
import { fetchQuote } from "./fetchQuote.js";
import { countUpdate } from "./countCheck.js";

let shuffledData = [];
let dataLength = 0;

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to fetch JSON data, shuffle it, and display it
async function fetchAndDisplayQuotes() {
  try {
    const response = await fetch("data/maxim_filtered.json");
    const data = await response.json();

    // Shuffle the array
    const shuffledData = shuffleArray(data);
    dataLength = shuffledData.length;
    return shuffledData;
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}

// Call the function immediately to fetch data when the module is loaded
document.addEventListener("DOMContentLoaded", async () => {
  shuffledData = await fetchAndDisplayQuotes();
  await fetchQuote(getCount());
  await countUpdate(getCount());
});

// Export the function
export { shuffledData, dataLength };
