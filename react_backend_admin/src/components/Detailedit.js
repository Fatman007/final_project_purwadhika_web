import React,{Component} from 'react';
import axios from 'axios';
import {Link, Route, Redirect} from 'react-router-dom';


class Detailedit extends Component{

    getwarnaidedit = (data) => {
          this.props.getwarnaidEdit(data);
      }

        render()
        {
      
        return (
          <div>
              <label htmlFor="warna_produk">warna : </label>
              <input type="text" ref="warna_produk" placeholder="category"/><br/>
              
              <input type="submit" onClick={() => this.getwarnaidedit(this.refs)} value="Submit"/><br/>
            
          </div>
        );
      }
  }
  
    
export default Detailedit;
