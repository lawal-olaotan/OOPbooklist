
const nextBtn = document.querySelector('#nextbtn'),
 mobileView = window.matchMedia("(max-width:450px)"),
 reviewcarol = document.querySelector('#review-carousel'),
 carol = document.querySelector('.main-carousel');



 let flicky;

//getting keys for Bestselling Apis 
// const NY = config.NYT_KEY;


document.addEventListener('DOMContentLoaded', function(){

    // intilizing flick for review carousel and books card 
    

    flick(reviewcarol,true,false,true,false);


    const cardTemp = (data) => {

        return `<div class="bookbody">
                            <div class="card bookcard carousel-cell">
                                <div class="card-img-top position-relative">
                                        <img src="../assets/Book-keeper/merlin_182628279_659e4566-75fd-4237-b819-43bb0aa82804-articleLarge.jpeg" class="card-pic img-thumbnail p-0 border-0" src="" alt="card image">
                                        <div class="placeholder d-flex justify-content-center align-items-center w-100 h-100">
                                            <a class="btn bok-btn btn-sm"id="homeadd" href="#">Add to Books</a>
                                        </div>
                                </div>
                                <div class="card-body">
                                    <div class="container flex-column flex-lg-row p-0">
                                        <p class="card-title fw-bold booktitle">Title: ${data.book_details[0].title}</p>
                                    </div>
                                    <p class="card-text bookauthor">Author: ${data.book_details[0].author}</p>
                                    <p class="card-text bookpara">${data.book_details[0].description}</p>
                                </div>
                            </div>
                </div>`; 
    };

    

    axios.get('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=yHo5Zw1Leq9PI2WacGtwhmmRNWaUdWEM')
    .then(data =>{ 

       let bookdata = data.data.results;
        data = bookdata.slice(0,5);
       if(data.length){
           carol.classList.add('is-draggable');
            for(let label of data){
                carol.insertAdjacentHTML("afterbegin",cardTemp(label));
            }
       }

        flick(carol,false,true,false,true);

    })
    .catch(error=>{
        console.log(error)
    })


    // navbar scroll effect
    window.addEventListener('scroll',scrollHeader);


    // the view all button
    nextBtn.addEventListener('click', e =>{

        e.preventDefault();
        if(mobileView.matches){
            flicky.select(5,false,false);  
        }else{
            flicky.next(false,false);
        }

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