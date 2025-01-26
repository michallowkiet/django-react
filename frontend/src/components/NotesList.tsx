import { NoteType } from "../pages/Home";
import Note from "./Note";

type NotesListProps = {
  notes: NoteType[];
  deleteNote: (id: number) => void;
};

const NotesList = ({ notes, deleteNote }: NotesListProps) => {
  return (
    <ul className="note-list">
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          onDelete={deleteNote}
        />
      ))}
    </ul>
  );
};

export default NotesList;
