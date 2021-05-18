
const bookForm = document.querySelector('#bookform');
var bookData,buylink,reviewlink;




document.addEventListener('DOMContentLoaded', function(){
    
    bookForm.addEventListener('submit', e=>{

        e.preventDefault();
 
        
        let title = bookForm.title,
            author = bookForm.author,
            recom = bookForm.recom;

            bookData = {title:title.value,author:author.value,recom:recom.value}
            getLinks(author.value,title.value);
           getReview(author.value,title.value);
           

    })

   

}); 


function getLinks(author,title){
    
    axios.get('https://www.googleapis.com/books/v1/volumes?q='+ title + "+inauthor:"+author+"&key="+"AIzaSyC1fXjcENg0nomgwn8cDCYxaTBCS2dUSlk")
    .then(data => {

        if(data){
             buylink = data.data.items[0].saleInfo.buyLink;
             bookData.buylink = buylink;
        }else if(data === 'undefined'){
            buylink.textContent = '#'
            bookData.buylink = buylink;
        }
    })
    .catch(error=>{
        console.log(error)
    })

 }



function getReview(author,title){

    axios.get('https://api.nytimes.com/svc/books/v3/reviews.json?title=' + title +'&author='+ author+'&api-key=yHo5Zw1Leq9PI2WacGtwhmmRNWaUdWEM')
    .then(data => {

        if(data){
             reviewlink = data.data.results[0].url;
             bookData.review = reviewlink;
             sendData(bookData);
        }

      

        
    })
    .catch(error=>{
        console.log(error)
    })

 }



function sendData(data){

    axios.post('/dashboard/mybooks',data)
            .then(res => {

                if(typeof res.data.status !== 'undefined' && res.data.status === 'successful'){
                    console.log(data);
                }
            }).catch(error=>{
                console.log(error)
            })

}


