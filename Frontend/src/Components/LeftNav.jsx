import { useState, useEffect } from 'react'
import axios from 'axios'

export default function LeftNav({handleOnClick}) {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);
    
    const fetchNotes = async () =>{
        try{
            const res = await axios.get('http://localhost:5000/notes', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userData'))?.token}`
                }
            });
            setNotes(res.data);
        }catch(err){
            setError(err);
        }
    }
    
    const handleDelete = async (noteId) => {
        try {
            await axios.delete(`http://localhost:5000/notes/${noteId}`, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userData'))?.token}`
                }
            });
            setNotes(notes.filter((_, index) => notes[index]._id !== noteId));
        } catch(err) {
            setError(err);
        }
    }
    
    useEffect(() => {
        fetchNotes();
    }, []);

    const [activeNoteId, setActiveNoteId] = useState(null);

    return (
        <div className='w-full h-full px-2 sm:px-3 md:px-4 py-6 sm:py-8 md:py-12 flex flex-col'>
            <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 truncate'>Your Notes</h2>
            {notes.length === 0 && <p className='text-gray-400 text-xs sm:text-sm animate-pulse'>Loading notes...</p>}
            {error && <p className='text-red-400 text-xs sm:text-sm bg-red-900/20 p-2 rounded'>Error: {error.message}</p>}
            <ul className='space-y-2 sm:space-y-3 md:space-y-4 overflow-y-auto flex-1'>
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <li key={note._id} className='flex items-center gap-1 sm:gap-2'>
                            <div className='bg-gradient-to-b from-gray-900 to-gray-950 flex w-full rounded-lg'>
                                <button onClick={() => {handleOnClick(note); setActiveNoteId(note._id);}} className={`flex-1 p-2 sm:p-3 md:p-4 rounded-lg transition-colors duration-200 text-white group ${activeNoteId === note._id ? 'bg-blue-700' : 'hover:bg-blue-700'}`}>
                                    <h3 className='text-sm sm:text-base md:text-lg font-semibold truncate group-hover:text-blue-100'>{note.title}</h3>
                                    <p className='text-xs text-gray-400 truncate hidden sm:block'>Click to view</p>
                                </button>
                                <button onClick={() => handleDelete(note._id)} className='p-1.5 sm:p-2 hover:bg-red-700 rounded transition-colors duration-200 flex-shrink-0'>
                                    <svg className='w-4 sm:w-5 h-4 sm:h-5 text-white' fill='currentColor' viewBox='0 0 20 20'><path fillRule='evenodd' d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z' clipRule='evenodd' /></svg>
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className='text-gray-400 text-xs sm:text-sm text-center py-8'>No notes yet</p>
                )}
            </ul>
        </div>
    )
}
