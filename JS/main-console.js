import {sendDataToServer} from "./server.js";
import {checkLogin} from "./checkLoginInfor.js";
$(document).ready(function(){
    // ============ Document Loaded===============
    $('body').addClass('finishLoading');
    checkLogin(function(){});
    

    //==================== Hover effect on container============

    $('.container').on('mouseenter',function(e){
        // Shrink selective container
        $(e.currentTarget).addClass('focus1');
        $(e.currentTarget).children('.inner-container').addClass('focus2');

        //Show indicator
        $(e.currentTarget).find('.indicator').addClass('show-indicator');
    })

    $('.container').on('mouseleave',function(e){
        $('.container').removeClass('focus1');
        $('.inner-container').removeClass('focus2');
        $('.indicator').removeClass('show-indicator');
    })

    // ==================== Sign out Button ==================
    $('#sign-out').on('click',function(){
        let signOutSever = '../PHP/signOut.php';
        sendDataToServer("",signOutSever).then(function(result){
            console.log(result);
            location.href = './index.html';
        })
        .catch(function(error){
            console.log(error);
        })
    })
})