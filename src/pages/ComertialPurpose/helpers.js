export const dataValid = (checkData) => {
    const data = [];
    for (const [key, value] of Object.entries(checkData)) {
        if (value.length > 0) {
          data.push({
            item: key,
            description: "",
            units: "EA",
            quantity: value.length,
            price: "",
            cost: 0,
          });
        }
    }
    return data.length > 0
}