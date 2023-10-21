//Initiate DOM div for all list elements
const toDoDisplay = document.getElementById("toDoDisplay");

//Initiate object to manage projects
let projectList = [];

//Initiate object to manage independent tasks
let independentTasks = [];

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

//Calculate percentage of task complete for project
function calculateCompletion(task_list) {
	if (task_list.length > 0) {
		let taskCompleteCount = 0;
		let taskCount = task_list.length;

		task_list.forEach((tsk) => {
			if (tsk.complete === true) {
				taskCompleteCount++;
			}
		});

		return taskCompleteCount / taskCount;
	} else {
		return null;
	}
}

//Add methods to each task on localStorage load & project initialization
function addTaskMethods(task) {
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

//Add methods to each project on localStorage load & project initialization
function addProjMethods(thisProject) {
	//Recalculate completion percentage
	thisProject.recalcCompletion = function () {
		this.completionPercentage = calculateCompletion(this.taskList);
	};
	//Method to add Task to Project Task List
	thisProject.addTask = function (title = null, description = null, tag = null, due_date_time = null, priority = null, complete = false, users = null, teams = null, ...task) {
		//Check for existing task or creating new task
		// If task already exist push to task list
		if (task) {
			this.taskList.push(...task);
			task.forEach((i) => {
				if (independentTasks.includes(i)) {
					independentTasks.splice(independentTasks.indexOf(i), 1);
				}
			});
		}
		// If no current task check for minimum of task title to create new task
		else if (title) {
			newTask(title, description, tag, due_date_time, priority, complete, users, teams, this);
		} else {
			console.log("Error - No Task to add");
		}
		this.recalcCompletion();
	};

	//Method to edit project
	thisProject.editProject = function (title, description, tag, due_date_time, priority, users, teams, ...tasks) {
		this.title = title;
		this.description = description;
		this.tag = tag;
		this.dueDateTime = due_date_time ? new Date(due_date_time) : null;
		this.priority = priority;
		this.taskList = tasks;
		this.assignedUsers = users;
		this.assignedTeams = teams;
		this.recalcCompletion();
		setStorage();
	};

	thisProject.delete = function () {
		projectList.splice(projectList.indexOf(this), 1);
	};

	//If project has tasklist add methods to those tasks
	if (thisProject.taskList.length > 0) {
		thisProject.taskList.forEach((x) => addTaskMethods(x));
	}
}

// Load local storage data and reapply methods to objects
(() => {
	projectList = localStorage.getItem("savedProjectList") ? JSON.parse(localStorage.getItem("savedProjectList")) : [];

	projectList.forEach((proj) => addProjMethods(proj));

	independentTasks = localStorage.getItem("savedIndependentTasks") ? JSON.parse(localStorage.getItem("savedIndependentTasks")) : [];

	independentTasks.forEach((task) => addTaskMethods(task));
})();

//Save to local storage when projects/tasks get CRUD
function setStorage() {
	localStorage.setItem("savedProjectList", JSON.stringify(projectList));
	localStorage.setItem("savedIndependentTasks", JSON.stringify(independentTasks));
}

//Create new project
function newProject(title, description = null, tag = null, due_date_time = null, priority = null, users = null, teams = null, ...tasks) {
	projectList.push(new Project(title, description, tag, due_date_time, priority, users, teams, ...tasks));
	setStorage();
}

//Create new task
function newTask(title, description = null, tag = null, due_date_time = null, priority = null, users = null, teams = null, taskFolder = null) {
	let new_task = new Task(title, description, tag, due_date_time, priority, users, teams);
	//Check if task being added to existing project
	if (!taskFolder) {
		//If no existing project add task to independent task list
		independentTasks.push(new_task);
	} //If there is an existing project add to project task list
	else {
		taskFolder.taskList ? taskFolder.taskList.push(new_task) : taskFolder.subTasks(new_task);
	}
	setStorage();
}

//Create Project class
class Project {
	constructor(title, description = null, tag = null, due_date_time = null, priority = null, users = null, teams = null, ...tasks) {
		this.title = title;
		this.description = description;
		this.tag = tag;
		this.dueDateTime = due_date_time ? new Date(due_date_time) : null;
		this.priority = priority;
		this.taskList = tasks;
		this.completionPercentage = calculateCompletion(this.taskList);
		this.assignedUsers = users;
		this.assignedTeams = teams;

		addProjMethods(this);
	}
}

//Create Task Class
class Task {
	constructor(title, description = null, tag = null, due_date_time = null, priority = null, users = null, teams = null, ...subTasks) {
		this.title = title;
		this.description = description;
		this.tag = tag;
		this.dueDateTime = due_date_time ? new Date(due_date_time) : null;
		this.priority = priority;
		this.complete = false;
		this.users = users;
		this.teams = teams;
		this.subTasks = subTasks;

		addTaskMethods(this);
	}
}

function DOM(projectList, independentTasks = null) {
	projectList.forEach((x) => {
		let a = document.createElement("div");
		a.textContent = x.title;
		toDoDisplay.appendChild(a);
	});
}

DOM(projectList);
