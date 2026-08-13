import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./NoteForm.css";

const CreateNote = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        content: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (
            !formData.title.trim() ||
            !formData.content.trim()
        ) {
            setError("Title and content are required");
            return;
        }

        try {
            await api.post("/notes", formData);

            navigate("/dashboard");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to create note"
            );
        }
    };

    return (
        <main className="note-form-page">

            <div className="note-form-card">

                <h1>Create Note</h1>

                <form
                    className="note-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        className="note-input"
                        type="text"
                        name="title"
                        placeholder="Note title"
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <textarea
                        className="note-textarea"
                        name="content"
                        placeholder="Write your note..."
                        value={formData.content}
                        onChange={handleChange}
                    />

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="form-actions">

                        <button
                            className="primary-btn"
                            type="submit"
                        >
                            Create Note
                        </button>

                        <button
                            className="cancel-btn"
                            type="button"
                            onClick={() =>
                                navigate("/dashboard")
                            }
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </main>
    );
};

export default CreateNote;