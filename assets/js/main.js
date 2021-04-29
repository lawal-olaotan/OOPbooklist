

const nextBtn = document.querySelector('#nextbtn'),
 mobileView = window.matchMedia("(max-width:450px)"),
 reviewcarol = document.querySelector('#review-carousel'),
 carol = document.querySelector('.main-carousel');



 let flicky;

 let coverimgs;


//getting keys for Bestselling Apis 
// const NY = config.NYT_KEY;


document.addEventListener('DOMContentLoaded', function(){

    // intilizing flick for review carousel and books card 
    

    flick(reviewcarol,true,false,true,false);


    const cardTemp = (data) => {

        return `<div class="bookbody">
                            <div class="card bookcard carousel-cell">
                                <div  class="card-img-top position-relative">
                                        <img id="${data.book_details[0].author}" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/book%20placeholder.png" class="card-pic img-thumbnail p-0 border-0"  alt="card image">
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


        bookdata = data.data.results;
        data = bookdata.slice(0,5);
        console.log(data);
       if(data.length){
           carol.classList.add('is-draggable');

        //    data.forEach(label => {

        //         carol.insertAdjacentHTML("afterbegin",cardTemp(label));
        //         let bookrank = label.rank
        //         let authorkey = label.book_details[0].author;
        //         let titleKey = label.book_details[0].title;
        //         getKeys(bookrank,authorkey,titleKey); 
        //    });

           data.map(label => {
               
            carol.insertAdjacentHTML("afterbegin",cardTemp(label));
            let bookrank = label.rank
            let authorkey = label.book_details[0].author;
            let titleKey = label.book_details[0].title;
            getKeys(bookrank,authorkey,titleKey); 

           })

            // for(let label of data){

            //     carol.insertAdjacentHTML("afterbegin",cardTemp(label));
            //     let bookrank = label.rank
            //     let authorkey = label.book_details[0].author;
            //     let titleKey = label.book_details[0].title;
            //     getKeys(bookrank,authorkey,titleKey);        
            // }
       }

        flick(carol,false,true,false,true);

         function getKeys(rank,author,title){

            axios.get('https://www.googleapis.com/books/v1/volumes?q='+ title + "+inauthor:"+author+"&key="+"AIzaSyC1fXjcENg0nomgwn8cDCYxaTBCS2dUSlk")
            .then(data => {
                let picdata = data.data.items[0].volumeInfo.imageLinks.thumbnail;
                    picdata = picdata.replace(/^http:\/\//i, 'https://');

                    coverimgs= document.querySelectorAll('.card-pic');
                    
                    for(coverimg of coverimgs){
                        if(author === coverimg.id){
                            coverimg.setAttribute("src",picdata);
                        }
                    }

            })
            .catch(error=>{
                console.log(error)
            })
        
        
         }

        

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

// flick library initilization
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

 

 

