// validation.js
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return !emailRegex.test(email);
};

export const validatePhoneNumber = (phoneNumber) => {
  const phoneNumberRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
  return !phoneNumberRegex.test(phoneNumber);
};
