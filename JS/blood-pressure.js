import {sendDataToServer} from "./server.js";
import {checkLogin} from './checkLoginInfor.js';
import {generateBPResult} from "./generateBPResult.js"
$(document).ready(function(){
    const screenSize = $('body').width();
    const breakPoint = 1200;
    const writeRecordSever = '../PHP/writeRecord.php';
    const LoadRecordServer = '../PHP/loadRecord.php';

    // =================== Write Input into record ================
    let writeInput = (values) => {
        const numberOfColumn = 5;

        // add new record row
        $('.record-detail').prepend("<div class=\"record-row\"></div>")
        
        //add new span
        for(let i = 0; i < numberOfColumn; i++){
            $('.record-row').first().append('<span></span>');
            $('.record-row').first().children().eq(i).text(values[i]);
        }
    }

    // ================ Call back function after successfully check Login ===========   
    let BPFinishLoading = () =>{
        // ===== Load Record from Server =========
        sendDataToServer("",LoadRecordServer).then(function(response){
            JSON.parse(response).forEach(record => {
                writeInput(record);
            });
    
            // Calculate the Average BP
            let result = calculateAverage();
            repositionIndicator(result[0]);
    
            //========= reveal body content=========
            $('.title').toggleClass('title-hide');
            $('.record-container').toggleClass('record-container-hide');
            $('.measurement-container').toggleClass('measurement-container-hide');
            $('.input-entry').toggleClass('input-entry-hide')
        })
    }

    checkLogin(BPFinishLoading);
    
// ===========================================================================================================

    // ============ Click to show record container on mobile ============
    $(document).on('click',function(e){
        if(screenSize < breakPoint){
            let container = $(e.target).parents('.record-container');
            if(container.attr('class') === 'record-container' ||
                container.attr('class') === 'record-container show-record'){
                $('.record-container').addClass('show-record');
                $('.out-focus-background').addClass('out-focus');

            }
            else{
                $('.record-container').removeClass('show-record');
                $('.out-focus-background').removeClass('out-focus');

            }
        }
    })


    // ============ Hover measurement indicator ==============
    $('.measurement').on('mouseenter', function(){
        $('.indicator-label').css({
            opacity: 1
        })
    })

    $('.measurement').on('mouseleave', function(){
        $('.indicator-label').css({
            opacity: 0
        })
    })

    // ===================== Calculate Average blood pressure ===========
    let calculateAverage = () =>{
        const statLenght = 3;
        let arrayResult = [];
        const recordCollection = $('.record-row');
        const numberOfRecord = recordCollection.length;
        for(let i = 0 ; i < statLenght ; i++){
            let average = 0;
            let sum = 0;
            for(let j = 0; j < numberOfRecord; j++){
                let currentRecord = recordCollection.eq(j);
                let currentStat = currentRecord.children().eq(i).text()   
                sum+= parseInt(currentStat);
            }

            average = sum/numberOfRecord;
            arrayResult.push(average);
        }

        return arrayResult;
    }

    //====================== Re-position Indicator =======================
    let repositionIndicator = (currentAverage) => {
        const highlimit = 210;
        const iconWidth = 0.5;
        const iconHeight = 2;
        let offsetPercentage = currentAverage/highlimit *100;

        if(screenSize < breakPoint){
            $('.indicator').css({
                left: offsetPercentage+iconWidth + '%',
                top: '-160%'
            })
    
        }
        else{
            $('.indicator').css({
                top: 100 - (offsetPercentage+iconHeight) + '%',
                left: '-150%'
            })

        }
    }

    //  ============ Create Record values =========================
    let createValues = () =>{
        let sys = $('#sys-input').val();
        let dia = $('#dia-input').val();
        let pulse = $('#pulse-input').val();

        let BPresult = generateBPResult(sys, dia);

        let date = new Date().toLocaleDateString();
        
        return [sys,dia,pulse,BPresult,date];
    }


    

    // ===================== Enter blood pressure input ================
    let validateInput = (input, pattern) =>{
        if(pattern.test(input)){
            return true
        }
        else return false
    }

    let checkFormValidity = () =>{
        let pass = true;
        const digitOnly = /^[0-9]+$/;
        let inputCollection = $('.inner-container').children('input');
       inputCollection.each(function(){
           if(validateInput(this.value,digitOnly)){
            this.nextElementSibling.classList.remove('show-alert');
           }

           else{
            this.nextElementSibling.classList.add('show-alert');
            pass = false;
           }
       })

       return pass;
       
    }

    let serializeData = (arrayResult) => {
        let length = arrayResult.length;
        let keyArray = ['sys','dia','pulse','result'];
        let returnedData = "";
        for(let i=0;i<length-1;i++){
            returnedData += keyArray[i] + "=" + arrayResult[i] + "&";
        }

        let d = new Date()
        let date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();

        return returnedData + "date=" + date;
    }


    $('#enter-button').on('click',function(e){
        e.preventDefault();
       let validityPass = checkFormValidity();
    //    Re-calculate current average blood pressure
       if(validityPass){
        //  create record Values
        let recordValues = createValues();
        let recordData = serializeData(recordValues);
        sendDataToServer(recordData,writeRecordSever).then(function(response){
            console.log(response);
            if(parseInt(response)){
                // display values on Records Container
                writeInput(recordValues);

                let result = calculateAverage();
                repositionIndicator(result[0]);
            }

            else{
                alert('Fail to input record. Please try again!');
            }
            
        })
        

       }
    })

})