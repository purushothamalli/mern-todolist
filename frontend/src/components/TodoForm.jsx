import { useState } from "react";

function TodoForm({ initialData = {}, onSubmitMtd, buttonTitle, error }) {
    const [title, setTitle] = useState(initialData.title || "");
    const [description, setDescription] = useState(
        initialData.description || "",
    );
    const [status, setStatus] = useState(initialData.status || "");
    function handleSubmit(e) {
        e.preventDefault();
        const formData = { title, status, description };
        onSubmitMtd(formData);
    }
    return (
        <form onSubmit={handleSubmit}>
            <label
                htmlFor="title"
                className="form-label m-1 font-weight-bold text-primary-emphasis fs-5"
            >
                Enter Title :
            </label>
            <input
                type="text"
                id="title"
                className="form-control m-1 mb-2 border border-2 border-secondary"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="radio"
                name="status"
                id="status2"
                className="form-check-input m-2 border-2 border-secondary"
                value="completed"
                onChange={(e) => setStatus(e.target.value)}
            />
            <label
                htmlFor="status2"
                className="form-label font-weight-bold text-primary-emphasis fs-5"
            >
                : Completed
            </label>
            <br />
            <input
                type="radio"
                name="status"
                id="status1"
                className="form-check-input m-2 border-2 border-secondary"
                value="not completed"
                onChange={(e) => setStatus(e.target.value)}
            />
            <label
                htmlFor="status1"
                className="form-label font-weight-bold text-primary-emphasis fs-5"
            >
                : Not Completed
            </label>
            <label
                htmlFor="desc"
                className="form-label m-2 d-block font-weight-bold text-primary-emphasis fs-5"
            >
                Enter Description :
            </label>
            <textarea
                name="desc"
                id="desc"
                className="form-control m-2 border border-2 border-secondary"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="text-center">
                <button className="btn btn-outline-success btn-lg mt-3">
                    {buttonTitle}
                </button>
            </div>
            {error && <div className="error">{error}</div>}
        </form>
    );
}
export default TodoForm;
