import { FormEvent, useEffect, useState } from "react";
import api from "../api";
import AddNoteForm from "../components/AddNoteForm";
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
  const [isLoading, setIsLoading] = useState(false);

  const getNotes = async () => {
    setIsLoading(true);
    const response = await api.get("/api/notes/");
    const notesData = (await response.data) as NoteType[];
    setNotes(notesData);
    setIsLoading(false);
  };

  const deleteNote = async (noteId: number) => {
    setIsLoading(true);
    const response = await api.delete(`/api/notes/${noteId}/`);
    if (response.status === 204) {
      alert("Note deleted successfully!");
      setNotes(notes.filter((note) => note.id !== noteId));
      setIsLoading(false);
    } else if (response.status === 404) {
      alert("Note not found!");
      setIsLoading(false);
    } else {
      alert("Failed to delete note!");
      setIsLoading(false);
    }
  };

  const addNote = async () => {
    setIsLoading(true);
    const response = await api.post("/api/notes/", { title, content });
    if (response.status === 201) {
      alert("Note added successfully!");
      setNotes([...notes, response.data]);
      setIsLoading(false);
    } else if (response.status === 400) {
      alert("Invalid note data!");
      setIsLoading(false);
    } else {
      alert("Failed to add note!");
      setIsLoading(false);
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

      <AddNoteForm
        handleSubmit={handleSubmit}
        title={title}
        content={content}
        setContent={setContent}
        setTitle={setTitle}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Home;
