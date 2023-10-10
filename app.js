const todoSubmit = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
let id = Number(localStorage.getItem('id')) || 0;
const savedTodoList = JSON.parse(localStorage.getItem('savedTodoList')) || [];

// re-usable create todo function
const createTodo = (todoText, todoId, checked = false) => {
  const newTodo = document.createElement('li');
  newTodo.innerText = todoText;
  const newCheckBox = document.createElement('input');
  newCheckBox.setAttribute('type', 'checkbox');
  const removeButton = document.createElement('button');
  removeButton.innerText = 'Delete';
  removeButton.className = 'remove';
  todoList.append(newTodo);
  newTodo.append(removeButton);
  newTodo.prepend(newCheckBox);
  newTodo.dataset.id = todoId;
  newCheckBox.checked = checked;
  if (checked) {
    newTodo.classList.toggle('checked');
  }

  // create todo object
  const todoObject = {
    id: id,
    text: todoText,
    checked: checked,
  };
  return todoObject;
};

//populate todo list from local storage
for (todo of savedTodoList) {
  createTodo(todo.text, todo.id, todo.checked);
}

// find savedTodoList array index for delete and checkbox
const findIndex = (datasetId) => {
  const id = Number(datasetId);
  return savedTodoList.findIndex((todo) => todo.id === id);
};

// Event delegation for delete button and checkbox
todoList.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    e.target.parentElement.remove();
    //remove from local storage array and store
    const arrIndex = findIndex(e.target.parentElement.dataset.id);
    savedTodoList.splice(arrIndex, 1);
    localStorage.setItem('savedTodoList', JSON.stringify(savedTodoList));
  } else if (e.target.tagName === 'INPUT') {
    e.target.parentElement.classList.toggle('checked');
    // modify savedTodoList and store when check is toggled
    const arrIndex = findIndex(e.target.parentElement.dataset.id);
    savedTodoList[arrIndex].checked
      ? (savedTodoList[arrIndex].checked = false)
      : (savedTodoList[arrIndex].checked = true);
    localStorage.setItem('savedTodoList', JSON.stringify(savedTodoList));
  }
});

todoSubmit.addEventListener('submit', (e) => {
  e.preventDefault();
  if (todoInput.value.length > 0) {
    const todoText = todoInput.value;
    const todo = createTodo(todoText, id);
    storeTodos(todo);
    todoInput.value = '';
  }
});

// store todoObject in array and local storage
const storeTodos = (todoObject) => {
  id++;
  savedTodoList.push(todoObject);
  localStorage.setItem('savedTodoList', JSON.stringify(savedTodoList));
  localStorage.setItem('id', id);
};
