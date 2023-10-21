// Import Modules
import { Project, Task } from "./projectModule";

const project_list = [];

function new_project(title, description = null, tag = null, due_date_time = null, priority = null, users = null, teams = null) {
	project_list.push(new Project(title, description, tag, due_date_time, priority, users, teams));
}
