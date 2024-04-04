document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                            <input type="checkbox" ${task.completed ? "checked" : ""} class="completed-checkbox">
                            <span class="${task.completed ? "completed" : ""}">${task.text}</span>
                            <button class="edit-btn" data-index="${index}">Edit</button>
                            <button class="delete-btn" data-index="${index}">Delete</button>
                        `;
            taskList.appendChild(li);
        });
    }

    renderTasks();

    function addTask(text) {
        tasks.push({ text, completed: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }

    function editTask(index, newText) {
        tasks[index].text = newText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }

    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = "";
        }
    });

    taskList.addEventListener("click", function (event) {
        if (event.target.classList.contains("edit-btn")) {
            const index = event.target.getAttribute("data-index");
            const newText = prompt("Enter new task text:", tasks[index].text);
            if (newText !== null) {
                editTask(index, newText.trim());
            }
        } else if (event.target.classList.contains("delete-btn")) {
            const index = event.target.getAttribute("data-index");
            deleteTask(index);
        } else if (event.target.classList.contains("completed-checkbox")) {
            const index = event.target.parentElement.querySelector("span").classList.toggle("completed");
            toggleTaskCompletion(index);
        }
    });
});
