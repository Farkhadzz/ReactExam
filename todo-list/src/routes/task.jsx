import { useLoaderData } from "react-router-dom";
import { getTask } from "../tasks";
import { Form } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTask } from "../redux/slices/tasksSlices";
import { destroyTask } from "../tasks";
import { useNavigate } from "react-router-dom";

export async function loader({ params }) {
    const task = await getTask(params.taskId);
    return { task };
}

export default function Task() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { task } = useLoaderData();

    return (
        <div id="task">
            <div>
                <h1>{task.title ? <>{task.title}</> : <i>No Title</i>} </h1>

                <p>
                    {task.description ? (
                        <>{task.description}</>
                    ) : (
                        <i>No Description</i>
                    )}{" "}
                </p>

                <Form action={`edit`}>
                    <button type="submit">Edit</button>
                </Form>
                <Form method="post" action={`destroy`}>
                    <button
                        onClick={async () => {
                            dispatch(deleteTask({ id: task.id }));
                            await destroyTask(task.id);
                            navigate("/");
                        }}
                        type="submit"
                    >
                        Delete
                    </button>
                </Form>
            </div>
        </div>
    );
}
