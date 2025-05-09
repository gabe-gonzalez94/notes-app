import uvicorn
import os

print("Current working directory:", os.getcwd())
print("Checking if app/main.py exists:", os.path.exists("app/main.py"))

if __name__ == "__main__":
    print("Starting FastAPI server...")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True) 