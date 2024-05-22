import { chosungIncludes } from "es-hangul";
import { disassembleHangul } from "es-hangul";
import { disassembleHangulToGroups } from "es-hangul";

const searchWord = "라면";
const userInput = "ㄹㅁ";

const result = chosungIncludes(searchWord, userInput);
console.log(result);

console.log(disassembleHangulToGroups("값"));
