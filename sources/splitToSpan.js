let state = {
    text:""
};

// span 요소의 클래스를 가져와 배열에 저장하는 함수
function getSpanClasses() {
    const spans = document.getElementById("quote").querySelectorAll("span"); // 모든 span 요소 가져오기
    const classesArray = Array.from(spans).map((span) => span.innerText); // 각 span의 클래스를 배열로 변환하여 저장
    return classesArray;
}
// 페이지 로드될 때 span 클래스를 가져와 배열에 저장
//   window.addEventListener("load", getSpanClasses);