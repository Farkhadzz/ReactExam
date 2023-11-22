import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ErrorPage from "./error-page";
import Root, {
    loader as rootLoader,
    action as rootAction,
} from "./routes/root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import EditPage, {action as editAction} from './routes/edit';
import Task, {loader as taskLoader} from './routes/task';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                errorElement:  <div>Oops! There was an error.</div>,
                children: [
                    {
                        path: "tasks/:taskId",
                        element: <Task />,
                        loader: taskLoader,
                    },
                    {
                        path: "tasks/:taskId/edit",
                        element: <EditPage />,
                        loader: taskLoader,
                        action: editAction,
                    },
                ]
            },
        ],
    },
]);

const container = document.getElementById("root");

if (container === null) throw new Error("You don't have root element");

const root = ReactDOM.createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
