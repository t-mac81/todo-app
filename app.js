const todoSubmit = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
let id = Number(localStorage.getItem('id')) || 0;
const savedTodoList = JSON.parse(localStorage.getItem('savedTodoList')) || [];

//populate todo list from local storage
for (todo of savedTodoList) {
  const newTodo = document.createElement('li');
  newTodo.innerText = todo.text;
  const newCheckBox = document.createElement('input');
  newCheckBox.setAttribute('type', 'checkbox');
  const removeButton = document.createElement('button');
  removeButton.innerText = 'Delete';
  removeButton.className = 'remove';
  todoList.append(newTodo);
  newTodo.append(removeButton);
  newTodo.prepend(newCheckBox);
  newTodo.dataset.id = todo.id;
}

// Event delegation for delete button and checkbox
todoList.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    e.target.parentElement.remove();
    //modify local storage array and store (use array.splice)
  } else if (e.target.tagName === 'INPUT') {
    e.target.parentElement.classList.toggle('checked');
    // modify savedTodoList and store
  }
});

todoSubmit.addEventListener('submit', (e) => {
  e.preventDefault();
  createTodo();
  todoInput.value = '';
});

// Create Todo and add to local storage
const createTodo = () => {
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  // Create todo Object:
  const todoObject = {
    id: id,
    text: newTodo.innerText,
    checked: false,
  };

  const newCheckBox = document.createElement('input');
  newCheckBox.setAttribute('type', 'checkbox');
  const removeButton = document.createElement('button');
  removeButton.innerText = 'Delete';
  removeButton.className = 'remove';
  todoList.append(newTodo);
  newTodo.append(removeButton);
  newTodo.prepend(newCheckBox);
  newTodo.dataset.id = id;

  // push todo object to array and add to local storage:
  savedTodoList.push(todoObject);
  id++;
  localStorage.setItem('savedTodoList', JSON.stringify(savedTodoList));
  localStorage.setItem('id', id);
};
