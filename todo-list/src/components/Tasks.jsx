import Task from "./Task";

export default function TaskList({ tasks }) {
    return (
        <>
            {tasks.length ? (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <Task task={task} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>
                    <i>No tasks</i>
                </p>
            )}
        </>
    );
}