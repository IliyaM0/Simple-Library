const inputText = document.querySelector(".add-book input");
const link = document.querySelector(".add-book button");
const ul = document.querySelector(".books");
const checkBox = document.querySelector("#hide-books");
const inputSearch = document.querySelector(".search-box");


link.addEventListener("click", function (e) {
    e.preventDefault();
    if (inputText.value.trim() !== "") {
        const li = document.createElement("li");
        li.className = "book-item";

        const bookDiv = document.createElement("div");
        bookDiv.className = "book-details";
        bookDiv.textContent = inputText.value;

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Delete";
        btnDelete.className = "btn-delete";
        bookDiv.appendChild(btnDelete);
        li.appendChild(bookDiv);

        storeToLocalStorage(inputText.value);

        ul.appendChild(li);
        inputText.value = "";
    }
});


ul.addEventListener("click", function (e) {
    if (e.target.className === "btn-delete") {
        const bookDiv = e.target.parentElement;
        bookDiv.parentElement.remove();
        removeFromLocalStorage(
            bookDiv.textContent.replace("Delete", "").trim()
        );
    }
});


checkBox.addEventListener("change", function (e) {
    if (checkBox.checked === true) {
        ul.style.display = "none";
    } else {
        ul.style.display = "block";
    }
});


inputSearch.addEventListener("keyup", function (e) {
    e.preventDefault();

    for (let book of ul.children) {
        if (
            book.firstElementChild.textContent.indexOf(inputSearch.value) !== -1
        ) {
            book.style.display = "block";
        } else {
            book.style.display = "none";
        }
    }
});


document.addEventListener("DOMContentLoaded", function (e) {
    e.preventDefault();
    let tasks;
    try {
        tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    } catch (error) {
        tasks = [];
    }

    for (let item of tasks) {
        const li = document.createElement("li");
        li.className = "book-item";

        const bookDiv = document.createElement("div");
        bookDiv.className = "book-details";
        bookDiv.textContent = item;

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Delete";
        btnDelete.className = "btn-delete";
        bookDiv.appendChild(btnDelete);
        li.appendChild(bookDiv);

        ul.appendChild(li);
    }
});

function storeToLocalStorage(task) {
    let tasks;
    try {
        tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    } catch (error) {
        tasks = [];
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeFromLocalStorage(task) {
    let tasks;
    try {
        tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    } catch (error) {
        tasks = [];
    }
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i] === task) {
            tasks.splice(i, 1);
        }
    }

    if (tasks.length === 0) {
        localStorage.clear();
    } else {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

document.querySelector(".add-book").addEventListener("submit", function (e) {
    e.preventDefault();
});
