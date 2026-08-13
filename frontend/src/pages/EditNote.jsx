import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const EditNote = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        content: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch existing note
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await api.get(`/notes/${id}`);

                const note = response.data.note;

                setFormData({
                    title: note.title,
                    content: note.content
                });

            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to fetch note"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [id]);

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
            await api.put(`/notes/${id}`, formData);

            navigate("/dashboard");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update note"
            );
        }
    };

    if (loading) {
        return (
            <div className="loading">
                Loading note...
            </div>
        );
    }

    return (
        <main className="note-form-page">

            <div className="note-form-card">

                <h1>Edit Note</h1>

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
                            Update Note
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

export default EditNote;