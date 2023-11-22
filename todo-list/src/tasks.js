import { matchSorter } from "match-sorter";
import { v4 as uuid } from "uuid";

export async function getTasks(query) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!tasks) tasks = [];
    if (query) {
        tasks = matchSorter(tasks, query, { keys: ["first", "last"] });
    }
    return tasks;
}

export async function createTask() {
    const newTask = {
        id: uuid(),
        title: "No Title",
        description: "No Description",
        isCompleted: false,
    };
    let tasks = await getTasks();
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    return newTask;
}

export async function getTask(id) {
    let tasks = await getTasks();
    let task = tasks.find((task) => task.id === id);
    return task ?? null;
}

export async function getNewTask() {
    let tasks = await getTasks();
    return tasks[tasks.length - 1] ?? null;
}

export async function updateTask(id, updates) {
    let tasks = await getTasks();
    let task = tasks.find((task) => task.id === id);
    if (!task) return null;
    Object.assign(task, updates);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    return task;
}

export async function completeTask(id) {
    let tasks = await getTasks();
    let task = tasks.find((task) => task.id === id);
    if (!task) return null;
    task.isCompleted = !task.isCompleted;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    return task;
}

export async function destroyTask(id) {
    let tasks = await getTasks();
    let index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        return true;
    }
    return false;
}
