import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { editTask } from "../../redux/slices/tasksSlices";
import { useDispatch } from "react-redux";

export default function EditForm() {
    const { task } = useLoaderData();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <>
            <Form
                method="post"
                id="task-form"
                onSubmit={async (e) => {
                    const formData = new FormData(e.target);
                    const updates = Object.fromEntries(formData);
                    dispatch(
                        editTask({
                            id: task.id,
                            title: updates.title,
                            description: updates.description,
                        })
                    );
                }}
            >
                <p>
                    <span>Title: </span>
                    <input
                        placeholder="Title"
                        aria-label="Title"
                        type="text"
                        name="title"
                        defaultValue={task.title}
                    />
                    <br />
                    <span>Description: </span>
                    <br />
                    <input
                        placeholder="Description"
                        aria-label="Description"
                        type="text"
                        name="description"
                        defaultValue={task.description}
                    ></input>
                </p>
                <p>
                    <button type="submit">Save</button>
                    <button
                        type="button"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Cancel
                    </button>
                </p>
            </Form>
        </>
    );
}
