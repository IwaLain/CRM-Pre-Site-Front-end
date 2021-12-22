const formatNames = (list, type) => {
  const newList = [];
  switch (type) {
    case "object":
      for (const [, value] of Object.entries(list)) {
        newList.push({ id: value.id, name: value.name || value.serial });
      }
      break;
    case "array":
      break;
    default:
      break;
  }

  return newList;
};

export default formatNames;
