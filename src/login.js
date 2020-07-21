import React from 'react';

const Welcome = ({user, onSignOut})=> {
    // This is a dumb "stateless" component
    return (
      <div>
        Welcome <strong>{user.username}</strong>!
        <a href="javascript:;" onClick={onSignOut}>Sign out</a>
      </div>
    )
  }
  

  class Login extends React.Component {
    
    constructor(props) {
      super(props)
      // the initial application state
      this.state = {
        user: null
      }
    }
    
    // App "actions" (functions that modify state)
    signIn(username, password) {
      // This is where you would call Firebase, an API etc...
      // calling setState will re-render the entire app (efficiently!)
      this.setState({
        user: {
          username,
          password,
        }
      })
    }
    
    signOut() {
      // clear out user from state
      this.setState({user: null})
    }
    
    render() {
      // Here we pass relevant state to our child components
      // as props. Note that functions are passed using `bind` to
      // make sure we keep our scope to App
      return (
        <div>
          <h1>My App</h1>
          { 
            (this.state.user) ? 
              <Welcome 
               user={this.state.user} 
               onSignOut={this.signOut.bind(this)} 
              />
            :
              <Login 
               onSignIn={this.signIn.bind(this)} 
              />
          }
        </div>
      )
      
    }
    
  }
  
  ReactDOM.render(<App/>, document.getElementById("app"))
  