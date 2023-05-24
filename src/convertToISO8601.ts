import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // UTC plugin
import timezone from "dayjs/plugin/timezone"; // timezone plugin
dayjs.extend(utc);
dayjs.extend(timezone);

type MonthMap = {
  [key: string]: string;
};

export function convertToISO8601(
  dateString: string,
  tz = "Asia/Tokyo"
): string {
  // 月の名前と略称を数字にマッピング
  const months: MonthMap = {
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
  if (months[month]) {
    month = months[month];
  } else {
    throw new Error("Invalid month");
  }

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

  // Day.jsオブジェクトを作成し、タイムゾーンを指定
  const dateObj = dayjs.tz(`${year}-${month}-${day}T${hours}:${minutes}`, tz);

  // ISO 8601形式の文字列に変換
  const isoString = dateObj.format();

  // 結果を返す
  return isoString;
}
