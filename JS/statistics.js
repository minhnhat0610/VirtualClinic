$(document).ready(function(){
    const screenSize = $('body').width();
    const breakPoint = 1200;
    // ========= Radio Icon click function==========
    let ChangeStyle = (icon) =>{
        $('.inner-icon').removeClass('selected');
        icon.children('.inner-icon').addClass('selected');

    }

    $('.switch-container').on('click',function(e){
        let radioIcon = $(e.currentTarget).children('.radio-icon');
        ChangeStyle(radioIcon);
    })


    // ============= Data Column hover function =============
    $('.data').on('mouseenter', function(e){
        $(e.currentTarget).children('.data-value').addClass('show-value');
    })

    $('.data').on('mouseleave', function(e){
        $('.data-value').removeClass('show-value');
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