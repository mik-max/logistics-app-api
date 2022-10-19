export function validateBirthDate(dateOfBirth){
     
     let currentYear = new Date().getFullYear();
     let currentDate = new Date().getDate();
     let currentMonth = new Date().getMonth() + 1;
     let birthYear = new Date(dateOfBirth).getFullYear()
     let birthMonth = new Date(dateOfBirth).getMonth() + 1
     let birthDate = new Date(dateOfBirth).getDate()
      console.log(dateOfBirth)
     let invalidDays = dateOfBirth == birthYear + "-09-31" || dateOfBirth == birthYear + "-04-31" || dateOfBirth == birthYear + "-06-31" || dateOfBirth == birthYear + "-11-31" || dateOfBirth == birthYear + "-02-30" || dateOfBirth == birthYear + "-02-31" || (birthYear == currentYear &&  birthMonth == currentMonth && birthDate > currentDate ) || (birthYear == currentYear &&  birthMonth > currentMonth  ) ? true : false

     let result = (birthYear <= currentYear && (birthMonth > 0 && birthMonth <= 12) && (birthDate > 0 && birthDate <= 31)) && invalidDays == false  ? true : false
     return result
}