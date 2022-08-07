const todoForm = document.querySelector("#todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector("#todo-list");

let toDos = [];

const TODOS_KEY = "todos";

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((todo) => todo.id !== parseInt(li.id));
  saveToDos();
}

function paintTodo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.todo;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteTodo);
  li.appendChild(span);
  li.appendChild(button);
  todoList.appendChild(li);
}

function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = {
    todo: todoInput.value,
    id: Date.now(),
  };
  todoInput.value = "";
  console.log(newTodo);
  toDos.push(newTodo);
  paintTodo(newTodo);
  saveToDos();
}

todoForm.addEventListener("submit", handleTodoSubmit);

const loadTodo = localStorage.getItem(TODOS_KEY);

if (loadTodo === null) {
} else {
  console.log(loadTodo);
  const newArray = JSON.parse(loadTodo);
  console.log(newArray);
  newArray.forEach((currentElement) => {
    toDos.push(currentElement);
    paintTodo(currentElement);
  });
}
