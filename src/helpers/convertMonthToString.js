export const convertMonthToString = (monthNumeric) => {
  switch (monthNumeric) {
    case "01":
      return { label: "January", value: "january" };
    case "02":
      return { label: "February", value: "february" };
    case "03":
      return { label: "March", value: "march" };
    case "04":
      return { label: "April", value: "april" };
    case "05":
      return { label: "May", value: "may" };
    case "06":
      return { label: "June", value: "june" };
    case "07":
      return { label: "July", value: "july" };
    case "08":
      return { label: "August", value: "august" };
    case "09":
      return { label: "September", value: "september" };
    case "10":
      return { label: "October", value: "october" };
    case "11":
      return { label: "November", value: "november" };
    case "12":
      return { label: "December", value: "december" };

    default:
  }
};
