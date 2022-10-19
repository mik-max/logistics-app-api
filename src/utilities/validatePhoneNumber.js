var arrayOfValidCode = [
     "0803","0806","0816","0814","0810","0813","0703","0706","0903","0906","0809",
     "0817","0908","0909","0802", "0808","0812", "0708","0701","0902","0901","0907",
     "0805","0807","0811","0815","0705","0905","0702", "0704", "0913", "0916" , "0904", "0907", "0912" , "0818"];
let numbers = /[0-9]/g;
let specialCharacters = /\W|_/g
let lowerCaseLetters = /[a-z]/g;
let upperCaseLetters = /[A-Z]/g;
let arrayOfMtnCode = ["0803","0806","0814","0810","0813","0816","0703","0706","0903","0906","0702", "0704", "0913", "0916"]; 
let arrayOfAirtelCode = ["0802","0808","0812","0708","0701","0902","0901","0907", "0904",  "0912"];
let arrayOfGloCode = ["0805","0807","0811","0815","0705","0905", "0915"];
let arrayOf9MobileCode = ["0809", "0818","0817", "0908","0909"];
function checkAvailability(arrayToCheck, searchValue) {
     return arrayToCheck.some(function (arrayValues) {
         return searchValue === arrayValues;
     });
}

export function validatePhoneNumber(phoneNumber){

     var phoneNumberCode = phoneNumber.slice(0 , 4); 
     var isValidCode = checkAvailability(arrayOfValidCode, phoneNumberCode);
     let isSpecialCharacter = phoneNumber.match(specialCharacters) ? true : false 
     let isLowerCase = phoneNumber.match(lowerCaseLetters) ? true : false 
     let isUpperCase = phoneNumber.match(upperCaseLetters) ? true : false 

     let result = (isValidCode && phoneNumber.length === 11 && !isSpecialCharacter && !isLowerCase && !isUpperCase ) ? true : false
     return result;
}