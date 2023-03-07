import * as React from "react";

import Button from "../button/button";
import Input from "../input/input";

import "./styles.scss";

const AddTaskForm = ({ data, onAdd, onCancel }) => {
  const [title, setTitle] = React.useState(data?.title || "");
  const [description, setDescription] = React.useState(data?.description || "");

  const titleRef = React.useRef(null);

  React.useEffect(() => {
    setTitle(data?.title || "");
    setDescription(data?.description || "");
    titleRef.current.focus();
  }, [data]);

  const onReset = () => {
    setTitle("");
    setDescription("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!!title) {
      onAdd && onAdd({ title, description });
      onReset();
    }
  };

  const disableEdit = React.useMemo(
    () =>
      (!title || data?.title === title.trim()) &&
      data?.description === description.trim(),
    [data, title, description]
  );

  return (
    <form className="add-task-form" onSubmit={onSubmit}>
      <div className="line">
        <div className="col">
          <Input
            ref={titleRef}
            placeholder="Task Title"
            value={title}
            onChange={setTitle}
            required
            autoFocus
          />
        </div>
        <div className="col">
          <Input
            placeholder="Task Description"
            value={description}
            onChange={setDescription}
          />
        </div>
        <div className="btn-col">
          <Button type="submit" className="primary" disabled={disableEdit}>
            {data?.title ? "Edit" : "Add"}
          </Button>
        </div>
        <div className="btn-col">
          <Button
            type="reset"
            className="danger"
            onClick={() => {
              onCancel && onCancel();
              onReset();
            }}
          >
            {data?.title ? "Cancel" : "Reset"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddTaskForm;
