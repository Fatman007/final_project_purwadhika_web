import React,{Component} from 'react';
import axios from 'axios';
import {Link, Route, Redirect} from 'react-router-dom';


class Sizeregister extends Component{

    getsizeidregister = (data) => {
          this.props.getsizeidRegister(data);
      }

        render()
        {
      
        return (
            <div>
              <label htmlFor="size">size : </label>
              <input type="text" ref="size" placeholder="size"/><br/>

              <label htmlFor="stock">stock : </label>
              <input type="number" ref="stock" placeholder="stock"/><br/>
              
              <input type="submit" onClick={() => this.getsizeidregister(this.refs)} value="Submit"/><br/>
            
          </div>
        );
      }
  }
  
    
export default Sizeregister;
