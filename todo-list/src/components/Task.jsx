import { NavLink, useFetcher } from "react-router-dom";
import { useDispatch } from "react-redux";
import { completeTask as completeForRedux } from "../redux/slices/tasksSlices";
import { completeTask as completeForLocal} from "../tasks";

export default function Task({ task }) {
    return (
        <>
            <NavLink to={`tasks/${task.id}`}>
                <CheckBox task={task} />
                {task.title ? <>{task.title}</> : <i>No Title</i>}
                {""}
            </NavLink>
        </>
    );
}

function CheckBox({ task }) {
    const fetcher = useFetcher();
    const dispatch = useDispatch();

    return (
        <fetcher.Form method="post" action={`tasks/${task.id}/complete`}>
            <button
                name="isCompleted"
                value={task.isCompleted ? "true" : "false"}
                onClick={async () => {
                    dispatch(completeForRedux({ id: task.id }));
                    await completeForLocal(task.id);
                }}
            >
                {task.isCompleted ? "■" : "□"}
            </button>
        </fetcher.Form>
    );
}
