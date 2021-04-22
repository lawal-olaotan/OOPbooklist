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

    // intilizing flick for review carousel and books card 
    flick(carol,false,true,false,true);
    flick(reviewcarol,true,false,true,false);

    // the view all button
    nextBtn.addEventListener('click', e =>{
        e.preventDefault();

        if(mobileView.matches){
            index = 5; 
        }else{
           index = 3;
        }
        flick(carol,false,true);

        flicky.next(false,false);

    });



    
});

