import React,{Component} from 'react';
import axios from 'axios';
import {Link, Route, Redirect} from 'react-router-dom';


class Loginadmin extends Component{

      postloginadmin = (login_data) => {
          this.props.postLoginadmin(login_data);
      }

        render()
        {
      
        return (
          <div>
            
              <input type="text" ref="username" placeholder="username"/><br/>
              <input type="password" ref="password" placeholder="password"/><br/>
              <input type="submit" onClick={() => this.postloginadmin(this.refs)} value="Submit"/><br/>
            
          </div>
        );
      }
  }
  
    
export default Loginadmin;
