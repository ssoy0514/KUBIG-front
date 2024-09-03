const convertDateFormat = (inputString) => {
  const parts = inputString.split("-");
  const formattedDate = `${parts[0]}.${parts[1]}.${parts[2]}`;
  return formattedDate;
};

export const DateParser = (createdAt) => {
  const timeArr = createdAt.split("T");
  const historyDate = convertDateFormat(timeArr[0]);
  const historyTime = timeArr[1].slice(0, 5);
  return { historyDate, historyTime };
};
