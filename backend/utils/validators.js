export function validateEmail(email) {
  console.log("🔍 VALIDATOR RAW EMAIL:", JSON.stringify(email));
  return /\S+@\S+\.\S+/.test(email);
}

export function validatePassword(pwd) {
  return typeof pwd === "string" && pwd.length >= 6;
}
