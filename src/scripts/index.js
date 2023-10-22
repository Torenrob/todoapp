import { Project, newProject, addProjMethods } from "./project_class";
import { Task, newTask, addTaskMethods } from "./task_class";
import "../styles/reset.css";
import "../styles/style.css";
import kanoLogo from "../assets/images/reshot-icon-dog-face-YE7643ZXK5.svg";
import githubLogo from "../assets/images/iconmonstr-github-3.svg";

//Store DOM targets
const toDoDisplay = document.getElementById("toDoDisplay");
const kano = document.getElementById("kanoLogo");
const github = document.getElementById("githubLogo");
const newProjectBtn = document.getElementById("newProject");
const newTaskBtn = document.getElementById("newTask");
const projTaskNav = document.getElementById("projTaskNav");

kano.setAttribute("src", kanoLogo);
github.setAttribute("src", githubLogo);

//Initiate object to manage projects
let projectList = [];

//Initiate object to manage independent tasks
let independentTasks = [];

// Load local storage data and reapply methods to objects
(function loadLocalStorage() {
	projectList = localStorage.getItem("savedProjectList") ? JSON.parse(localStorage.getItem("savedProjectList")) : [];

	projectList.forEach((proj) => addProjMethods(proj));

	independentTasks = localStorage.getItem("savedIndependentTasks") ? JSON.parse(localStorage.getItem("savedIndependentTasks")) : [];

	independentTasks.forEach((task) => addTaskMethods(task));
})();

//Save to local storage when projects/tasks CRUD
function setStorage() {
	localStorage.setItem("savedProjectList", JSON.stringify(projectList));
	localStorage.setItem("savedIndependentTasks", JSON.stringify(independentTasks));
}

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

function DOM(projectList, independentTasks) {
	projectList.forEach((x) => {
		let a = document.createElement("div");
		a.textContent = x.title;
		projTaskNav.appendChild(a);
	});
}

DOM(projectList, independentTasks);
