import { redirect } from "react-router-dom";
import { updateTask } from "../tasks";
import EditForm from "../components/EditForm";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    await updateTask(params.taskId, updates);
    window.location.reload();
    return redirect(`/tasks/${params.taskId}`);
}

export default function EditPage() {
    return <EditForm />;
}
