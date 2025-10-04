
document.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(addTaskToList);
});

document.getElementById('task-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('task-input');
  const task = input.value.trim();

  if (task) {
    addTaskToList(task);
    saveTask(task);
    input.value = '';
  }
});

function addTaskToList(task) {
  const li = document.createElement('li');
  li.textContent = task;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Eliminar';
  deleteBtn.onclick = () => {
    li.remove();
    deleteTask(task);
  };

  li.appendChild(deleteBtn);
  document.getElementById('task-list').appendChild(li);
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function deleteTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(t => t !== task);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registrado'))
    .catch(err => console.error('Error al registrar el Service Worker', err));
}
