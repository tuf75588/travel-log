import React from "react";
import { useForm } from "react-hook-form";
import { createLogEntry } from "../utils/API";
type formData = {
  title: string;
  comments: string;
  description: string;
  image: string;
  date: string;
};
function LogEntryForm({ latitude, longitude }: any): any {
  const { register, handleSubmit } = useForm<any>();
  const onSubmit = async (data: object) => {
    const entry = { ...data, latitude, longitude };
    const newEntry = await createLogEntry(entry);
    console.log(newEntry);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
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
      <button type="submit" className="submit-button">
        Create Log Entry
      </button>
    </form>
  );
}

export default LogEntryForm;
