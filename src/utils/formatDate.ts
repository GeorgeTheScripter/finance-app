export const formatDate = (dateString: Date): string => {
  const date: Date = new Date(dateString);

  const day: string = String(date.getDate()).padStart(2, "0");
  const month: string = String(date.getMonth() + 1).padStart(2, "0");
  const year: string = String(date.getFullYear()).slice(-2);
  const hours: string = String(date.getHours()).padStart(2, "0");
  const minutes: string = String(date.getMinutes()).padStart(2, "0");
  const seconds: string = String(date.getSeconds()).padStart(2, "0");

  return `${day}.${month}.${year} - ${hours}:${minutes}:${seconds}`;
};

export const formatGroupDate = (dateString: Date): string => {
  const date: Date = new Date(dateString);
  const today: Date = new Date();
  const yesterday: Date = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isSameDate = (d1: Date, d2: Date): boolean => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  if (isSameDate(date, today)) return "Сегодня";
  if (isSameDate(date, yesterday)) return "Вчера";

  const months: string[] = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  return `${date.getDate()} ${months[date.getMonth()]}`;
};

export const getDaysInMonth = (): number => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
};
