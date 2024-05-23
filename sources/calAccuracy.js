// let accuracy = 0;
// function calAccur(textLength) {
//   const spans = document.getElementById("quote").querySelectorAll("span");
//   let errorCount = 0;
//   let correctCount = 0;
//   let noneCount = 0;

//   for (let i = 0; i < textLength; i++) {
//     if (spans[i].classList.contains("typing__error")) {
//       errorCount++;
//     }
//     if (spans[i].classList.contains("typing__correct")) {
//       correctCount++;
//     }
//     if (spans[i].classList.contains("typing__none")) {
//       noneCount++;
//     }
//   }
//   const totalCount = correctCount + errorCount + noneCount;
//   if (totalCount > 0) {
//     accuracy = Math.round((correctCount / totalCount) * 100);
//   } else {
//     accuracy = 0;
//   }
// }

// export { calAccur, accuracy };
