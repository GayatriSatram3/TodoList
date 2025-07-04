let todoList = getTodoList();
let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");
let userInputElement = document.getElementById("userInputElement");

let todosCount = todoList.length;

function createAndAppendTodo(todo) {
    let labelId = "label" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("list");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let mycontainer = document.createElement("div");
    mycontainer.classList.add("flex-rows");
    todoElement.appendChild(mycontainer);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkboxInput");
    mycontainer.appendChild(inputElement);

    let container = document.createElement("div");
    container.classList.add("container", "flex-rows");
    mycontainer.appendChild(container);

    let labelElement = document.createElement("label");
    labelElement.classList.add("label-input");
    labelElement.id = labelId;
    labelElement.setAttribute("for", checkboxId);
    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    container.appendChild(labelElement);

    inputElement.onclick = function () {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-container");
    container.appendChild(deleteContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash", "delete-icon");
    deleteIcon.onclick = function () {
        deleteTodoItem(todoId);
    };
    deleteContainer.appendChild(deleteIcon);
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);

    labelElement.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function (eachTodo) {
        return "todo" + eachTodo.uniqueNo === todoId;
    });

    if (todoObjectIndex !== -1) {
        todoList[todoObjectIndex].isChecked = checkboxElement.checked;
    }
}

function deleteTodoItem(todoId) {
    let deleteElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(deleteElement);

    let deleteElementIndex = todoList.findIndex(function (eachTodo) {
        return "todo" + eachTodo.uniqueNo === todoId;
    });

    if (deleteElementIndex !== -1) {
        todoList.splice(deleteElementIndex, 1);
    }
}

function onAddTodo() {
    let userInput = userInputElement.value.trim();

    if (userInput === "") {
        alert("Enter valid text");
        return;
    }

    todosCount++;
    let newTodo = {
        text: userInput,
        uniqueNo: todosCount,
        isChecked: false
    };

    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}

function saveTodoList() {
    localStorage.setItem("todolist", JSON.stringify(todoList));
}

function getTodoList() {
    let stringifiedTodoList = localStorage.getItem("todolist");
    let parsedList = JSON.parse(stringifiedTodoList);
    return parsedList === null ? [] : parsedList;
}

addTodoButton.onclick = function () {
    onAddTodo();
};

saveTodoButton.onclick = function () {
    saveTodoList();
};

for (let todo of todoList) {
    createAndAppendTodo(todo);
}
