import Note from "../models/note.js";

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        const note = await Note.create({
            title,
            content,
            user: req.user.id
        });

        res.status(201).json({
            message: "Note created successfully",
            note
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            notes
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};