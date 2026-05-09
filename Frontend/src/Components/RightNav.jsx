import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function RightNav({ selectedNote, setSelectedNote, heading, noteContent, noteId }) {
  const [createNoteClicked, setCreateNoteClicked] = useState(false);
  const [editNoteClicked, setEditNoteClicked] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreateNote = () => {
    setCreateNoteClicked(true);
    setEditNoteClicked(false);
    setSelectedNote(false);
    setTitle("");
    setContent("");
  };
  const handleEditNote = () => {
    setEditNoteClicked(true);
    setCreateNoteClicked(false);
    setTitle(heading);
    setContent(noteContent);
  };
  const handleSaveNote = async (e) => {
    e.preventDefault();
    let payload = {
      title: title,
      content: content,
    };
    try {
      let res = await axios.post("http://localhost:5000/notes", payload, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('userData'))?.token}`,
        },
      });
      if (res.status === 201) {
        toast.success("Note created successfully");
        setCreateNoteClicked(false);
        setTitle("");
        setContent("");
        window.location.reload();
      } else {
        toast.error("Failed to create note");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Failed to create note";
      toast.error(message);
      console.error(err.response?.data);
    }
  };
  const handleUpdateNote = async (e) => {
    e.preventDefault();
    let payload = {
      title: title,
      content: content,
    };
    try {
      let res = await axios.put(`http://localhost:5000/notes/${noteId}`, payload, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('userData'))?.token}`,
        },
      });
      if (res.status === 200) {
        toast.success("Note updated successfully");
        setEditNoteClicked(false);
        setSelectedNote(false);
        setTitle("");
        setContent("");
        window.location.reload();
      } else {
        toast.error("Failed to update note");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update note";
      toast.error(message);
      console.error(err.response?.data);
    }
  };
  return (
    <div className="p-4 w-full">
      <div className="mb-4 flex justify-end items-center">
        {selectedNote && <button 
          className="create-note-button bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition mr-1.5"
          onClick={handleEditNote}
        >
          Edit Note
        </button>}
        <button 
          className="create-note-button bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
          onClick={handleCreateNote}
        >
          + Create Note
        </button>
      </div>
      <div className="notes">
        {selectedNote && !editNoteClicked ? (
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-4">{heading}</h2>
            <p className="border border-gray-700 p-4 rounded">{noteContent}</p>
          </div>
        ) : editNoteClicked ? (
          <div className="edit-note-form p-4 border border-gray-300 rounded-lg shadow-sm ">
            <h3 className="text-xl font-bold mb-4 text-white">Edit Note</h3>
            <form>
              <input
                type="text"
                placeholder="Title..."
                className="w-full p-2 border border-gray-300 rounded mb-2 text-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Content...."
                rows={8}
                className="w-full p-2 border border-gray-300 rounded mb-2 text-white"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition"
                  onClick={handleUpdateNote}
                >
                  Update Note
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition"
                  onClick={() => {
                    setEditNoteClicked(false);
                    setSelectedNote(true);
                    setTitle("");
                    setContent("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : createNoteClicked ? (
          <div className="new-note-form p-4 border border-gray-300 rounded-lg shadow-sm ">
            <h3 className="text-xl font-bold mb-4 text-white">Create New Note</h3>
            <form>
              <input
                type="text"
                placeholder="Title..."
                className="w-full p-2 border border-gray-300 rounded mb-2 text-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Content...."
                rows={8}
                className="w-full p-2 border border-gray-300 rounded mb-2 text-white"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition"
                  onClick={handleSaveNote}
                >
                  Save Note
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition"
                  onClick={() => {
                    setCreateNoteClicked(false);
                    setTitle("");
                    setContent("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <p className="text-gray-600">
            Click "Create Note" to add a new note.
          </p>
        )}
      </div>
    </div>
  );
}
