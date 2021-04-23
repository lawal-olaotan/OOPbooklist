
const nextBtn = document.querySelector('#nextbtn'),
 mobileView = window.matchMedia("(max-width:450px)"),
 reviewcarol = document.querySelector('#review-carousel'),
 carol = document.querySelector('.main-carousel');

 let flicky;


 function flick(flickEle,dots,prevandNext,autoP,gCell){

    flicky = new Flickity(flickEle, {
        cellAlign:'left',
        contain:false,
        freeScroll:true,
        pageDots:dots,
        prevNextButtons:prevandNext,
        autoPlay:autoP,
        groupCells:gCell,
        pauseAutoPlayOnHover: false,

    });

 }



 


document.addEventListener('DOMContentLoaded', function(){

    // navbar scroll effect
    window.addEventListener('scroll',scrollHeader);

    // intilizing flick for review carousel and books card 
    flick(carol,false,true,false,true);
    flick(reviewcarol,true,false,true,false);

    // the view all button
    nextBtn.addEventListener('click', e =>{
        
        e.preventDefault();
        flick(carol,false,true,false,true);

        flicky.next(false,false);

    });


});



// header scroll options
function scrollHeader(){
    const navbar = document.querySelector('#secnavbar');
    if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
        navbar.classList.add('scrollbag');
    }else{    
        navbar.classList.remove('scrollbag');
    }
}

