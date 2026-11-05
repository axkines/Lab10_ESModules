// ===== МОДУЛЬ ПОЛЬЗОВАТЕЛЬСКОГО ИНТЕРФЕЙСА =====

// Отображение списка задач
export function renderTasks(tasks, listElement, onToggle, onDelete) {
    listElement.innerHTML = "";

    tasks.forEach(task => {
        const listItem = document.createElement("li");
        listItem.className = "task-item";

        if (task.completed) {
            listItem.classList.add("completed");
        }

        // Галочка выполнения
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            onToggle(task.id);
        });

        // Текст задачи
        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        // Кнопка удаления
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", () => {
            onDelete(task.id);
        });

        listItem.append(checkbox, taskText, deleteButton);

        listElement.appendChild(listItem);
    });
}

// Обновление статистики
export function updateStats(
    tasks,
    totalElement,
    completedElement,
    emptyMessage
) {
    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    totalElement.textContent = total;
    completedElement.textContent = completed;

    emptyMessage.style.display =
        total === 0 ? "block" : "none";
}
