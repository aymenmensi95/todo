import { useEffect, useState } from 'react'

import Button from '../button/button'
import Input from '../input/input'

import './styles.scss'

const AddTaskForm = ({ data, onAdd, onCancel }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    setTitle(data?.title || '')
    setDescription(data?.description || '')
  }, [data])

  const onSubmit = e => {
    e.preventDefault()
    if(!!title) {
      onAdd && onAdd({title, description})
      setTitle('')
      setDescription('')
    }
  }

  return (
    <form className="add-task-form" onSubmit={onSubmit} > 
      <div className="line">
        <div className="col"> <Input placeholder="Task Title" value={title} onChange={setTitle} required autoFocus /></div>
        <div className="col"> <Input placeholder="Task Description" value={description} onChange={setDescription} /></div>
        <div className="btn-col"> <Button type="submit" className="primary" >{data?.title ? 'Edit' : 'Add'}</Button></div>
        {data?.title && <div className="btn-col"><Button className="danger" onClick={() => onCancel && onCancel()}>Cancel</Button></div>}
      </div>
    </form>
  )
}

export default AddTaskForm
