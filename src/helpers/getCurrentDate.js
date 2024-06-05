import { format } from "date-fns";

export const getCurrentDate = () => {
  const date = new Date();
  const currentMonth = format(date, "MM");
  const currentYear = format(date, "yyyy");

  return { currentMonth, currentYear };
};
