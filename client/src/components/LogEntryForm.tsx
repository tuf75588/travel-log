import React from "react";

function LogEntryForm(): any {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
      }}
      className="entry-form"
    >
      <label htmlFor="title">Title</label>
      <input type="text" name="title" required />
      <label htmlFor="comments">Comments</label>
      <textarea name="" id="" rows={3}></textarea>
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
