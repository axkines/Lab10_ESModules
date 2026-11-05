// ===== МОДУЛЬ ХРАНЕНИЯ ДАННЫХ =====

const STORAGE_KEY = "taskflow_tasks";

// Сохранение задач в браузере
export function saveTasks(tasks) {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(tasks)
        );

        return true;
    } catch (error) {
        console.error("Ошибка сохранения задач:", error);
        return false;
    }
}

// Загрузка задач из браузера
export function loadTasks() {
    try {
        const savedTasks = localStorage.getItem(STORAGE_KEY);

        if (!savedTasks) {
            return [];
        }

        const tasks = JSON.parse(savedTasks);

        if (!Array.isArray(tasks)) {
            return [];
        }

        return tasks.filter(task =>
            task &&
            typeof task.id === "number" &&
            typeof task.text === "string" &&
            typeof task.completed === "boolean"
        );

    } catch (error) {
        console.error("Ошибка загрузки задач:", error);
        return [];
    }
}
