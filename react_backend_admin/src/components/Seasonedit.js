import React,{Component} from 'react';
import axios from 'axios';
import {Link, Route, Redirect} from 'react-router-dom';


class Seasonedit extends Component{

    getseasonidedit = (data) => {
          this.props.getseasonidEdit(data);
      }

        render()
        {
      
        return (
          <div>
              <label htmlFor="season">Season : </label>
              <input type="text" ref="season" placeholder="season"/><br/>
              
              <input type="submit" onClick={() => this.getseasonidedit(this.refs)} value="Submit"/><br/>
            
          </div>
        );
      }
  }
  
    
export default Seasonedit;
