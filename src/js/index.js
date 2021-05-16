
import "core-js/stable";
import "regenerator-runtime/runtime";

class Todo {
    constructor(todos, todoEl) {
        this.todoEl = todoEl;
        this.todos = todos || [];
    }

    //wyswietlanie na ekranie
    static addTodoEl(text, todoEl) {
        var li = document.createElement("li");
        var buttonDel = document.createElement("button");
        var buttonMark = document.createElement("button");
        li.innerHTML = " <span>" + text + "</span> ";
        buttonDel.textContent = "X";
        buttonMark.textContent = "Gotowe";
        li.prepend(buttonMark, buttonDel);
        todoEl && todoEl.appendChild(li);

        //handler init
        todoApp1.delButtonHandler();
        todoApp1.marlButtonhandler();
        return li;
    }

    //usuwanie z ekranu
    static removeTodoEl(text, todoEl) {
        let childs = todoEl && Array.from(todoEl.childNodes);
        let item = childs.find((a) => a.innerText === text);
        return item;
    }

    //dodawanie 
    addTodo(text) {
        this.todos.push(text);
        this.todoEl && this.todoEl.appendChild(Todo.addTodoEl(text, this.todoEl));
    }
    //usuwanie;
    removeTodo(text) {
        let filter = this.todos.filter((a) => a != text);
        this.todoEl && this.todoEl.removeChild(
            Todo.removeTodoEl(text, this.todoEl)
        );
        this.todos = filter;
    }

    //metoda obslugi przycisku usuń
    delButtonHandler() {
        let buttons = document.getElementsByTagName("button");
        buttons = Array.from(buttons);
        const filteredButtons = buttons.filter((a) => a.textContent == "X");
        filteredButtons.forEach(element => {
            element.onclick = function (e) {
                let text = element.parentElement.children[2].textContent;
                e.currentTarget.parentElement.remove();
                todoApp1.removeTodo(text);
            };
        });
    }

    //metoda obslugi przycisku Gotowe
    marlButtonhandler() {
        let buttons = document.getElementsByTagName("button");
        buttons = Array.from(buttons);
        const filteredButtons = buttons.filter((a) => a.textContent == "Gotowe");
        filteredButtons.forEach(element => {
            element.onclick = function (e) { e.currentTarget.parentElement.classList.toggle("deleted"); };
        });
    }

    get taskList() { return this.todos; }
}

const buttonShow = document.getElementById("show");
buttonShow.onclick = function (e) {
    const pShowEl = document.getElementById("show-window");
    pShowEl.textContent = console.log(todoApp1.taskList);
};

const buttonAdd = document.getElementById("addTodoButton");
buttonAdd.onclick = function (e) {
    const textEl = document.getElementById("addTodoText");
    const todo = textEl.value.trim();
    Todo.addTodoEl(todo, appEl);
    todoApp1.addTodo(todo);
};

const todoApp1 = new Todo; // stworzenie instancji Todo
const appEl = document.getElementById("app1");


Todo.addTodoEl("Zadanie pierwsze", appEl);
todoApp1.addTodo("Zadanie pierwsze");
Todo.addTodoEl("Zadanie drugie", appEl);
todoApp1.addTodo("Zadanie drugie");

console.log(todoApp1.taskList);

// todoApp1.delButtonHandler();

