export const styles = {
  control: () => ({}),
  container: (baseStyles) => ({
    ...baseStyles,
    border: "1px solid rgba(255, 255, 255, 0.6)",
    borderRadius: 8,
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: 16,
    backgroundColor: "rgba(74, 86, 226, 0.1)",
    ":hover": {
      borderColor: "rgba(255, 255, 255, 1)",
    },
  }),
  dropdownIndicator: () => ({
    display: "none",
  }),
  indicatorsContainer: () => ({
    display: "none",
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: 16,
    color: "#fbfbfb",
  }),
  input: (baseStyles) => ({
    ...baseStyles,
    caretColor: "#fbfbfb",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: 16,
    color: "#fbfbfb",
  }),
  valueContainer: (baseStyles) => ({
    ...baseStyles,
    padding: "12px 20px",
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    background:
      "linear-gradient(360deg, rgba(83, 61, 186, 0.7) 0%, rgba(80, 48, 154, 0.7) 35.94%, rgba(106, 70, 165, 0.7) 61.04%, rgba(133, 93, 175, 0.7) 100%);",
    backdropFilter: "blur(100px)",
    boxShadow: "0 4px 60px 0 rgba(0, 0, 0, 0.25)",
    borderRadius: 8,
    cursor: "pointer",
    overflow: "hidden",
  }),
  menuList: (baseStyles) => ({
    ...baseStyles,
    display: "flex",
    flexDirection: "column",
    padding: 0,
    "::-webkit-scrollbar": {
      display: "none",
    },
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused && "rgba(255, 255, 255, 0.1)",
    color: state.isFocused ? "#ff868d" : "#fbfbfb",
    cursor: "pointer",
    padding: "8px 20px",
    display: "block",
    ":active": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  }),
};
