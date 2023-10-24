export let projectList = [];

//Create new project
export function newProject(title, description = null, tag = null, due_date = null, due_time = null, priority = null, users = null, teams = null, ...tasks) {
	projectList.push(new Project(title, description, tag, due_date, due_time, priority, users, teams, ...tasks));
}

//Create Project class
export class Project {
	constructor(title, description, tag, due_date, due_time, priority, users, teams, ...tasks) {
		this.title = title;
		this.description = description == "" ? null : description;
		this.tag = tag == "" ? null : tag;
		if (due_date != "" && due_time != "") {
			this.dueDateTime = new Date(`${due_date}` + "T" + `${due_time}`);
		} else {
			this.dueDateTime = due_date != "" ? new Date(due_date) : null;
		}
		this.priority = priority;
		this.taskList = tasks;
		this.completionPercentage = calculateCompletion(this.taskList);
		// this.assignedUsers = users;
		// this.assignedTeams = teams;

		addProjMethods(this);
	}
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

//Add methods to each project on localStorage load & project initialization
export function addProjMethods(thisProject) {
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

	console.log(thisProject);
	//If project has tasklist add methods to those tasks
	// if (thisProject.taskList.length > 0) {
	// 	thisProject.taskList.forEach((x) => addTaskMethods(x));
	// }
}
