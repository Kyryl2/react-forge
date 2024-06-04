export const getData = (data, backgroundColor) => {
  return {
    datasets: [
      {
        data,
        backgroundColor,
        borderColor: "transparent",
        cutout: "70%",
        hoverOffset: 10,
      },
    ],
  };
};

export const getOptions = (categoriesSummary) => {
  return {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const category = categoriesSummary[context.dataIndex].name;
            const value = context.raw;
            return `${category}: ${value}`;
          },
        },
        displayColors: false,
        backgroundColor: "",
        borderColor: "rgba(0, 0, 0, 0)",
        borderRadius: 5,
        padding: 10,
        zIndex: 1,
      },
    },
  };
};
