
const forgotpass = document.querySelector('#forgotpass'),
        loginbtn = document.querySelector('#forgetlogin'),
ResetForm = document.querySelector('#ResetForm'),
loginform = document.querySelector('#loginForm');





document.addEventListener('DOMContentLoaded', function(){
    
    forgotpass.addEventListener('click',showAndHideLogin)
    loginbtn.addEventListener('click',showAndHideLogin )
})


function showAndHideLogin(e){

    if(e.currentTarget === forgotpass){
        ResetForm.classList.remove('showform'); 
        loginform.classList.add('showform');
    }else{
        ResetForm.classList.add('showform'); 
        loginform.classList.remove('showform');
    }
   
}