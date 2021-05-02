
const signupForm = document.querySelector('#signupForm'),
        EmailInput = signupForm.email,
        passwordInput = signupForm.password,
        nameInput = signupForm.name,
topnav = document.querySelector("#topnav");

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

    topnav.style.display="none";
    // initilizing input method object
    let inputmet = new inputMethods();


    
    signupForm.addEventListener('submit', e=>{

        e.preventDefault();

    let validName =  inputmet.checkName(),
        validEmail = inputmet.checkEmail(),
        validPass = inputmet.checkPassword();



    
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

