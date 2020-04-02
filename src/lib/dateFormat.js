const addZero = (num, option = 0) => {
  const formatStr = String(num);

  let result = '';
  if (option === 0) {
    result = formatStr.length !== 2 ? `0${num}` : `${num}`;
  } else {
    result = formatStr.length !== 2 ? `0${num + 1}` : `${num + 1}`;
  }

  // console.log(result);

  return result;
};

const dateFormat = date => {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = addZero(d.getMonth(), 1);
  const day = addZero(d.getDate());
  const hour = addZero(d.getHours());
  const min = addZero(d.getMinutes());
  const sec = addZero(d.getSeconds());

  const result = `${year}.${month}.${day} ${hour}:${min}:${sec}`;

  return result;
};

export default dateFormat;
