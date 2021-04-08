// ES5 classes

// Book Constructor
function Book(title,author,recomm){
    this.title = title;
    this.author = author;
    this.recomm = recomm;
};


const bookForm = document.getElementById('book-form'),
    booktitle = bookForm.booktitle,
    recom = bookForm.recom,
    author = bookForm.author;


const List = document.getElementById('booklist');



//functionality Constructor
function App(){};


// add book to list
App.prototype.addBookToList = function(data){
    // wrapper 
 
    // creating table row
    const row = document.createElement('tr');

  row.innerHTML = `
  <td>${data.title}</td>
  <td>${data.recomm}</td>
  <td>${data.author}</td>
  <td  ><i  class="fas fa-times delete"></i></td>
  `;
  List.appendChild(row);
  
}


// clear form
App.prototype.clearForm = function (){
    bookForm.reset();
}


App.prototype.ShowAlert = function(messg,Eleclass){

    const errorcontainer = document.createElement('div');
    
    const appContainer = document.querySelector('.container');

    errorcontainer.classList.add(Eleclass);
    errorcontainer.appendChild(document.createTextNode(messg));

    errorcontainer.style.padding = '2% 4%';
    
   appContainer.insertBefore(errorcontainer,bookForm);
  
   setTimeout(function(){
       errorcontainer.remove();
   },3000)
 
}



App.prototype.deletedItem = function (targetE){
 
    if(targetE){
        let row = targetE.parentElement.parentElement;
        row.remove();
        console.log(row);
    }else{
        console.log("you're not on target");
    }

}


document.addEventListener('DOMContentLoaded', function(){

    bookForm.addEventListener('submit', e=>{

        e.preventDefault();
        const appfunc = new App()

        if(booktitle.value === '' || recom.value === '' || author.value === ''){
             console.log('one of your input is empty');
             appfunc.ShowAlert('Kindly All Inputs','error');
        
        }else{

            const book = new Book(booktitle.value,author.value,recom.value);
           
            appfunc.addBookToList(book)
            appfunc.clearForm();
            appfunc.ShowAlert('New Book added to your library', 'success');
        }
        
        
    });


    List.addEventListener('click', e => {

        e.preventDefault();
        let tRow = e.target.closest('i');

        let appfunc = new App();

        appfunc.deletedItem(tRow);
    
    
    })

   

});


