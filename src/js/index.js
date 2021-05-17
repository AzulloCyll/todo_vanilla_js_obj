
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

    set taskList(value) {
        if (this.todos) {
            this.todos = [...this.todos, ...value];
        } else {
            this.todos = value;
        }

        this.todos.map((i) => todoApp1.addTodo(i, this.todoEl));
    }

    sortList(value) {
        let todos = Array.from(this.todos);
        let lis = document.getElementsByTagName("li");
        while (lis.length > 0) {
            lis[0].remove();
        }
        this.todos = [];

        switch (value) {
            case "az":
                todos = todos.sort((a, b) => a.localeCompare(b));
                this.todos = todos;
                return this.todos;
                break;
            case "za":
                todos = todos.sort((a, b) => b.localeCompare(a));
                this.todos = todos;
                return this.todos;
                break;
        }
    };
}

//pomocnicza
function showList(app) {
    for (let i = 0; i < app.todos.length; i++) {
        Todo.addTodoEl(app.todos[i], appEl);
    };
}

// const buttonShow = document.getElementById("show");
// buttonShow.onclick = function (e) {
//     const pShowEl = document.getElementById("show-window");
//     pShowEl.textContent = console.log(todoApp1.taskList);
// };

const buttonAdd = document.getElementById("addTodoButton");
buttonAdd.onclick = function (e) {
    const textEl = document.getElementById("addTodoText");
    const todo = textEl.value.trim();
    Todo.addTodoEl(todo, appEl);
    todoApp1.addTodo(todo);
};

const buttonAZ = document.getElementsByClassName("az")[0];
buttonAZ.onclick = function (e) {
    todoApp1.sortList("az");
    showList(todoApp1);
};

const buttonZA = document.getElementsByClassName("za")[0];
buttonZA.onclick = function (e) {
    todoApp1.sortList("za");
    showList(todoApp1);
};

const todoApp1 = new Todo; // stworzenie instancji Todo
const appEl = document.getElementById("app1");


Todo.addTodoEl("Zadanie pierwsze", appEl);
todoApp1.addTodo("Zadanie pierwsze");
Todo.addTodoEl("Zadanie drugie", appEl);
todoApp1.addTodo("Zadanie drugie");

console.log(todoApp1.taskList);

// todoApp1.delButtonHandler();

