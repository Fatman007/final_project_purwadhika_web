import React, { Component } from 'react';
import {Redirect, Link, Route} from "react-router-dom";
import axios from 'axios';
import './App.css';

import Navbar from "./components/Navbar";
import Loginadmin from "./components/Loginadmin";

import Main from "./components/Main";
import Seasonedit from "./components/Seasonedit";
import Seasonregister from "./components/Seasonregister";

import Category from "./components/Category";
import Categoryedit from "./components/Categoryedit";
import Categoryregister from "./components/Categoryregister";

import Product from "./components/Product";
import Productedit from "./components/Productedit";
import Productregister from "./components/Productregister";

import Detail from "./components/Detail";
import Detailedit from "./components/Detailedit";
import Detailregister from "./components/Detailregister";

import Size from "./components/Size";
import Sizeedit from "./components/Sizeedit";
import Sizeregister from "./components/Sizeregister";

import Invoice from "./components/Invoice";
import Invoice_history from "./components/Invoice_history";


class App extends Component 
{

  constructor() {
    super();
    this.state = {
      
      category: [], 
      product: [], 
      product_detail: [], 
      size: [], 
      user_name: [], 
      user_id: [], 
      status_login: [], 
      tempInvoiceId: [],
      redirect_login: false,  
      redirect_home: false, 
      redirect_inv: false,
      id_season: 0,
      id_category: 0,
      id_product: 0,
      id_warna: 0,
      id_size: 0,
    
    };
  }

  componentWillMount()
  {
    this.setState({redirect_login: true});
  }

  
  /////////////////////////////////////////////////////////////////////////// season


  getseasonid = (id) => {

    this.setState({id_season: id})

    axios.get("http://localhost:3001/admin_category/"+id)
    .then ((homeCategory) =>
    {
      console.log(homeCategory);
      this.setState({category: homeCategory.data})
      
      // console.log(this.state);
    })
  }

  ambilidseason = (id) => {
    
    this.setState({id_season:id});
    // console.log(this.state.id_season);
    
  }

  getseasonidregister = (data) => {

    axios.post('http://localhost:3001/admin_season_register/', 
      { 
        season : data.season.value,
      })
      .then((hasilseason) => {
        
          this.setState({redirect_home: true});
        }
      )
  }

  getseasonidedit = (data) => {

    axios.post('http://localhost:3001/admin_season_edit/'+this.state.id_season, 
      { 
        season : data.season.value,
      })
      .then((hasilseason) => {
        
          this.setState({redirect_home: true});
        }
      )
  }

  getseasoniddelete = (id) => {

    axios.get("http://localhost:3001/admin_season_delete/"+id)
    .then((hasilseason) => {
        
      this.setState({redirect_home: true});
    }
    )
  }


  /////////////////////////////////////////////////////////////////////////// category



  getcategoryid = (id) => {

    this.setState({id_category: id})

    axios.get("http://localhost:3001/admin_product/"+id)
    .then ((homeProduct) =>
    {
      console.log(homeProduct.data);
      this.setState({product: homeProduct.data})
      // console.log(this.state);
    })
  }

  ambilidcategory = (id) => {
    
    this.setState({id_category:id});
    
  }

  getcategoryidregister = (data) => {

    axios.post('http://localhost:3001/admin_category_register/'+this.state.id_season, 
      { 
        kategori_produk : data.kategori_produk.value,
        gambar_kategori : data.gambar_kategori.value,
      })
      .then((hasil) => {
        
          this.setState({redirect_home: true});
        }
      )
  }

  getcategoryidedit = (data) => {

    axios.post('http://localhost:3001/admin_category_edit/'+this.state.id_category, 
      { 
        kategori_produk : data.kategori_produk.value,
        gambar_kategori : data.gambar_kategori.value,
      })
      .then((hasil) => {
        
          this.setState({redirect_home: true});
        }
      )
  }

  getcategoryiddelete = (id) => {

    axios.get("http://localhost:3001/admin_category_delete/"+id)
    .then((hasil) => {
        
      this.setState({redirect_home: true});
    }
    )
  }



  /////////////////////////////////////////////////////////////////////////// product

  getdetailid = (id) => {

    this.setState({id_product: id})

    axios.get("http://localhost:3001/admin_product_colour/"+id)
    .then ((detail_produk_warna) =>
    {
      console.log(detail_produk_warna);
      this.setState({product_detail: detail_produk_warna.data})
      // console.log(this.state);
    })

  }

  ambilidproduct = (id) => {
    
    this.setState({id_product:id});
    
  }

  getproductidregister = (data) => {

    axios.post('http://localhost:3001/admin_product_register/'+this.state.id_category, 
      { 
        detail_produk : data.detail_produk.value,
        price : data.price.value,
        deskripsi : data.deskripsi.value,
        gambar : data.gambar.value,
      })
      .then((hasil) => {
        
          this.setState({redirect_home: true});
        }
      )
  }

  getproductidedit = (data) => {

    axios.post('http://localhost:3001/admin_product_edit/'+this.state.id_product, 
      { 
        detail_produk : data.detail_produk.value,
        price : data.price.value,
        deskripsi : data.deskripsi.value,
        gambar : data.gambar.value,
      })
      .then((hasil) => {
        
          this.setState({redirect_home: true});
        }
      )
  }

  getproductiddelete = (id) => {

    axios.get("http://localhost:3001/admin_product_delete/"+this.state.id)
    .then((hasil) => {
        
      this.setState({redirect_home: true});
    }
    )
  }


  /////////////////////////////////////////////////////////////////////////// warna

  getwarnaid = (id) => {

    this.setState({id_warna: id})

    axios.get("http://localhost:3001/admin_product_stock/"+id)
    .then ((adminwarna) =>
    {
      // console.log(homeProduct.data);
      this.setState({size: adminwarna.data})
      // console.log(this.state);
    })
  }

  ambilidwarna = (id) => {
    
    this.setState({id_warna:id});
    
  }

  getwarnaidregister = (data) => {

    axios.post('http://localhost:3001/admin_product_colour_register/'+this.state.id_product, 
      { 
        warna_produk : data.warna_produk.value,
      })
      .then((hasil) => {
        
          this.setState({redirect_home: true});
        }
      )
  }

  getwarnaidedit = (data) => {

    axios.post('http://localhost:3001/admin_product_colour_edit/'+this.state.id_warna, 
      { 
        warna_produk : data.warna_produk.value,
      })
      .then((hasil) => {
        
          this.setState({redirect_home: true});
        }
      )
  }

  getwarnaiddelete = (id) => {

    axios.get("http://localhost:3001/admin_product_colour_delete/"+id)
    .then((hasil) => {
        
      this.setState({redirect_home: true});
    }
    )
  }




  /////////////////////////////////////////////////////////////////////////// size


  ambilidsize = (id) => {
    
    this.setState({id_size:id});
    
  }

  getsizeidregister = (data) => {

    axios.post('http://localhost:3001/admin_product_stock_register/'+this.state.id_warna, 
      { 
        size : data.size.value,
        stock : data.stock.value,
      })
      .then((hasil) => {
        
          this.setState({redirect_home: true});
        }
      )
  }

  getsizeidedit = (data) => {

    axios.post('http://localhost:3001/admin_product_stock_edit/'+this.state.id_size, 
      { 
        size : data.size.value,
        stock : data.stock.value,
      })
      .then((hasil) => {
        
          this.setState({redirect_home: true});
        }
      )
  }

  getsizeiddelete = (id) => {

    axios.get("http://localhost:3001/admin_product_stock_delete/"+id)
    .then((hasil) => {
        
      this.setState({redirect_home: true});
    }
    )
  }


  ///////////////////////////////////////////////////////////////////////////////


  postloginadmin = (data_login) => {
  
    axios.post('http://localhost:3001/loginadmin', 
      { 
        username : data_login.username.value,
        password : data_login.password.value
      })
    .then((ambilDataLogin) => {
      console.log(ambilDataLogin.data);
      if (ambilDataLogin.data.status_login === true)
      {
        
        this.setState({user_name:ambilDataLogin.data.user_name, user_id:ambilDataLogin.data.user_id, status_login:ambilDataLogin.data.status_login});
        this.setState({redirect_home: true});
        // console.log(this.state);
      }
      else
      {
        this.setState({redirect_login: true});
      }
    })
  }

  postlogout = () => {
    
        this.setState({user_name:'', user_id:'', status_login:''});
        this.setState({redirect_login: true});
        // console.log(this.state);  
  }



  getinvid = (id) => {
    this.setState({tempInvoiceId : id});
    return (
      <Redirect to = {`/invoice_history_user/`} />
    )
  }

    render() {

    const {redirect_login} = this.state;
    const {redirect_home} = this.state;
    const {redirect_inv} = this.state;

    if (redirect_home) {
      this.setState({redirect_home: false});
      return (
      <Redirect to='/adminhome'/>
      )
    }

    if (redirect_login) {
      this.setState({redirect_login: false});
      return (
      <Redirect to='/loginadmin'/>
      )
    }

    if (redirect_inv) {
      this.setState({redirect_inv: false});
      return(
        <Redirect to = {`/invoice_user/${this.state.tempInvoiceId}`}/>
      )
    }
    
    return(
      <div className = "content">
          {/* <Navbar user_name={this.state.user_name} id_user={this.state.user_id} postLogout={this.postlogout} postProductSearch={this.postproductsearch}/> */}
          <Navbar user_name={this.state.user_name} id_user={this.state.user_id} postLogout={this.postlogout} postProductSearch={this.postproductsearch}/>
          {/* <Route path='/' render={() => <Redirect to='/seasons'/>}/> */}
          
          <Route path ='/loginadmin' render = {() => <Loginadmin postLoginadmin={this.postloginadmin}/>}/>
          
          <Route path = "/adminhome" render = {() => <Main getSeasonID={this.getseasonid} ambilidSeason={this.ambilidseason} getseasonidDelete={this.getseasoniddelete}/>}/>
          <Route path = {`/admin_season_edit/${this.state.id_season}`} render = {() => <Seasonedit getseasonidEdit={this.getseasonidedit}/>}/>
          <Route path = '/admin_season_register' render = {() => <Seasonregister getseasonidRegister={this.getseasonidregister}/>}/>


          <Route path = "/category" render = {() => <Category category2={this.state.category} getCategoryID={this.getcategoryid} ambilidCategory={this.ambilidcategory} getcategoryidDelete={this.getcategoryiddelete} idrefseason={this.state.id_season}/>}/>
          <Route path = {`/admin_category_edit/${this.state.id_category}`} render = {() => <Categoryedit getcategoryidEdit={this.getcategoryidedit}/>}/>
          <Route path = {`/admin_category_register/${this.state.id_season}`} render = {() => <Categoryregister getcategoryidRegister={this.getcategoryidregister}/>}/>
          

          <Route path = "/product" render = {() => <Product product2={this.state.product} getDetailID={this.getdetailid} ambilidProduct={this.ambilidproduct} getproductidDelete={this.getproductiddelete} idrefcategory={this.state.id_category}/>}/>
          <Route path = {`/admin_product_edit/${this.state.id_product}`} render = {() => <Productedit getproductidEdit={this.getproductidedit}/>}/>
          <Route path = {`/admin_product_register/${this.state.id_category}`} render = {() => <Productregister getproductidRegister={this.getproductidregister}/>}/>


         {/* yang kiri sama dengan di dalem komponen yang di kanan yang di state atas */}
          <Route path = "/admin_product_colour" render = {() => <Detail productwarna={this.state.product_detail} getWarnaID={this.getwarnaid} ambilidWarna={this.ambilidwarna} getwarnaidDelete={this.getwarnaiddelete} idrefproduct={this.state.id_product}/>}/>
          <Route path = {`/admin_product_colour_edit/${this.state.id_warna}`} render = {() => <Detailedit getwarnaidEdit={this.getwarnaidedit}/>}/>
          <Route path = {`/admin_product_colour_register/${this.state.id_product}`} render = {() => <Detailregister getwarnaidRegister={this.getwarnaidregister}/>}/>
          

          <Route path = "/admin_product_stock" render = {() => <Size sizeku={this.state.size} ambilidSize={this.ambilidsize} getsizeidDelete={this.getsizeiddelete} idrefwarna={this.state.id_warna}/>}/>
          <Route path = {`/admin_product_stock_edit/${this.state.id_size}`} render = {() => <Sizeedit getsizeidEdit={this.getsizeidedit}/>}/>
          <Route path = {`/admin_product_stock_register/${this.state.id_warna}`} render = {() => <Sizeregister getsizeidRegister={this.getsizeidregister}/>}/>


          <Route path = {`/invoice_user/${this.state.tempInvoiceId}`} render ={() => <Invoice invoice_kode={this.state.tempInvoiceId}/>}/>
          <Route path = {`/invoice_history_user/`} render = {() => <Invoice_history getInvID = {this.getinvid}/>} />

          {/* <Footer/> */}
      </div>
    )
  }
}

export default App;