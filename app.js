//variable
const nodeList = document.querySelector('#note-list')



//eventlisteners
eventlisteners()

function eventlisteners(){
    //form submission
    document.querySelector('#form').addEventListener('submit' , newNot)
    
    //remove note
    document.querySelector('#note-list').addEventListener('click',removeNote)
    
    //get data from localStorade on loaded
    document.addEventListener('DOMContentLoaded' , localStorageOnLoad)
}


//functions

// adding new note to the list  
function newNot(e){
    e.preventDefault()

    //  access to the value
    const note = document.querySelector('#note').value

    // creat remove element
    const removeBtn = document.createElement('a')
    removeBtn.textContent = 'x'
    removeBtn.classList = 'remove-note'

    //ceate <li> tag
    const li = document.createElement('li') 

    // adding note in the li
    li.appendChild(document.createTextNode(note))

    // ading removeBtn in the li
    li.appendChild(removeBtn)
 
    // adding li in the noteList
    nodeList.appendChild(li)

    this.reset()

    addNodeToTheLocaleStorage(note)

    alert("یادداشت با موفقیت ذخیره شد :)")
}
    
//remove note
function removeNote(e){
    if(e.target.classList.contains('remove-note')){
    e.target.parentElement.remove()

    removeNoteLocaleStorage(e.target.parentElement.textContent);
    }
}
 
// adding note to the localStorage
function addNodeToTheLocaleStorage(note) {
    //get the from localeStorage
    const notes = getnotefromlocalStorage()

    //add new note to the note array
    notes.push(note)

    // add new note array to the localStorage
    localStorage.setItem('notes' ,JSON.stringify(notes))
    
    
}

//get note from localStorage
function getnotefromlocalStorage(){
    let notes;  

    // get previous note from localStorage
    let getFromLs = localStorage.getItem('notes')
    if(getFromLs === null){
        notes = []
    } else{
        notes = JSON.parse(getFromLs)
    } 
    return notes;
}

//get data from localStorage on load
function localStorageOnLoad(){
    const notes = getnotefromlocalStorage();
    
    notes.forEach(function(note) {
        // creat remove element
    const removeBtn = document.createElement('a')
    removeBtn.textContent = 'x'
    removeBtn.classList = 'remove-note'

    //ceate <li> tag
    const li = document.createElement('li') 

    // adding note in the li
    li.appendChild(document.createTextNode(note))

    // ading removeBtn in the li
    li.appendChild(removeBtn)
 
    // adding li in the noteList
    nodeList.appendChild(li)


    });
} 

//also remove note from localStorage
function removeNoteLocaleStorage(notecontent){

       // delete x from to the contetn
       const noteDelete = notecontent.substring(0 , notecontent.length -1)
       
       // get note from localeStorage
       const noteFromLs = getnotefromlocalStorage()

       noteFromLs.forEach(function(note , index) {
            if(note === noteDelete ){
                noteFromLs.splice(index , 1)
            }
        
       });
    
       //set new array of note to the localStorage
       localStorage.setItem('notes' , JSON.stringify(noteFromLs) )

}


