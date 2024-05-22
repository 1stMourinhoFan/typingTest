let shuffledData = [];

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
    return shuffledData;
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}

// Call the function immediately to fetch data when the module is loaded
shuffledData = await fetchAndDisplayQuotes();

// Export the function
export { shuffledData };
