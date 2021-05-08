
const forgotpass = document.querySelector('#forgotpass'),
        loginbtn = document.querySelector('#forgetlogin'),
ResetForm = document.querySelector('#ResetForm'),
passwordForm = document.querySelector('#passwordForm'),
loginform = document.querySelector('#loginForm');


let passemail = passwordForm.email,
    firstpass = passwordForm.password,
    secpass = passwordForm.confirmpass;

// forgeterror
forgeterror = document.querySelector('.servermessage');

document.addEventListener('DOMContentLoaded', function(){
    
    if(forgotpass || loginbtn){
        forgotpass.addEventListener('click',showAndHideLogin)
        loginbtn.addEventListener('click',showAndHideLogin )
    }
   
    ResetForm.addEventListener('submit', e => {
        const resetBtn = ResetForm.lastElementChild;
        e.preventDefault();

        let email = ResetForm.email.value;
        

        if(ResetForm){

            if(email === ''){
                forgeterror.textContent = 'Please Insert your email';
                forgeterror.classList.add('errornotification');
            }else{

                data = {email: email}
                axios.post('/users/reset',data)
                .then( res=> {

                    if(res.data){

                        if(res.data.status === 'noinput'){
                            forgeterror.textContent = 'Please Insert your email';
                            forgeterror.classList.add('errornotification');
                        }
            
                        if(res.data.status === 'norecord'){
                            forgeterror.textContent = "User doesn't exist";
                            forgeterror.classList.add('errornotification');
                        }

                        if(typeof res.data.status !== 'undefined' && res.data.status === 'successful'){

                            resetBtn.innerHTML = '<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>';

                            setTimeout(function(){
                                passwordForm.classList.remove('showform');
                                ResetForm.classList.add('showform');
                                passemail.value= email;
                                
                            },2000) 
                        }

                    }
                })
            }
        } 
    })

    passwordForm.addEventListener('submit',e =>{
        e.preventDefault();

        let passdata = {password:firstpass.value,confirmpassword:secpass.value}

        axios.post('/users/updatePass',passdata)
        .then(res => {
            if(res.data){

                serverResponse('checkpassword','All fields are required');

                serverResponse('passnomatch','Password do not match');

                if(typeof res.data.status !== 'undefined' && res.data.status === 'successful'){

                    resetBtn.innerHTML = '<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>';

                    setTimeout(function(){
                        window.location.replace("http://localhost/users/login")
                    },2000) 
                }
                
            }
        })



    } )



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

function serverResponse(statusmess,errormessage){

    if(res.data.status === statusmess){
        forgeterror.textContent = errormessage;
        forgeterror.classList.add('errornotification');
    }
}