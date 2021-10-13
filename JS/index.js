$(document).ready(function(){
    //================ Create FlatPicker for Date field in Register form ======================
    $('#date-of-birth').flatpickr({
        disableMobile: true,
        altInput: true,
        altFormat: 'm-d-Y',
        dateFormat: 'Y-m-d'
    });
    // ======== Register Button click function================
    let count = 0;
    $('#register-button').on('click',function(){
        let sliderWidth = $('.slider').width();
        let distance = ++count * sliderWidth;
        $('.slider').css({
            transform: 'translateX(-' + distance + 'px)'
        })
    })

    // ======== Back Button click function================

    $('#back-button').on('click',function(){
        let sliderWidth = $('.slider').width();
        let distance = --count * sliderWidth;
        $('.slider').css({
            transform: 'translateX(-' + distance + 'px)'
        })

    })


    // ============ Input indicator ===================
    $('.login-form input').on('focus',function(e){
        $('.login-form i').removeClass('focus');
        $(e.currentTarget).siblings('i').addClass('focus');
    })

    $('.login-form input').on('blur',function(){
        $('.login-form i').removeClass('focus');
    })


    // ========== Input validation ===============


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
// ============= Login Button function ===================

let sendDataToServer = (data, destination) =>{
    return new Promise(function(resolve, reject){
        $.ajax({
            type: 'post',
            data: data,
            url: destination,
            success: function(serverResponse){
                resolve(serverResponse);
            },
            error: function(error){
                reject(error.statusText);
            }
        })
    
    })

}

    $('#login-button').on('click',function(e){
        e.preventDefault();
        let loginData = $('.login-form').serialize();
        let loginServer = '../PHP/login.php';

        sendDataToServer(loginData,loginServer).then(function(result){
            console.log(result);
        })
        .catch(function(error){
            console.log(error);
        })
    })


// ============= Register Button function ===================

    $('#register-submit-button').on('click',function(e){
        let registerData = $('.register-form').serialize();
        let checkAccExisted = '../PHP/checkAccountExisted.php';
        let registerServer = '../PHP/register.php';
        e.preventDefault();
        if(registerValidationCheck()){
            $('.invalidAlert').css({
                display: 'none',
            })

            // check if user has already existed
            sendDataToServer(registerData,checkAccExisted).then(function(result){
                console.log(result)

                if(result==='available'){
                    $('#register-email').siblings('.invalidAlert').text('invalid input')
                    $('#register-email').siblings('.invalidAlert').css({
                        display: 'none'
                    })
                    
                    sendDataToServer(registerData, registerServer).then(function(result2){
                        console.log(result2);
                    })
                    .catch(function(error2){
                        console.log(error2);
                    })
                }

                else{
                    $('#register-email').siblings('.invalidAlert').text('already existed')
                    $('#register-email').siblings('.invalidAlert').css({
                        display: 'block'
                    })                }
            })
            .catch(function(error){
                console.log(error);
            })

            

        }

        else{
            console.log('not pass');
        }
    })

})