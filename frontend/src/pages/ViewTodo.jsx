import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

function ViewTodo() {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [todo, setTodo] = useState({});
    const { todoId } = useParams();
    const [todoStatus, setTodoStatus] = useState("");
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
                    setError(null);
                    setTodo(response.data);
                    setTodoStatus(response.data.status);
                }
            } catch (err) {
                if (err.name !== "CanceledError") {
                    setError(err);
                    console.error(err);
                }
            }
        };
        getOneTodo();
        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [todoId, axiosPrivate]);
    async function deleteTodo() {
        try {
            await axiosPrivate.delete(`/todolist/${todoId}`);
            setError(null);
            navigate("/");
        } catch (err) {
            setError(err);
            console.error(err);
        }
    }
    async function updateTodoStatus() {
        const updatedStatus =
            todoStatus === "completed" ? "not completed" : "completed";
        try {
            await axiosPrivate.patch(`/todolist/${todoId}`, {
                status: updatedStatus,
            });
            setTodoStatus(updatedStatus);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div
            className="card shadow-sm border-2 border-info bg-secondary-subtle mx-auto"
            style={{ maxWidth: "700px" }}
        >
            <div className="view-todo container-lg my-5">
                <div className="card-header bg-dark-subtle d-flex justify-content-between align-items-center p-3">
                    <h2 className="mb-0 text-info-emphasis">{todo.title}</h2>
                    {todoStatus === "completed" ? (
                        <span className="badge bg-success fs-6">Completed</span>
                    ) : (
                        <span className="badge bg-warning text-dark fs-6">
                            Not Completed
                        </span>
                    )}
                </div>
                <div className="card-body p-4">
                    <h5 className="card-title text-muted text-decoration-underline mb-3">
                        Description:
                    </h5>
                    <p className="card-text fs-5">{todo.description}</p>
                    <hr />
                    <div className="text-muted small mt-4">
                        <p className="mb-1">
                            Created:{" "}
                            {todo.createdAt &&
                                new Date(todo.createdAt).toLocaleString()}
                        </p>
                        <p className="mb-0">
                            Last Updated:{" "}
                            {todo.updatedAt &&
                                new Date(todo.updatedAt).toLocaleString()}
                        </p>
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-between p-3 bg-dark-subtle">
                    <button
                        className="btn btn-outline-danger"
                        onClick={deleteTodo}
                    >
                        Delete Todo
                    </button>
                    <div>
                        <Link
                            to={`/update-todo/${todoId}`}
                            className="btn btn-primary me-2"
                        >
                            Update Todo
                        </Link>
                        <button
                            className={`btn ${
                                todoStatus === "completed"
                                    ? "btn-warning"
                                    : "btn-success"
                            }`}
                            onClick={updateTodoStatus}
                        >
                            {todoStatus === "completed"
                                ? "Mark Incomplete"
                                : "Mark Complete"}
                        </button>
                    </div>
                </div>
            </div>
            {error && (
                <div className="error">
                    {error.response?.data?.error ||
                        error.message ||
                        "An error occurred"}
                </div>
            )}
        </div>
    );
}
export default ViewTodo;
