import { projectList, Project, newProject, addProjMethods } from "./project_class";
import { independentTasks, Task, newTask, addTaskMethods } from "./task_class";
import "../styles/reset.css";
import "../styles/main.css";
import "../styles/style.css";
import kanoLogo from "../assets/images/reshot-icon-dog-face-YE7643ZXK5.svg";
import githubLogo from "../assets/images/iconmonstr-github-3.svg";

//Store DOM targets
const kano = document.getElementById("kanoLogo");
const github = document.getElementById("githubLogo");
const cancelCreateBtns = document.getElementsByClassName("cancelCreateBtn");
export const projTaskNav = document.getElementById("projTaskNav");
const prioritySelect = document.getElementsByClassName("prioritySelect");
const newProjectBtn = document.getElementById("newProject");
const newProjBox = document.getElementById("newProjEntryBox");
const newTaskBtn = document.getElementById("newTask");
const newTaskBox = document.getElementById("newTaskEntryBox");
const newProjForm = document.getElementById("newProjForm");
const newTaskForm = document.getElementById("newTaskForm");
const colmOneItems = document.getElementsByClassName("inboxColmOneItems");
const colmOneProjList = document.getElementById("projectListDiv");

// Load local storage data and reapply methods to objects
(function loadLocalStorage() {
	JSON.parse(localStorage.getItem("savedProjectList")).forEach((x) => projectList.push(x));

	projectList.forEach((proj) => {
		addProjMethods(proj);
	});

	JSON.parse(localStorage.getItem("savedIndependentTasks")).forEach((x) => independentTasks.push(x));

	independentTasks.forEach((task) => addTaskMethods(task));
	updateTaskProjDisplay();
})();

newProjForm.addEventListener("submit", (x) => {
	x.preventDefault();
	newProjSubmit(x);
	updateTaskProjDisplay();
	cancelCreateObj();
});

newTaskForm.addEventListener("submit", (x) => {
	x.preventDefault();
	newTaskSubmit(x);
	updateTaskProjDisplay();
	cancelCreateObj();
});

//Set page images
kano.setAttribute("src", kanoLogo);
github.setAttribute("src", githubLogo);

function updateTaskProjDisplay() {
	projectList.forEach((x) => {
		let projDiv = document.createElement("div");
		projDiv.setAttribute("class", "colmOneProjList");
		let priority = document.createElement("div");
		priority.style.alignSelf = "center";
		let title = document.createElement("span");
		let dueDate = document.createElement("span");

		priority.style.width = "8px";
		priority.style.height = "8px";
		priority.style.borderRadius = "4px";
		switch (x.priority) {
			case "Low":
				priority.style.backgroundColor = "green";
				break;
			case "Medium":
				priority.style.backgroundColor = "orange";
				break;
			case "High":
				priority.style.backgroundColor = "red";
				break;
		}
		title.textContent = x.title;
		dueDate.textContent = x.dueDateTime ? x.dueDateTime.toLocaleDateString() : "No Due Date";

		projDiv.append(priority, title, dueDate);
		colmOneProjList.append(projDiv);
	});
}
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
	console.log(projInfo[2].value, projInfo[3].value);
	newProject(projInfo[0].value, projInfo[1].value, projInfo[4].value, projInfo[2], projInfo[3].value, projInfo[5].value);
	setStorage();
}

function newTaskSubmit(x) {
	let taskInfo = x.target;
	newTask(taskInfo[0].value, taskInfo[1].value, taskInfo[4].value, taskInfo[2].value, taskInfo[3].value, taskInfo[5].value);
	setStorage();
}

//Format "empty" div when no tasks/projs
Array.from(colmOneItems).forEach((x) => {
	if (x.childElementCount == 0) {
		let emptyNode = document.createElement("div");
		emptyNode.textContent = "Empty";
		emptyNode.style.color = "black";
		emptyNode.style.fontWeight = "500";
		x.append(emptyNode);
	}
});

//Save to local storage when projects/tasks CRUD
function setStorage() {
	localStorage.setItem("savedProjectList", JSON.stringify(projectList));
	localStorage.setItem("savedIndependentTasks", JSON.stringify(independentTasks));
}
