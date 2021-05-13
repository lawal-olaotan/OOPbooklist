
const bookForm = document.querySelector('#bookform');




document.addEventListener('DOMContentLoaded', function(){

    
    bookForm.addEventListener('submit', e=>{

        e.preventDefault();
        
        
        let title = bookForm.title,
            author = bookForm.author,
            recom = bookForm.recom,
            data = {title:title.value,author:author.value,recom:recom.value};
            axios.post('/dashboard/mybooks', data)
            .then(res => {

                if(typeof res.data.status !== 'undefined' && res.data.status === 'successful'){
                    console.log(data)
                }
            })

            

    })

}); 



// function addBooks(data){

//     const bookwrapper = document.querySelector('#bookwrapper');

    
//     const bookTemp = `<div class="book__bookitem my-3 d-flex align-items-center justify-content-between p-3">

//                         <div class="book__bookcontent">
//                             <p class="book__text m-0 fw-bold"><span>Book Title: ${data.booktitle}</span></p>
//                             <hr class="book__divider">
//                             <p class="book__text m-0"><span>Author :${data.author}</span></p>
//                             <hr class="book__divider">
//                             <p class="book__text m-0"><span>Recommended By: ${data.recom}</span></p>
//                         </div>

//                         <div class="book__bookaction d-flex flex-column align-items-center">
//                             <a href="#"class="book__cta py-2 px-4 mb-3 rounded-3">Reviews</a>
//                             <a href="#" class="book__cta p-2 rounded-3">Buy Online</a>
//                         </div>
//                     </div>`;


//                     if(data.length){
//                         reviewcarol.classList.add('is-draggable');
//                         bookwrapper.innerHTML = ''
            
//                         bookwrapper.insertAdjacentHTML("afterbegin",bookTemp)
                       
//                     }

    
// }