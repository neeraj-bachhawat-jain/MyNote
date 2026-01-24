import React from 'react'
import Navbar from '../Components/Navbar'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LeftNav from '../Components/LeftNav';
import RightNav from '../Components/RightNav';
import Footer from '../Components/Footer'

export default function Notes() {
  let navigate = useNavigate();
  let [firstname, setFirstname] = useState("");
  let [id, setId] = useState("");
  let [selectedNote, setSelectedNote] = useState(null);
  let [heading, setHeading] = useState("");
  let [noteContent, setNoteContent] = useState("");

  useEffect(()=>{
    let userData = JSON.parse(localStorage.getItem('userData'));
    let token  = userData?.token;
    if(!token){
        navigate("/");
    }else{
      setFirstname(userData?.firstname);
      setId(userData?.id);
    }
  },[]);
  const handleOnClick = (note) => {
    setSelectedNote(true);
    setHeading(note.title);
    setNoteContent(note.content);
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar login='true' title='MyNotes' username={firstname} id={id}></Navbar>
      <div className="flex flex-1 flex-col md:flex-row gap-4 p-4 md:p-6 overflow-hidden">
        <div className="w-full md:w-1/4 lg:w-1/5 bg-gray-800 rounded-lg shadow-lg overflow-auto">
          <LeftNav handleOnClick={handleOnClick} />
        </div>
        <div className="w-full md:w-3/4 lg:w-4/5 bg-gray-800 rounded-lg shadow-lg overflow-auto">
          <RightNav setSelectedNote={setSelectedNote} selectedNote={selectedNote} heading={heading} noteContent={noteContent} />
        </div>
      </div>
      <Footer />
    </div>
  )
}
