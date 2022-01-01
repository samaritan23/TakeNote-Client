import NoteContext from './noteContext'
import { useState } from 'react'

const NoteState = (props) => {
  const [notes, setNotes] = useState([])
  //Below function is for adding a note
  const fetchNotes = async (history) => {
    //API call required for adding to database
    const response = await fetch(`${process.env.REACT_APP_HOST}/api/notes/fetchNotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json()
    if(json.error){
      history.push('/login')
      console.clear()
    }
    else{
      setNotes(json)
      // console.log(json)
    }
  }


  //Below function is for adding a note
  const addNote = async (note) => {
    //API call required for adding to database
    await fetch(`${process.env.REACT_APP_HOST}/api/notes/addNote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(note)
    });
    setNotes(notes.concat(note))
    props.showAlert("Note added", "success")
  }

  //Below function is for editing a note
  const editNote = async (id, title, content, tag) => {
    await fetch(`${process.env.REACT_APP_HOST}/api/notes/updateNote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ "title": title, "content": content, "tag": tag })
    });
    for (let i = 0; i < notes.length; i++) {
      if (notes[i]._id === id) {
        notes[i].title = title
        notes[i].content = content
        notes[i].tag = tag
      }
    }
    setNotes(notes)
    props.showAlert("Note saved", "success")
  }

  //Below function is for deleting a note
  const deleteNote = async (id) => {
    //API call required for deleting from database
    await fetch(`${process.env.REACT_APP_HOST}/api/notes/deleteNote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    // const newNotes = notes.filter(note => note._id !== json._id)
    // setNotes(newNotes)
    props.showAlert("Note deleted", "success")
  }


  return (
    <NoteContext.Provider value={{ notes, fetchNotes, addNote, deleteNote, editNote, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState