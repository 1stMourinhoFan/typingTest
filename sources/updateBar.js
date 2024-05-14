function updateProgressBar() {
  var progressBar = document.getElementById("typing__bar");
  var randomValue = Math.random() * 100; // 0에서 100 사이의 랜덤 값 생성
  progressBar.style.width = randomValue + "%"; // 막대바의 길이를 업데이트
}

// 일정 시간 간격으로 막대바를 업데이트합니다. (예: 1초마다)
setInterval(updateProgressBar, 1000);