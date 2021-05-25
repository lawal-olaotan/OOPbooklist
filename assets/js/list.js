

const topnav = document.querySelector("#topnav"),
 listWrapper = document.querySelector("#listwrapper");

 function loadFile(url){
    let script = document.createElement("script");
    script.src = url
    document.head.appendChild(script);

};

let bookToast = document.querySelector(".toast"),
options = {autohide : true,
            delay: 5000,}



document.addEventListener('DOMContentLoaded', function(){

    loadFile('/assets/js/senddata.js');
    
    loadlist()
    ToastEle = new bootstrap.Toast(bookToast,options)

})



function loadlist(){
    
    const listTemp = (data) =>{

        return `
        <div class="bestlist__outer col-sm-8 col-lg-10 d-flex justify-content-between align-items-center p-3 ">
                    <p class="bestlist__rank fw-bolder d-flex align-items-center justify-content-center"><span>${data.rank}</span></p>

                    <div class="bestlist__card container p-3 d-flex flex-column flex-md-row justify-content-between align-items-center m-0 ">

                        <div class="bestlist__pic">
                            <img id="${data.book_details[0].author}"  class="bestlist__img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/book%20placeholder.png" alt="">
                        </div>

                        <div class="bestlist__content">
                            <p class="bestlist__title mb-1">Book Title: <span class="booktitle">${data.book_details[0].title}</span></p>
                            <p class="bestlist__authorfw-normal mb-1">Author : <span class="bookauthor">${data.book_details[0].author}</span> </p>
                            <p class="bestlist__descript fw-light mb-1">${data.book_details[0].description}</p>
                        </div>

                        <div class="bestlist__actions d-flex align-items-center justify-content-center flex-column">
                            <a onclick ="listBook(event)" class="bestlist__btn btn mb-3"> Add to Book</a>
                        </div>

                    </div>
                
            </div>`;
    }

    axios.get('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=yHo5Zw1Leq9PI2WacGtwhmmRNWaUdWEM')
        .then(data =>{ 
    
    
            let listdata = data.data.results;
            data = listdata.slice(0,10).reverse();
           if(data.length){
            listWrapper.innerHTML = ''
               data.map(label => {
    
                listWrapper.insertAdjacentHTML("afterbegin",listTemp (label));
                let authorkey = label.book_details[0].author;
                let titleKey = label.book_details[0].title;

                getKeys(authorkey,titleKey); 
    
               })
    
           }
    
             function getKeys(author,title){
    
                axios.get('https://www.googleapis.com/books/v1/volumes?q='+ title + "+inauthor:"+author+"&key="+"AIzaSyC1fXjcENg0nomgwn8cDCYxaTBCS2dUSlk")
                .then(data => {
                    let picdata = data.data.items[0].volumeInfo.imageLinks.thumbnail;
                    let rating = data.data.items[0].volumeInfo.averageRating;
                    let link = data.data.items[0].volumeInfo.canonicalVolumeLink;
                        picdata = picdata.replace(/^http:\/\//i, 'https://');
                        let bookCovers= document.querySelectorAll('.bestlist__img'),
                         coverimg;

                        for(coverimg of bookCovers){
                            if(author === coverimg.id){
                                coverimg.setAttribute("src",picdata);
                                coverimg.setAttribute("data-rating",rating);
                                coverimg.setAttribute("data-link",link);
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
}


function listBook(event){

// variables for list book function 
  let tagEle = event.target.parentElement,
  prev = tagEle.previousElementSibling,
  imgContainer = tagEle.previousElementSibling.previousElementSibling.firstElementChild,


//  data titles 
  title,author,descrip,images,rating,review,

  bsData = {title: getValue(prev,".booktitle",title),author: getValue(prev,".bookauthor",author),descrip:getValue(prev,".bestlist__descript",descrip),recom:"NewYork Times",images:getAtt(imgContainer,"src",images),rating:getAtt(imgContainer,"data-rating",rating),review:getAtt(imgContainer,"data-link",review)}

  postData(bsData)
}

function getValue(parentEle,eleSelect,eleVar){
     eleVar = parentEle.querySelector(eleSelect).textContent
    return eleVar;
}

function getAtt(parentEle,targArt,ele){
    ele = parentEle.getAttribute(targArt)
    return ele;
}