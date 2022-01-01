import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../context/auth/authContext'
import NoteContext from '../context/notes/noteContext'
import Note from './Note'
import './MyNotes.css'
import { Modal, Form, Button } from 'react-bootstrap'

function MyVerticallyCenteredModal(props) {
    const noteContext  = useContext(NoteContext)
    const {addNote} = noteContext
    const [note, setNote] = useState({ title: "", content: "", tag: "General" })

    const handleClick = (event) => {
        event.preventDefault()
        addNote(note)
        setNote({ title: "", content: "", tag: "General" })
        props.onHide()
    }

    const handleChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
    }
    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add a Note</Modal.Title>
                </Modal.Header>
                <Form className="addNoteForm">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tag</Form.Label>
                        <Form.Control name="tag" value={note.tag} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" value={note.title} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" rows={3} name="content" value={note.content} onChange={handleChange} required />
                    </Form.Group>
                    <Button disabled={note.content.length < 5 || note.title.length < 2} variant="dark" type="submit" onClick={handleClick}>
                        Submit
                    </Button>
                </Form>
            </Modal>
        </div>
    );
}

export const MyNotes = () => {
    const noteContext = useContext(NoteContext)
    const authContext = useContext(AuthContext)
    const { notes, fetchNotes } = noteContext
    const { loginState } = authContext
    const [modalShow, setModalShow] = useState(false)
    let history = useHistory()

    useEffect(() => {
        if(loginState)
            fetchNotes(history)
        else
            history.push('/login')
    })

    return (
        <div>
            <div className="myNotes row row-cols-1 row-cols-md-5 g-4">
                {notes.map((note, index) => {
                    return <Note key={index} note={note}/>
                })}
            </div>
            <button className="addButton bg-dark" onClick={() => setModalShow(true)}>
                <div>+</div>
            </button>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}