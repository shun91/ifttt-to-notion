export function convertToISO8601(dateString: string): string {
  // 月の名前と略称を数字にマッピング
  const months = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  // 正規表現を用いて日付と時刻を抽出
  const match = dateString.match(
    /(\w+)\s+(\d+),\s+(\d+)\s+at\s+(\d+:\d+)(AM|PM)/
  );
  if (!match) {
    throw new Error("Invalid format");
  }

  // 抽出した値を変数に代入
  let [, month, day, year, time, period] = match;

  // 月の名前または略称を数字に変換
  month = months[month];

  // 日付が一桁の場合は先頭に0を付ける
  if (day.length === 1) {
    day = "0" + day;
  }

  // 12時間制を24時間制に変換
  let [hours, minutes] = time.split(":");
  if (period === "PM" && hours !== "12") {
    hours = String(Number(hours) + 12);
  } else if (period === "AM" && hours === "12") {
    hours = "00";
  }

  // Dateオブジェクトを作成
  const dateObj = new Date(`${year}-${month}-${day}T${hours}:${minutes}`);

  // ISO 8601形式の文字列に変換
  const isoString = dateObj.toISOString();

  // 結果を返す
  return isoString;
}

const inputDate = "May 13, 2023 at 03:06PM";
const outputDate = convertToISO8601(inputDate);

console.log(outputDate);
