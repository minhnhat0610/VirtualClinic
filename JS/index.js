import {sendDataToServer} from "./server.js";
import {registerValidationCheck} from "./inputValidation.js";
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


    // ============ Login Form Input indicator ===================
    $('.login-form input').on('focus',function(e){
        $('.login-form i').removeClass('focus');
        $(e.currentTarget).siblings('i').addClass('focus');
    })

    $('.login-form input').on('blur',function(){
        $('.login-form i').removeClass('focus');
    })


    // ========== Login button function  ===============

    $('#login-button').on('click',function(e){
        e.preventDefault();
        let loginData = $('.login-form').serialize();
        let loginServer = '../PHP/login.php';

        sendDataToServer(loginData,loginServer).then(function(result){
            console.log(result);
            if(!parseInt(result)){
                $('.login-form .invalidAlert').css({
                    display: 'block'
                })
            }

            else{
                $('.login-form .invalidAlert').css({
                    display: 'none'
                })
                location.href='./main-console.html';
            }
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
            // turn off Invalid alert and Turn on loading spinner
            $('.invalidAlert').css({
                display: 'none',
            })

            $('#register-submit-button').toggleClass('hide');
            $('.register-loading').toggleClass('hide');

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
                        alert('You have successfully created new account!');
                        location.reload();
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
            .finally(function(){
                // turn off loading and turn sumbit button back on
                $('#register-submit-button').toggleClass('hide');
                $('.register-loading').toggleClass('hide');
    
            })

            

        }

        else{
            console.log('not pass');
        }
    })

})