const slidercont = document.querySelector('#container');
const nextBtn = document.querySelector('#nextbtn');
const glider = slidercont.querySelector('.glider')

document.addEventListener('DOMContentLoaded', function(){

    new Glider(glider),{
        slidesToShow:3,
        slidesToScroll:2,
        draggble:true,
        arrows:{
            next: nextBtn,
        }
    }
    console.log('content loaded');
    
});


