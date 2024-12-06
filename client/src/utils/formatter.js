import moment from "moment";

export const convertToKebabCase = (name) => {
  return name.split(" ").join("-");
};

export const convertToNormalCase = (name) => {
  return name.split("-").join(" ");
};

export const toLocaleUpperCase = (string) => {
  return string.toLocaleUpperCase();
};

export const formatDate = (isoString) => {
  return moment(isoString).format("DD-MM-YYYY");
};
export const formatDateDetails = (isoString) => {
  return moment(isoString).format("HH:mm:ss DD-MM-YYYY");
};
