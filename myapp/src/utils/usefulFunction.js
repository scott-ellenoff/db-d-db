export const userDate = () => {
  let date = new Date();

  const formattedDate = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };

  return formattedDate
};