import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithGoogle } from '../firbase-config/config';
import { useSignInWithEmailAndPassword, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import '../css/Login.css';

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, userLogin, loadingLogin, errorLogin] = useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, userSignup, loadingSignup, errorSignup] = useCreateUserWithEmailAndPassword(auth);
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    if (isSignup) {
      createUserWithEmailAndPassword(email, password);
    } else {
      signInWithEmailAndPassword(email, password);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  const redirectIfLoggedIn = (user) => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
      return <div className="message">Successfully {isSignup ? 'signed up' : 'logged in'}! Redirecting to home...</div>;
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleAuth} className="auth-form">
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loadingLogin || loadingSignup}>
          {loadingLogin || loadingSignup ? (isSignup ? 'Signing up...' : 'Logging in...') : (isSignup ? 'Sign Up' : 'Login')}
        </button>
        {(errorLogin || errorSignup) && <div className="error">{(errorLogin || errorSignup).message}</div>}
        <button type="button" onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
        <p>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span onClick={() => setIsSignup(!isSignup)}>{isSignup ? 'Log in here' : 'Sign up here'}</span>
        </p>
      </form>
      {redirectIfLoggedIn(userLogin || userSignup)}
    </div>
  );
};

export default AuthForm;
