import React,{Component} from 'react';
import axios from 'axios';
import {Link, Route, Redirect} from 'react-router-dom';

class Userreg extends Component{

      postregis = (register_data) => {
          this.props.postRegis(register_data);
          
      } 
      
        render()
        {
      
        return (
          <div className='Login'>
            <div className='Formlogin'>
              <center>

            <label htmlFor="username"><b>username</b></label><br/>
            <input type="text" ref="username" placeholder="username"required/><br/>

            <label htmlFor="password"><b>password</b></label><br/>
            <input type="password" ref="password" placeholder="password"required/><br/>

            <label htmlFor="nama"><b>nama kamu</b></label><br/>
            <input type="text" ref="nama" placeholder="nama"required/><br/>

            <label htmlFor="email"><b>email</b></label><br/>
            <input type="text" ref="email" placeholder="email"required/><br/>

            <label htmlFor="phonenumber"><b>nomer telepon</b></label><br/>
            <input type="text" ref="phonenumber" placeholder="phonenumber"required/><br/>

            <label htmlFor="alamat"><b>alamat</b></label><br/>
            <input type="text" ref="alamat" placeholder="alamat"required/><br/><br/>

            <input type="submit" onClick={() => this.postregis(this.refs)} value="Submit"/><br/>
         
            </center>
            </div>
          </div>
        );
      }
  }

export default Userreg;
