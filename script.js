
// Add floating elements to the background
function addFloatingElements() {
    const colors = ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.08)', 'rgba(255,255,255,0.12)'];
for (let i = 0; i < 8; i++) {
        const el = document.createElement('div');
        el.className = 'floating absolute rounded-full pointer-events-none';
        el.style.width = `${Math.random() * 200 + 50}px`;
        el.style.height = el.style.width;
        el.style.background = colors[Math.floor(Math.random() * colors.length)];
        el.style.left = `${Math.random() * 100}%`;
        el.style.top = `${Math.random() * 100}%`;
        el.style.filter = 'blur(40px)';
        el.style.animationDelay = `${Math.random() * 5}s`;
        document.body.appendChild(el);
    }
}

addFloatingElements();

// Notes functionality
if (document.getElementById('notesContainer')) {
    const notesContainer = document.getElementById('notesContainer');
    const newNoteBtn = document.getElementById('newNoteBtn');
    const noteEditor = document.getElementById('noteEditor');
    const closeEditor = document.getElementById('closeEditor');
    const saveNote = document.getElementById('saveNote');
    const deleteNote = document.getElementById('deleteNote');
    const noteTitle = document.getElementById('noteTitle');
    const noteContent = document.getElementById('noteContent');
    
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let currentNoteId = null;

    function renderNotes() {
        notesContainer.innerHTML = '';
        notes.forEach(note => {
            const noteEl = document.createElement('div');
            noteEl.className = 'bg-white text-black p-6 rounded-lg hover:bg-gray-100 transition cursor-pointer';
            noteEl.innerHTML = `
                <h3 class="text-xl font-medium mb-2 truncate">${note.title || 'Untitled Note'}</h3>
                <p class="text-gray-700 line-clamp-3">${note.content || 'No content'}</p>
            `;
            noteEl.addEventListener('click', () => openEditor(note.id));
            notesContainer.appendChild(noteEl);
        });
    }

    function openEditor(id = null) {
        currentNoteId = id;
        const note = id ? notes.find(note => note.id === id) : null;
        
        noteTitle.value = note ? note.title : '';
        noteContent.value = note ? note.content : '';
        
        noteEditor.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeEditorModal() {
        noteEditor.classList.add('hidden');
        document.body.style.overflow = 'auto';
        currentNoteId = null;
    }

    function saveCurrentNote() {
        const title = noteTitle.value.trim();
        const content = noteContent.value.trim();
        
        if (!title && !content) {
            if (currentNoteId) {
                deleteCurrentNote();
            }
            return;
        }
        
        if (currentNoteId) {
            // Update existing note
            const index = notes.findIndex(note => note.id === currentNoteId);
            notes[index] = { id: currentNoteId, title, content };
        } else {
            // Create new note
            const newNote = {
                id: Date.now().toString(),
                title,
                content
            };
            notes.unshift(newNote);
        }
        
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
        closeEditorModal();
    }

    function deleteCurrentNote() {
        if (!currentNoteId) return;
        
        notes = notes.filter(note => note.id !== currentNoteId);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
        closeEditorModal();
    }

    newNoteBtn.addEventListener('click', () => openEditor());
    closeEditor.addEventListener('click', closeEditorModal);
    saveNote.addEventListener('click', saveCurrentNote);
    deleteNote.addEventListener('click', deleteCurrentNote);

    // Close editor when clicking outside
    noteEditor.addEventListener('click', (e) => {
        if (e.target === noteEditor) {
            closeEditorModal();
        }
    });

    renderNotes();
}

// Tasks functionality
if (document.getElementById('tasksContainer')) {
    const tasksContainer = document.getElementById('tasksContainer');
    const newTaskInput = document.getElementById('newTaskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const clearCompleted = document.getElementById('clearCompleted');
    const taskCount = document.getElementById('taskCount');
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        tasksContainer.innerHTML = '';
        tasks.forEach(task => {
            const taskEl = document.createElement('div');
            taskEl.className = `bg-white text-black p-4 rounded-lg flex items-center ${task.completed ? 'opacity-60' : ''}`;
            taskEl.innerHTML = `
                <label class="flex items-center cursor-pointer w-full">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} class="mr-4 w-5 h-5">
                    <span class="${task.completed ? 'line-through' : ''}">${task.text}</span>
                </label>
                <button class="text-gray-500 hover:text-black ml-auto">
                    <i data-feather="trash-2" class="w-4 h-4"></i>
                </button>
            `;
            
            const checkbox = taskEl.querySelector('input');
            const deleteBtn = taskEl.querySelector('button');
            
            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            });
            
            deleteBtn.addEventListener('click', () => {
                tasks = tasks.filter(t => t.id !== task.id);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            });
            
            tasksContainer.appendChild(taskEl);
        });
        
        updateTaskCount();
    }

    function addTask() {
        const text = newTaskInput.value.trim();
        if (!text) return;
        
        tasks.push({
            id: Date.now().toString(),
            text,
            completed: false
        });
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
        newTaskInput.value = '';
        renderTasks();
    }

    function clearCompletedTasks() {
        tasks = tasks.filter(task => !task.completed);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function updateTaskCount() {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        taskCount.textContent = `${completed} of ${total} tasks completed`;
    }

    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
    
    addTaskBtn.addEventListener('click', addTask);
    clearCompleted.addEventListener('click', clearCompletedTasks);

    renderTasks();
}