import {sendDataToServer} from "./server.js"
import {checkLogin} from "./checkLoginInfor.js";
import {generateBPResult} from "./generateBPResult.js";
$(document).ready(function(){
    const screenSize = $('body').width();
    const breakPoint = 1200;
    const LoadRecordServer = "../PHP/loadRecord.php";
    let dataCollection;

    //============== Calculate average statistics ==============
    let calculateAverage = (dataCollection) => {
        let numOfRecord = dataCollection.length;
        let averageSys = 0, averageDia = 0;
        dataCollection.forEach(function(record){
            averageSys += parseInt(record[0])/numOfRecord;
            averageDia += parseInt(record[1])/numOfRecord;
        })


        $('#average-sys').text(parseFloat(averageSys).toFixed(1));
        $('#average-dia').text(parseFloat(averageDia).toFixed(1));

        // Generate Blood Pressure status
        let BPStatus = generateBPResult(parseFloat(averageSys).toFixed(1), parseFloat(averageDia).toFixed(1))
        $('#bp-status').text(BPStatus);
    }

    // =========== Find Max and Min values =======================
    let FindMaxMin = (dataCollection) => {
        let initialSys = dataCollection[0][0]
        let initialDia = dataCollection[0][1]
        let maxSys = initialSys, minSys = initialSys, maxDia = initialDia, minDia = initialDia;
        dataCollection.forEach(record => {
            if(record[0]>maxSys){
                maxSys = record[0]
            }

            if(record[0]<minSys){
                minSys = record[0]
            }
            
            if(record[1]>maxDia){
                maxSys = record[1]
            }

            if(record[1]<minDia){
                minDia = record[1]
            }
        })

        $('#max-sys').text(maxSys);
        $('#min-sys').text(minSys);
        $('#max-dia').text(maxDia);
        $('#min-dia').text(minDia);

    }

    // ============ Diplay data on chart =============
    let displayData = (values,typeOfdata,container, hightLimit) => {
        let valueContainer = container.find('.value-inner-container');

        // insert new div data and its value
        valueContainer.append("<div class=\"data\"></div>");

        let data = valueContainer.children('.data');
        data.last().append("<p class=\"data-value\"></p>");
        data.last().children("p").text(values[typeOfdata]);

        // calculate data column height
        let columnHeight = parseInt(values[typeOfdata]) / hightLimit * 100;
        data.last().css({
            height: columnHeight + "%"
        })
    }
    
    //============== Display Date on Chart ================
    let displayDate = (values, typeOfdata, container) =>{
        container.append("<span></span>")
        container.children("span").last().text(values[typeOfdata]);
    }


    // ============== Call back function after successfull check login information ====================
    let finishLoading = () =>{
        // Load record from server
        sendDataToServer("",LoadRecordServer).then(function(response){
            dataCollection = JSON.parse(response);

            dataCollection.forEach(record => {
                //display Sys data
                displayData(record,"Sys",$('#sys-data'),210);
                //load Dia data but not display
                displayData(record,"Dia",$('#dia-data'),150);
                //display Date
                displayDate(record,"Date", $('#sys-data .date-container'));
                displayDate(record,"Date", $('#dia-data .date-container'))

            })

            //Calculate Average statistics
            calculateAverage(dataCollection);
            // Find max and min of Sys and Dia
            FindMaxMin(dataCollection);
            // Reveal body content 
            $('.title').toggleClass('title-hide');
            $('.chart-container').toggleClass('chart-hide');
            $('.report-container').toggleClass('report-hide');
            $('#sys-data .value-inner-container').toggleClass('data-hide');
        })
    }

    // ============ Check with Server for Session login===========
    

    checkLogin(finishLoading);


// =====================================================================================================================================================
        
    // ========= Radio Icon click function==========
    let ChangeStyle = (icon) =>{
        $('.inner-icon').removeClass('selected');
        icon.children('.inner-icon').addClass('selected');

    }

    $('.switch-container').on('click',function(e){
        let currTarget = $(e.currentTarget);
        let radioIcon = currTarget.children('.radio-icon');
        ChangeStyle(radioIcon);
        let index = $('.switch-container').index(currTarget);

        //get corresponding chart base on index
        let thisChart = $('.data-container').eq(index);
        thisChart.css({
            opacity: 1,
            zIndex: 2
        })

        thisChart.siblings('.data-container').css({
            opacity: 0,
            zIndex: 1
        })

        thisChart.find('.value-inner-container').toggleClass('data-hide');
        thisChart.siblings('.data-container').find('.value-inner-container').toggleClass('data-hide');
    })



    // =========== Click to show report on Mobile device=========
    $(document).on('click',function(e){
        if(screenSize < breakPoint){
            let container = $(e.target).parents('.report-container');
            if(container.attr('class') === 'report-container' ||
                container.attr('class') === 'report-container show-report'){
                $('.report-container').addClass('show-report');
                $('.out-focus-background').addClass('out-focus');
            }
            else{
                $('.out-focus-background').removeClass('out-focus');
                $('.report-container').removeClass('show-report');
            }
        }
    })

})