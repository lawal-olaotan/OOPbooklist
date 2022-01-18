

const signupForm = document.querySelector('#signupForm'),
        EmailInput = signupForm.email,
        passwordInput = signupForm.password,
        nameInput = signupForm.name;

const signUpFormBtn = document.querySelector("#signupbtn"),
        checkBoxEle = document.querySelector('#flexCheckChecked'),
        eyeBtn = document.querySelector("#eyebtn");

let inputParent;

class checkProp{

     inputValue = (input) => {
        let inputval = input.value.trim()
        if(inputval === ''){
            status = false
        }else{
            status = true 
        }
        return inputval;
    }

    // check the input length
    checkMinMax = (len,min,max) => len < min || len > max ? false:true;

    // email address checking value if it contains @ tag and .com 
    emailValid = (emailval) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(emailval);
    
    };


    // show error and success message 
    showMessage(inputEle,message,status){

            inputParent = inputEle.parentElement;
            // grabbing the current Target input element and getting the error message span 

            let textEle = inputParent.querySelector('.message');
            textEle.textContent = message;

            if(status === false){
            // it triggers the border style of the Input container
            inputEle.classList.remove("formsucess");
            inputEle.classList.add("formerror");
            // error message within the Input Container
            textEle.style.color = 'red';

            } else{
            inputEle.classList.remove("formerror");
            inputEle.classList.add("formsucess");
            textEle.style.color = '#0B959E';
            
            }
    }
    
    // variables that test password strength 
    isPasswordSecure = (password) => {
        const re = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        return re.test(password);
    };

}



class inputMethods extends checkProp {

     
    // function to check name 
     checkName(){
        let status = false;
        const min = 3,
        max = 10;
        if(!this.inputValue(nameInput)){
            this.showMessage(nameInput,"Username can't be blank" ,false)
        }else if(!this.checkMinMax(this.inputValue(nameInput).length,min,max)){
                this.showMessage(nameInput,`Username must be between ${min} and ${max} characters.`,false)     
        }else{
            this.showMessage(nameInput,'',true)
            status = true;
        }
        return status;
    };


    checkEmail(){
        let status = false;
        if(!this.inputValue(EmailInput)){
            this.showMessage(EmailInput,"Email can't be blank" ,false) 
        }else if(!this.emailValid(this.inputValue(EmailInput))){
            this.showMessage(EmailInput,"Email is not valid", false)
        }else{
            this.showMessage(EmailInput,'',true)
            passwordInput.parentElement.classList.remove('showform')
            nameInput.parentElement.classList.remove('showform')
            signUpFormBtn.textContent = 'Sign Up'

            status = true;
        }
    
        return status
    }

    checkPassword(){
        let status = false;
    
        if(!this.inputValue(passwordInput)){
            this.showMessage(passwordInput,"Password can't be blank", false)
        }else if(!this.isPasswordSecure(this.inputValue(passwordInput))){
            this.showMessage(passwordInput,"Password must contain a number and capital letter", false)
        }else{
            status = true;
            this.showMessage(passwordInput,"Secure Password",true);
        }
        return status 
    }

    boucingInfo(fn,delay = 500){
        let timeoutId;
        return(...args) => {

            // cancel the previous timer
            if(timeoutId){
                clearTimeout(timeoutId)
            }
            // setup  a new timer 
            timeoutId = setTimeout(() => {
                fn.apply(null,args)
            },delay);
        };
    };

    
}



document.addEventListener('DOMContentLoaded',function(){


    checkBoxEle.addEventListener('change', e=>{
        if(checkBoxEle.checked === false){
            signUpFormBtn.disabled = true
        }else{
            signUpFormBtn.disabled = false;
        }
    })

    // initilizing input method object
    let inputmet = new inputMethods();

    eyeBtn.addEventListener('click', e => {
        if(eyeBtn.classList.contains('fa-eye')){
            passwordInput.type = 'text';
            eyeBtn.classList.add('fa-eye-slash')
            eyeBtn.classList.remove('fa-eye')
        }else{
            passwordInput.type = 'password'
            eyeBtn.classList.remove('fa-eye-slash');
            eyeBtn.classList.add('fa-eye');
        }
    })
    
    signupForm.addEventListener('submit', e=>{

        

        e.preventDefault();

        let validName =  inputmet.checkName(),
        validEmail = inputmet.checkEmail(),
        validPass = inputmet.checkPassword();

        let validForm = validName && validEmail && validPass;

        if(validForm){

            data = { 
                email : EmailInput.value,
                password : passwordInput.value,
                UserName :nameInput.value
            }

            axios.post('/users/register',data)
            .then(res => {
                let serverMess = document.querySelector('#servermess');

                if(res.data){

                    if(res.data.status === 'exists'){
                        serverMess.textContent = 'This user is already registered';
                        serverMess.classList.add('errornotification')
                    }

                    if(res.data.status === 'inputerror'){
                        let serverMess = document.querySelector('#servermess');
                        serverMess.textContent = 'All fields are required';
                        serverMess.classList.add('errornotification')
                    }

                    if(typeof res.data.status !== 'undefined' && res.data.status === 'successful'){

                        signUpFormBtn.innerHTML = '<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>';
                        setTimeout(function(){
                            window.location.assign('https://bk-keeper.herokuapp.com/users/login');
                        },2000) 
                    }
                }
            }).catch(error=>{
                    console.log(error)
                })

           
        
        }


    
        })
        

    signupForm.addEventListener('input', inputmet.boucingInfo(function (e){

        switch (e.target.name){
            case 'name':
                inputmet.checkName();
                break;
            case 'email':
                inputmet.checkEmail();
                break;
            case 'password':
                inputmet.checkPassword();
                break;
        }



    }))

})

