import { chosungIncludes } from "es-hangul";
import { disassembleHangul } from "es-hangul";
import { disassembleHangulToGroups } from "es-hangul";

const searchWord = "";
const userInput = "ㄹㅁ";

const result = chosungIncludes(searchWord, userInput);
console.log(result);

console.log(
  disassembleHangulToGroups(
    "다만 그리웠을 뿐입니다. 내 곁에 앉아 있지 않은 당신의 손등이, 연한 갈색 피부 위로 부풀어오른 검푸른 정맥들이."
  ).length
);

console.log(
  disassembleHangul(
    "다만 그리웠을 뿐입니다. 내 곁에 앉아 있지 않은 당신의 손등이, 연한 갈색 피부 위로 부풀어오른 검푸른 정맥들이."
  )
);
