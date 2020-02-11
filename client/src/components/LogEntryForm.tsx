import React from "react";
import { useForm } from "react-hook-form";

type formData = {
  title: string;
  comments: string;
  description: string;
  image: string;
  date: string;
};
function LogEntryForm(): any {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = (formData: any) => {
    handleSubmit(formData);
  };
  return (
    <form onSubmit={onSubmit} className="entry-form">
      <label htmlFor="title">Title</label>
      <input type="text" name="title" required />
      <label htmlFor="comments">Comments</label>
      <textarea name="comments" id="" rows={3}></textarea>
      <label htmlFor="description">Description</label>
      <textarea name="description" rows={3}></textarea>
      <label htmlFor="image">Image</label>
      <input name="image" type="file" />
      <label htmlFor="visitDate">Visit Date</label>
      <input type="date" name="visitDate" />
      <button type="submit" className="submit-button">
        Create Log Entry
      </button>
    </form>
  );
}

export default LogEntryForm;
