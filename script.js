// Run code after DOM has fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // get & trim input value

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create a new li element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        // ✅ use classList.add as required
        removeBtn.classList.add('remove-btn');

        // Assign an onclick event to remove the li element
        removeBtn.onclick = () => {
            taskList.removeChild(li);
        };

        // Append remove button to li, then li to taskList
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
    }

    // Add an event listener to the Add Task button
    addButton.addEventListener('click', addTask);

    // Add an event listener for pressing Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
