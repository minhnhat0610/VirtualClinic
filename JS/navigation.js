$(document).ready(function(){
    //========= Menu icon click function ============
    $('.menu-icon').on('click',function(){
        const mobileMenuContainer = $('.mobile-nav ul');
        const desktopMenuContainer = $('.desktop-nav ul');
        const screenSize = $('body').width();
        const breakpoint = 1200;
        let itemsList;
        // ===== Rotate Menu Icon=======
        $(this).toggleClass('rotate-menu-icon')

        // ======= function for mobile======
        
        if(screenSize < breakpoint){
           itemsList = mobileMenuContainer.children();
        }

        else{
            itemsList = desktopMenuContainer.children();
        }

        let length = itemsList.length;
        let delayTime = 0;
        for(let i=0; i< length; i++){
            itemsList.eq(i).toggleClass('menu-reveal');
            itemsList.eq(i).css({
                transitionDelay: delayTime + 'ms'
            })
            delayTime += 100;
        }
    })
})