import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';
const auth=getAuth(app);
const LoginBootstrap = () => {
    const [success,setSuccess]=useState(false);
    const [userEmail,setUserEmail]=useState('');
    const handleSubmit=event=>{

        event.preventDefault();
        setSuccess(false);
        const form=event.target;
        const email=form.email.value;
        const password=form.password.value;
        console.log(email,password)
        signInWithEmailAndPassword(auth,email,password)
        .then(result=>{
            const user=result.user;
            console.log(user)
            setSuccess(true)
        })
        .catch(error=>{
            console.error('error',error)
        })

    }
    const handleEmailBlur=(event)=>{
        const email=event.target.value;
        setUserEmail(email)


    }
    const handleForgetPassword=()=>{
        if(!userEmail){
            alert('please enter your email address ')
            return;
        }
        sendPasswordResetEmail(auth,userEmail)
        .then(()=>{
            alert('password reset email sent.')
        })
        .catch(error=>{
            console.error(error)
        })
    }
    return (
        <div className='w-50 mx-auto'>
            <h3 className=''>Please Log in</h3>
            <form onSubmit={handleSubmit} action="">
            <div>
            <div className="mb-3">
    <label htmlFor="formGroupExampleInput" className="form-label">Example label</label>
  <input onBlur={handleEmailBlur} type="email" name='email' className="form-control" id="formGroupExampleInput" placeholder="your email" required/>
 </div>
<div className="mb-3">
  <label htmlFor="formGroupExampleInput2" className="form-label">Another label</label>
  <input type="password" name='password' className="form-control" id="formGroupExampleInput2" placeholder="your password" required/>
</div>
        </div>
        <button className='btn btn-primary' type='submit'>Log In</button>
            </form>
            {success&&  <p>Successfully log in</p>}
           <p>New to website? please <Link to='/register'>Register</Link></p>
           <p>Forget Password?<Button onClick={handleForgetPassword} variant="link">please reset</Button></p>

            </div>
        
    );
};

export default LoginBootstrap;