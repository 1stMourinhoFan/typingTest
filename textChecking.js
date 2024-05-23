import { readFile, writeFile } from "fs/promises";

// JSON 파일을 읽어옵니다.
async function filterMaxims() {
  try {
    const data = await readFile("data/maxim.json", "utf8");
    let maxims = JSON.parse(data);

    // 필터링 조건에 맞게 데이터를 처리하고, message 필드를 trim합니다.
    maxims = maxims
      .filter(
        (maxim) =>
          maxim.message.length <= 80 && /^[가-힣\s,!'".]+$/.test(maxim.message)
      )
      .map((maxim) => ({
        ...maxim,
        message: maxim.message.trim(),
      }));

    // 필터링된 데이터를 다시 JSON 파일로 저장합니다.
    await writeFile(
      "data/maxim_filtered.json",
      JSON.stringify(maxims, null, 2),
      "utf8"
    );
    console.log("필터링된 데이터를 maxim_filtered.json 파일에 저장했습니다.");
  } catch (err) {
    console.error("오류 발생:", err);
  }
}

// filterMaxims();
