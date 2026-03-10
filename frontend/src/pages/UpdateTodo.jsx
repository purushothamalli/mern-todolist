import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TodoForm from "../components/TodoForm";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

function UpdateTodo() {
    const axiosPrivate = useAxiosPrivate();
    const [todo, setTodo] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { todoId } = useParams();
    const [error, setError] = useState(null);
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getOneTodo = async () => {
            try {
                const response = await axiosPrivate.get(`/todolist/${todoId}`, {
                    signal: controller.signal,
                });
                if (isMounted) {
                    setTodo(response.data);
                }
            } catch (err) {
                if (err.name !== "CanceledError") {
                    console.error(err);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        getOneTodo();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [todoId, axiosPrivate]);

    async function updateTodo(updatedTodo) {
        try {
            await axiosPrivate.put(`/todolist/${todoId}`, updatedTodo);
            setError(null);
            navigate("/");
        } catch (err) {
            console.error(err);
            setError(err);
        }
    }

    if (loading)
        return (
            <p className="border border-2 w-25 text-center border-warning bg-dark-subtle p-3 my-5 mx-auto rounded-4 fs-4">
                Loading...
            </p>
        );

    return (
        <div className="container-lg p-5 border border-primary border-2 rounded w-50 bg-secondary-subtle my-5">
            <h2 className="text-warning-emphasis text-decoration-underline">
                Edit Todo
            </h2>
            <TodoForm
                initialData={todo}
                onSubmitMtd={updateTodo}
                buttonTitle="Update Todo"
                error={error}
            />
        </div>
    );
}
export default UpdateTodo;
