
import { useMemo, useState } from 'react'
import { Link } from '@reach/router'

import AddTaskForm from '../../components/add-task-form'

import './styles.scss'

const Home = () => {
  const [taskList, setTaskList] = useState([
    {
      id: 1,
      title: 'hello task 1',
      description: 'this is a test task',
      completed: true,
    },
    {
      id: 2,
      title: 'hello task 2',
      description: 'this is a second test task',
      completed: false,
    }
  ])
  const [ASC, setASC] = useState(true)
  const [toEdit, setToEdit] = useState(null)
 

  const handleCheck = id => {
    setTaskList(prev => prev.map(t => {
      if(id === t.id) {
        return {...t, completed: !t.completed}
      }
      return t
    }))
  }

  const deleteTask = id => {
    setTaskList(prev => prev.filter(t => id !== t.id))
  }

  const addTask = data => {
    setTaskList(prev => toEdit ? prev.map(t => t.id === toEdit.id ? ({...t, ...data}) : t) : [...prev,  {
      id: prev.length + 1,
      ...data,
      completed: false,
    }])
    setToEdit(null)
  }


  const completedTasks = useMemo(() => taskList.filter(t => t.completed), [taskList])
  const notCompletedTasks = useMemo(() => taskList.filter(t => !t.completed), [taskList])


  const renderTasks = list => list?.map((task, index) => (
    <div key={index} className="task">
      <span className="title">{task.title} {task.description  && <small>{task.description}</small>}</span>
      <div className="actions">
        <span className="delete" onClick={() => deleteTask(task.id)}>Delete</span>
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
      </div>
    </div>
  )
}

export default Home
