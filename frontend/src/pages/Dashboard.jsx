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

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this note?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`/notes/${id}`);

            setNotes(
                notes.filter((note) => note._id !== id)
            );

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to delete note"
            );
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <div>
            <h1>Notes Manager</h1>

            <p>
                Welcome, {user?.name}
            </p>

            <button onClick={() => navigate("/notes/new")}>
                Create Note
            </button>

            <button onClick={handleLogout}>
                Logout
            </button>

            <hr />

            <h2>Your Notes</h2>

            {loading && <p>Loading notes...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && notes.length === 0 && (
                <p>No notes found. Create your first note!</p>
            )}

            {notes.map((note) => (
                <div key={note._id}>
                    <h3>{note.title}</h3>

                    <p>{note.content}</p>

                    <button
                        onClick={() =>
                            navigate(`/notes/${note._id}/edit`)
                        }
                    >
                        Edit
                    </button>

                    <button onClick={() => handleDelete(note._id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;