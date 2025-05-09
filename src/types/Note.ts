export interface Note {
  id: string;
  content: string;
  attachment?: File | null;
  createdAt: Date;
} 