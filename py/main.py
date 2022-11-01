from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/", StaticFiles(directory="../build/static", html = True), name="index.html")
#app.mount("/static", StaticFiles(directory="../static"), name="static")

#@app.get("/")
#async def root():
#    return {"message": "Hello World"}