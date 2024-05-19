// 초성(19개)
const CHO_HANGUL = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];
// 중성(21개)
const JUNG_HANGUL = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
];
// 종성(28개)
const JONG_HANGUL = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const CHO_PERIOD = Math.floor("까".charCodeAt(0) - "가".charCodeAt(0)); // 588 ( 28 * 21 )
const JUNG_PERIOD = Math.floor("개".charCodeAt(0) - "가".charCodeAt(0)); // 28

const HANGUL_START_CHARCODE = "가".charCodeAt(0);
const HANGUL_END_CHARCODE = "힣".charCodeAt(0);

// 조합 된 글자인지 체크 (가 ~ 힣 사이)
function isHangul(charCode) {
  return HANGUL_START_CHARCODE <= charCode && charCode <= HANGUL_END_CHARCODE;
}

function divideHangul(letter) {
  const letterCode = letter.charCodeAt(0);

  if (!isHangul(letterCode)) {
    return letter;
  }

  const charCode = letterCode - HANGUL_START_CHARCODE;

  const choIndex = Math.floor(charCode / CHO_PERIOD);
  const jungIndex = Math.floor((charCode % CHO_PERIOD) / JUNG_PERIOD);
  const jongIndex = charCode % JUNG_PERIOD;

  return {
    cho: CHO_HANGUL[choIndex],
    jung: JUNG_HANGUL[jungIndex],
    jong: JONG_HANGUL[jongIndex],
  };
}

const _events = (target) => {
  const value = String(target.value);

  document.querySelector(`.docs span`).innerHTML = value
    .split("")
    .map(divideHangul)
    .reduce((acc, v) => {
      return (
        acc +
        (v.cho ? (v.cho || "") + (v.jung || "") + (v.jong || "") : v || "")
      );
    }, "");
};
