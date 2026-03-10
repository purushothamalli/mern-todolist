import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

function HomePage() {
    const [todos, setTodos] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getTodos = async () => {
            try {
                const response = await axiosPrivate.get("/todolist", {
                    signal: controller.signal,
                });
                if (isMounted) {
                    setTodos(response.data);
                }
            } catch (err) {
                if (err.name !== "CanceledError") {
                    console.error(err);
                }
            }
        };

        getTodos();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [axiosPrivate]);
    return (
        <div className="home-page container-lg">
            <h1 className="text-center mb-4 text-decoration-underline">
                All todos
            </h1>
            <div className="row g-3">
                {todos.length !== 0 &&
                    todos.map((todo) => {
                        return (
                            <div
                                key={todo._id}
                                className="col-12 col-md-6 col-lg-3"
                            >
                                <div className="todo card shadow-md h-100 bg-dark-subtle">
                                    <div className="card-body d-flex flex-column justify-content-between ">
                                        <Link
                                            to={`/view-todo/${todo._id}`}
                                            className="text-decoration-none text-dark"
                                        >
                                            <div className="todo">
                                                <h3 className="card-body">
                                                    {todo.title}
                                                </h3>
                                                <p>
                                                    {todo.status ===
                                                    "completed" ? (
                                                        <span className="badge bg-success">
                                                            Completed
                                                        </span>
                                                    ) : (
                                                        <span className="badge bg-warning text-dark">
                                                            Not Completed
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="text-muted small">
                                                    {new Date(
                                                        todo.createdAt,
                                                    ).toLocaleString()}
                                                </p>
                                            </div>
                                        </Link>
                                        <div className="d-flex justify-content-evenly">
                                            <Link
                                                to={`/view-todo/${todo._id}`}
                                                className="text-decoration-none text-dark btn btn-info"
                                            >
                                                View Todo
                                            </Link>
                                            <Link
                                                to={`/update-todo/${todo._id}`}
                                                className="text-decoration-none text-dark btn btn-success"
                                            >
                                                Update todo
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
            {todos.length === 0 && (
                <div className="border border-2 border-warning p-2 my-5 mx-auto rounded-4 bg-dark-subtle w-50 fs-4 text-center">
                    No todos to display. Start by creating a{" "}
                    <Link to="/create-todolist">new Todo</Link>
                </div>
            )}
        </div>
    );
}
export default HomePage;
