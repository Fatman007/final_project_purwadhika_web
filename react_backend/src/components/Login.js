import React,{Component} from 'react';
import axios from 'axios';
import {Link, Route, Redirect} from 'react-router-dom';


class Login extends Component{

      postlogin = (login_data) => {
          this.props.postLogin(login_data);
          // console.log(login_data.username.value);
          // console.log(login_data.password.value);
      }

        render()
        {
      
        return (

          <div className='Login'>
            <div className='Formlogin'>
              <center>
            
              <label htmlFor="username"><b>username</b></label><br/>
              <input type="text" ref="username" placeholder="username" required/><br/>
              <label htmlFor="password"><b>password</b></label><br/>
              <input type="password" ref="password" placeholder="password" required/><br/><br/>
              <input type="submit" onClick={() => this.postlogin(this.refs)} value="Submit"/><br/><br/>
              <Link to="/userreg">Register</Link>

              </center>
            </div>
          </div>
          
        );
      }
  }
  
    
export default Login;
