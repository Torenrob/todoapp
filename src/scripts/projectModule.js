//Construct Projects
export class Project {
	constructor(title, description = null, tag = null, due_date_time = null, priority = null, users = null, teams = null) {
		this.title = title;
		this.description = description;
		this.tag = tag;
		this.due_date_time = due_date_time;
		this.priority = priority;
		this.completion_percentage = NaN;
		this.task_list = [];
		this.assigned_users = users;
		this.assinged_teams = teams;
	}

	//Add Task to Project Task List
	addTask(task = null, title = null, description = null, tag = null, due_date_time = null, priority = null, complete = false, users = null, teams = null) {
		//Check if adding an already existing task or creating one
		//If task already exist push to task list
		if (task) {
			this.task_list.push(task);
		} // If no current task check for minimum of task title to create task
		else if (title) {
			this.task_list(new Task(title, description, tag, due_date_time, priority, complete, users, teams));
		} else {
			console.log("Error - No Task to add");
		}
	}
}

//Create Tasks constructor
export class Task {
	constructor(title, description = null, tag = null, due_date_time = null, priority = null, complete = false, users = null, teams = null) {
		this.title = title;
		this.description = description;
		this.tag = tag;
		this.due_date_time = due_date_time;
		this.priority = priority;
		this.complete = complete;
		this.users = users;
		this.teams = teams;
	}
}
