export const days = [
  { code: "Lu", name: "Luni" },
  { code: "Ma", name: "Marti" },
  { code: "Mi", name: "Miercuri" },
  { code: "Jo", name: "Joi" },
  { code: "Vi", name: "Vineri" },
  { code: "Sa", name: "Sâmbătp" },
  { code: "Du", name: "Duminică" },
];

export const getDayOfWeek = () => {
  const now = new Date();
  const dayOfWeek = (now.getDay() + 6) % 7;

  let diff = 4 - dayOfWeek;
  if (diff <= 0) {
    diff += 7;
  }

  const friday = new Date(now);
  friday.setDate(now.getDate() + diff);
  friday.setHours(0, 0, 0, 0);
  const targetDate = friday.toISOString();

  return { dayOfWeek, targetDate, isFriday: dayOfWeek === 4 };
};
