import { FormEvent, useEffect, useState } from "react";
import api from "../api";
import NotesList from "../components/NotesList";
import "../styles/Home.css";

export type NoteType = {
  id: number;
  title: string;
  content: string;
  author: number;
  createdAt: string;
  updatedAt: string;
};

const Home = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const getNotes = async () => {
    const response = await api.get("/api/notes/");
    const notesData = (await response.data) as NoteType[];
    setNotes(notesData);
  };

  const deleteNote = async (noteId: number) => {
    const response = await api.delete(`/api/notes/${noteId}/`);
    if (response.status === 204) {
      alert("Note deleted successfully!");
      setNotes(notes.filter((note) => note.id !== noteId));
    } else if (response.status === 404) {
      alert("Note not found!");
    } else {
      alert("Failed to delete note!");
    }
  };

  const addNote = async () => {
    const response = await api.post("/api/notes/", { title, content });
    if (response.status === 201) {
      alert("Note added successfully!");
      setNotes([...notes, response.data]);
    } else if (response.status === 400) {
      alert("Invalid note data!");
    } else {
      alert("Failed to add note!");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addNote();
    setTitle("");
    setContent("");
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="container">
      <h1>Notes App</h1>
      <section className="note-section">
        <h2>List of Notes</h2>
        <NotesList
          notes={notes}
          deleteNote={deleteNote}
        />
      </section>

      <form
        className="form-container"
        onSubmit={handleSubmit}
      >
        <input
          className="form-input"
          type="text"
          name="title"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="form-input"
          name="content"
          placeholder="Content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          className="form-button"
          type="submit"
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default Home;
