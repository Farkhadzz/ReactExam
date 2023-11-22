import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
    name: "tasks",
    initialState: JSON.parse(localStorage.getItem("tasks")) ?? [],
    reducers: {
        addTask: (state, action) => {
            state.push({
                id: action.payload.id,
                title: action.payload.title,
                description: action.payload.description,
                isCompleted: action.payload.isCompleted,
            });
        },
        deleteTask: (state, action) => {
            const index = state.findIndex(
                (task) => task.id === action.payload.id
            );
            if (index !== -1) state.splice(index, 1);
        },
        editTask: (state, action) => {
            const task = state.find((task) => task.id === action.payload.id);
            if (!task) return;
            task.title = action.payload.title ?? "No title";
            task.description = action.payload.description ?? "No description";
        },
        completeTask: (state, action) => {
            const task = state.find((task) => task.id === action.payload.id);
            if (task) task.isCompleted = !task.isCompleted;
        },
    },
});

export const { addTask, deleteTask, editTask, completeTask } =
    tasksSlice.actions;

export default tasksSlice.reducer;
