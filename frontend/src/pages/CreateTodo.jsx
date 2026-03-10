import { useNavigate } from "react-router-dom";
import TodoForm from "../components/TodoForm.jsx";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { useState } from "react";

function CreateTodo() {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    async function createTodo(todo) {
        try {
            const response = await axiosPrivate.post("/todolist", todo);
            setError(null);
            console.log(response.data);
            navigate("/");
        } catch (err) {
            console.error(err.response?.data?.error || "Failed to create todo");
            setError(err.response?.data?.error);
        }
    }

    return (
        <div className="container-lg p-5 border border-info-subtle border-2 rounded w-50 bg-secondary-subtle my-5">
            <h2 className="text-danger-emphasis text-decoration-underline">
                Create Todo
            </h2>
            <TodoForm
                onSubmitMtd={createTodo}
                error={error}
                buttonTitle="Create Todo"
            />
        </div>
    );
}
export default CreateTodo;
