import React from "react";
import { useForm } from "react-hook-form";
import { createLogEntry } from "../utils/API";

function LogEntryForm({ latitude, longitude, onClose }: any): any {
  const { register, handleSubmit } = useForm<any>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const entry = { ...data, latitude, longitude };
      await createLogEntry(entry);
      setLoading(false);
      onClose();
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      {error && <h3 className="error">{error}</h3>}

      <label htmlFor="title">Title</label>
      <input type="text" name="title" required ref={register} />
      <label htmlFor="comments">Comments</label>
      <textarea name="comments" id="" rows={3} ref={register}></textarea>
      <label htmlFor="description">Description</label>
      <textarea name="description" rows={3} ref={register}></textarea>
      <label htmlFor="image">Image</label>
      <input name="image" type="text" ref={register} />
      <label htmlFor="visitDate">Visit Date</label>
      <input type="date" name="visitDate" ref={register} />
      <button type="submit" disabled={loading} className="submit-button">
        {loading ? "Submitting Entry.." : "Create new entry"}
      </button>
    </form>
  );
}

export default LogEntryForm;
