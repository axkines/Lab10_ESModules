// ===== ГЛАВНЫЙ МОДУЛЬ ПРИЛОЖЕНИЯ =====

// Импорт модуля управления задачами
import {
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted
} from "./modules/tasks.js";

// Импорт модуля интерфейса
import {
    renderTasks,
    updateStats
} from "./modules/ui.js";

// Импорт модуля хранения
import {
    saveTasks,
    loadTasks
} from "./modules/storage.js";

// ===== ПОЛУЧЕНИЕ HTML-ЭЛЕМЕНТОВ =====

const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

const totalCount = document.querySelector("#total-count");
const completedCount = document.querySelector("#completed-count");

const emptyMessage = document.querySelector("#empty-message");
const errorMessage = document.querySelector("#error-message");
const clearButton = document.querySelector("#clear-completed");

// ===== ЗАГРУЗКА СОХРАНЁННЫХ ЗАДАЧ =====

let tasks = loadTasks();

// ===== ОБНОВЛЕНИЕ ИНТЕРФЕЙСА =====

function updateInterface() {
    renderTasks(
        tasks,
        taskList,
        handleToggle,
        handleDelete
    );

    updateStats(
        tasks,
        totalCount,
        completedCount,
        emptyMessage
    );

    saveTasks(tasks);
}

// ===== ДОБАВЛЕНИЕ ЗАДАЧИ =====

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (!text) {
        errorMessage.textContent = "Введите название задачи!";
        taskInput.focus();
        return;
    }

    if (text.length > 100) {
        errorMessage.textContent =
            "Максимальная длина задачи — 100 символов!";
        return;
    }

    tasks = addTask(tasks, text);

    taskInput.value = "";
    errorMessage.textContent = "";

    updateInterface();
});

// ===== ИЗМЕНЕНИЕ СТАТУСА =====

function handleToggle(id) {
    tasks = toggleTask(tasks, id);
    updateInterface();
}

// ===== УДАЛЕНИЕ ЗАДАЧИ =====

function handleDelete(id) {
    tasks = deleteTask(tasks, id);
    updateInterface();
}

// ===== УДАЛЕНИЕ ВЫПОЛНЕННЫХ ЗАДАЧ =====

clearButton.addEventListener("click", function() {
    tasks = clearCompleted(tasks);
    updateInterface();
});

// ===== ПЕРВОНАЧАЛЬНЫЙ ЗАПУСК =====

updateInterface();
