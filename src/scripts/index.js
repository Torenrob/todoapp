import { Project, newProject, addProjMethods } from "./project_class";
import { Task, newTask, addTaskMethods } from "./task_class";
import "../styles/reset.css";
import "../styles/main.css";
import "../styles/style.css";
import kanoLogo from "../assets/images/reshot-icon-dog-face-YE7643ZXK5.svg";
import githubLogo from "../assets/images/iconmonstr-github-3.svg";

//Store DOM targets
const toDoDisplay = document.getElementById("toDoDisplay");
const kano = document.getElementById("kanoLogo");
const github = document.getElementById("githubLogo");
const cancelCreateBtns = document.getElementsByClassName("cancelCreateBtn");
const projTaskNav = document.getElementById("projTaskNav");
const prioritySelect = document.getElementsByClassName("prioritySelect");
const newProjectBtn = document.getElementById("newProject");
const newProjBox = document.getElementById("newProjEntryBox");
const newTaskBtn = document.getElementById("newTask");
const newTaskBox = document.getElementById("newTaskEntryBox");
const newProjForm = document.getElementById("newProjForm");
const newTaskForm = document.getElementById("newTaskForm");

newProjForm.addEventListener("submit", (x) => {
	x.preventDefault();
	newProjSubmit(x);
	cancelCreateObj();
});

newTaskForm.addEventListener("submit", (x) => {
	x.preventDefault();
	newTaskSubmit(x);
	cancelCreateObj();
});

//Set page images
kano.setAttribute("src", kanoLogo);
github.setAttribute("src", githubLogo);

//Initiate object to manage projects
export let projectList = [];

//Initiate object to manage independent tasks
export let independentTasks = [];

newTaskBtn.addEventListener("click", newTaskDialogue);
function newTaskDialogue() {
	newTaskBox.style.visibility = "visible";
	newProjBox.style.visibility = "hidden";
}

newProjectBtn.addEventListener("click", newProjDialogue);
function newProjDialogue() {
	newProjBox.style.visibility = "visible";
	newTaskBox.style.visibility = "hidden";
}

function cancelCreateObj() {
	newTaskBox.style.visibility = "hidden";
	newProjBox.style.visibility = "hidden";
}

Array.from(cancelCreateBtns).forEach((x) => {
	x.addEventListener("click", cancelCreateObj);
});

//Sort function
function sortList(listToSort, propertySortBy, ascDesc) {
	listToSort.sort((a, b) => {
		let aValue = a[propertySortBy];
		let bValue = b[propertySortBy];
		if (aValue > bValue) {
			return 1 * ascDesc;
		} else if (aValue < bValue) {
			return -1 * ascDesc;
		} else {
			return 0;
		}
	});
}

Array.from(prioritySelect).forEach((x) => {
	x.addEventListener("change", changePriorityColor);
});
function changePriorityColor(x) {
	Array.from(prioritySelect).forEach((a) => {
		switch (a.value) {
			case "Low":
				a.style.backgroundColor = "green";
				break;
			case "Medium":
				a.style.backgroundColor = "orange";
				break;
			case "High":
				a.style.backgroundColor = "red";
				break;
		}
	});
}

function newProjSubmit(x) {
	let projInfo = x.target;
	newProject(projInfo[0].value, projInfo[1].value, projInfo[4].value, projInfo[2], projInfo[3].value, projInfo[5].value);
	setStorage();
}

function newTaskSubmit(x) {
	let taskInfo = x.target;
	newTask(taskInfo[0].value, taskInfo[1].value, taskInfo[4].value, taskInfo[2].value, taskInfo[3].value, taskInfo[5].value);
	setStorage();
}

//Save to local storage when projects/tasks CRUD
function setStorage() {
	localStorage.setItem("savedProjectList", JSON.stringify(projectList));
	localStorage.setItem("savedIndependentTasks", JSON.stringify(independentTasks));
}

// Load local storage data and reapply methods to objects
(function loadLocalStorage() {
	projectList = localStorage.getItem("savedProjectList") ? JSON.parse(localStorage.getItem("savedProjectList")) : [];

	projectList.forEach((proj) => addProjMethods(proj));

	independentTasks = localStorage.getItem("savedIndependentTasks") ? JSON.parse(localStorage.getItem("savedIndependentTasks")) : [];

	independentTasks.forEach((task) => addTaskMethods(task));
})();
