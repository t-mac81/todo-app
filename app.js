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
  //   const newTodo = document.createElement('li');
  //   newTodo.innerText = todo.text;
  //   const newCheckBox = document.createElement('input');
  //   newCheckBox.setAttribute('type', 'checkbox');
  //   const removeButton = document.createElement('button');
  //   removeButton.innerText = 'Delete';
  //   removeButton.className = 'remove';
  //   todoList.append(newTodo);
  //   newTodo.append(removeButton);
  //   newTodo.prepend(newCheckBox);
  //   newTodo.dataset.id = todo.id;
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
  const todoText = todoInput.value;
  const todo = createTodo(todoText, id);
  storeTodos(todo);
  todoInput.value = '';
});

const storeTodos = (todoObject) => {
  id++;
  savedTodoList.push(todoObject);
  localStorage.setItem('savedTodoList', JSON.stringify(savedTodoList));
  localStorage.setItem('id', id);
};
