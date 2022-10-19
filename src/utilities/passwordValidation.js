
export function validatePassword(password){
     let lowerCaseLetters = /[a-z]/g;
     let upperCaseLetters = /[A-Z]/g;
     let numbers = /[0-9]/g;

     let result = (password.match(lowerCaseLetters) && password.match(upperCaseLetters) && password.match(numbers) && password.length >= 8) ? true : false;
     return result;
}