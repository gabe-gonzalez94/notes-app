from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional, List
import uuid
from datetime import datetime
import os
import shutil

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory if it doesn't exist
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Models
class NoteBase(BaseModel):
    content: str

class NoteCreate(NoteBase):
    pass

class Note(NoteBase):
    id: str
    created_at: datetime
    attachment_path: Optional[str] = None

    class Config:
        orm_mode = True

# In-memory database for now
notes_db = []

# API Routes
@app.get("/api")
def read_root():
    return {"message": "Welcome to Notes API"}

@app.get("/api/notes", response_model=List[Note])
def get_notes():
    return notes_db

@app.post("/api/notes", response_model=Note)
async def create_note(content: str = Form(...), attachment: Optional[UploadFile] = File(None)):
    attachment_path = None
    
    # Handle file upload if attachment is provided
    if attachment:
        file_extension = os.path.splitext(attachment.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        attachment_path = os.path.join(UPLOAD_DIR, unique_filename)
        
        with open(attachment_path, "wb") as buffer:
            shutil.copyfileobj(attachment.file, buffer)
    
    # Create new note
    new_note = Note(
        id=str(uuid.uuid4()),
        content=content,
        created_at=datetime.now(),
        attachment_path=attachment_path
    )
    
    notes_db.append(new_note)
    return new_note

@app.get("/api/notes/{note_id}", response_model=Note)
def get_note(note_id: str):
    for note in notes_db:
        if note.id == note_id:
            return note
    raise HTTPException(status_code=404, detail="Note not found")

# Serve frontend static files
if os.path.exists("../frontend/dist"):
    app.mount("/", StaticFiles(directory="../frontend/dist", html=True), name="static")

    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        if os.path.exists(f"../frontend/dist/{full_path}"):
            return FileResponse(f"../frontend/dist/{full_path}")
        return FileResponse("../frontend/dist/index.html") 