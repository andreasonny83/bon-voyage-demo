export const formatDate = (inputDate: Date) => {
  const month = inputDate.getMonth() + 1 < 10 ? `0${inputDate.getMonth() + 1}` : `${inputDate.getMonth() + 1}`;
  const day = inputDate.getDate() < 10 ? `0${inputDate.getDate()}` : `${inputDate.getDate()}`;
  return `${inputDate.getFullYear()}-${month}-${day}`;
};
