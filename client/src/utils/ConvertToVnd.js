export const convertToVnd = (price) => {
  return price.toLocaleString("vi", { style: "currency", currency: "VND" });
};

export const convertToNumber = (formattedPrice) => {
  const cleanPrice = formattedPrice.replace(/[^0-9]/g, "");
  const number = parseInt(cleanPrice, 10);
  return number;
};
