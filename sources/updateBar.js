import { WPM } from "./wpm";

function updateProgressBar() {
  const progressBar = document.getElementById("typing__bar");
  const percentage = Math.min((WPM / 800) * 100, 100); // 백분율을 100%로 제한
  progressBar.style.width = percentage + "%"; // 막대바의 길이를 업데이트
}

// 일정 시간 간격으로 막대바를 업데이트합니다. (예: 1초마다)
setInterval(updateProgressBar, 500);
