export const getCurrentDateTime = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  now.setMinutes(now.getMinutes() - offset);
  return now.toISOString().slice(0, 16);
};
