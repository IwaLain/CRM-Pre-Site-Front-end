const getColor = (color) => {
  switch (color) {
    case "success":
      return "#05c12e";
    case "danger":
      return "#f95b5b";
    case "warning":
      return "#e3bb31";
    case "primary":
      return "#5b87f9";
    case "info":
      return "#5bc9f9";
    case "default":
      return "#dedede";
    default:
      return false;
  }
};

export default getColor;
