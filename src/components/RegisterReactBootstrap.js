import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const RegisterReactBootstrap = () => {
    const [passwordError,setPasswordError]=useState('');
    const [success,setSuccess]= useState(false);
    const handleRegister=(event)=>{
        event.preventDefault();
        setSuccess(false);
        const form=event.target;
        const name=form.name.value;
       const email=form.email.value;
       const password=form.password.value;
       console.log(email,password,name);
       if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
        setPasswordError('please provide atleast two uppercase');
        return;
       }
       if(password.length<6){
        setPasswordError('please provide atleast six charecteristic');
        return;
       }
       if(!/(?=.*[!@#$&])/.test(password)){
        setPasswordError('please provide atleast one special charecteristic');
        return;

       }
       setPasswordError('');
       createUserWithEmailAndPassword(auth,email,password)
       .then(res=>{
        const user=res.user;
        console.log(user);
        setSuccess(true);
        form.reset();
        verifyEmail();
        updateUserName(name);
        
       })
       .catch(error=>{
        console.error(error)
        setPasswordError(error.message);
       })
     }

     const verifyEmail=()=>{
        sendEmailVerification(auth.currentUser)
        .then(()=>{
            alert('please check your email and verify')
        })
     }
     const updateUserName=(name)=>{
        updateProfile(auth.currentUser,{
            displayName:name
        })
        .then(()=>{
            console.log('display name updated')
        })
        .catch(error=>console.error(error))

     }

const auth= getAuth(app);
    return (
        <div className='mx-auto w-25'>
            <h3 className='text-primary'>Please Register !!!!!</h3>
            <Form onSubmit={handleRegister}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Your name</Form.Label>
        <Form.Control type="text" name='name' placeholder="Enter name" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' placeholder="Enter email" required />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password' placeholder="Password" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        {/* <Form.Check type="checkbox" label="Check me out" /> */}
      </Form.Group>
      <p className='text-danger'>{passwordError}</p>
      {success &&  <p className='text-success'>User Created Successfully</p>}
      <Button variant="primary" type="submit">
        Register
      </Button>
      <h1>hyyyy</h1>
    </Form>
    <p>Already have account  <Link to='/login'>Log in</Link></p>
        </div>
    );
};

export default RegisterReactBootstrap;