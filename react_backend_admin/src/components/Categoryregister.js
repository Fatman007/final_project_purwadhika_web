import React,{Component} from 'react';
import axios from 'axios';
import {Link, Route, Redirect} from 'react-router-dom';


class Categoryregister extends Component{

    getcategoryidregister = (data) => {
          this.props.getcategoryidRegister(data);
      }

        render()
        {
      
        return (
          <div>
              <label htmlFor="kategori_produk">category : </label>
              <input type="text" ref="kategori_produk" placeholder="category"/><br/>

              <label htmlFor="gambar_kategori">nama file gambar category : </label>
              <input type="text" ref="gambar_kategori" placeholder="gambar category"/><br/>
              
              <input type="submit" onClick={() => this.getcategoryidregister(this.refs)} value="Submit"/><br/>
            
          </div>
        );
      }
  }
  
    
export default Categoryregister;
