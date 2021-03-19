
import { useEffect, useMemo, useState } from 'react'
import { Link } from '@reach/router'

import DeleteBtn from '../../components/delete-btn/delete-btn'
import AddTaskForm from '../../components/add-task-form'
import Footer from '../../components/footer/footer'

import './styles.scss'

const DATA_STORAGE_KEY = 'todo-data-test'

const Home = () => {
  const [taskList, setTaskList] = useState([])
  const [ASC, setASC] = useState(true)
  const [toEdit, setToEdit] = useState(null)

  useEffect(() => {
    const data = localStorage.getItem(DATA_STORAGE_KEY)
    setTaskList(data ? JSON.parse(data) : [])
  }, [])

  const saveData = data => {
    localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data))
  }


  const handleCheck = id => {
    const dataToSave = taskList.map(t => {
      if(id === t.id) {
        return {...t, completed: !t.completed}
      }
      return t
    })
    setTaskList(dataToSave)
    saveData(dataToSave)
  }

  const deleteTask = id => {
    const dataToSave = taskList.filter(t => id !== t.id)
    setTaskList(dataToSave)
    saveData(dataToSave)
  }

  const addTask = data => {
    const dataToSave = toEdit ? taskList.map(t => t.id === toEdit.id ? ({...t, ...data}) : t) : [...taskList,  {
      id: taskList.length + 1,
      ...data,
      completed: false,
    }]
    setTaskList(dataToSave)
    saveData(dataToSave)
    setToEdit(null)
  }


  const completedTasks = useMemo(() => taskList.filter(t => t.completed), [taskList])
  const notCompletedTasks = useMemo(() => taskList.filter(t => !t.completed), [taskList])


  const renderTasks = list => list?.map((task, index) => (
    <div key={index} className="task">
      <span className="title">{task.title} {task.description  && <small>{task.description}</small>}</span>
      <div className="actions">
        <DeleteBtn className="delete" onConfirm={() => deleteTask(task.id)}>Delete</DeleteBtn>
        <span className="edit" onClick={() => setToEdit(task)}>Edit</span>
        <input type="checkbox" checked={task.completed} onChange={() => handleCheck(task.id)} />
      </div>
    </div>
  ))
  
  return (
    <div className="home-page">
     <div className="top-bar">
        <span className="logo">ToDo</span>
        <Link className="btn danger sm" to="/logout">Logout</Link>
     </div>
      <div className="page-body">
        <h1>Tasks List  <span onClick={() => setASC(prev => !prev)}>Sort By Status <i  dangerouslySetInnerHTML={{__html: ASC ? '&uarr;' : '&darr;' }} /> </span></h1>
        <AddTaskForm data={toEdit} onAdd={addTask} onCancel={() => setToEdit(null)} />
        <div className={`tasks ${ASC ? '' : 'flip'}`}>
          <section className="tasks-wrapper">
            <h2 className="section-title">Not Completed Tasks</h2>
            {renderTasks(notCompletedTasks)}
          </section>
          <section className="tasks-wrapper">
            <h2 className="section-title">Completed Tasks</h2>
            {renderTasks(completedTasks)}
          </section>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Home
