import React, { useState, useEffect } from 'react';
import { NoteForm } from './components/NoteForm';
import { NoteList } from './components/NoteList';
import { Hero } from './components/Hero';
import { Note } from './types/Note';
import { fetchNotes, createNote } from './services/api';
import './App.css';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const fetchedNotes = await fetchNotes();
        setNotes(fetchedNotes);
        setLoading(false);
      } catch (err) {
        setError('Failed to load notes. Please try again later.');
        setLoading(false);
      }
    };

    loadNotes();
  }, []);

  const handleSaveNote = async (noteData: Omit<Note, 'id' | 'createdAt'>) => {
    try {
      const newNote = await createNote(noteData.content, noteData.attachment || null);
      setNotes([newNote, ...notes]);
    } catch (err) {
      setError('Failed to save note. Please try again.');
    }
  };

  return (
    <div className="app">
      <Hero />
      <div className="notes-section">
        <h2>My Notes</h2>
        {error && <div className="error-message">{error}</div>}
        <NoteForm onSave={handleSaveNote} />
        {loading ? (
          <div className="loading">Loading notes...</div>
        ) : (
          <NoteList notes={notes} />
        )}
      </div>
    </div>
  );
}

export default App; 