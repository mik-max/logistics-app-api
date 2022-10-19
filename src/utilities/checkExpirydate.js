export function checkExpiryDate(epochExpiryDate){
     let currentDate = new Date();
     let currentEpoch = currentDate.getTime()/1000.0
     let result = currentEpoch >= epochExpiryDate ? true : false;
     return result;

}