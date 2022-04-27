export function validatePhoneNumber(number: string): boolean {
  if (number === '') {
    return true;
  }
  return /([\+84|84|0|0084]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(number);
}

export function validateName(name: string): boolean {
  if (name === '') {
    return true;
  }
  return name.length >= 2;
}

export function validatePassword(name: string): boolean {
  if (name === '') {
    return true;
  }
  return name.length > 0;
}

// function ValidateEmail(email: string): Boolean {
//   return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
// }
