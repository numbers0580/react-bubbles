import React, {useState} from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {useHistory} from 'react-router-dom';

const blankFields = {
  username: '',
  password: '',
};

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState(blankFields);
  const history = useHistory();

  const updateFields = evt => {
    const {name, value} = evt.target;

    setCredentials({...credentials, [name]: value});
  };

  const submitLogin = evt => {
    evt.preventDefault();
    axiosWithAuth()
      .post('/api/login', credentials)
      .then(logResponse => {
        console.log('Testing response from Login Submit:', logResponse.data);
        localStorage.setItem('token', logResponse.data.payload);
        history.push('/bubbly');
      })
      .catch(logError => {
        console.log('(Login) Error logging in');
      })
  };

  const formStyle = () => {
    return {
      section: {},
      h1: {},
      form: {},
      div: {},
      btnDiv: {},
      btn: {}
    };
  };

  return (
    <section style={formStyle().section}>
      <h1 style={formStyle().h1}>Welcome to the Bubble App!</h1>
      <form  style={formStyle().form} onSubmit={submitLogin}>
        <div style={formStyle().div}>
          <div><label>Enter Username:</label></div>
          <div><input type='text' name='username' value={credentials.username} onChange={updateFields} /></div>
        </div>
        <div style={formStyle().div}>
          <div><label>Enter Password:</label></div>
          <div><input type='password' name='password' value={credentials.password} onChange={updateFields} /></div>
        </div>
        <div style={formStyle().btnDiv}>
          <button style={formStyle().btn}>Login!</button>
        </div>
      </form>
    </section>
  );
};

export default Login;
