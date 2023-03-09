import React from 'react'

function NoteContainer({note, setNote, addNote, showNoteBox}) {
  return (
    <div className={`${showNoteBox ? "show" : "visually-hidden"}`}>
        <div className='d-flex align-self-end w-100 p-2' >
            <div className='flex-columns'>
                <div><h3 className='text-light'>Add Note</h3></div>
                <div className='d-flex w-100'>
                    <input className='w-100 border rounded' type="text" value={note} onChange={(e) => setNote(e.target.value)}/>
                    <div className='text-light btn btn-primary mx-2' onClick={() => addNote()}>Add</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NoteContainer