import { useState } from "react"

import useClickOutside from "../../libs/click-outside"

import './styles.scss'

const DeleteBtn = ({ className, children, onConfirm }) => {
  const [show, setShow] = useState(false)

  const ref = useClickOutside(() => {
    setShow(false)
  })

  return (
    <span ref={ref} className={`delete-btn ${className || ''}`}>
      <span onClick={() => setShow(true)}>{children}</span>
      {show && <span className="pop-over">
        <span className="arrow" />
        <span className="question">Are you sure ? </span>
      <div className="actions">
        <span className="yes" onClick={() => {
            setShow(false)
            onConfirm && onConfirm()
        }}>Yes</span>
        <span className="no" onClick={() => setShow(false)}>No</span>
      </div>
      </span>}
    </span>
  )
}

export default DeleteBtn
