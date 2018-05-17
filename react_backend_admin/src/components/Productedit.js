import React,{Component} from 'react';
import axios from 'axios';
import {Link, Route, Redirect} from 'react-router-dom';


class Productedit extends Component{

    getproductidedit = (data) => {
          this.props.getproductidEdit(data);
      }

        render()
        {
      
        return (
            <div>
              
              <label htmlFor="detail_produk">Nama produk : </label>
              <input type="text" ref="detail_produk" placeholder="" required/>

              <br/>
              <label htmlFor="price">Harga : </label>
              <input type="number" ref="price" placeholder="" required/>

              <br/>
              <label htmlFor="deskripsi">Deskripsi : </label>
              <input type="text" ref="deskripsi" placeholder="" required/>

              <br/>
              <label htmlFor="gambar">Gambar : </label>
              <input type="file" ref="gambar" placeholder="" accept=".jpg, .png" required/>
              
              <input type="submit" onClick={() => this.getproductidedit(this.refs)} value="Submit"  encType="multipart/form-data"/><br/>
            
          </div>
        );
      }
  }
  
    
export default Productedit;
