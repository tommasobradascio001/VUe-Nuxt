export function passwordFormat(password) {
  return /((?:(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)).*)/.test(password)
}
