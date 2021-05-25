



 
function postData(data){
    axios.post('/dashboard/mybooks',data)
    .then(res => {

        if(typeof res.data.status !== 'undefined' && res.data.status === 'successful'){
            toastStat("View Books",'New Book Added to your book-keeper™','success')
            ToastEle.show();
        }

    }).catch(error=>{
        console.log(error)
        toastStat("Login",'Kindly Login to add books','failed')
        ToastEle.show();
    })
}


function toastStat(btnText,toastmes,status){

    

    toastBtn = document.querySelector(".primary"),
    toastText = document.querySelector(".toast-message");
    confirmation = document.querySelector(".confirmation");

    toastBtn.textContent = btnText
    toastText.textContent = toastmes;
    confirmation.textContent = status
       
}

