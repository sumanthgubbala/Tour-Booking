import React, { useState ,useContext} from 'react'
import '../styles/register.css'
import{ Container , Row, Col, Form ,FormGroup, Button  } from 'reactstrap' 

import { Link,useNavigate } from 'react-router-dom'

import RegisterImg from '../assets/images/register.png'
import userIcon from '../assets/images/user.png'

import { AuthContext } from './../Context/AuthContext'
import { BASE_URL } from './../utils/config'
const Register = () => {
  const [credential,setCredential] =useState(
      {
        username: '',
        email: '',
        password: '',
      }
    );

    const {dispatch} = useContext(AuthContext)
    const navigate = useNavigate();

  const handleChange = (e) => {
    setCredential(prev=> ({ ...prev,[e.target.id]: e.target.value}))
    
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(credential);
    try{
      const res = await fetch(`${BASE_URL}/auth/register`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credential)
      })
      const result = await res.json()
      if(!res.ok) alert(result.message)

        dispatch({type:'REGISTER_SUCCESS'})
        navigate('/login')

    }catch(err){
      alert(err.message)
    }
  }

  return (
    <section>
      <Container >
        <Row>
          <Col lg='8' className='m-auto'>
          <div className='Register__container d-flex justify-content-between'>
            <div className='Register__img'>
              <img src={RegisterImg} alt='' />
            </div>
            <div className='Register__form'>
              <div className='user'>
              <img src={userIcon} alt='' />
              </div>
              <h2>Register</h2>
              <Form onSubmit={handleClick}>
              <FormGroup >
                <input type='text' 
                placeholder='Username' 
                required id='username' 
                onChange={handleChange}/>
                </FormGroup>
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
                >Create Account</Button>
              </Form>
              <p> 
              Already have an account? <Link to='/login'>Login</Link>
              </p>
            </div>
          </div>

          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Register