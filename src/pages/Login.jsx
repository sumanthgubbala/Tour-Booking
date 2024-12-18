import React, { useState,useContext } from 'react'
import '../styles/login.css'
import{ Container , Row, Col, Form ,FormGroup, Button  } from 'reactstrap' 

import { Link ,useNavigate } from 'react-router-dom'

import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from './../Context/AuthContext'
import { BASE_URL } from './../utils/config'

const Login = () => {
  const [credential,setCredential] =useState(
      {
          email: '',
          password: '',
      }
    );
      const {dispatch} = useContext(AuthContext)
      const navigate = useNavigate();
  const handleChange = (e) => {
    setCredential(prev=> ({...prev,[e.target.id]:e.target.value}))
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(credential)
    dispatch({type: 'LOGIN_START'})
    try {
      const res = await fetch(`${BASE_URL}/auth/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credential)
      })

      const result = await res.json()
      if(!res.ok) {
        return alert(result.message)
      }

      console.log(result.token)

    dispatch({type:'LOGIN_SUCCESS',payload: result.data})
    navigate('/home')

      

    } catch (error) {
      dispatch({type:'LOGIN_FAILURE',playload: error.message})
    }
  }

  return (
    <section>
      <Container >
        <Row>
          <Col lg='8' className='m-auto'>
          <div className='login__container d-flex justify-content-between'>
            <div className='login__img'>
              <img src={loginImg} alt='' />
            </div>
            <div className='login__form'>
              <div className='user'>
              <img src={userIcon} alt='' />
              </div>
              <h2>Login</h2>
              <Form onSubmit={handleClick}>
                <FormGroup >
                <input type='email' 
                placeholder='Email' 
                required id='email' 
                onChange={handleChange}/>
                </FormGroup>
                <FormGroup >
                <input type='password'  
                placeholder='Password' 
                required id='password' 
                onChange={handleChange}/>
                </FormGroup>
                <Button className='btn secondary__btn auth__btn'
                type='submit'
                >Login</Button>
              </Form>
              <p> 
              Don't have an account? <Link to='/register'>Register</Link>
              </p>
            </div>
          </div>

          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login