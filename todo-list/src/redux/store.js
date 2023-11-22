import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from './slices/tasksSlices'

const store = configureStore({
    reducer: {
        tasks: tasksSlice,
    },
});

export default store;
