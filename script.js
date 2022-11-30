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

    if(note.value <= 0 && title.value <= 0){
        return;
    }else{
        titles.push(title.value);
        notes.push(note.value);
    
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
            ${titles[i]==''?'':'<h2 contenteditable="false" spellcheck="false">' + titles[i] + '</h2>'}
            <span contenteditable="false" spellcheck="false">${notes[i]}</span>
            <div class="buttons">
                <button onclick="edit(${i})" id="btn${i}">Edit</button>
                <button onclick="remove(${i})">X</button>
            </div>
        </div>
        `
    }
}


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
    
    // changeStopButton(i)
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



// function changeStopButton(i) {
//     let button = document.getElementById(`btn${i}`);
//     button.style.backgroundColor = 'var(--teal)';
//     button.innerHTML="Edit";
//     button.setAttribute("onclick", `edit(${i})`);
// }

// function changeEditButton(i) {
//     let button = document.getElementById(`btn${i}`);
//     button.style.backgroundColor = '#f24b4b'
//     button.innerHTML="Stop";
//     button.setAttribute("onclick", `stopEdit(${i})`);
// }