export function checkExpiryDate(expiryDate){
     let date = new Date()
     let currentDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
     let currentEpoch = new Date(currentDate).getTime()/1000
     let expiryEpoch = new Date(expiryDate).getTime()/1000
     let result = currentEpoch >= expiryEpoch ? true : false;
     // console.log(currentEpoch + " " + expiryEpoch)
     return result;

}