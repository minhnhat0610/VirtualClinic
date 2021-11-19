import {sendDataToServer} from "./server.js"
import {checkLogin} from "./checkLoginInfor.js";
import{checkValidity} from './inputValidation.js';

$(document).ready(function(){
    const getAccountInforServer = "../PHP/getAccountInfor.php";
    // ============= Check login information before loading body content ============
    let finishLoading = async () =>{
        // Load account information from server
        sendDataToServer("",getAccountInforServer).then(async response => {
            let result = await JSON.parse(response);
            $('#acc-name').text(`${result[0]['FirstName']} ${result[0]['LastName']}`);
            $('.account-infor input').each((i, input) => {
                input.value = result[0][i];
            })
        })
        .catch(error => {
            alert(`An error has occured: ${error}`);

        })
        //Reveal body content
        $('.title').toggleClass('title-hide');
        $('.account-infor-container').toggleClass('account-infor-container-hide');
        $('.pass-change-container').toggleClass('pass-change-container-hide');

    }
    checkLogin(finishLoading);

//===============================================================================================================================

    // =================== Generate circle text for page title ============
    let generateCircleText = (textHolder) => {
        let textArray = textHolder.text().split("");
        let textLength = textArray.length;
        let angle = 360 / textLength;

        for(let i = 0; i < textLength; i++){
            textArray[i] = `<span style="transform: rotate(${i*angle}deg)">` + textArray[i] + '</span>';
        }

        textHolder.html(textArray.join(""));
    }

    generateCircleText($('.page-title'))

    // =================== Click to show pass Change on Mobile Device ===============
    $(document).on('click',function(e){

        let container = $(e.target).parents('.pass-change-container');
            if(container.attr('class') == 'pass-change-container' ||
                container.attr('class') == 'pass-change-container show-pass-change'){
                $('.pass-change-container').addClass('show-pass-change');
                $('.out-focus-background').addClass('out-focus');
            }

            else{
                $('.pass-change-container').removeClass('show-pass-change');
                $('.out-focus-background').removeClass('out-focus');
            }
    })

    // =============== Edit account information ====================
    let editMode = false
    $('#edit-button').on('click',function(){
        if(editMode){
            $('.edit-confirm').addClass('edit-confirm-show');
            $('.inner-wrapper').addClass("inner-wrapper-show");
        }
        // changing effect
        $(this).addClass('fa-check');
        $(this).removeClass('fa-pen');
        $('.account-infor input').attr("readonly",false);
        $('.account-infor input').addClass('input-edit');
        AssignDataPicker($('#dob'));
        editMode = true

    })
    
    let AssignDataPicker = (dateContainer) => {
        dateContainer.flatpickr({
            disableMobile: true,
            altInput: true,
            altFormat: 'm-d-Y',
            dateFormat: 'Y-m-d'
        });
    }

    // ========== Apply account information change ============
    const EditServer = '../PHP/editAccInfor.php';
    $('#yes-confirm').on('click',function(){
        //input valid Check
        if(checkEditForm()){
            let data = $('.account-infor').serialize();
            console.log(data);
            sendDataToServer(data, EditServer).then(response => {
                alert(response);
            })
            .catch(error => {
                alert('An error has occurred: '+ error);
            })
            .finally(()=>{
            location.reload();
            })

        }
        else{
            $('#cancel-confirm').trigger('click');
        }
    })

    let checkEditForm = () => {
        const emailPattern = /\S+@\S+\.\S+/;
        const textPattern = /[A-Za-z]+$/;
        const numberonly = /[0-9]+$/;
        let validPass = true;

        let firstname = $('#first-name');
        let lastname = $('#last-name');
        let email = $('#email');
        let dob = $('#dob');
        let phone = $('#phone-number');

        if(!checkValidity(firstname, textPattern)){
            invalidAlert(firstname);
            validPass = false;
        }

        if(!checkValidity(lastname, textPattern)){
            invalidAlert(lastname);
            validPass = false;
        }

        if(!checkValidity(email, emailPattern)){
            invalidAlert(email);
            validPass = false;
        }

        if(!checkValidity(phone, numberonly)){
            invalidAlert(phone);
            validPass = false;
        }

        return validPass;
    }

    let invalidAlert = (testedObject) =>{
        testedObject.addClass('input-invalid');
    }
    // ================== Cancel Edit =============================
    $('#cancel-confirm').on('click',function(){
        $('.edit-confirm').removeClass('edit-confirm-show');
        $('.inner-wrapper').removeClass("inner-wrapper-show");
        $('#edit-button').removeClass('fa-check');
        $('#edit-button').addClass('fa-pen');
        $('.account-infor input').attr("readonly",true);
        $('.account-infor input').removeClass('input-edit');

        editMode = false;
    })

    //============ Chang Password ====================
    const passChangeServer = "../PHP/passChange.php";
    $('#pass-change-btn').on('click',(e)=>{
        let newPass1 = $('#new-pass-1');
        let newPass2 = $('#new-pass-2');

        if(newPass1.val() == ""){
            invalidAlert(newPass1);
        }
        else if(newPass1.val() != newPass2.val()){
            invalidAlert(newPass2);
        }
        else{
            // show loader
            $(e.currentTarget).addClass('hide');
            $('.pass-change-loader').removeClass('hide');
            let data = `new-pass-1=${newPass1.val()}&new-pass-2=${newPass2.val()}`;
            sendDataToServer(data, passChangeServer).then(response => {
                alert(response);
            })
            .catch(error => {
                alert('An error has occurred: '+ error);
            })
            .finally(() => {
                location.reload();
                
            })
        }
    })
})
