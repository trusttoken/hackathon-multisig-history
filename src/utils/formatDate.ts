import { format } from "date-fns";

export const formatDate = (dateString: string) => {
  const date = Date.parse(dateString);
  return format(date, "PP");
};

export const formatTime = (dateString: string) => {
  const date = Date.parse(dateString);
  return format(date, "p");
};
