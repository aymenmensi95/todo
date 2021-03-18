import { useEffect, useState } from 'react'
import { navigate } from '@reach/router'

import Input from '../../components/input/input'
import Button from '../../components/button'

import './styles.scss'

const Login = ({ loginStorageKey, loginStorageValue }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 
  useEffect(() => {
    const isLoggedIn = localStorage.getItem(loginStorageKey) === loginStorageValue
    if(isLoggedIn) {
     navigate('/')
    }
   }, [loginStorageKey, loginStorageValue])

  const onSubmit = e => {
    e.preventDefault()
    if(email === 'test@test.com' && password === 'test') {
      localStorage.setItem(loginStorageKey, loginStorageValue)
      navigate('/')
    }
  }

  return (
    <div className="login-page">
      <form onSubmit={onSubmit}>
        <div className="form-field">
          <Input name="email" type="email" value={email} onChange={value => setEmail(value)} required autoFocus />
        </div>
        <div className="form-field">
          <Input name="password" type="password" value={password} onChange={value => setPassword(value)} required autoFocus />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}

export default Login
