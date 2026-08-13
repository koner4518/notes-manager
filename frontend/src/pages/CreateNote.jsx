import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

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
        <div>
            <h1>Create Note</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    placeholder="Note title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <br />

                <textarea
                    name="content"
                    placeholder="Write your note..."
                    value={formData.content}
                    onChange={handleChange}
                    rows="8"
                />

                <br />

                <button type="submit">
                    Create Note
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                >
                    Cancel
                </button>

            </form>

            {error && <p>{error}</p>}
        </div>
    );
};

export default CreateNote;