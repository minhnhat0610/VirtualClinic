
    let validation = (testedObject, pattern) => {
        let textInput = testedObject.val();
        let regex = new RegExp(pattern);

        if(!regex.test(textInput)){
            testedObject.siblings('.invalidAlert').css({
                display: 'block'
            })
            return false;
        }

        else{
            testedObject.siblings('.invalidAlert').css({
                display: 'none'
            })

            return true;
        } 

        
    }

let registerValidationCheck = () => {
    const emailPattern = /\S+@\S+\.\S+/;
    const textPattern = /[A-Za-z]+$/;
    const numberonly = /[0-9]+$/;
    const textandnumber = /^\S/;


    let registerEmail = $('#register-email');
    let password = $('#register-password');
    let reEnterPassword = $('#register-password-confirm');
    let firstname = $('#register-first-name');
    let lastname = $('#register-last-name');
    let dob = $('#date-of-birth');
    let phone = $('#register-phone');

    let ValidityPassed = false;

    if(!validation(registerEmail,emailPattern)){
        return ValidityPassed = false;
    }

    else{
        if(!validation(password,textandnumber)){
            return ValidityPassed = false;
        } 
        else{
            if(password.val() != reEnterPassword.val()){
                reEnterPassword.siblings('.invalidAlert').css({
                    display: 'block'
                })
                return ValidityPassed = false;
            }
            else{
                reEnterPassword.siblings('.invalidAlert').css({
                    display: 'none'
                }) 

                if(!validation(firstname,textPattern)){
                    return ValidityPassed = false;
                }
                else{
                    if(!validation(lastname,textPattern)){
                        return ValidityPassed = false;
                    }
                    else{
                        if(dob.val() === ""){
                            dob.siblings('.invalidAlert').css({
                                display: 'block'
                            })
                            return ValidityPassed = false;
                        }
                        else{
                            dob.siblings('.invalidAlert').css({
                                display: 'block'
                            })
                            if(!validation(phone,numberonly)){
                                return ValidityPassed = false;
                            }
    
                            else{
                                return ValidityPassed = true;
                            }
                        }
                        
                
                    }
                }
            }
            
        }   
        
    }

}

export {registerValidationCheck}
