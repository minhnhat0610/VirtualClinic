$(document).ready(function(){
    // ============ Document Loaded===============
    $('body').addClass('finishLoading');
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
})