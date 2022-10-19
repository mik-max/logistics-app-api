function formartDate(month, date){
     return month + " " + date;
}

function checkMatchingDates(birthDate, currentDate){
     return birthDate === currentDate ? true : false;
}

export {formartDate, checkMatchingDates}
