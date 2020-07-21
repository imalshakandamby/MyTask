import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';



const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

const [emailInput] = ('');
const [passwordInput] = ('');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      errors: {
        email: '',
        password: '',
      }
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password': 
        errors.password = 
          value.length < 6
            ? 'At least 6 digits for password!'
            : '';
        break;
      default:
        break;
    }

    this.setState({errors, [name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(validateForm(this.state.errors)) {
      console.info('Valid Form');

      let hardcodedCred = {
        email: 'abc@gmail.com',
        password: 'abc123'
      }

      if ((emailInput === hardcodedCred.email) && (passwordInput === hardcodedCred.password)) {
          alert('Logged in!');
      } else {
        alert('Please register and log in!');
      }

    }else{
      console.error('Invalid Form')
    }
  } 


  render(){
    const { errors } = this.state;
    return (
      <div className="container">
      <form className="login-form" onSubmit={this.handleSubmit} noValidate>

        <h1>
          <span className="font-weight-bold">WELCOME!</span>
        </h1>
        <h2>Login Form</h2>
        <div className="form-Group">
          <label htmlFor="email">E-mail</label>
          <input 
            type="email" 
            className="form-control" 
            placeholder="Enter email here..." 
            name="email" 
            value={emailInput}
            onChange={this.handleChange} noValidate></input>
            {errors.email.length > 0 && 
                <span className='error' style={{color: "red"}}>{errors.email}</span>}
        </div>
        
        <div className="form-Group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            className="form-control" 
            placeholder="Enter password here..." 
            name="password" 
            value={passwordInput}
            onChange={this.handleChange} noValidate></input>
            {errors.password.length > 0 && 
                <span className='error' style={{color: "red"}}>{errors.password}</span>}
        </div>
        <br></br>

        <button type="submit" 
          className="btn btn-primary btn-block">LOG IN</button>
        
        <div className="text-center">
          <a href="/sign-up">Sign Up</a>
          <span className="p-2">|</span>
          <a href="/forgot-password">Forgot Password</a>
        </div>
      </form>
      </div>
    );
  }
}


export default App;