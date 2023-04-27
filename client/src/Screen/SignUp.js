import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
  const [name, setname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mobile, setmobile] = useState('')
  const [age, setage] = useState('')
  const [error, setError] = useState({})
  const [serverError, setServerError] = useState(null)
  const navigate = useNavigate()

  const handleSignup = async e => {
    e.preventDefault()
    setError(validate({ name, email, password, mobile,age  }))
    if (
      name !== '' &&
      password !== '' &&
      email !== '' 
    ) {
      try {
        const res = await axios.post('http://localhost:5001/auth/register', {
          name,
          email,
          password
        })
        navigate('/home')
      } catch (error) {
        setServerError(error.response.data)
      }
    }
  }

  const validate = values => {
    const errors = {}
    if (!values.username) {
      errors.username = 'Username is required!'
    }
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
          <h2 >Sign Up</h2>
          <form onSubmit={handleSignup} >
            <input
              type='text'
              placeholder='Type username'
              onChange={e => setname(e.target.value)}
            />
            <p style={{ color: 'red' }}>{error.username}</p>
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
            
    

            <button >Sign Up</button>
            {serverError && (
              <p style={{ fontSize: '15px', color: 'red' }}>{serverError}</p>
            )}
            <p>
              Already have an account? <Link to='/'>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
