import { useMemo, useState } from "react"

const Input = ({className, value, onChange, type, ...props}) => {
  const [viewPassword, setViewPassword] = useState(false)


  const isPassword = useMemo(() => type === 'password', [type])

  return (
    <div className={`input ${className || ''}`}>
       <input {...props} type={isPassword ? viewPassword ? 'text' : 'password' : type} value={value} onChange={e => onChange && onChange(e.target.value)} />
       {isPassword && <div className="password-btn btn sm" onClick={() => setViewPassword(prev => !prev)} >{viewPassword ? 'Hide' : 'Show'}</div>}
    </div>
  )
}

export default Input
