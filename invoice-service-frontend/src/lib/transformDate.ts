export default function transformDate(date: string | null): string {
  if (!date) return "";
  const parsedDate = new Date(date);

  const day = parsedDate.getDate();
  const month = parsedDate.toLocaleString("en-US", { month: "short" });
  const year = parsedDate.getFullYear();

  return `${day} ${month} ${year}`;
}
