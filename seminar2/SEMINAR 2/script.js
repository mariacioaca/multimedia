"use strict"

const taskNameInput = document.getElementById("taskNameId");
const prioritySelect = document.getElementById("priorityId");
const addTaskBtn = document.getElementById("addTaskBtnId");
const taskTableBody =document.getElementById("taskTableBodyId");
const taskCount = document.getElementById("taskCountId");

addTaskBtn.addEventListener("click", addTask);

function addTask() {

    const taskName = taskNameInput.value.trim();
    const priority = prioritySelect.value;

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
    <td>${taskName}</td>
    <td>${priority}</td>
    <td><button class="delete-btn">Delete</button></td>
    `

    taskTableBody.appendChild(newRow);

    updateTaskCount();
}

function updateTaskCount() {
    const total = taskTableBody.getElementsByTagName("tr").length;
    taskCount.textContent = `Total tasks: ${total}`
}

taskTableBody.addEventListener("click", function(e){
    if(e.target && e.target.classList.contains("delete-btn")){
        e.target.closest("tr").remove();
        updateTaskCount();
    }
});