const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidCGPA = (cgpa) => {
  return Number(cgpa) >= 0 && Number(cgpa) <= 10;
};

module.exports = {
  isValidEmail,
  isValidCGPA,
};
