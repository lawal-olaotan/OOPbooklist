




const nextBtn = document.querySelector('#nextbtn'),
 mobileView = window.matchMedia("(max-width:450px)"),
 reviewcarol = document.querySelector('#review-carousel'),
 carol = document.querySelector('.main-carousel');

 let flicky,homefun;

let bsBook; 

let bookToast = document.querySelector(".toast"),
 options = {autohide : true,
             delay: 5000,}







class Homepagefuncs{

    flick(flickEle,dots,prevandNext,autoP,gCell){

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

     loadcard(){

        const cardTemp = (data) => {
    
            return `<div class="bookbody">
                                <div class="card bookcard carousel-cell">
                                    <div  class="card-img-top position-relative">
                                            <img id="${data.book_details[0].author}" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/book%20placeholder.png" class="card-pic img-thumbnail p-0 border-0"  alt="card image">
                                            <div class="placeholder d-flex justify-content-center align-items-center w-100 h-100">
                                                <a onclick="putBook(event)" data-descrip="${data.book_details[0].description}" data-title="${data.book_details[0].title}" data-author ="${data.book_details[0].author}" class="btn bok-btn btn-sm">Add to Books</a>
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
            data = bookdata.slice(0,5).reverse();
           if(data.length){
               carol.classList.add('is-draggable');
    
        
               data.map(label => {
    
                carol.insertAdjacentHTML("afterbegin",cardTemp(label));
                let authorkey = label.book_details[0].author;
                let titleKey = label.book_details[0].title;
                let descripKey = label.book_details[0].description;

                getKeys(authorkey,titleKey); 
    
               })
    
           }
            let homefun = new Homepagefuncs();
            homefun.flick(carol,false,true,false,true);
    
            
    
             function getKeys(author,title){
    
                axios.get('https://www.googleapis.com/books/v1/volumes?q='+ title + "+inauthor:"+author+"&key="+"AIzaSyC1fXjcENg0nomgwn8cDCYxaTBCS2dUSlk")
                .then(data => {
                    let picdata = data.data.items[0].volumeInfo.imageLinks.thumbnail,
                     rating = data.data.items[0].volumeInfo.averageRating,
                     link = data.data.items[0].volumeInfo.canonicalVolumeLink;
                        picdata = picdata.replace(/^http:\/\//i, 'https://');

                        let coverimgs= document.querySelectorAll('.card-pic');

                        let coverimg;

                        for(coverimg of coverimgs){
                            if(author === coverimg.id){
                                coverimg.setAttribute("src",picdata);
                                coverimg.setAttribute("data-link",link)
                                coverimg.setAttribute("data-rating",rating)
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
    };

    RenderWork(){

        const workTemp = (data) => {
    
            return `<div class="col-sm-4">
    
                <div class="card border-0">
    
                    <div class="card-body">
    
                        <div class="works__img mb-3">
                            <img class="works__pic" src="${data.imgpath}" alt="first step">
                        </div>
    
                        <h5 class="works__cardtitle card-title fw-bold">${data.Title}</h5>
                        <p class=" works__cardtext ncard-text">${data.description}</p>
    
                    </div>
    
                </div>
    
            </div>`;
    
        }
    
        axios.get(window.location.origin + '/assets/data/works.json')
        .then(data => {
            let steps = data.data.reverse();
            if(steps.length){
                const worksWrapper = document.getElementById('workswrapper');
                worksWrapper.innerHTML = '';
                for(let step of steps){
                    worksWrapper.insertAdjacentHTML("afterbegin",workTemp(step))
                }
            }
        })
    
        // this checks for error when our data is about to be rendered
        .catch(error =>{
            console.log(error)
        })
    }

    loadreview(){

        const reviewTemp = (data) => {
            return ` 
            <div class="col-sm-6 col-lg-4 review p-0 carousel-cell">
        
                            <div class="card cell-style border-0">
        
                                <div class="card-body">
    
                                    <div class="container d-flex p-0">
    
                                        <div class="review__img">
                                            <img class="review__pic" src="${data.reviweravatar}" alt="first review">
                                        </div>
                                        
                                        <div class="container p-0">
                                            <div class="container ">
                                                <p class="card-title review__name fw-bold">${data.name}</p>
                                                <p class="card-subtitle review__location"> <span>${data.city}</span>, <span>${data.country}</span> | <span>${data.year}</span></p>
                                            </div>
                                            
                                            <div class="container my-3">
                                                <p class="review__text card-text">${data.reviewcontent}</p>
                                            </div>
                                           
                                        </div>
                                    
                                    </div>
    
                                </div>
        
                            </div>
        
                        </div>`;
        }
        axios.get(window.location.origin + '/assets/data/review.json')
        .then(data => {
            let reviewDatas = data.data.reverse();
            if(reviewDatas.length){
                reviewcarol.classList.add('is-draggable');
                reviewcarol.innerHTML = ''
    
                for(let reviewData of reviewDatas){
                    reviewcarol.insertAdjacentHTML("afterbegin",reviewTemp(reviewData))
                }
            }
            homefun = new Homepagefuncs();
            homefun.flick(reviewcarol,true,false,true,false);
        })
    
    }

    

}


function loadFile(url){
    let script = document.createElement("script");
    script.src = url
    document.head.appendChild(script);

}; 


document.addEventListener('DOMContentLoaded', function(){

    loadFile('/assets/js/senddata.js');

    ToastEle = new bootstrap.Toast(bookToast,options)


    const homeFuncs = new Homepagefuncs(); 
    
    // navbar scroll effect
    window.addEventListener('scroll',e=>{
        const navbar = document.querySelector('#secnavbar');
    if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
        navbar.classList.add('scrollbag');
    }else{    
        navbar.classList.remove('scrollbag');
    }

    });


    // loading our card section
    homeFuncs.loadcard();

    homeFuncs.RenderWork();

    homeFuncs.loadreview();

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


 
function putBook(event){

    let tarEle = event.target;
    title = tarEle.getAttribute('data-title'),
    author = tarEle.getAttribute('data-author'),
    description = tarEle.getAttribute("data-descrip");

    let picParent = tarEle.parentElement.parentElement,
     eleTemp = picParent.querySelector(".card-pic"),
        pic = eleTemp.getAttribute('src'),
     rating = eleTemp.getAttribute('data-rating'),
     review = eleTemp.getAttribute("data-link");

    let bsBook = {title:title, author:author,descrip:description,images:pic,review:review,rating:rating,recom:'NewYork Time'}

    postData(bsBook);

}





