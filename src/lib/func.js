import dotenv from 'dotenv';

dotenv.config();

export const randomString = () => {
  const char = process.env.CHARS;
  const string_length = 15;
  let randomstring = '';
  for (let i = 0; i < string_length; i++) {
    let rnum = Math.floor(Math.random() * char.length);
    randomstring += char.substring(rnum, rnum + 1);
  }
  //document.randform.randomfield.value = randomstring;
  return randomstring;
};
