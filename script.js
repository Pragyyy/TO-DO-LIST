document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;

    if (taskInput.value.trim() === '') return alert('Please enter a task!');

    const taskItem = document.createElement('li');
    taskItem.className = `priority-${priority}`;

    taskItem.innerHTML = `
        <div class="task-checkbox-container">
            <input type="checkbox" class="task-checkbox">
        </div>
        <span class="task-text">${taskInput.value} <small>(${dueDate || 'No Due Date'})</small></span>
        <div class="task-buttons">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    document.getElementById('taskList').appendChild(taskItem);
    taskInput.value = '';
    animateTask(taskItem);

    // Mark Task as Completed
    taskItem.querySelector('.task-checkbox').addEventListener('change', (e) => toggleComplete(taskItem, e.target.checked));

    // Edit Task
    taskItem.querySelector('.edit-btn').addEventListener('click', () => editTask(taskItem));

    // Delete Task
    taskItem.querySelector('.delete-btn').addEventListener('click', () => deleteTask(taskItem));
}

function animateTask(taskItem) {
    taskItem.style.opacity = 0;
    taskItem.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        taskItem.style.opacity = 1;
        taskItem.style.transform = 'translateY(0)';
    }, 50);
}

function toggleComplete(taskItem, isChecked) {
    const taskText = taskItem.querySelector('.task-text');
    if (isChecked) {
        taskText.classList.add('completed');
        taskItem.style.backgroundColor = '#e0ffe0';
    } else {
        taskText.classList.remove('completed');
        taskItem.style.backgroundColor = '#f9f9f9';
    }
}

function editTask(taskItem) {
    const taskText = taskItem.querySelector('.task-text').textContent.split('(')[0].trim();
    document.getElementById('taskInput').value = taskText;
    deleteTask(taskItem);
}

function deleteTask(taskItem) {
    taskItem.style.transform = 'translateX(100%)';
    taskItem.style.opacity = 0;
    setTimeout(() => taskItem.remove(), 300);
}
