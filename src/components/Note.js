import React, { useState, useContext, useEffect } from 'react'
import './Note.css'
import NoteContext from '../context/notes/noteContext'
import { Modal, Form, Button } from 'react-bootstrap'

function MyVerticallyCenteredEditModal(props) {
    const context  = useContext(NoteContext)
    const {editNote} = context
    const [note, setNote] = useState({ title: props.title, content: props.content, tag: props.tag })

    const handleClick = (event) => {
        event.preventDefault()
        editNote(props.id, note.title, note.content, note.tag)
        props.setNoteUI({title : note.title, content : note.content, tag : note.tag})
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
                    <Modal.Title>Edit your Note</Modal.Title>
                </Modal.Header>
                <Form className="addNoteForm">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tag</Form.Label>
                        <Form.Control name="tag" value={note.tag} onChange={handleChange} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" value={note.title} onChange={handleChange} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" rows={3} name="content" value={note.content} onChange={handleChange} required/>
                    </Form.Group>
                    <Button disabled={note.content.length < 5 || note.title.length < 2} variant="dark" type="submit" onClick={handleClick}>
                        Save changes
                    </Button>
                </Form>
            </Modal>
        </div>
    );
}

function MyVerticallyCenteredDeleteModal(props) {
    const context = useContext(NoteContext)
    const {deleteNote} = context
    
    const handleClick = (event) => {
        event.preventDefault()
        deleteNote(props.id)
        props.onHide()
    }

    return (
      <Modal
        {...props}
        size="m"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete this note?
          </p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="dark" onClick={handleClick}>Yes</Button>
            <Button variant="dark" onClick={props.onHide}>No</Button>
        </Modal.Footer>
      </Modal>
    );
  }

function Note(props) {
    const { title, content, tag, _id } = props.note
    const [modalEditShow, setModalEditShow] = useState(false)
    const [modalDeleteShow, setModalDeleteShow] = useState(false)
    const [note, setNote] = useState({title, content, tag})

    useEffect(() => {
        setNote({title, content, tag})
    }, [title, content, tag])

    return (
        <div className="Note col card text-dark bg-light mb-3">
            <div className="card-header">
                <div>{note.tag}</div>
                <div className="crud">
                    <i className="fas fa-trash-alt fa-xs" onClick={() => setModalDeleteShow(true)}></i>
                    <i className="fas fa-edit fa-xs" onClick={() => setModalEditShow(true)}></i>
                </div>
            </div>
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.content}</p>
            </div>
            <MyVerticallyCenteredEditModal
                show={modalEditShow}
                onHide={() => setModalEditShow(false)}
                title={title}
                content={content}
                tag={tag}
                id={_id}
                setNoteUI={setNote}
            />
            <MyVerticallyCenteredDeleteModal
                show={modalDeleteShow}
                onHide={() => setModalDeleteShow(false)}
                id={_id}
            />
        </div>
    )
}

export default Note
