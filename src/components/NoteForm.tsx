import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Note } from '../types/Note';

interface NoteFormProps {
  onSave: (note: Omit<Note, 'id' | 'createdAt'>) => void;
}

export const NoteForm = ({ onSave }: NoteFormProps) => {
  const [content, setContent] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleAttachmentChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({
      content,
      attachment
    });
    setContent('');
    setAttachment(null);
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Write your note here..."
        rows={4}
        required
      />
      <div className="form-footer">
        <input
          type="file"
          onChange={handleAttachmentChange}
          accept="image/*,.pdf"
        />
        <button type="submit">Save Note</button>
      </div>
    </form>
  );
}; 