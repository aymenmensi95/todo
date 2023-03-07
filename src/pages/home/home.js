import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

import DeleteBtn from "../../components/delete-btn/delete-btn";
import AddTaskForm from "../../components/add-task-form";
import Footer from "../../components/footer/footer";

import "./styles.scss";

const DATA_STORAGE_KEY = "todo-data-test";

const Home = ({ loginStorageKey, loginStorageValue }) => {
  const [taskList, setTaskList] = React.useState([]);
  const [ASC, setASC] = React.useState(true);
  const [toEdit, setToEdit] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    const isLoggedIn =
      localStorage.getItem(loginStorageKey) === loginStorageValue;
    if (!isLoggedIn) {
      navigate("/todo/login");
    }
  }, [loginStorageKey, loginStorageValue, navigate]);

  React.useEffect(() => {
    const data = localStorage.getItem(DATA_STORAGE_KEY);
    setTaskList(data ? JSON.parse(data) : []);
  }, []);

  const scrollToTask = (id) => {
    document.getElementById(`task-${id}`).scrollIntoView();
  };

  const saveData = (data) => {
    localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data));
  };

  const handleCheck = (id) => {
    const dataToSave = taskList.map((t) => {
      if (id === t.id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setTaskList(dataToSave);
    saveData(dataToSave);
  };

  const deleteTask = (id) => {
    const dataToSave = taskList.filter((t) => id !== t.id);
    setTaskList(dataToSave);
    saveData(dataToSave);
  };

  const addTask = (data) => {
    setTaskList((prev) => {
      let dataToSave = [...prev];

      if (!!toEdit) {
        dataToSave = prev.map((t) =>
          t.id === toEdit.id ? { ...t, ...data } : t
        );
      } else {
        dataToSave.push({
          id: taskList.length + 1,
          ...data,
          completed: false,
        });
      }
      saveData(dataToSave);
      return dataToSave;
    });

    if (!!toEdit) {
      scrollToTask(toEdit.id);
      setToEdit(null);
    }
  };

  const completedTasks = React.useMemo(
    () => taskList.filter((t) => t.completed),
    [taskList]
  );
  const notCompletedTasks = React.useMemo(
    () => taskList.filter((t) => !t.completed),
    [taskList]
  );

  const deleteAll = (list) => {
    const ids = list.map((t) => t.id);

    setTaskList((prev) => {
      const cleanList = prev.filter((t) => !ids.includes(t.id));
      saveData(cleanList);
      return cleanList;
    });
  };
  const deleteAllBtn = (list) => {
    return list.length ? (
      <DeleteBtn className="delete-all" onConfirm={() => deleteAll(list)}>
        Delete all
      </DeleteBtn>
    ) : (
      <></>
    );
  };

  const renderTasks = (list) =>
    list?.map((task, index) => (
      <div key={task.id} id={`task-${task.id}`} className="task">
        <span className="title" title={`${task.title}\n${task.description}`}>
          <span>{task.title}</span>
          {task.description && <small>{task.description}</small>}
        </span>
        <div className="actions">
          <DeleteBtn className="delete" onConfirm={() => deleteTask(task.id)}>
            Delete
          </DeleteBtn>
          <span
            className="edit"
            onClick={() => {
              setToEdit(task);
              window.scrollTo(0, 0);
            }}
          >
            Edit
          </span>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleCheck(task.id)}
          />
        </div>
      </div>
    ));

  return (
    <div className="home-page">
      <div className="top-bar">
        <span className="logo">ToDo</span>
        <Link className="btn danger sm" to="/todo/logout">
          Logout
        </Link>
      </div>
      <div className="page-body">
        <h1>
          Tasks List{" "}
          <span onClick={() => setASC((prev) => !prev)}>
            Sort By Status{" "}
            <i
              dangerouslySetInnerHTML={{ __html: ASC ? "&uarr;" : "&darr;" }}
            />{" "}
          </span>
        </h1>
        <AddTaskForm
          data={toEdit}
          onAdd={addTask}
          onCancel={() => {
            if (!!toEdit) {
              scrollToTask(toEdit.id);
              setToEdit(null);
            }
          }}
        />
        <div className={`tasks ${ASC ? "" : "flip"}`}>
          <section className="tasks-wrapper">
            <h2 className="section-title">
              Not Completed Tasks ({notCompletedTasks.length})
              {deleteAllBtn(notCompletedTasks)}
            </h2>
            {renderTasks(notCompletedTasks)}
          </section>
          <section className="tasks-wrapper">
            <h2 className="section-title">
              Completed Tasks ({completedTasks.length})
              {deleteAllBtn(completedTasks)}
            </h2>
            {renderTasks(completedTasks)}
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
