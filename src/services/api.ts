import { Note } from '../types/Note';

const API_URL = '/api';
// For development, you might want to use the full URL:
// const API_URL = 'http://localhost:8000/api';

export const fetchNotes = async (): Promise<Note[]> => {
  try {
    console.log('Fetching notes from:', `${API_URL}/notes`);
    const response = await fetch(`${API_URL}/notes`);
    
    console.log('Response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to fetch notes: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Received data:', data);
    
    return data.map((note: any) => ({
      id: note.id,
      content: note.content,
      createdAt: new Date(note.created_at),
      attachment: note.attachment_path ? { name: note.attachment_path } : null
    }));
  } catch (error) {
    console.error('Error in fetchNotes:', error);
    throw error;
  }
};

export const createNote = async (content: string, attachment: File | null): Promise<Note> => {
  const formData = new FormData();
  formData.append('content', content);
  
  if (attachment) {
    formData.append('attachment', attachment);
  }
  
  const response = await fetch(`${API_URL}/notes`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to create note');
  }
  
  const data = await response.json();
  return {
    id: data.id,
    content: data.content,
    createdAt: new Date(data.created_at),
    attachment: data.attachment_path ? { name: data.attachment_path } : null
  };
}; 