import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({})
  const [serverError, setServerError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async e => {
    e.preventDefault()
    setError(validate({ email, password }))
    if (password !== '' && email !== '') {
      const res = await axios.post('http://localhost:8004/login', {
        email,
        password
      })
        navigate('/home')
    }
  }

  const validate = values => {
    const errors = {}

    if (!values.password) {
      errors.password = 'Password is required!'
    }
    if (!values.email) {
      errors.email = 'Email is required!'
    }
    return errors
  }

  return (
    <div >
      <div >
        <div >
          <h2 >Login</h2>
          <form onSubmit={handleLogin} >
            <input
              type='email'
              placeholder='Type email'
              onChange={e => setEmail(e.target.value)}
            />
            <p style={{ color: 'red' }}>{error.email}</p>
            <input
              type='password'
              placeholder='Type password'
              onChange={e => setPassword(e.target.value)}
            />
            <p style={{ color: 'red' }}>{error.password}</p>
            <button >Login</button>
            {serverError && (
              <p style={{ fontSize: '15px', color: 'red' }}>{serverError}</p>
            )}
            <p>
              Don't have an account? <Link to='/signup'>Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
