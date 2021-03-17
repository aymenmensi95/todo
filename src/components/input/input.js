import { useMemo, useState } from "react"

const Input = ({className, value, onChange, type, ...props}) => {
  const [viewPassword, setViewPassword] = useState(false)


  const isPassword = useMemo(() => type === 'password', [type])

  return (
    <div className={`custom-input ${className || ''}`}>
       <input {...props} type={isPassword ? viewPassword ? 'text' : 'password' : type} value={value} onChange={e => onChange && onChange(e.target.value)} />
       {isPassword && <button onClick={() => setViewPassword(prev => !prev)} >view</button>}
    </div>
  )
}

export default Input
