
const bookForm = document.querySelector('#bookform');


document.addEventListener('DOMContentLoaded', function(){

    
    bookForm.addEventListener('submit', e=>{

        e.preventDefault();
        
        let title = bookForm.title,
            author = bookForm.author,
            recom = bookForm.recom,
            data = {title:title.value,author:author.value,recom:recom.value};
        
        console.log(data);
    })

}); 