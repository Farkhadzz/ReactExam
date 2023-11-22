import {
    Outlet,
    useNavigation,
    useLoaderData,
    redirect,
} from "react-router-dom";
import { matchSorter } from "match-sorter";
import Tasks from "../components/Tasks";
import { getNewTask } from "../tasks";
import { useSelector } from "react-redux";
import { Form, useSubmit } from "react-router-dom";
import AddForm from "../components/AddForm";
import { useState } from "react";

export async function action() {
    const newTask = await getNewTask();
    return redirect(`/tasks/${newTask.id}/edit`);
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    return { q };
}

export default function Root() {
    const submit = useSubmit();
    const { q } = useLoaderData();
    const tasks = useSelector((state) => state.tasks);
    const tasksByQuery = q
        ? matchSorter(tasks, q, { keys: ["title", "description"] })
        : tasks;
    const navigation = useNavigation();

    return (
        <>
            <div id="sidebar">
                <div>
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search tasks"
                            placeholder="Search"
                            type="search"
                            name="q"
                            defaultValue={q}
                            onChange={async (event) => {
                                submit(event.currentTarget.form);
                            }}
                        />
                        <div id="search-spinner" aria-hidden hidden={true} />
                        <div className="sr-only" aria-live="polite"></div>
                    </Form>
                    <AddForm />
                </div>
                <nav>
                    <Tasks tasks={tasksByQuery} />
                </nav>
            </div>
            <div
                id="detail"
                className={navigation.state === "loading" ? "loading" : ""}
            >
                <Outlet />
            </div>
        </>
    );
}
