export  function validateEmail(email){
     var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     let result = email.match(mailformat) ? true : false;
     return result;
}