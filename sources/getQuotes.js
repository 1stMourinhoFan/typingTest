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
// async function fetchAndDisplayQuotes() {
//   try {
//     const response = await fetch("data/maxim_filtered.json");
//     const data = await response.json();

//     // Shuffle the array
//     const shuffledData = shuffleArray(data);
//     dataLength = shuffledData.length;
//     return shuffledData;
//   } catch (error) {
//     console.error("Error fetching or processing data:", error);
//   }
// }

// async function fetchAndDisplayQuotes() {
//   try {
//     const response = await fetch("data/maxim_filtered.json");

//     // Check if the response is OK (status 200-299)
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     // Log the response to debug
//     const responseText = await response.text();
//     // console.log("Response Text:", responseText);

//     // Attempt to parse the response text as JSON
//     const data = JSON.parse(responseText);

//     // Shuffle the array
//     const shuffledData = shuffleArray(data);
//     dataLength = shuffledData.length;
//     return shuffledData;
//   } catch (error) {
//     console.error("Error fetching or processing data:", error);
//   }
// }

async function fetchAndDisplayQuotes() {
  try {
    const response = await fetch("data/maxim_filtered.json");

    // Log the full response object for debugging
    // console.log("Full Response:", response);

    // Check if the response is OK (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check content-type to ensure it's JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError(`Expected JSON, but received ${contentType}`);
    }

    // Parse the response as JSON
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
