export const rxEmail =
  /^[a-z][a-z0-9%_\.]{3,32}@[a-z0-9]{3,}(\.[a-z]{3,4}){1,2}$/;
export const rxPassword =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])(?!.*['"]).{6,}$/;
export const rxPhone =
  /^(?:\+84|0)(?:1\d{9}|3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})$/;

export const isOnlyWhitespace = (str?: string) => {
  if (!str) return;
  return /^\s*$/.test(str);
};
