const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const menuItems = document.querySelectorAll(".menu li");

let currentFilter = "all";

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if(currentFilter === "important"){
        filteredTasks = tasks.filter(
            task => task.important
        );
    }

    filteredTasks.forEach((task,index)=>{

        const li = document.createElement("li");

        li.className = "task";

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.important ? '⭐ ' : ''}
                ${task.text}
            </span>

            <div class="buttons">

                <button
                class="done"
                onclick="toggleTask(${tasks.indexOf(task)})">
                ✓
                </button>

                <button
                onclick="toggleImportant(${tasks.indexOf(task)})">
                ⭐
                </button>

                <button
                class="delete"
                onclick="deleteTask(${tasks.indexOf(task)})">
                ✕
                </button>

            </div>
        `;

        taskList.appendChild(li);
    });
}

function addTask(){

    const text = input.value.trim();

    if(text === "") return;

    tasks.push({
        text:text,
        completed:false,
        important:false
    });

    saveTasks();
    renderTasks();

    input.value="";
}

function toggleTask(index){

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();
    renderTasks();
}

function toggleImportant(index){

    tasks[index].important =
    !tasks[index].important;

    saveTasks();
    renderTasks();
}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();
    renderTasks();
}

addBtn.addEventListener("click",addTask);

input.addEventListener("keypress",(e)=>{
    if(e.key==="Enter"){
        addTask();
    }
});

document.getElementById("date").textContent =
new Date().toLocaleDateString(
    "en-US",
    {
        weekday:"long",
        month:"long",
        day:"numeric"
    }
);

/* Sidebar Navigation */

menuItems.forEach(item=>{

    item.addEventListener("click",()=>{

        menuItems.forEach(li =>
            li.classList.remove("active")
        );

        item.classList.add("active");

        const text =
        item.textContent.trim();

        if(text.includes("Important")){
            currentFilter = "important";
        }
        else{
            currentFilter = "all";
        }

        renderTasks();
    });

});

renderTasks();