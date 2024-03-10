//Selectors
const todoInput = document.querySelector('.todo-input')         
const todoButton = document.querySelector('.todo-button')
const todoList= document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')


//Event Listener
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);


//Functions
function addTodo(event) {
    //prevent the form from submiting / prevent the reload
    event.preventDefault();
    // console.log(Date.now())
    //add Todo Div.
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //add todo list
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo)
    //Add TODO To LocalStorage
    saveLocalTodos(todoInput.value)
    //Add check  mark button
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check"> </i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)
    //Add trash mark button
    const trashButton = document.createElement('button')
    trashButton.innerHTML = "<i class= 'fas fa-trash'> </i>"
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton);
    //append this div into the todo-list
    todoList.appendChild(todoDiv);
    //Clear Todo INPUT VALUE
    todoInput.value = "";
}


function deleteCheck(e){
   const item = e.target;
   console.log(item)
   //Delete todo
   if(item.classList[0] === 'trash-btn'){
       const todo = item.parentElement
       //Animation
       todo.classList.add('fall');
       removeLocalTodos(todo);
       todo.addEventListener('transitionend', function() {
        todo.remove();
       })    
   }
   //Check MARK
   if(item.classList[0] === 'complete-btn'){
    const todo = item.parentElement
    todo.classList.toggle('completed')
    // todo.style.opacity =  0.8;
   }
}

function filterTodo(e) {
    const todos = todoList.querySelectorAll('.todo');
    console.log(todos)
    todos.forEach(function(todo) {
        switch(e.target.value){
            case "all":
                todo.style.display = "flex"
            break ;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                    todo.style.opacity = 0.8
                }
                else{
                    todo.style.display = "none";
                }
                break;
                case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display ='none'
                }
        }
    })  
}


//storing in local storage
function saveLocalTodos(todo){
    //check--Do I already have things in there?
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo)
    localStorage.setItem('todos',JSON.stringify(todos));
}
function getTodos(){
    let todos ;
    if(localStorage.getItem('todos')=== null ) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){
    //Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //add todo list
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo)
    //Add check  mark button
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check"> </i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)
    //Add trash mark button
    const trashButton = document.createElement('button')
    trashButton.innerHTML = "<i class= 'fas fa-trash'> </i>"
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton);
    //append this div into the todo-list
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    //check--Do I already have things in there?
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos));   
}




