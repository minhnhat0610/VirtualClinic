import {sendDataToServer} from "./server.js";

let checkLogin = (callback) => {
    let checkLoginServer = '../PHP/checkLoginSession.php';
    sendDataToServer("",checkLoginServer).then(function(result){
        console.log(result);
        if(parseInt(result)){
            callback();
        }
        else{
            $(".sign-in-again-alert").toggleClass('hide');
        }
    })
    .catch(function(error){
        console.log(error);
    })
}


export {checkLogin}