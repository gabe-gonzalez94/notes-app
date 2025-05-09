import { Note } from '../types/Note';
import React from 'react';

interface NoteListProps {
  notes: Note[];
}

export const NoteList = ({ notes }: NoteListProps) => {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <div key={note.id} className="note-item">
          <p>{note.content}</p>
          {note.attachment && (
            <div className="attachment">
              <span>📎 {note.attachment.name}</span>
            </div>
          )}
          <small>{note.createdAt.toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
}; 