const addBtn = document.getElementById('add')
const toggleBtn = document.getElementById('dark-mode')
const body = document.querySelector('body')


const storednotes = JSON.parse(localStorage.getItem('notes'))
if(storednotes) {
    storednotes.forEach(note => addNewNote(note))
}


addBtn.addEventListener('click', () => addNewNote())


function addNewNote(text = '') {
  const note = document.createElement('div');
  note.classList.add('note');

  // Apply dark mode class based on body state
  note.classList.toggle('dark-note', document.body.classList.contains('dark'));

  note.innerHTML = `
    <div class="tools">
      <button class="edit">
        <i class="fas fa-edit"></i>
      </button>
      <button class="delete">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>

    <div class="main ${text ? '' : 'hidden'}"></div>
    <textarea class="${text ? 'hidden' : ''} ${document.body.classList.contains('dark') ? 'dark' : ''}" ${text ? '' : 'placeholder="Write your note here..."'}>${text}</textarea>
  `;

  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete');
  const main = note.querySelector('.main');
  const textArea = note.querySelector('textarea');

  textArea.value = text;
  main.innerHTML = marked(text);

  deleteBtn.addEventListener('click', () => {
    note.remove();
    updateLs();
  });

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  });

  textArea.addEventListener('input', (e) => {
    const { value } = e.target;

    main.innerHTML = marked(value);
    updateLs();
  });

  document.body.appendChild(note);
}

// toggles between dark mode and light mode
toggleBtn.addEventListener('click', () => {
    darkMode();
})

function darkMode() {

    if(body.classList.contains('dark')) {
        body.classList.remove('dark')
        toggleBtn.innerHTML = `
            <i class="fas fa-moon"></i>
        `
        localStorage.setItem('isDarkMode', false)
    } else {
        body.classList.add('dark')
        toggleBtn.innerHTML = `
            <i class="fa-solid fa-sun"></i>
        `
        localStorage.setItem('isDarkMode', true);
    }
    
    const existingNotes = document.querySelectorAll('.note');

    
    existingNotes.forEach(note => {
        if (body.classList.contains('dark')) {
          note.classList.add('dark-note');
          note.querySelector('textarea').classList.add('dark');
        } else {
          note.classList.remove('dark-note');
          note.querySelector('textarea').classList.remove('dark');
        }
      });     
}

function updateLs() {
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))

}

if (localStorage.getItem('isDarkMode') === 'true') {
    darkMode()
} 



