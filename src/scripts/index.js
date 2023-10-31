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
const colmOneItems = document.getElementsByClassName("inboxColmOneItems");
let colmOneListItemArr;

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
})();

newProjForm.addEventListener("submit", (x) => {
	x.preventDefault();
	newProjSubmit(x);
	updateProjDisplay();
	cancelCreateObj();
});

newTaskForm.addEventListener("submit", (x) => {
	x.preventDefault();
	newTaskSubmit(x);
	updateIndependentTaskDisplay();
	cancelCreateObj();
});

//Set page images
kano.setAttribute("src", kanoLogo);
github.setAttribute("src", githubLogo);

// New Project/Tasks Dialogue Box Control
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

//Format "empty" div when no tasks/projs
Array.from(colmOneItems).forEach((x) => {
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
