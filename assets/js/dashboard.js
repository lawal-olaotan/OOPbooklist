
const bookForm = document.querySelector('#bookform');
let bookData,buylink,reviewlink;




document.addEventListener('DOMContentLoaded', function(){
    
    bookForm.addEventListener('submit', e=>{

        e.preventDefault();
 
        
        let title = bookForm.title,
            author = bookForm.author,
            recom = bookForm.recom;

            bookData = {recom:recom.value}
            getLinks(author.value,title.value);
           

    })

   

}); 


// get images , ratings , title and author and review link

function getLinks(author,title){
    
    axios.get('https://www.googleapis.com/books/v1/volumes?q='+ title + "+inauthor:"+author+"&key="+"AIzaSyC1fXjcENg0nomgwn8cDCYxaTBCS2dUSlk")
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
             let discripArry;
            
             if(descrip !== undefined){
                 descripArry = descrip.split(/[•.]/);
             }else{
                 descrip = volLink2.description;
                  descripArry = descrip.split(/[•.]/);
                 
             }

             bookData.descrip =  descripArry[0]

        }

        sendData(bookData);
    })
    .catch(error=>{
        console.log(error)
    })

 }



// function getReview(author,title){

//     axios.get('https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?title=' + title +'&author='+ author+'&api-key=yHo5Zw1Leq9PI2WacGtwhmmRNWaUdWEM')
//     .then(data => {

//         if(data){
//              let results = data.data.results
            
//         }

//         console.log(bookData);
//         // sendData(bookData);
        
//     })
//     .catch(error=>{
//         console.log(error)
//     })

//  }



function sendData(data){

    axios.post('/dashboard/mybooks',data)
            .then(res => {

                if(typeof res.data.status !== 'undefined' && res.data.status === 'successful'){
                    window.location.replace("http://localhost:5505/dashboard/books")
                }
            }).catch(error=>{
                console.log(error)
            })

}


