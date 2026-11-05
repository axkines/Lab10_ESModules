// ===== МОДУЛЬ УПРАВЛЕНИЯ ЗАДАЧАМИ =====

// Создание новой задачи
export function createTask(text) {
    return {
        id: Date.now() + Math.random(),
        text: text.trim(),
        completed: false
    };
}

// Добавление задачи в массив
export function addTask(tasks, text) {
    if (!text || !text.trim()) {
        return tasks;
    }

    const newTask = createTask(text);

    return [...tasks, newTask];
}

// Изменение статуса задачи
export function toggleTask(tasks, id) {
    return tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );
}

// Удаление задачи
export function deleteTask(tasks, id) {
    return tasks.filter(task => task.id !== id);
}

// Удаление всех выполненных задач
export function clearCompleted(tasks) {
    return tasks.filter(task => !task.completed);
}

// Подсчёт статистики
export function getTaskStats(tasks) {
    return {
        total: tasks.length,
        completed: tasks.filter(task => task.completed).length
    };
}
