import { setStorage } from "./index";

const colmOneIndependentTasks = document.getElementById("independentTasksDiv");

export let independentTasks = [];

//Create new task
export function newTask(title, description = null, tag = null, due_date = null, due_time = null, priority = null, users = null, teams = null, taskFolder = null) {
	let new_task = new Task(title, description, tag, due_date, due_time, priority, users, teams);
	//Check if task being added to existing project
	if (!taskFolder) {
		//If no existing project add task to independent task list
		independentTasks.push(new_task);
	} //If there is an existing project add to project task list
	else {
		taskFolder.taskList ? taskFolder.taskList.push(new_task) : taskFolder.subTasks(new_task);
	}
}

//Create Task Class
export class Task {
	constructor(title, description = null, tag = null, due_date = null, due_time = null, priority = null, users = null, teams = null, ...subTasks) {
		this.title = title;
		this.description = description == "" ? null : description;
		this.tag = tag == "" ? null : tag;
		if (due_date && due_time) {
			this.dueDateTime = new Date(`${due_date}T${due_time}`);
		} else {
			this.dueDateTime = due_date != "" ? new Date(due_date) : null;
		}
		this.priority = priority = "" ? null : priority;
		this.complete = false;
		// this.users = users;
		// this.teams = teams;
		this.subTasks = subTasks;

		addTaskMethods(this);
	}
}

//Add methods to each task on localStorage load & project initialization
export function addTaskMethods(task) {
	task.editTask = function (title, description, tag, due_date_time, priority, complete, users, teams, ...subTasks) {
		this.title = title;
		this.description = description;
		this.tag = tag;
		this.dueDateTime = due_date_time ? new Date(due_date_time) : null;
		this.priority = priority;
		this.complete = complete;
		this.users = users;
		this.teams = teams;
		this.subTasks = subTasks;

		if (!independentTasks.includes(task)) {
			projectList.forEach((prj) => {
				if (prj.taskList.includes(task)) {
					prj.recalcCompletion();
				}
			});
		}

		setStorage();
	};

	task.addSubTask = function (task = null, title = null, description = null, tag = null, due_date_time = null, priority = null, complete = false, users = null, teams = null) {
		//Check for existing task or creating new task
		//If task already exist push to task list
		if (task) {
			this.subTasks.push(task);
		} // If no current task check for minimum of task title to create new task
		else if (title) {
			newTask(title, description, tag, due_date_time, priority, complete, users, teams, this);
		} else {
			console.log("Error - No Task to add");
		}
	};

	task.delete = function () {
		if (independentTasks.includes(this)) {
			independentTasks.splice(independentTasks.indexOf(this), 1);
		} else {
			projectList.forEach((prj) => {
				if (prj.taskList.includes(this)) {
					prj.taskList.splice(prj.taskList.indexOf(this), 1);
				}
			});
		}
	};

	if (task.subTasks) {
		task.subTasks.forEach((subT) => {
			subT.editTask = function (title, description, tag, due_date_time, priority, complete, users, teams, ...subTasks) {
				this.title = title;
				this.description = description;
				this.tag = tag;
				this.dueDateTime = due_date_time ? new Date(due_date_time) : null;
				this.priority = priority;
				this.complete = complete;
				this.users = users;
				this.teams = teams;
				setStorage();
			};
		});
	}
}

export function newTaskSubmit(x) {
	let taskInfo = x.target;
	console.log(taskInfo);
	newTask(taskInfo[0].value, taskInfo[1].value, taskInfo[4].value, taskInfo[2].value, taskInfo[3].value, taskInfo[5].value);
	setStorage();
}

export function updateIndependentTaskDisplay() {
	colmOneIndependentTasks.innerHTML = "";

	if (independentTasks.length > 0) {
		const colmOneTaskHeader = document.createElement("div");
		colmOneTaskHeader.innerHTML = "<span>Priority</span><span class='colmHeaderDueDate'>Due Date</span>";
		colmOneTaskHeader.setAttribute("class", "colmHeaders");
		colmOneIndependentTasks.append(colmOneTaskHeader);
	}

	independentTasks.forEach((x) => {
		let projDiv = document.createElement("div");
		projDiv.setAttribute("class", "colmOneList");
		let priority = document.createElement("div");
		priority.setAttribute("class", "colmOnePriority");
		let title = document.createElement("span");
		let dueDate = document.createElement("span");
		dueDate.setAttribute("class", "colmOneDueDate");
		let openArrow = document.createElement("span");
		openArrow.textContent = ">";
		openArrow.setAttribute("class", "openArrow");

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

		projDiv.append(priority, title, dueDate);
		colmOneIndependentTasks.appendChild(projDiv);
	});
}
