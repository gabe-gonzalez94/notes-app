import React, { useState } from 'react';
import { NoteForm } from './components/NoteForm';
import { NoteList } from './components/NoteList';
import { Note } from './types/Note';
import './App.css';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  const handleSaveNote = (noteData: Omit<Note, 'id' | 'createdAt'>) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      content: noteData.content,
      attachment: noteData.attachment,
      createdAt: new Date()
    };
    setNotes([newNote, ...notes]);
  };

  return (
    <div className="app">
      <h1>Notes App</h1>
      <NoteForm onSave={handleSaveNote} />
      <NoteList notes={notes} />
    </div>
  );
}

export default App; 