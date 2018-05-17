import React,{Component} from 'react';
import axios from 'axios';
import {Link, Route, Redirect} from 'react-router-dom';


class Sizeedit extends Component{

    getsizeidedit = (data) => {
          this.props.getsizeidEdit(data);
      }

        render()
        {
      
        return (
          <div>
              <label htmlFor="size">size : </label>
              <input type="text" ref="size" placeholder="size"/><br/>

              <label htmlFor="stock">stock : </label>
              <input type="number" ref="stock" placeholder="stock"/><br/>
              
              <input type="submit" onClick={() => this.getsizeidedit(this.refs)} value="Submit"/><br/>
            
          </div>
        );
      }
  }
  
    
export default Sizeedit;
