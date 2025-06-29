
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            loginUser();
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            registerUser();
        });
    }
});

function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const storedUser = localStorage.getItem(username);
    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.password === password) {
            alert(`Welcome back, ${username}!`);
            // Redirect to the garden planner page after successful login
            window.location.href = 'planner.html';
        } else {
            alert('Incorrect password.');
        }
    } else {
        alert('User not found.');
    }
}

function registerUser() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (username && email && password) {
        if (localStorage.getItem(username)) {
            alert('Username already exists. Please choose another one.');
        } else {
            const user = {
                email: email,
                password: password
            };
            localStorage.setItem(username, JSON.stringify(user));
            alert(`Thank you for registering, ${username}!`);
            // Redirect to login page after successful registration
            window.location.href = 'login.html';
        }
    } else {
        alert('Please complete all fields.');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    loadSeasonalTasks();
    loadSeasonalSchedule();
    loadSeasonalPlants();
    loadMaintenanceTasks();
    initGardenGrid();
});

document.addEventListener('DOMContentLoaded', () => {
    loadSeasonalTasks();
    loadSeasonalSchedule();
    loadScheduledTasks();
    loadSeasonalPlants();
    loadMaintenanceTasks();
    initGardenGrid();
});

function showTasks() {
    const seasonSelect = document.getElementById('seasonSelect');
    const season = seasonSelect.value;
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear previous list

    const tasks = {
        spring: ['Pruning', 'Soil Preparation', 'Planting Seeds'],
        summer: ['Watering', 'Weeding', 'Harvesting'],
        fall: ['Mulching', 'Planting Bulbs', 'Cleaning Garden'],
        winter: ['Planning', 'Tool Maintenance', 'Indoor Plant Care']
    };

    if (tasks[season]) {
        const ul = document.createElement('ul');
        tasks[season].forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;
            ul.appendChild(li);
        });
        taskList.appendChild(ul);
    } else {
        taskList.textContent = 'No tasks available for this season.';
    }
}

function addSeasonalTask() {
    const seasonTask = document.getElementById('seasonTask').value;
    const taskSeasonSelect = document.getElementById('taskSeasonSelect').value;

    if (seasonTask && taskSeasonSelect) {
        const taskElement = document.createElement('div');
        taskElement.textContent = `${taskSeasonSelect}: ${seasonTask}`;
        const seasonalSchedule = document.getElementById('seasonalSchedule');
        seasonalSchedule.appendChild(taskElement);

        // Save task to local storage
        saveSeasonalTaskToLocalStorage(taskSeasonSelect, seasonTask);
    } else {
        alert('Please enter both task and season.');
    }
}

function saveSeasonalTaskToLocalStorage(season, task) {
    let seasonalTasks = JSON.parse(localStorage.getItem('seasonalTasks')) || [];
    seasonalTasks.push({ season, task });
    localStorage.setItem('seasonalTasks', JSON.stringify(seasonalTasks));
}

function loadSeasonalTasks() {
    const seasonalTasks = JSON.parse(localStorage.getItem('seasonalTasks')) || [];
    const seasonalSchedule = document.getElementById('seasonalSchedule');

    seasonalTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.textContent = `${task.season}: ${task.task}`;
        seasonalSchedule.appendChild(taskElement);
    });
}

function addScheduleTask() {
    const taskDate = document.getElementById('taskDate').value;
    const scheduleTask = document.getElementById('scheduleTask').value;

    if (taskDate && scheduleTask) {
        const taskElement = document.createElement('div');
        taskElement.textContent = `${taskDate}: ${scheduleTask}`;
        const scheduleList = document.getElementById('scheduleList');
        scheduleList.appendChild(taskElement);

        // Save task to local storage
        saveScheduledTaskToLocalStorage(taskDate, scheduleTask);
    } else {
        alert('Please enter both date and task.');
    }
}

function saveScheduledTaskToLocalStorage(date, task) {
    let scheduledTasks = JSON.parse(localStorage.getItem('scheduledTasks')) || [];
    scheduledTasks.push({ date, task });
    localStorage.setItem('scheduledTasks', JSON.stringify(scheduledTasks));
}

function loadScheduledTasks() {
    const scheduledTasks = JSON.parse(localStorage.getItem('scheduledTasks')) || [];
    const scheduleList = document.getElementById('scheduleList');

    scheduledTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.textContent = `${task.date}: ${task.task}`;
        scheduleList.appendChild(taskElement);
    });
}
