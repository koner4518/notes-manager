import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Dashboard = () => {
    const navigate = useNavigate();

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    const fetchNotes = async () => {
        try {
            const response = await api.get("/notes");

            setNotes(response.data.notes);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch notes"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this note?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/notes/${id}`);

            setNotes((currentNotes) =>
                currentNotes.filter(
                    (note) => note._id !== id
                )
            );

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to delete note"
            );
        }
    };

    return (
        <main className="dashboard">

            <section className="dashboard-header">

                <div>
                    <p className="welcome-text">
                        Welcome back 👋
                    </p>

                    <h1>
                        {user?.name}'s Notes
                    </h1>

                    <p className="subtitle">
                        Keep your thoughts organized.
                    </p>
                </div>

                <button
                    className="primary-btn"
                    onClick={() => navigate("/notes/new")}
                >
                    + Create Note
                </button>

            </section>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="loading">
                    Loading your notes...
                </div>
            ) : notes.length === 0 ? (

                <div className="empty-state">
                    <div className="empty-icon">
                        📝
                    </div>

                    <h2>
                        No notes yet
                    </h2>

                    <p>
                        Start by creating your first note.
                    </p>

                    <button
                        className="primary-btn"
                        onClick={() =>
                            navigate("/notes/new")
                        }
                    >
                        Create Your First Note
                    </button>
                </div>

            ) : (

                <section className="notes-grid">

                    {notes.map((note) => (

                        <article
                            className="note-card"
                            key={note._id}
                        >

                            <h2>
                                {note.title}
                            </h2>

                            <p>
                                {note.content}
                            </p>

                            <div className="note-actions">

                                <button
                                    className="edit-btn"
                                    onClick={() =>
                                        navigate(
                                            `/notes/${note._id}/edit`
                                        )
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        handleDelete(note._id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </article>

                    ))}

                </section>
            )}

        </main>
    );
};

export default Dashboard;