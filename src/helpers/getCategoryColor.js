export const getCategoryColor = (categoryName) => {
  switch (categoryName) {
    case "Main expenses":
      return "#fed057";
    case "Products":
      return "#ffd8d0";
    case "Car":
      return "#fd9498";
    case "Self care":
      return "#c5baff";
    case "Child care":
      return "#6e78e8";
    case "Household products":
      return "#4a56e2";
    case "Education":
      return "#81e1ff";
    case "Leisure":
      return "#24cca7";
    case "Other expenses":
      return "#00ad84";
    case "Entertainment":
      return "#ffbf00";
    case "Income":
      return "#00c853";
    default:
      return "#ffffff";
  }
};
