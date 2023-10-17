//Create Tasks constructor
export default class Task {
	constructor(
		title,
		description = null,
		tag = null,
		due_date_time = null,
		priority = null,
		complete = false,
		users = null,
		teams = null
	) {
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
