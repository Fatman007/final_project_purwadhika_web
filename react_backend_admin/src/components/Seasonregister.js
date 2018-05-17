import React,{Component} from 'react';
import axios from 'axios';
import {Link, Route, Redirect} from 'react-router-dom';


class Seasonregister extends Component{

    getseasonidregister = (data) => {
          this.props.getseasonidRegister(data);
      }

        render()
        {
      
        return (
          <div>
              <label htmlFor="season">Season : </label>
              <input type="text" ref="season" placeholder="season"/><br/>
              
              <input type="submit" onClick={() => this.getseasonidregister(this.refs)} value="Submit"/><br/>
            
          </div>
        );
      }
  }
  
    
export default Seasonregister;
