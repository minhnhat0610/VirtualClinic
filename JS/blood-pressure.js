$(document).ready(function(){
    const screenSize = $('body').width();
    const breakPoint = 1200;
    // ============ Click to show record container ============
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

    // ================= Generate Blood Pressure result =================

    let generateBPResult = (sysAverage, diaAverage) => {

        if(sysAverage < 90 && diaAverage < 60){
            return 'low';
        }

        else if(sysAverage >= 90 && sysAverage < 120 && diaAverage >= 60 && diaAverage <80){
            return 'normal';
        }

        else if(sysAverage >= 120 && sysAverage < 130 && diaAverage >= 60 && diaAverage <80){
            return 'elevated';
        }

        else if((sysAverage >= 130 && sysAverage < 140) || (diaAverage >= 80 && diaAverage <90)){
            return 'high (S.1)';
        }

        else if((sysAverage >= 140 && sysAverage < 180) || diaAverage >= 90 && diaAverage <120){
            return 'high (S.2)';
        }

        else if((sysAverage >= 180) || diaAverage >= 120){
            return 'hyper crisis';
        }

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


    // =================== Write Input into record ================
    let writeInput = (values) => {
        const numberOfColumn = 5;

        // add new record row
        $('.record-detail').append("<div class=\"record-row\"></div>")
        
        //add new span
        for(let i = 0; i < numberOfColumn; i++){
            $('.record-row').last().append('<span></span>');
            $('.record-row').last().children().eq(i).text(values[i]);
        }
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
    $('#enter-button').on('click',function(){
       let validityPass = checkFormValidity();
    //    Re-calculate current average blood pressure
       if(validityPass){
        //  create record Values
        let recordValues = createValues();
        // write values to records
            writeInput(recordValues);

           let result = calculateAverage();
           console.log(generateBPResult(result[0],result[1]));

           repositionIndicator(result[0]);

       }
    })

})