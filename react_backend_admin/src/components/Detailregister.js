import React,{Component} from 'react';
import axios from 'axios';
import {Link, Route, Redirect} from 'react-router-dom';


class Detailregister extends Component{

    getwarnaidregister = (data) => {
          this.props.getwarnaidRegister(data);
      }

        render()
        {
      
        return (
          <div>
              <label htmlFor="warna_produk">warna : </label>
              <input type="text" ref="warna_produk" placeholder="warna produk"/><br/>
              
              <input type="submit" onClick={() => this.getwarnaidregister(this.refs)} value="Submit"/><br/>
            
          </div>
        );
      }
  }
  
    
export default Detailregister;
