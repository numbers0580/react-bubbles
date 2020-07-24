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
        setTimeout(() => {history.push('/bubbly')}, 2000);
        //history.push('/bubbly');
      })
      .catch(logError => {
        console.log('(Login) Error logging in');
      })
  };

  const formStyle = () => {
    return {
      container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      h1: {
        color: 'red'
      },
      form: {
        width: '450px',
        height: '100px',
        margin: '10px 50px',
        padding: '20px 10px',
        borderRadius: '20px',
        background: 'silver'},
      div: {
        width: '320px',
        display: 'flex'
      },
      btnDiv: {
        width: '150px',
        marginTop: '10px'
      },
      btn: {
        color: 'green'
      }
    };
  };

  return (
    <div style={formStyle().container}>
      <h1 style={formStyle().h1}>Welcome to the Bubble App!</h1>
      <form style={formStyle().form} onSubmit={submitLogin}>
        <div style={formStyle().div}>
          <div style={{width: '220px'}}><label>Enter Username:</label></div>
          <div><input type='text' name='username' value={credentials.username} onChange={updateFields} /></div>
        </div>
        <div style={formStyle().div}>
          <div style={{width: '220px'}}><label>Enter Password:</label></div>
          <div><input type='password' name='password' value={credentials.password} onChange={updateFields} /></div>
        </div>
        <div style={formStyle().btnDiv}>
          <button style={formStyle().btn}>Login!</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
