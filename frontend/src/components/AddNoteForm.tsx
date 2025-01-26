type AddNoteFormProps = {
  title: string;
  content: string;
  isLoading: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
};

const AddNoteForm = ({
  title,
  content,
  isLoading,
  handleSubmit,
  setTitle,
  setContent,
}: AddNoteFormProps) => {
  return (
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
        disabled={isLoading}
      >
        Add Note
      </button>
    </form>
  );
};

export default AddNoteForm;
