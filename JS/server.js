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

export {sendDataToServer}