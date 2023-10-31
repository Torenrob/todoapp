import { projectList, Project, newProject, addProjMethods, newProjSubmit, updateProjDisplay } from "./project_class";
import { independentTasks, Task, newTask, addTaskMethods, newTaskSubmit, updateIndependentTaskDisplay } from "./task_class";
import "../styles/reset.css";
import "../styles/main.css";
import "../styles/style.css";
import kanoLogo from "../assets/images/reshot-icon-dog-face-YE7643ZXK5.svg";
import githubLogo from "../assets/images/iconmonstr-github-3.svg";

//Store DOM targets
const kano = document.getElementById("kanoLogo");
const github = document.getElementById("githubLogo");
const cancelCreateBtns = document.getElementsByClassName("cancelCreateBtn");
const prioritySelect = document.getElementsByClassName("prioritySelect");
const newProjectBtn = document.getElementById("newProject");
const newProjBox = document.getElementById("newProjEntryBox");
const newTaskBtn = document.getElementById("newTask");
const newTaskBox = document.getElementById("newTaskEntryBox");
const newProjForm = document.getElementById("newProjForm");
const newTaskForm = document.getElementById("newTaskForm");
const itemsList = document.getElementsByClassName("itemsList");
const projTaskDisplay = document.getElementById("projTaskDisplay");

// Load local storage data and reapply methods to objects
(function loadLocalStorage() {
	if (JSON.parse(localStorage.getItem("savedProjectList"))) {
		JSON.parse(localStorage.getItem("savedProjectList")).forEach((x) => projectList.push(x));
	}

	projectList.forEach((proj) => {
		addProjMethods(proj);
	});

	if (JSON.parse(localStorage.getItem("savedIndependentTasks"))) {
		JSON.parse(localStorage.getItem("savedIndependentTasks")).forEach((x) => independentTasks.push(x));
	}

	independentTasks.forEach((task) => addTaskMethods(task));
	updateProjDisplay();
	updateIndependentTaskDisplay();
	colmOneItemClick();
})();

newProjForm.addEventListener("submit", (x) => {
	x.preventDefault();
	newProjSubmit(x);
	updateProjDisplay();
	cancelCreateObj();
	x.target.reset();
});

newTaskForm.addEventListener("submit", (x) => {
	x.preventDefault();
	newTaskSubmit(x);
	updateIndependentTaskDisplay();
	cancelCreateObj();
	x.target.reset();
});

//Set page images
kano.setAttribute("src", kanoLogo);
github.setAttribute("src", githubLogo);

// New Project/Tasks Dialogue Box Control
newTaskBtn.addEventListener("click", newTaskDialogue);
function newTaskDialogue() {
	newTaskBox.style.visibility = "visible";
	newProjBox.style.visibility = "hidden";
	let priority = newTaskBox.children[0].children[4].children[1].children[1];
	priority.style.backgroundColor = "green";
}

newProjectBtn.addEventListener("click", newProjDialogue);
function newProjDialogue() {
	newProjBox.style.visibility = "visible";
	newTaskBox.style.visibility = "hidden";
	let priority = newProjBox.children[0].children[4].children[1].children[1];
	priority.style.backgroundColor = "green";
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

Array.from(prioritySelect).forEach((priority) => {
	priority.addEventListener("change", (x) => changePriorityColor(priority));
});
function changePriorityColor(a) {
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
}

//Format "empty" div when no tasks/projs
Array.from(itemsList).forEach((x) => {
	if (x.childElementCount == 0) {
		let emptyNode = document.createElement("div");
		emptyNode.textContent = "None";
		emptyNode.style.color = "black";
		emptyNode.style.fontWeight = "500";
		x.append(emptyNode);
	}
});

//Save to local storage when projects/tasks CRUD
export function setStorage() {
	localStorage.setItem("savedProjectList", JSON.stringify(projectList));
	localStorage.setItem("savedIndependentTasks", JSON.stringify(independentTasks));
}

//Make List Display of Projects/Tasks
export function makeProjTaskListDisplay(x, targetDiv, type) {
	let projDiv = document.createElement("div");
	projDiv.classList.add("itemsList", "unselected");
	let priority = document.createElement("div");
	priority.setAttribute("class", "colmOnePriority");
	let title = document.createElement("span");
	let dueDate = document.createElement("span");
	dueDate.setAttribute("class", "colmOneDueDate");
	let openArrow = document.createElement("span");
	openArrow.textContent = ">";
	openArrow.setAttribute("class", "openArrow");
	let objID = document.createElement("span");
	objID.style.visibility = "hidden";
	objID.style.position = "absolute";

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
	console.log();
	dueDate.textContent = x.dueDateTime ? new Date(x.dueDateTime).toLocaleDateString() : "No Due Date";
	dueDate.append(openArrow);

	if (type === "task") {
		objID.textContent = `task ${independentTasks.indexOf(x)}`;
	} else if (type === "project") {
		objID.textContent = `project ${projectList.indexOf(x)}`;
	}

	projDiv.append(priority, title, dueDate, objID);
	targetDiv.appendChild(projDiv);
}

// Watch Column One Items for Click to Open details
export function colmOneItemClick() {
	let colmOneListItems = document.getElementsByClassName("colmOneListItems");

	Array.from(itemsList).forEach((listItem) => {
		listItem.addEventListener("click", (x) => {
			Array.from(itemsList).forEach((n) => {
				n.classList.remove("selected");
				n.classList.add("unselected");
			});
			listItem.classList.add("selected");
			listItem.classList.remove("unselected");
			mkColmTwoDisplay(listItem);
		});
	});
}

function mkColmTwoDisplay(listItem) {
	projTaskDisplay.innerHTML = "";

	let colmTwoDisplay = document.createElement("div");
	colmTwoDisplay.setAttribute("id", "colmTwoDisplay");
	let colmTwoTitle = document.createElement("div");
	colmTwoTitle.setAttribute("id", "colmTwoTitle");
	let colmTwoPriority = document.createElement("span");
	colmTwoPriority.setAttribute("id", "colmTwoPriority");
	let colmTwoTag = document.createElement("id", "span");
	colmTwoTag.setAttribute("id", "colmTwoTag");
	let colmTwoDueDate = document.createElement("div");
	colmTwoDueDate.setAttribute("id", "colmTwoDueDate");
	let colmTwoDescription = document.createElement("p");
	colmTwoDescription.setAttribute("id", "colmTwoDescription");
	let colmTwoTasksList = document.createElement("div");
	colmTwoTasksList.setAttribute("id", "colmTwoTasksList");

	let objKey = listItem.children[3].textContent;
	let targetObj;

	function formatDivs() {
		let dueDate = new Date(targetObj.dueDateTime).toDateString();
		let dueTime = new Date(targetObj.dueDateTime).toLocaleTimeString();
		dueTime = dueTime.replace(/:(\d{2})\s/, "").toLowerCase();
		colmTwoTitle.textContent = targetObj.title;
		colmTwoPriority.textContent = `${targetObj.priority}`;
		colmTwoTag.textContent = `Tag: ${targetObj.tag}`;
		colmTwoDueDate.textContent = `Due: ${dueDate} ${dueTime}`;
		colmTwoDescription.textContent = `Description: ${targetObj.description}`;

		switch (targetObj.priority) {
			case "Low":
				colmTwoPriority.style.backgroundColor = "green";
				break;
			case "Medium":
				colmTwoPriority.style.backgroundColor = "orange";
				break;
			case "High":
				colmTwoPriority.style.backgroundColor = "red";
				break;
		}
	}

	if (objKey.includes("project")) {
		targetObj = projectList[`${objKey[objKey.length - 1]}`];
		let thisTaskList = targetObj.taskList;
		formatDivs();
		thisTaskList.forEach((x) => makeProjTaskListDisplay(x, colmTwoTasksList, "project"));
	} else if (objKey.includes("task")) {
		targetObj = independentTasks[`${objKey[objKey.length - 1]}`];
		let thisTaskList = targetObj.subTasks;
		formatDivs();
		thisTaskList.forEach((x) => makeProjTaskListDisplay(x, colmTwoTasksList, "task"));
	}

	colmTwoDisplay.append(colmTwoTitle, colmTwoDescription, colmTwoPriority, colmTwoTag, colmTwoDueDate, colmTwoTasksList);
	projTaskDisplay.append(colmTwoDisplay);
}
