import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function RightNav({ selectedNote, setSelectedNote, heading, noteContent }) {
  const [createNoteClicked, setCreateNoteClicked] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreateNote = () => {
    setCreateNoteClicked(true);
    setSelectedNote(false);
  };
  const handleSaveNote = async (e) => {
    e.preventDefault();
    let payload = {
      title: title,
      content: content,
    };
    try {
      let res = await axios.post("https://mynote-backend-s1ae.onrender.com/notes", payload, {
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
      } else {
        toast.error("Failed to create note");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Failed to create note";
      toast.error(message);
      console.error(err.response?.data);
    }
  };

  const handlePaste = async (e) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        e.preventDefault();
        const file = items[i].getAsFile();
        const reader = new FileReader();
        reader.onload = (event) => {
          const imgDataUrl = event.target.result;
          setContent(prev => prev + `\n![Pasted Image](${imgDataUrl})\n`);
        };
        reader.readAsDataURL(file);
        break; // Only handle the first image
      }
    }
  };

  const renderContent = (content) => {
    return content
      .replace(/\n/g, '<br />')
      .replace(/!\[Pasted Image\]\((.*?)\)/g, '<img src="$1" alt="Pasted Image" class="max-w-full h-auto my-2" />');
  };

  return (
    <div className="p-4 w-full">
      <div className="mb-4 flex justify-end items-center">
        <button 
          className="create-note-button bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
          onClick={handleCreateNote}
        >
          + Create Note
        </button>
      </div>
      <div className="notes">
        {selectedNote ? (
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-4">{heading}</h2>
            <div className="border border-gray-700 p-4 rounded" dangerouslySetInnerHTML={{ __html: renderContent(noteContent) }}></div>
          </div>
        ) : (
          createNoteClicked ? (
          <div className="new-note-form p-4 border border-gray-300 rounded-lg shadow-sm ">
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
                onPaste={handlePaste}
              ></textarea>
              <button
                type="submit"
                className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition"
                onClick={handleSaveNote}
              >
                Save Note
              </button>
            </form>
          </div>
        ) : (
          <p className="text-gray-600">
            Click "Create Note" to add a new note.
          </p>
        ))}
      </div>
    </div>
  );
}
