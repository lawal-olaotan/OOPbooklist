
let googleBookKey = config.GOOGLE_KEY; 


const bookForm = document.querySelector('#bookform');
let bookData = {},buylink,reviewlink;

const bookItems = document.querySelectorAll(".book__bookitem"),
        prev = document.querySelector("#prev"),
        next = document.querySelector("#next"),
        bookwrapper = document.querySelector("#bookwrapper");


const mobileQuery = window.matchMedia("(max-width:425px)");


let row;

if(mobileQuery.matches){
    row = 2;
}else{
    row = 4;
}

let currentPage = 1,
 bookArray = Array.from(bookItems),
 pagecount = Math.ceil(bookArray.length/row);



const deleteAcc = document.querySelector('#deleteaccount');




let bookDel = document.querySelectorAll(".book__delete");

let dashnavBtn = document.querySelector(".book__toggleBtn");

document.addEventListener('DOMContentLoaded', function(){


        window.addEventListener('click', e => {
            let dashnav = document.querySelector('.dashnav');

            if(dashnavBtn.contains(e.target)){
                dashnav.classList.add('mobilebtn')
                
            }else if(dashnav.contains(e.target)){
                dashnav.classList.add('mobilebtn');
            }else{
                dashnav.classList.remove('mobilebtn');
            }
           
        })


    for(let del of bookDel ){
        del.addEventListener('click', e=>{

            let book = e.target.parentElement.parentElement
            let bookId = book.id;
            bookId = {bookId};
            book.parentElement.parentElement.remove();
            axios.post('/dashboard/deletebooks',bookId)
            .then(res => {
                if(typeof res.data.status !== 'undefined' && res.data.status === 'successful'){
                    window.location.replace("/dashboard/books") 

                }

            }).catch(error=>{
                console.log(error)
            })
        })
    }
        

    bookForm.addEventListener('submit', e=>{

        e.preventDefault();

        
        let title = bookForm.title,
            author = bookForm.author,
            recom = bookForm.recom;

            bookData = {recom:recom.value}
            getLinks(author.value,title.value);
           

    })

    prev.addEventListener('click', e=> {
        if(currentPage > 1){
            prev.disabled = false;
            currentPage--;
            displayBooks (bookArray,bookwrapper,row,currentPage)
        }
    })

   next.addEventListener('click', e=>{
        
        if(pagecount > currentPage){
            currentPage++;
            displayBooks (bookArray,bookwrapper,row,currentPage)
        }
   })

    displayBooks (bookArray,bookwrapper,row,currentPage)

}); 



// get images , ratings , title and author and review link

function getLinks(author,title){
    
    axios.get('https://www.googleapis.com/books/v1/volumes?q='+ title +'+inauthor:'+author+'&key='+googleBookKey)
    .then(data => {

        if(data){

             let volLink = data.data.items[0].volumeInfo;

             let volLink2 = data.data.items[1].volumeInfo;

             let volLink3 = data.data.items[2].volumeInfo;

             bookData.review= volLink.canonicalVolumeLink;
             bookData.title = volLink.title;

             let googImg = volLink.imageLinks;

             if(googImg !== undefined){
                 bookData.images = googImg.thumbnail
             }else{
                 bookData.images = volLink2.imageLinks.thumbnail;
             }

             let rating = volLink.averageRating;

             if(rating !== undefined){
                 bookData.rating = rating
             }else if(volLink2.averageRating !== undefined){
                 bookData.rating = volLink2.averageRating
             }else{
                 bookData.rating = volLink3.averageRating;
             }

             let googauthor = volLink.authors;
             if(googauthor !== undefined){
                 bookData.author = googauthor[0]
             }else{
                 bookData.author = volLink2.authors[0]
             }

             let descrip = volLink.description;
            
            // //  working version 
            //  if(descrip !== undefined){
            //      descripArry = descrip.split(/[•./;]/);
            //  }else{
            //      descrip = volLink2.description;
            //       descripArry = descrip.split(/[•./;]/);
                 
            //  }

            //  bookData.descrip =  descripArry[0]

            descrip = descrip.substring(0,Math.min(descrip.length,150));
            bookData.descrip = descrip;
        }
        sendData(bookData);
      
    })
    .catch(error=>{
        console.log(error)
        alert('Author not found');
    })

}



function sendData(data){


    axios.post('/dashboard/mybooks',data)
            .then(res => {

                if(typeof res.data.status !== 'undefined' && res.data.status === 'successful'){

                    setTimeout(window.location.replace("/dashboard/books"),5000)
                }
            }).catch(error=>{
                console.log(error)

            })

}



function displayBooks (books,wrapper,row,page){

    if(books.length >= 1){
        wrapper.innerHTML = '';
        page--;
        let start = row * page;
        let end = start + row;
        let paginatedBooks = books.slice(start,end);

        for(book of paginatedBooks){
            wrapper.insertAdjacentElement('afterbegin', book);
        }

    }else{

        let animcontainer = document.querySelector("#animcontainer");
        animcontainer.classList.remove('book__nobooks');
    }
    

}











