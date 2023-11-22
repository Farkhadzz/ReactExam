import { Form } from "react-router-dom";
import { addTask } from "../redux/slices/tasksSlices";
import { createTask } from "../tasks";
import { useDispatch } from "react-redux";

export default function AddForm() {
    const dispatch = useDispatch();

    return (
        <>
            <Form method="post">
                <button
                    onClick={async () => {
                        const task = await createTask();
                        dispatch(addTask(task));
                    }}
                    type="submit"
                >
                    New
                </button>
            </Form>
        </>
    );
}
