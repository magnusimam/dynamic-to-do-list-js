// Wait for the DOM to load before running the app
document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Array to hold tasks in memory
  let tasks = [];

  // Save tasks array to localStorage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Render the tasks array into the DOM
  function renderTasks() {
    // Clear current list
    taskList.innerHTML = '';

    // Create list items for each task
    tasks.forEach((taskText, index) => {
      const li = document.createElement('li');
      li.textContent = taskText;

      // Create remove button
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.classList.add('remove-btn'); // use classList.add as required

      // When clicked, remove the task from the tasks array, update storage and re-render
      removeBtn.addEventListener('click', () => {
        tasks.splice(index, 1); // remove from array
        saveTasks();            // persist change
        renderTasks();          // refresh UI
      });

      // Append remove button and the li to the list
      li.appendChild(removeBtn);
      taskList.appendChild(li);
    });
  }

  // Add a task. If taskText is provided, use it; otherwise read from the input.
  // The 'save' flag controls whether the task should be saved to localStorage.
  function addTask(taskText = null, save = true) {
    const text = (taskText !== null) ? taskText.trim() : taskInput.value.trim();

    if (text === '') {
      alert('Please enter a task!');
      return;
    }

    // Add to in-memory array
    tasks.push(text);

    // Save to localStorage if requested
    if (save) {
      saveTasks();
    }

    // Re-render and clear input
    renderTasks();
    taskInput.value = '';
  }

  // Load tasks from localStorage into the tasks array, then render them.
  function loadTasks() {
    const stored = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Use addTask(task, false) pattern to avoid writing back to storage while loading
    // (we already have the array from storage)
    tasks = []; // ensure fresh
    stored.forEach(taskText => addTask(taskText, false));
  }

  // Attach event listeners
  addButton.addEventListener('click', () => addTask());
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Initialize app
  loadTasks();
});
