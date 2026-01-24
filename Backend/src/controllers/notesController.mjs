import NotesModel from "../models/notesModel.mjs";

const getNotes = async (req, res) =>{
    try{
        const notes = await NotesModel.find({ userId: req.token.userId });
        res.status(200).send(notes);
    }catch (err){
        res.status(500).send({ status: "failed", message: "Error fetching notes" });
    }
}

const createNote = async (req, res) =>{
    try{
        let {title, content} = req.body;
        await NotesModel.create({title, content, userId: req.token.userId});
        return res.status(201).send({status:"ok", success: true, message:"Note created successfully"});
    }catch(err){
        return res.status(500).send({status:"failed", message:"Could not create note"});
    }
}

const updateNotes = async (req, res) =>{
    try {
        const note = await NotesModel.findById(req.params.id);
        if (!note) {
            return res.status(404).send({ status: "failed", message: "Note not found" });
        }
        if (!note.userId.equals(req.token.userId)) {
            return res.status(403).send({ status: "failed", message: "Unauthorized" });
        }
        const updatedNote = await NotesModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).send({ status: "ok", message: "Note updated successfully", note: updatedNote });
    } catch (err) {
        return res.status(500).send({ status: "failed", message: "Error updating note" });
    }
}
const deleteNote = async (req, res) =>{
    try {
        const note = await NotesModel.findById(req.params.id);
        if (!note) {
            return res.status(404).send({ status: "failed", message: "Note not found" });
        }
        if (!note.userId.equals(req.token.userId)) {
            return res.status(403).send({ status: "failed", message: "Unauthorized" });
        }
        await NotesModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({ status: "ok", message: "Note deleted successfully" });
    } catch (err) {
        return res.status(500).send({ status: "failed", message: "Error deleting note" });
    }
}
export {getNotes, createNote, updateNotes, deleteNote};