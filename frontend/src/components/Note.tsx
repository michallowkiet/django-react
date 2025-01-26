import { NoteType } from "../pages/Home";
import "../styles/Note.css";

type NoteProps = {
  note: NoteType;
  onDelete: (noteId: number) => void;
};

const Note = ({ note, onDelete }: NoteProps) => {
  return (
    <li className="note-container note">
      <h2 className="note-title">{note.title}</h2>
      <p className="note-content">{note.content}</p>
      <p className="note-date">
        Created at: {new Date(note.createdAt).toLocaleString()}
      </p>
      <p className="note-date">
        Last updated at: {new Date(note.updatedAt).toLocaleString()}
      </p>
      <button
        className="delete-button"
        onClick={() => onDelete(note.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default Note;
