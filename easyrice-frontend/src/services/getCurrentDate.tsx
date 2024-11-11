export const getCurrentDateTime = () => {
  const now = new Date();
  return now.toISOString().slice(0, 16);
};
