let titles = [];
let notes = [];
load();

function render(){
    list.innerHTML='';
    loadNotes();
}


function addNote(){
    let title = document.getElementById('title');
    let note = document.getElementById('note');
    let requiredText = document.getElementById('requiredText');

    if(note.value <= 0 || title.value <= 0){
        requiredText.innerHTML = 'Bitte Titel und Notiz ausfüllen!'
        return;
    }else{
        titles.push(title.value);
        notes.push(note.value);
        
        requiredText.innerHTML = '';
        note.value = '';
        title.value = '';
    }

    render();
    save();
}


function loadNotes(){
    document.getElementById('list');
    for(let i = 0; i < notes.length; i++){
        list.innerHTML +=`
        <div class="container" id="item${i}">
            <h2 contenteditable="false" spellcheck="false"> ${titles[i]} </h2>
            <span contenteditable="false" spellcheck="false">${notes[i]}</span>
            <div class="buttons">
                <button onclick="edit(${i})" id="btn${i}">Edit</button>
                <button onclick="remove(${i})">X</button>
            </div>
        </div>
        `
    }
}
// ${titles[i]==''?'':'<h2 contenteditable="false" spellcheck="false">' + titles[i] + '</h2>'} incase for titleless notes

function remove(i) {
    titles.splice(i, 1);
    notes.splice(i, 1);
    render();
    save();
}


function edit(i) {
    const parent = document.querySelector(`#item${i}`);
    const title = parent.querySelector('h2');
    const note = parent.querySelector('span');
    
    changeButton(i, '#f24b4b', 'Stop', 'stopEdit'); //changes button to stop
    if(title){
        title.contentEditable = "true";
    }
    note.contentEditable = "true";
    noteFocus(note);
}


function noteFocus(note) {
    note.focus();
    window.getSelection().selectAllChildren(note);
    window.getSelection().collapseToEnd(); //fokus am ende 
}


function stopEdit(i) {
    const parent = document.querySelector(`#item${i}`);
    const title = parent.querySelector('h2');
    const note = parent.querySelector('span');
    
    updateText(i, title, note);
    changeButton(i, 'var(--teal)', 'Edit',  'edit') //changes button to edit
    if (title){
        title.contentEditable = "false";
    }
    note.contentEditable = "false";
}


function changeButton(i, color, btnText, btnFunc){ // switch between edit and stop
    let button = document.getElementById(`btn${i}`);
    button.style.backgroundColor = `${color}`;
    button.innerHTML = `${btnText}`
    button.setAttribute("onclick",  `${btnFunc}(${i})`)
} 


function updateText(i, title, note) {
    titles[i] = title.textContent;
    notes[i] = note.textContent;
    save();
}


// LOCAL STORAGE 

function save(){
    let localTitles = JSON.stringify(titles);
    let localNotes = JSON.stringify(notes);
    
    localStorage.setItem('titles', localTitles);
    localStorage.setItem('notes', localNotes);
}


function load(){
    let getTitles = localStorage.getItem('titles');
    let getNotes = localStorage.getItem('notes');
    if (getTitles && getNotes){
        titles = JSON.parse(getTitles);
        notes = JSON.parse(getNotes);
    }
}