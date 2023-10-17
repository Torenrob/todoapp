//Import Project Module
import Project from "./class_modules/projectModule";
//Create Task Module
import Task from "./class_modules/taskModule";

const Home = new Project("Home");
Home.task_list.push(new Task("Do Laundry"));

console.log(Home);
