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

  return { dayOfWeek, targetDate };
};
