// converting it all classes to ES6

class Book {
    constructor(title,author,recomm,id){
        this.title = title;
        this.author = author;
        this.recomm = recomm;
        this.id = id;
    }
}

const bookForm = document.getElementById('book-form'),
    booktitle = bookForm.booktitle,
    recom = bookForm.recom,
    author = bookForm.author;
    let id = new Date().getTime();
   

const List = document.getElementById('booklist');

class App {

    addBooktoList(data){

    // creating table row
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${data.title}</td>
    <td>${data.recomm}</td>
    <td>${data.author}</td>
    <td id="${data.id}"><i  class="fas fa-times delete"></i></td>
    `;

    List.appendChild(row);

    }



    clearForm(){
        bookForm.reset();
    }

    showAlert(messg,Eleclass){

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

    deleteItem(targetE){

        if(targetE){
            let row = targetE.parentElement.parentElement;
            row.remove();
            console.log(row);

        }else{
            console.log("you're not on target");
        }
    }

}

class store {

    
    static getBooks(){
        let books;
        
        if (localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static  displayBooks(){

        const books = store.getBooks();

        books.forEach(book => {
            const Appfun = new App();
            Appfun.addBooktoList(book);
        });

    }

    static  addBooks(data){
    
        const books = store.getBooks();

        books.push(data);
        localStorage.setItem('books',JSON.stringify(books)); 
          
    }

    static  removeBooks(row){
        const books = store.getBooks();
        
        books.forEach((book,index) => {
            if(book.id === parseInt(row)){
                books.splice(index,1);
            }
        });
      
        localStorage.setItem('books',JSON.stringify(books));
    }

}



document.addEventListener('DOMContentLoaded', function(){
    store.displayBooks();

    bookForm.addEventListener('submit', e=>{

        

        e.preventDefault();
        const appfunc = new App()
        // const locStore = new store() we don't need to externciate it because it's a static method 

        if(booktitle.value === '' || recom.value === '' || author.value === ''){
             console.log('one of your input is empty');
             appfunc.showAlert('Kindly All Inputs','error');
        
        }else{
            
            const book = new Book(booktitle.value,author.value,recom.value,id);

            appfunc.addBooktoList(book)

            // add books to local storage 
            store.addBooks(book);
            
            appfunc.clearForm();
            appfunc.showAlert('New Book added to your library', 'success');
        }
        
        
    });


    List.addEventListener('click', e => {

        e.preventDefault();

        let appfunc = new App();
        let tRow = e.target.closest('i');

        let row = tRow.parentElement.id;
        console.log(row);
        appfunc.deleteItem(tRow);

        store.removeBooks(row);


        appfunc.showAlert('Book successfully removed ', 'error');
    
    
    })

});  



function Person(first,last,age,gender,hobby,passion){

    this.name = {
        firstName : first,
        lastName : last 
    }
    this.age = age;
    this.gender = gender;
    this.interests = {
        hobbies : hobby,
         passion : passion
    };
    this.myProfile = () => {
        console.log(this.name.firstName + ' ' + this.name.lastName + ' ' + this.age +' ' + 'years old'+ ' ' + this.gender + ' ' + 'likes' + ' ' + this.interests.hobbies + ' ' + this.interests.passion);
    }
    
    
}

    let person1 = new Person('Leo','Ronaldo', '25','male','coding','singing')
    let person2 = new Person('shade','afemuwa', '32','female','fashion','writing')
    person1.myProfile();
    person2.myProfile();
   

