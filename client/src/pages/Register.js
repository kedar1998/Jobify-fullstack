import React, {useState, useEffect} from 'react'
import {Logo, FormRow, Alert} from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'
import {useNavigate} from 'react-router-dom'


const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: false,
}

const Register = () => {

  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const {isLoading, showAlert, displayAlert, registerUser, user, loginUser} = useAppContext()

  const handleChange = (e) =>{
    setValues({...values, [e.target.name]: e.target.value})
  }

  const onSubmit = (e) =>{
    e.preventDefault()
    const {name, email, password, isMember} = values

    if(!email || !password || (!isMember && !name)){
      displayAlert()
      return 
    }
    
    const currentUser = {name, email, password}

    if(isMember){
      loginUser(currentUser)
    }
    else{
      registerUser(currentUser)
    }

  }

  const toggleMember = () =>{
    setValues({...values, isMember: !values.isMember})
  }

  useEffect(() =>{
    setTimeout(() =>{
      if(user){
        navigate('/')
      }
    }, 3000)
  }, [user, navigate])

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}

        {!values.isMember && <FormRow type="text" name="name" value={values.name} handleChange={handleChange} />}

        <FormRow type="email" name="email" value={values.email} handleChange={handleChange} />

        <FormRow type="password" name="password" value={values.password} handleChange={handleChange} />
        
        <button type="submit" className='btn btn-block' disabled={isLoading}>Submit</button>

        <p>
          {values.isMember ? 'Not a Member yet?' : 'Already a member?'}

          <button type="button" className='member-btn' onClick={toggleMember}>{values.isMember ? 'Register' : 'Login'}</button>
        </p>


      </form>
    </Wrapper>
  )
}

export default Register